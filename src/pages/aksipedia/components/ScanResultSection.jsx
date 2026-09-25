import {
  ArrowLeftIcon,
} from '../../../components/common/Icons'
import { DEFAULT_SCAN_RESULT } from '../../../data/aksipedia/wasteScanResultData'

function ScanResultSection({ uploadedImage, onResetScan }) {
  const result = DEFAULT_SCAN_RESULT

  const contextualItems = [
    result.commonUsage && {
      label: 'PENGGUNAAN UMUM',
      value: result.commonUsage,
    },
    result.idealCondition && {
      label: 'KONDISI IDEAL',
      value: result.idealCondition,
    },
  ].filter(Boolean)

  return (
    <section className="w-full pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16" aria-label="Hasil Identifikasi Sampah">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Primary Identity Card — Main Result Entry Point */}
        <div className="bg-white rounded-3xl border border-border-warm p-6 sm:p-8 lg:p-9 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-start">
            {/* Left: Scanned Photo with Meta */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border-warm/80 bg-stone-50/70 p-3 flex items-center justify-center">
                <img
                  src={uploadedImage || '/images/aksipedia/sample-waste.jpg'}
                  alt={`Hasil pemindaian ${result.title}`}
                  className="w-full h-full object-contain rounded-xl select-none"
                />
              </div>

              {/* Bottom Meta Row: Timestamp */}
              <div className="text-xs text-stone-500 pt-0.5 select-none">
                <span>Waktu: {result.timeString}</span>
              </div>

              {/* Kembali & Scan Sampah Lain — Secondary Action clearly in Photo Area */}
              <button
                type="button"
                onClick={onResetScan}
                className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl font-semibold text-xs sm:text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors shadow-2xs active:scale-[0.98] cursor-pointer select-none"
                aria-label="Kembali & Scan Sampah Lain"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5 text-primary" strokeWidth={2.25} />
                <span>Kembali & Scan Sampah Lain</span>
              </button>
            </div>

            {/* Right: Identity, Title, & Subtle Explanation */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Title & Material Metadata */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-2 select-none">
                    <span className="font-bold text-primary tracking-wider uppercase">
                      {result.category}
                    </span>
                    <span className="text-stone-300" aria-hidden="true">·</span>
                    <span className="text-stone-700 font-semibold">{result.shortMaterial || 'PET'}</span>
                    <span className="text-stone-300" aria-hidden="true">·</span>
                    <span className="text-stone-600 font-medium">Kode #{result.code}</span>
                  </div>
                  <h1 className="font-display font-bold text-primary text-2xl sm:text-3xl lg:text-[2rem] leading-snug tracking-tight">
                    {result.title}
                  </h1>
                </div>

                {/* Subtle Integrated Information Block: Kenapa Ini Penting? (No card-in-card) */}
                <div className="pt-4 border-t border-stone-100">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1.5 select-none">
                    Kenapa Informasi Ini Penting?
                  </h2>
                  <p className="font-body text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Contextual Information Block: Penggunaan Umum & Kondisi Ideal */}
                {contextualItems.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border-warm/70">
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-warm/70 gap-4 sm:gap-0">
                      {contextualItems.map((item, index) => (
                        <div
                          key={item.label}
                          className={`${
                            index === 0 ? 'sm:pr-5' : 'sm:pl-5 pt-3 sm:pt-0'
                          } min-w-0`}
                        >
                          <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 select-none mb-1">
                            {item.label}
                          </span>
                          <p className="font-body text-xs sm:text-sm font-semibold text-primary/90 leading-relaxed">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Material & Characteristics — ONE Unified Structured Information Block */}
        <div className="mt-12 sm:mt-14">
          <div className="mb-5">
            <h2 className="font-display font-bold text-primary text-xl sm:text-2xl tracking-tight mb-1.5">
              Karakteristik & Spesifikasi
            </h2>
            <p className="font-body text-primary/75 text-xs sm:text-sm">
              Struktur polimer dan sifat fisik bawaan dari material yang teridentifikasi.
            </p>
          </div>

          {/* Unified Structured Surface with Dividers (Not 3 Cards, No Dashboard Metrics) */}
          <div className="rounded-2xl border border-border-warm bg-white shadow-2xs overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-warm/70">
              {/* 1. Jenis Polimer */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1.5 select-none">
                    Jenis Polimer
                  </span>
                  <h3 className="font-semibold text-stone-900 text-sm sm:text-base leading-snug mb-1.5">
                    {result.material}
                  </h3>
                  <p className="font-body text-xs text-stone-500 leading-relaxed">
                    Kategori {result.category} · Termoplastik poliester jernih yang kedap cairan dan higienis untuk kemasan minuman sekali pakai.
                  </p>
                </div>
              </div>

              {/* 2. Kode Daur Ulang */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1.5 select-none">
                    Kode Daur Ulang
                  </span>
                  <h3 className="font-semibold text-stone-900 text-sm sm:text-base leading-snug mb-1.5">
                    Kode #{result.code} · Resin PETE
                  </h3>
                  <p className="font-body text-xs text-stone-500 leading-relaxed">
                    Simbol panah segitiga tertera di dasar wadah untuk memandu klasifikasi mekanis pada rantai daur ulang.
                  </p>
                </div>
              </div>

              {/* 3. Karakteristik Fisik */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1.5 select-none">
                    Karakteristik Fisik
                  </span>
                  <h3 className="font-semibold text-stone-900 text-sm sm:text-base leading-snug mb-1.5">
                    Sifat Fisik Benda
                  </h3>
                  <p className="font-body text-xs text-stone-500 leading-relaxed">
                    {result.physicalCharacteristics}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScanResultSection
