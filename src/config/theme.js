// src/config/theme.js

const theme = {
  colors: {
    primary: '#4F8A8B',
    primaryDark: '#3D7071',
    primaryLight: '#7EB7B8',

    secondary: '#DCEFEF',

    accent: '#7BB5B6',

    background: '#F8FCFC',

    surface: '#FFFFFF',

    border: '#E5ECEC',

    success: '#4CAF50',

    warning: '#F9A825',

    danger: '#E53935',

    info: '#2196F3',

    text: {
      primary: '#263238',
      secondary: '#546E7A',
      muted: '#78909C',
      white: '#FFFFFF',
    },
  },

  fonts: {
    english: "'Poppins', sans-serif",

    arabic: "'Cairo', sans-serif",
  },

  radius: {
    sm: '8px',

    md: '12px',

    lg: '20px',

    xl: '32px',

    full: '9999px',
  },

  shadow: {
    sm: '0 2px 8px rgba(0,0,0,.05)',

    md: '0 8px 24px rgba(0,0,0,.08)',

    lg: '0 20px 40px rgba(0,0,0,.12)',
  },

  transition: {
    fast: '150ms ease',

    normal: '300ms ease',

    slow: '500ms ease',
  },

  container: {
    width: '1280px',

    padding: '1rem',
  },
}

export default theme
