import { passwordSchema } from '@/utils/zodUtils'
import { useEffect, useState } from 'react'
import { ZodError } from 'zod'

function validate(password: string) {
  try {
    const result = passwordSchema.parse({ password })
    return result
  } catch (e) {
    if (e instanceof ZodError) {
      const errorsArr = e.issues.map((error) => error.message)
      return errorsArr
    }
  }
}

export function usePasswordErrors(password: string) {
  const [passwordErrors, setPasswordErrors] = useState<string[] | null>(null)

  useEffect(() => {
    const result = validate(password)
    Array.isArray(result) === true
      ? setPasswordErrors(result as string[])
      : setPasswordErrors([])
  }, [password])

  return passwordErrors
}
