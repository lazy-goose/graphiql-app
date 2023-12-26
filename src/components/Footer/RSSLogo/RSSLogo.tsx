import { Box, Link } from '@mui/material'

export function RSSLogo() {
  return (
    <Link
      href="https://rs.school/react"
      sx={(theme) => ({
        width: 'max-content',
        position: 'relative',
        color: theme.palette.text.primary,
        fontFamily: theme.typography.body1,
        fontSize: '1.3rem',
        padding: '0.2em',
        lineHeight: 1.2,
        textDecoration: 'none',
        '&:hover': {
          color: theme.palette.info.main,
        },
      })}
    >
      <Box
        component="time"
        sx={{
          position: 'absolute',
          top: '10%',
          left: '37%',
          paddingInline: '5%',
          fontSize: '0.6em',
          lineHeight: 1.4,
          borderRadius: '50%',
          border: '0.06em dashed currentColor',
          rotate: `-25deg`,
        }}
      >
        {new Date().getFullYear()}
      </Box>
      <Box sx={{ display: 'grid', letterSpacing: '0.1ch' }}>
        <span>RS</span>
        <span>SC HO OL</span>
      </Box>
    </Link>
  )
}
