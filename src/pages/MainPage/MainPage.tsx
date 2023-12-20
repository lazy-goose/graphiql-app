import { Header } from '@/components/Header'
import { pathes } from '@/constants/constants'
import { Link } from 'react-router-dom'

export function MainPage() {
  return (
    <>
      <Header />
      <main>
        <h1>Main Page</h1>
        <Link to={pathes.welcomePage}>Welcome Page</Link>
      </main>
      <footer />
    </>
  )
}
