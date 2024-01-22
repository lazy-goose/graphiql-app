/* eslint-disable react/jsx-key */
import { App } from '@/App'
import { ErrorBoundary } from '@/components/@Error/ErrorBoundary'
import { ErrorBoundaryWrapper } from '@/components/@Error/ErrorBoundaryWrapper'
import { ErrorBlock } from '@/components/@Error/ErrorBoundaryWrapper/ErrorBlock'
import { PasswordInput } from '@/components/@SignForm/PasswordInput'
import { PasswordStrength } from '@/components/@SignForm/PasswordStrength'
import { SignInForm } from '@/components/@SignForm/SignInForm'
import { SignUpForm } from '@/components/@SignForm/SignUpForm'
import { Documentation } from '@/components/Documentation'
import DocError from '@/components/Documentation/subpages/DocError'
import DocProp from '@/components/Documentation/subpages/DocProp'
import DocRoot from '@/components/Documentation/subpages/DocRoot'
import DocType from '@/components/Documentation/subpages/DocType'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RequestHeaders } from '@/components/RequestHeaders'
import { SignInPage, SignUpPage } from '@/pages/@SignPages'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { WelcomePage } from '@/pages/WelcomePage'
import { Snackbar } from '@mui/material'
import { render } from '@testing-library/react'
import { GraphQLObjectType, GraphQLString } from 'graphql'
import { expect, test } from 'vitest'
import renderInContext from './utils/renderInContext'

const SampleObjectType = new GraphQLObjectType({
  name: 'ObjectType',
  fields: () => ({
    prop1: { type: GraphQLString },
    prop2: { type: GraphQLString },
  }),
})

const ValidateSnapshots = [
  ['ErrorBoundary', <ErrorBoundary fallback={null}>{null}</ErrorBoundary>],
  ['ErrorBoundaryWrapper', <ErrorBoundaryWrapper>{null}</ErrorBoundaryWrapper>],
  ['ErrorBlock', <ErrorBlock />],
  ['PasswordInput', <PasswordInput />],
  ['PasswordStrength', <PasswordStrength password="as$word" disabled />],
  ['SignInForm', <SignInForm />],
  ['SignUpForm', <SignUpForm />],
  ['Documentation', <Documentation />],
  ['DocRoot', <DocRoot />],
  ['DocType', <DocType type={SampleObjectType} />],
  ['DocError', <DocError message={'Error msg'} />],
  ['DocProp', <DocProp type={SampleObjectType.getFields().prop1} />],
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

test('Correct App snapshot', () => {
  const { baseElement } = render(<App />)
  expect(baseElement).toMatchSnapshot()
})

ValidateSnapshots.forEach(([name, jsx]) => {
  test(`Correct ${name} snapshot`, () => {
    const { baseElement } = renderInContext(jsx)
    expect(baseElement).toMatchSnapshot()
  })
})
