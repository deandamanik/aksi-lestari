/**
 * Decorative 3D floating objects configuration for Komunitas Hero Section.
 * Aligned with Beranda and AksiPedia 3D visual language, ambient float animations, and responsive scaling.
 */

export const KOMUNITAS_HERO_DESKTOP_OBJECTS = [
  // Sun — upper-left backdrop anchor
  {
    src: '/images/3d/icon-sun.webp',
    alt: '',
    className: 'top-[4%] left-[2%] lg:left-[3%] xl:left-[4.5%] w-24 sm:w-32 lg:w-38 xl:w-44 opacity-85',
    enterDelay: 60,
    ambientClass: 'hero-ambient-sun',
  },
  // Small leaf — upper-left accent
  {
    src: '/images/3d/icon-leaf.webp',
    alt: '',
    className: 'top-[22%] left-[17%] lg:left-[20%] w-6 md:w-7 -rotate-12 opacity-80',
    enterDelay: 90,
    ambientClass: 'hero-ambient-leaf-a',
  },
  // Monstera leaf — upper-right prominent anchor
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    alt: '',
    className: 'top-[6%] right-[2%] sm:right-[3%] lg:right-[4%] xl:right-[5%] w-20 sm:w-26 lg:w-30 xl:w-34 opacity-90',
    enterDelay: 80,
    ambientClass: 'hero-ambient-monstera',
  },
  // Sprout — upper-right side
  {
    src: '/images/3d/icon-sprout.png.webp',
    alt: '',
    className: 'top-[24%] right-[14%] lg:right-[16%] xl:right-[18%] w-10 sm:w-12 lg:w-14 opacity-80',
    enterDelay: 120,
    ambientClass: 'hero-ambient-sprout-a',
  },
  // Small leaf — upper-right accent
  {
    src: '/images/3d/icon-leaf.webp',
    alt: '',
    className: 'top-[14%] right-[24%] lg:right-[26%] w-5 md:w-6 rotate-45 opacity-75',
    enterDelay: 140,
    ambientClass: 'hero-ambient-leaf-b',
  },
]

export const KOMUNITAS_HERO_MOBILE_OBJECTS = [
  // Sun — upper-left compact
  {
    src: '/images/3d/icon-sun.webp',
    alt: '',
    className: 'top-[4%] left-[-2%] w-20 opacity-75',
    enterDelay: 60,
    ambientClass: 'hero-ambient-sun',
    ambientDelay: 750,
  },
  // Monstera leaf — upper-right compact
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    alt: '',
    className: 'top-[5%] right-[-2%] w-18 opacity-80',
    enterDelay: 80,
    ambientClass: 'hero-ambient-monstera',
    ambientDelay: 800,
  },
]
