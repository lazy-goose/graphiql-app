import { WelcomePage } from '@/pages/WelcomePage'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct WelcomePage snapshot', () => {
  const { baseElement } = renderInContext(<WelcomePage />)
  expect(baseElement).toMatchSnapshot()
})
