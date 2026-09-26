import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { resolveReturnDestination } from '../../utils/authRedirect'
import AuthCardWrapper from './components/AuthCardWrapper'
import AuthInputField from './components/AuthInputField'
import { ArrowRightIcon, AlertCircleIcon } from '../../components/common/Icons'
import logoAksiLestari from '../../assets/logo-aksilestari.svg'

/**
 * RegisterPage
 * Halaman pendaftaran akun AksiLestari yang mengarahkan
 * langsung ke akun demo tunggal Invention 2026.
 */
export default function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLoading) return
    setGeneralError('')

    setIsLoading(true)
    timerRef.current = setTimeout(() => {
      try {
        register(formData.name, formData.email, formData.password)
        const destination = resolveReturnDestination(location.state)
        navigate(destination, { replace: true })
      } catch (err) {
        setIsLoading(false)
        setGeneralError(err.message || 'Gagal menyiapkan akses. Silakan coba lagi.')
      }
    }, 1100)
  }

  return (
    <AuthCardWrapper type="register" hideHeroOnMobile>
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
        <img
          src={logoAksiLestari}
          alt="Logo AksiLestari"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
        />
        <span className="font-display font-bold text-xl sm:text-2xl text-primary tracking-tight">
          AksiLestari
        </span>
      </div>

      {/* Page Title & Subtitle */}
      <div className="mb-5 sm:mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
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
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-2 w-full py-3 sm:py-3.5 px-6 rounded-full font-semibold text-sm sm:text-base text-white transition-all duration-200 shadow-md shadow-primary/20 flex items-center justify-center gap-2 select-none ${
            isLoading
              ? 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
              : 'bg-primary hover:bg-primary/90 active:scale-[0.99] hover:shadow-lg cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          }`}
          aria-label="Daftar"
          aria-disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
                aria-hidden="true"
              />
              <span>Mendaftarkan...</span>
            </>
          ) : (
            <>
              <span>Daftar</span>
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
          state={location.state}
          className="font-bold text-primary hover:text-primary/80 hover:underline transition-colors ml-0.5"
        >
          Masuk
        </Link>
      </div>
    </AuthCardWrapper>
  )
}
