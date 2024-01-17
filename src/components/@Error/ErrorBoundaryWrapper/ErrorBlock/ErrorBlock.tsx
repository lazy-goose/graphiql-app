import { Refresh, WarningRounded } from '@mui/icons-material'
import { Button, Container, Stack, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorBlock() {
  const navigate = useNavigate()
  const handleRefreshButtonClick = () => navigate(0)
  const buttonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    buttonRef.current?.focus()
  }, [])
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        marginBlock: 2,
        flex: 1,
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <Stack gap="3em" textAlign="center" alignItems="center">
        <Typography variant="h2" fontSize="2.75rem">
          Something went wrong
        </Typography>
        <WarningRounded
          color="error"
          sx={{
            height: '70px',
            width: 'auto',
            aspectRatio: 1,
          }}
        />
        <Button
          ref={buttonRef}
          startIcon={<Refresh />}
          variant="contained"
          onClick={handleRefreshButtonClick}
        >
          Reload page
        </Button>
      </Stack>
    </Container>
  )
}
