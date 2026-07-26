// src/components/ui/Textarea.jsx

import PropTypes from 'prop-types'

export default function Textarea({
  label,
  name,
  placeholder = '',
  value,
  onChange,
  rows = 5,
  icon: Icon,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-content-muted"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute start-0 top-3 flex items-center ps-4 text-primary">
            <Icon size={18} />
          </span>
        )}

        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full
            resize-none
            rounded-xl
            border
            border-border
            bg-surface
            py-3
            text-sm
            text-content
            outline-none
            transition
            placeholder:text-content-muted/60
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20

            ${Icon ? 'ps-11 pe-4' : 'px-4'}
          `}
        />
      </div>
    </div>
  )
}

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  icon: PropTypes.elementType,
}
