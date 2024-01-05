import { RouterPath } from '@/constants'
import { auth } from '@/firebase'
import { useValidators } from '@/hooks/useValidators'
import { type UserSignInData, type UserSignUpData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import { Link, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { PasswordInput } from '../PasswordInput'
import { PasswordStrength } from '../PasswordStrength'

export default function SignUpForm() {
  const {
    signUp: { schema },
  } = useValidators()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isLoading },
  } = useForm<UserSignUpData>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<UserSignUpData | UserSignInData> = async ({
    email,
    password,
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack
      component="form"
      mb={2}
      gap={1.5}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography mb={2} component="h2" variant="h4">
        Sign up
      </Typography>
      <TextField
        type="email"
        label="Email"
        autoComplete="off"
        error={Boolean(errors.email)}
        helperText={errors.email?.message || ' '}
        {...register('email')}
      />
      <PasswordInput
        autoComplete="new-password"
        error={Boolean(errors.password)}
        {...register('password')}
      />
      <PasswordStrength password={watch('password')} />
      <PasswordInput
        autoComplete="new-password"
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message || ' '}
        {...register('confirmPassword')}
      />
      <LoadingButton
        loading={isLoading}
        type="submit"
        size="large"
        variant="contained"
      >
        Sign up
      </LoadingButton>
      <Typography mt={1} ml="auto">
        Already have an account?{' '}
        <Link href={RouterPath.SignIn} underline="hover">
          Sign in
        </Link>
      </Typography>
    </Stack>
  )
}
