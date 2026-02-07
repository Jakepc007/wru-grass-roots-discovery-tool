import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function PlayScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" onClick={() => navigate(`/organization/${id}`)} aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">Play Screen</Typography>
            <Typography variant="body2" color="text.secondary">
              Organization ID: {id}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" paragraph>
            Welcome to the Play Screen!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is a placeholder for organization {id}. Add your play functionality here.
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default PlayScreen
