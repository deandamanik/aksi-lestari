import { useState, useEffect, useRef, useCallback } from 'react'
import {
  XIcon,
  CheckIcon,
  SparklesIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  ShieldCheckIcon,
} from '../../../components/common/Icons'
import { COMMUNITY_CATEGORIES } from '../../../data/komunitas/communityActionsData'

const INITIAL_FORM = {
  title: '',
  category: 'Bersih Lingkungan',
  description: '',
  location: '',
  date: '',
  time: '',
  capacity: '',
  organizer: '',
}

export default function ProposeActionModal({ isOpen, onClose, onSubmitProposal }) {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submissionState, setSubmissionState] = useState('idle') // 'idle' | 'loading' | 'success'
  const loadingTimerRef = useRef(null)

  // Filter out "Semua Aksi" since a proposed activity must belong to a specific environmental category
  const availableCategories = COMMUNITY_CATEGORIES.filter((c) => c !== 'Semua Aksi')

  const handleClose = useCallback(() => {
    if (submissionState === 'loading') return
    onClose()
    if (submissionState === 'success') {
      // Clean form reset after completed submission
      setFormData(INITIAL_FORM)
      setErrors({})
      setSubmissionState('idle')
    }
  }, [onClose, submissionState])

  // Keyboard accessibility and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape' && submissionState !== 'loading') {
        handleClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, submissionState, handleClose])

  // Dedicated unmount cleanup for simulated submission timer
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current)
      }
    }
  }, [])

  if (!isOpen) return null

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Nama kegiatan wajib diisi.'
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Kategori wajib dipilih.'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi kegiatan wajib diisi.'
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi wajib diisi.'
    }
    if (!formData.date.trim()) {
      newErrors.date = 'Tanggal wajib dipilih.'
    }
    if (!formData.time.trim()) {
      newErrors.time = 'Waktu wajib diisi.'
    }
    if (!formData.capacity || String(formData.capacity).trim() === '') {
      newErrors.capacity = 'Perkiraan peserta wajib diisi.'
    } else if (Number(formData.capacity) <= 0) {
      newErrors.capacity = 'Perkiraan peserta harus lebih dari 0.'
    }
    if (!formData.organizer.trim()) {
      newErrors.organizer = 'Nama penyelenggara wajib diisi.'
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first error field for accessibility
      const firstErrorField = Object.keys(validationErrors)[0]
      const element = document.getElementById(`propose-${firstErrorField}`)
      if (element) {
        element.focus()
      }
      return
    }

    // Set simulated loading state
    setSubmissionState('loading')
    loadingTimerRef.current = setTimeout(() => {
      setSubmissionState('success')
      if (onSubmitProposal) {
        onSubmitProposal(formData)
      }
    }, 800)
  }

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="propose-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-border-warm shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-border-warm/60 relative shrink-0">
          {submissionState !== 'loading' && (
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-primary hover:bg-neutral transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
              aria-label="Tutup form pengajuan"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3EC] border border-[#D5E8D8] text-xs font-bold uppercase tracking-wider text-[#22603B] mb-2">
            <SparklesIcon className="w-3.5 h-3.5 text-[#22603B]" />
            <span>Inisiatif Warga</span>
          </div>

          <h2
            id="propose-modal-title"
            className="font-display text-primary text-xl sm:text-2xl font-bold tracking-tight pr-8"
          >
            Ajukan Kegiatan Lingkungan
          </h2>
          <p className="font-body text-stone-600 text-xs sm:text-sm mt-1">
            Gagas aksi nyata di lingkungan RT/RW atau komunitasmu untuk mengajak partisipasi sukarela warga.
          </p>
        </div>

        {/* Modal Body */}
        {submissionState === 'success' ? (
          /* SUCCESS STATE */
          <div className="p-6 sm:p-10 overflow-y-auto text-center flex flex-col items-center justify-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center border-2 border-[#86EFAC] shadow-xs">
              <CheckIcon className="w-8 h-8 text-[#15803D]" strokeWidth={2.5} />
            </div>

            <div className="max-w-md">
              <h3 className="font-display text-primary text-xl sm:text-2xl font-bold tracking-tight mb-2">
                Pengajuan Berhasil
              </h3>
              <p className="font-body text-stone-600 text-sm leading-relaxed">
                Pengajuan kegiatanmu telah berhasil dicatat dan akan melalui proses verifikasi.
              </p>
            </div>

            {/* Proposal Summary Preview Card */}
            <div className="w-full max-w-lg p-4 rounded-2xl bg-[#FAF9F4] border border-border-warm text-left space-y-2.5 text-xs text-stone-700">
              <div className="flex items-center justify-between border-b border-border-warm/60 pb-2">
                <span className="font-bold text-primary text-sm truncate">
                  {formData.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAF3EC] text-[#22603B] font-bold text-[11px] shrink-0">
                  {formData.category}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPinIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
                  <span className="truncate">{formData.location}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
                  <span className="truncate">{formData.date}</span>
                  <span className="text-stone-300">·</span>
                  <ClockIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
                  <span>{formData.time}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
                  <span className="truncate">Oleh: {formData.organizer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UsersIcon className="w-3.5 h-3.5 text-[#22603B] shrink-0" />
                  <span>Kapasitas: {formData.capacity} peserta</span>
                </div>
              </div>
            </div>

            {/* Verification Process Note */}
            <div className="w-full max-w-lg p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-left text-xs text-[#166534] leading-relaxed">
              <strong>Catatan Kurasi:</strong> Tim verifikator AksiLestari akan memeriksa kelengkapan agenda dalam waktu 1x24 jam kerja sebelum aksi dipublikasikan di halaman komunitas.
            </div>

            {/* CTA Return Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center h-11 px-8 rounded-full text-sm font-bold bg-[#22603B] text-white hover:bg-[#17462A] transition-colors shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
              >
                Kembali ke Komunitas
              </button>
            </div>
          </div>
        ) : (
          /* FORM ENTRY STATE */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="p-6 sm:p-7 overflow-y-auto space-y-4.5 flex-1">
              {/* 1. Nama Kegiatan */}
              <div>
                <label
                  htmlFor="propose-title"
                  className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5"
                >
                  Nama Kegiatan <span className="text-red-600">*</span>
                </label>
                <input
                  id="propose-title"
                  type="text"
                  value={formData.title}
                  disabled={submissionState === 'loading'}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Contoh: Bersih Lingkungan RT 05"
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? 'error-propose-title' : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white transition-all font-body ${
                    errors.title
                      ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-border-warm focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/20'
                  }`}
                />
                {errors.title && (
                  <p id="error-propose-title" className="text-xs text-red-600 font-medium mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* 2. Kategori & 3. Penyelenggara */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="propose-category"
                    className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5"
                  >
                    Kategori <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="propose-category"
                    value={formData.category}
                    disabled={submissionState === 'loading'}
                    onChange={(e) => handleChange('category', e.target.value)}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? 'error-propose-category' : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary focus:outline-hidden focus:bg-white cursor-pointer transition-all font-body ${
                      errors.category
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-border-warm focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/20'
                    }`}
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p id="error-propose-category" className="text-xs text-red-600 font-medium mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="propose-organizer"
                    className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5"
                  >
                    Penyelenggara / Komunitas <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="propose-organizer"
                    type="text"
                    value={formData.organizer}
                    disabled={submissionState === 'loading'}
                    onChange={(e) => handleChange('organizer', e.target.value)}
                    placeholder="Contoh: Karang Taruna RW 03"
                    aria-invalid={Boolean(errors.organizer)}
                    aria-describedby={errors.organizer ? 'error-propose-organizer' : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white transition-all font-body ${
                      errors.organizer
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-border-warm focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/20'
                    }`}
                  />
                  {errors.organizer && (
                    <p id="error-propose-organizer" className="text-xs text-red-600 font-medium mt-1">
                      {errors.organizer}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Lokasi */}
              <div>
                <label
                  htmlFor="propose-location"
                  className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5"
                >
                  Lokasi Kegiatan <span className="text-red-600">*</span>
                </label>
                <input
                  id="propose-location"
                  type="text"
                  value={formData.location}
                  disabled={submissionState === 'loading'}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Muara Angke, Penjaringan"
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? 'error-propose-location' : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white transition-all font-body ${
                    errors.location
                      ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-border-warm focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/20'
                  }`}
                />
                {errors.location && (
                  <p id="error-propose-location" className="text-xs text-red-600 font-medium mt-1">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* 5. Tanggal, 6. Waktu & 7. Perkiraan Peserta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="propose-date"
                    className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5"
                  >
                    Tanggal <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="propose-date"
                    type="date"
                    value={formData.date}
                    disabled={submissionState === 'loading'}
                    onChange={(e) => handleChange('date', e.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? 'error-propose-date' : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary focus:outline-hidden focus:bg-white transition-all font-body cursor-pointer ${
                      errors.date
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-border-warm focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/20'
                    }`}
                  />
                  {errors.date && (
                    <p id="error-propose-date" className="text-xs text-red-600 font-medium mt-1">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="propose-time"
                    className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5"
                  >
                    Waktu <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="propose-time"
                    type="time"
                    value={formData.time}
                    disabled={submissionState === 'loading'}
                    onChange={(e) => handleChange('time', e.target.value)}
                    aria-invalid={Boolean(errors.time)}
                    aria-describedby={errors.time ? 'error-propose-time' : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary focus:outline-hidden focus:bg-white transition-all font-body cursor-pointer ${
                      errors.time
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-border-warm focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/20'
                    }`}
                  />
                  {errors.time && (
                    <p id="error-propose-time" className="text-xs text-red-600 font-medium mt-1">
                      {errors.time}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="propose-capacity"
                    className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5"
                  >
                    Perkiraan Peserta <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="propose-capacity"
                    type="number"
                    min="1"
                    max="1000"
                    placeholder="Contoh: 30"
                    value={formData.capacity}
                    disabled={submissionState === 'loading'}
                    onChange={(e) => handleChange('capacity', e.target.value)}
                    aria-invalid={Boolean(errors.capacity)}
                    aria-describedby={errors.capacity ? 'error-propose-capacity' : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white transition-all font-body ${
                      errors.capacity
                        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-border-warm focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/20'
                    }`}
                  />
                  {errors.capacity && (
                    <p id="error-propose-capacity" className="text-xs text-red-600 font-medium mt-1">
                      {errors.capacity}
                    </p>
                  )}
                </div>
              </div>

              {/* 8. Deskripsi Kegiatan */}
              <div>
                <label
                  htmlFor="propose-description"
                  className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5"
                >
                  Deskripsi Kegiatan <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="propose-description"
                  rows={3}
                  value={formData.description}
                  disabled={submissionState === 'loading'}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Jelaskan fokus kegiatan, sasaran pembersihan, dan perlengkapan yang perlu dipersiapkan bersama warga..."
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? 'error-propose-description' : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white resize-none transition-all font-body ${
                    errors.description
                      ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-border-warm focus:border-[#22603B] focus:ring-2 focus:ring-[#22603B]/20'
                  }`}
                />
                {errors.description && (
                  <p id="error-propose-description" className="text-xs text-red-600 font-medium mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-neutral/70 border-t border-border-warm flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={handleClose}
                disabled={submissionState === 'loading'}
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-primary/70 hover:text-primary hover:bg-neutral transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submissionState === 'loading'}
                className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-full text-xs sm:text-sm font-bold bg-[#22603B] text-white hover:bg-[#17462A] shadow-xs transition-all active:scale-98 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
              >
                {submissionState === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mengirim Pengajuan...</span>
                  </>
                ) : (
                  <span>Ajukan Kegiatan</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
