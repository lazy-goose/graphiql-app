import {
  Box,
  CircularProgress,
  type BoxProps,
  type CircularProgressProps,
} from '@mui/material'

export default function Loader(
  props: BoxProps & {
    CircularProgressProps?: CircularProgressProps
  },
) {
  const { CircularProgressProps, ...BoxProps } = props
  return (
    <Box
      height={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...BoxProps}
    >
      <CircularProgress {...CircularProgressProps} />
    </Box>
  )
}
