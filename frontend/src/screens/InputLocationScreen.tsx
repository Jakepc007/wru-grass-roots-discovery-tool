import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MyLocationIcon from '@mui/icons-material/MyLocation'

function InputLocationScreen() {
  const [postcode, setPostcode] = useState('')

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box display="flex" flexDirection="column" gap={2} width="100%" maxWidth={360}>
        <Typography variant="h6">Insert postcode</Typography>
        <TextField
          label="Postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode"
          fullWidth
        />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          or
        </Typography>
        <Button variant="outlined" startIcon={<MyLocationIcon />} sx={{ '&:hover': { borderColor: 'rgb(209, 138, 0)' }, '&:focus': { outline: 'none' } }}>
          Use current location
        </Button>
      </Box>
    </Box>
  )
}

export default InputLocationScreen
