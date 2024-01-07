import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Stack } from '@mui/material'
import { ErrorBoundary } from '../ErrorBoundary'
import { ErrorBlock } from './ErrorBlock'

export default function ErrorBoundaryWrapper(props: {
  errorHeaderSlot?: React.ReactNode
  children: React.ReactNode
}) {
  const { children, errorHeaderSlot: headerSlot = <Header /> } = props
  const fallback = (
    <Stack minHeight="inherit">
      {headerSlot}
      <ErrorBlock />
      <Footer />
    </Stack>
  )
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
}
