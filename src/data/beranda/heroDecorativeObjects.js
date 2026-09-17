/**
 * Decorative 3D floating objects configuration for Beranda Hero Section.
 * Contains responsive positioning, scale hierarchy, entrance delays, and ambient float classes.
 */

export const HERO_DESKTOP_OBJECTS = [
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
  // Small leaf — upper-left/upper-middle accent
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[14%] left-[31%] xl:left-[32%] w-6 md:w-7 lg:w-8 xl:w-9 -rotate-12 opacity-90',
    enterDelay: 90,
    ambientClass: 'hero-ambient-leaf-a',
  },
  // Small leaf — upper-right accent
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[21%] right-[32%] xl:right-[33%] w-6 md:w-7 lg:w-8 xl:w-9 rotate-12 opacity-85',
    enterDelay: 150,
    ambientClass: 'hero-ambient-leaf-b',
  },
  // Monstera leaf — upper-right, clearly visible & moderately large
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    className: 'top-[16%] right-[11%] xl:right-[12%] w-18 sm:w-20 md:w-24 lg:w-28 xl:w-32',
    enterDelay: 100,
    ambientClass: 'hero-ambient-monstera',
  },
  // Sprout — upper-right side of headline
  {
    src: '/images/3d/icon-sprout.png.webp',
    className: 'top-[37%] right-[13%] lg:right-[14%] xl:right-[15%] w-13 md:w-16 lg:w-18 xl:w-22',
    enterDelay: 170,
    ambientClass: 'hero-ambient-sprout-a',
  },
  // Recycle — right-middle/lower-right (+8% scale)
  {
    src: '/images/3d/icon-recycle.webp',
    className: 'top-[58%] right-[21%] md:right-[22%] lg:right-[23%] w-20 md:w-24 lg:w-28 xl:w-32',
    enterDelay: 210,
    ambientClass: 'hero-ambient-recycle-right',
  },
  // Small leaf — right edge accent
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[59%] right-[8%] xl:right-[9%] w-5 md:w-6 lg:w-7 rotate-45 opacity-80',
    enterDelay: 230,
    ambientClass: 'hero-ambient-leaf-b',
  },
  // Sprout — lower-left region
  {
    src: '/images/3d/icon-sprout.png.webp',
    className: 'bottom-[18%] left-[12%] xl:left-[13%] w-10 md:w-12 lg:w-14 xl:w-16',
    enterDelay: 160,
    ambientClass: 'hero-ambient-sprout-b',
  },
  // Small leaf — lower-left accent
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[60%] left-[18%] xl:left-[19%] w-6 md:w-7 lg:w-8 -rotate-45 opacity-80',
    enterDelay: 190,
    ambientClass: 'hero-ambient-leaf-a',
  },
  // Trash bin — lower-left-center, prominent secondary anchor (+18% scale)
  {
    src: '/images/3d/icon-trash-bin.webp',
    className: 'bottom-[6%] left-[23%] md:left-[24%] lg:left-[25%] w-30 sm:w-34 md:w-40 lg:w-46 xl:w-52',
    enterDelay: 180,
    ambientClass: 'hero-ambient-bin',
  },
  // Small leaf — lower-center
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'bottom-[15%] left-[39%] md:left-[40%] w-6 md:w-7 lg:w-8 opacity-85',
    enterDelay: 200,
    ambientClass: 'hero-ambient-leaf-b',
  },
  // Sprout — lower-right-center area
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

export const HERO_MOBILE_OBJECTS = [
  // Upper Anchor: Sun (top-left)
  {
    src: '/images/3d/icon-sun.webp',
    className: 'top-[8%] left-[4%] w-20 sm:w-24',
    enterDelay: 80,
    ambientClass: 'hero-ambient-sun',
    ambientDelay: 830,
  },
  // Upper Accent: Small Leaf (upper-left/center negative space)
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[15%] left-[26%] w-6 -rotate-12 opacity-80',
    enterDelay: 100,
    ambientClass: 'hero-ambient-leaf-a',
    ambientDelay: 850,
  },
  // Upper Anchor: Monstera / Large Leaf (top-right)
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    className: 'top-[8%] right-[4%] w-16 sm:w-20',
    enterDelay: 120,
    ambientClass: 'hero-ambient-monstera',
    ambientDelay: 870,
  },
  // Side Accent: Small Leaf (mid-right side negative space)
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'top-[44%] right-[4%] sm:right-[6%] w-5 sm:w-6 rotate-12 opacity-75',
    enterDelay: 140,
    ambientClass: 'hero-ambient-leaf-a',
    ambientDelay: 890,
  },
  // Mid-Lower Accent: Single Recycle Icon (transition zone below CTA, left)
  {
    src: '/images/3d/icon-recycle.webp',
    className: 'bottom-[18.5%] left-[10%] sm:left-[14%] w-11 sm:w-13',
    enterDelay: 170,
    ambientClass: 'hero-ambient-recycle-left',
    ambientDelay: 920,
  },
  // Mid-Lower Accent: Small Leaf (transition zone below CTA, right)
  {
    src: '/images/3d/icon-leaf.webp',
    className: 'bottom-[19.5%] right-[11%] sm:right-[15%] w-6 sm:w-7 rotate-45 opacity-85',
    enterDelay: 190,
    ambientClass: 'hero-ambient-leaf-b',
    ambientDelay: 940,
  },
  // Bottom Anchor: Trash Bin (grounded lower anchor, brought slightly upward)
  {
    src: '/images/3d/icon-trash-bin.webp',
    className: 'bottom-[7.5%] left-[8%] sm:bottom-[7%] sm:left-[11%] w-22 sm:w-26',
    enterDelay: 180,
    ambientClass: 'hero-ambient-bin',
    ambientDelay: 930,
  },
  // Bottom Anchor: Earth (grounded lower anchor, brought slightly upward)
  {
    src: '/images/3d/icon-earth.webp',
    className: 'bottom-[5.5%] right-[7%] sm:bottom-[5.5%] sm:right-[11%] w-28 sm:w-32',
    enterDelay: 160,
    ambientClass: 'hero-ambient-earth',
    ambientDelay: 910,
  },
]
