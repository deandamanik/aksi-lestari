import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import AuthPromptModal from '../../../components/common/AuthPromptModal'
import Modal from '../../../components/common/Modal'
import {
  XIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ZapIcon,
  CheckIcon,
} from '../../../components/common/Icons'

export default function ActionDetailModal({
  action,
  isOpen,
  onClose,
  isJoined,
  onJoin,
}) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  if (!isOpen || !action) return null

  const percentFilled = Math.min(
    100,
    Math.round((action.participants / action.capacity) * 100)
  )
  const isFull = action.participants >= action.capacity

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        ariaLabelledBy="action-detail-title"
        backdropClassName="bg-black/50"
        className="w-full max-w-[860px] bg-white rounded-2xl sm:rounded-3xl border border-border-warm shadow-xl overflow-hidden max-h-[85vh] flex flex-col animate-dialog-enter"
      >
        {/* Modal Header (Fixed) */}
        <div className="p-6 sm:p-7 sm:px-8 border-b border-border-warm/60 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 sm:top-6 right-5 sm:right-6 w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-primary hover:bg-stone-100 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Tutup rincian aksi"
          >
            <XIcon className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary font-body">
              {action.category}
            </span>
            {action.subCategory && action.subCategory !== action.category && (
              <>
                <span className="text-stone-300 font-light select-none">·</span>
                <span className="text-[11px] text-stone-400 font-medium font-body">
                  {action.subCategory}
                </span>
              </>
            )}
          </div>

          <h2
            id="action-detail-title"
            className="font-display text-primary text-xl sm:text-2xl font-bold tracking-tight pr-10 leading-snug"
          >
            {action.title}
          </h2>

          <div className="flex items-center gap-1 mt-1.5 text-xs sm:text-[13px] text-stone-500 font-body">
            <span>Diselenggarakan oleh</span>
            <strong className="text-stone-800 font-bold">{action.organizer}</strong>
          </div>
        </div>

        {/* Modal Body (Scrollable Content) */}
        <div className="p-6 sm:p-7 sm:px-8 overflow-y-auto space-y-5 flex-1 min-h-0">
          {/* Metadata Area (2 Columns on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 text-xs sm:text-[13px] font-body">
            {/* Left Col 1: Tanggal Pelaksanaan */}
            <div className="flex items-start gap-2.5">
              <CalendarIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] text-stone-400 font-medium">
                  Tanggal Pelaksanaan
                </span>
                <span className="font-bold text-primary">{action.date}</span>
              </div>
            </div>

            {/* Right Col 1: Waktu */}
            <div className="flex items-start gap-2.5">
              <ClockIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] text-stone-400 font-medium">
                  Waktu
                </span>
                <span className="font-bold text-primary">{action.time}</span>
              </div>
            </div>

            {/* Left Col 2: Lokasi */}
            <div className="flex items-start gap-2.5">
              <MapPinIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] text-stone-400 font-medium">
                  Lokasi
                </span>
                <span className="font-bold text-primary truncate">{action.location}</span>
                {action.locationDetail && (
                  <span className="block text-[11px] text-stone-400 font-normal mt-0.5">
                    {action.locationDetail}
                  </span>
                )}
              </div>
            </div>

            {/* Right Col 2: Reward Partisipasi */}
            <div className="flex items-start gap-2.5">
              <ZapIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] text-stone-400 font-medium">
                  Reward Partisipasi
                </span>
                <span className="font-bold text-primary">
                  +{action.xpReward || 100} XP Kontribusi
                </span>
              </div>
            </div>
          </div>

          {/* Kapasitas Relawan (Lightweight line) */}
          <div className="pt-4 border-t border-border-warm/60">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-stone-500 font-medium">Kapasitas Relawan</span>
              <span className="text-stone-600 font-semibold">
                <strong className="text-primary font-bold">{action.participants}</strong> dari{' '}
                {action.capacity} relawan
              </span>
            </div>
            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>

          {/* Deskripsi Kegiatan */}
          <div className="pt-4 border-t border-border-warm/60">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 font-body">
              Deskripsi Kegiatan
            </h3>
            <p className="font-body text-stone-600 text-xs sm:text-sm leading-relaxed">
              {action.description}
            </p>
          </div>

          {/* Tujuan Lingkungan */}
          {action.purpose && (
            <div className="pt-4 border-t border-border-warm/60">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 font-body">
                Tujuan Lingkungan
              </h3>
              <p className="font-body text-stone-600 text-xs sm:text-sm leading-relaxed">
                {action.purpose}
              </p>
            </div>
          )}

          {/* Titik Kumpul (Meeting Point) */}
          {action.meetingPoint && (
            <div className="pt-4 border-t border-border-warm/60">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5 font-body">
                Titik Kumpul (Meeting Point)
              </h3>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 font-medium">
                <MapPinIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{action.meetingPoint}</span>
              </div>
            </div>
          )}

          {/* Perlengkapan yang Perlu Dibawa (if available) */}
          {action.equipment && action.equipment.length > 0 && (
            <div className="pt-4 border-t border-border-warm/60">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2 font-body">
                Perlengkapan yang Perlu Dibawa
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 font-body">
                {action.equipment.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckIcon className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Narahubung Koordinator (if available) */}
          {action.contactPerson && (
            <div className="pt-3 text-xs text-stone-400 border-t border-border-warm/60 font-body">
              Narahubung Koordinator:{' '}
              <span className="font-semibold text-stone-700">{action.contactPerson}</span>
            </div>
          )}
        </div>

        {/* Modal Footer / Action CTA (Fixed) */}
        <div className="px-4 sm:px-8 py-3 sm:py-3.5 bg-neutral border-t border-border-warm/70 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="text-xs sm:text-[13px] font-normal text-stone-500 hover:text-stone-800 transition-colors cursor-pointer py-1 px-1 focus:outline-hidden focus-visible:underline shrink-0"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isJoined && !isFull) {
                if (!isAuthenticated) {
                  setShowAuthPrompt(true)
                  return
                }
                onJoin(action)
              }
            }}
            disabled={isJoined || isFull}
            className={`inline-flex items-center justify-center gap-1.5 h-9 sm:h-9.5 px-4 sm:px-5 rounded-xl text-xs sm:text-[13px] font-semibold font-body transition-all duration-180 max-[350px]:w-full ${
              isJoined
                ? 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC] cursor-default'
                : isFull
                ? 'bg-stone-200 text-stone-500 border border-stone-300 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90 shadow-2xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary'
            }`}
          >
            {isJoined ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-[#15803D] animate-check-scale shrink-0" />
                <span>Kamu Sudah Terdaftar</span>
              </>
            ) : isFull ? (
              <span>Kuota Penuh</span>
            ) : (
              <span>
                Gabung Aksi Ini
                {action.xpReward ? (
                  <span className="font-normal opacity-85"> · +{action.xpReward} XP</span>
                ) : null}
              </span>
            )}
          </button>
        </div>
      </Modal>

      <AuthPromptModal
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        title="Masuk untuk melanjutkan"
        description="Masuk untuk bergabung dalam aksi ini dan mencatat keikutsertaanmu."
        returnTo={{ pathname: location.pathname, search: location.search, hash: location.hash }}
        intent={{ type: 'join-action', actionId: action.id }}
      />
    </>
  )
}
