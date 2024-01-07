import { QueryRequest } from '@/components/QueryRequest'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Fail QueryRequest due to conflicting packages', () => {
  expect(() => renderInContext(<QueryRequest />)).toThrow()
})
