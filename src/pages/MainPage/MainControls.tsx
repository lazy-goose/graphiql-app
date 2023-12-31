import { useBoundStore } from '@/store'
import { Description } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'

export default function MainControls() {
  const toggleAside = useBoundStore((s) => s.toggleAside)
  return (
    <Stack
      component="nav"
      py={1}
      spacing={1}
      direction="row"
      justifyContent="start"
    >
      <Button
        size="small"
        variant="contained"
        disableRipple
        onClick={() => toggleAside()}
        sx={{
          borderRadius: 0,
          paddingInline: 1.5,
        }}
        startIcon={<Description />}
      >
        Open docs
      </Button>
    </Stack>
  )
}
