import { CameraIcon } from '../../../components/common/Icons'
import { HUB_HERO_CONTENT } from '../../../data/aksipedia/aksipediaHubData'

function AksiPediaHero({ onStartScan }) {
  return (
    <section
      className="relative w-full overflow-hidden bg-neutral min-h-[100svh] sm:min-h-[600px] lg:h-[100svh] lg:min-h-[640px] flex flex-col justify-center pt-24 sm:pt-28 lg:pt-20 pb-12 sm:pb-16 lg:pb-14"
      aria-label="Hero AksiPedia"
    >
      {/* Background Pattern — Matches Beranda viewport coverage with soft bottom transition into cream content */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: 'url(/images/pattern.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Editorial Header & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Main Typographic Headline — Matches Beranda Quando treatment & line-height */}
            <h1 className="font-display font-medium md:font-normal text-primary text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.18] md:leading-[1.14] tracking-tight mb-4 sm:mb-5">
              {HUB_HERO_CONTENT.titleLine1}
              <br />
              <span>{HUB_HERO_CONTENT.titleLine2}</span>
            </h1>

            {/* Supporting Paragraph — Matches Beranda text weight & optical tone */}
            <p className="font-body font-medium md:font-normal text-primary/80 md:text-primary/70 text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed max-w-xl mb-6 sm:mb-8">
              {HUB_HERO_CONTENT.description}
            </p>

            {/* CTA Buttons — Exactly matches Beranda Hero style, roundedness, and sizing */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
              {/* Primary: Scan Sampah */}
              <button
                type="button"
                onClick={onStartScan}
                className="inline-flex items-center justify-center gap-2.5 h-12 w-full sm:w-auto px-6 sm:px-7 rounded-full bg-primary text-white text-sm sm:text-base font-semibold hover:bg-primary/90 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary shadow-xs cursor-pointer select-none"
              >
                <CameraIcon className="w-5 h-5 shrink-0 text-white" strokeWidth={2} />
                <span>Scan Sampah</span>
              </button>

              {/* Secondary: Jelajahi Modul */}
              <a
                href="#modul"
                className="inline-flex items-center justify-center h-12 w-full sm:w-auto px-6 sm:px-7 rounded-full bg-white/70 text-primary text-sm sm:text-base font-semibold border border-primary hover:bg-primary/5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none"
              >
                Jelajahi Modul
              </a>
            </div>
          </div>

          {/* Right: Integrated Educational Visual */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-square flex items-center justify-center">
              <img
                src="/images/aksipedia/icon-eco-search.webp"
                alt="Ilustrasi edukasi identifikasi sampah daur ulang AksiPedia"
                className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xs transition-transform duration-300 hover:scale-[1.02]"
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
