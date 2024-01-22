import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'

export default function useErrorEffect(error: Error | null | undefined) {
  useEffect(() => {
    if (error?.message) {
      enqueueSnackbar({
        variant: 'customAlert',
        message: error.message,
      })
    }
  }, [error])
}
