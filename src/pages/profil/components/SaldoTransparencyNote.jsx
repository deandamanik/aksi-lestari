import { InfoIcon } from '../../../components/common/Icons'

/**
 * SaldoTransparencyNote — Informational Transparency Box
 *
 * Explains that saldo apresiasi is separate from XP.
 * Subtle warm background, InfoIcon, no gradient.
 */
function SaldoTransparencyNote() {
  return (
    <div className="bg-[#FAF9F4] rounded-2xl border border-[#E8E5DC] p-5 sm:p-6 flex items-start gap-3">
      <InfoIcon className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" strokeWidth={1.8} />
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-stone-500">
          Catatan Keterbukaan
        </span>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          Saldo Apresiasi diperoleh dari kontribusi nyata yang terverifikasi oleh sistem dan petugas wilayah. Saldo ini terpisah mutlak dari XP (yang digunakan untuk progression level) dan hanya dapat digunakan dalam jalur pemanfaatan yang tersedia.
        </p>
      </div>
    </div>
  )
}

export default SaldoTransparencyNote
