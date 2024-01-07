import { useLocale } from '@/hooks/useLocale'
import StarRateIcon from '@mui/icons-material/StarRate'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

type id = 'teammate1' | 'teammate2' | 'teammate3'

export default function TeammateCard(props: {
  href: string
  cvHref: string
  tgHref: string
  imgSrc: string
  imgAlt: string
  id: id
}) {
  const { href, tgHref, imgSrc, imgAlt, cvHref, id } = props
  const {
    locale: { welcomePage },
  } = useLocale()
  return (
    <Box sx={{ minWidth: { xs: 290, md: 395 } }}>
      <Card variant="outlined">
        <CardContent
          sx={{ textAlign: 'left', paddingLeft: '1.5rem', height: 160 }}
        >
          <Avatar variant="square" sx={{ mb: 1.5 }} src={imgSrc} alt={imgAlt} />
          <Link
            href={cvHref}
            variant="h5"
            sx={(theme) => ({
              color: theme.palette.text.primary,
              textDecoration: 'none',
              fontWeight: 'medium',
              '&:hover': {
                color: theme.palette.info.main,
              },
            })}
          >
            {welcomePage.typography.text.team[id].name}
          </Link>
          <List>
            {welcomePage.typography.text.team[id].roleList.map(
              (role, index) => {
                return (
                  <ListItem key={index} sx={{ padding: 0 }}>
                    <ListItemIcon sx={{ minWidth: '1.5rem' }}>
                      <StarRateIcon
                        sx={(theme) => ({
                          fill: theme.palette.text.primary,
                          fontSize: 'medium',
                        })}
                      />
                    </ListItemIcon>
                    <ListItemText sx={{ margin: 0 }} primary={role} />
                  </ListItem>
                )
              },
            )}
          </List>
        </CardContent>
        <CardActions sx={{ justifyContent: 'right' }}>
          <Link
            href={tgHref}
            sx={(theme) => ({
              color: theme.palette.text.primary,
              textDecoration: 'none',
              '&:hover': {
                color: theme.palette.info.main,
              },
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="26"
              fill="currentColor"
            >
              <g clipPath="url(#a)">
                <path
                  fill="#fff"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  d="M23.875 13c0 6.282-5.093 11.375-11.375 11.375S1.125 19.282 1.125 13 6.218 1.625 12.5 1.625 23.875 6.718 23.875 13Z"
                />
                <path
                  fill="currentColor"
                  d="m8.488 14.06-3.05-.994s-.365-.148-.248-.483c.024-.07.073-.128.219-.23.676-.47 12.511-4.724 12.511-4.724s.334-.113.531-.038a.288.288 0 0 1 .197.214c.021.088.03.179.026.27 0 .078-.01.15-.017.264-.073 1.163-2.23 9.843-2.23 9.843s-.129.508-.591.526a.847.847 0 0 1-.617-.24c-.908-.78-4.044-2.887-4.737-3.35a.134.134 0 0 1-.057-.095c-.01-.048.044-.11.044-.11s5.46-4.853 5.606-5.363c.011-.04-.031-.059-.088-.041-.363.133-6.65 4.104-7.345 4.542a.335.335 0 0 1-.154.01Z"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="currentColor" d="M0 .5h25v25H0z" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link
            href={href}
            sx={(theme) => ({
              color: theme.palette.text.primary,
              textDecoration: 'none',
              '&:hover': {
                color: theme.palette.info.main,
              },
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              fill="currentColor"
            >
              <g clipPath="url(#a)">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12.463 0C5.57 0 0 5.5 0 12.304c0 5.44 3.57 10.043 8.522 11.673.619.122.846-.265.846-.59 0-.286-.02-1.264-.02-2.282-3.468.733-4.19-1.467-4.19-1.467-.557-1.426-1.382-1.793-1.382-1.793-1.135-.753.082-.753.082-.753 1.26.081 1.92 1.263 1.92 1.263 1.114 1.873 2.909 1.344 3.63 1.018.104-.795.434-1.345.785-1.65-2.765-.285-5.674-1.345-5.674-6.07 0-1.345.495-2.445 1.279-3.3-.124-.306-.557-1.57.124-3.26 0 0 1.052-.326 3.425 1.263a12.212 12.212 0 0 1 3.116-.408c1.052 0 2.125.143 3.115.408 2.373-1.59 3.426-1.263 3.426-1.263.68 1.69.247 2.954.123 3.26.805.855 1.28 1.955 1.28 3.3 0 4.725-2.91 5.764-5.695 6.07.454.387.846 1.12.846 2.282 0 1.65-.02 2.974-.02 3.381 0 .326.226.713.845.591 4.952-1.63 8.522-6.234 8.522-11.673C24.925 5.5 19.334 0 12.463 0Z"
                  clipRule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="currentColor" d="M0 0h25v24H0z" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </CardActions>
      </Card>
    </Box>
  )
}
