import { Link } from 'react-router-dom'
import { CameraIcon } from '../../../components/common/Icons'
import {
  HERO_DESKTOP_OBJECTS,
  HERO_MOBILE_OBJECTS,
} from '../../../data/beranda/heroDecorativeObjects'

function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-neutral h-[100svh] min-h-[580px]"
      style={{
        backgroundImage: 'url(/images/pattern.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Hero Beranda AksiLestari"
    >
      {/* Decorative 3D objects — desktop only */}
      <div className="hidden md:block" aria-hidden="true">
        {HERO_DESKTOP_OBJECTS.map((obj, i) => (
          <div
            key={i}
            className={`absolute pointer-events-none select-none hero-enter-object ${obj.className}`}
            style={{
              animationDelay: `${obj.enterDelay}ms`,
            }}
          >
            <img
              src={obj.src}
              alt=""
              className={`w-full h-auto drop-shadow-sm pointer-events-none select-none ${obj.ambientClass}`}
              style={{
                animationDelay: `${obj.enterDelay + 750}ms`,
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Mobile: Rich, balanced environmental composition */}
      <div className="block md:hidden" aria-hidden="true">
        {HERO_MOBILE_OBJECTS.map((obj, i) => (
          <div
            key={i}
            className={`absolute pointer-events-none select-none hero-enter-object ${obj.className}`}
            style={{ animationDelay: `${obj.enterDelay}ms` }}
          >
            <img
              src={obj.src}
              alt=""
              className={`w-full h-auto drop-shadow-sm pointer-events-none select-none ${obj.ambientClass}`}
              style={{ animationDelay: `${obj.ambientDelay}ms` }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-10 pb-12 md:pt-12 md:pb-32 text-center -translate-y-2 md:-translate-y-4">
        {/* Headline — confident presence, wraps naturally on small mobile, one line on desktop */}
        <h1 className="hero-reveal-headline font-display font-medium md:font-normal text-primary text-3xl sm:text-4xl md:text-[3.125rem] lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.18] md:leading-[1.14] tracking-tight whitespace-normal md:whitespace-nowrap mb-3 md:mb-3.5">
          Temukan. Peduli. Bergerak.
        </h1>

        {/* Sub-headline: 2 lines on desktop, comfortable reading on mobile */}
        <p className="hero-reveal-paragraph font-body font-medium md:font-normal text-primary/80 md:text-primary/70 text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed max-w-[20rem] sm:max-w-md md:max-w-[36rem] lg:max-w-[39rem] mb-4 sm:mb-5 md:mb-6">
          Temukan masalah sampah di sekitarmu, pahami kondisinya, dan ambil
          langkah yang bisa kamu lakukan bersama ekosistem lingkungan lokal.
        </p>

        {/* CTA Buttons — stacked vertically on mobile, side-by-side on desktop */}
        <div className="hero-reveal-cta flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 justify-center w-full">
          {/* Primary: Laporkan Sampah */}
          <Link
            to="/lapor"
            className="inline-flex items-center justify-center gap-2.5 h-12 w-full sm:w-auto px-6 sm:px-7 rounded-full bg-primary text-white text-sm sm:text-base font-semibold hover:bg-primary/90 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
          >
            <CameraIcon className="w-5 h-5 shrink-0 text-white" strokeWidth={2} />
            <span>Laporkan Sampah</span>
          </Link>

          {/* Secondary: Jelajahi Peta */}
          <Link
            to="/peta-sampah"
            className="inline-flex items-center justify-center h-12 w-full sm:w-auto px-6 sm:px-7 rounded-full bg-white/70 text-primary text-sm sm:text-base font-semibold border border-primary hover:bg-primary/5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            Jelajahi Peta
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
