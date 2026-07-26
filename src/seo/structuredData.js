const structuredData = {
  '@context': 'https://schema.org',

  '@type': 'MedicalBusiness',

  name: 'Lahazat Moments',

  url: 'https://lahazatmoments.com',

  logo: 'https://lahazatmoments.com/logo.png',

  image: 'https://lahazatmoments.com/logo.png',

  telephone: '+20xxxxxxxxxx',

  email: 'info@lahazatmoments.com',

  address: {
    '@type': 'PostalAddress',

    addressCountry: 'EG',

    addressLocality: 'Cairo',
  },

  medicalSpecialty: ['Psychology', 'Mental Health', 'Psychotherapy'],

  areaServed: 'Worldwide',

  availableLanguage: ['Arabic', 'English'],
}

export default structuredData
