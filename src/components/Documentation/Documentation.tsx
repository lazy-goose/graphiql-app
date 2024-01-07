import { getApiIntrospectionSchema } from '@/API'
import { useBoundStore } from '@/store'
import { Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Documentation() {
  const baseUrl = useBoundStore((state) => state.baseUrl)
  const [documentation, setDocumentation] = useState('')

  useEffect(() => {
    getApiIntrospectionSchema(baseUrl).then(
      (result) => setDocumentation(result),
      (error: Error) => console.error(error),
    )
  }, [baseUrl])
  return (
    <Stack direction="row">
      <TextField sx={{ width: '100%' }} multiline value={documentation} />
    </Stack>
  )
}
