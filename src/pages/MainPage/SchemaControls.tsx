import { useBoundStore } from '@/store'
import { Refresh } from '@mui/icons-material'
import { Button, Stack, TextField, type StackProps } from '@mui/material'

export default function SchemaControls(
  props: StackProps & {
    variant?: 'desktop' | 'mobile'
  },
) {
  const { variant = 'desktop', ...passStackProps } = props
  const baseUrl = useBoundStore((state) => state.baseUrl)
  const setBaseUrl = useBoundStore((state) => state.setBaseUrl)

  const handleRefetchButtonClick = () => {}

  return (
    <Stack
      direction="row"
      ml={1}
      mr={2}
      gap={1}
      alignItems="center"
      {...passStackProps}
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
      />
      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={handleRefetchButtonClick}
        sx={{
          flexShrink: 0,
          alignSelf: 'end',
        }}
      >
        Refetch
      </Button>
    </Stack>
  )
}
