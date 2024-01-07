import { ResizeGroup, useResizer } from '@/pages/MainPage/ResizeGroup'
import ResizeFragment from '@/pages/MainPage/ResizeGroup/ResizeFragment'
import { describe, expect, test, vi } from 'vitest'
import renderInContext from './renderInContext'

import { moveFlexSpace } from '@/pages/MainPage/ResizeGroup/utils/calculate'
import { toFr, toFrArray } from '@/pages/MainPage/ResizeGroup/utils/convert'
import { fireEvent, render, renderHook, screen } from '@testing-library/react'

window.matchMedia = vi.fn().mockReturnValue(false)

describe('Correct ResizeGroup snapshot', () => {
  test('Correct ResizeGroup snapshot', () => {
    const { baseElement } = renderInContext(
      <ResizeGroup>
        <ResizeFragment id="0">{null}</ResizeFragment>
        <ResizeFragment id="1">{null}</ResizeFragment>
      </ResizeGroup>,
    )
    expect(baseElement).toMatchSnapshot()
  })
  test('Correct ResizeFragment snapshot', () => {
    const { baseElement } = renderInContext(
      <ResizeFragment id="0">{null}</ResizeFragment>,
    )
    expect(baseElement).toMatchSnapshot()
  })
})

describe('ResizeGroup core', () => {
  test('moveFlexSpace limited to min/max', () => {
    const moved = moveFlexSpace({
      fractions: [0.4, 0.2, 0.4],
      index: 0,
      sibling: 1,
      value: -0.3,
      minmax: [[0.1, 0.2]],
    })
    ;[0.1, 0.5, 0.4].forEach((e, i) => {
      expect(moved?.at(i)).toBeCloseTo(e)
    })
  })
  test('toFr/fromFr', () => {
    expect(toFr(100, 1000)).toBeCloseTo(1 / 10)
    expect(toFrArray([100, 200, 300])).toStrictEqual({
      fractions: [1 / 6, 2 / 6, 3 / 6],
      share: 600,
    })
  })
})

describe('ResizeGroup/useResizer', () => {
  test('Firing onStart/onEnd/onResize event', async () => {
    const onStart = vi.fn()
    const onEnd = vi.fn()
    const onResize = vi.fn()
    const {
      result: {
        current: { registerResizer },
      },
    } = renderHook(() => useResizer({ onResize, onStart, onEnd }))
    render(<span data-testid="divider" {...registerResizer()}></span>)

    const divider = screen.getByTestId('divider')

    fireEvent.pointerDown(divider)
    expect(onStart).toBeCalled()

    fireEvent.pointerMove(divider)
    expect(onResize).toBeCalled()

    fireEvent.pointerUp(divider)
    expect(onEnd).toBeCalled()
  })
})
