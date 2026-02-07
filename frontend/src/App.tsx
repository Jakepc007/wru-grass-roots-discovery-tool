import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputLocationScreen from './screens/InputLocationScreen'

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">WRU Grassroots</Typography>
        </Toolbar>
      </AppBar>
      <InputLocationScreen />
    </>
  )
}

export default App
