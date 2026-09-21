/**
 * Guidance data for the Mandiri (self-handling) flow.
 *
 * Structured simply to allow reusability across different waste categories.
 * Default category: 'plastik' (Botol Plastik Kemasan).
 */

export const MANDIRI_GUIDANCE_DATA = {
  plastik: {
    safetyNote: {
      title: 'Catatan Keamanan',
      description:
        'Pastikan area sekitar aman, gunakan pelindung bila tersedia, dan jangan menangani benda tajam atau cairan yang tidak dikenal.',
    },
    stepsSection: {
      title: 'Langkah Penanganan Mandiri',
      subtitle: 'Selesaikan urutan ini secara berurutan di lokasi temuan.',
      badgeText: '4 tahap praktis',
      steps: [
        {
          number: '01',
          title: 'Amankan Area Sekitar',
          category: 'Persiapan',
          description:
            'Periksa kondisi pijakan, arus kendaraan atau pejalan kaki, serta pastikan tidak ada benda tajam atau gangguan lain di sekitar temuan.',
        },
        {
          number: '02',
          title: 'Gunakan Pelindung Sederhana',
          category: 'Perlindungan',
          description:
            'Gunakan sarung tangan bila tersedia, terutama jika botol kotor, rusak, atau berada di area yang berisiko.',
        },
        {
          number: '03',
          title: 'Kumpulkan & Pisahkan Botol PET',
          category: 'Pemungutan',
          description:
            'Ambil botol satu per satu, jauhkan dari benda berbahaya, lalu kelompokkan bersama plastik kering yang sejenis.',
        },
        {
          number: '04',
          title: 'Pindahkan ke Tempat yang Sesuai',
          category: 'Penyelesaian',
          description:
            'Masukkan ke wadah pengumpulan plastik atau tempat sampah yang sesuai dan pastikan area asal temuan tetap rapi.',
        },
      ],
      documentationHelper: {
        title: 'Setelah selesai',
        description:
          'Ambil foto kondisi setelah penanganan untuk melanjutkan ke langkah berikutnya.',
      },
    },
  },
}

/**
 * Helper to fetch guidance content by category key, falling back safely to 'plastik'.
 */
export function getMandiriGuidanceData(categoryKey) {
  return MANDIRI_GUIDANCE_DATA[categoryKey] || MANDIRI_GUIDANCE_DATA.plastik
}
