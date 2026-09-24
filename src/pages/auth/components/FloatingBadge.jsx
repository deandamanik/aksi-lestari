/**
 * FloatingBadge
 * Badge melayang semi-transparan dengan ikon SVG dan animasi naik-turun halus (smooth float).
 */
export default function FloatingBadge({
  icon: Icon,
  prefix = '+',
  label,
  className = '',
  animationClass = 'animate-auth-float-1',
  variant = 'glass',
}) {
  const isAccent = variant === 'accent'

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold select-none shadow-sm transition-transform ${animationClass} ${
        isAccent
          ? 'bg-amber-400/25 border border-amber-300/40 text-amber-100 backdrop-blur-md'
          : 'bg-white/20 border border-white/30 text-white backdrop-blur-md'
      } ${className}`}
    >
      {Icon && (
        <span className="shrink-0 text-white/90">
          <Icon className="w-3.5 h-3.5" />
        </span>
      )}
      {prefix && !Icon && (
        <span className="text-white/80 font-bold">{prefix}</span>
      )}
      <span className="tracking-wide leading-none">{label}</span>
    </div>
  )
}
