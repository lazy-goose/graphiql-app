import { z } from 'zod'

export const passwordSchema = z.object({
  password: z
    .string()
    .regex(/[A-Z]/g, { message: 'one uppercase letter' })
    .regex(/[a-z]/g, { message: 'one lowercase letter' })
    .regex(/\d/, { message: 'one digit' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'one special character' })
    .min(8, { message: 'eight characters or more' }),
})

export const signinSchema = passwordSchema.extend({
  email: z.string().min(1, { message: 'Email is required' }).email(),
})

export const signupSchema = signinSchema
  .extend({
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })
