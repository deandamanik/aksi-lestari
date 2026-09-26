import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '../../../components/common/Icons'

/**
 * AuthInputField
 * Field input reusable untuk formulir login dan register.
 * Dilengkapi dengan toggle visibilitas password (ikon mata) dan penanganan error.
 */
export default function AuthInputField({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = true,
  autoComplete,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === 'password'
  const computedType = isPasswordField ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={id}
        className="text-xs sm:text-sm font-semibold text-gray-700 tracking-tight"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={id}
          name={name}
          type={computedType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base text-gray-900 bg-gray-50/80 border transition-all duration-200 outline-none placeholder:text-gray-400 ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-500/10'
              : 'border-gray-200 hover:border-gray-300 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10'
          } ${isPasswordField ? 'pr-11' : 'pr-4'}`}
        />

        {/* Toggle Show/Hide Password Eye Button */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            className="absolute right-3.5 p-1 rounded-md text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {showPassword ? (
              <EyeOffIcon className="w-4.5 h-4.5" />
            ) : (
              <EyeIcon className="w-4.5 h-4.5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <span id={`${id}-error`} role="alert" className="text-xs text-red-600 font-medium mt-0.5 ml-1 animate-error-slide">
          {error}
        </span>
      )}
    </div>
  )
}
