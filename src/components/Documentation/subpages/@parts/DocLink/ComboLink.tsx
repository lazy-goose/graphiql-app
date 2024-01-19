import mergeSx from '@/utils/mergeSx'
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
  type TypographyProps,
} from '@mui/material'
import Markdown from 'marked-react'
import { useState } from 'react'

type ComboLinkProps = {
  name: string
  type: string
  args?: {
    name: string
    type: string
    defaultValue: string
  }[]
  action?: () => void
  del?: boolean
  hover?: 'name' | 'type'
  description?: string
  deprecationReason?: string
  TypographyProps?: TypographyProps
}

const Tooltip = (
  props: ComboLinkProps & { isTouched: boolean; showArgs: boolean },
) => {
  const { isTouched, showArgs, ...ComboLinkProps } = props
  const {
    name,
    type,
    args = [],
    description,
    deprecationReason,
  } = ComboLinkProps
  return (
    <Box
      aria-label="tooltip"
      sx={(theme, p = 1) => ({
        display: !isTouched ? 'none' : undefined,
        opacity: showArgs ? 1 : 0,
        transition: 'opacity 0.1s',
        position: 'absolute',
        zIndex: 1,
        top: theme.spacing(-p),
        left: theme.spacing(-p),
        right: 0,
        padding: p,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        outline: '1px solid ' + theme.palette.divider,
        borderRadius: 1,
        pointerEvents: 'none',
      })}
    >
      <Box>
        <Box component="span" className="Name">
          {name}
        </Box>
        <Box component="span">(</Box>
        <List sx={{ p: 0.25 }}>
          {args.map(({ name, type: argType, defaultValue }) => (
            <ListItem key={name} sx={{ py: 0 }}>
              <Box component="span">{name}:&#160;</Box>
              <Box component="span" className="Type">
                {argType}
              </Box>
              <Box component="span">{defaultValue && ' = ' + defaultValue}</Box>
            </ListItem>
          ))}
        </List>
        <Box component="span">): </Box>
        <Box component="span" className="Type">
          {type}
        </Box>
      </Box>
      {Boolean(description || deprecationReason) && (
        <Box
          sx={{
            mt: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 10,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '& > p': { margin: 0 },
          }}
        >
          {Boolean(description) && <Markdown>{description}</Markdown>}
          {Boolean(deprecationReason) && <Divider />}
          {Boolean(deprecationReason) && (
            <Markdown>{deprecationReason}</Markdown>
          )}
        </Box>
      )}
    </Box>
  )
}

export default function ComboLink(props: ComboLinkProps) {
  const { name, type, args = [], action, del = false, hover = 'name' } = props
  const { TypographyProps: { sx, ...TypographyProps } = {} } = props
  const [showArgs, setShowArgs] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  return (
    <Typography
      component={Box}
      variant="body1"
      sx={mergeSx(sx, (theme) => ({
        my: 0.5,
        fontSize: '1.05rem',
        position: 'relative',
        color: theme.palette.text.primary,
        '.Type': {
          color: theme.palette.info.main,
        },
        '&:hover': {
          color: theme.palette.info.main,
          [hover === 'type' ? '.Type' : '.Name']: {
            textDecoration: 'underline',
          },
        },
      }))}
      {...TypographyProps}
    >
      <Button
        onClick={action}
        disableRipple
        sx={(_, textDecoration = del ? 'line-through' : 'none') => ({
          display: 'block',
          width: 1,
          padding: 0,
          textAlign: 'left',
          color: 'inherit',
          font: 'inherit',
          letterSpacing: 'inherit',
          textTransform: 'unset',
          textDecoration,
          userSelect: 'text',
          '&:hover': {
            textDecoration,
            background: 'transparent',
          },
        })}
      >
        <Box>
          <Box component="span" className="Name">
            {name}
          </Box>
          {args.length ? (
            <Box
              component="span"
              onPointerEnter={() => {
                setIsTouched(true)
                setShowArgs(true)
              }}
              onPointerLeave={() => {
                setShowArgs(false)
              }}
            >
              (...)
            </Box>
          ) : null}
          {type && (
            <>
              <Box component="span">: </Box>
              <Box component="span" className="Type">
                {type}
              </Box>
            </>
          )}
        </Box>
      </Button>
      <Tooltip {...props} isTouched={isTouched} showArgs={showArgs} />
    </Typography>
  )
}
