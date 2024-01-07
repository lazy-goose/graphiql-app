import { QueryResponse } from '@/components/QueryResponse'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Fail QueryResponse due to conflicting packages', () => {
  expect(() => renderInContext(<QueryResponse />)).toThrow()
})
