import { LocaleProvider } from '@/contexts/localeContext'
import { mainTheme } from '@/globals/themes/main'
import { ThemeProvider } from '@mui/material'
import { render } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import { MemoryRouter } from 'react-router-dom'

export default function renderInContext(renderTarget: React.ReactNode) {
  return render(
    <LocaleProvider>
      <ThemeProvider theme={mainTheme}>
        <SnackbarProvider>
          <MemoryRouter>{renderTarget}</MemoryRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </LocaleProvider>,
  )
}
