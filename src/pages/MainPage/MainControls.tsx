import { Description } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'

export default function MainControls() {
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
