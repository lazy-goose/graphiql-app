import { SignUpForm } from '@/components/@SignForm/SignUpForm'
import { RouterPath } from '@/constants'
import { useBoundStore } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SignGroupLayout from '../SignLayout'

export default function SignUpPage() {
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
      <SignUpForm />
    </SignGroupLayout>
  )
}
