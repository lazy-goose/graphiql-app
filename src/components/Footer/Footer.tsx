import { userAvatars } from '@/constants/constants'
import { Avatar, Badge, Link, Paper, Stack, styled } from '@mui/material'
import { RSSLogo } from './RSSLogo'

const StyledBadge = styled(Badge)<{ active?: boolean }>(
  ({ theme, active = false }) => ({
    overflow: 'hidden',
    ...(active && {
      '& .MuiBadge-badge': {
        color: theme.palette.success,
        backgroundColor: theme.palette.success.main,
        boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
      },
    }),
  }),
)

export function Footer() {
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
          {userAvatars.map(
            ({ href, imgSrc, imgAlt, active = false }, index) => (
              <Link key={index} href={href}>
                <StyledBadge
                  active={active}
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar variant="rounded" src={imgSrc} alt={imgAlt} />
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
