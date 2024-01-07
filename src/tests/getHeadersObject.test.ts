import { getHeadersObject } from '@/utils/getHeadersObject'
import { expect, test } from 'vitest'

test('getHeadersObject filters data', () => {
  expect(
    getHeadersObject([
      { id: 1, checked: true, headerKey: 'key1', headerVal: 'val1' },
      { id: 2, checked: true, headerKey: 'key2', headerVal: 'val2' },
      { id: 3, checked: true, headerKey: 'key3', headerVal: 'val3' },
      { id: 4, checked: true, headerKey: 'key4', headerVal: 'val4' },
    ]),
  ).toMatchSnapshot()
})
