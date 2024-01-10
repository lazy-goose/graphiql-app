import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Description } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Stack } from '@mui/material'

export default function MainControls() {
  const toggleAside = useBoundStore((s) => s.toggleAside)
  const { locale } = useLocale()

  const isSchemaFetching = useBoundStore((state) => state.isSchemaFetching)

  return (
    <Stack
      component="nav"
      py={1.5}
      spacing={1}
      direction="row"
      justifyContent="start"
    >
      <LoadingButton
        size="small"
        variant="contained"
        disableRipple
        onClick={() => toggleAside()}
        sx={{
          borderRadius: 0,
          paddingInline: 1.5,
        }}
        loading={isSchemaFetching}
        loadingPosition="start"
        startIcon={<Description />}
      >
        {locale.mainPage.button.openDocs}
      </LoadingButton>
    </Stack>
  )
}
