import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLapor } from '../../context/LaporContext'
import PhotoUploadCard from './components/PhotoUploadCard'
import AuthPromptModal from '../../components/common/AuthPromptModal'
import {
  LAPOR_DESKTOP_OBJECTS,
  LAPOR_MOBILE_OBJECTS,
} from '../../data/lapor/laporDecorativeObjects'

/**
 * LaporPage — Photo Entry (/lapor)
 *
 * The pre-flow entry point for the Lapor reporting feature.
 * This screen is intentionally NOT part of the 4-step reporting flow —
 * it exists before the flow begins.
 *
 * IMPORTANT — No LaporStepper, no LaporStepHeader, no step progress UI.
 *
 * The user selects/captures a photo here, then continues into the
 * actual 4-step flow which begins at /lapor/temukan.
 *
 * State: photo is committed to LaporContext so it persists through the flow.
 * Blob URLs: managed locally in PhotoUploadCard — never stored in context.
 */
function LaporPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { reportData, updateReport } = useLapor()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  const photoFile = reportData.temukan.photo.file

  // Called by PhotoUploadCard when a valid file is selected/dropped
  const handleFileSelect = useCallback(
    (file) => {
      updateReport({
        temukan: {
          photo: {
            file,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            capturedAt: Date.now(),
          },
        },
        reportStatus: 'in-progress',
        createdAt: reportData.createdAt ?? Date.now(),
      })
    },
    [updateReport, reportData.createdAt]
  )

  // Enter the actual 4-step reporting flow — Step 01 Temukan
  const handleContinue = useCallback(() => {
    if (!photoFile) return
    if (!isAuthenticated) {
      setShowAuthPrompt(true)
      return
    }
    navigate('/lapor/temukan')
  }, [photoFile, isAuthenticated, navigate])

  return (
    <main
      className="relative w-full overflow-hidden bg-neutral min-h-[100svh] lg:h-[100svh] lg:min-h-[600px] pt-20 sm:pt-24 lg:pt-22 pb-10 sm:pb-12 flex flex-col justify-center"
      style={{
        backgroundImage: 'url(/images/pattern.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Lapor Sampah - Unggah Foto Temuan"
    >
      {/* Component-scoped Ambient Floating and Entrance Keyframes */}
      <style>{`
        @keyframes lapor-enter {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .lapor-enter-header {
          opacity: 0;
          animation: lapor-enter 520ms cubic-bezier(0.16, 1, 0.3, 1) 0ms forwards;
          will-change: opacity, transform;
        }

        .lapor-enter-card {
          opacity: 0;
          animation: lapor-enter 520ms cubic-bezier(0.16, 1, 0.3, 1) 50ms forwards;
          will-change: opacity, transform;
        }

        .lapor-enter-actions {
          opacity: 0;
          animation: lapor-enter 520ms cubic-bezier(0.16, 1, 0.3, 1) 100ms forwards;
          will-change: opacity, transform;
        }

        @keyframes lapor-preview-reveal {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }

        .lapor-preview-enter {
          animation: lapor-preview-reveal 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: opacity, transform;
        }

        @keyframes lapor-float-sun {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
          50% { transform: translate3d(2px, -8px, 0) rotate(1deg); }
        }
        @keyframes lapor-float-recycle {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1deg); }
          50% { transform: translate3d(-2px, -9px, 0) rotate(-1.5deg); }
        }
        @keyframes lapor-float-bin {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-0.3deg); }
          50% { transform: translate3d(0, -6px, 0) rotate(0.4deg); }
        }
        @keyframes lapor-float-earth {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(1.5px, -8px, 0) scale(1.01); }
        }
        @keyframes lapor-float-monstera {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1.2deg); }
          50% { transform: translate3d(-2px, -8px, 0) rotate(-1.5deg); }
        }
        @keyframes lapor-float-sprout-left {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
          50% { transform: translate3d(1.5px, -7px, 0) rotate(1.2deg); }
        }
        @keyframes lapor-float-sprout-right {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1deg); }
          50% { transform: translate3d(-1.5px, -7px, 0) rotate(-1deg); }
        }
        @keyframes lapor-float-leaf-a {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-2deg); }
          50% { transform: translate3d(2px, -6px, 0) rotate(2deg); }
        }
        @keyframes lapor-float-leaf-b {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(2deg); }
          50% { transform: translate3d(-2px, -7px, 0) rotate(-2deg); }
        }

        .lapor-ambient-sun { animation: lapor-float-sun 6.4s ease-in-out infinite; will-change: transform; }
        .lapor-ambient-recycle { animation: lapor-float-recycle 6.0s ease-in-out infinite; will-change: transform; }
        .lapor-ambient-bin { animation: lapor-float-bin 5.8s ease-in-out infinite; will-change: transform; }
        .lapor-ambient-earth { animation: lapor-float-earth 6.8s ease-in-out infinite; will-change: transform; }
        .lapor-ambient-monstera { animation: lapor-float-monstera 5.6s ease-in-out infinite; will-change: transform; }
        .lapor-ambient-sprout-left { animation: lapor-float-sprout-left 5.2s ease-in-out infinite; will-change: transform; }
        .lapor-ambient-sprout-right { animation: lapor-float-sprout-right 5.4s ease-in-out infinite; will-change: transform; }
        .lapor-ambient-leaf-a { animation: lapor-float-leaf-a 4.8s ease-in-out infinite; will-change: transform; }
        .lapor-ambient-leaf-b { animation: lapor-float-leaf-b 5.0s ease-in-out infinite; will-change: transform; }

        @media (prefers-reduced-motion: reduce) {
          .lapor-enter-header,
          .lapor-enter-card,
          .lapor-enter-actions,
          .lapor-preview-enter {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .lapor-ambient-sun, .lapor-ambient-recycle, .lapor-ambient-bin,
          .lapor-ambient-earth, .lapor-ambient-monstera, .lapor-ambient-sprout-left,
          .lapor-ambient-sprout-right, .lapor-ambient-leaf-a, .lapor-ambient-leaf-b {
            animation: none !important;
          }
        }
      `}</style>

      {/* Decorative 3D Assets — Desktop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
        {LAPOR_DESKTOP_OBJECTS.map((obj, index) => (
          <img
            key={`desktop-dec-${index}`}
            src={obj.src}
            alt={obj.alt}
            className={`absolute ${obj.className} ${obj.ambientClass}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      {/* Decorative 3D Assets — Mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden md:hidden" aria-hidden="true">
        {LAPOR_MOBILE_OBJECTS.map((obj, index) => (
          <img
            key={`mobile-dec-${index}`}
            src={obj.src}
            alt={obj.alt}
            className={`absolute ${obj.className} ${obj.ambientClass}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      {/* Central Content */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        {/* Page Heading — NO stepper, NO step chip */}
        <div className="text-center mb-6 sm:mb-8 lapor-enter-header">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[42px] text-primary tracking-tight leading-tight">
            Temukan Sampah di Sekitarmu
          </h1>
          <p className="font-body text-stone-600 text-sm sm:text-base lg:text-lg mt-2 max-w-lg mx-auto leading-relaxed">
            Ambil foto temuanmu untuk memulai alur pelaporan.
          </p>
        </div>

        {/* Upload Card */}
        <div className="w-full max-w-2xl mx-auto lapor-enter-card">
          <PhotoUploadCard
            selectedFile={photoFile}
            onFileSelect={handleFileSelect}
            size="default"
          />
        </div>

        {/* Guidance + CTA */}
        <div className="w-full lapor-enter-actions flex flex-col items-center">
          {/* Photo quality guidance */}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-stone-500 max-w-3xl mx-auto text-center px-4 leading-normal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-stone-400 shrink-0" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span className="lg:whitespace-nowrap">
              Foto lebih mudah diidentifikasi jika objek sampah terlihat utuh, terang, dan tidak tertutup benda lain.
            </span>
          </div>

          {/* CTA */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center text-center">
            <button
              type="button"
              disabled={!photoFile}
              onClick={handleContinue}
              className={`inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-8 sm:px-10 rounded-full font-bold text-sm sm:text-base transition-colors select-none ${
                photoFile
                  ? 'bg-primary hover:bg-[#1A4B2E] text-white cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                  : 'bg-[#C6CFC9] text-white/95 cursor-not-allowed shadow-none'
              }`}
              aria-label="Lanjutkan ke Temuan"
              aria-disabled={!photoFile}
            >
              <span>Lanjutkan ke Temuan</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5" aria-hidden="true">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>

            <p className="text-xs text-stone-500 mt-2.5 font-medium tracking-wide">
              {!photoFile
                ? 'Unggah atau ambil foto terlebih dahulu untuk melanjutkan'
                : 'Foto telah siap. Klik untuk melanjutkan alur pelaporan'}
            </p>
          </div>
        </div>
      </div>

      <AuthPromptModal
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        title="Masuk untuk melanjutkan"
        description="Masuk untuk melanjutkan laporanmu dan mencatatnya sebagai kontribusi."
        returnTo={{ pathname: '/lapor/temukan' }}
        intent={{ type: 'continue-report' }}
      />
    </main>
  )
}

export default LaporPage
