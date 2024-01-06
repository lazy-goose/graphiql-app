import { RouterPath } from '@/constants'
import { auth } from '@/firebase'
import { useLocale } from '@/hooks/useLocale'
import { useLocaleForm } from '@/hooks/useLocaleForm'
import { useValidators } from '@/hooks/useValidators'
import { type UserSignInData, type UserSignUpData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import { Link, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { type SubmitHandler } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'
import { PasswordInput } from '../PasswordInput'
import { PasswordStrength } from '../PasswordStrength'

export default function SignUpForm() {
  const {
    signUp: { schema },
  } = useValidators()

  const { locale } = useLocale()

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useLocaleForm<UserSignUpData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
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
        {locale.signInUpPage.typography.heading.signUp}
      </Typography>
      <TextField
        type="email"
        label={locale.signInUpPage.inputLabel.email}
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
        {locale.signInUpPage.button.submit}
      </LoadingButton>
      <Typography mt={1} ml="auto">
        {locale.signInUpPage.typography.question.signUp}{' '}
        <Link component={RouterLink} to={RouterPath.SignIn} underline="hover">
          {locale.signInUpPage.link.signIn}
        </Link>
      </Typography>
    </Stack>
  )
}
