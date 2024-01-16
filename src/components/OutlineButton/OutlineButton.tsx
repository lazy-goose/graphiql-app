import mergeSx from '@/utils/mergeSx'
import { Button, type ButtonProps } from '@mui/material'

export type OutlineColors =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'

export default function OutlineButton<C extends React.ElementType>(
  props: {
    color?: OutlineColors
  } & Omit<ButtonProps<C>, 'color' | 'variant'>,
) {
  const { color = 'primary', sx, ...ButtonProps } = props
  return (
    <Button
      variant="outlined"
      color={color}
      sx={mergeSx(sx, (theme) => {
        const paletteColor = theme.palette[color].main || '#ffffff'
        const contrastText = theme.palette.getContrastText(paletteColor)
        return {
          '&:hover': {
            backgroundColor: paletteColor,
            color: contrastText,
          },
        }
      })}
      {...ButtonProps}
    />
  )
}
