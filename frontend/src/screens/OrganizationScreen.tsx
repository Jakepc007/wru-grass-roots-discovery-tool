import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Button from '@mui/material/Button'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

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

interface Organisation {
  Id: number
  Name: string
  OrganisationTypeId: number
}

function OrganizationScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [orgName, setOrgName] = useState('')
  const [orgTypeId, setOrgTypeId] = useState<number | null>(null)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    if (!id) return

    // Fetch organization details and teams in parallel
    Promise.all([
      fetch(`http://localhost:3000/organisations/${id}/teams`).then((res) => res.json()),
      fetch(`http://localhost:3000/organisations`).then((res) => res.json()),
    ])
      .then(([teamsData, orgsData]) => {
        const teams = Array.isArray(teamsData) ? teamsData : []
        setTeams(teams)
        if (teams.length > 0) {
          setOrgName(teams[0].OrganisationName)
        }

        // Find the organization's type
        const org = orgsData.find((o: Organisation) => o.Id === parseInt(id))
        if (org) {
          setOrgTypeId(org.OrganisationTypeId)
          if (!teams.length) {
            setOrgName(org.Name)
          }
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err)
        setLoading(false)
      })
  }, [id])

  const getBadges = () => {
    const badges = new Set<string>()

    // OrganisationTypeId 3 = "Inclusive Community Clubs" (LGBT/inclusive)
    if (orgTypeId === 3) {
      badges.add('inclusive')
    }

    teams.forEach((team) => {
      const teamNameLower = team.TeamName.toLowerCase()
      const sexLower = team.Sex?.toLowerCase() || ''

      // Check for women's teams
      if (sexLower === 'female' || sexLower === 'benyw') {
        badges.add('women')
      }

      // Check for men's teams
      if (sexLower === 'male' || sexLower === 'gwryw') {
        badges.add('men')
      }

      // Check for mixed teams
      if (sexLower === 'mixed' || sexLower === 'cymysg') {
        badges.add('mixed')
      }

      // Check for senior teams (18+ or team name contains senior)
      if ((team.MinAge && team.MinAge >= 18) || teamNameLower.includes('senior')) {
        badges.add('senior')
      }

      // Check for inclusive/LGBT teams
      if (
        teamNameLower.includes('inclusive') ||
        teamNameLower.includes('lgbt') ||
        teamNameLower.includes('gay') ||
        teamNameLower.includes('pride')
      ) {
        badges.add('inclusive')
      }
    })

    return Array.from(badges)
  }

  const badgeColors: Record<string, string> = {
    women: '#9c27b0',
    men: '#1976d2',
    mixed: '#f57c00',
    senior: '#2e7d32',
    inclusive: '#c2185b',
  }

  const badgeLabels: Record<string, string> = {
    women: "Women's",
    men: "Men's",
    mixed: 'Mixed',
    senior: 'Senior',
    inclusive: 'Inclusive',
  }

  const badges = getBadges()

  const getOrgStars = (orgName: string, orgId: string) => {
    // Use org ID and name as seed for consistent random value
    const seed = orgName + orgId
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }
    return (Math.abs(hash) % 5) + 1
  }

  const stars = getOrgStars(orgName, id || '')

  const fallbackImageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs0.geograph.org.uk%2Fgeophotos%2F02%2F41%2F62%2F2416292_7842cfb6.jpg&f=1&nofb=1&ipt=091aec8edd218ddf7d22c3f409ab2e347cdf183e1aba33354e8d29decf6cf1da"
  
  const getImageUrl = () => {
    if (imgError || !orgName) {
      return fallbackImageUrl
    }
    // API endpoint with org name - replace with your actual API base URL
    return `https://api.example.com/images/${encodeURIComponent(orgName)}.png`
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', position: 'relative' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" onClick={() => navigate('/find')} aria-label={t('back')}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">{orgName || t('organisation')}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Box sx={{ display: 'flex', gap: 0.25 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  i < stars ? (
                    <StarIcon key={i} sx={{ fontSize: 18, color: '#ffa726' }} />
                  ) : (
                    <StarOutlineIcon key={i} sx={{ fontSize: 18, color: '#ccc' }} />
                  )
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t('teams', { count: teams.length })}
              </Typography>
            </Box>
          </Box>

          {!loading && badges.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                gap: 0.5,
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                maxWidth: '40%',
              }}
            >
              {badges.map((badge) => (
                <Chip
                  key={badge}
                  label={badgeLabels[badge]}
                  size="small"
                  sx={{
                    backgroundColor: badgeColors[badge],
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.7rem',
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {!loading && (
          <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
            <Box
              sx={{
                width: '33.333%',
                aspectRatio: '1',
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <img
                src={getImageUrl()}
                alt={orgName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setImgError(true)}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Typography variant="body1">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Box>
          </Box>
        )}

        {!loading && (
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={() => navigate(`/play/${id}`)}
              sx={{
                fontSize: '1.5rem',
                py: 2,
                px: 6,
                borderRadius: 3,
                backgroundColor: '#EE3524',
                '&:hover': {
                  backgroundColor: '#d12e1f',
                },
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 0 rgba(238, 53, 36, 0.7)',
                  },
                  '50%': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 20px 10px rgba(238, 53, 36, 0)',
                  },
                  '100%': {
                    transform: 'scale(1)',
                    boxShadow: '0 0 0 0 rgba(238, 53, 36, 0)',
                  },
                },
              }}
            >
              Play Now
            </Button>
          </Box>
        )}

        {loading && (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default OrganizationScreen
