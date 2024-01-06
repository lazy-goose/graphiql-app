import { RouterPath } from '@/constants'
import { auth } from '@/firebase'
import { useLocale } from '@/hooks/useLocale'
import { useLocaleForm } from '@/hooks/useLocaleForm'
import { useValidators } from '@/hooks/useValidators'
import { type UserSignInData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Link, Stack, TextField, Typography } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { type SubmitHandler } from 'react-hook-form'
import { Link as LinkRouter } from 'react-router-dom'
import { PasswordInput } from '../PasswordInput'

export default function SignInForm() {
  const {
    signIn: { schema },
  } = useValidators()

  const { locale } = useLocale()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useLocaleForm<UserSignInData>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<UserSignInData> = async ({
    email,
    password,
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack
      mb={2}
      gap={1.5}
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography mb={2} component="h2" variant="h4">
        {locale.signInUpPage.typography.heading.signIn}
      </Typography>
      <TextField
        type="email"
        label={locale.signInUpPage.inputLabel.email}
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message || ' '}
        {...register('email')}
      />
      <PasswordInput
        autoComplete="current-password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message || ' '}
        {...register('password')}
      />
      <LoadingButton
        loading={isLoading}
        type="submit"
        size="large"
        variant="contained"
      >
        {locale.signInUpPage.button.submit}
      </LoadingButton>
      <Typography mt={1} ml="auto">
        {locale.signInUpPage.typography.question.signIn}{' '}
        <Link component={LinkRouter} to={RouterPath.SignUp} underline="hover">
          {locale.signInUpPage.link.signUp}
        </Link>
      </Typography>
    </Stack>
  )
}
