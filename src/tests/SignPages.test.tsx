import { SignInForm } from '@/components/@SignForm/SignInForm'
import { SignUpForm } from '@/components/@SignForm/SignUpForm'
import { SignInPage, SignUpPage } from '@/pages/@SignPages'
import { expect, test } from 'vitest'
import renderInContext from './renderInContext'

test('Correct Sign In page', () => {
  const { baseElement } = renderInContext(<SignInPage />)
  expect(baseElement).toMatchSnapshot()
})

test('Correct Sign Un page', () => {
  const { baseElement } = renderInContext(<SignUpPage />)
  expect(baseElement).toMatchSnapshot()
})

test('Correct Sign In form', () => {
  const { baseElement } = renderInContext(<SignInForm />)
  expect(baseElement).toMatchSnapshot()
})

test('Correct Sign Un form', () => {
  const { baseElement } = renderInContext(<SignUpForm />)
  expect(baseElement).toMatchSnapshot()
})
