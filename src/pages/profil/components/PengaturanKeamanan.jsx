import { useState, useRef, useEffect } from 'react'
import { ArrowRightIcon } from '../../../components/common/Icons'

function PengaturanKeamanan() {
  const [feedbackMsg, setFeedbackMsg] = useState(null)
  const feedbackTimeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current)
      }
    }
  }, [])

  const handleTriggerAction = (msg) => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current)
    }
    setFeedbackMsg(msg)
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedbackMsg(null)
      feedbackTimeoutRef.current = null
    }, 3500)
  }

  return (
    <section
      id="keamanan"
      aria-labelledby="heading-keamanan"
      className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 flex flex-col gap-5 shadow-2xs"
    >
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b border-border-warm/80 pb-5">
        <h2
          id="heading-keamanan"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Keamanan Akun
        </h2>
        <p className="text-xs sm:text-sm text-stone-500">
          Kelola kredensial akses dan lapisan perlindungan akun kamu.
        </p>
      </div>

      {feedbackMsg && (
        <div
          role="status"
          className="p-3 rounded-xl bg-neutral border border-border-warm text-xs font-semibold text-primary flex items-center justify-between"
        >
          <span>{feedbackMsg}</span>
          <button
            type="button"
            onClick={() => {
              if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current)
              setFeedbackMsg(null)
            }}
            className="w-7 h-7 flex items-center justify-center rounded-md text-stone-500 hover:text-stone-800 text-xs cursor-pointer focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
            aria-label="Tutup pemberitahuan"
          >
            ✕
          </button>
        </div>
      )}

      {/* Simple rows with divider */}
      <div className="flex flex-col divide-y divide-border-warm/70">
        {/* Row 1: Ubah Kata Sandi */}
        <button
          type="button"
          onClick={() => handleTriggerAction('Tautan pengaturan ulang kata sandi telah dikirim ke email terdaftar.')}
          className="group flex items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-neutral/60 -mx-3 px-3 rounded-xl cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-bold text-stone-900 group-hover:text-primary transition-colors">
              Ubah Kata Sandi
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Perbarui kata sandi secara berkala untuk menjaga akun tetap terlindungi.
            </p>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-stone-300 group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
        </button>

        {/* Row 2: 2FA */}
        <button
          type="button"
          onClick={() => handleTriggerAction('Fitur Autentikasi Dua Langkah (2FA) dalam proses persiapan prototipe.')}
          className="group flex items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-neutral/60 -mx-3 px-3 rounded-xl cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-stone-900 group-hover:text-primary transition-colors">
                Autentikasi Dua Langkah (2FA)
              </span>
              <span className="text-[11px] font-medium text-stone-500 select-none">
                Belum diaktifkan
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Tambahkan verifikasi ekstra melalui kode aplikasi autentikator saat masuk.
            </p>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-stone-300 group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
        </button>

        {/* Row 3: Perangkat Aktif */}
        <button
          type="button"
          onClick={() => handleTriggerAction('Akun ini sedang aktif di 1 sesi browser (Windows Chrome / Kota Bandung).')}
          className="group flex items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-neutral/60 -mx-3 px-3 rounded-xl cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-stone-900 group-hover:text-primary transition-colors">
                Perangkat Aktif
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                1 Sesi Aktif
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Kelola perangkat dan sesi browser yang saat ini terhubung dengan akun.
            </p>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-stone-300 group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
        </button>
      </div>
    </section>
  )
}

export default PengaturanKeamanan
