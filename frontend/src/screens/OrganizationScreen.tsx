import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'

interface Team {
  TeamName: string
  OrganisationName: string
  OrganisationId: number
  Latitude: number
  Longitude: number
  MinAge: number | null
  MaxAge: number | null
  Sex: string | null
}

function OrganizationScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [orgName, setOrgName] = useState('')

  useEffect(() => {
    if (!id) return

    fetch(`http://localhost:3000/organisations/${id}/teams`)
      .then((res) => res.json())
      .then((data) => {
        const teamsData = Array.isArray(data) ? data : []
        setTeams(teamsData)
        if (teamsData.length > 0) {
          setOrgName(teamsData[0].OrganisationName)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch teams:', err)
        setLoading(false)
      })
  }, [id])

  const getAgeLabel = (minAge: number | null, maxAge: number | null) => {
    if (minAge != null && maxAge != null) {
      return t('ages', { min: minAge, max: maxAge })
    } else if (minAge != null) {
      return t('agesMin', { min: minAge })
    } else {
      return t('agesMax', { max: maxAge })
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" onClick={() => navigate('/find')} aria-label={t('back')}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h5">{orgName || t('organisation')}</Typography>
            <Typography variant="body2" color="text.secondary">
              {t('teams', { count: teams.length })}
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <List disablePadding>
            {teams.map((team, index) => (
              <Box key={`${team.TeamName}-${index}`}>
                <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ListItemText primary={team.TeamName} />
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                    {team.Sex && (
                      <Chip label={team.Sex} size="small" variant="outlined" />
                    )}
                    {(team.MinAge != null || team.MaxAge != null) && (
                      <Chip
                        label={getAgeLabel(team.MinAge, team.MaxAge)}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            ))}
            {teams.length === 0 && !loading && (
              <ListItem>
                <ListItemText
                  primary={t('noTeamsFound')}
                  secondary={t('noTeamsRegistered')}
                />
              </ListItem>
            )}
          </List>
        )}
      </Paper>
    </Box>
  )
}

export default OrganizationScreen
