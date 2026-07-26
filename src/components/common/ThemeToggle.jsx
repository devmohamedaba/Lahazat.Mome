// src/components/common/ThemeToggle.jsx

import {Sun, Moon} from 'lucide-react'
import useTheme from '../../hooks/useTheme'

export default function ThemeToggle() {
  const {theme, toggleTheme} = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === 'dark' ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'
      }
      className="
        inline-flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-border
        text-content
        transition
        hover:border-primary
        hover:bg-primary/5
      "
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
