import { Footer } from '@/components/Footer'
import { Box, Container, Stack } from '@mui/material'
import SignPagesHeader from './SignPagesHeader'

export default function SignGroupLayout(props: React.PropsWithChildren) {
  return (
    <Stack height={1} minHeight="inherit">
      <SignPagesHeader />
      <Container
        component="main"
        maxWidth="sm"
        sx={{ flex: 1, display: 'grid', alignItems: 'center' }}
      >
        <Box>{props.children}</Box>
      </Container>
      <Footer />
    </Stack>
  )
}
