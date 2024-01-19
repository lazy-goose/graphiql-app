import { teammates } from '@/constants'
import { useLocale } from '@/hooks/useLocale'
import { Avatar, Badge, Link, Paper, Stack, styled } from '@mui/material'
import { RSSLogo } from './RSSLogo'

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active = false }) => ({
  overflow: 'hidden',
  ...(active && {
    '& .MuiBadge-badge': {
      color: theme.palette.success,
      backgroundColor: theme.palette.success.main,
      boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
    },
  }),
}))

export default function Footer() {
  const { locale } = useLocale()
  return (
    <Paper>
      <Stack
        direction="row"
        py={0.5}
        px={2}
        spacing={1}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {teammates(locale).map(
            ({ id, github, avatar, active = false }, index) => (
              <Link key={index} href={github}>
                <StyledBadge
                  active={active}
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar variant="rounded" src={avatar} alt={id + ' avatar'} />
                </StyledBadge>
              </Link>
            ),
          )}
        </Stack>
        <RSSLogo />
      </Stack>
    </Paper>
  )
}
