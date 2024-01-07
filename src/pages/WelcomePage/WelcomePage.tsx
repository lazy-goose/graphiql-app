import { Footer } from '@/components/Footer/Footer'
import { userAvatars } from '@/constants'
import { useLocale } from '@/hooks/useLocale'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import WelcomePageHeader from './WelcomePageHeader'

function TeammateCard(props: {
  href: string
  cvHref: string
  imgSrc: string
  imgAlt: string
  id: string
}) {
  const { href, imgSrc, imgAlt, cvHref } = props
  //const {locale} = useLocale()
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Avatar variant="square" src={imgSrc} alt={imgAlt} />
          <Link href={cvHref} variant="h5">
            {/*locale.welcomePage.typography.text.team[id].name*/}
          </Link>
        </CardContent>
        <CardActions>
          <Button href={href} size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
export default function WelcomePage() {
  const { locale } = useLocale()
  return (
    <Stack minHeight="inherit" justifyContent="center">
      <WelcomePageHeader />
      <Container
        component="main"
        sx={{
          marginBlock: 2,
          flex: 1,
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <Stack gap={'3em'} alignItems="center">
          <Stack gap={'1em'} maxWidth={695} component="section">
            <Typography
              textAlign="center"
              component="h2"
              sx={{ typography: { md: 'h2', sm: 'h3', xs: 'h4' } }}
            >
              {locale.welcomePage.typography.heading.sponsor}
            </Typography>
            <Typography
              component="p"
              sx={{
                typography: { sm: 'h5', xs: 'body1' },
                textAlign: { md: 'left', sm: 'justify', xs: 'justify' },
              }}
            >
              <Typography
                textAlign="center"
                component="span"
                fontWeight="bold"
                variant="inherit"
                mr={1}
              >
                RS School
              </Typography>
              {locale.welcomePage.typography.text.sponsor.part1}
              <Link
                ml={1}
                mr={1}
                href="https://rs.school/react"
                sx={(theme) => ({
                  color: theme.palette.text.primary,
                  textDecorationColor: theme.palette.text.primary,
                  '&:hover': {
                    color: theme.palette.info.main,
                  },
                })}
              >
                The Rolling Scopes
              </Link>
              <Typography
                component="span"
                sx={{ typography: { sm: 'h5', xs: 'body1' } }}
              >
                {locale.welcomePage.typography.text.sponsor.part2}
              </Typography>
            </Typography>
            <Typography
              component="p"
              sx={{
                typography: { sm: 'body1' },
                textAlign: { md: 'left', sm: 'justify', xs: 'justify' },
              }}
            >
              {locale.welcomePage.typography.text.sponsor.part3}
            </Typography>
            <Typography
              component="p"
              sx={{
                typography: { sm: 'body1' },
                textAlign: { md: 'left', sm: 'justify', xs: 'justify' },
              }}
            >
              {locale.welcomePage.typography.text.sponsor.part4}
            </Typography>
          </Stack>
          <Box component="section" textAlign="center">
            <Typography
              component="h2"
              sx={{ typography: { md: 'h2', sm: 'h3', xs: 'h4' } }}
            >
              {locale.welcomePage.typography.heading.team}
            </Typography>
            <Stack direction="row" flexWrap="wrap" justifyContent="center">
              {userAvatars.map(({ href, imgSrc, imgAlt, id, cvHref }) => (
                <TeammateCard
                  href={href}
                  imgSrc={imgSrc}
                  imgAlt={imgAlt}
                  id={id}
                  key={id}
                  cvHref={cvHref}
                />
              ))}
            </Stack>
          </Box>
          <Box component="section" textAlign="center">
            <Typography
              component="h2"
              sx={{ typography: { md: 'h2', sm: 'h3', xs: 'h4' } }}
            >
              {locale.welcomePage.typography.heading.wishes}
            </Typography>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </Stack>
  )
}
