// src/components/ui/Section.jsx

import PropTypes from 'prop-types'

export default function Section({
  children,

  className = '',

  id,
}) {
  return (
    <section
      id={id}
      className={`
        py-16
        md:py-20

        ${className}
      `}
    >
      {children}
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.node.isRequired,

  className: PropTypes.string,

  id: PropTypes.string,
}
