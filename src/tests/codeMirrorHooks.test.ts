import { useBaseTheme } from '@/hooks/@CodeMirror/useBaseTheme'
import { useGraphQlStyle } from '@/hooks/@CodeMirror/useGraphQlStyle'
import { useJsonStyle } from '@/hooks/@CodeMirror/useJsonStyle'
import { expect, test } from 'vitest'

test('Correct useBaseTheme return', () => {
  const returnValue = useBaseTheme()
  expect(returnValue).toMatchSnapshot()
})

test('Correct useGraphQlStyle return', () => {
  const returnValue = useGraphQlStyle()
  expect(returnValue).toMatchSnapshot()
})

test('Correct useJsonStyle return', () => {
  const returnValue = useJsonStyle()
  expect(returnValue).toMatchSnapshot()
})
