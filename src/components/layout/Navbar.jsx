// src/components/layout/Navbar.jsx
import PropTypes from 'prop-types'

import {useState, useEffect} from 'react'
import {NavLink, Link} from 'react-router-dom'
import {Menu, X, CalendarCheck} from 'lucide-react'
import {useTranslation} from 'react-i18next'

import navigation from '../../constants/navigation'
import ROUTES from '../../constants/routes'

import LanguageSwitcher from '../common/LanguageSwitcher'
import ThemeToggle from '../common/ThemeToggle'
import Logo from '../common/Logo'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const {t} = useTranslation('common')

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? 'bg-surface/95 shadow-md backdrop-blur-md'
            : 'bg-transparent'
        }
      `}
    >
      <nav
        className="container mx-auto flex h-20 items-center justify-between px-4"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-3"
          onClick={closeMenu}
        >
          <Logo size={44} />
          <span className="text-xl font-bold text-primary">
            {t('brand.name')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({isActive}) =>
                `relative text-l font-medium transition-colors
                ${
                  isActive
                    ? 'text-primary'
                    : 'text-content-muted hover:text-primary'
                }`
              }
            >
              {t(`navigation.${item.key}`)}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />

          <Link
            to={ROUTES.BOOK}
            className="
              inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5
              text-sm font-semibold text-white transition-all duration-300
              hover:bg-primary-dark hover:shadow-lg
            "
          >
            <CalendarCheck size={18} aria-hidden="true" />
            <span>{t('buttons.bookNow')}</span>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              text-content transition hover:bg-surface-alt
            "
            aria-label={isOpen ? t('buttons.closeMenu') : t('buttons.openMenu')}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && <MobileMenu closeMenu={closeMenu} />}
    </header>
  )
}

Navbar.propTypes = {}
