import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import backgroundImage from '../assets/background.jpg'

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i

function InputLocationScreen() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [postcode, setPostcode] = useState('')
  const [error, setError] = useState('')
  const [locating, setLocating] = useState(false)

  const validate = () => {
    if (!postcode.trim()) {
      setError(t('postcodeRequired'))
      return false
    }
    if (!UK_POSTCODE_REGEX.test(postcode.trim())) {
      setError(t('enterValidPostcode'))
      return false
    }
    setError('')
    return true
  }

  const handleSearch = () => {
    if (validate()) {
      navigate(`/find?postcode=${encodeURIComponent(postcode.trim())}`)
    }
  }

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError(t('geolocationNotSupported'))
      return
    }
    setLocating(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(`https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`)
          const data = await res.json()
          if (data.result && data.result.length > 0) {
            const foundPostcode = data.result[0].postcode
            navigate(`/find?postcode=${encodeURIComponent(foundPostcode)}`)
          } else {
            setError(t('couldNotFindPostcode'))
          }
        } catch {
          setError(t('failedToLookupPostcode'))
        } finally {
          setLocating(false)
        }
      },
      () => {
        setError(t('unableToRetrieveLocation'))
        setLocating(false)
      }
    )
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box 
        display="flex" 
        flexDirection="column" 
        gap={2} 
        width="100%" 
        maxWidth={360} 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          mt: -8,
          bgcolor: 'rgb(240, 240, 240)',
          border: '3px solid rgb(238, 53, 36)',
          px: 5,
          py: 7,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" textAlign="center" color="text.secondary" mb={2}>{t('inputYourLocation')}</Typography>
        <Box display="flex" gap={1} alignItems="flex-start">
          <TextField
            label={t('postcode')}
            value={postcode}
            onChange={(e) => { setPostcode(e.target.value); setError('') }}
            placeholder={t('enterPostcode')}
            error={!!error}
            helperText={error}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
            fullWidth
          />
          <Button variant="outlined" aria-label={t('search')} onClick={handleSearch} sx={{ height: 56, '&:hover': { borderColor: 'rgb(209, 138, 0)' }, '&:focus': { outline: 'none' } }}>
            <SearchIcon />
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {t('or')}
        </Typography>
        <Button variant="outlined" startIcon={<MyLocationIcon />} onClick={handleUseCurrentLocation} disabled={locating} sx={{ '&:hover': { borderColor: 'rgb(209, 138, 0)' }, '&:focus': { outline: 'none' } }}>
          {locating ? t('locating') : t('useCurrentLocation')}
        </Button>
      </Box>
    </Box>
  )
}

export default InputLocationScreen
