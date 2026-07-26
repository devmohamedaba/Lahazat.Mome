// src/components/ui/Card.jsx

import PropTypes from 'prop-types'

export default function Card({children, className = ''}) {
  return (
    <div
      className={`
        rounded-2xl
        bg-surface
        shadow-sm
        border
        border-border
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg

        ${className}
      `}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
