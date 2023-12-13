import { pathes } from '@/constants/constants'
import { Link } from 'react-router-dom'

export function SignInUpPage(): React.ReactElement {
  return (
    <>
      <header />
      <main>
        <h1>Sign In & Sign Up Page</h1>
        <Link to={pathes.mainPage}>Main Page</Link>
      </main>
      <footer />
    </>
  )
}
