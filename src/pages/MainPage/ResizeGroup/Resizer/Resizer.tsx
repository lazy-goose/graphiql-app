import mergeSx from '@/utils/mergeSx'
import {
  Box,
  Divider,
  type BoxProps,
  type DividerProps,
  type SxProps,
} from '@mui/material'
import defaults from './defaults'

export default function Resizer(props: {
  orientation: NonNullable<DividerProps['orientation']>
  padding?: number
  thickness?: number
  BoxProps?: BoxProps
}) {
  const {
    orientation,
    padding = defaults.padding,
    thickness = defaults.thickness,
  } = props
  const { BoxProps: { sx, ...BoxProps } = {} } = props

  const size = padding * 2 + thickness

  const activeProps = {
    backgroundColor: 'primary.main',
  } satisfies SxProps

  const boxStyles = {
    ...(orientation === 'vertical' && {
      width: size + 'px',
      height: '100%',
      cursor: 'ew-resize',
    }),
    ...(orientation === 'horizontal' && {
      height: size + 'px',
      cursor: 'ns-resize',
    }),
    '&.active > *': {
      ...activeProps,
    },
    '@media(hover: hover)': {
      '&:hover > *': {
        ...activeProps,
      },
    },
  } satisfies SxProps

  return (
    <Box flexShrink={0} sx={mergeSx(sx, boxStyles)} {...BoxProps}>
      <Divider
        orientation={orientation}
        sx={{
          ...(orientation === 'vertical' && {
            marginInline: padding + 'px',
            borderRightWidth: thickness + 'px',
          }),
          ...(orientation === 'horizontal' && {
            marginBlock: padding + 'px',
            borderBottomWidth: thickness + 'px',
          }),
        }}
      />
    </Box>
  )
}
