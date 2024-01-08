import { getApiIntrospectionSchema } from '@/API'
import { useEnqueueSnackbar } from '@/hooks/useEnqueueSnackbar'
import { useBoundStore } from '@/store'
import { Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Documentation() {
  const baseUrl = useBoundStore((state) => state.baseUrl)
  const [documentation, setDocumentation] = useState('')

  const { pushSnackbar } = useEnqueueSnackbar()

  useEffect(() => {
    setDocumentation('')
    getApiIntrospectionSchema(baseUrl).then(
      (result) => setDocumentation(result),
      (error: Error) => pushSnackbar({ message: error.message }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl])
  return (
    <Stack direction="row">
      <TextField sx={{ width: '100%' }} multiline value={documentation} />
    </Stack>
  )
}
