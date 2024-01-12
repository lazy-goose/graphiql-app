import { z } from 'zod'
import { useLocale } from './useLocale'

export const useValidators = () => {
  const { locale } = useLocale()

  const passwordErrors = [
    locale.signInUpPage.error.password.minLength,
    locale.signInUpPage.error.password.uppercase,
    locale.signInUpPage.error.password.lowercase,
    locale.signInUpPage.error.password.digit,
    locale.signInUpPage.error.password.specialCharacter,
  ]

  const passwordStrength = [
    ['#d32f2f', locale.signInUpPage.typography.passwordStrength.tooWeak],
    ['#ef9d00', locale.signInUpPage.typography.passwordStrength.weak],
    ['#dedb0a', locale.signInUpPage.typography.passwordStrength.fair],
    ['#98bf54', locale.signInUpPage.typography.passwordStrength.good],
    ['#5eb762', locale.signInUpPage.typography.passwordStrength.strong],
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
    .min(1, locale.signInUpPage.error.password.required)
    .and(passwordStrengthSchema)

  const emailSchema = z
    .string()
    .min(1, locale.signInUpPage.error.email.required)
    .email(locale.signInUpPage.error.email.validation)

  const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  })

  const signUpSchema = signInSchema
    .extend({
      confirmPassword: z
        .string()
        .min(1, locale.signInUpPage.error.confirmPassword.required),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: locale.signInUpPage.error.confirmPassword.matching,
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
