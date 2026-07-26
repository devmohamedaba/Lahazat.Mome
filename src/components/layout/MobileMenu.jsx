// src/components/layout/MobileMenu.jsx

import PropTypes from 'prop-types'
import {NavLink, Link} from 'react-router-dom'
import {CalendarCheck} from 'lucide-react'
import {useTranslation} from 'react-i18next'

import navigation from '../../constants/navigation'
import ROUTES from '../../constants/routes'

export default function MobileMenu({closeMenu}) {
  const {t} = useTranslation('common')

  return (
    <div
      className="border-t border-border bg-surface px-4 py-6 shadow-lg lg:hidden"
      role="navigation"
      aria-label="Mobile Navigation"
    >
      {/* Navigation Links */}
      <div className="flex flex-col gap-4">
        {navigation.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={closeMenu}
            className={({isActive}) =>
              `
                rounded-lg
                px-4
                py-3
                text-sm
                font-medium
                transition

                ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-content-muted hover:bg-surface-alt'
                }
              `
            }
          >
            {t(`navigation.${item.key}`)}
          </NavLink>
        ))}
      </div>

      {/* Booking Button */}
      <Link
        to={ROUTES.BOOK}
        onClick={closeMenu}
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-2
          rounded-full
          bg-primary
          px-5
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-primary-dark
        "
      >
        <CalendarCheck size={18} aria-hidden="true" />
        <span>{t('buttons.bookNow')}</span>
      </Link>
    </div>
  )
}

MobileMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
}
