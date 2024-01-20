import { ThemeProvider } from '@emotion/react'
import { Backdrop, GlobalStyles } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Loader } from './components/Loader'
import { Snackbar } from './components/Snackbar'
import { LocaleProvider } from './contexts/localeContext'
import { auth } from './firebase'
import { mainTheme } from './globals/themes/main'
import { router } from './router/router'
import { storeName, useBoundStore } from './store'

const AppLoader = () => {
  return (
    <Backdrop
      open={true}
      sx={(theme) => ({ background: theme.palette.background.paper })}
    >
      <Loader />
    </Backdrop>
  )
}

export function App() {
  const setUser = useBoundStore((state) => state.setUser)
  const isLoading = useBoundStore((state) => state.isUserLoading)

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      useBoundStore.persist.setOptions({
        name: storeName(user?.email),
      })
      useBoundStore.persist.rehydrate()
      setUser(user)
    })
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
          Components={{
            customAlert: Snackbar,
          }}
          classes={{ root: 'SnackbarContainer' }}
        >
          {isLoading ? <AppLoader /> : <RouterProvider router={router} />}
        </SnackbarProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
