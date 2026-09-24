import { useState, useRef, useEffect } from 'react'
import { CameraIcon, CheckIcon } from '../../../components/common/Icons'

function PengaturanInformasiAkun({ profile, onSaveProfile }) {
  const [formData, setFormData] = useState({
    name: profile.name || 'Invention 2026',
    email: profile.email || 'deann@aksilestari.id',
    phone: profile.phone || '0812-3456-7890',
    bio: profile.bio || 'Terus bergerak dan bangun kebiasaan baik untuk kelestarian lingkungan sekitar.',
  })
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const fileInputRef = useRef(null)
  const saveTimerRef = useRef(null)
  const successTimerRef = useRef(null)

  // Clean up any pending timers on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      if (successTimerRef.current) clearTimeout(successTimerRef.current)
    }
  }, [])

  const isDirty =
    formData.name !== profile.name ||
    formData.email !== profile.email ||
    formData.phone !== profile.phone ||
    formData.bio !== profile.bio ||
    avatarPreview !== null

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSaveSuccess(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result)
        setSaveSuccess(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    setIsSaving(true)
    setSaveSuccess(false)

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    if (successTimerRef.current) clearTimeout(successTimerRef.current)

    // Simulate save flow with unmount safety
    saveTimerRef.current = setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      onSaveProfile(formData)
      successTimerRef.current = setTimeout(() => setSaveSuccess(false), 3500)
    }, 600)
  }

  return (
    <section
      id="informasi"
      aria-labelledby="heading-informasi-akun"
      className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 flex flex-col gap-6 shadow-2xs"
    >
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b border-border-warm/80 pb-5">
        <h2
          id="heading-informasi-akun"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Informasi Akun
        </h2>
        <p className="text-xs sm:text-sm text-stone-500">
          Perbarui informasi dasar dan identitas profil publik kamu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Avatar Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-2">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral border-[2.5px] border-primary/20 text-primary flex items-center justify-center font-display text-2xl sm:text-3xl font-bold select-none shrink-0 overflow-hidden">
            {avatarPreview ? (
              <img src={avatarPreview} alt={formData.name} className="w-full h-full object-cover" />
            ) : (
              <span>{formData.name.charAt(0) || 'D'}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border-warm hover:border-stone-300 hover:bg-neutral text-stone-800 text-xs sm:text-sm font-semibold transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer active:scale-[0.98]"
              >
                <CameraIcon className="w-3.5 h-3.5 text-stone-500" strokeWidth={2} />
                <span>Ubah Foto</span>
              </button>

              {avatarPreview && (
                <button
                  type="button"
                  onClick={() => setAvatarPreview(null)}
                  className="text-xs text-stone-500 hover:text-stone-700 transition-colors font-medium underline-offset-4 hover:underline cursor-pointer"
                >
                  Hapus
                </button>
              )}
            </div>

            <p className="text-[11px] text-stone-500">
              Format JPG, PNG, atau WEBP. Maksimal 2 MB.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Unggah foto profil"
            />
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Nama Lengkap */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="input-name" className="text-xs font-bold text-stone-700 select-none">
              Nama Lengkap
            </label>
            <input
              id="input-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border-warm bg-white text-stone-900 text-sm font-medium hover:border-stone-300 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-150"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="input-email" className="text-xs font-bold text-stone-700 select-none">
                Alamat Email
              </label>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary select-none">
                <CheckIcon className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
                Terverifikasi
              </span>
            </div>
            <input
              id="input-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border-warm bg-white text-stone-900 text-sm font-medium hover:border-stone-300 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-150"
              placeholder="nama@email.com"
            />
          </div>

          {/* Nomor Telepon */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="input-phone" className="text-xs font-bold text-stone-700 select-none">
                Nomor Telepon
              </label>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary select-none">
                <CheckIcon className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
                Terverifikasi
              </span>
            </div>
            <input
              id="input-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border-warm bg-white text-stone-900 text-sm font-medium hover:border-stone-300 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-150"
              placeholder="0812-xxxx-xxxx"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <div className="flex items-center justify-between">
              <label htmlFor="input-bio" className="text-xs font-bold text-stone-700 select-none">
                Bio Singkat
              </label>
              <span className="text-[11px] text-stone-500 tabular-nums">
                {formData.bio.length} / 200 karakter
              </span>
            </div>
            <textarea
              id="input-bio"
              rows={3}
              maxLength={200}
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border-warm bg-white text-stone-900 text-sm font-medium hover:border-stone-300 focus:border-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/20 transition-all duration-150 resize-none leading-relaxed"
              placeholder="Tuliskan pernyataan singkat tentang motivasi kontribusimu..."
            />
          </div>
        </div>

        {/* Action Row & Feedback */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border-warm/80">
          <div>
            {saveSuccess && (
              <div
                role="status"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary select-none transition-all duration-300"
              >
                <CheckIcon className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                <span>Perubahan profil berhasil disimpan.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!isDirty || isSaving}
            className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              isDirty && !isSaving
                ? 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.98]'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {isSaving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>Simpan Perubahan</span>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}

export default PengaturanInformasiAkun
