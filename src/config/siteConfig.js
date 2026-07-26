// src/config/siteConfig.js

const siteConfig = {
  app: {
    name: 'Lahazat Moments',
    shortName: 'Lahazat',
    version: '1.0.0',
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'ar'],
  },

  company: {
    name: 'Lahazat Moments',
    type: 'Mental Health & Psychological Counseling Platform',
    email: 'info@lahazatmoments.com',
    phone: '+20 100 000 0000',
    whatsapp: '+201000000000',
    website: 'https://lahazatmoments.vercel.app',
  },

  address: {
    country: 'Egypt',
    city: 'Cairo',
    street: '',
    postalCode: '',
  },

  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    x: '',
  },

  seo: {
    title: 'Lahazat Moments | Mental Health Platform',
    titleTemplate: '%s | Lahazat Moments',
    description:
      'Professional psychological counseling, therapy sessions, mental health resources, and emotional well-being support.',
    image: '/images/seo/cover.jpg',
    keywords: [
      'Mental Health',
      'Psychological Counseling',
      'Therapy',
      'Online Therapy',
      'Psychologist',
      'Mental Wellness',
      'Depression',
      'Anxiety',
      'Stress',
      'Family Therapy',
      'Couples Therapy',
    ],
    author: 'Lahazat Moments',
    robots: 'index,follow',
    themeColor: '#5527A4',
  },
}

export default siteConfig
