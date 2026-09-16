import { Link } from 'react-router-dom'
import {
  HERO_DESKTOP_OBJECTS,
  HERO_MOBILE_OBJECTS,
} from '../../../data/beranda/heroDecorativeObjects'

function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-neutral h-[100svh] min-h-[580px]"
      style={{
        backgroundImage: 'url(/images/pattern.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label="Hero Beranda AksiLestari"
    >
      {/* Component-scoped Subtle Motion System */}
      <style>{`
        /* --- Central Content Entrance (Editorial Reveal) --- */
        @keyframes hero-content-reveal {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-reveal-headline {
          opacity: 0;
          animation: hero-content-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms forwards;
          will-change: transform, opacity;
        }

        .hero-reveal-paragraph {
          opacity: 0;
          animation: hero-content-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 120ms forwards;
          will-change: transform, opacity;
        }

        .hero-reveal-cta {
          opacity: 0;
          animation: hero-content-reveal 600ms cubic-bezier(0.16, 1, 0.3, 1) 240ms forwards;
          will-change: transform, opacity;
        }

        /* --- 3D Objects Entrance (Gentle Fade & Settle) --- */
        @keyframes hero-object-reveal {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .hero-enter-object {
          opacity: 0;
          animation: hero-object-reveal 750ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        /* --- Ambient Floating Animations: Distinct Natural Personalities --- */

        /* 1. Sun: Slow, relaxed, distant with tiny horizontal drift & subtle tilt */
        @keyframes hero-float-sun {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-1deg);
          }
          35% {
            transform: translate3d(2.5px, -9px, 0) rotate(0.8deg);
          }
          70% {
            transform: translate3d(-2px, -4px, 0) rotate(1.2deg);
          }
        }

        /* 2. Left Recycle: Gentle vertical drifting, tiny tilt, no continuous spin */
        @keyframes hero-float-recycle-left {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(1.2deg);
          }
          40% {
            transform: translate3d(-2px, -10px, 0) rotate(-1.5deg);
          }
          75% {
            transform: translate3d(1.5px, -5px, 0) rotate(0.5deg);
          }
        }

        /* 3. Right Recycle: Subtle complementary drifting & timing */
        @keyframes hero-float-recycle-right {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-1.2deg);
          }
          45% {
            transform: translate3d(2px, -9px, 0) rotate(1.8deg);
          }
          80% {
            transform: translate3d(-1.5px, -4px, 0) rotate(-0.5deg);
          }
        }

        /* 4. Trash Bin: Weighted, grounded, stable object with minimal rotation */
        @keyframes hero-float-bin {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-0.3deg);
          }
          50% {
            transform: translate3d(0, -8px, 0) rotate(0.3deg);
          }
        }

        /* 5. Earth: Living presence, gentle vertical floating & breathing scale, NO rotation */
        @keyframes hero-float-earth {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          35% {
            transform: translate3d(-2.5px, -10px, 0) scale(1.012);
          }
          70% {
            transform: translate3d(2px, -3px, 0) scale(1.004);
          }
        }

        /* 6. Monstera: Slow, broad leaf drift with subtle tilt */
        @keyframes hero-float-monstera {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(1.5deg);
          }
          45% {
            transform: translate3d(-2px, -10px, 0) rotate(-2deg);
          }
          75% {
            transform: translate3d(1.5px, -4px, 0) rotate(0.8deg);
          }
        }

        /* 7. Leaves Type A: Organic diagonal drifting & swaying */
        @keyframes hero-float-leaf-a {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-2deg);
          }
          30% {
            transform: translate3d(3px, -8px, 0) rotate(2deg);
          }
          65% {
            transform: translate3d(1.5px, -3px, 0) rotate(-1deg);
          }
          85% {
            transform: translate3d(-2px, -2px, 0) rotate(1.5deg);
          }
        }

        /* 8. Leaves Type B: Counter-diagonal natural leaf drift */
        @keyframes hero-float-leaf-b {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(2.5deg);
          }
          35% {
            transform: translate3d(-3px, -9px, 0) rotate(-2deg);
          }
          70% {
            transform: translate3d(-1px, -4px, 0) rotate(1.5deg);
          }
          85% {
            transform: translate3d(2px, -2px, 0) rotate(-1deg);
          }
        }

        /* 9. Sprouts Type A: Subtle vertical breathing motion */
        @keyframes hero-float-sprout-a {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-1deg) scale(1);
          }
          50% {
            transform: translate3d(1.5px, -9px, 0) rotate(1.5deg) scale(1.015);
          }
        }

        /* 10. Sprouts Type B: Gentle counter-sway breathing */
        @keyframes hero-float-sprout-b {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(1.2deg) scale(1);
          }
          50% {
            transform: translate3d(-1.5px, -8px, 0) rotate(-1.5deg) scale(1.015);
          }
        }

        .hero-ambient-sun {
          animation: hero-float-sun 6.4s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-recycle-left {
          animation: hero-float-recycle-left 6.2s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-recycle-right {
          animation: hero-float-recycle-right 5.4s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-bin {
          animation: hero-float-bin 6.0s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-earth {
          animation: hero-float-earth 6.8s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-monstera {
          animation: hero-float-monstera 5.6s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-leaf-a {
          animation: hero-float-leaf-a 4.8s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-leaf-b {
          animation: hero-float-leaf-b 5.2s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-sprout-a {
          animation: hero-float-sprout-a 5.0s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-sprout-b {
          animation: hero-float-sprout-b 5.8s ease-in-out infinite;
          will-change: transform;
        }

        /* --- Accessibility: Respect prefers-reduced-motion --- */
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal-headline,
          .hero-reveal-paragraph,
          .hero-reveal-cta,
          .hero-enter-object,
          .hero-ambient-sun,
          .hero-ambient-recycle-left,
          .hero-ambient-recycle-right,
          .hero-ambient-bin,
          .hero-ambient-earth,
          .hero-ambient-monstera,
          .hero-ambient-leaf-a,
          .hero-ambient-leaf-b,
          .hero-ambient-sprout-a,
          .hero-ambient-sprout-b {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

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
            className="inline-flex items-center justify-center gap-2 h-11 w-[88%] max-w-[320px] sm:w-auto sm:max-w-none px-6 sm:px-7 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
          >
            {/* Camera icon (inline SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span>Laporkan Sampah</span>
          </Link>

          {/* Secondary: Jelajahi Peta */}
          <Link
            to="/peta-sampah"
            className="inline-flex items-center justify-center h-11 w-[88%] max-w-[320px] sm:w-auto sm:max-w-none px-6 sm:px-7 rounded-full bg-white/70 text-primary text-sm font-semibold border border-primary hover:bg-primary/5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            Jelajahi Peta
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
