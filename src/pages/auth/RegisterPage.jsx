import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthCardWrapper from './components/AuthCardWrapper'
import AuthInputField from './components/AuthInputField'
import { ArrowRightIcon, AlertCircleIcon, CheckCircleIcon } from './components/AuthIcons'
import logoAksiLestari from '../../assets/logo-aksilestari.svg'

/**
 * RegisterPage
 * Halaman pendaftaran akun baru AksiLestari.
 * Memiliki field Nama lengkap, Email, Password, Konfirmasi password,
 * serta animasi panel visual khas AksiLestari di sebelah kiri.
 */
export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (generalError) {
      setGeneralError('')
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Format email tidak valid'
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi'
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Password tidak cocok'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGeneralError('')

    if (!validate()) return

    try {
      setSubmitting(true)
      await register(formData.name, formData.email, formData.password)
      setSuccessMsg('Pendaftaran berhasil! Mengarahkan...')

      setTimeout(() => {
        navigate('/', { replace: true })
      }, 1000)
    } catch (err) {
      setGeneralError(err.message || 'Gagal mendaftar. Silakan coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCardWrapper type="register">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
        <img
          src={logoAksiLestari}
          alt="Logo AksiLestari"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
        />
        <span className="font-display font-bold text-xl sm:text-2xl text-[#22603B] tracking-tight">
          AksiLestari
        </span>
      </div>

      {/* Page Title & Subtitle */}
      <div className="mb-5 sm:mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Buat Akun Baru
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 leading-relaxed">
          Mulai perjalanan aksi nyata menjaga kelestarian lingkungan dan bergabung dengan komunitas hari ini.
        </p>
      </div>

      {/* Status Alerts */}
      {generalError && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5 animate-error-slide">
          <AlertCircleIcon className="w-5 h-5 shrink-0 text-red-600" />
          <span>{generalError}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3.5 rounded-xl sm:rounded-2xl bg-[#22603B] text-white shadow-lg shadow-[#22603B]/20 text-xs sm:text-sm flex items-center gap-3 animate-check-scale">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircleIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold tracking-wide">{successMsg}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4" noValidate>
        {/* Full Name */}
        <AuthInputField
          id="register-name"
          name="name"
          type="text"
          label="Nama lengkap"
          placeholder="Nama kamu"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
          disabled={submitting}
        />

        {/* Email */}
        <AuthInputField
          id="register-email"
          name="email"
          type="email"
          label="Email kamu"
          placeholder="contoh@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          disabled={submitting}
        />

        {/* Password */}
        <AuthInputField
          id="register-password"
          name="password"
          type="password"
          label="Password"
          placeholder="Min. 8 karakter"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          disabled={submitting}
        />

        {/* Confirm Password */}
        <AuthInputField
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          label="Konfirmasi password"
          placeholder="Ulangi password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          disabled={submitting}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base text-white bg-[#22603B] hover:bg-[#1B4D2F] active:scale-[0.99] transition-all duration-200 shadow-md hover:shadow-lg shadow-[#22603B]/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              <span>Membuat akun...</span>
            </>
          ) : (
            <>
              <span>Buat Akun</span>
              <ArrowRightIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Switch to Login link */}
      <div className="mt-6 text-center text-xs sm:text-sm text-gray-500">
        Sudah punya akun?{' '}
        <Link
          to="/login"
          className="font-bold text-[#22603B] hover:text-[#18462B] hover:underline transition-colors ml-0.5"
        >
          Masuk
        </Link>
      </div>
    </AuthCardWrapper>
  )
}
