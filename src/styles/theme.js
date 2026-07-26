// src/styles/theme.js

export const theme = {
  colors: {
    primary: '#B08D57',
    primaryHover: '#9B7947',

    secondary: '#FCFAF8',

    dark: '#18181B',

    white: '#FFFFFF',

    text: '#525252',

    heading: '#1A1A1A',

    border: '#ECECEC',

    accent: '#D6B87A',

    success: '#16A34A',

    danger: '#DC2626',
  },

  typography: {
    heading: "'Playfair Display', serif",

    body: "'Inter', sans-serif",
  },

  container: {
    width: '1280px',
    paddingDesktop: '32px',
    paddingTablet: '24px',
    paddingMobile: '16px',
  },

  radius: {
    sm: '12px',

    md: '18px',

    lg: '24px',

    xl: '32px',

    full: '9999px',
  },

  transition: {
    fast: '0.2s',

    normal: '0.35s',

    slow: '0.5s',
  },

  shadow: {
    sm: '0 2px 8px rgba(0,0,0,.05)',

    md: '0 10px 30px rgba(0,0,0,.08)',

    lg: '0 25px 60px rgba(0,0,0,.12)',
  },
}

export default theme
