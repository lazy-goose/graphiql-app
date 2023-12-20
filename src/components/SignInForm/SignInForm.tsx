import { auth } from '@/firebase'
import { useBoundStore } from '@/store'
import { type userSignInData } from '@/types/types'
import { signinSchema } from '@/utils/zodUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Link, Typography } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { EmailInput } from '../EmailInput'
import { PasswordInput } from '../PasswordInput'

export function SignInForm() {
  const [isIndicator, setIsIndicator] = useState(false)
  const setPageMode = useBoundStore((state) => state.setPageMode)

  const onSubmit: SubmitHandler<userSignInData> = (userData) => {
    handleSignInButton(userData.email, userData.password)
    reset()
    setIsIndicator(false)
  }

  const handleSignInButton = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignUpLink = () => {
    setPageMode('signUp')
  }

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<userSignInData>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
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
        Sign In
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
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Sign In
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
            Don&apos;t have an account?
          </Typography>
          <Link
            component="button"
            variant="body1"
            underline="none"
            onClick={handleSignUpLink}
          >
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
