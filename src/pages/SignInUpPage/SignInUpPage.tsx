import { Header } from '@/components/Header'
import { SignInForm } from '@/components/SignInForm'
import { SignUpForm } from '@/components/SignUpForm'
import { pathes } from '@/constants/constants'
import { useBoundStore } from '@/store'
import { Box, ThemeProvider, createTheme } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200,
    },
  },
})

export function SignInUpPage() {
  const pageMode = useBoundStore((state) => state.pageMode)
  const user = useBoundStore((state) => state.user)

  const navigate = useNavigate()

  const handleRedirect = (): void => {
    if (user) {
      navigate(pathes.mainPage)
    }
  }

  useEffect(handleRedirect)

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {pageMode === 'signIn' && <SignInForm />}
        {pageMode === 'signUp' && <SignUpForm />}
      </Box>
      <footer />
    </ThemeProvider>
  )
}
