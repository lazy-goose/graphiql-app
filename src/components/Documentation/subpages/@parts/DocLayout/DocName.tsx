import { Divider, Typography } from '@mui/material'

export default function DocName(
  props: React.PropsWithChildren<{ noDivider?: boolean }>,
) {
  const { children, noDivider = false } = props
  return (
    <>
      {noDivider || <Divider />}
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
