import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { Stack } from '@mui/material'
import React from 'react'
import MainControls from './MainControls'
import MainLayout from './MainLayout'

const Response = React.lazy(() => {
  return import('@/components/Response/Response')
})
const RequestHeaders = React.lazy(() => {
  return import('@/components/RequestHeaders/RequestHeaders')
})

export default function MainPage() {
  return (
    <Stack>
      <Header />
      <MainControls />
      <MainLayout
        documentation={<div>Documentation</div>}
        request={<div>Request</div>}
        variables={<div>Variables</div>}
        headers={<RequestHeaders />}
        response={<Response />}
      />
      <Footer />
    </Stack>
  )
}
