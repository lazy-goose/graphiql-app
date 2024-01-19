import { Divider, Typography } from '@mui/material'

export default function DocName(props: React.PropsWithChildren) {
  const { children } = props
  return (
    <>
      <Divider />
      <Typography
        variant="h2"
        color="tertiary.main"
        fontSize="1.3rem"
        fontWeight="regular"
      >
        {children}
      </Typography>
    </>
  )
}
