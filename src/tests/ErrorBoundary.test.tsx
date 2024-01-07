import { ErrorBoundaryWrapper } from '@/components/@Error/ErrorBoundaryWrapper'
import { ErrorBlock } from '@/components/@Error/ErrorBoundaryWrapper/ErrorBlock'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct ErrorBoundaryWrapper snapshot', () => {
  const { baseElement } = renderInContext(
    <ErrorBoundaryWrapper>{null}</ErrorBoundaryWrapper>,
  )
  expect(baseElement).toMatchSnapshot()
})

test('Correct ErrorBlock snapshot', () => {
  const { baseElement } = renderInContext(<ErrorBlock />)
  expect(baseElement).toMatchSnapshot()
})
