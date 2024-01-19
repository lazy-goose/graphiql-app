import { useLocale } from '@/hooks/useLocale'
import mergeSx from '@/utils/mergeSx'
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
  Tooltip,
  Typography,
  type CardProps,
  type LinkProps,
} from '@mui/material'

type Task = {
  name: string
  del?: boolean
}

const StyledLink = (props: LinkProps = {}) => {
  const { sx, ...LinkProps } = props
  return (
    <Link
      sx={mergeSx(sx, (theme) => ({
        lineHeight: 1,
        color: 'inherit',
        '&:hover': {
          color: theme.palette.info.main,
        },
      }))}
      {...LinkProps}
    />
  )
}

const TaskListItem = ({ task }: { task: Task }) => {
  const {
    locale: {
      welcomePage: { tooltip },
    },
  } = useLocale()
  return (
    <ListItem disablePadding>
      <ListItemIcon sx={{ color: 'inherit', minWidth: 0, mr: '1ch' }}>
        <StarRate sx={{ fontSize: '0.8rem' }} />
      </ListItemIcon>
      <Tooltip
        title={task.del ? tooltip.refactoredBy : null}
        placement="left"
        arrow
        PopperProps={{
          modifiers: [{ name: 'offset', options: { offset: [0, -5] } }],
          sx: {
            pointerEvents: 'none',
          },
        }}
      >
        <ListItemText
          primary={task.name}
          sx={{ m: 0, maxWidth: 'max-content' }}
          primaryTypographyProps={{
            component: task.del ? 'del' : undefined,
            m: 0,
            sx: {
              '&': { fontSize: '1rem' },
            },
          }}
        />
      </Tooltip>
    </ListItem>
  )
}

export default function TeammateCard(props: {
  personName: string
  avatarSrc: string
  avatarAlt?: string
  taskList: Task[]
  socials: {
    github?: string
    telegram?: string
  }
  CardProps?: CardProps
}) {
  const { avatarSrc, avatarAlt, personName, taskList, socials } = props
  const { CardProps: { sx, ...CardProps } = {} } = props

  const gap = 2

  return (
    <Card
      variant="outlined"
      sx={mergeSx(sx, {
        boxSizing: 'border-box',
        py: 1.5,
        px: 2.5,
        display: 'flex',
        flexDirection: 'column',
      })}
      {...CardProps}
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
          {taskList.map((task) => (
            <TaskListItem key={task.name} task={task} />
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
