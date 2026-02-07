import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import theme from './theme'
import InputLocationScreen from './screens/InputLocationScreen'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ borderBottom: '2px solid rgb(209, 138, 0)' }}>
        <Toolbar>
          <Typography variant="h6">WRU Grassroots</Typography>
        </Toolbar>
      </AppBar>
      <InputLocationScreen />
    </ThemeProvider>
  )
}

export default App
