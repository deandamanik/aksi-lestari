import { useState, useRef, useCallback } from 'react'
import {
  CameraIcon,
  UploadIcon,
  CheckIcon,
  RefreshCwIcon,
  AlertCircleIcon,
} from '../../../components/common/Icons'
import { formatFileSize } from '../../../utils/formatters'
import { useObjectURL } from '../../../hooks/useObjectURL'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

const SIZE_CONFIGS = {
  compact: {
    previewHeight: 'h-48 sm:h-56',
    emptyPadding: 'p-6 sm:p-8',
    previewPadding: 'p-3.5 sm:p-4',
    cardRadius: 'rounded-2xl',
  },
  default: {
    previewHeight: 'h-64 sm:h-76',
    emptyPadding: 'p-8 sm:p-10 lg:p-12',
    previewPadding: 'p-5 sm:p-6',
    cardRadius: 'rounded-3xl',
  },
  large: {
    previewHeight: 'h-72 sm:h-88',
    emptyPadding: 'p-10 sm:p-12 lg:p-16',
    previewPadding: 'p-6 sm:p-8',
    cardRadius: 'rounded-3xl',
  },
}

/**
 * PhotoUploadCard — Single unified photo upload and preview component for Lapor and Mandiri workflows.
 *
 * Supports:
 * - Empty state with drag-and-drop, camera trigger, and device file picker
 * - Proportional uncropped preview with status feedback, metadata, and replacement action
 * - Size variations (compact, default, large)
 * - Safe local object URL lifecycle management via useObjectURL hook
 */
function PhotoUploadCard({
  value = null,
  onChange,
  onReplace,
  title = 'Ambil atau Unggah Foto',
  helperText = 'Pastikan kondisi sampah terlihat jelas dan dapat diidentifikasi.',
  statusText = 'Foto berhasil ditambahkan',
  size = 'default',
  borderStyle = 'dashed',
  readOnly = false,
  className = '',
}) {
  const activeFile = value instanceof File ? value : null
  const activeFileName = activeFile?.name || ''
  const activeFileSize = activeFile?.size || 0

  const [isDragging, setIsDragging] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [failedFile, setFailedFile] = useState(null)

  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const activeUrl = useObjectURL(activeFile)
  const hasError = Boolean(activeFile && failedFile === activeFile)
  const hasPhoto = Boolean(activeUrl && !hasError)

  const validateAndProcessFile = useCallback(
    (newFile) => {
      setErrorMessage('')

      if (!newFile) return

      const isMimeValid = ALLOWED_MIME_TYPES.includes(newFile.type.toLowerCase())
      const isExtValid = ALLOWED_EXTENSIONS.some((ext) =>
        newFile.name.toLowerCase().endsWith(ext)
      )

      if (!isMimeValid && !isExtValid) {
        setErrorMessage('Format file belum didukung. Gunakan format JPG, PNG, atau WebP.')
        return
      }

      if (newFile.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage('Ukuran foto maksimal 10 MB.')
        return
      }

      if (onChange) {
        onChange(newFile)
      }
    },
    [onChange]
  )

  const handleFileInputChange = (e) => {
    const pickedFile = e.target.files?.[0]
    if (pickedFile) {
      validateAndProcessFile(pickedFile)
    }
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    if (readOnly) return
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragEnter = (e) => {
    if (readOnly) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    if (readOnly) return
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget.contains(e.relatedTarget)) return
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    if (readOnly) return
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
    if (onReplace) {
      onReplace()
    } else {
      fileInputRef.current?.click()
    }
  }

  const sizeStyles = SIZE_CONFIGS[size] || SIZE_CONFIGS.default
  const canChange = Boolean(onReplace || (!readOnly && onChange))

  const borderClasses = isDragging
    ? 'border-2 border-dashed border-primary bg-primary/[0.02] shadow-[0_8px_30px_rgba(34,96,59,0.08)]'
    : borderStyle === 'solid'
      ? 'border border-border-warm shadow-xs'
      : 'border-2 border-dashed border-stone-300 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.02)]'

  return (
    <div className={`w-full self-start ${className}`.trim()}>
      {/* Hidden Native File & Camera Inputs (when not readOnly) */}
      {!readOnly && (
        <>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="sr-only"
            tabIndex={-1}
            onChange={handleFileInputChange}
            aria-label="Ambil foto menggunakan kamera"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            tabIndex={-1}
            onChange={handleFileInputChange}
            aria-label="Pilih foto dari perangkat"
          />
        </>
      )}

      {/* Main Upload / Preview Container */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full ${sizeStyles.cardRadius} bg-white transition-colors duration-200 ${borderClasses} ${
          hasPhoto ? sizeStyles.previewPadding : sizeStyles.emptyPadding
        }`}
      >
        {!hasPhoto && !hasError ? (
          /* Empty / Upload State */
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
              {isDragging ? 'Letakkan Foto di Sini' : title}
            </h3>
            <p className="text-sm sm:text-base text-stone-500 max-w-md mt-1.5 leading-relaxed">
              {isDragging ? 'Lepaskan file foto untuk memulai pratinjau.' : helperText}
            </p>

            {/* Action Buttons */}
            {!readOnly && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 mt-6 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleTriggerCamera}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none"
                  aria-label="Ambil Foto"
                >
                  <CameraIcon className="w-4.5 h-4.5" strokeWidth={2} />
                  <span>Ambil Foto</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-semibold text-sm transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none"
                  aria-label="Pilih dari Perangkat"
                >
                  <UploadIcon className="w-4.5 h-4.5 text-stone-600" strokeWidth={2} />
                  <span>Pilih dari Perangkat</span>
                </button>
              </div>
            )}

            {/* Format & Size Metadata */}
            <p className="text-xs text-stone-400 font-medium mt-5 tracking-wide">
              JPG / PNG · Maksimal 10 MB
            </p>
          </div>
        ) : hasError ? (
          /* Error State when image rendering fails */
          <div className="flex flex-col items-center justify-center text-center p-6 bg-amber-50/60 rounded-2xl border border-amber-200/80">
            <AlertCircleIcon className="w-8 h-8 text-amber-600 mb-2" strokeWidth={2} />
            <p className="text-sm font-semibold text-stone-700">Pratinjau foto tidak dapat ditampilkan.</p>
            <p className="text-xs text-stone-400 max-w-xs mt-1">Format file mungkin tidak didukung oleh browser Anda.</p>
            {canChange && (
              <button
                type="button"
                onClick={handleTriggerUpload}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
              >
                Ganti Foto
              </button>
            )}
          </div>
        ) : (
          /* Preview State: Proportional Image, Divider, Status, Ganti Foto, Metadata */
          <div className="flex flex-col">
            {/* Inner Image Container — constrained, proportional, uncropped */}
            <div
              className={`w-full relative rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-50/70 flex items-center justify-center p-2 shadow-xs ${sizeStyles.previewHeight}`}
            >
              <img
                src={activeUrl}
                alt="Pratinjau foto"
                onError={() => setFailedFile(activeFile)}
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl select-none"
              />
            </div>

            {/* Status & Metadata & Change Action Stack */}
            <div className="mt-4 pt-3.5 border-t border-stone-100 flex flex-col gap-1">
              {/* Row 1: Left = Status Text, Right = Ganti Foto */}
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-secondary select-none">
                  <CheckIcon className="w-4 h-4 text-secondary shrink-0" strokeWidth={2.5} />
                  <span>{statusText}</span>
                </div>

                {canChange && (
                  <button
                    type="button"
                    onClick={handleTriggerUpload}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary cursor-pointer shrink-0 select-none"
                    aria-label="Ganti foto"
                  >
                    <RefreshCwIcon className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>Ganti Foto</span>
                  </button>
                )}
              </div>

              {/* Row 2: Filename + Size directly below */}
              {activeFileName && (
                <p className="text-xs text-stone-500 font-medium truncate max-w-sm sm:max-w-md">
                  {activeFileName} {activeFileSize ? `· ${formatFileSize(activeFileSize)}` : ''}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Inline Error Message (validation issues) */}
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

export default PhotoUploadCard
