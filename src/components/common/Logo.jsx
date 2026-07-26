// src/components/common/Logo.jsx

import PropTypes from 'prop-types'

export default function Logo({size = 44, className = ''}) {
  return (
    <img
      src="/logo/logo-navbar-64.png"
      alt="Lahazat Moments"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  )
}

Logo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
}
