import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { LocaleProvider } from './contexts/localeContext'
import { auth } from './firebase'
import { router } from './router/router'
import { useBoundStore } from './store'

import { ThemeProvider } from '@emotion/react'
import { mainTheme } from './globals/themes/main'

export function App() {
  const setUser = useBoundStore((state) => state.setUser)

  useEffect(() => {
    const unsubsrcibe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return unsubsrcibe
  }, [setUser])

  return (
    <LocaleProvider>
      <ThemeProvider theme={mainTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocaleProvider>
  )
}
