import { Link } from 'react-router-dom'

export function MainPage(): React.ReactElement {
  return (
    <>
      <header />
      <main>
        <h1>Main Page</h1>
        <Link to={'welcome'}>Welcome Page</Link>
        <Link to={'sign-in-up'}>Sign In & Sign Up Page</Link>
      </main>
      <footer />
    </>
  )
}
