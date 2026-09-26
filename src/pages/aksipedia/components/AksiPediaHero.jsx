import { CameraIcon } from '../../../components/common/Icons'
import { HUB_HERO_CONTENT } from '../../../data/aksipedia/aksipediaHubData'
import {
  AKSIPEDIA_HERO_DESKTOP_OBJECTS,
  AKSIPEDIA_HERO_MOBILE_OBJECTS,
} from '../../../data/aksipedia/aksipediaHeroObjects'

function AksiPediaHero({ onStartScan }) {
  return (
    <section
      className="relative w-full overflow-hidden bg-neutral h-[100svh] min-h-[580px] lg:min-h-[640px] flex flex-col justify-center"
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

      {/* Decorative 3D Floating Objects — Desktop (matches Beranda & Lapor aesthetic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block z-0" aria-hidden="true">
        {AKSIPEDIA_HERO_DESKTOP_OBJECTS.map((obj, i) => (
          <div
            key={`desktop-dec-${i}`}
            className={`absolute pointer-events-none select-none hero-enter-object ${obj.className}`}
            style={{
              animationDelay: `${obj.enterDelay}ms`,
            }}
          >
            <img
              src={obj.src}
              alt={obj.alt}
              className={`w-full h-auto drop-shadow-sm pointer-events-none select-none ${obj.ambientClass}`}
              style={{
                animationDelay: `${obj.enterDelay + 750}ms`,
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Decorative 3D Floating Objects — Mobile (matches Beranda composition) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden block md:hidden z-0" aria-hidden="true">
        {AKSIPEDIA_HERO_MOBILE_OBJECTS.map((obj, i) => (
          <div
            key={`mobile-dec-${i}`}
            className={`absolute pointer-events-none select-none hero-enter-object ${obj.className}`}
            style={{ animationDelay: `${obj.enterDelay}ms` }}
          >
            <img
              src={obj.src}
              alt={obj.alt}
              className={`w-full h-auto drop-shadow-sm pointer-events-none select-none ${obj.ambientClass}`}
              style={{ animationDelay: `${obj.ambientDelay}ms` }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center -translate-y-2 md:-translate-y-4 lg:translate-y-0">
          {/* Editorial Header & Actions (Centered on mobile like Beranda, 7-col on desktop) */}
          <div className="w-full flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            {/* Main Typographic Headline — Matches Beranda Quando treatment & line-height */}
            <h1 className="hero-reveal-headline font-display font-medium md:font-normal text-primary text-3xl sm:text-4xl md:text-[3.125rem] lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.18] md:leading-[1.14] tracking-tight mb-3 md:mb-4 lg:mb-5">
              {HUB_HERO_CONTENT.titleLine1}
              <br />
              <span>{HUB_HERO_CONTENT.titleLine2}</span>
            </h1>

            {/* Supporting Paragraph — Matches Beranda text weight & optical tone */}
            <p className="hero-reveal-paragraph font-body font-medium md:font-normal text-primary/80 md:text-primary/70 text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed max-w-[20rem] sm:max-w-md md:max-w-[36rem] lg:max-w-xl mb-4 sm:mb-5 md:mb-6 lg:mb-8 mx-auto lg:mx-0">
              {HUB_HERO_CONTENT.description}
            </p>

            {/* CTA Buttons — Exactly matches Beranda Hero style, roundedness, and sizing */}
            <div className="hero-reveal-cta flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto justify-center lg:justify-start">
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

          {/* Right: Integrated Educational Visual (Desktop only — hidden on mobile for clean Beranda-style composition) */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-end hero-reveal-visual">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
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
