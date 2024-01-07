import { Footer } from '@/components/Footer'
import { RouterPath } from '@/constants'
import WelcomePageHeader from '@/pages/WelcomePage/WelcomePageHeader'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Stack minHeight="inherit" justifyContent="center">
      <WelcomePageHeader />
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
        <Stack gap="3em" alignItems="center">
          <Typography variant="h2" fontSize="2.75rem">
            Don&apos;t know where you&nbsp;are?
          </Typography>
          <Typography variant="h5" fontSize="1rem">
            We really have no idea either...
          </Typography>
          <Button
            component={RouterLink}
            to={RouterPath.Welcome}
            variant="contained"
            sx={{ width: 'max-content' }}
          >
            Welcome Page
          </Button>
          <Box
            sx={(theme) => ({
              ...theme.typography.h1,
              position: 'absolute',
              top: '50%',
              left: '50%',
              translate: '-50% -50%',
              zIndex: -1,
              userSelect: 'none',
              fontWeight: 'bold',
              color: theme.palette.text.disabled,
              fontSize: 'clamp(12rem, -8rem + 75vw, 25rem)',
              opacity: 0.15,
            })}
          >
            404
          </Box>
        </Stack>
      </Container>
      <Footer />
    </Stack>
  )
}
