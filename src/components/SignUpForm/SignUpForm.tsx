import { auth } from '@/firebase'
import { useBoundStore } from '@/store'
import { type userSignInData, type userSignUpData } from '@/types/types'
import { signupSchema } from '@/utils/zodUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Link, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ConfirmPasswordInput } from '../ConfirmPasswordInput'
import { EmailInput } from '../EmailInput'
import { PasswordInput } from '../PasswordInput'

export function SignUpForm() {
  const [isIndicator, setIsIndicator] = useState(false)
  const setPageMode = useBoundStore((state) => state.setPageMode)
  const user = useBoundStore((state) => state.user)

  const onSubmit: SubmitHandler<userSignUpData | userSignInData> = (user) => {
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

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<userSignUpData | userSignInData>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h2" variant="h5">
        Sign Up
      </Typography>
      <Box
        sx={{
          mt: 1,
          minWidth: '552px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <EmailInput register={register} errors={errors} />
        <PasswordInput
          register={register}
          setIsIndicator={setIsIndicator}
          watch={watch}
          isIndicator={isIndicator}
        />
        <ConfirmPasswordInput register={register} errors={errors} />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Sign Up
        </Button>
        <Box
          sx={{
            mt: 1,
            minWidth: '552px',
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
            underline="none"
            onClick={handleSignInLink}
          >
            Sign In
          </Link>
        </Box>
        <p>Loged in user: {user?.email}</p>
      </Box>
    </Box>
  )
}
