import { Alert, type AlertProps } from '@mui/material'
import { useSnackbar, type CustomContentProps } from 'notistack'
import React from 'react'

export type CustomSnackbarProps = {
  AlertProps?: Omit<AlertProps, 'id' | 'message'>
}

const Snackbar = React.forwardRef<
  HTMLDivElement,
  CustomContentProps & CustomSnackbarProps
>(function Snackbar(props, ref) {
  const {
    message,
    id,
    AlertProps: { severity = 'error', ...AlertProps } = {},
  } = props
  const { closeSnackbar } = useSnackbar()
  const onClose = () => closeSnackbar(id)
  return (
    <Alert ref={ref} severity={severity} onClose={onClose} {...AlertProps}>
      {message}
    </Alert>
  )
})

export default Snackbar
