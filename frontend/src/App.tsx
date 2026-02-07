import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import theme from './theme'
import logo from './assets/welsh-rugby-union-logo.png'
import InputLocationScreen from './screens/InputLocationScreen'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={0} sx={{ borderBottom: '3px solid rgb(209, 138, 0)' }}>
        <Toolbar>
          <img src={logo} alt="WRU logo" style={{ height: 40, marginRight: 12 }} />
          <Typography variant="h6">WRU Grassroots</Typography>
        </Toolbar>
      </AppBar>
      <InputLocationScreen />
    </ThemeProvider>
  )
}

export default App
