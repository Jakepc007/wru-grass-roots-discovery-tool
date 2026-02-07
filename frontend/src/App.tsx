import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import theme from './theme'
import logo from './assets/newlogo.png'
import InputLocationScreen from './screens/InputLocationScreen'
import FindScreen from './screens/FindScreen'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static" elevation={0} sx={{ borderBottom: '3px solid rgb(209, 138, 0)' }}>
          <Toolbar>
            <img src={logo} alt="WRU logo" style={{ height: 40, marginRight: 12 }} />
            <Typography variant="h6">WRU Grassroots Discovery</Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<InputLocationScreen />} />
          <Route path="/find" element={<FindScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
