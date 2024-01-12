import { useBoundStore } from '@/store'
import { Stack, Typography, type StackProps } from '@mui/material'

export default function ResponseMetrics(
  props: { noHeight?: boolean } & StackProps = {},
) {
  const { noHeight = false, ...StackProps } = props

  const statusText = useBoundStore((state) => state.responseMetrics.statusText)
  const successful = useBoundStore((state) => state.responseMetrics.successful)
  const status = useBoundStore((state) => state.responseMetrics.status)
  const sizeKb = useBoundStore((state) => state.responseMetrics.sizeKb)
  const timeMs = useBoundStore((state) => state.responseMetrics.timeMs)

  return (
    <Stack
      boxSizing="border-box"
      minWidth="max-content"
      px={1}
      direction="row"
      gap={1.5}
      justifyContent="right"
      color="text.secondary"
      height="1.5rem"
      marginBottom={noHeight ? '-1.5rem' : undefined}
      {...StackProps}
    >
      {Boolean(status) && (
        <Typography color={successful ? 'success.main' : 'error.main'}>
          {status} {statusText}
        </Typography>
      )}
      <Typography>{sizeKb.toFixed(1)} KB</Typography>
      <Typography>{timeMs} ms</Typography>
    </Stack>
  )
}
