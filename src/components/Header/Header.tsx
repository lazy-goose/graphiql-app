import { RouterPath } from '@/constants/constants'
import { auth } from '@/firebase'
import { useLocale } from '@/hooks/useLocale'
import { useBoundStore } from '@/store'
import { Logout, NavigateBefore, NavigateNext } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
  type BoxProps,
} from '@mui/material'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { OutlineButton } from '../OutlineButton'
import LanguageMenu from './LanguageMenu'
import Logo from './Logo'

const AsBurgerMenu = (props: {
  media?: string
  children: React.ReactNode
  BoxProps?: BoxProps
}) => {
  const [open, setOpen] = useState(false)
  const { children, media = '', BoxProps } = props
  const isMedia = useMediaQuery(media)

  if (!isMedia) {
    return (
      <Box minWidth="max-content" {...BoxProps}>
        {children}
      </Box>
    )
  }

  return (
    <Box paddingRight="inherit" {...BoxProps}>
      <Box
        sx={{
          paddingRight: 'inherit',
          position: 'absolute',
          translate: '0 -50%',
          right: 0,
          minWidth: 'max-content',
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
          border: '1px solid',
          borderColor: '#ffffffaa',
          backdropFilter: 'blur(2px)',
        }}
      >
        <Collapse
          orientation="horizontal"
          in={open}
          collapsedSize={40}
          sx={{
            py: 0.5,
          }}
        >
          <Stack direction="row" alignItems="center">
            <IconButton color="inherit" onClick={() => setOpen(!open)}>
              {open ? <NavigateNext /> : <NavigateBefore />}
            </IconButton>
            <Box minWidth="max-content">{children}</Box>
          </Stack>
        </Collapse>
      </Box>
    </Box>
  )
}

export default function Header(props: { leftSlot?: React.ReactNode }) {
  const { leftSlot } = props
  const { locale } = useLocale()

  const theme = useTheme()
  const user = useBoundStore((state) => state.user)

  const handleSignOutButton = async () => {
    signOut(auth)
  }

  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  })

  const rightSlot = (
    <Stack direction="row" gap={1} alignItems="center">
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
        <AsBurgerMenu media={theme.breakpoints.down('sm')}>
          {rightSlot}
        </AsBurgerMenu>
      </Toolbar>
    </AppBar>
  )
}
