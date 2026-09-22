import { useState, useRef } from 'react'
import {
  CameraIcon,
  UploadCloudIcon,
  SearchIcon,
  InfoIcon,
  TrashIcon,
  RefreshCwIcon,
} from '../../../components/common/Icons'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

function ScanUploadSection({
  selectedImage,
  setSelectedImage,
  onIdentify,
  isIdentifying,
  onBackToHub,
}) {
  const [dragActive, setDragActive] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [imageMeta, setImageMeta] = useState(null)

  const cameraInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleValidateAndSetFile = (file) => {
    setErrorMessage(null)

    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage('Format berkas tidak valid. Harap gunakan format JPG, PNG, atau WEBP.')
      return
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage('Ukuran gambar melebihi batas 10 MB. Harap pilih gambar yang lebih kecil.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target.result)
      setImageMeta({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      })
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleValidateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleValidateAndSetFile(e.target.files[0])
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImageMeta(null)
    setErrorMessage(null)
    if (cameraInputRef.current) cameraInputRef.current.value = ''
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <section className="w-full pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Back Link to Hub */}
        <button
          type="button"
          onClick={onBackToHub}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary/80 hover:text-primary mb-6 transition-colors cursor-pointer group"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          <span>Kembali ke Aksipedia Hub</span>
        </button>

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs font-bold tracking-wider uppercase text-secondary block mb-2 select-none">
            SCAN SAMPAH
          </span>
          <h1 className="font-display font-bold text-primary text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3">
            Kenali Sampah yang Kamu Temukan
          </h1>
          <p className="font-body text-primary/75 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Ambil atau unggah foto sampah untuk membantu mengenali jenis dan materialnya.
          </p>
        </div>

        {/* Hidden File Inputs */}
        {/* Camera input with capture="environment" for mobile */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          id="camera-capture-input"
        />

        {/* General file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          id="device-upload-input"
        />

        {/* Main Upload Box Area (Dashed Border) */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative bg-white rounded-3xl border-2 border-dashed transition-all duration-200 p-6 sm:p-10 text-center shadow-xs ${
            dragActive
              ? 'border-secondary bg-secondary/5 scale-[1.01]'
              : 'border-stone-300 hover:border-primary/40'
          }`}
        >
          {!selectedImage ? (
            /* Empty State: Prompt to Upload */
            <div className="flex flex-col items-center justify-center py-4 sm:py-6">
              {/* Camera Icon in Soft Rounded Box */}
              <div className="w-16 h-16 rounded-2xl bg-[#F4F6F0] border border-primary/15 flex items-center justify-center mb-4 select-none">
                <CameraIcon className="w-8 h-8 text-primary" strokeWidth={1.8} />
              </div>

              {/* Title & Helper */}
              <h2 className="font-display font-bold text-primary text-lg sm:text-xl mb-1.5">
                Ambil atau Unggah Foto
              </h2>
              <p className="font-body text-stone-500 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                Pastikan kondisi sampah terlihat jelas dan dapat diidentifikasi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center mb-4">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <CameraIcon className="w-4 h-4 text-white" />
                  <span>Ambil Foto</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-primary text-sm font-semibold border border-stone-300 hover:bg-stone-50 active:scale-[0.98] transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <UploadCloudIcon className="w-4 h-4 text-primary" />
                  <span>Unggah dari Perangkat</span>
                </button>
              </div>

              {/* Format & Size limitation */}
              <span className="text-[11px] sm:text-xs text-stone-400 select-none">
                JPG / PNG · Maksimal 10 MB
              </span>
            </div>
          ) : (
            /* Selected Image Preview State */
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative max-w-md w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-border-warm bg-stone-100 mb-4">
                <img
                  src={selectedImage}
                  alt="Pratinjau foto sampah yang dipilih"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold select-none">
                  Foto Siap Diidentifikasi
                </div>
              </div>

              {imageMeta && (
                <div className="flex items-center gap-3 text-xs text-stone-600 mb-4 select-none">
                  <span className="font-semibold text-primary truncate max-w-[200px]">
                    {imageMeta.name}
                  </span>
                  <span>•</span>
                  <span>{imageMeta.size}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RefreshCwIcon className="w-3.5 h-3.5" />
                  <span>Ganti Foto</span>
                </button>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                  <span>Hapus Foto</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Notification Alert */}
        {errorMessage && (
          <div
            className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5"
            role="alert"
          >
            <InfoIcon className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Helper text below upload card */}
        <div className="flex items-start sm:items-center justify-center gap-2 mt-4 text-xs text-stone-500 text-center">
          <InfoIcon className="w-4 h-4 text-stone-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            Foto lebih mudah diidentifikasi jika objek sampah terlihat utuh, terang, dan tidak tertutup benda lain.
          </span>
        </div>

        {/* Identify CTA Button Container */}
        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            disabled={!selectedImage || isIdentifying}
            onClick={onIdentify}
            className={`inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full text-sm sm:text-base font-bold transition-all duration-200 shadow-xs select-none ${
              !selectedImage || isIdentifying
                ? 'bg-[#E5E2D9] text-stone-400 cursor-not-allowed border border-stone-300/50'
                : 'bg-primary text-white hover:bg-primary/90 active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary shadow-sm'
            }`}
          >
            {isIdentifying ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-stone-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Mengidentifikasi Material...</span>
              </>
            ) : (
              <>
                <SearchIcon className="w-4 h-4" />
                <span>Identifikasi Sampah</span>
              </>
            )}
          </button>

          {/* Subtext under disabled button */}
          {!selectedImage && !isIdentifying && (
            <p className="font-body text-xs text-stone-400 mt-2.5 select-none">
              Unggah atau ambil foto terlebih dahulu untuk melanjutkan.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ScanUploadSection
