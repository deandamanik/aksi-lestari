import {
  SparklesIcon,
  LeafIcon,
  ClipboardCheckIcon,
} from '../../../../components/common/Icons'

function IdentificationCard({ data }) {
  const {
    label,
    categoryLabel,
    typeLabel,
    materialLabel,
    description,
    confidenceLevel,
    confidenceNote,
    characteristics,
    environmentalImpact,
    recommendations,
    simulatedDisclosure,
  } = data

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs p-5 sm:p-6 lg:p-7 flex flex-col gap-5 sm:gap-6">
      {/* 1. Main Identification Result */}
      <div>
        <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-primary">
          Hasil Identifikasi
        </span>

        <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight mt-1.5">
          {label}
        </h2>

        <p className="text-xs text-stone-500 mt-2 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Kategori: {categoryLabel}</span>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <span>Jenis: {typeLabel}</span>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <span>Material: {materialLabel}</span>
        </p>

        <p className="text-sm text-stone-600 leading-relaxed mt-3">
          {description}
        </p>
      </div>

      {/* 2. Kecocokan Identifikasi & Ciri yang Terdeteksi */}
      <div className="flex flex-col gap-3 pt-2 border-t border-stone-100">
        {/* Qualitative confidence indicator */}
        <div className="rounded-xl bg-stone-50 border border-stone-200/70 px-3.5 py-2.5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-stone-800">
              Kecocokan Identifikasi
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {confidenceNote}
            </p>
          </div>
          <div className="shrink-0 self-start sm:self-center">
            <span className="font-bold text-xs sm:text-sm text-secondary">
              {confidenceLevel}
            </span>
          </div>
        </div>

        {/* Compact Characteristics Grid */}
        <div className="grid grid-cols-3 gap-2">
          {characteristics.map((item, idx) => (
            <div
              key={`char-${idx}`}
              className="rounded-xl bg-[#FBFBFA] border border-stone-200/70 p-2.5 flex flex-col justify-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                {item.label}
              </span>
              <span className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5 truncate">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Dampak Lingkungan */}
      <div className="flex flex-col gap-2.5 pt-1 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <LeafIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
          <h3 className="text-sm font-bold text-stone-800">
            Dampak Lingkungan
          </h3>
        </div>
        <ul className="space-y-2 text-xs text-stone-600 leading-relaxed pl-1">
          {environmentalImpact.map((point, index) => (
            <li key={`impact-${index}`} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-1.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Rekomendasi Penanganan */}
      <div className="flex flex-col gap-3 pt-1 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <ClipboardCheckIcon className="w-4 h-4 text-primary" strokeWidth={2.25} />
          <h3 className="text-sm font-bold text-stone-800">
            Rekomendasi Penanganan
          </h3>
        </div>

        <div className="space-y-2.5">
          {recommendations.map((rec) => (
            <div
              key={`rec-${rec.number}`}
              className="rounded-xl bg-stone-50 border border-stone-200/60 p-3 sm:p-3.5 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {rec.number}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-stone-800">
                  {rec.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mt-0.5">
                  {rec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-stone-100 flex items-start gap-2 text-stone-500 text-[11px] leading-relaxed">
        <SparklesIcon className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" strokeWidth={1.75} aria-hidden="true" />
        <p>
          <span className="font-semibold text-stone-600">Analisis AksiLestari: </span>
          <span className="text-stone-400">{simulatedDisclosure}</span>
        </p>
      </div>
    </div>
  )
}

export default IdentificationCard
