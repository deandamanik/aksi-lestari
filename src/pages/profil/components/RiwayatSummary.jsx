import { CONTRIBUTION_SUMMARY } from '../../../data/profil/contributionHistoryData'

/**
 * RiwayatSummary — Single Horizontal Information Section
 *
 * Clean, calm composition:
 * - Total Kontribusi Tercatat (Aksi Terverifikasi)
 * - XP dari Kontribusi (XP Akumulatif)
 * - Validasi (kredibilitas sistem/komunitas)
 *
 * No colorful boxes or AI-slop; typography and thin vertical separators lead.
 */
function RiwayatSummary({
  totalCount = CONTRIBUTION_SUMMARY.verifiedCount,
  totalXP = CONTRIBUTION_SUMMARY.totalXP,
}) {
  return (
    <section
      aria-label="Ringkasan Metrik Kontribusi"
      className="bg-white rounded-xl border border-border-warm p-5 sm:p-6 shadow-2xs"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-border-warm">
        {/* Metric 1: Total Kontribusi */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest select-none">
            Total Kontribusi
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight tabular-nums">
              {totalCount}
            </span>
            <span className="text-xs font-semibold text-primary">
              Aksi Terverifikasi
            </span>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">
            Tercatat permanen dalam rekam jejak aksi sipil lingkungan.
          </p>
        </div>

        {/* Metric 2: Total XP Kontribusi */}
        <div className="flex flex-col gap-1 pt-4 md:pt-0 md:pl-6">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest select-none">
            XP Kontribusi
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight tabular-nums">
              {totalXP}
            </span>
            <span className="text-xs font-bold text-stone-700 tracking-wide">
              XP Akumulatif
            </span>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">
            Poin platform yang terverifikasi dari rekam jejak aksi nyata.
          </p>
        </div>

        {/* Metric 3: Kredibilitas Validasi */}
        <div className="flex flex-col gap-1 pt-4 md:pt-0 md:pl-6">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest select-none">
            Validasi Lapangan
          </span>
          <p className="text-xs text-stone-500 leading-relaxed mt-1">
            Setiap catatan telah melalui validasi berjenjang oleh tim lapangan atau konfirmasi komunitas terdaftar.
          </p>
        </div>
      </div>
    </section>
  )
}

export default RiwayatSummary
