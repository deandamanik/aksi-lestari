import { useState } from 'react'
import { getIdentificationData } from '../../../../data/lapor/identificationData'
import {
  FileTextIcon,
  MapPinIcon,
  AlertTriangleIcon,
  CameraIcon,
  CheckIcon,
  AlertCircleIcon,
  ClockIcon,
} from '../../../../components/common/Icons'
import { formatFileSize, formatDateTime } from '../../../../utils/formatters'
import { useObjectURL } from '../../../../hooks/useObjectURL'
import { formatAddressBreakdown } from '../../../../utils/mapUtils'

function TrackingReportSummary({ temukan, kenali, createdAt }) {
  const [failedFile, setFailedFile] = useState(null)

  const photo = temukan?.photo
  const location = temukan?.location
  const descriptionText = temukan?.description?.text?.trim()
  const categoryKey = kenali?.category || 'plastik'
  const ident = getIdentificationData(categoryKey)
  const formattedDate = formatDateTime(createdAt)

  const activeUrl = useObjectURL(photo?.file)
  const hasError = Boolean(photo?.file && failedFile === photo?.file)

  const { primary: primaryAddress, secondary: secondaryAddress } = formatAddressBreakdown(
    location?.address,
    'Lokasi belum ditentukan'
  )

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs p-5 sm:p-6 flex flex-col gap-4.5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <FileTextIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
          <span className="font-bold text-sm text-stone-900">
            Ringkasan Laporan Temuan
          </span>
        </div>
        {ident.attentionLevel && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 select-none">
            <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span>{ident.attentionLevel}</span>
          </span>
        )}
      </div>

      {/* 1. Photo Evidence with Approved Natural Aspect Ratio */}
      <div className="flex flex-col gap-2">
        {activeUrl && !hasError ? (
          <div className="w-full rounded-xl overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center">
            <img
              src={activeUrl}
              alt="Foto bukti temuan sampah yang dilaporkan"
              onError={() => setFailedFile(photo?.file)}
              className="w-full h-auto block object-contain transition-opacity duration-200"
              style={{ maxHeight: '420px' }}
            />
          </div>
        ) : hasError ? (
          <div className="w-full rounded-xl bg-amber-50/60 border border-amber-200/80 p-5 text-center flex flex-col items-center justify-center gap-1.5">
            <AlertCircleIcon className="w-6 h-6 text-amber-600" />
            <p className="text-xs font-semibold text-stone-700">Pratinjau foto tidak dapat ditampilkan.</p>
          </div>
        ) : (
          <div className="w-full rounded-xl bg-stone-50 border border-dashed border-stone-200 min-h-[160px] flex flex-col items-center justify-center p-4 text-center">
            <CameraIcon className="w-6 h-6 text-stone-300 mb-1.5" strokeWidth={1.5} />
            <p className="text-xs font-medium text-stone-400">Bukti foto tersimpan</p>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-stone-400 font-medium px-0.5">
          <span className="inline-flex items-center gap-1 text-secondary font-bold">
            <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
            Bukti Lapangan
          </span>
          {photo?.fileName && (
            <span className="truncate max-w-[200px]">
              {photo.fileName} {photo.fileSize ? `· ${formatFileSize(photo.fileSize)}` : ''}
            </span>
          )}
        </div>
      </div>

      {/* 2. Identification Details */}
      <div className="pt-3 border-t border-stone-100 flex flex-col gap-1">
        <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-primary">
          Hasil Identifikasi
        </span>
        <h4 className="font-display font-bold text-lg text-stone-900 tracking-tight">
          {kenali?.label || ident.label}
        </h4>
        <p className="text-xs text-stone-500 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
          <span>Kategori: {ident.categoryLabel}</span>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <span>Jenis: {ident.typeLabel}</span>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <span>Material: {ident.materialLabel}</span>
        </p>
      </div>

      {/* 3. Location Details */}
      <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider">
          <MapPinIcon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
          <span>Lokasi Titik Temuan</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-xs sm:text-sm font-bold text-stone-800 leading-snug">
            {primaryAddress}
          </p>
          {secondaryAddress && (
            <p className="text-xs text-stone-500 leading-snug">
              {secondaryAddress}
            </p>
          )}
          {typeof location?.lat === 'number' && typeof location?.lng === 'number' && (
            <p className="text-[11px] font-mono text-stone-400 mt-0.5">
              Koordinat: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
            </p>
          )}
        </div>
      </div>

      {/* 4. Description */}
      <div className="pt-3 border-t border-stone-100 flex flex-col gap-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Deskripsi Temuan
        </span>
        <p className={`text-xs sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere] ${descriptionText ? 'text-stone-700' : 'text-stone-400 italic'}`}>
          {descriptionText ? `"${descriptionText}"` : 'Tidak ada deskripsi tambahan.'}
        </p>
      </div>

      {/* 5. Report Metadata (Date / Status) */}
      {formattedDate && (
        <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-400">
          <ClockIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" strokeWidth={2} />
          <span>Dikirim pada {formattedDate}</span>
        </div>
      )}
    </div>
  )
}

export default TrackingReportSummary
