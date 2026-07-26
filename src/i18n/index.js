import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import arCommon from './locales/ar/common.json'
import arHome from './locales/ar/home.json'
import arAbout from './locales/ar/about.json'
import arServices from './locales/ar/services.json'
import arSpecialists from './locales/ar/specialists.json'
import arResources from './locales/ar/resources.json'
import arBooking from './locales/ar/booking.json'
import arContact from './locales/ar/contact.json'
import arFaq from './locales/ar/faq.json'
import arValidation from './locales/ar/validation.json'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enAbout from './locales/en/about.json'
import enServices from './locales/en/services.json'
import enSpecialists from './locales/en/specialists.json'
import enResources from './locales/en/resources.json'
import enBooking from './locales/en/booking.json'
import enContact from './locales/en/contact.json'
import enFaq from './locales/en/faq.json'
import enValidation from './locales/en/validation.json'

const resources = {
  ar: {
    common: arCommon,
    home: arHome,
    about: arAbout,
    services: arServices,
    specialists: arSpecialists,
    resources: arResources,
    booking: arBooking,
    contact: arContact,
    faq: arFaq,
    validation: arValidation,
  },

  en: {
    common: enCommon,
    home: enHome,
    about: enAbout,
    services: enServices,
    specialists: enSpecialists,
    resources: enResources,
    booking: enBooking,
    contact: enContact,
    faq: enFaq,
    validation: enValidation,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    fallbackLng: 'ar',

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false,
    },

    defaultNS: 'common',

    ns: [
      'common',
      'home',
      'about',
      'services',
      'specialists',
      'resources',
      'booking',
      'contact',
      'faq',
      'validation',
    ],
  })

export default i18n
