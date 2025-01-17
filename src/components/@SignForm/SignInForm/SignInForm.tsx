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
import { useSnackbar } from 'notistack'
import { type SubmitHandler } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'
import { PasswordInput } from '../PasswordInput'

export default function SignInForm() {
  const {
    signIn: { schema },
  } = useValidators()

  const {
    locale: { signInUpPage },
  } = useLocale()
  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useLocaleForm<UserSignInData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit: SubmitHandler<UserSignInData> = async ({
    email,
    password,
  }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => reset())
      .catch((error: Error) => {
        enqueueSnackbar({
          variant: 'customAlert',
          message: error?.message,
        })
      })
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
        {signInUpPage.typography.heading.signIn}
      </Typography>
      <TextField
        type="email"
        id="email"
        autoComplete="username"
        label={signInUpPage.inputLabel.email}
        error={Boolean(errors.email)}
        helperText={errors.email?.message || ' '}
        disabled={isSubmitting}
        {...register('email')}
      />
      <PasswordInput
        id="current-password"
        autoComplete="current-password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message || ' '}
        disabled={isSubmitting}
        {...register('password')}
      />
      <LoadingButton
        loading={isSubmitting}
        type="submit"
        size="large"
        variant="contained"
      >
        {signInUpPage.button.submit}
      </LoadingButton>
      <Typography
        mt={1}
        ml="auto"
        sx={(theme) => ({
          color: isSubmitting ? theme.palette.text.disabled : 'inherit',
        })}
      >
        {signInUpPage.typography.question.signIn}{' '}
        <Link
          component={RouterLink}
          to={RouterPath.SignUp}
          underline="hover"
          sx={(theme) => ({
            color: isSubmitting
              ? theme.palette.text.disabled
              : theme.palette.primary.main,
          })}
        >
          {signInUpPage.link.signUp}
        </Link>
      </Typography>
    </Stack>
  )
}
