import { RouterPath } from '@/constants'
import { Box, Link, type LinkProps } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const GraphSvg = (props: React.SVGProps<SVGSVGElement>) => {
  // prettier-ignore
  return (
    <svg width="38" height="43" viewBox="0 0 38 43" fill="none" {...props}>
      <path fill="currentColor" d="m1.873 31.326 1.552.896 17.29-29.946-1.552-.896-17.29 29.946Z" />
      <path fill="currentColor" d="M36.098 28.933H1.518v1.793h34.58v-1.793Z" />
      <path fill="currentColor" d="M2.202 29.94 19.5 39.927l.896-1.552-17.297-9.987-.896 1.552ZM17.228 3.913 34.524 13.9l.896-1.552L18.124 2.36l-.896 1.552Z" />
      <path fill="currentColor" d="m2.207 12.34.896 1.553L20.4 3.906l-.897-1.552-17.296 9.987Z" />
      <path fill="currentColor" d="m16.915 2.276 17.29 29.946 1.552-.896L18.467 1.38l-1.552.896ZM4.681 11.152H2.89v19.973h1.792V11.152Z" />
      <path fill="currentColor" d="M34.737 11.152h-1.792v19.973h1.792V11.152Z" />
      <path fill="currentColor" d="m18.41 37.813.784 1.355 15.043-8.685-.783-1.356-15.043 8.686Z" />
      <path fill="currentColor" d="M37.113 31.708a3.774 3.774 0 0 1-5.15 1.382 3.774 3.774 0 0 1-1.382-5.15 3.774 3.774 0 0 1 5.15-1.382 3.757 3.757 0 0 1 1.382 5.15ZM7.035 14.337a3.774 3.774 0 0 1-5.15 1.382 3.774 3.774 0 0 1-1.382-5.15 3.774 3.774 0 0 1 5.15-1.382 3.776 3.776 0 0 1 1.382 5.15ZM.514 31.708a3.776 3.776 0 0 1 1.382-5.15 3.776 3.776 0 0 1 5.15 1.382 3.776 3.776 0 0 1-1.382 5.15 3.771 3.771 0 0 1-5.15-1.382ZM30.592 14.337a3.776 3.776 0 0 1 1.382-5.15 3.776 3.776 0 0 1 5.15 1.382 3.776 3.776 0 0 1-1.382 5.15 3.774 3.774 0 0 1-5.15-1.382ZM18.813 42.278a3.764 3.764 0 0 1-3.768-3.768 3.764 3.764 0 0 1 3.768-3.768 3.764 3.764 0 0 1 3.768 3.768 3.771 3.771 0 0 1-3.768 3.768ZM18.813 7.536a3.764 3.764 0 0 1-3.768-3.768A3.764 3.764 0 0 1 18.813 0a3.764 3.764 0 0 1 3.768 3.768 3.764 3.764 0 0 1-3.768 3.768Z" />
    </svg>
  )
}

export default function Logo(props: { linkProps?: LinkProps }) {
  const { linkProps } = props
  const size = '47px'
  const logoSize = '90%'
  return (
    <Link component={RouterLink} to={RouterPath.Welcome} {...linkProps}>
      <Box
        sx={(theme) => ({
          width: size,
          height: size,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: theme.palette.background.default,
          background: theme.palette.secondary.main,
          borderRadius: 0.5,
        })}
      >
        <GraphSvg width={logoSize} height={logoSize} />
      </Box>
    </Link>
  )
}
