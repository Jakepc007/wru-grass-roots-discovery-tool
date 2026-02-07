import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Box from '@mui/material/Box'

// Fix for default marker icon not showing
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

interface Organisation {
  Id: number
  Name: string
  OrganisationTypeId: number
  Latitude: number | null
  Longitude: number | null
}

function FindScreen() {
  const [organisations, setOrganisations] = useState<Organisation[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/organisations')
      .then((res) => res.json())
      .then((data) => setOrganisations(data))
      .catch((err) => console.error('Failed to fetch organisations:', err))
  }, [])

  const organisationsWithCoords = organisations.filter(
    (org) => org.Latitude != null && org.Longitude != null
  )

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100%' }}>
      <MapContainer
        center={[51.85, -3.5]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {organisationsWithCoords.map((org) => (
          <Marker key={org.Id} position={[org.Latitude!, org.Longitude!]}>
            <Popup>{org.Name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  )
}

export default FindScreen
