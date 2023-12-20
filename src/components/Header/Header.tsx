import { pathes } from '@/constants/constants'
import { auth } from '@/firebase'
import { useBoundStore } from '@/store'
import { Button } from '@mui/material'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'

export function Header() {
  const user = useBoundStore((state) => state.user)
  const setPageMode = useBoundStore((state) => state.setPageMode)

  const handleSignOutButton = async () => {
    await signOut(auth)
  }

  const handleSignInButton = async () => {
    setPageMode('signIn')
  }

  const handleSignUpButton = async () => {
    setPageMode('signUp')
  }

  return (
    <header style={{ display: 'flex' }}>
      <Link to={pathes.mainPage}>Main Page</Link>
      <p>Loged in user: {user?.email}</p>
      {!user && <Button onClick={handleSignInButton}>SignIn</Button>}
      {!user && <Button onClick={handleSignUpButton}>SignUp</Button>}
      {user && <Button onClick={handleSignOutButton}>SignOut</Button>}
    </header>
  )
}
