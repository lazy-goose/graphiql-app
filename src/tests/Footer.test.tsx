import { Footer } from '@/components/Footer'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct Footer snapshot', () => {
  const { baseElement } = renderInContext(<Footer />)
  expect(baseElement).toMatchSnapshot()
})
