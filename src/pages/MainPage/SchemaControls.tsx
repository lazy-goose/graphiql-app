import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Refresh } from '@mui/icons-material'
import { Button, Stack, TextField, type StackProps } from '@mui/material'
import { useState } from 'react'

export default function SchemaControls(
  props: StackProps & {
    variant?: 'desktop' | 'mobile'
  },
) {
  const { variant = 'desktop', ...passStackProps } = props
  const baseUrl = useBoundStore((state) => state.baseUrl)
  const fetchSchema = useBoundStore((state) => state.fetchSchema)
  const [urlInput, setUrlInput] = useState(baseUrl)
  const {
    locale: { header },
  } = useLocale()

  const isSchemaFetching = useBoundStore((state) => state.isSchemaFetching)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        fetchSchema(urlInput)
      }}
    >
      <Stack
        direction="row"
        mx={1.5}
        gap={1}
        alignItems="center"
        {...passStackProps}
      >
        <TextField
          label="Endpoint"
          variant="standard"
          size="small"
          value={urlInput}
          onChange={(e) => setUrlInput(e.currentTarget.value)}
          sx={{
            ...(variant === 'desktop' && {
              maxWidth: 'min(36ch, 100%)',
            }),
            flex: 1,
          }}
        />
        <Button
          type="submit"
          disabled={isSchemaFetching}
          variant="outlined"
          startIcon={<Refresh viewBox="2 2 21 21" />}
          sx={{
            flexShrink: 0,
            alignSelf: variant === 'mobile' ? 'end' : null,
          }}
        >
          {header.button.refetch}
        </Button>
      </Stack>
    </form>
  )
}
