import { useInView } from '../../../hooks/useInView'
import {
  SproutIcon,
  RecycleIcon,
  CheckCircle2Icon,
} from '../../../components/common/Icons'

function AnimatedSection({ id, className = '', children, ...props }) {
  const [ref, inView] = useInView({ threshold: 0.04 })
  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-[opacity,transform] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      {...props}
    >
      {children}
    </section>
  )
}

function ModuleEditorialBody({ sections }) {
  const [sec01, sec02, sec03, sec04, sec05] = sections

  return (
    <article className="space-y-6 sm:space-y-8 font-body">
      {/* SECTION 01: Mengenal Sampah dari Sumbernya */}
      <AnimatedSection id="sec-01" className="scroll-mt-48 sm:scroll-mt-52 pt-2 border-b border-border-warm/60 pb-6 sm:pb-8">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-4 leading-snug">
          {sec01.title}
        </h2>
        <div className="space-y-4 text-primary/85 text-[15px] sm:text-base leading-relaxed mb-5">
          {sec01.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Editorial Photo & Caption */}
        <figure className="my-5">
          <div className="rounded-2xl overflow-hidden bg-stone-100 border border-border-warm">
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
      </AnimatedSection>

      {/* SECTION 02: Kenali Dua Golongan Karakteristik */}
      <AnimatedSection id="sec-02" className="scroll-mt-48 sm:scroll-mt-52 border-b border-border-warm/60 pb-6 sm:pb-8">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-3 leading-snug">
          {sec02.title}
        </h2>
        <p className="text-primary/85 text-[15px] sm:text-base leading-relaxed mb-5">
          {sec02.intro}
        </p>

        {/* 2 Editorial Comparison Blocks: Organik vs Anorganik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {sec02.columns.map((col) => {
            const isOrganik = col.type === 'organik'
            return (
              <div
                key={col.type}
                className="bg-white rounded-2xl border border-border-warm p-5 sm:p-6 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {isOrganik ? (
                      <SproutIcon className="w-4.5 h-4.5 text-secondary shrink-0" />
                    ) : (
                      <RecycleIcon className="w-4.5 h-4.5 text-primary shrink-0" />
                    )}
                    <h3 className="font-display font-bold text-primary text-lg sm:text-xl">
                      {col.title}
                    </h3>
                  </div>

                  <span className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5 select-none">
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
      </AnimatedSection>

      {/* SECTION 03: Bagaimana Membedakannya di Keseharian? */}
      <AnimatedSection id="sec-03" className="scroll-mt-48 sm:scroll-mt-52 border-b border-border-warm/60 pb-6 sm:pb-8">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-3 leading-snug">
          {sec03.title}
        </h2>
        <p className="text-primary/85 text-[15px] sm:text-base leading-relaxed mb-5">
          {sec03.intro}
        </p>

        {/* ONE Structured Classification Container (No card-in-card) */}
        <div className="rounded-2xl border border-border-warm bg-white overflow-hidden shadow-2xs mb-6">
          <div className="px-5 py-3.5 border-b border-border-warm/70 bg-stone-50/60 select-none">
            <h3 className="font-display font-bold text-primary text-sm sm:text-base">
              {sec03.classificationGuide.title}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-warm/70">
            {sec03.classificationGuide.categories.map((cat, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 flex flex-col justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-primary text-sm block mb-1.5">
                    {cat.name}
                  </span>
                  <p className="text-primary/75 leading-relaxed mb-4">
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

        {/* Skenario Sehari-hari — Editorial Numbered Reading List */}
        <div className="mt-6">
          <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-4">
            Skenario Sehari-hari
          </h3>
          <div className="divide-y divide-border-warm/70">
            {sec03.scenarios.map((scen) => (
              <div
                key={scen.number}
                className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-4"
              >
                <span className="font-display font-bold text-sm text-secondary select-none shrink-0 mt-0.5">
                  {String(scen.number).padStart(2, '0')}
                </span>
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-primary block mb-0.5">
                    {scen.situation}
                  </span>
                  <p className="text-primary/80 leading-relaxed">
                    {scen.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* SECTION 04: Apa yang Bisa Kamu Lakukan Sekarang? */}
      <AnimatedSection id="sec-04" className="scroll-mt-48 sm:scroll-mt-52 border-b border-border-warm/60 pb-6 sm:pb-8">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-3 leading-snug">
          {sec04.title}
        </h2>
        <p className="text-primary/85 text-[15px] sm:text-base leading-relaxed mb-5">
          {sec04.intro}
        </p>

        {/* Cohesive Action Surface */}
        <div className="rounded-2xl border border-border-warm bg-white divide-y divide-border-warm/70 shadow-2xs overflow-hidden">
          {sec04.actions.map((act) => (
            <div
              key={act.number}
              className="p-5 sm:p-6 flex items-start gap-4"
            >
              <span className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 text-primary font-display font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 select-none">
                {String(act.number).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display font-bold text-primary text-sm sm:text-base mb-1">
                  {act.title}
                </h3>
                <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* SECTION 05: Yang Perlu Selalu Kamu Ingat */}
      <AnimatedSection id="sec-05" className="scroll-mt-48 sm:scroll-mt-52">
        <h2 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-[1.75rem] tracking-tight mb-4 leading-snug">
          {sec05.title}
        </h2>

        {/* Rangkuman Kunci Card */}
        <div className="bg-white rounded-2xl border border-border-warm p-6 sm:p-7 shadow-2xs">
          <h3 className="font-display font-bold text-primary text-base sm:text-lg mb-4 flex items-center gap-2 select-none">
            <CheckCircle2Icon className="w-5 h-5 text-secondary shrink-0" />
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
      </AnimatedSection>
    </article>
  )
}

export default ModuleEditorialBody
