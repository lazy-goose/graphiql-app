import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { Response } from '@/components/Response'
import { Stack } from '@mui/material'
import MainControls from './MainControls'
import MainLayout from './MainLayout'

export default function MainPage() {
  return (
    <Stack>
      <Header />
      <MainControls />
      <MainLayout
        documentation={<div>Documentation</div>}
        request={<div>Request</div>}
        variables={<div>Variables</div>}
        headers={<div>Headers</div>}
        response={<Response />}
      />
      <Footer />
    </Stack>
  )
}
