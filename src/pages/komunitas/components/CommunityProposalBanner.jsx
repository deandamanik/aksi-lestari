import { MegaphoneIcon, ArrowRightIcon } from '../../../components/common/Icons'

export default function CommunityProposalBanner({ onOpenProposeModal }) {
  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-xs hover:border-primary/30 transition-all duration-200 relative overflow-hidden">
      {/* Eyebrow & Icon */}
      <div className="flex items-center gap-1.5 mb-2.5">
        <MegaphoneIcon className="w-4 h-4 text-secondary shrink-0" />
        <span className="text-xs font-bold uppercase tracking-widest text-secondary font-body">
          Inisiatif Warga
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-primary text-lg sm:text-xl font-bold leading-snug tracking-tight mb-2">
        Punya Inisiatif Aksi di Lingkunganmu?
      </h3>

      {/* Description */}
      <p className="font-body text-primary/70 text-xs sm:text-sm leading-relaxed mb-5">
        Bantu fasilitasi gerakan gotong royong warga di RT/RW Anda melalui koordinasi relawan, dukungan logistik, dan pendataan dampak terverifikasi.
      </p>

      {/* CTA Button */}
      <div>
        <button
          type="button"
          onClick={onOpenProposeModal}
          className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-primary text-white text-xs sm:text-[13px] font-semibold hover:bg-primary/90 transition-all duration-180 active:scale-[0.98] cursor-pointer group shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto"
        >
          <span>Ajukan Kegiatan Lingkungan</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </button>
      </div>
    </article>
  )
}


