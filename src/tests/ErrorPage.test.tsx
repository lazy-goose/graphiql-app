import { ErrorPage } from '@/pages/ErrorPage'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct ErrorPage snapshot', () => {
  const { baseElement } = renderInContext(<ErrorPage />)
  expect(baseElement).toMatchSnapshot()
})
