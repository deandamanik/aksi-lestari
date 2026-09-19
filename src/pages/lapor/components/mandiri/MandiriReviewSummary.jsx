import { getIdentificationData } from '../../../../data/lapor/identificationData'
import { AlertTriangleIcon, MapPinIcon, FileTextIcon } from '../../../../components/common/Icons'
import ReportMapPreview from '../shared/ReportMapPreview'

function MandiriReviewSummary({ temukan, kenali, onEditLocation, onEditDescription }) {
  const categoryKey = kenali?.category || 'plastik'
  const ident = getIdentificationData(categoryKey)
  const location = temukan?.location
  const descriptionText = temukan?.description?.text?.trim()

  const parts = location?.address ? location.address.split(',').map((p) => p.trim()) : []
  const primaryAddress = parts.slice(0, 2).join(', ') || location?.address || 'Lokasi belum ditentukan'
  const secondaryAddress = parts.slice(2, 4).join(', ')

  return (
    <div className="rounded-2xl bg-white border border-[#E8E5DC] shadow-xs p-5 sm:p-6 flex flex-col gap-5.5">
      {/* 1. Identification Summary */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-primary">
              Hasil Identifikasi
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 tracking-tight mt-0.5">
              {kenali?.label || ident.label}
            </h2>
          </div>

          {ident.attentionLevel && (
            <div className="shrink-0 pt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 select-none">
                <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <span>{ident.attentionLevel}</span>
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-stone-500 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Kategori: {ident.categoryLabel}</span>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <span>Jenis: {ident.typeLabel}</span>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <span>Material: {ident.materialLabel}</span>
        </p>
      </div>

      {/* 2. Location Summary */}
      <div className="pt-4.5 border-t border-stone-100 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider">
            <MapPinIcon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
            <span>Lokasi Temuan</span>
          </div>
          <button
            type="button"
            onClick={onEditLocation}
            className="text-[11px] font-normal text-stone-400 hover:text-stone-600 hover:underline cursor-pointer transition-colors"
            aria-label="Ubah peta di langkah 1"
          >
            Ubah Peta
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-stone-800 leading-snug">{primaryAddress}</p>
          {secondaryAddress && (
            <p className="text-xs text-stone-500 leading-snug">{secondaryAddress}</p>
          )}
          <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5 flex-wrap">
            {typeof location?.lat === 'number' && typeof location?.lng === 'number' && (
              <span className="font-mono">
                Koordinat: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
              </span>
            )}
            {location?.source && (
              <>
                <span className="text-stone-300 select-none" aria-hidden="true">·</span>
                <span>
                  {location.source === 'gps' ? 'Sumber: GPS' : 'Sumber: Lokasi dipilih di peta'}
                </span>
              </>
            )}
          </div>
        </div>

        <ReportMapPreview location={location} />
      </div>

      {/* 3. Description Summary */}
      <div className="pt-4.5 border-t border-stone-100 flex flex-col gap-2 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider">
            <FileTextIcon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
            <span>Deskripsi Tambahan</span>
          </div>
          <button
            type="button"
            onClick={onEditDescription}
            className="text-[11px] font-normal text-stone-400 hover:text-stone-600 hover:underline cursor-pointer transition-colors"
            aria-label="Ubah deskripsi di langkah 1"
          >
            Ubah Deskripsi
          </button>
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere] ${descriptionText ? 'text-stone-700' : 'text-stone-400 italic'}`}>
          {descriptionText ? `"${descriptionText}"` : 'Tidak ada deskripsi tambahan.'}
        </p>
      </div>
    </div>
  )
}

export default MandiriReviewSummary
