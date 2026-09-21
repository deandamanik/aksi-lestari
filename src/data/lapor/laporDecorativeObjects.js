/**
 * Decorative 3D floating objects configuration for Lapor Step 1.
 * Matches the approved visual reference composition.
 */

export const LAPOR_DESKTOP_OBJECTS = [
  // Sun — top-left anchor
  {
    src: '/images/3d/icon-sun.webp',
    alt: 'Dekorasi Matahari 3D',
    className: 'top-[12%] left-[3%] sm:left-[5%] lg:left-[6%] xl:left-[8%] w-28 sm:w-36 lg:w-44 xl:w-52 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-sun',
  },
  // Recycle — mid-left anchor
  {
    src: '/images/3d/icon-recycle.webp',
    alt: 'Dekorasi Daur Ulang 3D',
    className: 'top-[37%] left-[4%] sm:left-[6%] lg:left-[7%] xl:left-[8.5%] w-18 sm:w-22 lg:w-28 xl:w-32 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-recycle',
  },
  // Sprout — lower-left
  {
    src: '/images/3d/icon-sprout.png.webp',
    alt: 'Dekorasi Tunas 3D',
    className: 'top-[57%] left-[5%] sm:left-[7%] lg:left-[8%] xl:left-[9.5%] w-10 sm:w-12 lg:w-14 xl:w-16 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-sprout-left',
  },
  // Trash Bin — bottom-left grounded anchor
  {
    src: '/images/3d/icon-trash-bin.webp',
    alt: 'Dekorasi Tempat Sampah 3D',
    className: 'bottom-[4%] left-[11%] sm:left-[13%] lg:left-[15%] xl:left-[17%] w-24 sm:w-28 lg:w-36 xl:w-42 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-bin',
  },
  // Monstera Leaf — top-right anchor
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    alt: 'Dekorasi Daun Monstera 3D',
    className: 'top-[14%] right-[4%] sm:right-[6%] lg:right-[7%] xl:right-[9%] w-20 sm:w-24 lg:w-30 xl:w-36 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-monstera',
  },
  // Sprout on soil — mid-right
  {
    src: '/images/3d/icon-sprout.png.webp',
    alt: 'Dekorasi Tunas Kanan 3D',
    className: 'top-[36%] right-[5%] sm:right-[7%] lg:right-[8%] xl:right-[10%] w-12 sm:w-14 lg:w-18 xl:w-20 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-sprout-right',
  },
  // Earth Globe — bottom-right grounded anchor
  {
    src: '/images/3d/icon-earth.webp',
    alt: 'Dekorasi Bumi 3D',
    className: 'bottom-[3%] right-[6%] sm:right-[8%] lg:right-[10%] xl:right-[12%] w-30 sm:w-38 lg:w-48 xl:w-56 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-earth',
  },
  // Accent Leaf — upper-left between Sun and Heading
  {
    src: '/images/3d/icon-leaf.webp',
    alt: 'Dekorasi Daun Kecil',
    className: 'top-[16%] left-[21%] lg:left-[23%] xl:left-[24%] w-6 md:w-7 -rotate-12 opacity-85 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-leaf-a',
  },
  // Accent Leaf — mid-right
  {
    src: '/images/3d/icon-leaf.webp',
    alt: 'Dekorasi Daun Kecil',
    className: 'top-[53%] right-[11%] lg:right-[13%] xl:right-[14%] w-5 md:w-6 rotate-45 opacity-80 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-leaf-b',
  },
]

export const LAPOR_MOBILE_OBJECTS = [
  // Upper left: Sun (scaled down, high visibility)
  {
    src: '/images/3d/icon-sun.webp',
    alt: 'Dekorasi Matahari 3D',
    className: 'top-[9%] left-[3%] w-16 sm:w-20 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-sun',
  },
  // Upper right: Leaf Monstera
  {
    src: '/images/3d/icon-leaf-monstera.webp',
    alt: 'Dekorasi Daun Monstera 3D',
    className: 'top-[9%] right-[3%] w-14 sm:w-18 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-monstera',
  },
  // Bottom left: Trash bin
  {
    src: '/images/3d/icon-trash-bin.webp',
    alt: 'Dekorasi Tempat Sampah 3D',
    className: 'bottom-[4%] left-[4%] w-18 sm:w-22 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-bin',
  },
  // Bottom right: Earth
  {
    src: '/images/3d/icon-earth.webp',
    alt: 'Dekorasi Bumi 3D',
    className: 'bottom-[3%] right-[3%] w-22 sm:w-28 pointer-events-none select-none',
    ambientClass: 'lapor-ambient-earth',
  },
]
