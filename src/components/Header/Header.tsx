import { pathes } from '@/constants/constants'
import { auth } from '@/firebase'
import { useBoundStore } from '@/store'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

export function Header() {
  const user = useBoundStore((state) => state.user)
  const setPageMode = useBoundStore((state) => state.setPageMode)
  const navigate = useNavigate()

  const handleSignOutButton = async () => {
    await signOut(auth)
  }

  const handleSignInButton = async () => {
    setPageMode('signIn')
    navigate(pathes.signInUpPage)
  }

  const handleSignUpButton = async () => {
    setPageMode('signUp')
    navigate(pathes.signInUpPage)
  }

  return (
    <AppBar position="static" color="inherit">
      <Toolbar variant="dense" sx={{ justifyContent: 'space-around' }}>
        <Link to={pathes.mainPage}>Main Page</Link>
        <Box sx={{ display: 'flex' }}>
          <p>Loged in user: {user?.email}</p>
          {!user && <Button onClick={handleSignInButton}>SignIn</Button>}
          {!user && <Button onClick={handleSignUpButton}>SignUp</Button>}
          {user && <Button onClick={handleSignOutButton}>SignOut</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
