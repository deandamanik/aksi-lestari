import Button from '../../../components/common/Button'
import {
  CheckIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  ShieldCheckIcon,
} from '../../../components/common/Icons'

/**
 * ProposeActionSuccess
 * Presentational success view displayed after a community action proposal is submitted.
 *
 * @param {object} props
 * @param {object} props.proposalData - Submitted form fields for summary preview
 * @param {() => void} props.onClose - Dismiss callback
 */
export default function ProposeActionSuccess({ proposalData, onClose }) {
  return (
    <div className="p-6 sm:p-10 overflow-y-auto text-center flex flex-col items-center justify-center space-y-5 animate-content-rise flex-1 min-h-0">
      <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center border-2 border-[#86EFAC] shadow-xs">
        <CheckIcon className="w-8 h-8 text-[#15803D] animate-check-scale" strokeWidth={2.5} />
      </div>

      <div className="max-w-md">
        <h3 className="font-display text-primary text-xl sm:text-2xl font-bold tracking-tight mb-2">
          Pengajuan Berhasil
        </h3>
        <p className="font-body text-stone-600 text-sm leading-relaxed">
          Pengajuan kegiatanmu telah berhasil dicatat dan akan melalui proses verifikasi.
        </p>
      </div>

      {/* Proposal Summary Preview Card */}
      <div className="w-full max-w-lg p-4 rounded-2xl bg-neutral border border-border-warm text-left space-y-2.5 text-xs text-stone-700">
        <div className="flex items-center justify-between border-b border-border-warm/60 pb-2">
          <span className="font-bold text-primary text-sm truncate">
            {proposalData?.title}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[11px] shrink-0">
            {proposalData?.category}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600 text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <MapPinIcon className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{proposalData?.location}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CalendarIcon className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{proposalData?.date}</span>
            <span className="text-stone-300">·</span>
            <ClockIcon className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{proposalData?.time}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <ShieldCheckIcon className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">Oleh: {proposalData?.organizer}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <UsersIcon className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Kapasitas: {proposalData?.capacity} peserta</span>
          </div>
        </div>
      </div>

      {/* Verification Process Note */}
      <div className="w-full max-w-lg p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-left text-xs text-[#166534] leading-relaxed">
        <strong>Catatan Kurasi:</strong> Tim verifikator AksiLestari akan memeriksa kelengkapan agenda dalam waktu 1x24 jam kerja sebelum aksi dipublikasikan di halaman komunitas.
      </div>

      {/* CTA Return Button */}
      <div className="pt-2">
        <Button
          variant="primary"
          size="md"
          onClick={onClose}
        >
          Kembali ke Komunitas
        </Button>
      </div>
    </div>
  )
}

