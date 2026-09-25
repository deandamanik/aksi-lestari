import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { resolveReturnDestination } from '../../utils/authRedirect'
import AuthCardWrapper from './components/AuthCardWrapper'
import AuthInputField from './components/AuthInputField'
import { ArrowRightIcon, AlertCircleIcon } from './components/AuthIcons'
import logoAksiLestari from '../../assets/logo-aksilestari.svg'

/**
 * LoginPage
 * Halaman masuk akun AksiLestari dengan form responsif,
 * toggle visibilitas password, dan integrasi single demo account AuthContext.
 */
export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')

  // Resolve return destination safely (priority: AuthGate returnTo -> intended route -> fallback '/')
  const destination = resolveReturnDestination(location.state)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on user typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (generalError) {
      setGeneralError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGeneralError('')

    try {
      login(formData.email, formData.password)
      navigate(destination, { replace: true })
    } catch (err) {
      setGeneralError(err.message || 'Terjadi kesalahan saat masuk. Silakan coba lagi.')
    }
  }

  return (
    <AuthCardWrapper type="login" hideHeroOnMobile>
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
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Selamat Datang Kembali
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 leading-relaxed">
          Masuk dan lanjutkan perjalanan aksi pelestarian lingkunganmu bersama Aksi Lestari hari ini.
        </p>
      </div>

      {/* Status Alerts */}
      {generalError && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5 animate-error-slide">
          <AlertCircleIcon className="w-5 h-5 shrink-0 text-red-600" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>
        {/* Email Field */}
        <AuthInputField
          id="login-email"
          name="email"
          type="email"
          label="Email kamu"
          placeholder="contoh@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        {/* Password Field */}
        <AuthInputField
          id="login-password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 w-full py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base text-white bg-[#22603B] hover:bg-[#1B4D2F] active:scale-[0.99] transition-all duration-200 shadow-md hover:shadow-lg shadow-[#22603B]/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Masuk</span>
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      {/* Switch to Register link */}
      <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
        Belum punya akun?{' '}
        <Link
          to="/register"
          className="font-bold text-[#22603B] hover:text-[#18462B] hover:underline transition-colors ml-0.5"
        >
          Daftar sekarang
        </Link>
      </div>
    </AuthCardWrapper>
  )
}
