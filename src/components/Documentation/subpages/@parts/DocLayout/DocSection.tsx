import { Box, Divider, Typography, type BoxProps } from '@mui/material'
import Markdown from 'marked-react'

export default function DocSection(
  props: React.PropsWithChildren<{
    heading: string
    notEmpty?: boolean
    markdown?: boolean
    BoxProps?: BoxProps
  }>,
) {
  const {
    heading,
    notEmpty = true,
    markdown = false,
    BoxProps,
    children,
  } = props
  if (notEmpty) {
    switch (true) {
      case Array.isArray(children) && !children.length:
      case !children:
        return null
    }
  }
  return (
    <>
      <Divider />
      <Box component="section" {...BoxProps}>
        <Typography
          className="Heading"
          variant="h3"
          fontWeight="regular"
          fontSize="1.25rem"
        >
          {heading}
        </Typography>
        <Typography
          className="Body"
          component={Box}
          width={1}
          mt={1.5}
          ml={1}
          sx={{
            '& > p': {
              margin: 0,
            },
          }}
        >
          {markdown ? <Markdown>{String(children)}</Markdown> : children}
        </Typography>
      </Box>
    </>
  )
}
