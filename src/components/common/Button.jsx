import { forwardRef } from 'react'

/**
 * Button — Shared button primitive for AksiLestari.
 *
 * Provides standardized visual variants, size scale, focus ring management,
 * disabled styling, and accessible loading state presentation.
 *
 * Variants:
 * - primary: Solid brand green action button
 * - secondary: Subtle warm neutral card/cancel action button
 * - outline: Bordered brand button for secondary paths
 * - destructive: High-emphasis red action button for deletions
 *
 * Sizes:
 * - sm: Compact actions (modals, dense toolbars)
 * - md: Default standard action button
 * - lg: Prominent call-to-action / wizard flows
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    type = 'button',
    className = '',
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading

  const baseStyles =
    'inline-flex items-center justify-center font-semibold select-none transition-all duration-150 focus:outline-hidden cursor-pointer'

  const variantStyles = {
    primary:
      'bg-primary hover:bg-primary/90 text-white shadow-xs active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    secondary:
      'bg-neutral hover:bg-stone-200/80 text-stone-700 border border-border-warm hover:border-stone-300 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-stone-400',
    outline:
      'bg-white hover:bg-primary/[0.04] text-primary border border-primary/25 hover:border-primary/45 shadow-xs active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    destructive:
      'bg-red-700 hover:bg-red-800 text-white shadow-xs active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2',
  }

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-xl gap-1.5',
    md: 'text-xs sm:text-sm px-5 py-2.5 rounded-xl gap-2',
    lg: 'text-sm sm:text-base px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl gap-2',
  }

  const disabledStyles = isDisabled
    ? 'opacity-60 cursor-not-allowed pointer-events-none active:scale-100 shadow-none'
    : ''

  const variantClass = variantStyles[variant] || variantStyles.primary
  const sizeClass = sizeStyles[size] || sizeStyles.md

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${disabledStyles} ${className}`.trim()}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
            aria-hidden="true"
          />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
})

export default Button
