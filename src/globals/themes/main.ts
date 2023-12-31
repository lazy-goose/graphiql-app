import { createTheme } from '@mui/material'

/**
 * Extends default MUI Theme:
 * https://mui.com/material-ui/customization/default-theme/
 */
export const mainTheme = createTheme({
  palette: {
    secondary: {
      main: '#e535ab',
      light: '#ec5db7',
      dark: '#9e2d77',
      contrastText: '#fffff',
    },
  },
})
