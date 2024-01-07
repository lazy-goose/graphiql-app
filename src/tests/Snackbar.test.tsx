import { Snackbar } from '@/components/Snackbar'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct Snackbar snapshot', () => {
  const { baseElement } = renderInContext(<Snackbar id="1" message="Error" />)
  expect(baseElement).toMatchSnapshot()
})
