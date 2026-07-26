// src/components/ui/SectionTitle.jsx

import PropTypes from 'prop-types'

export default function SectionTitle({title, subtitle, align = 'center'}) {
  return (
    <div
      className={`
        mb-12
        ${align === 'center' ? 'text-center' : 'text-start'}
      `}
    >
      <h2 className="text-3xl font-bold text-content md:text-4xl">{title}</h2>

      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-content-muted">
          {subtitle}
        </p>
      )}
    </div>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['center', 'start']),
}
