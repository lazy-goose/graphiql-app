import { pathes } from '@/constants/constants'
import { auth } from '@/firebase'
import { useBoundStore } from '@/store'
import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

export function Header(props: { leftSlot?: React.ReactNode }) {
  const { leftSlot } = props

  const user = useBoundStore((state) => state.user)
  const setPageMode = useBoundStore((state) => state.setPageMode)
  const navigate = useNavigate()

  const handleSignOutButton = async () => {
    signOut(auth)
  }

  const handleSignInButton = async () => {
    setPageMode('signIn')
    navigate(pathes.signInUpPage)
  }

  const handleSignUpButton = async () => {
    setPageMode('signUp')
    navigate(pathes.signInUpPage)
  }

  const rightSlot = (
    <Stack direction="row" spacing={1}>
      {!user && (
        <Button variant="contained" onClick={handleSignInButton}>
          SignIn
        </Button>
      )}
      {!user && (
        <Button variant="contained" onClick={handleSignUpButton}>
          SignUp
        </Button>
      )}
      {user && (
        <Button variant="contained" onClick={handleSignOutButton}>
          SignOut
        </Button>
      )}
    </Stack>
  )

  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        '.MuiToolbar-root': {
          paddingBlock: 1,
          paddingInline: 2,
          boxSizing: 'border-box',
        },
      })}
    >
      <Toolbar>
        <Logo />
        <Box pl={1} flexGrow={1}>
          {leftSlot}
        </Box>
        <Box>{rightSlot}</Box>
      </Toolbar>
    </AppBar>
  )
}
