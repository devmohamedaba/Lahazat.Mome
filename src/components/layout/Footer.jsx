// src/components/layout/Footer.jsx

import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import ROUTES from '../../constants/routes'
import contactInfo from '../../constants/contactInfo'
import navigation from '../../constants/navigation'
import Logo from '../common/Logo'

export default function Footer() {
  const {t} = useTranslation('common')

  return (
    <footer
      className="bg-surface-inverse text-content-inverse"
      role="contentinfo"
    >
      <div
        className="
          container
          mx-auto
          grid
          gap-10
          px-4
          py-14

          md:grid-cols-2

          lg:grid-cols-4
        "
      >
        {/* Brand */}
        <div>
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <Logo size={40} />
            <span className="text-2xl font-bold text-content-inverse">
              {t('brand.name')}
            </span>
          </Link>

          <p className="mt-4 text-sm leading-7 text-content-inverse-muted">
            {t('footer.description')}
          </p>

          <div className="mt-6 flex gap-3">{/* social icons here */}</div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-content-inverse">
            {t('footer.quickLinks')}
          </h3>

          <ul className="space-y-3">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="text-sm text-content-inverse-muted transition hover:text-content-inverse"
                >
                  {t(`navigation.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-content-inverse">
            {t('footer.servicesTitle')}
          </h3>

          <ul className="space-y-3 text-sm text-content-inverse-muted">
            <li>{t('serviceItems.individual')}</li>
            <li>{t('serviceItems.family')}</li>
            <li>{t('serviceItems.couples')}</li>
            <li>{t('serviceItems.children')}</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-content-inverse">
            {t('footer.contactUs')}
          </h3>

          <ul className="space-y-4 text-sm text-content-inverse-muted">
            <li className="flex items-center gap-3">
              <span>{contactInfo.phone}</span>
            </li>

            <li className="flex items-center gap-3">
              <span>{contactInfo.email}</span>
            </li>

            <li className="flex items-center gap-3">
              <span>
                {contactInfo.address.city}, {contactInfo.address.country}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-content-inverse-muted">
        © {new Date().getFullYear()} {t('brand.name')}. {t('footer.copyright')}{' '}
        By:Dev.Mohamed Abayazid
      </div>
    </footer>
  )
}
