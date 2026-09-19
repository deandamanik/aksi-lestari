import { useState, useEffect } from 'react'
import { CameraIcon, CheckIcon, AlertCircleIcon } from '../../../../components/common/Icons'

function formatFileSize(bytes) {
  if (!bytes) return ''
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * EvidenceSummaryCard — Step 02 Photo Evidence Card
 *
 * Strictly adheres to the Step 01 (LaporTemukanPage) photo treatment:
 * - Natural uncropped aspect ratio
 * - Same card structure, border, and padding
 * - No dark image overlays
 * - Metadata positioned underneath the photo
 * - Read-oriented with local object URL lifecycle management
 */
function EvidenceSummaryCard({ photo }) {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [failedFile, setFailedFile] = useState(null)
  const hasError = Boolean(photo?.file && failedFile === photo?.file)

  useEffect(() => {
    if (!photo?.file) return

    const url = URL.createObjectURL(photo.file)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronizing temporary DOM Blob URL with File object lifecycle
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [photo?.file])

  const activeUrl = photo?.file ? previewUrl : null

  return (
    <div className="rounded-2xl bg-white border border-[#E8E5DC] shadow-xs overflow-hidden">
      {/* Header */}
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

      <div className="p-3 sm:p-4">
        {activeUrl && !hasError ? (
          <div className="w-full rounded-xl overflow-hidden bg-stone-50 border border-stone-100 flex items-center justify-center">
            <img
              src={activeUrl}
              alt="Foto bukti temuan sampah"
              onError={() => setFailedFile(photo?.file)}
              className="w-full h-auto block object-contain transition-opacity duration-200"
              style={{ maxHeight: '720px' }}
            />
          </div>
        ) : hasError ? (
          <div className="w-full rounded-xl bg-amber-50/60 border border-amber-200/80 p-6 text-center flex flex-col items-center justify-center gap-2">
            <AlertCircleIcon className="w-8 h-8 text-amber-600" />
            <p className="text-sm font-semibold text-stone-700">Pratinjau foto tidak dapat ditampilkan.</p>
            <p className="text-xs text-stone-400 max-w-xs">Format file mungkin tidak didukung oleh browser Anda.</p>
          </div>
        ) : (
          <div className="w-full rounded-xl bg-stone-50 border border-dashed border-stone-200 min-h-[220px] flex flex-col items-center justify-center p-6 text-center">
            <CameraIcon className="w-8 h-8 text-stone-300 mb-2" strokeWidth={1.5} />
            <p className="text-sm font-medium text-stone-400">Belum ada foto dipilih</p>
          </div>
        )}

        <div className="mt-3.5 space-y-1">
          <p className="text-xs text-stone-500 leading-relaxed">
            Foto ini menjadi rujukan identifikasi karakter material serta landasan rekomendasi penanganan di lapangan.
          </p>
          {photo?.fileName && (
            <p className="text-[11px] text-stone-400 font-medium truncate">
              {photo.fileName} {photo.fileSize ? `· ${formatFileSize(photo.fileSize)}` : ''}
            </p>
          )}
        </div>

        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <span className="text-[11px] text-stone-400 font-medium">Foto bukti tersimpan</span>
        </div>
      </div>
    </div>
  )
}

export default EvidenceSummaryCard
