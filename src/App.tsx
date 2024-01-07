import { ThemeProvider } from '@emotion/react'
import { GlobalStyles } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Snackbar } from './components/Snackbar'
import { LocaleProvider } from './contexts/localeContext'
import { auth } from './firebase'
import { mainTheme } from './globals/themes/main'
import { router } from './router/router'
import { useBoundStore } from './store'

export function App() {
  const setUser = useBoundStore((state) => state.setUser)

  useEffect(() => {
    return auth.onAuthStateChanged((user) => setUser(user))
  }, [setUser])

  return (
    <LocaleProvider>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyles
          styles={{
            '.notistack-SnackbarContainer': {
              right: '16px',
              top: '70px',
            },
          }}
        />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          content={(key, message) => <Snackbar id={key} message={message} />}
          classes={{ root: 'SnackbarContainer' }}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
