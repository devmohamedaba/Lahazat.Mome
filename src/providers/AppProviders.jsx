// src/providers/AppProviders.jsx

import PropTypes from 'prop-types'
import {BrowserRouter} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import {Toaster} from 'react-hot-toast'

export default function AppProviders({children}) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          containerStyle={{
            top: 20,
            right: 20,
          }}
          toastOptions={{
            duration: 4000,

            style: {
              background: '#FFFFFF',
              color: '#263238',
              border: '1px solid #DCEFEF',
              borderRadius: '16px',
              boxShadow: '0 12px 32px rgba(0,0,0,.08)',
              padding: '16px',
              fontSize: '14px',
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
