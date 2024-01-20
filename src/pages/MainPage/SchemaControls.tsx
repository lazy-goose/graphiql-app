import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Refresh } from '@mui/icons-material'
import {
  Button,
  Stack,
  TextField,
  type StackProps,
  type Theme,
} from '@mui/material'

export default function SchemaControls(
  props: StackProps & {
    variant?: 'desktop' | 'mobile'
  },
) {
  const { variant = 'desktop', ...StackProps } = props
  const defaultUrl = useBoundStore((state) => state.defaultUrl)
  const baseUrl = useBoundStore((state) => state.baseUrl)
  const setBaseUrl = useBoundStore((state) => state.setBaseUrl)
  const fetchSchema = useBoundStore((state) => state.fetchSchema)
  const {
    locale: { header },
  } = useLocale()

  const schemaError = useBoundStore((state) => state.schemaError)
  const isSchemaFetching = useBoundStore((state) => state.isSchemaFetching)

  const indicatorColor = (theme: Theme) => {
    if (isSchemaFetching) {
      return theme.palette.text.secondary
    }
    if (schemaError) {
      return theme.palette.error.main
    }
    return theme.palette.success.main
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        fetchSchema()
      }}
    >
      <Stack
        direction="row"
        mx={1.5}
        gap={1}
        alignItems="center"
        {...StackProps}
      >
        <TextField
          label="Endpoint"
          variant="standard"
          size="small"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.currentTarget.value)}
          sx={{
            ...(variant === 'desktop' && {
              maxWidth: 'min(36ch, 100%)',
            }),
            flex: 1,
          }}
          placeholder={defaultUrl}
          InputLabelProps={{
            shrink: true,
            sx: (theme) => ({
              '&': {
                color: indicatorColor(theme),
              },
            }),
          }}
          InputProps={{
            sx: (theme) => ({
              '&::before': {
                borderBottomColor: indicatorColor(theme),
              },
            }),
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
