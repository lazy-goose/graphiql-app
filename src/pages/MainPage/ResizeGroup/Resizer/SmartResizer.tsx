import { type BoxProps } from '@mui/material'
import { Resizer } from '.'
import useResizer, { type ResizeEvent } from './useResizer'

export default function SmartResizer(props: {
  orientation: 'vertical' | 'horizontal'
  onResize: (e: ResizeEvent) => void
  boxProps?: BoxProps
}) {
  const { orientation, onResize, boxProps } = props
  const cursor = orientation === 'vertical' ? 'ew-resize' : 'ns-resize'

  const { registerResizer } = useResizer(
    { onResize },
    { preventDefault: true, preventSelect: true, cursor },
  )

  return (
    <Resizer
      orientation={orientation}
      boxProps={{
        position: 'relative',
        zIndex: 1,
        sx: { cursor },
        ...registerResizer(),
        ...boxProps,
      }}
    />
  )
}
