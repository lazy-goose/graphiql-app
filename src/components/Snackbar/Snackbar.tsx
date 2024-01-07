import { Alert, type AlertProps } from '@mui/material'
import { useSnackbar, type SnackbarKey, type SnackbarMessage } from 'notistack'
import React from 'react'

type Props = Omit<AlertProps, 'id' | 'message'> & {
  id: SnackbarKey
  message: SnackbarMessage
}

const Snackbar = React.forwardRef<HTMLDivElement, Props>(
  function Snackbar(props, ref) {
    const { id, message, severity = 'error', ...alertProps } = props
    const { closeSnackbar } = useSnackbar()
    const onClose = () => closeSnackbar(id)
    return (
      <Alert ref={ref} severity={severity} onClose={onClose} {...alertProps}>
        {message}
      </Alert>
    )
  },
)

export default Snackbar
