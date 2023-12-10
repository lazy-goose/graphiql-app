import { expect, test } from 'vitest'

test('Expect successful test run', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  expect(data).toEqual(['Empty'])
})
