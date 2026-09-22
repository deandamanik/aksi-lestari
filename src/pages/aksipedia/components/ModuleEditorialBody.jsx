import {
  SproutIcon,
  RecycleIcon,
  CheckCircle2Icon,
} from '../../../components/common/Icons'

function ModuleEditorialBody({ sections }) {
  const [sec01, sec02, sec03, sec04, sec05] = sections

  return (
    <article className="max-w-[720px] mx-auto space-y-16 sm:space-y-20 font-body">
      {/* SECTION 01: Mengenal Sampah dari Sumbernya */}
      <section id="sec-01" className="scroll-mt-56 sm:scroll-mt-60 lg:scroll-mt-64 pt-2 sm:pt-4">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-4">
          {sec01.title}
        </h2>
        <div className="space-y-4 text-primary/85 text-[15px] sm:text-base leading-relaxed mb-6">
          {sec01.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Editorial Photo & Caption */}
        <figure className="my-6">
          <div className="rounded-xl overflow-hidden bg-stone-100 border border-border-warm">
            <img
              src={sec01.image}
              alt="Aktivitas pemilahan sampah organik dan anorganik di meja makan"
              className="w-full h-auto object-cover"
            />
          </div>
          <figcaption className="text-xs text-stone-500 mt-2.5 leading-relaxed text-center italic">
            {sec01.imageCaption}
          </figcaption>
        </figure>
      </section>

      {/* SECTION 02: Kenali Dua Golongan Karakteristik */}
      <section id="sec-02" className="scroll-mt-56 sm:scroll-mt-60 lg:scroll-mt-64">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-3">
          {sec02.title}
        </h2>
        <p className="text-primary/85 text-[15px] sm:text-base leading-relaxed mb-6">
          {sec02.intro}
        </p>

        {/* 2 Editorial Columns: Organik vs Anorganik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {sec02.columns.map((col) => {
            const isOrganik = col.type === 'organik'
            return (
              <div
                key={col.type}
                className="bg-white rounded-2xl border border-border-warm p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    {isOrganik ? (
                      <SproutIcon className="w-5 h-5 text-secondary" />
                    ) : (
                      <RecycleIcon className="w-5 h-5 text-primary" />
                    )}
                    <h3 className="font-display font-bold text-primary text-lg sm:text-xl">
                      {col.title}
                    </h3>
                  </div>

                  <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                    {col.tagline}
                  </span>

                  <p className="text-xs sm:text-sm text-primary/80 leading-relaxed mb-5">
                    {col.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral border border-border-warm/70 text-xs text-primary/80">
                  <span className="font-bold text-primary block mb-1">
                    {col.examplesTitle}
                  </span>
                  <p className="leading-relaxed">{col.examples}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SECTION 03: Bagaimana Membedakannya di Keseharian? */}
      <section id="sec-03" className="scroll-mt-56 sm:scroll-mt-60 lg:scroll-mt-64">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-3">
          {sec03.title}
        </h2>
        <p className="text-primary/85 text-[15px] sm:text-base leading-relaxed mb-6">
          {sec03.intro}
        </p>

        {/* Panduan Klasifikasi Kilat */}
        <div className="bg-white rounded-2xl border border-border-warm p-5 sm:p-6 mb-8">
          <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-4">
            {sec03.classificationGuide.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sec03.classificationGuide.categories.map((cat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-neutral border border-border-warm/70 flex flex-col justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-primary block mb-1.5">
                    {cat.name}
                  </span>
                  <p className="text-primary/75 leading-relaxed mb-3">
                    {cat.items}
                  </p>
                </div>
                <p className="pt-2 border-t border-border-warm/60 font-semibold text-secondary">
                  → {cat.treatment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skenario Sehari-hari (Numbered list) */}
        <div>
          <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-4">
            Skenario Sehari-hari
          </h3>
          <div className="bg-white rounded-2xl border border-border-warm divide-y divide-border-warm/60">
            {sec03.scenarios.map((scen) => (
              <div key={scen.number} className="p-4 sm:p-5 flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 select-none">
                  {scen.number}
                </span>
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-primary block mb-0.5">
                    {scen.situation}
                  </span>
                  <span className="text-primary/80 leading-relaxed">
                    {scen.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04: Apa yang Bisa Kamu Lakukan Sekarang? */}
      <section id="sec-04" className="scroll-mt-56 sm:scroll-mt-60 lg:scroll-mt-64">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-3">
          {sec04.title}
        </h2>
        <p className="text-primary/85 text-[15px] sm:text-base leading-relaxed mb-6">
          {sec04.intro}
        </p>

        <div className="space-y-4">
          {sec04.actions.map((act) => (
            <div
              key={act.number}
              className="bg-white rounded-2xl border border-border-warm p-5 sm:p-6 flex items-start gap-4"
            >
              <span className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary font-display font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 select-none">
                {act.number}
              </span>
              <div>
                <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-1.5">
                  {act.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 05: Yang Perlu Selalu Kamu Ingat */}
      <section id="sec-05" className="scroll-mt-56 sm:scroll-mt-60 lg:scroll-mt-64">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-4">
          {sec05.title}
        </h2>

        {/* Rangkuman Kunci Card */}
        <div className="bg-white rounded-2xl border border-border-warm p-6 sm:p-7">
          <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-4 flex items-center gap-2">
            <CheckCircle2Icon className="w-5 h-5 text-secondary" />
            <span>{sec05.summaryTitle}</span>
          </h3>

          <ul className="space-y-3 text-xs sm:text-sm text-primary/80">
            {sec05.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}

export default ModuleEditorialBody
