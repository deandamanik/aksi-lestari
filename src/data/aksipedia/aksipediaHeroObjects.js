/**
 * Decorative 3D floating objects configuration for AksiPedia Hero Section.
 * Aligned with Beranda and Lapor 3D visual language, ambient float animations, and responsive scaling.
 */

export const AKSIPEDIA_HERO_DESKTOP_OBJECTS = [
  // Sun — upper-left anchor
  {
    src: '/images/3d/icon-sun.webp',
    alt: 'Dekorasi Matahari 3D',
    className: 'top-[8%] left-[2%] sm:left-[3%] lg:left-[4%] xl:left-[5.5%] w-24 sm:w-32 lg:w-40 xl:w-48',
    enterDelay: 60,
    ambientClass: 'hero-ambient-sun',
  },
  // Small leaf — upper-left accent near headline
  {
    src: '/images/3d/icon-leaf.webp',
    alt: 'Dekorasi Daun Kecil',
    className: 'top-[22%] left-[16%] lg:left-[19%] xl:left-[21%] w-6 md:w-7 -rotate-12 opacity-85',
    enterDelay: 90,
    ambientClass: 'hero-ambient-leaf-a',
  },
  // Recycle — mid-left anchor
  {
    src: '/images/3d/icon-recycle.webp',
    alt: 'Dekorasi Daur Ulang 3D',
    className: 'top-[54%] left-[2.5%] sm:left-[3.5%] lg:left-[4.5%] xl:left-[5.5%] w-18 sm:w-22 lg:w-26 xl:w-30',
    enterDelay: 120,
    ambientClass: 'hero-ambient-recycle-left',
  },
  // Trash bin — lower-left anchor
  {
    src: '/images/3d/icon-trash-bin.webp',
    alt: 'Dekorasi Tempat Sampah 3D',
    className: 'bottom-[4%] left-[7%] sm:left-[9%] lg:left-[11%] xl:left-[13%] w-20 sm:w-24 lg:w-28 xl:w-32',
    enterDelay: 150,
    ambientClass: 'hero-ambient-bin',
  },
  // Monstera leaf — upper-right anchor
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    alt: 'Dekorasi Daun Monstera 3D',
    className: 'top-[10%] right-[3%] sm:right-[4%] lg:right-[5%] xl:right-[6%] w-20 sm:w-24 lg:w-28 xl:w-34',
    enterDelay: 80,
    ambientClass: 'hero-ambient-monstera',
  },
  // Small leaf — upper-right accent
  {
    src: '/images/3d/icon-leaf.webp',
    alt: 'Dekorasi Daun Kecil',
    className: 'top-[22%] right-[18%] lg:right-[20%] xl:right-[22%] w-6 md:w-7 rotate-12 opacity-80',
    enterDelay: 110,
    ambientClass: 'hero-ambient-leaf-b',
  },
  // Sprout — mid-right edge
  {
    src: '/images/3d/icon-sprout.png.webp',
    alt: 'Dekorasi Tunas 3D',
    className: 'top-[42%] right-[2%] sm:right-[3%] lg:right-[3.5%] xl:right-[4.5%] w-12 sm:w-14 lg:w-16 xl:w-18',
    enterDelay: 140,
    ambientClass: 'hero-ambient-sprout-a',
  },
  // Earth globe — bottom-right grounded anchor
  {
    src: '/images/3d/icon-earth.webp',
    alt: 'Dekorasi Bumi 3D',
    className: 'bottom-[3%] right-[3%] sm:right-[5%] lg:right-[6%] xl:right-[7.5%] w-26 sm:w-34 lg:w-42 xl:w-50',
    enterDelay: 170,
    ambientClass: 'hero-ambient-earth',
  },
  // Small leaf — lower-right accent
  {
    src: '/images/3d/icon-leaf.webp',
    alt: 'Dekorasi Daun Kecil',
    className: 'bottom-[30%] right-[11%] lg:right-[12%] w-5 md:w-6 rotate-45 opacity-75',
    enterDelay: 190,
    ambientClass: 'hero-ambient-leaf-b',
  },
]

export const AKSIPEDIA_HERO_MOBILE_OBJECTS = [
  // Upper Anchor: Sun (top-left)
  {
    src: '/images/3d/icon-sun.webp',
    alt: 'Dekorasi Matahari 3D',
    className: 'top-[8%] left-[4%] w-20 sm:w-24',
    enterDelay: 80,
    ambientClass: 'hero-ambient-sun',
    ambientDelay: 830,
  },
  // Upper Accent: Small Leaf (upper-left/center negative space)
  {
    src: '/images/3d/icon-leaf.webp',
    alt: 'Dekorasi Daun Kecil 3D',
    className: 'top-[15%] left-[26%] w-6 -rotate-12 opacity-80',
    enterDelay: 100,
    ambientClass: 'hero-ambient-leaf-a',
    ambientDelay: 850,
  },
  // Upper Anchor: Monstera / Large Leaf (top-right)
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    alt: 'Dekorasi Daun Monstera 3D',
    className: 'top-[8%] right-[4%] w-16 sm:w-20',
    enterDelay: 120,
    ambientClass: 'hero-ambient-monstera',
    ambientDelay: 870,
  },
  // Side Accent: Small Leaf (mid-right side negative space)
  {
    src: '/images/3d/icon-leaf.webp',
    alt: 'Dekorasi Daun Kecil 3D',
    className: 'top-[44%] right-[4%] sm:right-[6%] w-5 sm:w-6 rotate-12 opacity-75',
    enterDelay: 140,
    ambientClass: 'hero-ambient-leaf-a',
    ambientDelay: 890,
  },
  // Mid-Lower Accent: Single Recycle Icon (transition zone below CTA, left)
  {
    src: '/images/3d/icon-recycle.webp',
    alt: 'Dekorasi Daur Ulang 3D',
    className: 'bottom-[18.5%] left-[10%] sm:left-[14%] w-11 sm:w-13',
    enterDelay: 170,
    ambientClass: 'hero-ambient-recycle-left',
    ambientDelay: 920,
  },
  // Mid-Lower Accent: Small Leaf (transition zone below CTA, right)
  {
    src: '/images/3d/icon-leaf.webp',
    alt: 'Dekorasi Daun Kecil 3D',
    className: 'bottom-[19.5%] right-[11%] sm:right-[15%] w-6 sm:w-7 rotate-45 opacity-85',
    enterDelay: 190,
    ambientClass: 'hero-ambient-leaf-b',
    ambientDelay: 940,
  },
  // Bottom Anchor: Trash Bin (grounded lower anchor)
  {
    src: '/images/3d/icon-trash-bin.webp',
    alt: 'Dekorasi Tempat Sampah 3D',
    className: 'bottom-[7.5%] left-[8%] sm:bottom-[7%] sm:left-[11%] w-22 sm:w-26',
    enterDelay: 180,
    ambientClass: 'hero-ambient-bin',
    ambientDelay: 930,
  },
  // Bottom Anchor: Earth (grounded lower anchor)
  {
    src: '/images/3d/icon-earth.webp',
    alt: 'Dekorasi Bumi 3D',
    className: 'bottom-[5.5%] right-[7%] sm:bottom-[5.5%] sm:right-[11%] w-28 sm:w-32',
    enterDelay: 160,
    ambientClass: 'hero-ambient-earth',
    ambientDelay: 910,
  },
]
