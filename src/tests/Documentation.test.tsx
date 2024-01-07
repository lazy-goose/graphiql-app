import { Documentation } from '@/components/Documentation'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct Documentation snapshot', () => {
  const { baseElement } = renderInContext(<Documentation />)
  expect(baseElement).toMatchSnapshot()
})
