import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HomeIcon from '@mui/icons-material/Home'

function SuccessScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const orgName = location.state?.orgName || 'the organization'

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, mt: 8 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
        <CheckCircleOutlineIcon 
          sx={{ 
            fontSize: 80, 
            color: '#2e7d32',
            mb: 2 
          }} 
        />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#2e7d32' }}>
          {t('registrationSuccess')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 3, mb: 4 }}>
          {t('successMessage')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
          {t('contactMessage', { orgName })}
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#EE3524',
            '&:hover': {
              backgroundColor: '#d12e1f',
            },
            px: 4,
            py: 1.5,
          }}
        >
          {t('returnHome')}
        </Button>
      </Paper>
    </Box>
  )
}

export default SuccessScreen
