import {Languages} from 'lucide-react'
import {useTranslation} from 'react-i18next'

export default function LanguageSwitcher() {
  const {i18n} = useTranslation()

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === 'ar' ? 'en' : 'ar'

    i18n.changeLanguage(nextLanguage)
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Change language"
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-gray-200
        px-4
        py-2
        transition
        hover:border-primary
        hover:bg-primary/5
      "
    >
      <Languages size={18} />

      <span className="font-medium">
        {i18n.language === 'ar' ? 'English' : 'العربية'}
      </span>
    </button>
  )
}
