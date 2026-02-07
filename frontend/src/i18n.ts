import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // App
      appTitle: 'WRU Grassroots',

      // Input Location Screen
      inputYourLocation: 'Input your location',
      postcode: 'Postcode',
      enterPostcode: 'Enter postcode',
      postcodeRequired: 'Postcode is required',
      enterValidPostcode: 'Enter a valid UK postcode',
      geolocationNotSupported: 'Geolocation is not supported by your browser',
      couldNotFindPostcode: 'Could not find a postcode for your location',
      failedToLookupPostcode: 'Failed to look up postcode for your location',
      unableToRetrieveLocation: 'Unable to retrieve your location',
      or: 'or',
      useCurrentLocation: 'Use current location',
      locating: 'Locating...',
      search: 'Search',

      // Find Screen
      nearbyOrganisations: 'Nearby Organisations',
      clubsInView: '{{count}} club in view',
      clubsInView_other: '{{count}} clubs in view',
      moveMapToFind: 'Move the map to find clubs',

      // Organization Screen
      organisation: 'Organisation',
      teams: '{{count}} team',
      teams_other: '{{count}} teams',
      noTeamsFound: 'No teams found',
      noTeamsRegistered: 'This organisation has no teams registered',
      back: 'Back',
      playNow: 'Play Now',

      // Play Screen
      registerToPlay: 'Register to Play',
      fullName: 'Full Name',
      email: 'Email',
      phoneNumber: 'Phone Number',
      gender: 'Gender',
      ageGroup: 'Age Group',
      experienceLevel: 'Experience Level',
      availability: 'Availability',
      location: 'Location',
      disability: 'Do you have a disability?',
      submit: 'Submit Registration',
      fieldRequired: 'This field is required',
      invalidEmail: 'Please enter a valid email',
      invalidPhone: 'Please enter a valid phone number',
      genderMale: 'Male',
      genderFemale: 'Female',
      genderOther: 'Other',
      genderPreferNotToSay: 'Prefer not to say',
      ageUnder18: 'Under 18',
      age18to25: '18-25',
      age26to35: '26-35',
      age36to50: '36-50',
      ageOver50: 'Over 50',
      experienceBeginner: 'Beginner',
      experienceIntermediate: 'Intermediate',
      experienceAdvanced: 'Advanced',
      availabilityWeekdays: 'Weekdays',
      availabilityWeekends: 'Weekends',
      availabilityEvenings: 'Evenings',
      availabilityFlexible: 'Flexible',
      disabilityYes: 'Yes',
      disabilityNo: 'No',
      disabilityPreferNotToSay: 'Prefer not to say',
      registrationSuccess: 'Registration successful!',
      registrationError: 'Failed to submit registration',

      // Success Screen
      successMessage: 'Thanks for using WRU Grass Roots',
      contactMessage: 'Someone from {{orgName}} will be in touch soon!',
      returnHome: 'Return to Home',

      // Team details
      ages: 'Ages {{min}}-{{max}}',
      agesMin: 'Ages {{min}}+',
      agesMax: 'Up to {{max}}',
      male: 'Male',
      female: 'Female',
      mixed: 'Mixed',

      // Language
      language: 'Language',
      english: 'English',
      welsh: 'Cymraeg',
    },
  },
  cy: {
    translation: {
      // App
      appTitle: 'Rygbi Cymru Gwreiddiau',

      // Input Location Screen
      inputYourLocation: 'Rhowch eich lleoliad',
      postcode: 'Cod post',
      enterPostcode: 'Rhowch god post',
      postcodeRequired: 'Mae angen cod post',
      enterValidPostcode: 'Rhowch god post DU dilys',
      geolocationNotSupported: 'Nid yw daearleoli yn cael ei gefnogi gan eich porwr',
      couldNotFindPostcode: 'Methu dod o hyd i god post ar gyfer eich lleoliad',
      failedToLookupPostcode: 'Methu edrych i fyny cod post ar gyfer eich lleoliad',
      unableToRetrieveLocation: 'Methu adfer eich lleoliad',
      or: 'neu',
      useCurrentLocation: 'Defnyddio lleoliad cyfredol',
      locating: 'Yn lleoli...',
      search: 'Chwilio',

      // Find Screen
      nearbyOrganisations: 'Timau Cyfagos',
      clubsInView: '{{count}} clwb yn y golwg',
      clubsInView_other: '{{count}} clwb yn y golwg',
      moveMapToFind: 'Symudwch y map i ddod o hyd i glybiau',

      // Organization Screen
      organisation: 'Sefydliad',
      teams: '{{count}} tîm',
      teams_other: '{{count}} tîm',
      noTeamsFound: 'Dim timau wedi\'u canfod',
      noTeamsRegistered: 'Nid oes gan y sefydliad hwn dimau cofrestredig',
      back: 'Yn ôl',
      playNow: 'Chwarae Nawr',

      // Play Screen
      registerToPlay: 'Cofrestru i Chwarae',
      fullName: 'Enw Llawn',
      email: 'E-bost',
      phoneNumber: 'Rhif Ffôn',
      gender: 'Rhyw',
      ageGroup: 'Grŵp Oedran',
      experienceLevel: 'Lefel Profiad',
      availability: 'Argaeledd',
      location: 'Lleoliad',
      disability: 'A oes gennych anabledd?',
      submit: 'Cyflwyno Cofrestriad',
      fieldRequired: 'Mae angen y maes hwn',
      invalidEmail: 'Rhowch e-bost dilys',
      invalidPhone: 'Rhowch rif ffôn dilys',
      genderMale: 'Gwryw',
      genderFemale: 'Benyw',
      genderOther: 'Arall',
      genderPreferNotToSay: 'Gwell peidio dweud',
      ageUnder18: 'Dan 18',
      age18to25: '18-25',
      age26to35: '26-35',
      age36to50: '36-50',
      ageOver50: 'Dros 50',
      experienceBeginner: 'Dechreuwr',
      experienceIntermediate: 'Canolradd',
      experienceAdvanced: 'Uwch',
      availabilityWeekdays: 'Dyddiau\'r wythnos',
      availabilityWeekends: 'Penwythnosau',
      availabilityEvenings: 'Nosweithiau',
      availabilityFlexible: 'Hyblyg',
      disabilityYes: 'Oes',
      disabilityNo: 'Nac oes',
      disabilityPreferNotToSay: 'Gwell peidio dweud',
      registrationSuccess: 'Cofrestriad yn llwyddiannus!',
      registrationError: 'Methu cyflwyno cofrestriad',

      // Success Screen
      successMessage: 'Diolch am ddefnyddio Gwreiddiau Glaswelltog WRU',
      contactMessage: 'Bydd rhywun o {{orgName}} yn cysylltu cyn bo hir!',
      returnHome: 'Dychwelyd i\'r Cartref',

      // Team details
      ages: 'Oedrannau {{min}}-{{max}}',
      agesMin: 'Oedrannau {{min}}+',
      agesMax: 'Hyd at {{max}}',
      male: 'Gwryw',
      female: 'Benyw',
      mixed: 'Cymysg',

      // Language
      language: 'Iaith',
      english: 'English',
      welsh: 'Cymraeg',
    },
  },
}

const LANGUAGE_KEY = 'wru-language-preference'

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en'

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANGUAGE_KEY, lng)
})

export default i18n
