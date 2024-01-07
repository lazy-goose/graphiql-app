import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { Stack } from '@mui/material'
import React from 'react'
import MainControls from './MainControls'
import MainLayout from './MainLayout'

const QueryRequest = React.lazy(() => {
  return import('@/components/QueryRequest/QueryRequest')
})
const QueryResponse = React.lazy(() => {
  return import('@/components/QueryResponse/QueryResponse')
})
const RequestHeaders = React.lazy(() => {
  return import('@/components/RequestHeaders/RequestHeaders')
})
const RequestVariables = React.lazy(() => {
  return import('@/components/RequestVariables/RequestVariables')
})

export default function MainPage() {
  return (
    <Stack>
      <Header />
      <MainControls />
      <MainLayout
        documentation={<div>Documentation</div>}
        request={<QueryRequest />}
        variables={<RequestVariables />}
        headers={<RequestHeaders />}
        response={<QueryResponse />}
      />
      <Footer />
    </Stack>
  )
}
