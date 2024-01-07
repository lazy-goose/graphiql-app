import { Footer } from '@/components/Footer'
import { TeammateCard } from '@/components/TeammateCard'
import { userAvatars } from '@/constants'
import { useLocale } from '@/hooks/useLocale'
import { Box, Container, Link, Stack, Typography } from '@mui/material'
import WelcomePageHeader from './WelcomePageHeader'

export default function WelcomePage() {
  const {
    locale: { welcomePage },
  } = useLocale()
  return (
    <Stack minHeight="inherit" justifyContent="center">
      <WelcomePageHeader />
      <Container
        component="main"
        maxWidth={false}
        sx={{
          marginBlock: 2,
          flex: 1,
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <Stack gap={'2em'} alignItems="center">
          <Stack gap={'0.5em'} maxWidth={695} component="section">
            <Typography
              textAlign="center"
              component="h2"
              sx={{
                fontSize: { md: '3rem', sm: '2rem', xs: '1.5rem' },
                fontWeight: 'light',
              }}
            >
              {welcomePage.typography.heading.functional.part1}
              <Typography
                component="span"
                color="secondary"
                ml="1rem"
                sx={{
                  fontSize: { md: '3rem', sm: '2rem', xs: '1.5rem' },
                  fontWeight: 'light',
                }}
              >
                {welcomePage.typography.heading.functional.part2}
              </Typography>
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: { sm: '1.375rem', xs: '1rem' },
                fontWeight: 'light',
                textAlign: { md: 'left', sm: 'justify', xs: 'justify' },
              }}
            >
              {welcomePage.typography.text.functional.part1}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: { sm: '1rem' },
                fontWeight: 'light',
                textAlign: { md: 'left', sm: 'justify', xs: 'justify' },
              }}
            >
              {welcomePage.typography.text.functional.part2}
            </Typography>
          </Stack>
          <Stack spacing={2} component="section" textAlign="center">
            <Typography
              component="h2"
              sx={{
                fontSize: { md: '3rem', sm: '2rem', xs: '1.5rem' },
                fontWeight: 'light',
              }}
            >
              {welcomePage.typography.heading.team}
            </Typography>
            <Stack
              direction="row"
              gap="1.25rem"
              flexWrap="wrap"
              justifyContent="center"
            >
              {userAvatars.map(
                ({ href, imgSrc, imgAlt, id, cvHref, tgHref }) => (
                  <TeammateCard
                    href={href}
                    imgSrc={imgSrc}
                    imgAlt={imgAlt}
                    id={id}
                    key={id}
                    cvHref={cvHref}
                    tgHref={tgHref}
                  />
                ),
              )}
            </Stack>
          </Stack>
          <Stack gap={'0.5em'} maxWidth={695} component="section">
            <Typography
              textAlign="center"
              component="h2"
              sx={{
                fontSize: { md: '3rem', sm: '2rem', xs: '1.5rem' },
                fontWeight: 'light',
              }}
            >
              {welcomePage.typography.heading.sponsor}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: { sm: '1.375rem', xs: '1rem' },
                fontWeight: 'light',
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
              {welcomePage.typography.text.sponsor.part1}
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
                sx={{
                  fontSize: { sm: '1.375rem', xs: '1rem' },
                  fontWeight: 'light',
                }}
              >
                {welcomePage.typography.text.sponsor.part2}
              </Typography>
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: { sm: '1rem' },
                fontWeight: 'light',
                textAlign: { md: 'left', sm: 'justify', xs: 'justify' },
              }}
            >
              {welcomePage.typography.text.sponsor.part3}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: { sm: '1rem' },
                fontWeight: 'light',
                textAlign: { md: 'left', sm: 'justify', xs: 'justify' },
              }}
            >
              {welcomePage.typography.text.sponsor.part4}
            </Typography>
          </Stack>
          <Stack
            spacing={2}
            component="section"
            textAlign="center"
            alignItems="center"
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { md: '3rem', sm: '2rem', xs: '1.5rem' },
                fontWeight: 'light',
              }}
            >
              {welcomePage.typography.heading.wishes}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontWeight: 'light',
                fontSize: { sm: '1.375rem', xs: '1rem' },
              }}
            >
              {welcomePage.typography.text.wishes}
            </Typography>
            <Box
              component="img"
              sx={{
                width: 333,
                maxHeight: { xs: 290, md: 333 },
                maxWidth: { xs: 290, md: 333 },
              }}
              alt="New Year image"
              src="src/assets/presents.png"
            />
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </Stack>
  )
}
