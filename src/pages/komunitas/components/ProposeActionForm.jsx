import { useState } from 'react'

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

/**
 * ProposeActionForm
 * 8-field community proposal entry form with local validation, error focus, and loading submit button.
 *
 * @param {object} props
 * @param {Array<string>} props.availableCategories - Categories selectable for proposal
 * @param {boolean} props.isLoading - Whether proposal is currently being submitted
 * @param {(data: typeof INITIAL_FORM) => void} props.onSubmit - Valid submission callback
 * @param {() => void} props.onCancel - Cancel callback
 */
export default function ProposeActionForm({
  availableCategories,
  isLoading,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

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
      const firstErrorField = Object.keys(validationErrors)[0]
      const element = document.getElementById(`propose-${firstErrorField}`)
      if (element) {
        element.focus()
      }
      return
    }

    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col flex-1 min-h-0 overflow-hidden"
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
            disabled={isLoading}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Contoh: Bersih Lingkungan RT 05"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'error-propose-title' : undefined}
            className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white transition-all font-body ${
              errors.title
                ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-border-warm focus:border-primary focus:ring-2 focus:ring-primary/20'
            }`}
          />
          {errors.title && (
            <p id="error-propose-title" className="text-xs text-red-600 font-medium mt-1 animate-error-slide">
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
              disabled={isLoading}
              onChange={(e) => handleChange('category', e.target.value)}
              aria-invalid={Boolean(errors.category)}
              aria-describedby={errors.category ? 'error-propose-category' : undefined}
              className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary focus:outline-hidden focus:bg-white cursor-pointer transition-all font-body ${
                errors.category
                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-border-warm focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p id="error-propose-category" className="text-xs text-red-600 font-medium mt-1 animate-error-slide">
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
              disabled={isLoading}
              onChange={(e) => handleChange('organizer', e.target.value)}
              placeholder="Contoh: Karang Taruna RW 03"
              aria-invalid={Boolean(errors.organizer)}
              aria-describedby={errors.organizer ? 'error-propose-organizer' : undefined}
              className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white transition-all font-body ${
                errors.organizer
                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-border-warm focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
            />
            {errors.organizer && (
              <p id="error-propose-organizer" className="text-xs text-red-600 font-medium mt-1 animate-error-slide">
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
            disabled={isLoading}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Muara Angke, Penjaringan"
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? 'error-propose-location' : undefined}
            className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white transition-all font-body ${
              errors.location
                ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-border-warm focus:border-primary focus:ring-2 focus:ring-primary/20'
            }`}
          />
          {errors.location && (
            <p id="error-propose-location" className="text-xs text-red-600 font-medium mt-1 animate-error-slide">
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
              disabled={isLoading}
              onChange={(e) => handleChange('date', e.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? 'error-propose-date' : undefined}
              className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary focus:outline-hidden focus:bg-white transition-all font-body cursor-pointer ${
                errors.date
                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-border-warm focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
            />
            {errors.date && (
              <p id="error-propose-date" className="text-xs text-red-600 font-medium mt-1 animate-error-slide">
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
              disabled={isLoading}
              onChange={(e) => handleChange('time', e.target.value)}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? 'error-propose-time' : undefined}
              className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary focus:outline-hidden focus:bg-white transition-all font-body cursor-pointer ${
                errors.time
                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-border-warm focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
            />
            {errors.time && (
              <p id="error-propose-time" className="text-xs text-red-600 font-medium mt-1 animate-error-slide">
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
              disabled={isLoading}
              onChange={(e) => handleChange('capacity', e.target.value)}
              aria-invalid={Boolean(errors.capacity)}
              aria-describedby={errors.capacity ? 'error-propose-capacity' : undefined}
              className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white transition-all font-body ${
                errors.capacity
                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-border-warm focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
            />
            {errors.capacity && (
              <p id="error-propose-capacity" className="text-xs text-red-600 font-medium mt-1 animate-error-slide">
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
            disabled={isLoading}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Jelaskan fokus kegiatan, sasaran pembersihan, dan perlengkapan yang perlu dipersiapkan bersama warga..."
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'error-propose-description' : undefined}
            className={`w-full px-4 py-2.5 rounded-xl bg-neutral border text-sm text-primary placeholder:text-stone-400 focus:outline-hidden focus:bg-white resize-none transition-all font-body ${
              errors.description
                ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-border-warm focus:border-primary focus:ring-2 focus:ring-primary/20'
            }`}
          />
          {errors.description && (
            <p id="error-propose-description" className="text-xs text-red-600 font-medium mt-1 animate-error-slide">
              {errors.description}
            </p>
          )}
        </div>
      </div>

      {/* Modal Footer (Consistent rounded-full, font-body, matching ActionDetailModal) */}
      <div className="px-5 sm:px-8 py-3.5 sm:py-4 bg-neutral border-t border-border-warm/70 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white hover:bg-stone-50 border border-border-warm text-stone-700 hover:text-primary text-xs sm:text-sm font-body font-semibold transition-all duration-180 active:scale-[0.98] cursor-pointer shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-1.5 h-10 px-6 rounded-full bg-primary text-white hover:bg-primary/90 text-xs sm:text-sm font-body font-semibold transition-all duration-180 active:scale-[0.98] cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Mengirim Pengajuan...' : 'Ajukan Kegiatan'}
        </button>
      </div>
    </form>
  )
}
