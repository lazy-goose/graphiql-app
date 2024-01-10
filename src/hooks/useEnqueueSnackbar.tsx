import { Snackbar } from '@/components/Snackbar'
import { type AlertProps } from '@mui/material'
import { useSnackbar, type OptionsObject } from 'notistack'
import { useCallback } from 'react'

export type PushSnackbarParams = {
  message: string
  enqueueOptions?: OptionsObject
  alertProps?: AlertProps
}

export const useEnqueueSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar()

  const pushSnackbar = useCallback(
    ({ message, enqueueOptions, alertProps }: PushSnackbarParams) => {
      enqueueSnackbar(message, {
        ...enqueueOptions,
        content: (id) => <Snackbar id={id} message={message} {...alertProps} />,
      })
    },
    [enqueueSnackbar],
  )

  return { pushSnackbar }
}
