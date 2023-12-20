import { Header } from '@/components/Header'
import { SignInForm } from '@/components/SignInForm'
import { SignUpForm } from '@/components/SignUpForm'
import { pathes } from '@/constants/constants'
import { useBoundStore } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function SignInUpPage() {
  const pageMode = useBoundStore((state) => state.pageMode)
  const navigate = useNavigate()
  const user = useBoundStore((state) => state.user)

  const handleRedirect = (): void => {
    if (user) {
      navigate(pathes.mainPage)
    }
  }

  useEffect(handleRedirect)

  return (
    <>
      <Header />
      <main>
        {pageMode === 'signIn' && <SignInForm />}
        {pageMode === 'signUp' && <SignUpForm />}
      </main>
      <footer />
    </>
  )
}
