import { useRef } from 'react'
import { DEFAULT_MAP_PIN, latLngToMapCoords } from '../../../../utils/mapUtils'

function ReportMapPreview({ location, pin, isPickerMode = false, onMapClick }) {
  const svgRef = useRef(null)
  const resolvedPin = pin ?? (location?.lat && location?.lng ? latLngToMapCoords(location.lat, location.lng) : DEFAULT_MAP_PIN)
  const pinX = resolvedPin.x
  const pinY = resolvedPin.y
  const hasLocation = Boolean(location?.lat || pin)

  const handleClick = (e) => {
    if (!isPickerMode || !svgRef.current || !onMapClick) return
    const rect = svgRef.current.getBoundingClientRect()
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX)
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY)
    if (clientX === undefined || clientY === undefined) return

    const rawX = ((clientX - rect.left) / rect.width) * 560
    const rawY = ((clientY - rect.top) / rect.height) * 220
    const clampedX = Math.max(16, Math.min(544, Math.round(rawX)))
    const clampedY = Math.max(20, Math.min(200, Math.round(rawY)))

    onMapClick({ x: clampedX, y: clampedY })
  }

  const handleKeyDown = (e) => {
    if (!isPickerMode || !onMapClick) return
    const step = e.shiftKey ? 30 : 15
    let newX = pinX
    let newY = pinY
    let handled = false

    if (e.key === 'ArrowLeft') {
      newX = Math.max(16, pinX - step)
      handled = true
    } else if (e.key === 'ArrowRight') {
      newX = Math.min(544, pinX + step)
      handled = true
    } else if (e.key === 'ArrowUp') {
      newY = Math.max(20, pinY - step)
      handled = true
    } else if (e.key === 'ArrowDown') {
      newY = Math.min(200, pinY + step)
      handled = true
    }

    if (handled) {
      e.preventDefault()
      onMapClick({ x: newX, y: newY })
    }
  }

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isPickerMode ? 0 : undefined}
      role={isPickerMode ? 'application' : undefined}
      className={`relative w-full rounded-xl overflow-hidden border transition-all duration-200 select-none ${
        isPickerMode
          ? 'border-primary ring-2 ring-primary/20 cursor-crosshair shadow-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          : 'border-border-warm'
      }`}
      aria-label={
        isPickerMode
          ? `Peta interaktif pemilihan lokasi. Koordinat pin saat ini X ${pinX}, Y ${pinY}. Gunakan tombol panah untuk memindahkan pin.`
          : 'Pratinjau peta titik lokasi temuan sampah'
      }
      aria-roledescription={isPickerMode ? 'pemilih koordinat lokasi' : undefined}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 560 220"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        aria-hidden="true"
      >
        <rect width="560" height="220" fill="#EDE9DF" />
        <rect x="0" y="0" width="560" height="220" fill="#E8E3D8" />

        <rect x="0" y="58" width="560" height="14" fill="#FAFAF7" opacity="0.95" />
        <rect x="0" y="108" width="560" height="18" fill="#FAFAF7" opacity="0.95" />
        <rect x="0" y="168" width="560" height="12" fill="#FAFAF7" opacity="0.95" />
        <rect x="105" y="0" width="14" height="220" fill="#FAFAF7" opacity="0.95" />
        <rect x="268" y="0" width="18" height="220" fill="#FAFAF7" opacity="0.95" />
        <rect x="430" y="0" width="12" height="220" fill="#FAFAF7" opacity="0.95" />

        <rect x="119" y="72" width="135" height="28" fill="#DDD9CE" rx="1" />
        <rect x="119" y="126" width="135" height="32" fill="#C8D4C0" rx="1" opacity="0.75" />
        <rect x="286" y="72" width="129" height="28" fill="#DDD9CE" rx="1" />
        <rect x="286" y="126" width="129" height="32" fill="#DDD9CE" rx="1" />
        <rect x="0" y="72" width="90" height="28" fill="#DDD9CE" rx="0" />
        <rect x="442" y="72" width="118" height="28" fill="#DDD9CE" rx="0" />
        <rect x="442" y="126" width="118" height="32" fill="#DDD9CE" rx="0" />

        <rect x="0" y="116" width="256" height="1.5" fill="#D4D0C8" opacity="0.7" />
        <rect x="286" y="116" width="274" height="1.5" fill="#D4D0C8" opacity="0.7" />

        <path
          d="M0 25 Q 120 40, 240 20 T 480 35 T 560 22"
          fill="none"
          stroke="#BFD6D2"
          strokeWidth="6"
          opacity="0.6"
        />

        {hasLocation && (
          <g>
            <circle cx={pinX} cy={pinY} r={isPickerMode ? 26 : 20} fill="#22603B" opacity={isPickerMode ? 0.16 : 0.08} />
            <circle cx={pinX} cy={pinY} r={isPickerMode ? 16 : 12} fill="#22603B" opacity={isPickerMode ? 0.25 : 0.15} />
            <ellipse cx={pinX} cy={pinY + 14} rx={7} ry={3} fill="#112217" opacity="0.25" />
            <path
              d={`M${pinX} ${pinY - 24} C${pinX - 10} ${pinY - 24} ${pinX - 16} ${pinY - 16} ${pinX - 16} ${pinY - 7} C${pinX - 16} ${pinY + 5} ${pinX} ${pinY + 14} ${pinX} ${pinY + 14} C${pinX} ${pinY + 14} ${pinX + 16} ${pinY + 5} ${pinX + 16} ${pinY - 7} C${pinX + 16} ${pinY - 16} ${pinX + 10} ${pinY - 24} ${pinX} ${pinY - 24} Z`}
              fill="#22603B"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <circle cx={pinX} cy={pinY - 8} r="5" fill="white" />
            <circle cx={pinX} cy={pinY - 8} r="2.5" fill="#22603B" />
            <g transform={`translate(${pinX - 40}, ${pinY + 18})`}>
              <rect width="80" height="18" rx="9" fill="#22603B" opacity="0.95" />
              <text
                x="40"
                y="12"
                textAnchor="middle"
                fill="white"
                fontSize="8.5"
                fontFamily="system-ui, sans-serif"
                fontWeight="700"
              >
                {isPickerMode ? 'Titik Dipilih' : 'Titik Sampah'}
              </text>
            </g>
          </g>
        )}

        <rect x="524" y="174" width="24" height="34" rx="6" fill="white" stroke="#D4CFC8" strokeWidth="1" />
        <line x1="536" y1="182" x2="536" y2="190" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="532" y1="186" x2="540" y2="186" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="532" y1="199" x2="540" y2="199" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />

        <rect x="14" y="198" width="50" height="1.5" fill="#888" opacity="0.6" />
        <rect x="14" y="195" width="1.5" height="8" fill="#888" opacity="0.6" />
        <rect x="62" y="195" width="1.5" height="8" fill="#888" opacity="0.6" />
        <text x="16" y="212" fill="#777" fontSize="7.5" fontFamily="system-ui, sans-serif">200 m</text>
      </svg>

      {isPickerMode && (
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary text-white shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            Klik peta untuk pindahkan pin
          </span>
        </div>
      )}
    </div>
  )
}

export default ReportMapPreview
