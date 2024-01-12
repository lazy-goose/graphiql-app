import { useBoundStore } from '@/store'
import { Stack, TextField } from '@mui/material'
import { printSchema } from 'graphql'
import { Loader } from '../Loader'

export default function Documentation() {
  const schema = useBoundStore((state) => state.schema)
  const schemaError = useBoundStore((state) => state.schemaError)
  const isSchemaFetching = useBoundStore((state) => state.isSchemaFetching)

  if (isSchemaFetching) {
    return <Loader />
  }

  if (schemaError) {
    return schemaError?.message
  }

  if (!schema) {
    return 'No schema'
  }

  return (
    <Stack direction="row">
      <TextField sx={{ width: '100%' }} multiline value={printSchema(schema)} />
    </Stack>
  )
}
