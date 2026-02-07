import { useEffect, useState, useCallback, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

// Welsh rugby ball SVG icon - simple clean design
const rugbyBallSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50" width="40" height="50">
  <!-- Rugby ball - simple oval -->
  <ellipse cx="20" cy="18" rx="14" ry="10" fill="#D1280E" stroke="#991B0B" stroke-width="2"/>
  <!-- Pointer/pin -->
  <path d="M20 28 L16 28 L20 46 L24 28 Z" fill="#D1280E" stroke="#991B0B" stroke-width="1"/>
</svg>
`

const rugbyBallIcon = L.divIcon({
  html: rugbyBallSvg,
  className: '',
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -45],
})

interface Organisation {
  Id: number
  Name: string
  OrganisationTypeId: number
  Latitude: number | null
  Longitude: number | null
}

function MapEvents({ onBoundsChange }: { onBoundsChange: (bounds: L.LatLngBounds) => void }) {
  const map = useMapEvents({
    moveend: () => {
      onBoundsChange(map.getBounds())
    },
    zoomend: () => {
      onBoundsChange(map.getBounds())
    },
  })

  useEffect(() => {
    onBoundsChange(map.getBounds())
  }, [map, onBoundsChange])

  return null
}

function FindScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const postcode = searchParams.get('postcode') || ''
  const { t } = useTranslation()
  const [organisations, setOrganisations] = useState<Organisation[]>([])
  const [visibleOrgs, setVisibleOrgs] = useState<Organisation[]>([])
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/organisations')
      .then((res) => res.json())
      .then((data) => setOrganisations(Array.isArray(data) ? data : []))
      .catch((err) => console.error('Failed to fetch organisations:', err))
  }, [])

  const handleBoundsChange = useCallback((bounds: L.LatLngBounds) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      const visible = organisations.filter((org) => {
        if (org.Latitude == null || org.Longitude == null) return false
        return bounds.contains([org.Latitude, org.Longitude])
      })
      setVisibleOrgs(visible)
    }, 300)
  }, [organisations])

  const handleOrgClick = (org: Organisation) => {
    navigate(`/organization/${org.Id}`)
  }

  const organisationsWithCoords = organisations.filter(
    (org) => org.Latitude != null && org.Longitude != null
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', width: '100%' }}>
      <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} size="small">
          {t('back', 'Back')}
        </Button>
        {postcode && (
          <Typography variant="subtitle1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold', mr: 10 }}>
            {postcode.toUpperCase()}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <Box sx={{ flex: 1 }}>
        <MapContainer
          center={[51.85, -3.5]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents onBoundsChange={handleBoundsChange} />
          {organisationsWithCoords.map((org) => (
            <Marker
              key={org.Id}
              position={[org.Latitude!, org.Longitude!]}
              icon={rugbyBallIcon}
              eventHandlers={{
                click: () => handleOrgClick(org),
              }}
            >
              <Popup>{org.Name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      <Paper
        sx={{
          width: 350,
          height: '100%',
          overflow: 'auto',
          borderRadius: 0,
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
        elevation={0}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6">{t('nearbyOrganisations')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('clubsInView', { count: visibleOrgs.length })}
          </Typography>
        </Box>

        <List disablePadding>
          {visibleOrgs.map((org) => (
            <Box key={org.Id}>
              <ListItemButton onClick={() => handleOrgClick(org)}>
                <ListItemText primary={org.Name} />
              </ListItemButton>
              <Divider />
            </Box>
          ))}
          {visibleOrgs.length === 0 && (
            <Box sx={{ p: 2 }}>
              <Typography color="text.secondary">
                {t('moveMapToFind')}
              </Typography>
            </Box>
          )}
        </List>
      </Paper>
      </Box>
    </Box>
  )
}

export default FindScreen
