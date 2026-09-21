import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  XIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  ZapIcon,
  CheckIcon,
  ShieldCheckIcon,
  InfoIcon,
} from '../../../components/common/Icons'

export default function ActionDetailModal({
  action,
  isOpen,
  onClose,
  isJoined,
  onJoin,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !action) return null

  const percentFilled = Math.min(
    100,
    Math.round((action.participants / action.capacity) * 100)
  )
  const isFull = action.participants >= action.capacity

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="region"
      aria-label="Modal Rincian Aksi"
    >
      {/* Backdrop: Fixed to viewport, opacity animation only, no transform */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog: Flex-centered, animated with transform & opacity */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="action-detail-title"
        className="relative z-10 w-full max-w-2xl bg-white rounded-3xl border border-border-warm shadow-2xl overflow-hidden max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-48px)] flex flex-col animate-dialog-enter my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 sm:pb-5 border-b border-border-warm/60 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-primary/60 hover:text-primary hover:bg-neutral transition-all duration-180 active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
            aria-label="Tutup rincian aksi"
          >
            <XIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#22603B] font-body">
              {action.category}
            </span>
            {action.badge && (
              <>
                <span className="text-stone-300 font-light select-none">·</span>
                <span className="text-xs font-medium text-stone-500">
                  {action.badge}
                </span>
              </>
            )}
          </div>

          <h2
            id="action-detail-title"
            className="font-display text-primary text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight pr-10 leading-snug"
          >
            {action.title}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-primary/70 font-medium">
            <span>Diselenggarakan oleh</span>
            <strong className="text-primary font-bold">{action.organizer}</strong>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 min-h-0">
          {/* Quick Details Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-neutral/80 border border-border-warm text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2.5 text-primary">
              <CalendarIcon className="w-4 h-4 text-secondary shrink-0" />
              <div>
                <span className="block text-[11px] text-primary/60">Tanggal Pelaksanaan</span>
                <span className="font-bold">{action.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-primary">
              <ClockIcon className="w-4 h-4 text-secondary shrink-0" />
              <div>
                <span className="block text-[11px] text-primary/60">Waktu</span>
                <span className="font-bold">{action.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-primary">
              <MapPinIcon className="w-4 h-4 text-secondary shrink-0" />
              <div>
                <span className="block text-[11px] text-primary/60">Lokasi</span>
                <span className="font-bold truncate">{action.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-primary">
              <ZapIcon className="w-4 h-4 text-accent shrink-0" />
              <div>
                <span className="block text-[11px] text-primary/60">Reward Partisipasi</span>
                <span className="font-bold text-primary">+{action.xpReward} XP Kontribusi</span>
              </div>
            </div>
          </div>

          {/* Volunteers Capacity Progress */}
          <div className="p-4 rounded-2xl border border-border-warm bg-white">
            <div className="flex items-center justify-between text-xs font-semibold text-primary/80 mb-2">
              <div className="flex items-center gap-1.5">
                <UsersIcon className="w-4 h-4 text-secondary" />
                <span>Kapasitas Relawan</span>
              </div>
              <span>
                <strong className="text-primary font-bold">{action.participants}</strong> dari{' '}
                {action.capacity} kuota terisi ({percentFilled}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-neutral rounded-full overflow-hidden border border-border-warm/60">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  percentFilled >= 90 ? 'bg-accent' : 'bg-primary'
                }`}
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
              <InfoIcon className="w-4 h-4 text-secondary" />
              Deskripsi Kegiatan
            </h3>
            <p className="text-sm sm:text-base text-primary/80 leading-relaxed">
              {action.description}
            </p>
          </div>

          {/* Environmental Purpose */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-secondary" />
              Tujuan Lingkungan
            </h3>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed bg-[#FAF9F4] p-4 rounded-xl border border-border-warm">
              {action.purpose}
            </p>
          </div>

          {/* Meeting Point */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
              Titik Kumpul (Meeting Point)
            </h3>
            <div className="p-3.5 rounded-xl bg-neutral border border-border-warm text-sm text-primary font-medium flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-secondary shrink-0" />
              <span>{action.meetingPoint}</span>
            </div>
          </div>

          {/* Equipment Checklist */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">
              Perlengkapan yang Perlu Dibawa
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-primary/80">
              {action.equipment.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-neutral/60 border border-border-warm/60"
                >
                  <CheckIcon className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Person */}
          <div className="pt-2 text-xs text-primary/60 border-t border-border-warm/60">
            Narahubung Koordinator:{' '}
            <span className="font-semibold text-primary">{action.contactPerson}</span>
          </div>
        </div>

        {/* Modal Footer / Action CTA */}
        <div className="p-5 sm:p-6 bg-neutral/60 border-t border-border-warm flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-primary/70 hover:text-primary hover:bg-neutral transition-all duration-180 active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isJoined && !isFull) {
                onJoin(action)
              }
            }}
            disabled={isJoined || isFull}
            className={`inline-flex items-center justify-center gap-2 h-11 px-7 rounded-full text-sm font-bold transition-all duration-180 ${
              isJoined
                ? 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC] cursor-default'
                : isFull
                ? 'bg-stone-200 text-stone-500 border border-stone-300 cursor-not-allowed'
                : 'bg-[#22603B] text-white hover:bg-[#17462A] shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#22603B]'
            }`}
          >
            {isJoined ? (
              <>
                <CheckIcon className="w-4 h-4 text-[#15803D] animate-check-scale" />
                <span>Kamu Sudah Terdaftar</span>
              </>
            ) : isFull ? (
              <span>Kuota Penuh</span>
            ) : (
              <>
                <span>Gabung Aksi Ini</span>
                <span className="text-xs text-white/80 font-normal">
                  (+{action.xpReward} XP)
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
