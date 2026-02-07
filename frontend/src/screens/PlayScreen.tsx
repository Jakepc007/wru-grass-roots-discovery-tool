import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  gender: string
  ageGroup: string
  experienceLevel: string
  availability: string
  location: string
  disability: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phoneNumber?: string
  gender?: string
  ageGroup?: string
  experienceLevel?: string
  availability?: string
  location?: string
  disability?: string
}

function PlayScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [orgName, setOrgName] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    ageGroup: '',
    experienceLevel: '',
    availability: '',
    location: '',
    disability: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (!id) return

    fetch(`http://localhost:3000/organisations`)
      .then((res) => res.json())
      .then((orgsData) => {
        const org = orgsData.find((o: { Id: number; Name: string }) => o.Id === parseInt(id))
        if (org) {
          setOrgName(org.Name)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch organization:', err)
        setLoading(false)
      })
  }, [id])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('fieldRequired')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('fieldRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('invalidEmail')
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t('fieldRequired')
    } else if (!/^[0-9\s()+-]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = t('invalidPhone')
    }

    if (!formData.gender) {
      newErrors.gender = t('fieldRequired')
    }

    if (!formData.ageGroup) {
      newErrors.ageGroup = t('fieldRequired')
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = t('fieldRequired')
    }

    if (!formData.availability) {
      newErrors.availability = t('fieldRequired')
    }

    if (!formData.location.trim()) {
      newErrors.location = t('fieldRequired')
    }

    if (!formData.disability) {
      newErrors.disability = t('fieldRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitSuccess(false)
    setSubmitError(false)

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', { ...formData, organizationId: id })
      setSubmitting(false)
      // Navigate to success page with organization name
      navigate('/success', { state: { orgName } })
    }, 1000)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" onClick={() => navigate(`/organization/${id}`)} aria-label={t('back')}>
            <ArrowBackIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">{t('registerToPlay')}</Typography>
            <Typography variant="body2" color="text.secondary">
              {orgName || t('organisation')}
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSubmitSuccess(false)}>
                {t('registrationSuccess')}
              </Alert>
            )}

            {submitError && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setSubmitError(false)}>
                {t('registrationError')}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label={t('fullName')}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  fullWidth
                  required
                />

                <TextField
                  label={t('email')}
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  required
                />

                <TextField
                  label={t('phoneNumber')}
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  fullWidth
                  required
                  placeholder="e.g., 07700 900000"
                />

                <FormControl error={!!errors.gender} required>
                  <FormLabel>{t('gender')}</FormLabel>
                  <RadioGroup
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                  >
                    <FormControlLabel value="male" control={<Radio />} label={t('genderMale')} />
                    <FormControlLabel value="female" control={<Radio />} label={t('genderFemale')} />
                    <FormControlLabel value="other" control={<Radio />} label={t('genderOther')} />
                    <FormControlLabel value="prefer-not-to-say" control={<Radio />} label={t('genderPreferNotToSay')} />
                  </RadioGroup>
                  {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                </FormControl>

                <FormControl error={!!errors.ageGroup} required>
                  <FormLabel>{t('ageGroup')}</FormLabel>
                  <RadioGroup
                    value={formData.ageGroup}
                    onChange={(e) => handleInputChange('ageGroup', e.target.value)}
                  >
                    <FormControlLabel value="under-18" control={<Radio />} label={t('ageUnder18')} />
                    <FormControlLabel value="18-25" control={<Radio />} label={t('age18to25')} />
                    <FormControlLabel value="26-35" control={<Radio />} label={t('age26to35')} />
                    <FormControlLabel value="36-50" control={<Radio />} label={t('age36to50')} />
                    <FormControlLabel value="over-50" control={<Radio />} label={t('ageOver50')} />
                  </RadioGroup>
                  {errors.ageGroup && <FormHelperText>{errors.ageGroup}</FormHelperText>}
                </FormControl>

                <FormControl error={!!errors.experienceLevel} required>
                  <FormLabel>{t('experienceLevel')}</FormLabel>
                  <RadioGroup
                    value={formData.experienceLevel}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                  >
                    <FormControlLabel value="beginner" control={<Radio />} label={t('experienceBeginner')} />
                    <FormControlLabel value="intermediate" control={<Radio />} label={t('experienceIntermediate')} />
                    <FormControlLabel value="advanced" control={<Radio />} label={t('experienceAdvanced')} />
                  </RadioGroup>
                  {errors.experienceLevel && <FormHelperText>{errors.experienceLevel}</FormHelperText>}
                </FormControl>

                <FormControl error={!!errors.availability} required>
                  <FormLabel>{t('availability')}</FormLabel>
                  <RadioGroup
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                  >
                    <FormControlLabel value="weekdays" control={<Radio />} label={t('availabilityWeekdays')} />
                    <FormControlLabel value="weekends" control={<Radio />} label={t('availabilityWeekends')} />
                    <FormControlLabel value="evenings" control={<Radio />} label={t('availabilityEvenings')} />
                    <FormControlLabel value="flexible" control={<Radio />} label={t('availabilityFlexible')} />
                  </RadioGroup>
                  {errors.availability && <FormHelperText>{errors.availability}</FormHelperText>}
                </FormControl>

                <TextField
                  label={t('location')}
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  error={!!errors.location}
                  helperText={errors.location}
                  fullWidth
                  required
                  placeholder="e.g., Cardiff, Swansea, Newport"
                />

                <FormControl error={!!errors.disability} required>
                  <FormLabel>{t('disability')}</FormLabel>
                  <RadioGroup
                    value={formData.disability}
                    onChange={(e) => handleInputChange('disability', e.target.value)}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label={t('disabilityYes')} />
                    <FormControlLabel value="no" control={<Radio />} label={t('disabilityNo')} />
                    <FormControlLabel value="prefer-not-to-say" control={<Radio />} label={t('disabilityPreferNotToSay')} />
                  </RadioGroup>
                  {errors.disability && <FormHelperText>{errors.disability}</FormHelperText>}
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  sx={{
                    mt: 2,
                    backgroundColor: '#EE3524',
                    '&:hover': {
                      backgroundColor: '#d12e1f',
                    },
                  }}
                >
                  {submitting ? <CircularProgress size={24} color="inherit" /> : t('submit')}
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default PlayScreen
