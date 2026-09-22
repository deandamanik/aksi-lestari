import { Link } from 'react-router-dom'
import { ArrowRightIcon, LeafIcon } from '../../../components/common/Icons'

/**
 * MisiCompletionSummary — Contribution Callout
 *
 * Closing section that encourages users to view their contribution history.
 * Subtle warm background, leaf icon, motivational text, CTA link.
 * No excessive decoration — editorial, calm.
 */
function MisiCompletionSummary() {
  return (
    <section
      aria-labelledby="contribution-callout-heading"
      className="bg-[#FAF9F4] rounded-2xl border border-[#E8E5DC] p-6 sm:p-8 flex items-start gap-4"
    >
      {/* Icon */}
      <div className="shrink-0 mt-0.5 text-primary/40" aria-hidden="true">
        <LeafIcon className="w-5 h-5" strokeWidth={1.8} />
      </div>

      {/* Content + CTA */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p
          id="contribution-callout-heading"
          className="text-sm text-stone-500 leading-relaxed max-w-xl"
        >
          Setiap aksi kecil yang kamu selesaikan otomatis tercatat di{' '}
          <span className="font-semibold text-stone-600">Kontribusi &amp; Riwayat</span>{' '}
          serta menambahkan XP untuk menaikkan peringkat warga terlatih.
        </p>

        <Link
          to="/profil/riwayat"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-primary transition-colors duration-200 whitespace-nowrap shrink-0 focus:outline-hidden focus-visible:underline"
        >
          <span>Lihat Kontribusi &amp; Riwayat</span>
          <ArrowRightIcon
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2.2}
          />
        </Link>
      </div>
    </section>
  )
}

export default MisiCompletionSummary
