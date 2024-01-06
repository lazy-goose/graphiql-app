import { RouterPath } from '@/constants/constants'
import { Link } from 'react-router-dom'
import WelcomePageHeader from './WelcomePageHeader'

export default function WelcomePage(): React.ReactElement {
  return (
    <>
      <WelcomePageHeader />
      <main>
        <h1>Sign In & Sign Up Page</h1>
        <Link to={RouterPath.Main}>Main Page</Link>
      </main>
      <footer />
    </>
  )
}
