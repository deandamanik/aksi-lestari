import { useState, useRef, useEffect, useCallback } from 'react'
import {
  CameraIcon,
  UploadIcon,
  CheckIcon,
  RefreshCwIcon,
  AlertCircleIcon,
} from '../../../../components/common/Icons'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

function formatFileSize(bytes) {
  if (!bytes) return ''
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(1))
  return `${formatted} ${sizes[i]}`
}

function MandiriPhotoAfterCard({ photo, onPhotoSelect }) {
  const [isDragging, setIsDragging] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [failedFile, setFailedFile] = useState(null)

  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

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
  const hasError = Boolean(photo?.file && failedFile === photo?.file)
  const hasPhoto = Boolean(activeUrl && !hasError)

  const validateAndProcessFile = useCallback(
    (file) => {
      setErrorMessage('')

      if (!file) return

      const isMimeValid = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())
      const isExtValid = ALLOWED_EXTENSIONS.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      )

      if (!isMimeValid && !isExtValid) {
        setErrorMessage('Format file belum didukung. Gunakan format JPG, PNG, atau WebP.')
        return
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage('Ukuran foto maksimal 10 MB.')
        return
      }

      onPhotoSelect(file)
    },
    [onPhotoSelect]
  )

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndProcessFile(file)
    }
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget.contains(e.relatedTarget)) return
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      validateAndProcessFile(files[0])
    }
  }

  const handleTriggerCamera = () => {
    cameraInputRef.current?.click()
  }

  const handleTriggerUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      {/* Hidden Native File & Camera Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="sr-only"
        tabIndex={-1}
        onChange={handleFileInputChange}
        aria-label="Ambil foto setelah menggunakan kamera"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        tabIndex={-1}
        onChange={handleFileInputChange}
        aria-label="Pilih foto setelah dari perangkat"
      />

      {/* Main Upload Container — matches /lapor visual pattern */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full rounded-3xl bg-white transition-colors duration-200 ${
          isDragging
            ? 'border-2 border-dashed border-primary bg-primary/[0.02] shadow-[0_8px_30px_rgba(34,96,59,0.08)]'
            : 'border-2 border-dashed border-stone-300 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.02)]'
        } ${hasPhoto ? 'p-5 sm:p-6' : 'p-8 sm:p-10 lg:p-12'}`}
      >
        {!hasPhoto ? (
          /* Empty / Upload State: Camera Icon, Heading, Helper, Buttons, Metadata */
          <div className="flex flex-col items-center justify-center text-center">
            {/* Camera Icon Container */}
            <div
              className="w-16 h-16 rounded-2xl bg-stone-100/80 border border-stone-200/70 flex items-center justify-center text-primary mb-5"
              aria-hidden="true"
            >
              <CameraIcon className="w-8 h-8" strokeWidth={1.75} />
            </div>

            {/* Heading & Helper */}
            <h3 className="font-bold text-xl sm:text-2xl text-stone-900 tracking-tight">
              {isDragging ? 'Letakkan Foto di Sini' : 'Ambil Foto Setelah'}
            </h3>
            <p className="text-sm sm:text-base text-stone-500 max-w-md mt-1.5 leading-relaxed">
              {isDragging
                ? 'Lepaskan file foto untuk memulai pratinjau.'
                : 'Ambil foto kondisi setelah penanganan untuk menunjukkan hasil tindakanmu.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 mt-6 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleTriggerCamera}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-primary hover:bg-[#1A4B2E] text-white font-semibold text-sm transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Ambil Foto Setelah menggunakan kamera"
              >
                <CameraIcon className="w-4.5 h-4.5" strokeWidth={2} />
                <span>Ambil Foto</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerUpload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-semibold text-sm transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Pilih foto setelah dari perangkat"
              >
                <UploadIcon className="w-4.5 h-4.5 text-stone-600" strokeWidth={2} />
                <span>Pilih dari Perangkat</span>
              </button>
            </div>

            {/* Format & Size Metadata */}
            <p className="text-xs text-stone-400 font-medium mt-5 tracking-wide">
              JPG / PNG · Maksimal 10 MB
            </p>
          </div>
        ) : (
          /* Preview State: Proportional Image, Divider, Terekam status, Metadata, Ganti Foto */
          <div className="flex flex-col">
            {/* Inner Image Container — constrained, proportional, uncropped */}
            <div className="w-full relative rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-50/70 h-64 sm:h-76 flex items-center justify-center p-2 shadow-xs">
              <img
                src={activeUrl}
                alt="Pratinjau foto setelah penanganan"
                onError={() => setFailedFile(photo?.file)}
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl select-none"
              />
            </div>

            {/* Status & Metadata & Change Action Row */}
            <div className="mt-4 pt-3.5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-secondary select-none">
                  <CheckIcon className="w-4 h-4 text-secondary shrink-0" strokeWidth={2.5} />
                  <span>Terekam</span>
                </div>
                {photo?.fileName && (
                  <p className="text-xs text-stone-500 font-medium truncate mt-0.5 max-w-sm sm:max-w-md">
                    {photo.fileName} {photo.fileSize ? `· ${formatFileSize(photo.fileSize)}` : ''}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleTriggerUpload}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary cursor-pointer shrink-0 self-start sm:self-auto"
                aria-label="Ganti foto setelah"
              >
                <RefreshCwIcon className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Ganti Foto</span>
              </button>
            </div>
          </div>
        )}

        {/* Inline Error Message */}
        {errorMessage && (
          <div
            role="alert"
            className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 border border-red-200/80 text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <AlertCircleIcon className="w-4.5 h-4.5 shrink-0 text-red-500" strokeWidth={2} />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MandiriPhotoAfterCard
