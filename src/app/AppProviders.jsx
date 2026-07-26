// src/app/AppProviders.jsx

import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import {Toaster} from 'react-hot-toast'
import {useTranslation} from 'react-i18next'

import ScrollToTop from '../components/common/ScrollToTop'

function LanguageDirectionManager() {
  const {i18n} = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return null
}

export default function AppProviders({children}) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageDirectionManager />
        <ScrollToTop />

        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 4000,

            style: {
              background: '#ffffff',
              color: '#263238',
              border: '1px solid #E5ECEC',
              borderRadius: '14px',
              padding: '14px 16px',
              fontSize: '14px',
              boxShadow: '0 10px 30px rgba(0,0,0,.08)',
            },

            success: {
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#FFFFFF',
              },
            },

            error: {
              iconTheme: {
                primary: '#E53935',
                secondary: '#FFFFFF',
              },
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  )
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
}
