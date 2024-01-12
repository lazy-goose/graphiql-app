import { type CustomSnackbarProps } from '@/components/Snackbar/Snackbar'

export * from './locale'

export type UserSignUpData = {
  email: string
  password: string
  confirmPassword: string
}

export type UserSignInData = {
  email: string
  password: string
}

declare module 'notistack' {
  interface VariantOverrides {
    customAlert: CustomSnackbarProps
  }
}
