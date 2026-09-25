import { HUB_HERO_CONTENT } from '../../../data/aksipedia/aksipediaHubData'

function AksiPediaHero() {
  return (
    <section className="relative w-full pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Text & Editorial Eyebrow */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Clean Editorial Eyebrow (No heavy pill background) */}
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold tracking-wider uppercase text-secondary mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
              <span>{HUB_HERO_CONTENT.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-bold text-primary text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.16] tracking-tight mb-5">
              {HUB_HERO_CONTENT.titleLine1}
              <br />
              <span>{HUB_HERO_CONTENT.titleLine2}</span>
            </h1>

            {/* Subheadline */}
            <p className="font-body text-primary/75 text-base sm:text-lg leading-relaxed max-w-xl">
              {HUB_HERO_CONTENT.description}
            </p>
          </div>

          {/* Right: Educational Illustration */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              <img
                src="/images/aksipedia/icon-eco-search.webp"
                alt="Ilustrasi edukasi identifikasi sampah daur ulang AksiPedia"
                className="relative z-10 w-full h-full object-contain rounded-2xl select-none pointer-events-none transition-transform duration-300 hover:scale-[1.01]"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AksiPediaHero
