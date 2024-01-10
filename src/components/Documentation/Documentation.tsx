import { useBoundStore } from '@/store'
import { Box, CircularProgress, Stack, TextField } from '@mui/material'
import { printSchema } from 'graphql'

export default function Documentation() {
  const schema = useBoundStore((state) => state.schema)
  const schemaError = useBoundStore((state) => state.schemaError)
  const isSchemaFetching = useBoundStore((state) => state.isSchemaFetching)

  if (isSchemaFetching) {
    return (
      <Box height={1} sx={{ display: 'grid', placeContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
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
