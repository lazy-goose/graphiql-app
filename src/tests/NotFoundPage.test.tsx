import { NotFoundPage } from '@/pages/NotFoundPage'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct NotFoundPage snapshot', () => {
  const { baseElement } = renderInContext(<NotFoundPage />)
  expect(baseElement).toMatchSnapshot()
})
