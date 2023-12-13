import { pathes } from '@/constants/constants'
import { Link } from 'react-router-dom'

export function MainPage(): React.ReactElement {
  return (
    <>
      <header />
      <main>
        <h1>Main Page</h1>
        <Link to={pathes.welcomePage}>Welcome Page</Link>
        <Link to={pathes.signInUpPage}>Sign In & Sign Up Page</Link>
      </main>
      <footer />
    </>
  )
}
