/* eslint-disable react/jsx-key */
import { ErrorBoundary } from '@/components/@Error/ErrorBoundary'
import { ErrorBoundaryWrapper } from '@/components/@Error/ErrorBoundaryWrapper'
import { ErrorBlock } from '@/components/@Error/ErrorBoundaryWrapper/ErrorBlock'
import { PasswordInput } from '@/components/@SignForm/PasswordInput'
import { PasswordStrength } from '@/components/@SignForm/PasswordStrength'
import { SignInForm } from '@/components/@SignForm/SignInForm'
import { SignUpForm } from '@/components/@SignForm/SignUpForm'
import { Documentation } from '@/components/Documentation'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RequestHeaders } from '@/components/RequestHeaders'
import { SignInPage, SignUpPage } from '@/pages/@SignPages'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { WelcomePage } from '@/pages/WelcomePage'
import { Snackbar } from '@mui/material'
import { expect, test } from 'vitest'
import renderInContext from './utils/renderInContext'

const ValidateSnapshots = [
  ['ErrorBoundary', <ErrorBoundary fallback={null}>{null}</ErrorBoundary>],
  ['ErrorBoundaryWrapper', <ErrorBoundaryWrapper>{null}</ErrorBoundaryWrapper>],
  ['ErrorBlock', <ErrorBlock />],
  ['PasswordInput', <PasswordInput />],
  ['PasswordStrength', <PasswordStrength password="as$word" disabled />],
  ['SignInForm', <SignInForm />],
  ['SignUpForm', <SignUpForm />],
  ['Documentation', <Documentation />],
  ['Footer', <Footer />],
  ['Header', <Header leftSlot={null} />],
  ['RequestHeaders', <RequestHeaders />],
  ['Snackbar', <Snackbar />],
  ['SignInPage', <SignInPage />],
  ['SignUpPage', <SignUpPage />],
  ['MainPage', <MainPage />],
  ['WelcomePage', <WelcomePage />],
  ['NotFoundPage', <NotFoundPage />],
]

ValidateSnapshots.forEach(([name, jsx]) => {
  test(`Correct ${name} snapshot`, () => {
    const { baseElement } = renderInContext(jsx)
    expect(baseElement).toMatchSnapshot()
  })
})
