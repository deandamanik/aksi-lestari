import { LeafIcon } from '../../../components/common/Icons'

/**
 * RiwayatTransparencyNote — Subtle Civic Accountability Note
 *
 * Non-intrusive informational note at the bottom of the activity list.
 * Explains civic public ledger accountability without loud alert styling.
 */
function RiwayatTransparencyNote() {
  return (
    <aside
      aria-label="Catatan Transparansi Data Kontribusi"
      className="bg-neutral rounded-xl border border-border-warm p-4 sm:p-5 flex items-start gap-3.5 text-stone-600"
    >
      <div
        className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary"
        aria-hidden="true"
      >
        <LeafIcon className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
      </div>

      <p className="text-xs sm:text-[13px] leading-relaxed text-stone-500">
        Setiap aksi yang Anda laporkan dan selesaikan tercatat dalam buku besar publik keterbukaan aksi lingkungan lokal. Bila terdapat ketidaksesuaian data verifikasi, Anda dapat mengajukan peninjauan ulang melalui surel transparansi data AksiLestari.
      </p>
    </aside>
  )
}

export default RiwayatTransparencyNote
