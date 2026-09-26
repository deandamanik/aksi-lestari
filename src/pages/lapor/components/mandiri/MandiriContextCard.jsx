import { useState } from 'react'
import { getIdentificationData } from '../../../../data/lapor/identificationData'
import {
  CameraIcon,
  CheckIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  MapPinIcon,
  ShieldAlertIcon,
} from '../../../../components/common/Icons'
import { formatFileSize } from '../../../../utils/formatters'
import { useObjectURL } from '../../../../hooks/useObjectURL'
import { formatAddressBreakdown } from '../../../../utils/mapUtils'

function MandiriContextCard({ temukan, kenali, guidance }) {
  const categoryKey = kenali?.category || 'plastik'
  const ident = getIdentificationData(categoryKey)
  const photo = temukan?.photo
  const location = temukan?.location
  const safetyNote = guidance?.safetyNote

  const [failedFile, setFailedFile] = useState(null)
  const activeUrl = useObjectURL(photo?.file)
  const hasError = Boolean(photo?.file && failedFile === photo?.file)

  // Format brief address (first 2 segments)
  const locationText = formatAddressBreakdown(location?.address).primary || null

  const wasteName = kenali?.label || ident.label || 'Botol Plastik Kemasan'
  const wasteCategory = ident.categoryLabel || 'Plastik'
  const wasteType = ident.typeLabel || 'Sekali Pakai'
  const wasteMaterial = ident.materialLabel || 'PET / Polyethylene'

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs overflow-hidden">
      {/* 1. Standard Lapor Photo Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <CameraIcon className="w-4 h-4 text-primary" strokeWidth={1.75} />
          <span className="font-bold text-sm text-primary">Foto Temuan</span>
        </div>
        {photo?.file && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary">
            <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
            Terekam
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-4.5">
        {/* Standardized 4:3 aspect ratio photo */}
        {activeUrl && !hasError ? (
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-xs relative">
            <img
              src={activeUrl}
              alt={wasteName}
              onError={() => setFailedFile(photo?.file)}
              className="w-full h-full object-cover select-none"
            />
            {/* 4:3 Frame Camera Brackets */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white/60 pointer-events-none" />

            <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white/90 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase pointer-events-none select-none border border-white/10">
              Rasio 4:3
            </div>
          </div>
        ) : hasError ? (
          <div className="w-full rounded-xl bg-amber-50/60 border border-amber-200/80 p-6 text-center flex flex-col items-center justify-center gap-2">
            <AlertCircleIcon className="w-8 h-8 text-amber-600" />
            <p className="text-sm font-semibold text-stone-700">Pratinjau foto tidak dapat ditampilkan.</p>
          </div>
        ) : (
          <div className="w-full rounded-xl bg-stone-50 border border-dashed border-stone-200 min-h-[200px] flex flex-col items-center justify-center p-6 text-center">
            <CameraIcon className="w-8 h-8 text-stone-300 mb-2" strokeWidth={1.5} />
            <p className="text-sm font-medium text-stone-400">Belum ada foto dipilih</p>
          </div>
        )}

        {photo?.fileName && (
          <p className="text-[11px] text-stone-400 font-medium truncate -mt-2">
            {photo.fileName} {photo.fileSize ? `· ${formatFileSize(photo.fileSize)}` : ''}
          </p>
        )}

        {/* 2. Brief Context Information */}
        <div className="pt-3.5 border-t border-stone-100 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-primary">
              Konteks Temuan
            </span>
            {ident.attentionLevel && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 select-none">
                <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <span>{ident.attentionLevel}</span>
              </span>
            )}
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-stone-900 tracking-tight leading-snug">
            {wasteName}
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span>{wasteCategory}</span>
            <span className="text-stone-300 select-none" aria-hidden="true">·</span>
            <span>{wasteType}</span>
            <span className="text-stone-300 select-none" aria-hidden="true">·</span>
            <span>{wasteMaterial}</span>
          </p>
          {locationText && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500 truncate">
              <MapPinIcon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
              <span className="truncate">{locationText}</span>
            </p>
          )}
        </div>

        {/* 3. Catatan Keamanan */}
        {safetyNote && (
          <div className="pt-3.5 border-t border-stone-100 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <ShieldAlertIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} aria-hidden="true" />
              <h3 className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                {safetyNote.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {safetyNote.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MandiriContextCard
