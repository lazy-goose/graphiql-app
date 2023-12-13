import { Link } from 'react-router-dom'

export function WelcomePage(): React.ReactElement {
  return (
    <>
      <header />
      <main>
        <h1>Sign In & Sign Up Page</h1>
        <Link to={'/'}>Main Page</Link>
      </main>
      <footer />
    </>
  )
}
