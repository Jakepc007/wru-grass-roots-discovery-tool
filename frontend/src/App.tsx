import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import theme from './theme'
import logo from './assets/finallogo-removebg-preview.png'
import InputLocationScreen from './screens/InputLocationScreen'
import FindScreen from './screens/FindScreen'
import OrganizationScreen from './screens/OrganizationScreen'
import PlayScreen from './screens/PlayScreen'
import SuccessScreen from './screens/SuccessScreen'

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'cy' : 'en'
    i18n.changeLanguage(newLang) // This will trigger the languageChanged event
  }

  return (
    <Button
      onClick={toggleLanguage}
      sx={{
        color: 'white',
        borderColor: 'rgba(255,255,255,0.5)',
        '&:hover': {
          borderColor: 'white',
          backgroundColor: 'rgba(255,255,255,0.1)',
        },
      }}
      variant="outlined"
      size="small"
    >
      {i18n.language === 'en' ? 'Cymraeg' : 'English'}
    </Button>
  )
}

function App() {
  const { t } = useTranslation()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static" elevation={0} sx={{ borderBottom: '3px solid rgb(209, 138, 0)' }}>
          <Toolbar>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
              <img src={logo} alt="WRU logo" style={{ height: 80, marginRight: 12 }} />
              <Typography variant="h6">{t('appTitle')}</Typography>
            </Link>
            <Box>
              <LanguageSwitcher />
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<InputLocationScreen />} />
          <Route path="/find" element={<FindScreen />} />
          <Route path="/play/:id" element={<PlayScreen />} />
          <Route path="/organization/:id" element={<OrganizationScreen />} />
          <Route path="/success" element={<SuccessScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
