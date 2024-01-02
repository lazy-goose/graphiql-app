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
