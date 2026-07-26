// src/hooks/useDirection.js

import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'

export default function useDirection() {
  const {i18n} = useTranslation()

  useEffect(() => {
    const isArabic = i18n.language === 'ar'

    document.documentElement.lang = i18n.language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'

    document.body.classList.toggle('rtl', isArabic)
    document.body.classList.toggle('ltr', !isArabic)
  }, [i18n.language])

  return {
    isRTL: i18n.language === 'ar',
    language: i18n.language,
  }
}
