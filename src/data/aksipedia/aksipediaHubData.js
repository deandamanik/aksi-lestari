/**
 * Data definitions for Aksipedia Hub (Edukasi Sampah & Modul Pembelajaran).
 */

export const HUB_HERO_CONTENT = {
  badge: 'AKSIPEDIA - PUSAT PENGETAHUAN SAMPAH',
  titleLine1: 'Kenali Sampah.',
  titleLine2: 'Pahami. Tentukan Aksinya.',
  description:
    'AksiPedia membantumu mengenali jenis sampah, memahami cara penanganannya secara mendalam, dan belajar mengambil aksi nyata yang tepat untuk lingkungan sekitarmu.',
}

export const SCAN_FEATURE_INFO = {
  badgeCategory: 'FITUR UTAMA',
  badgeSub: 'Kamera Cerdas',
  title: 'Scan Sampah',
  description:
    'Foto sampahmu untuk mengenali jenis dan materialnya, lalu lihat cara penanganan yang sesuai secara instan dan tepat guna.',
  steps: [
    { number: '1', label: 'Foto' },
    { number: '2', label: 'Kenali' },
    { number: '3', label: 'Tangani' },
  ],
  ctaText: 'Mulai Scan',
  disclaimer: 'Hasil identifikasi bersifat bantuan/simulasi prototipe.',
  imageBadge: 'Mode Deteksi Lapangan',
}

export const LEARNING_MODULES_DATA = {
  badge: 'JALUR EDUKASI TERPADU',
  heading: 'Modul Pembelajaran',
  subheading:
    'Pelajari sampah dan lingkungan melalui materi singkat terstruktur yang bisa dilanjutkan ke kuis interaktif.',
  seeAllText: 'Lihat Semua Modul',
  featuredModule: {
    id: 'modul-1',
    category: 'Dasar Pemilahan',
    readTime: '3 menit baca',
    title: 'Mengenal Jenis Sampah & Karakter Material',
    description:
      'Panduan komprehensif membedakan polimer plastik bernilai daur ulang tinggi, residu berlapis (multilaminate), dan serat pulp organik agar tidak mencemari alur daur ulang lokal.',
    interactiveFeature: 'Termasuk Latihan Interaktif',
    ctaLabel: 'Buka Modul',
  },
  secondaryModules: [
    {
      id: 'modul-2',
      category: 'PRAKTIK DOMESTIK',
      readTime: '4 menit',
      title: 'Memilah Sampah Rumah Tangga dengan Benar',
      description:
        'Tata cara 3 ember dasar di dapur untuk mengamankan sampah organik sebelum berbau dan membusuk bersama anorganik.',
      ctaLabel: 'Baca Ringkasan',
    },
    {
      id: 'modul-3',
      category: 'EKOSISTEM & DAMPAK',
      readTime: '5 menit',
      title: 'Dampak Sampah Plastik terhadap Ekosistem Lokal',
      description:
        'Jejak mikroplastik pada ekosistem aliran sungai sub-DAS di perkotaan Indonesia dan risiko biologisnya.',
      ctaLabel: 'Baca Ringkasan',
    },
  ],
}

export const LEARNING_PROGRESS_DATA = {
  title: 'Progress Belajar Anda',
  detail: '3 dari 8 modul selesai · Skor pemahaman rata-rata 88%',
  percentage: 37,
  continueLabel: 'Lanjutkan: Memilah Sampah dengan Benar',
}

export const HUB_CLOSING_CTA_DATA = {
  tag: 'MULAI HARI INI',
  heading: 'Kenali Sampah di Sekitarmu',
  subheading:
    'Perubahan besar berakar dari ketelitian kecil. Mulai dari satu sampah yang kamu temukan di sekitarmu hari ini.',
  primaryCta: 'Mulai Scan',
  secondaryCta: 'Gabung Relawan',
}
