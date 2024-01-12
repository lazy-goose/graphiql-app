import { z } from 'zod'
import { useLocale } from './useLocale'

export const useValidators = () => {
  const {
    locale: { signInUpPage },
  } = useLocale()

  const passwordErrors = [
    signInUpPage.error.password.minLength,
    signInUpPage.error.password.uppercase,
    signInUpPage.error.password.lowercase,
    signInUpPage.error.password.digit,
    signInUpPage.error.password.specialCharacter,
  ]

  const passwordStrength = [
    ['#d32f2f', signInUpPage.typography.passwordStrength.tooWeak],
    ['#ef9d00', signInUpPage.typography.passwordStrength.weak],
    ['#dedb0a', signInUpPage.typography.passwordStrength.fair],
    ['#98bf54', signInUpPage.typography.passwordStrength.good],
    ['#5eb762', signInUpPage.typography.passwordStrength.strong],
  ]

  const passwordStrengthSchema = z
    .string()
    .min(8, passwordErrors[0].long)
    .regex(/\p{Uppercase_Letter}/u, passwordErrors[1].long)
    .regex(/\p{Lowercase_Letter}/u, passwordErrors[2].long)
    .regex(/\d/, passwordErrors[3].long)
    .regex(/[!@#$%^&*(),.?":{}|<>]/, passwordErrors[4].long)

  const passwordSchema = z
    .string()
    .min(1, signInUpPage.error.password.required)
    .and(passwordStrengthSchema)

  const emailSchema = z
    .string()
    .min(1, signInUpPage.error.email.required)
    .email(signInUpPage.error.email.validation)

  const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  })

  const signUpSchema = signInSchema
    .extend({
      confirmPassword: z
        .string()
        .min(1, signInUpPage.error.confirmPassword.required),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: signInUpPage.error.confirmPassword.matching,
    })

  return {
    password: {
      strength: passwordStrength,
      errors: passwordErrors,
      schema: passwordStrengthSchema,
    },
    email: {
      schema: emailSchema,
    },
    signIn: {
      schema: signInSchema,
    },
    signUp: {
      schema: signUpSchema,
    },
  }
}
