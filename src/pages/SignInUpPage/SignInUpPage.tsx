import { SignInForm } from '@/components/SignInForm'
import { SignUpForm } from '@/components/SignUpForm'
import { pathes } from '@/constants/constants'
import { Link } from 'react-router-dom'

export function SignInUpPage() {
  return (
    <>
      <header />
      <main>
        <h1>Sign In & Sign Up Page</h1>
        <Link to={pathes.mainPage}>Main Page</Link>
        <SignInForm />
        <SignUpForm />
      </main>
      <footer />
    </>
  )
}
