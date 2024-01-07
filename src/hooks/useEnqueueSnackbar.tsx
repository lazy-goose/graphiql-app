import { Snackbar } from '@/components/Snackbar'
import { type AlertProps } from '@mui/material'
import {
  useSnackbar as useDefaultSnackbar,
  type OptionsObject,
} from 'notistack'

export type PushSnackbarParams = {
  message: string
  enqueueOptions?: OptionsObject
  alertProps?: AlertProps
}

export const useEnqueueSnackbar = () => {
  const { enqueueSnackbar } = useDefaultSnackbar()

  const pushSnackbar = ({
    message,
    enqueueOptions,
    alertProps,
  }: PushSnackbarParams) => {
    enqueueSnackbar(message, {
      ...enqueueOptions,
      content: (id) => <Snackbar id={id} message={message} {...alertProps} />,
    })
  }

  return { pushSnackbar }
}
