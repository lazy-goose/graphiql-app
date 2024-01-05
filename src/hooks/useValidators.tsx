import { z } from 'zod'

export const useValidators = () => {
  const passwordStrengthSchemaErrors = [
    ['Must be at least 8 characters or more', '8 characters'],
    ['Should have at least one Uppercase letter', 'uppercase letter'],
    ['Should have at least one Lowercase letter', 'lowercase letter'],
    ['Should have at least one digit', 'one digit'],
    [
      'Should have at least one special character: !@#$%^&*(),.?":{}|<>',
      'one special character',
    ],
  ]

  const passwordStrength = [
    ['#d32f2f', 'Too Weak'],
    ['#ef9d00', 'Weak'],
    ['#dedb0a', 'Fair'],
    ['#98bf54', 'Good'],
    ['#5eb762', 'Strong'],
  ]

  const passwordStrengthSchema = z
    .string()
    .min(8, passwordStrengthSchemaErrors[0][0])
    .regex(/\p{Uppercase_Letter}/u, passwordStrengthSchemaErrors[1][0])
    .regex(/\p{Lowercase_Letter}/u, passwordStrengthSchemaErrors[2][0])
    .regex(/\d/, passwordStrengthSchemaErrors[3][0])
    .regex(/[!@#$%^&*(),.?":{}|<>]/, passwordStrengthSchemaErrors[4][0])

  const passwordSchema = z
    .string()
    .min(1, 'Password is required')
    .and(passwordStrengthSchema)

  const emailSchema = z
    .string()
    .min(1, 'Email is required')
    .email('Must be a valid email')

  const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
  })

  const signUpSchema = signInSchema
    .extend({
      confirmPassword: z.string().min(1, 'Password confirm is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
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
