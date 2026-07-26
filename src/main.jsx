// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './i18n'

import App from './app/App'
import AppProviders from './app/AppProviders'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)
