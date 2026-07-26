// src/components/ui/Input.jsx

import PropTypes from 'prop-types'

export default function Input({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
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
          <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-primary">
            <Icon size={18} />
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full
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

      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  icon: PropTypes.elementType,
  required: PropTypes.bool,
}
