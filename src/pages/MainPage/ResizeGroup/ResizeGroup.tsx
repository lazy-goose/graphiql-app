import { Box, Stack, type StackProps } from '@mui/material'
import { Fragment, useLayoutEffect, useRef } from 'react'
import { ResizerDefaults, SmartResizer } from './Resizer'
import { type ResizeEvent } from './Resizer/useResizer'
import { calculateFlexSpace } from './utils/calculateFlexSpace'
import { toFr, toFrArray } from './utils/convert'
import { useChanged } from './utils/useChanged'

export type ResizeGroupProps = {
  direction?: 'row' | 'col'
  children: React.ReactNode[]
  keys: React.Key[]
  sizes?: number[]
  collapse?: boolean[]
  minmax?: ([number, number] | null)[]
  onResize?: (fractions: number[]) => void
  preventUpdate?: boolean
  stackProps?: StackProps
}

export default function ResizeGroup(props: ResizeGroupProps) {
  const {
    direction = 'row',
    children,
    keys,
    sizes = [],
    minmax = [],
    collapse = [],
    onResize = () => {},
    preventUpdate = true,
    stackProps,
  } = props

  const resizerOrientation = direction === 'row' ? 'vertical' : 'horizontal'
  const stackDirection = direction === 'row' ? 'row' : 'column'

  const itemsRef = useRef<HTMLDivElement[]>([])

  const getElSize = (el: HTMLElement) => {
    return direction === 'row' ? el.offsetWidth : el.offsetHeight
  }

  const applySizes = (nextFractions: number[]) => {
    const changeFractions = nextFractions.map((newSize, index) =>
      collapse[index] ? sizes[index] : newSize,
    )
    if (!preventUpdate) {
      itemsRef.current.map((el, index) => {
        el.style.setProperty('flex', `${changeFractions[index]} 1 0%`)
      })
    }
    onResize(changeFractions)
  }

  const onSmartResize = (e: ResizeEvent, dividerIndex: number) => {
    const currentItem = itemsRef.current.at(dividerIndex)
    if (currentItem) {
      const { fractions, share } = toFrArray(itemsRef.current.map(getElSize))
      const value = (() => {
        const rect = currentItem.getBoundingClientRect()
        const value =
          direction === 'row'
            ? e.clientX - e.innerOffsetX - rect.left
            : e.clientY - e.innerOffsetY - rect.top
        return toFr(value, share)
      })()

      const nextSizes = calculateFlexSpace({
        fractions,
        index: dividerIndex,
        value,
        minmax: minmax.map((mm) =>
          mm === null ? [0, 1] : [mm[0] || 0, mm[1] || 1],
        ),
      })

      if (nextSizes) applySizes(nextSizes)
    }
  }

  const isCollapseChanged = useChanged({
    value: collapse,
    transform: (v) => v.join(','),
  })

  useLayoutEffect(() => {
    if (isCollapseChanged) {
      const { fractions } = toFrArray(itemsRef.current.map(getElSize))
      applySizes(fractions)
    }
  })

  const display = (index: number) => ({
    display: collapse[index] ? 'none' : undefined,
  })

  const marginCollapse = (index: number) => {
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

  return (
    <Stack height={1} direction={stackDirection} {...stackProps}>
      {children.map((child, index) => (
        <Fragment key={keys[index] || index}>
          <Box
            style={{
              flex: `${sizes[index]} 1 0%`,
            }}
            ref={(node) => {
              itemsRef.current[index] = node as unknown as HTMLDivElement
            }}
            overflow="hidden"
            {...display(index)}
          >
            {child}
          </Box>
          {index !== children.length - 1 && (
            <SmartResizer
              orientation={resizerOrientation}
              onResize={(e) => onSmartResize(e, index)}
              boxProps={{
                ...display(index),
                ...marginCollapse(index),
              }}
            />
          )}
        </Fragment>
      ))}
    </Stack>
  )
}
