/**
 * Action choices data for Step 03: Pilih Aksi (/lapor/aksi).
 *
 * Outlines the two real environmental actions available to the citizen:
 * 1. 'laporkan' — for public space waste requiring authority/community collection
 * 2. 'mandiri'  — for direct, safe cleanup by the citizen
 */

export const ACTION_OPTIONS = [
  {
    id: 'laporkan',
    title: 'Laporkan Sampah',
    description: 'Kirim temuan ini agar tercatat dan dapat ditindaklanjuti.',
    suitableCriteria: [
      'Sampah berada di ruang publik',
      'Jumlahnya banyak atau sulit dipindahkan',
      'Penanganannya membutuhkan pihak lain',
    ],
    nextStepNote: 'Laporan akan dilanjutkan ke proses penanganan.',
  },
  {
    id: 'mandiri',
    title: 'Tangani Sendiri',
    description: 'Kalau aman, kamu bisa ikut menangani sampah ini secara langsung.',
    suitableCriteria: [
      'Sampah mudah dijangkau',
      'Volumenya ringan',
      'Tidak terdapat risiko benda tajam atau bahan berbahaya',
    ],
    nextStepNote: 'Kamu akan mencatat hasil penanganan setelah selesai.',
  },
]
