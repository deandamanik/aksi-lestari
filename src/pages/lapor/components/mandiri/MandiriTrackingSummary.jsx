import { useState, useEffect } from 'react'
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

function formatFileSize(bytes) {
  if (!bytes) return ''
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function formatReportDate(timestamp) {
  if (!timestamp) return null
  try {
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(timestamp))
  } catch {
    return null
  }
}

function MandiriTrackingSummary({ temukan, kenali, mandiri }) {
  const [beforeUrl, setBeforeUrl] = useState(null)
  const [afterUrl, setAfterUrl] = useState(null)
  const [failedBefore, setFailedBefore] = useState(null)
  const [failedAfter, setFailedAfter] = useState(null)

  const beforePhoto = temukan?.photo
  const afterPhoto = mandiri?.afterPhoto
  const location = temukan?.location
  const categoryKey = kenali?.category || 'plastik'
  const ident = getIdentificationData(categoryKey)
  const formattedDate = formatReportDate(mandiri?.submittedAt)

  useEffect(() => {
    if (!beforePhoto?.file) return
    const url = URL.createObjectURL(beforePhoto.file)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronizing temporary DOM Blob URL with File object lifecycle
    setBeforeUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [beforePhoto?.file])

  useEffect(() => {
    if (!afterPhoto?.file) return
    const url = URL.createObjectURL(afterPhoto.file)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronizing temporary DOM Blob URL with File object lifecycle
    setAfterUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [afterPhoto?.file])

  const activeBeforeUrl = beforePhoto?.file ? beforeUrl : null
  const activeAfterUrl = afterPhoto?.file ? afterUrl : null
  const hasBeforeError = Boolean(beforePhoto?.file && failedBefore === beforePhoto?.file)
  const hasAfterError = Boolean(afterPhoto?.file && failedAfter === afterPhoto?.file)

  const parts = location?.address ? location.address.split(',').map((p) => p.trim()) : []
  const primaryAddress = parts.slice(0, 2).join(', ') || location?.address || 'Lokasi belum ditentukan'
  const secondaryAddress = parts.slice(2, 4).join(', ')

  return (
    <div className="rounded-2xl bg-white border border-[#E8E5DC] shadow-xs p-5 sm:p-6 flex flex-col gap-4.5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-2">
          <FileTextIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2} />
          <span className="font-bold text-sm text-stone-900">
            Ringkasan Aksi Mandiri
          </span>
        </div>
        {ident.attentionLevel && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 select-none">
            <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span>{ident.attentionLevel}</span>
          </span>
        )}
      </div>

      {/* 1. Identification Details */}
      <div className="flex flex-col gap-1">
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

      {/* 2. Action Location */}
      <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider">
          <MapPinIcon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
          <span>Lokasi Tindakan</span>
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

      {/* 3. Dokumentasi Aksi — Side-by-side Before & After Evidence */}
      <div className="pt-3 border-t border-stone-100 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider">
          <CameraIcon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
          <span>Dokumentasi Aksi</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Before Photo */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 px-0.5">
              <span>Foto Sebelum</span>
              <span className="text-stone-400 font-normal text-[10px]">Awal</span>
            </div>

            <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center p-1.5">
              {activeBeforeUrl && !hasBeforeError ? (
                <img
                  src={activeBeforeUrl}
                  alt="Foto kondisi sampah sebelum penanganan"
                  onError={() => setFailedBefore(beforePhoto?.file)}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg"
                />
              ) : hasBeforeError ? (
                <div className="p-2 text-center flex flex-col items-center gap-1">
                  <AlertCircleIcon className="w-5 h-5 text-amber-600" />
                  <span className="text-[10px] text-stone-500">Gagal memuat</span>
                </div>
              ) : (
                <div className="p-2 text-center flex flex-col items-center gap-1 text-stone-400">
                  <CameraIcon className="w-5 h-5 text-stone-300" strokeWidth={1.5} />
                  <span className="text-[10px]">Tidak ada foto</span>
                </div>
              )}
            </div>

            {beforePhoto?.fileName && (
              <p className="text-[10px] text-stone-400 font-medium truncate px-0.5">
                {beforePhoto.fileName} {beforePhoto.fileSize ? `· ${formatFileSize(beforePhoto.fileSize)}` : ''}
              </p>
            )}
          </div>

          {/* After Photo */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 px-0.5">
              <span>Foto Setelah</span>
              <span className="inline-flex items-center gap-0.5 text-secondary font-bold text-[10px]">
                <CheckIcon className="w-3 h-3" strokeWidth={2.5} />
                Bukti
              </span>
            </div>

            <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center p-1.5">
              {activeAfterUrl && !hasAfterError ? (
                <img
                  src={activeAfterUrl}
                  alt="Foto kondisi setelah sampah ditangani"
                  onError={() => setFailedAfter(afterPhoto?.file)}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg"
                />
              ) : hasAfterError ? (
                <div className="p-2 text-center flex flex-col items-center gap-1">
                  <AlertCircleIcon className="w-5 h-5 text-amber-600" />
                  <span className="text-[10px] text-stone-500">Gagal memuat</span>
                </div>
              ) : (
                <div className="p-2 text-center flex flex-col items-center gap-1 text-stone-400">
                  <CameraIcon className="w-5 h-5 text-stone-300" strokeWidth={1.5} />
                  <span className="text-[10px]">Tidak ada foto</span>
                </div>
              )}
            </div>

            {afterPhoto?.fileName && (
              <p className="text-[10px] text-stone-400 font-medium truncate px-0.5">
                {afterPhoto.fileName} {afterPhoto.fileSize ? `· ${formatFileSize(afterPhoto.fileSize)}` : ''}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Submitted Timestamp */}
      {formattedDate && (
        <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-400">
          <ClockIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" strokeWidth={2} />
          <span>Dikirim pada {formattedDate}</span>
        </div>
      )}
    </div>
  )
}

export default MandiriTrackingSummary
