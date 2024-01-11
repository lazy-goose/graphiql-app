import { GitHub, StarRate, Telegram } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  type CardProps,
  type LinkProps,
} from '@mui/material'

const StyledLink = (props: LinkProps = {}) => {
  const { sx, ...pass } = props
  return (
    <Link
      sx={[
        (theme) => ({
          lineHeight: 1,
          color: 'inherit',
          '&:hover': {
            color: theme.palette.info.main,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...pass}
    />
  )
}

export default function TeammateCard(props: {
  personName: string
  avatarSrc: string
  avatarAlt?: string
  taskList: string[]
  socials: {
    github?: string
    telegram?: string
  }
  CardProps?: CardProps
}) {
  const { avatarSrc, avatarAlt, personName, taskList, socials } = props
  const { CardProps: { sx, ...passCardProps } = {} } = props

  const gap = 2

  return (
    <Card
      variant="outlined"
      sx={[
        {
          boxSizing: 'border-box',
          py: 1.5,
          px: 2.5,
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...passCardProps}
    >
      <CardContent sx={{ flex: 1, p: 0 }}>
        <Avatar
          variant="square"
          src={avatarSrc}
          alt={avatarAlt || personName + 'avatar'}
          sx={{ mb: gap }}
        />
        <Typography variant="h5" sx={{ mb: gap }}>
          {personName}
        </Typography>
        <List disablePadding>
          {taskList.map((taskName, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon sx={{ color: 'inherit', minWidth: 0, mr: '1ch' }}>
                <StarRate sx={{ fontSize: '0.8rem' }} />
              </ListItemIcon>
              <ListItemText
                primary={taskName}
                sx={{ m: 0 }}
                primaryTypographyProps={{
                  m: 0,
                  sx: { '&': { fontSize: '1rem' } },
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ p: 0, justifyContent: 'right' }}>
        {socials.telegram && (
          <StyledLink
            href={socials.telegram}
            sx={{
              display: 'grid',
              border: '1px solid currentColor',
              borderRadius: '50%',
            }}
          >
            <Telegram viewBox="0.5 0 25 25" />
          </StyledLink>
        )}
        {socials.github && (
          <StyledLink href={socials.telegram}>
            <GitHub />
          </StyledLink>
        )}
      </CardActions>
    </Card>
  )
}
