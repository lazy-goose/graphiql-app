import { RequestVariables } from '@/components/RequestVariables'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Fail QueryResponse due to conflicting packages', () => {
  expect(() => renderInContext(<RequestVariables />)).toThrow()
})
