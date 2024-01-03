import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { SignInForm } from '@/components/SignInForm'
import { Container, Stack } from '@mui/material'

export default function SignUpPage() {
  return (
    <Stack>
      <Header />
      <Container>
        <SignInForm />
      </Container>
      <Footer />
    </Stack>
  )
}
