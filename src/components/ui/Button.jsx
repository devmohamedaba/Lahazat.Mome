// src/components/ui/Button.jsx

import PropTypes from 'prop-types'

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  onClick,
  disabled = false,
}) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',

    secondary:
      'bg-secondary text-gray-900 hover:bg-secondary-600 hover:text-white',

    outline:
      'border border-primary text-primary hover:bg-primary hover:text-white',

    ghost: 'text-primary hover:bg-primary/10',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center

        rounded-full

        px-6
        py-3

        text-sm
        font-semibold

        transition-all
        duration-300

        disabled:cursor-not-allowed
        disabled:opacity-60

        ${variants[variant]}

        ${className}
      `}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}
