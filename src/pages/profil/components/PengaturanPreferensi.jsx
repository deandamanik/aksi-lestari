import { useState } from 'react'
import { useToast } from '../../../hooks/useToast'

function PreferenceToggleRow({ title, description, checked, onChange, id }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-0.5 min-w-0 pr-2">
        <label htmlFor={id} className="text-sm font-bold text-stone-900 cursor-pointer select-none">
          {title}
        </label>
        <p className="text-xs text-stone-500 leading-relaxed">
          {description}
        </p>
      </div>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          checked ? 'bg-primary' : 'bg-stone-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function PengaturanPreferensi() {
  const { showToast } = useToast()
  const [preferences, setPreferences] = useState({
    misi: true,
    komunitas: true,
    sistem: true,
  })

  const handleToggle = (key, val) => {
    setPreferences((prev) => ({ ...prev, [key]: val }))
    showToast('Preferensi notifikasi berhasil disimpan.')
  }

  return (
    <section
      id="preferensi"
      aria-labelledby="heading-preferensi"
      className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 flex flex-col gap-5 shadow-2xs"
    >
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b border-border-warm/80 pb-5">
        <h2
          id="heading-preferensi"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Preferensi
        </h2>
        <p className="text-xs sm:text-sm text-stone-500">
          Atur informasi dan pengalaman pemberitahuan yang ingin kamu terima dari AksiLestari.
        </p>
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-border-warm/70">
        <PreferenceToggleRow
          id="toggle-misi"
          title="Notifikasi Misi"
          description="Pengingat misi baru, progres tantangan mingguan, dan pencapaian target relawan."
          checked={preferences.misi}
          onChange={(val) => handleToggle('misi', val)}
        />
        <PreferenceToggleRow
          id="toggle-komunitas"
          title="Notifikasi Aktivitas Komunitas"
          description="Undangan aksi bersama, kegiatan relawan sekitar, dan kolaborasi warga peduli."
          checked={preferences.komunitas}
          onChange={(val) => handleToggle('komunitas', val)}
        />
        <PreferenceToggleRow
          id="toggle-sistem"
          title="Notifikasi Sistem"
          description="Informasi penting terkait akun, verifikasi keamanan, dan pembaruan fitur platform."
          checked={preferences.sistem}
          onChange={(val) => handleToggle('sistem', val)}
        />
      </div>
    </section>
  )
}

export default PengaturanPreferensi
