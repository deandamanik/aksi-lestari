import { useState, useEffect } from 'react'
import { getIdentificationData } from '../../../../data/lapor/identificationData'
import { CameraIcon, AlertTriangleIcon } from '../../../../components/common/Icons'

function IdentifiedWasteSummary({ photo, kenali }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  const categoryKey = kenali?.category || 'plastik'
  const ident = getIdentificationData(categoryKey)

  useEffect(() => {
    if (!photo?.file) return

    const url = URL.createObjectURL(photo.file)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronizing temporary DOM Blob URL with File object lifecycle
    setThumbnailUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [photo?.file])

  const activeThumb = photo?.file ? thumbnailUrl : null

  return (
    <div className="w-full rounded-2xl bg-white border border-[#E8E5DC] p-3.5 sm:p-4 shadow-2xs flex items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200/80 overflow-hidden shrink-0 flex items-center justify-center">
          {activeThumb ? (
            <img
              src={activeThumb}
              alt="Pratinjau temuan sampah"
              className="w-full h-full object-cover select-none"
            />
          ) : (
            <CameraIcon className="w-5 h-5 text-stone-400" strokeWidth={1.5} />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-400 truncate">
            Temuan Teridentifikasi · {ident.categoryLabel} {ident.typeLabel}
          </p>
          <h2 className="font-display font-bold text-base sm:text-lg text-stone-900 tracking-tight truncate mt-0.5">
            {kenali?.label || ident.label}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5 truncate">
            {ident.categoryLabel} · {ident.typeLabel}
          </p>
        </div>
      </div>

      <div className="shrink-0 flex items-center">
        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-700 whitespace-nowrap select-none">
          <AlertTriangleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" strokeWidth={2.2} aria-hidden="true" />
          <span>{ident.attentionLevel}</span>
        </span>
      </div>
    </div>
  )
}

export default IdentifiedWasteSummary
