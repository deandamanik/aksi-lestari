/**
 * RiwayatSummary — Single Horizontal Information Section
 *
 * Clean, calm composition:
 * - Total Kontribusi Tercatat (12 Aksi Terverifikasi)
 * - Total XP Kontribusi (240 XP Akumulatif)
 * - Validasi (kredibilitas sistem/komunitas)
 *
 * No colorful boxes or AI-slop; typography and thin vertical separators lead.
 */
function RiwayatSummary({ totalCount = 12, totalXP = 240 }) {
  return (
    <section
      aria-label="Ringkasan Metrik Kontribusi"
      className="bg-white rounded-2xl border border-[#E8E5DC] p-6 sm:p-7 shadow-2xs"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E8E5DC]">
        {/* Metric 1: Total Kontribusi */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
            Total Kontribusi Tercatat
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight tabular-nums">
              {totalCount}
            </span>
            <span className="text-sm font-semibold text-primary">
              Aksi Terverifikasi
            </span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
            Tercatat permanen dalam buku rekam jejak aksi sipil lingkungan.
          </p>
        </div>

        {/* Metric 2: Total XP Kontribusi */}
        <div className="flex flex-col gap-1.5 pt-5 md:pt-0 md:pl-8">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
            Total XP Kontribusi
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight tabular-nums">
              {totalXP}
            </span>
            <span className="text-sm font-bold text-amber-700 tracking-wide">
              XP Akumulatif
            </span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed mt-0.5">
            Poin progres relawan dari seluruh aksi yang telah terselesaikan.
          </p>
        </div>

        {/* Metric 3: Kredibilitas Validasi */}
        <div className="flex flex-col gap-1.5 pt-5 md:pt-0 md:pl-8">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest select-none">
            Validasi
          </span>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1">
            Semua catatan telah melewati proses validasi komunitas atau sistem verifikasi berjenjang oleh tim lapangan.
          </p>
        </div>
      </div>
    </section>
  )
}

export default RiwayatSummary
