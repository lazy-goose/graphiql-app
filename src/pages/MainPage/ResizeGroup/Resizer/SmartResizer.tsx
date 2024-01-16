import { type BoxProps } from '@mui/material'
import { Resizer } from '.'
import useResizer, { type ResizeEvent } from './useResizer'

export default function SmartResizer(props: {
  orientation: 'vertical' | 'horizontal'
  onResize: (e: ResizeEvent) => void
  BoxProps?: BoxProps
}) {
  const { orientation, onResize, BoxProps } = props
  const cursor = orientation === 'vertical' ? 'ew-resize' : 'ns-resize'

  const { registerResizer } = useResizer(
    { onResize },
    { preventDefault: true, preventSelect: true, cursor },
  )

  return (
    <Resizer
      orientation={orientation}
      BoxProps={{
        position: 'relative',
        zIndex: 1,
        sx: { cursor },
        ...registerResizer(),
        ...BoxProps,
      }}
    />
  )
}
