import { Header } from '@/components/Header'

export default function WelcomePageHeader(props: { page?: string }) {
  const { page } = props
  return <Header page={page} />
}
