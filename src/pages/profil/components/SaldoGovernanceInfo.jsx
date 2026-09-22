import { LeafIcon } from '../../../components/common/Icons'

/**
 * SaldoGovernanceInfo — Tata Kelola Dana Gotong Royong
 *
 * Closing informational section. Not a CTA.
 * Subtle warm background, leaf icon, motivational text.
 * Same pattern as MisiCompletionSummary.
 */
function SaldoGovernanceInfo() {
  return (
    <section
      aria-labelledby="saldo-governance-heading"
      className="bg-[#FAF9F4] rounded-2xl border border-[#E8E5DC] p-6 sm:p-8 flex items-start gap-4"
    >
      {/* Icon */}
      <div className="shrink-0 mt-0.5 text-primary/40" aria-hidden="true">
        <LeafIcon className="w-5 h-5" strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3
          id="saldo-governance-heading"
          className="text-sm font-bold text-stone-700"
        >
          Tata Kelola Dana Gotong Royong
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-xl">
          Apresiasi warga dikelola secara transparan bersama untuk mendukung keberlanjutan program lingkungan dan tata kelola bersama. Setiap pemanfaatan saldo tercatat dalam alur akuntabel dan dapat dipertanggungjawabkan kepada seluruh warga kontributor.
        </p>
      </div>
    </section>
  )
}

export default SaldoGovernanceInfo
