import { MegaphoneIcon, ArrowRightIcon } from '../../../components/common/Icons'

export default function CommunityProposalBanner({ onOpenProposeModal }) {
  return (
    <article className="bg-[#FAF7F0] rounded-2xl sm:rounded-3xl border border-[#EBE7DC] p-5 sm:p-6 shadow-2xs hover:border-[#22603B]/30 transition-all duration-200 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#22603B] mb-2">
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
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#22603B] hover:text-[#17462A] transition-colors duration-200 cursor-pointer group focus:outline-hidden focus-visible:underline"
        >
          <span>Ajukan Kegiatan Lingkungan</span>
          <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  )
}
