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
  onSizeChange?: (prev: number, next: number, ref: HTMLDivElement) => void
  windowBoxProps?: BoxProps
  resizerBoxProps?: BoxProps
}
export type ResizeGroupChild = React.ReactElement<ResizeFragmentProps>
export type ResizeGroupProps = {
  children: React.ReactElement<ResizeFragmentProps>[]
  direction?: 'row' | 'col'
  sizes?: number[]
  onResize?: (fractions: number[]) => void
  preventUpdate?: boolean
  stackProps?: StackProps
}

export default function ResizeGroup(props: ResizeGroupProps) {
  const {
    direction = 'row',
    children,
    sizes = [],
    onResize = () => {},
    preventUpdate = true,
    stackProps,
  } = props

  const childrenProps = React.Children.map(
    children,
    (child: ResizeGroupChild) => {
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
    },
  )

  const itemsRef = useRef<HTMLDivElement[]>([])

  const derivedSizes = recalculateCollapse({
    fractions: sizes,
    collapsed: childrenProps.map((ch) => ch.collapse),
  })

  const childrenSettings = childrenProps.map((cp, index) => ({
    ...cp,
    size: derivedSizes[index],
    minmax: [cp.min, cp.max] as [number, number],
    get ref() {
      return itemsRef.current[index]
    },
  }))

  const getChildArray = () => [...childrenSettings]
  const getChild = (index: number) => childrenSettings[index]

  const resizerOrientation = direction === 'row' ? 'vertical' : 'horizontal'
  const stackDirection = direction === 'row' ? 'row' : 'column'

  const getElSize = (el: HTMLElement) => {
    return direction === 'row' ? el.offsetWidth : el.offsetHeight
  }

  const resize = (nextFractions: number[]) => {
    const changeFractions = nextFractions.map((newSize, index) =>
      getChild(index).collapse ? getChild(index).size : newSize,
    )
    if (!preventUpdate) {
      getChildArray()
        .map((ch) => ch.ref)
        .forEach((el, index) => {
          const prev = getChild(index).size
          const next = changeFractions[index]
          el.style.setProperty('flex', `${changeFractions[index]} 1 0%`)
          if (prev !== next) {
            getChild(index).onSizeChange(prev, next, el)
          }
        })
    }
    onResize(changeFractions)
  }

  const onSmartResize = (e: ResizeEvent, dividerIndex: number) => {
    const currentItem = getChild(dividerIndex).ref
    if (currentItem) {
      const { fractions, share } = toFrArray(
        getChildArray()
          .map((ch) => ch.ref)
          .map(getElSize),
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

      if (nextSizes) resize(nextSizes)
    }
  }

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
    <Stack height={1} direction={stackDirection} {...stackProps}>
      {getChildArray().map((ch, index) => (
        <Fragment key={ch.id}>
          <Box
            overflow="hidden"
            style={{
              flex: `${ch.size} 1 0%`,
            }}
            ref={(node) => {
              itemsRef.current[index] = node as unknown as HTMLDivElement
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
              onResize={(e) => onSmartResize(e, index)}
              boxProps={{
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
