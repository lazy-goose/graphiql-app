import { z } from 'zod'
import { useLocale } from './useLocale'

export const useValidators = () => {
  const { locale } = useLocale()

  const passwordStrengthSchemaErrors = [
    locale.signInUpPage.error.password.characters,
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

  const passwordStrengthSchema = z
    .string()
    .min(8, passwordStrengthSchemaErrors[0][0])
    .regex(/\p{Uppercase_Letter}/u, passwordStrengthSchemaErrors[1][0])
    .regex(/\p{Lowercase_Letter}/u, passwordStrengthSchemaErrors[2][0])
    .regex(/\d/, passwordStrengthSchemaErrors[3][0])
    .regex(/[!@#$%^&*(),.?":{}|<>]/, passwordStrengthSchemaErrors[4][0])

  const passwordSchema = z
    .string()
    .min(1, locale.signInUpPage.error.password.length)
    .and(passwordStrengthSchema)

  const emailSchema = z
    .string()
    .min(1, locale.signInUpPage.error.email.length)
    .email(locale.signInUpPage.error.email.validation)

  const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  })

  const signUpSchema = signInSchema
    .extend({
      confirmPassword: z
        .string()
        .min(1, locale.signInUpPage.error.confirmPassword.length),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: locale.signInUpPage.error.confirmPassword.matching,
    })

  return {
    password: {
      strength: passwordStrength,
      errors: passwordStrengthSchemaErrors,
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
