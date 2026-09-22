import {
  CheckCircle2Icon,
  InfoIcon,
} from '../../../components/common/Icons'
import { DEFAULT_SCAN_RESULT } from '../../../data/aksipedia/wasteScanResultData'

function ScanResultSection({ uploadedImage, onResetScan }) {
  const result = DEFAULT_SCAN_RESULT

  return (
    <section className="w-full pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-xs font-bold tracking-wider uppercase text-secondary block mb-2 select-none">
            HASIL SCAN
          </span>
          <h1 className="font-display font-bold text-primary text-3xl sm:text-4xl lg:text-[2.625rem] tracking-tight mb-2.5">
            Hasil Identifikasi Sampah
          </h1>
          <p className="font-body text-primary/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Berikut informasi tentang sampah yang berhasil dikenali dari foto yang kamu unggah.
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Scanned Photo with Meta */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border-warm/70 bg-stone-100">
                <img
                  src={uploadedImage || '/images/aksipedia/sample-waste.jpg'}
                  alt="Hasil pemindaian sampah botol plastik"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-semibold select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Foto Terpindai</span>
                </div>
              </div>

              {/* Bottom Meta Row */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-1 select-none">
                <span>Waktu Pemindaian: {result.timeString}</span>
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{result.verified ? 'Terverifikasi' : 'Pending'}</span>
                </span>
              </div>
            </div>

            {/* Right: Category, Material, Description & Notes */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Clean Inline Metadata (No chunky pill boxes) */}
                <div className="text-xs text-stone-500 font-medium mb-3 select-none">
                  <span className="font-bold text-primary tracking-wider uppercase">
                    {result.category}
                  </span>
                  <span className="mx-1.5 text-stone-300">·</span>
                  <span>{result.material}</span>
                  <span className="mx-1.5 text-stone-300">·</span>
                  <span>Kode #{result.code}</span>
                </div>

                {/* Title */}
                <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl leading-snug mb-3">
                  {result.title}
                </h2>

                {/* Description */}
                <p className="font-body text-primary/80 text-sm sm:text-[15px] leading-relaxed mb-4">
                  {result.description}
                </p>

                {/* Physical Characteristics Box */}
                <div className="p-4 rounded-xl bg-neutral border border-border-warm/80 mb-4 flex items-start gap-3">
                  <InfoIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-primary/85 leading-relaxed">
                    <strong className="font-bold text-primary">Karakteristik Fisik: </strong>
                    {result.physicalCharacteristics}
                  </p>
                </div>

                {/* Prototype disclaimer note */}
                <div className="flex items-start gap-2 text-xs text-stone-500 mb-6">
                  <InfoIcon className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{result.prototypeNotice}</p>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-4 border-t border-border-warm/70 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onResetScan}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors cursor-pointer group"
                >
                  <span className="transition-transform group-hover:-translate-x-1">←</span>
                  <span>Scan Sampah Lain</span>
                </button>

                <span className="text-xs text-stone-400 font-medium select-none">
                  {result.version}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScanResultSection
