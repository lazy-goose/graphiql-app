import { useBoundStore } from '@/store'
import { renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

describe('Slices works as expected', () => {
  test('mainLayoutSlice', () => {
    const {
      result: { current: state },
    } = renderHook(() => useBoundStore((state) => state))
    expect(() => {
      state.createHeader(1)
      state.changeHeader(1, { checked: true })
      state.changeResponse('res')
      state.deleteHeader(1)
      state.fetchSchema()
      state.setBaseUrl('base')
      state.setStringifiedQuery('query')
      state.toggleAside()
    }).not.toThrow()
  })
})
