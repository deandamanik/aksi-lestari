import PhotoUploadCard from '../../lapor/components/PhotoUploadCard'
import { SearchIcon, InfoIcon, ArrowLeftIcon } from '../../../components/common/Icons'

function ScanUploadSection({
  selectedFile,
  setSelectedFile,
  onIdentify,
  isIdentifying,
  onBackToHub,
}) {
  return (
    <section className="w-full pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="font-display font-bold text-primary text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-3">
            Kenali Sampah yang Kamu Temukan
          </h1>
          <p className="font-body text-primary/75 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Ambil atau unggah foto sampah untuk membantu mengenali jenis dan materialnya.
          </p>
        </div>

        {/* Upload Card — Reused from Lapor */}
        <PhotoUploadCard
          value={selectedFile}
          onChange={setSelectedFile}
          statusText="Foto Siap Diidentifikasi"
          size="default"
        />

        {/* Helper text below upload card */}
        <div className="flex items-start sm:items-center justify-center gap-2 mt-4 sm:mt-5 text-xs text-stone-500 text-center px-4 leading-normal">
          <InfoIcon className="w-4 h-4 text-stone-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            Foto lebih mudah diidentifikasi jika objek sampah terlihat utuh, terang, dan tidak tertutup benda lain.
          </span>
        </div>

        {/* Action Area — Matches Lapor Step Bottom Navigation */}
        <div className="mt-8">
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {/* Back Button to Hub (Secondary / Outline Action) */}
            <button
              type="button"
              onClick={onBackToHub}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-xs active:scale-[0.98] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none w-full sm:w-auto"
              aria-label="Kembali ke Aksipedia Hub"
            >
              <ArrowLeftIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
              <span>Kembali ke Aksipedia Hub</span>
            </button>

            {/* Primary Identify Button */}
            <button
              type="button"
              disabled={!selectedFile || isIdentifying}
              onClick={onIdentify}
              className={`inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm transition-colors select-none w-full sm:w-auto ${
                !selectedFile || isIdentifying
                  ? 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
                  : 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs active:scale-[0.99] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
              }`}
              aria-label="Identifikasi Sampah"
              aria-disabled={!selectedFile || isIdentifying}
            >
              {isIdentifying ? (
                <>
                  <span
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
                    aria-hidden="true"
                  />
                  <span>Mengidentifikasi Material...</span>
                </>
              ) : (
                <>
                  <SearchIcon className="w-4 h-4" />
                  <span>Identifikasi Sampah</span>
                </>
              )}
            </button>
          </div>

          {/* Subtext under disabled button */}
          {!selectedFile && !isIdentifying && (
            <p className="mt-2.5 text-center sm:text-right text-xs text-stone-400 font-medium select-none">
              Unggah atau ambil foto terlebih dahulu untuk melanjutkan.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ScanUploadSection
