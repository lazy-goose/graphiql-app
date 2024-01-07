import { PasswordStrength } from '@/components/@SignForm/PasswordStrength'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct PasswordStrength snapshot', () => {
  const { baseElement } = renderInContext(
    <PasswordStrength password="" disabled={false} />,
  )
  expect(baseElement).toMatchSnapshot()
})
