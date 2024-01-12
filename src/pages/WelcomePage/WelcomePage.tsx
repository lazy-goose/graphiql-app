import { Footer } from '@/components/Footer'
import { teammates } from '@/constants'
import { mainTheme } from '@/globals/themes/main'
import { useLocale } from '@/hooks/useLocale'
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  type BoxProps,
} from '@mui/material'
import TeammateCard from './TeammateCard'
import WelcomePageHeader from './WelcomePageHeader'
import EditorImg from './assets/editor.png'
import PresentsImg from './assets/presents.svg'

const section = { component: 'section' } satisfies BoxProps

const welcomePageTheme = createTheme(mainTheme, {
  typography: {
    h2: {
      textAlign: 'center',
      marginBlock: '1.2em',
      fontSize: '3rem',
      [mainTheme.breakpoints.down('sm')]: {
        fontSize: '2.2rem',
      },
    },
    body1: {
      fontWeight: 'lighter',
      marginBlock: 25,
      fontSize: '1.6rem',
      [mainTheme.breakpoints.down('md')]: {
        fontSize: '1.25rem',
      },
    },
    body2: {
      fontWeight: 'lighter',
      marginBlock: 25,
      fontSize: '1.25rem',
      [mainTheme.breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
  },
})

export default function WelcomePage() {
  const {
    locale: { welcomePage },
  } = useLocale()
  return (
    <Stack minHeight="inherit">
      <WelcomePageHeader />
      <ThemeProvider theme={welcomePageTheme}>
        <Box component="main" flex={1}>
          <Container maxWidth="xl">
            <Box {...section}>
              {/* prettier-ignore */}
              <Typography variant="h2" maxWidth="md" mx="auto">
                {welcomePage.typography.heading.functional.part1}
                {' '}
                <Box component="span" color="secondary.main">
                  {welcomePage.typography.heading.functional.part2}
                </Box>
              </Typography>
              <Box
                sx={(theme) => ({
                  boxSizing: 'border-box',
                  border: `1px solid`,
                  borderColor: theme.palette.divider,
                  marginInline: -2,
                })}
              >
                <Box
                  component="img"
                  src={EditorImg}
                  alt="Editor screenshot"
                  display="block"
                  maxWidth={1}
                  marginInline="auto"
                />
              </Box>
            </Box>
          </Container>
          <Container maxWidth="md">
            <Box {...section}>
              <Typography variant="h2">
                {welcomePage.typography.heading.sponsor}
              </Typography>
              {/* prettier-ignore */}
              <Typography variant="body1">
                <Box component="span" fontWeight="bold">RS School</Box>
                {' '}
                {welcomePage.typography.text.sponsor.part1}
                {' '}
                <Link variant="inherit" href="https://rs.school/react">The Rolling Scopes</Link>
                {' '}
                {welcomePage.typography.text.sponsor.part2}
              </Typography>
              <Typography variant="body2">
                {welcomePage.typography.text.sponsor.part3}
              </Typography>
              <Typography variant="body2">
                {welcomePage.typography.text.sponsor.part4}
              </Typography>
            </Box>
          </Container>
          <Container maxWidth="lg">
            <Box {...section}>
              <Typography variant="h2">
                {welcomePage.typography.heading.team}
              </Typography>
              <Grid container gap={2} justifyContent="center">
                {teammates.map(({ id, avatar, github, telegram }) => (
                  <Grid
                    key={id}
                    item
                    xs
                    sx={(theme) => ({
                      [theme.breakpoints.up('xs')]: {
                        minWidth: '300px',
                        maxWidth: '400px',
                      },
                    })}
                  >
                    <TeammateCard
                      personName={welcomePage.typography.text.team[id].name}
                      taskList={welcomePage.typography.text.team[id].tasks}
                      avatarSrc={avatar}
                      socials={{
                        github,
                        telegram,
                      }}
                      CardProps={{
                        sx: {
                          height: 1,
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
          <Container maxWidth="md">
            <Box {...section}>
              <Typography variant="h2">
                {welcomePage.typography.heading.wishes}
              </Typography>
              <Typography variant="body1" textAlign="center">
                {welcomePage.typography.text.wishes}
              </Typography>
              <Box
                display="block"
                maxWidth={0.8}
                my={5}
                mx="auto"
                component="img"
                src={PresentsImg}
                alt="Congratulations with New Year"
              />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      <Footer />
    </Stack>
  )
}
