import { queryPrettify } from '@/utils/queryPrettify'
import { expect, test } from 'vitest'

test('Correctly prettify initial', () => {
  const prettified = queryPrettify(`
query countries   ($filter: CountryFilterInput)    {
countries  (filter:   $filter) {
__typename
code
name
phone}}`)

  expect(prettified).toMatchSnapshot()
})
