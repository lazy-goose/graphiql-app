import { SignInForm } from '@/components/@SignForm/SignInForm'
import { RouterPath } from '@/constants'
import { useBoundStore } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SignGroupLayout from '../SignLayout'

export default function SignInPage() {
  const user = useBoundStore((state) => state.user)

  const navigate = useNavigate()

  const handleRedirect = (): void => {
    if (user) {
      navigate(RouterPath.Main)
    }
  }

  useEffect(handleRedirect)

  return (
    <SignGroupLayout>
      <SignInForm />
    </SignGroupLayout>
  )
}
