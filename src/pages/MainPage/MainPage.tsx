import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RouterPath } from '@/constants'
import { useBoundStore } from '@/store'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainControls from './MainControls'
import MainLayout from './MainLayout'
import SchemaControls from './SchemaControls'

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
const Documentation = React.lazy(() => {
  return import('@/components/Documentation/Documentation')
})

export default function MainPage() {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const user = useBoundStore((state) => state.user)

  const navigate = useNavigate()

  const handleRedirect = (): void => {
    if (!user) {
      navigate(RouterPath.Welcome)
    }
  }

  useEffect(handleRedirect)

  return (
    <Stack>
      <Header leftSlot={!mobile && <SchemaControls />} />
      {mobile && <SchemaControls variant="mobile" mt={1.5} mb={0.5} />}
      <MainControls />
      <MainLayout
        documentation={<Documentation />}
        request={<QueryRequest />}
        variables={<RequestVariables />}
        headers={<RequestHeaders />}
        response={<QueryResponse />}
      />
      <Footer />
    </Stack>
  )
}
