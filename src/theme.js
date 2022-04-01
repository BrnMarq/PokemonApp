import createTheme from '@mui/material/styles/createTheme'
import { red, yellow } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
    secondary: {
      light: yellow[300],
      main: yellow[500],
      dark: yellow[700],
    },
  },
})

export default theme
