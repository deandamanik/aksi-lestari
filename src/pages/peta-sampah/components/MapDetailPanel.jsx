import { useEffect, useState } from 'react'

/**
 * MapDetailPanel Component
 *
 * Floating editorial detail overlay panel for:
 * - Waste Reports (title, severity, category, status, address, reported date, route CTA)
 * - Bank Sampah (name, address, operating hours, accepted materials, contact, route CTA)
 *
 * Clean, modern editorial card design:
 * - No cluttered dots or pill boxes
 * - Generous typography, comfortable card width, and proportional button height
 * - Supports keyboard Escape accessibility
 */
function MapDetailPanel({ selectedPoint, onClose }) {
  // Retain last active point to allow smooth exit animation without sudden DOM blanking
  const [cachedPoint, setCachedPoint] = useState(selectedPoint)

  if (selectedPoint && selectedPoint !== cachedPoint) {
    setCachedPoint(selectedPoint)
  }

  const activePoint = selectedPoint || cachedPoint

  // Keyboard accessibility: Escape closes panel
  useEffect(() => {
    if (!selectedPoint) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPoint, onClose])

  if (!activePoint) return null

  const isReport = activePoint.type === 'report'
  const isBank = activePoint.type === 'bank'
  const data = activePoint.data

  const destinationLat = data?.latitude
  const destinationLng = data?.longitude
  const routeUrl = destinationLat && destinationLng
    ? `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`
    : '#'

  return (
    <div
      className={`fixed md:absolute bottom-3 md:bottom-auto left-3 sm:left-4 md:left-auto right-3 sm:right-4 md:right-4 lg:right-8 md:top-24 z-30 md:z-20 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-[340px] lg:w-[380px] pointer-events-none transition-all duration-200 ease-out ${
        selectedPoint
          ? 'opacity-100 translate-y-0 md:translate-x-0'
          : 'opacity-0 translate-y-6 md:translate-y-0 md:translate-x-6 pointer-events-none'
      }`}
    >
      <div className="bg-white/98 backdrop-blur-md rounded-2xl border border-border-warm shadow-[0_14px_40px_rgba(0,0,0,0.12)] p-4.5 sm:p-5 md:p-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pb-6 pointer-events-auto max-h-[72dvh] md:max-h-[calc(100dvh-7.5rem)] flex flex-col overflow-hidden">
        {/* Mobile Pull Handle */}
        <div className="md:hidden w-8 h-1 bg-stone-300 rounded-full mx-auto mb-2.5 shrink-0" aria-hidden="true" />

        {/* Panel Header */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-border-warm/60 shrink-0">
          {isReport && (
            <div className="flex items-center">
              <span className="font-body text-xs sm:text-[13px] font-semibold text-stone-600 uppercase tracking-wider">
                Laporan Warga · Tingkat {data.severity}
              </span>
            </div>
          )}

          {isBank && (
            <div className="flex items-center">
              <span className="font-body text-xs sm:text-[13px] font-semibold text-[#1D70B8] uppercase tracking-wider">
                Bank Sampah
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Tutup detail lokasi"
          >
            <svg
              className="w-4.5 h-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto pt-3.5 pb-1 space-y-3.5 sm:space-y-4 font-body text-stone-600">
          {isReport && (
            <>
              <div>
                <h2 className="font-display font-semibold text-primary text-[19px] sm:text-[21px] leading-snug">
                  {data.title}
                </h2>
                <p className="font-body text-xs sm:text-[13px] text-stone-400 mt-1">
                  ID: <span className="font-medium text-stone-500">{data.id}</span>
                  {data.reportedAt && ` · Dilaporkan ${data.reportedAt}`}
                </p>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-border-warm/60">
                <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-stone-400 block mb-0.5">
                  Lokasi Temuan
                </span>
                <p className="font-medium text-stone-700 leading-relaxed text-[13px] sm:text-sm">
                  {data.address}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2.5 sm:pt-3 border-t border-border-warm/60">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-stone-400 block mb-0.5">
                    Kategori
                  </span>
                  <p className="font-medium text-stone-700 leading-relaxed text-[13px] sm:text-sm">
                    {data.category}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-stone-400 block mb-0.5">
                    Status
                  </span>
                  <p
                    className={`font-semibold leading-relaxed text-[13px] sm:text-sm ${
                      data.status === 'diproses'
                        ? 'text-secondary'
                        : data.status === 'selesai'
                          ? 'text-primary'
                          : 'text-accent'
                    }`}
                  >
                    {data.status === 'diproses'
                      ? 'Sedang Diproses'
                      : data.status === 'selesai'
                        ? 'Selesai'
                        : 'Menunggu'}
                  </p>
                </div>
              </div>
            </>
          )}

          {isBank && (
            <>
              <div>
                <h2 className="font-display font-semibold text-primary text-[19px] sm:text-[21px] leading-snug">
                  {data.name}
                </h2>
                {data.district && (
                  <p className="font-body text-xs sm:text-[13px] text-stone-500 mt-1 font-medium">
                    Wilayah: {data.district}
                  </p>
                )}
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-border-warm/60">
                <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-stone-400 block mb-0.5">
                  Alamat Lengkap
                </span>
                <p className="font-medium text-stone-700 leading-relaxed text-[13px] sm:text-sm">
                  {data.address}
                </p>
              </div>

              {data.operatingHours && (
                <div className="pt-2.5 sm:pt-3 border-t border-border-warm/60">
                  <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-stone-400 block mb-0.5">
                    Jam Operasional
                  </span>
                  <p className="font-medium text-stone-700 text-[13px] sm:text-sm">
                    {data.operatingHours}
                  </p>
                </div>
              )}

              {data.acceptedMaterials && data.acceptedMaterials.length > 0 && (
                <div className="pt-2.5 sm:pt-3 border-t border-border-warm/60">
                  <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-stone-400 block mb-0.5">
                    Material Diterima
                  </span>
                  <p className="font-medium text-stone-700 leading-relaxed text-[13px] sm:text-sm">
                    {data.acceptedMaterials.join(', ')}
                  </p>
                </div>
              )}

              {data.contact && (
                <div className="pt-2.5 sm:pt-3 border-t border-border-warm/60">
                  <span className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-stone-400 block mb-0.5">
                    Kontak Pengelola
                  </span>
                  <a
                    href={`tel:${data.contact.replace(/[^\d+]/g, '')}`}
                    className="font-medium text-primary hover:underline text-[13px] sm:text-sm inline-flex items-center gap-1"
                  >
                    <span>{data.contact}</span>
                  </a>
                </div>
              )}
            </>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="pt-3.5 mt-1 border-t border-border-warm/60 shrink-0">
          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 h-11.5 sm:h-12 px-5 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-body text-sm sm:text-[15px] font-semibold shadow-xs transition-all cursor-pointer select-none"
          >
            <span>Rute ke Lokasi</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MapDetailPanel
