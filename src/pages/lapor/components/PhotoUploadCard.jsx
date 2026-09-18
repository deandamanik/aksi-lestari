import { useState, useRef, useEffect, useCallback } from 'react'
import {
  CameraIcon,
  UploadIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  RefreshCwIcon,
} from '../../../components/common/Icons'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(1))
  return `${formatted} ${sizes[i]}`
}

function PhotoUploadCard({ selectedFile, onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)

  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  useEffect(() => {
    if (!selectedFile) return

    const url = URL.createObjectURL(selectedFile)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronizing temporary DOM Blob URL with File object lifecycle
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [selectedFile])

  const activeUrl = selectedFile ? previewUrl : null


  const validateAndProcessFile = useCallback(
    (file) => {
      setErrorMessage('')

      if (!file) return

      // Validate file type
      const isMimeValid = ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())
      const isExtValid = ALLOWED_EXTENSIONS.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      )

      if (!isMimeValid && !isExtValid) {
        setErrorMessage('Format file belum didukung. Gunakan format JPG, PNG, atau WebP.')
        return
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage('Ukuran foto maksimal 10 MB.')
        return
      }

      onFileSelect(file)
    },
    [onFileSelect]
  )

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndProcessFile(file)
    }
    // Reset inputs so user can pick same file again if desired
    e.target.value = ''
  }

  // Drag and Drop handlers
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
    // Only set to false if leaving the currentTarget boundary
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
    <div className="w-full max-w-[680px] mx-auto">
      {/* Hidden File Inputs */}
      {/* 1. Camera Input (with capture="environment" for rear camera on mobile) */}
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

      {/* 2. Device File Input (standard file picker) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        tabIndex={-1}
        onChange={handleFileInputChange}
        aria-label="Unggah foto dari perangkat"
      />

      {/* Main Upload Container */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full rounded-3xl bg-white transition-colors duration-200 ${
          isDragging
            ? 'border-2 border-dashed border-primary bg-primary/[0.02] shadow-[0_8px_30px_rgba(34,96,59,0.08)]'
            : 'border-2 border-dashed border-stone-300 hover:border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.02)]'
        } ${selectedFile ? 'p-5 sm:p-6' : 'p-8 sm:p-10 lg:p-12'}`}
      >
        {!selectedFile ? (
          /* Default State: Camera Icon, Heading, Buttons, Size Info */
          <div className="flex flex-col items-center justify-center text-center">
            {/* Camera Icon Container */}
            <div
              className="w-16 h-16 rounded-2xl bg-stone-100/80 border border-stone-200/70 flex items-center justify-center text-primary mb-5"
              aria-hidden="true"
            >
              <CameraIcon className="w-8 h-8" strokeWidth={1.75} />
            </div>

            {/* Heading & Subtext */}
            <h2 className="font-bold text-xl sm:text-2xl text-primary tracking-tight">
              {isDragging ? 'Letakkan Foto di Sini' : 'Ambil atau Unggah Foto'}
            </h2>
            <p className="text-sm sm:text-base text-stone-500 max-w-md mt-1.5 leading-relaxed">
              {isDragging
                ? 'Lepaskan file foto untuk memulai pratinjau'
                : 'Pastikan kondisi sampah terlihat jelas dan dapat diidentifikasi.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 mt-6 w-full sm:w-auto">
              {/* Button 1: Ambil Foto */}
              <button
                type="button"
                onClick={handleTriggerCamera}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-primary hover:bg-[#1A4B2E] text-white font-semibold text-sm transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Ambil Foto temuan sampah"
              >
                <CameraIcon className="w-4.5 h-4.5" strokeWidth={2} />
                <span>Ambil Foto</span>
              </button>

              {/* Button 2: Unggah dari Perangkat */}
              <button
                type="button"
                onClick={handleTriggerUpload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-semibold text-sm transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Unggah foto dari perangkat"
              >
                <UploadIcon className="w-4.5 h-4.5 text-stone-600" strokeWidth={2} />
                <span>Unggah dari Perangkat</span>
              </button>
            </div>

            {/* Format & Size Metadata */}
            <p className="text-xs text-stone-400 font-medium mt-5 tracking-wide">
              JPG / PNG · Maksimal 10 MB
            </p>
          </div>
        ) : (
          /* Preview State: Image Preview, Success Badge, File info, Ganti Foto */
          <div className="flex flex-col items-center justify-center text-center">
            {/* Visual Image Preview (Preserves complete uncropped aspect ratio) */}
            <div className="w-full relative rounded-2xl overflow-hidden border border-border-warm/80 bg-stone-50/70 h-64 sm:h-72 flex items-center justify-center p-2 shadow-xs lapor-preview-enter">
              <img
                src={activeUrl}
                alt="Pratinjau foto temuan sampah"
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl select-none"
              />
            </div>

            {/* Verification Status & Metadata */}
            <div className="mt-5 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 text-primary font-bold text-sm sm:text-base">
                <CheckCircle2Icon className="w-5 h-5 text-secondary shrink-0" strokeWidth={2.25} />
                <span>Foto berhasil ditambahkan</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium truncate max-w-sm sm:max-w-md">
                {selectedFile.name} · {formatFileSize(selectedFile.size)}
              </p>

              {/* Action: Ganti Foto */}
              <button
                type="button"
                onClick={handleTriggerUpload}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label="Ganti foto temuan dengan foto lain"
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
            className="mt-4 p-3 rounded-xl bg-error-bg text-error-text border border-error-text/20 text-xs sm:text-sm flex items-center justify-center gap-2 animate-in fade-in duration-200"
          >
            <AlertCircleIcon className="w-4.5 h-4.5 shrink-0" strokeWidth={2} />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoUploadCard
