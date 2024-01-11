import { RouterPath } from '@/constants/constants'
import { auth } from '@/firebase'
import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Logout } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  useScrollTrigger,
} from '@mui/material'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { OutlineButton } from '../OutlineButton'
import LanguageMenu from './LanguageMenu'
import Logo from './Logo'

export default function Header(props: { leftSlot?: React.ReactNode }) {
  const { leftSlot } = props
  const { locale } = useLocale()

  const user = useBoundStore((state) => state.user)

  const handleSignOutButton = async () => {
    signOut(auth)
  }

  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  })

  const rightSlot = (
    <Stack direction="row" spacing={1}>
      <LanguageMenu />
      {user ? (
        <OutlineButton onClick={handleSignOutButton} startIcon={<Logout />}>
          {locale.header.button.signOut}
        </OutlineButton>
      ) : (
        <>
          <Button
            component={Link}
            to={RouterPath.SignIn}
            variant="contained"
            disabled={location.pathname === RouterPath.SignIn}
          >
            {locale.header.button.signIn}
          </Button>
          <Button
            component={Link}
            to={RouterPath.SignUp}
            variant="contained"
            disabled={location.pathname === RouterPath.SignUp}
          >
            {locale.header.button.signUp}
          </Button>
        </>
      )}
    </Stack>
  )

  const opacify = (hex: string) => hex + 25
  const gradient = () =>
    `linear-gradient(to right, ${opacify('#42a5f5')}, ${opacify('#ec5db7')})`

  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({
        color: theme.palette.text.primary,
        backgroundColor: opacify('#ffffff'),
        backdropFilter: 'blur(8px)',
        '.MuiToolbar-root': {
          paddingBlock: 1,
          paddingInline: { sm: 2, xs: 1 },
          boxSizing: 'border-box',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: gradient(),
          opacity: trigger ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        },
      })}
    >
      <Toolbar>
        <Logo />
        <Box pl={2} flexGrow={1}>
          {leftSlot}
        </Box>
        <Box flexShrink={0}>{rightSlot}</Box>
      </Toolbar>
    </AppBar>
  )
}
