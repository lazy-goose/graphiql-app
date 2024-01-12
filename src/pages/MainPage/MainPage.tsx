import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useBoundStore } from '@/store'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
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

  const fetchSchema = useBoundStore((state) => state.fetchSchema)
  const schemaError = useBoundStore((state) => state.schemaError)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    fetchSchema()
  }, [fetchSchema])

  useEffect(() => {
    if (schemaError?.message) {
      enqueueSnackbar({
        variant: 'customAlert',
        message: schemaError.message,
      })
    }
  }, [schemaError, enqueueSnackbar])

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
