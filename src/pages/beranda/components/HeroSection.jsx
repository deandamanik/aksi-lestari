import { Link } from 'react-router-dom'

// Decorative 3D floating objects — tuned scale hierarchy & subtle motion configuration
const DECORATIVE_OBJECTS = [
  // Sun — upper-left, major decorative anchor (+12% scale)
  {
    src: '/images/3d/icon-sun.webp',
    className: 'top-[12%] left-[9%] xl:left-[10.5%] w-36 sm:w-40 md:w-48 lg:w-56 xl:w-64',
    enterDelay: 60,
    ambientClass: 'hero-ambient-sun',
  },
  // Recycle — left-middle, prominent secondary anchor (+12% scale)
  {
    src: '/images/3d/icon-recycle.webp',
    className: 'top-[38%] left-[9.5%] xl:left-[11%] w-22 sm:w-26 md:w-32 lg:w-36 xl:w-40',
    enterDelay: 120,
    ambientClass: 'hero-ambient-recycle-left',
  },
  // Small leaf — upper-left/upper-middle accent (scale preserved)
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[14%] left-[31%] xl:left-[32%] w-6 md:w-7 lg:w-8 xl:w-9 -rotate-12 opacity-90',
    enterDelay: 90,
    ambientClass: 'hero-ambient-leaf-a',
  },
  // Small leaf — upper-right accent (scale preserved)
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[21%] right-[32%] xl:right-[33%] w-6 md:w-7 lg:w-8 xl:w-9 rotate-12 opacity-85',
    enterDelay: 150,
    ambientClass: 'hero-ambient-leaf-b',
  },
  // Monstera leaf — upper-right, clearly visible & moderately large (scale preserved)
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    className: 'top-[16%] right-[11%] xl:right-[12%] w-18 sm:w-20 md:w-24 lg:w-28 xl:w-32',
    enterDelay: 100,
    ambientClass: 'hero-ambient-monstera',
  },
  // Sprout — upper-right side of headline (scale preserved)
  {
    src: '/images/3d/icon-sprout.png.webp',
    className: 'top-[37%] right-[13%] lg:right-[14%] xl:right-[15%] w-13 md:w-16 lg:w-18 xl:w-22',
    enterDelay: 170,
    ambientClass: 'hero-ambient-sprout-a',
  },
  // Recycle — right-middle/lower-right, slight increase (+8% scale, noticeably smaller than left recycle)
  {
    src: '/images/3d/icon-recycle.webp',
    className: 'top-[58%] right-[21%] md:right-[22%] lg:right-[23%] w-20 md:w-24 lg:w-28 xl:w-32',
    enterDelay: 210,
    ambientClass: 'hero-ambient-recycle-right',
  },
  // Small leaf — right edge accent (scale preserved)
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[59%] right-[8%] xl:right-[9%] w-5 md:w-6 lg:w-7 rotate-45 opacity-80',
    enterDelay: 230,
    ambientClass: 'hero-ambient-leaf-b',
  },
  // Sprout — lower-left region (scale preserved)
  {
    src: '/images/3d/icon-sprout.png.webp',
    className: 'bottom-[18%] left-[12%] xl:left-[13%] w-10 md:w-12 lg:w-14 xl:w-16',
    enterDelay: 160,
    ambientClass: 'hero-ambient-sprout-b',
  },
  // Small leaf — lower-left accent (scale preserved)
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[60%] left-[18%] xl:left-[19%] w-6 md:w-7 lg:w-8 -rotate-45 opacity-80',
    enterDelay: 190,
    ambientClass: 'hero-ambient-leaf-a',
  },
  // Trash bin — lower-left-center, noticeably visible secondary anchor (+18% scale)
  {
    src: '/images/3d/icon-trash-bin.webp',
    className: 'bottom-[6%] left-[23%] md:left-[24%] lg:left-[25%] w-30 sm:w-34 md:w-40 lg:w-46 xl:w-52',
    enterDelay: 180,
    ambientClass: 'hero-ambient-bin',
  },
  // Small leaf — lower-center (scale preserved)
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'bottom-[15%] left-[39%] md:left-[40%] w-6 md:w-7 lg:w-8 opacity-85',
    enterDelay: 200,
    ambientClass: 'hero-ambient-leaf-b',
  },
  // Sprout — lower-right-center area (scale preserved)
  {
    src: '/images/3d/icon-sprout.png.webp',
    className: 'bottom-[15%] left-[55%] md:left-[56%] w-9 md:w-10 lg:w-12 xl:w-14',
    enterDelay: 180,
    ambientClass: 'hero-ambient-sprout-a',
  },
  // Earth — lower-right corner, major decorative anchor (+12% scale)
  {
    src: '/images/3d/icon-earth.webp',
    className: 'bottom-[5%] right-[11%] xl:right-[12%] w-36 sm:w-44 md:w-54 lg:w-64 xl:w-72',
    enterDelay: 140,
    ambientClass: 'hero-ambient-earth',
  },
]

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

        /* --- Ambient Floating Animations (Clearly Visible, Organic & Elegant) --- */
        @keyframes hero-float-sun {
          0%, 100% {
            transform: translateY(0) rotate(-1.5deg);
          }
          50% {
            transform: translateY(-11px) rotate(1.5deg);
          }
        }

        @keyframes hero-float-recycle-left {
          0%, 100% {
            transform: translateY(0) rotate(1deg);
          }
          50% {
            transform: translateY(-10px) rotate(-1.5deg);
          }
        }

        @keyframes hero-float-recycle-right {
          0%, 100% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-9px) rotate(1.5deg);
          }
        }

        @keyframes hero-float-bin {
          0%, 100% {
            transform: translateY(0) rotate(-0.5deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.8deg);
          }
        }

        @keyframes hero-float-earth {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes hero-float-monstera {
          0%, 100% {
            transform: translateY(0) rotate(1.5deg);
          }
          50% {
            transform: translateY(-9px) rotate(-2.5deg);
          }
        }

        @keyframes hero-float-leaf-a {
          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-8px) rotate(3deg);
          }
        }

        @keyframes hero-float-leaf-b {
          0%, 100% {
            transform: translateY(0) rotate(2.5deg);
          }
          50% {
            transform: translateY(-7px) rotate(-2.5deg);
          }
        }

        @keyframes hero-float-sprout-a {
          0%, 100% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-7px) rotate(1.5deg);
          }
        }

        @keyframes hero-float-sprout-b {
          0%, 100% {
            transform: translateY(0) rotate(1deg);
          }
          50% {
            transform: translateY(-8px) rotate(-1.5deg);
          }
        }

        .hero-ambient-sun {
          animation: hero-float-sun 5.4s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-recycle-left {
          animation: hero-float-recycle-left 6.0s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-recycle-right {
          animation: hero-float-recycle-right 5.2s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-bin {
          animation: hero-float-bin 5.8s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-earth {
          animation: hero-float-earth 6.8s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-monstera {
          animation: hero-float-monstera 5.5s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-leaf-a {
          animation: hero-float-leaf-a 4.6s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-leaf-b {
          animation: hero-float-leaf-b 5.2s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-sprout-a {
          animation: hero-float-sprout-a 4.9s ease-in-out infinite;
          will-change: transform;
        }

        .hero-ambient-sprout-b {
          animation: hero-float-sprout-b 6.0s ease-in-out infinite;
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
        {DECORATIVE_OBJECTS.map((obj, i) => (
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

      {/* Mobile: minimal decorative set to avoid clutter */}
      <div className="block md:hidden" aria-hidden="true">
        <div
          className="absolute top-8 left-3 w-20 pointer-events-none select-none hero-enter-object"
          style={{ animationDelay: '80ms' }}
        >
          <img
            src="/images/3d/icon-sun.webp"
            alt=""
            className="w-full h-auto drop-shadow-sm pointer-events-none select-none hero-ambient-sun"
            style={{ animationDelay: '830ms' }}
            draggable={false}
          />
        </div>
        <div
          className="absolute top-6 right-3 w-16 pointer-events-none select-none hero-enter-object"
          style={{ animationDelay: '120ms' }}
        >
          <img
            src="/images/3d/icon-leaf-monstera.webp"
            alt=""
            className="w-full h-auto drop-shadow-sm pointer-events-none select-none hero-ambient-monstera"
            style={{ animationDelay: '870ms' }}
            draggable={false}
          />
        </div>
        <div
          className="absolute bottom-10 left-5 w-16 pointer-events-none select-none hero-enter-object"
          style={{ animationDelay: '160ms' }}
        >
          <img
            src="/images/3d/icon-trash-bin.webp"
            alt=""
            className="w-full h-auto drop-shadow-sm pointer-events-none select-none hero-ambient-bin"
            style={{ animationDelay: '910ms' }}
            draggable={false}
          />
        </div>
        <div
          className="absolute bottom-8 right-4 w-22 pointer-events-none select-none hero-enter-object"
          style={{ animationDelay: '140ms' }}
        >
          <img
            src="/images/3d/icon-earth.webp"
            alt=""
            className="w-full h-auto drop-shadow-sm pointer-events-none select-none hero-ambient-earth"
            style={{ animationDelay: '890ms' }}
            draggable={false}
          />
        </div>
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-10 pb-28 md:pt-12 md:pb-32 text-center -translate-y-2 md:-translate-y-4">
        {/* Headline — balanced desktop scale (reduced ~10% from previous, dominant & on one line) */}
        <h1 className="hero-reveal-headline font-display text-primary text-3xl sm:text-4xl md:text-[3.125rem] lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.14] tracking-tight whitespace-nowrap mb-3 md:mb-3.5">
          Temukan. Peduli. Bergerak.
        </h1>

        {/* Sub-headline: exactly 2 lines on desktop */}
        <p className="hero-reveal-paragraph font-body text-primary/70 text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed max-w-[20rem] sm:max-w-md md:max-w-[36rem] lg:max-w-[39rem] mb-5 md:mb-6">
          Temukan masalah sampah di sekitarmu, pahami kondisinya, dan ambil
          langkah yang bisa kamu lakukan bersama ekosistem lingkungan lokal.
        </p>

        {/* CTA Buttons */}
        <div className="hero-reveal-cta flex items-center gap-3.5 sm:gap-4 flex-wrap justify-center">
          {/* Primary: Laporkan Sampah */}
          <Link
            to="/lapor"
            className="inline-flex items-center gap-2 h-11 px-6 sm:px-7 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Camera icon (inline SVG — no extra dependency) */}
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
            className="inline-flex items-center h-11 px-6 sm:px-7 rounded-full bg-white/70 text-primary text-sm font-semibold border border-primary hover:bg-primary/5 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
          >
            Jelajahi Peta
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

