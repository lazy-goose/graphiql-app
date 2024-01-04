import { auth } from '@/firebase'
import { useBoundStore } from '@/store'
import { type UserSignInData, type UserSignUpData } from '@/types'
import { signupSchema } from '@/utils/zodUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Link, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ConfirmPasswordInput } from '../ConfirmPasswordInput'
import { EmailInput } from '../EmailInput'
import { PasswordInput } from '../PasswordInput'

export function SignUpForm() {
  const [isIndicator, setIsIndicator] = useState(false)

  const setPageMode = useBoundStore((state) => state.setPageMode)

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isLoading },
  } = useForm<UserSignUpData | UserSignInData>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  })

  const onSubmit: SubmitHandler<UserSignUpData | UserSignInData> = (user) => {
    handleSignUpButton(user.email, user.password)
    reset()
    setIsIndicator(false)
  }

  const handleSignInLink = () => {
    setPageMode('signIn')
  }

  const handleSignUpButton = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 1 / 1,
      }}
    >
      <Box
        sx={{
          mt: 1,
          width: { xs: 99 / 100, md: 552 },
          display: 'flex',
          flexDirection: 'column',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Typography component="h2" variant="h5">
          Sign up
        </Typography>
        <EmailInput register={register} errors={errors} />
        <PasswordInput
          register={register}
          setIsIndicator={setIsIndicator}
          watch={watch}
          isIndicator={isIndicator}
        />
        <ConfirmPasswordInput register={register} errors={errors} />
        <LoadingButton
          fullWidth
          loading={isLoading}
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Sign up
        </LoadingButton>
        <Box
          sx={{
            mt: 1,
            width: { xs: 99 / 100, md: 552 },
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography
            sx={{
              mr: 1,
            }}
            variant="body1"
          >
            Already have an account?
          </Typography>
          <Link
            component="button"
            variant="body1"
            underline="hover"
            onClick={handleSignInLink}
          >
            Sign in
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
