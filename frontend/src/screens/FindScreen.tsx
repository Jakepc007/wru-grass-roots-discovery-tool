import { useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function FindScreen() {
  const [searchParams] = useSearchParams()
  const postcode = searchParams.get('postcode')

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100%' }}>
      {postcode && (
        <Typography variant="subtitle1" sx={{ p: 1, textAlign: 'center' }}>
          Showing results for: <strong>{postcode.toUpperCase()}</strong>
        </Typography>
      )}
      <MapContainer
        center={[51.85, -3.5]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  )
}

export default FindScreen
