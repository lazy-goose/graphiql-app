import { SignInForm } from '@/components/SignInForm'
import { SignUpForm } from '@/components/SignUpForm'
import { pathes } from '@/constants/constants'
import { useBoundStore } from '@/store'
import { Link } from 'react-router-dom'

export function SignInUpPage() {
  const pageMode = useBoundStore((state) => state.pageMode)

  return (
    <>
      <header />
      <main>
        <h1>Sign In & Sign Up Page</h1>
        <Link to={pathes.mainPage}>Main Page</Link>
        {pageMode === 'signIn' && <SignInForm />}
        {pageMode === 'signUp' && <SignUpForm />}
      </main>
      <footer />
    </>
  )
}
