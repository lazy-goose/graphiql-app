import { App } from '@/App'
import { render } from '@testing-library/react'
import { expect, test } from 'vitest'

test('Correct App snapshot', () => {
  const { baseElement } = render(<App />)
  expect(baseElement).toMatchSnapshot()
})
