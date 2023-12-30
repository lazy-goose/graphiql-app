import { useEffect, useRef } from 'react'
import defaults from './defaults'

export type ResizeStartEvent = {
  currentTarget: HTMLElement
  clientX: number
  clientY: number
  innerOffsetX: number
  innerOffsetY: number
  originalEvent: React.PointerEvent<HTMLElement> | React.TouchEvent<HTMLElement>
}

export type ResizeEndEvent = {
  currentTarget: HTMLElement
  clientX: number
  clientY: number
  originalEvent: PointerEvent | TouchEvent
}

export type ResizeEvent = {
  currentTarget: HTMLElement
  clientX: number
  clientY: number
  prevClientX: number
  prevClientY: number
  innerOffsetX: number
  innerOffsetY: number
  movementX: number
  movementY: number
  originalEvent: PointerEvent | TouchEvent
}

export type ResizerParamEvents = {
  onStart?: (event: ResizeStartEvent) => void
  onEnd?: (event: ResizeEndEvent) => void
  onResize?: (event: ResizeEvent) => void
}

export type ResizerParamSettings = {
  touch?: boolean
  disable?: boolean
  activeClassName?: string
  passive?: boolean
  preventDefault?: boolean
  preventSelect?: boolean
  cursor?: React.CSSProperties['cursor']
}

export type ResizerReturn<T extends HTMLElement = HTMLElement> = {
  registerResizer: () => Pick<
    React.HTMLProps<T>,
    'onTouchStart' | 'onPointerDown'
  >
}

const isCoarseDevice = () => {
  return window.matchMedia('(pointer: coarse)').matches
}

export default function useResizer(
  events: ResizerParamEvents = {},
  params: ResizerParamSettings = {},
) {
  const { onStart = () => {}, onEnd = () => {}, onResize = () => {} } = events
  const {
    touch = isCoarseDevice(),
    disable = false,
    activeClassName = defaults.activeClassName,
    passive = false,
    preventDefault = false,
    preventSelect = true,
    cursor = 'default',
  } = params

  const isResizeStartRef = useRef(false)
  const currentTargetRef = useRef<HTMLElement | null>(null)
  const prevCoordinatesRef = useRef({
    x: null as number | null,
    y: null as number | null,
  })
  const innerOffsetCoordinatesRef = useRef({
    x: null as number | null,
    y: null as number | null,
  })

  const runStart = (eventData: {
    clientX: number
    clientY: number
    originalEvent:
      | React.TouchEvent<HTMLElement>
      | React.PointerEvent<HTMLElement>
  }) => {
    const { clientX, clientY, originalEvent } = eventData
    const { currentTarget } = originalEvent
    const rect = currentTarget.getBoundingClientRect()
    const innerOffsetX = clientX - rect.left
    const innerOffsetY = clientY - rect.top
    onStart({
      currentTarget,
      clientX,
      clientY,
      innerOffsetX,
      innerOffsetY,
      originalEvent,
    })
    if (activeClassName) {
      currentTarget.classList.add(activeClassName)
    }
    if (preventSelect) {
      document.body.style.setProperty('user-select', 'none')
    }
    if (cursor) {
      document.body.style.setProperty('cursor', cursor)
    }
    currentTargetRef.current = currentTarget
    innerOffsetCoordinatesRef.current = { x: innerOffsetX, y: innerOffsetY }
    prevCoordinatesRef.current = { x: clientX, y: clientY }
  }
  const runEnd = (eventData: { originalEvent: TouchEvent | PointerEvent }) => {
    const { originalEvent } = eventData
    const currentTarget = currentTargetRef.current
    const { x: prevClientX, y: prevClientY } = prevCoordinatesRef.current
    if (currentTarget) {
      if (prevClientX !== null && prevClientY !== null) {
        onEnd({
          currentTarget,
          clientX: prevClientX,
          clientY: prevClientY,
          originalEvent,
        })
      }
      if (activeClassName) {
        currentTarget.classList.remove(activeClassName)
      }
    }
    if (preventSelect) {
      document.body.style.removeProperty('user-select')
    }
    if (cursor) {
      document.body.style.removeProperty('cursor')
    }
    currentTargetRef.current = null
    prevCoordinatesRef.current = { x: null, y: null }
    innerOffsetCoordinatesRef.current = { x: null, y: null }
  }
  const runMove = (eventData: {
    clientX: number
    clientY: number
    originalEvent: TouchEvent | PointerEvent
  }) => {
    const { clientX, clientY, originalEvent } = eventData
    const currentTarget = currentTargetRef.current
    const { x: prevClientX, y: prevClientY } = prevCoordinatesRef.current
    const { x: innerOffsetX, y: innerOffsetY } =
      innerOffsetCoordinatesRef.current
    if (
      currentTarget &&
      prevClientX !== null &&
      prevClientY !== null &&
      innerOffsetX !== null &&
      innerOffsetY !== null
    ) {
      onResize({
        currentTarget,
        clientX,
        clientY,
        prevClientX,
        prevClientY,
        innerOffsetX,
        innerOffsetY,
        movementX: clientX - prevClientX,
        movementY: clientY - prevClientY,
        originalEvent,
      })
    }
    prevCoordinatesRef.current = { x: clientX, y: clientY }
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (isResizeStartRef.current) {
      if (preventDefault) {
        event.preventDefault()
      }
      const { clientX, clientY } = event
      runMove({
        clientX,
        clientY,
        originalEvent: event,
      })
    }
  }
  const handleTouchMove = (event: TouchEvent) => {
    if (isResizeStartRef.current) {
      if (preventDefault) {
        event.preventDefault()
      }
      if (event.touches.length) {
        const { clientX, clientY } = event.touches[0]
        runMove({
          clientX,
          clientY,
          originalEvent: event,
        })
      }
    }
  }
  const handleEndAndCancel = <T extends PointerEvent | TouchEvent>(
    event: T,
  ) => {
    if (isResizeStartRef.current) {
      runEnd({
        originalEvent: event,
      })
      isResizeStartRef.current = false
    }
  }

  useEffect(() => {
    if (!disable) {
      if (touch) {
        document.addEventListener('touchmove', handleTouchMove, { passive })
        document.addEventListener('touchend', handleEndAndCancel)
        document.addEventListener('touchcancel', handleEndAndCancel)
      } else {
        document.addEventListener('pointermove', handlePointerMove)
        document.addEventListener('pointerup', handleEndAndCancel)
        document.addEventListener('pointercancel', handleEndAndCancel)
      }
    }
    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleEndAndCancel)
      document.removeEventListener('touchcancel', handleEndAndCancel)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handleEndAndCancel)
      document.removeEventListener('pointercancel', handleEndAndCancel)
    }
  })

  const onTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    if (event.touches.length) {
      const { clientX, clientY } = event.touches[0]
      runStart({
        clientX,
        clientY,
        originalEvent: event,
      })
      isResizeStartRef.current = true
    }
  }
  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    runStart({
      clientX,
      clientY,
      originalEvent: event,
    })
    isResizeStartRef.current = true
  }

  return {
    registerResizer: () => {
      return touch ? { onTouchStart } : { onPointerDown }
    },
  } as ResizerReturn
}
