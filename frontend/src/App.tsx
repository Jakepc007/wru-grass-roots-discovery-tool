import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import theme from './theme'
import logo from './assets/welsh-rugby-union-logo.png'
import InputLocationScreen from './screens/InputLocationScreen'
import FindScreen from './screens/FindScreen'
import OrganizationScreen from './screens/OrganizationScreen'

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
            <img src={logo} alt="WRU logo" style={{ height: 40, marginRight: 12 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{t('appTitle')}</Typography>
            <Box>
              <LanguageSwitcher />
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<InputLocationScreen />} />
          <Route path="/find" element={<FindScreen />} />
          <Route path="/organization/:id" element={<OrganizationScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
