import { MegaphoneIcon, ArrowRightIcon } from '../../../components/common/Icons'

export default function CommunityProposalBanner({ onOpenProposeModal }) {
  return (
    <article className="bg-neutral rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:border-primary/30 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 motion-reduce:transform-none relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary/80 mb-2 font-body">
        <MegaphoneIcon className="w-3.5 h-3.5" />
        <span>INISIATIF WARGA</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-primary text-base sm:text-lg font-bold leading-snug tracking-tight mb-2">
        Punya Inisiatif Aksi di Lingkunganmu?
      </h3>

      {/* Description */}
      <p className="font-body text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
        Bantu fasilitasi gerakan gotong royong warga di RT/RW Anda melalui koordinasi relawan, dukungan logistik karung pilah, dan pendataan dampak terverifikasi.
      </p>

      {/* CTA Button / Link */}
      <div>
        <button
          type="button"
          onClick={onOpenProposeModal}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-all duration-180 active:scale-[0.98] cursor-pointer group focus:outline-hidden focus-visible:underline"
        >
          <span>Ajukan Kegiatan Lingkungan</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </button>
      </div>
    </article>
  )
}
