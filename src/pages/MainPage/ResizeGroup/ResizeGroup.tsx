import { Box, Stack, type BoxProps, type StackProps } from '@mui/material'
import React, { Fragment, useRef } from 'react'
import { ResizerDefaults, SmartResizer } from './Resizer'
import { type ResizeEvent } from './Resizer/useResizer'
import className from './className'
import { moveFlexSpace, recalculateCollapse } from './utils/calculate'
import { toFr, toFrArray } from './utils/convert'

export type ResizeFragmentProps = {
  id: React.Key
  children: React.ReactNode
  min?: number
  max?: number
  collapse?: boolean
  resizerAfter?: boolean
  onSizeChange?: (next: number, prev: number, ref: HTMLElement) => void
  windowBoxProps?: BoxProps
  resizerBoxProps?: BoxProps
}
export type ResizeGroupChild = React.ReactElement<ResizeFragmentProps>
export type ResizeCallback = (
  nextFractions: number[],
  prevFractions: number[],
) => void
export type ResizeGroupController = {
  setFrSizes: (sizes: number[]) => void
  getFrSizes: () => number[]
  subscribeResize: (callback: ResizeCallback, index?: number) => void
  unsubscribeResize: (callback: ResizeCallback) => void
}
export type ResizeGroupProps = {
  children: React.ReactElement<ResizeFragmentProps>[]
  direction?: 'row' | 'col'
  sizes?: number[]
  initialSizes?: number[]
  onResize?: ResizeCallback
  StackProps?: StackProps
  controllerRef?: React.MutableRefObject<ResizeGroupController | null>
}

const useChildrenProps = (children: ResizeGroupProps['children']) => {
  return React.Children.map(children, (child: ResizeGroupChild) => {
    if (!Object.hasOwn(child.props, 'id')) {
      throw new Error(
        `Each <ResizeGroup /> child must have at least 'id' prop. Instead got '${
          child.type
        }' with: ${JSON.stringify(child.props)}`,
      )
    }
    const jsx = child.props.children
    const {
      id,
      collapse = [undefined, null, false, true].some((u) => u === jsx),
      min = 0,
      max = 1,
      onSizeChange = () => {},
      resizerAfter = true,
      windowBoxProps,
      resizerBoxProps,
    } = child.props
    return {
      children: jsx,
      id,
      collapse,
      min,
      max,
      onSizeChange,
      resizerAfter,
      windowBoxProps,
      resizerBoxProps,
    } satisfies ResizeFragmentProps
  })
}

const getPxSize = (el: HTMLElement, direction: 'row' | 'col') => {
  return direction === 'row' ? el.offsetWidth : el.offsetHeight
}
const setFrSize = (el: HTMLElement, frValue: number) => {
  return el.style.setProperty('flex', `${frValue} 1 0%`)
}

export default function ResizeGroup(props: ResizeGroupProps) {
  const {
    direction = 'row',
    children,
    sizes = [],
    initialSizes = [],
    onResize = () => {},
    StackProps,
    controllerRef,
  } = props

  const itemsRef = useRef<HTMLElement[]>([])
  const internalSizesRef = useRef<number[]>([])
  const resizeCallbacksRef = useRef<ResizeCallback[]>([])

  const resizeCallbacks = resizeCallbacksRef.current

  resizeCallbacks[0] = onResize

  /* API Abstraction */

  const childrenProps = useChildrenProps(children)

  const toComputeSizes = () => {
    const next = sizes
    const prev = internalSizesRef.current
    const init = initialSizes
    if (next.length) {
      return next
    } else if (prev.length) {
      return prev
    } else {
      return init
    }
  }

  const _fractions = toComputeSizes()
  const _collapsed = childrenProps.map((ch) => ch.collapse)

  const derivedSizes = recalculateCollapse({
    fractions: _fractions,
    collapsed: _collapsed,
  }).map((derived, index) => (_collapsed[index] ? _fractions[index] : derived))

  const childrenSettings = childrenProps.map((cp, index) => ({
    ...cp,
    computedSize: derivedSizes[index],
    minmax: [cp.min, cp.max] as [number, number],
    get ref() {
      return itemsRef.current[index]
    },
  }))

  const getChildArray = () => [...childrenSettings]
  const getChild = (index: number) => childrenSettings[index]

  /* Logic */

  const emitResizeCallbacks = (nextSizes: number[]) => {
    const currSizes = toFrArray(
      getChildArray()
        .map((ch) => ch.ref)
        .map((s) => getPxSize(s, direction)),
    ).fractions
    resizeCallbacks.forEach((clb) => clb(nextSizes, currSizes))
  }

  const resize = (nextFractions: number[]) => {
    const toChange = nextFractions.map((newSize, index) =>
      getChild(index).collapse ? getChild(index).computedSize : newSize,
    )
    getChildArray()
      .map((ch) => ch.ref)
      .forEach((el, index) => {
        const prev = getChild(index).computedSize
        const next = toChange[index]
        if (prev !== next) {
          getChild(index).onSizeChange(next, prev, el)
        }
        if (!sizes.length) {
          setFrSize(el, next)
        }
      })
    internalSizesRef.current = toChange
    emitResizeCallbacks(nextFractions)
  }

  const handleResize = (e: ResizeEvent, dividerIndex: number) => {
    const currentItem = getChild(dividerIndex).ref
    if (currentItem) {
      const { fractions, share } = toFrArray(
        getChildArray()
          .map((ch) => ch.ref)
          .map((s) => getPxSize(s, direction)),
      )
      const value = (() => {
        const rect = currentItem.getBoundingClientRect()
        const value =
          direction === 'row'
            ? e.clientX - e.innerOffsetX - rect.left
            : e.clientY - e.innerOffsetY - rect.top
        return toFr(value, share)
      })()

      const nextSizes = moveFlexSpace({
        fractions,
        index: dividerIndex,
        value,
        minmax: getChildArray().map((ch) => ch.minmax),
      })

      if (nextSizes) {
        resize(nextSizes)
      }
    }
  }

  /* Controller */

  if (controllerRef) {
    controllerRef.current = {
      setFrSizes: resize,
      getFrSizes: () =>
        toFrArray(
          getChildArray()
            .map((ch) => ch.ref)
            .map((s) => getPxSize(s, direction)),
        ).fractions,
      subscribeResize: (callback, index = resizeCallbacks.length) => {
        resizeCallbacks[index] = callback
      },
      unsubscribeResize: (callback) => {
        const index = resizeCallbacks.indexOf(callback)
        if (index !== -1) {
          resizeCallbacks.splice(index, 1)
        }
      },
    }
  }

  /* Rendering */

  const resizerOrientation = direction === 'row' ? 'vertical' : 'horizontal'
  const stackDirection = direction === 'row' ? 'row' : 'column'

  const display = (index: number) => ({
    display: getChild(index).collapse ? 'none' : undefined,
  })

  const edgeResizerPadding = (index: number) => {
    const padding = ResizerDefaults.padding + 'px'
    if (index === 0) {
      return {
        [direction === 'row' ? 'paddingLeft' : 'paddingTop']: padding,
      }
    }
    if (index === children.length - 2) {
      return {
        [direction === 'row' ? 'paddingRight' : 'paddingBottom']: padding,
      }
    }
  }

  const { FragmentWindow, FragmentResizer } = className

  const windowClassName = (i: number) => ({
    className: [FragmentWindow(), FragmentWindow(i)].join(' '),
  })
  const resizerClassName = (i: number) => ({
    className: [FragmentResizer(), FragmentResizer(i)].join(' '),
  })

  return (
    <Stack height={1} direction={stackDirection} {...StackProps}>
      {getChildArray().map((ch, index) => (
        <Fragment key={ch.id}>
          <Box
            overflow="hidden"
            ref={(node) => {
              const el = node as HTMLElement | null
              if (el) {
                itemsRef.current[index] = el
                setFrSize(el, ch.computedSize)
              }
            }}
            {...display(index)}
            {...windowClassName(index)}
            {...ch.windowBoxProps}
          >
            {ch.children}
          </Box>
          {ch.resizerAfter && index !== children.length - 1 && (
            <SmartResizer
              orientation={resizerOrientation}
              onResize={(e) => handleResize(e, index)}
              BoxProps={{
                ...display(index),
                ...edgeResizerPadding(index),
                ...resizerClassName(index),
                ...ch.resizerBoxProps,
              }}
            />
          )}
        </Fragment>
      ))}
    </Stack>
  )
}
