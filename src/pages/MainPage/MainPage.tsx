import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import useErrorEffect from '@/hooks/useErrorEffect'
import { useBoundStore } from '@/store'
import { Stack, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import MainControls from './MainControls'
import MainLayout from './MainLayout'
import SchemaControls from './SchemaControls'

const MainPageSlot = (i: ReturnType<Parameters<typeof React.lazy>[0]>) =>
  React.memo(React.lazy(() => i))

const QueryRequest = MainPageSlot(
  import('@/components/QueryRequest/QueryRequest'),
)
const QueryResponse = MainPageSlot(
  import('@/components/QueryResponse/QueryResponse'),
)
const RequestHeaders = MainPageSlot(
  import('@/components/RequestHeaders/RequestHeaders'),
)
const RequestVariables = MainPageSlot(
  import('@/components/RequestVariables/RequestVariables'),
)
const Documentation = MainPageSlot(
  import('@/components/Documentation/Documentation'),
)

export default function MainPage() {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const fetchSchema = useBoundStore((state) => state.fetchSchema)
  const schemaError = useBoundStore((state) => state.schemaError)
  const responseError = useBoundStore((state) => state.responseError)

  useEffect(() => {
    fetchSchema()
  }, [fetchSchema])

  useErrorEffect(responseError)
  useErrorEffect(schemaError)

  return (
    <Stack>
      <Header leftSlot={!mobile && <SchemaControls />} />
      {mobile && <SchemaControls variant="mobile" mt={1.5} mb={0.5} mx={1} />}
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
