import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { Box, Container, Stack } from '@mui/material'

export default function SignGroupLayout(props: React.PropsWithChildren) {
  return (
    <Stack height={1} minHeight="inherit">
      <Header />
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
