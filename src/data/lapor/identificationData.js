/**
 * Static mock identification dataset for Lapor Step 02 (Kenali).
 *
 * Identification content is intentionally isolated in this static data module
 * so a future real vision model or backend classification API can replace it
 * without modifying the Step 02 presentation layer.
 */

export const IDENTIFICATION_DATA = {
  plastik: {
    category: 'plastik',
    label: 'Botol Plastik Kemasan',
    categoryLabel: 'Plastik',
    typeLabel: 'Sekali Pakai',
    materialLabel: 'PET / Polyethylene',
    description:
      'Wadah plastik ringan yang umumnya digunakan untuk minuman dan produk kemasan sekali pakai.',
    confidenceLevel: 'Tinggi',
    confidenceNote: 'Perkiraan berdasarkan ciri visual pada foto.',
    characteristics: [
      { label: 'Bentuk', value: 'Botol Kemasan' },
      { label: 'Material', value: 'Plastik (PET)' },
      { label: 'Penggunaan', value: 'Sekali Pakai' },
    ],
    attentionLevel: 'Perlu Perhatian',
    attentionMessage:
      'Jika dibuang sembarangan, material ini dapat bertahan lama di lingkungan dan berisiko menyumbat aliran air di area drainase.',
    environmentalImpact: [
      'Sulit terurai secara alami dan dapat bertahan lama di lingkungan.',
      'Berpotensi terbawa ke aliran sungai atau drainase perkotaan.',
      'Dapat dipilah untuk disalurkan ke jalur daur ulang yang sesuai.',
    ],
    recommendations: [
      {
        number: '1',
        title: 'Pemisahan Material',
        description:
          'Pisahkan botol plastik dari sampah organik, tanah, atau kotoran basah lainnya agar memudahkan daur ulang.',
      },
      {
        number: '2',
        title: 'Keamanan Penanganan Mandiri',
        description:
          'Pastikan kondisi aman dan kenakan sarung tangan pelindung bila Anda berniat membersihkan atau memindahkan secara mandiri.',
      },
      {
        number: '3',
        title: 'Penyaluran Berkelanjutan',
        description:
          'Arahkan ke titik bank sampah terdekat untuk didaur ulang, atau laporkan untuk dijadwalkan pengangkutan instansi kebersihan.',
      },
    ],
    safetyNotice:
      'Utamakan keselamatan: Jangan tangani sendiri jika terdapat pecahan beling, jarum suntik, kabel terbuka, atau indikasi kontaminasi limbah B3.',
    simulatedDisclosure:
      'Hasil ini merupakan perkiraan panduan awal berbasis citra visual untuk membantu pemahaman, dan dapat disesuaikan dengan kondisi riil di lapangan. Analisis bersifat simulasi untuk demonstrasi.',
  },

  organik: {
    category: 'organik',
    label: 'Sisa Makanan & Sampah Dapur',
    categoryLabel: 'Organik',
    typeLabel: 'Mudah Terurai',
    materialLabel: 'Biomassa / Sisa Nabati',
    description:
      'Material organik sisa konsumsi rumah tangga atau pasar yang cepat membusuk jika dibiarkan di ruang terbuka.',
    confidenceLevel: 'Tinggi',
    confidenceNote: 'Perkiraan berdasarkan tekstur dan konteks visual pada foto.',
    characteristics: [
      { label: 'Bentuk', value: 'Campuran Lembap' },
      { label: 'Material', value: 'Organik Nabati' },
      { label: 'Penggunaan', value: 'Sisa Konsumsi' },
    ],
    attentionLevel: 'Perlu Penanganan Cepat',
    attentionMessage:
      'Sampah organik basah yang menumpuk di saluran atau area terbuka mengundang vektor penyakit serta menimbulkan bau tak sedap.',
    environmentalImpact: [
      'Cepat membusuk dan memicu lindi yang dapat mencemari air tanah bila tidak dikelola.',
      'Menghasilkan gas rumah kaca bila menumpuk padat di tempat pembuangan liar.',
      'Dapat diolah menjadi kompos bermanfaat bila segera dipilah secara terpisah.',
    ],
    recommendations: [
      {
        number: '1',
        title: 'Pemisahan Kering & Basah',
        description:
          'Tiriskan air dan pisahkan dari plastik pembungkus sebelum dimasukkan ke wadah pengomposan.',
      },
      {
        number: '2',
        title: 'Pengomposan Mandiri',
        description:
          'Manfaatkan komposter rumah tangga atau lubang biopori di pekarangan bila volume masih wajar.',
      },
      {
        number: '3',
        title: 'Penyaluran Terjadwal',
        description:
          'Serahkan ke petugas kebersihan dalam keadaan tertutup rapat agar tidak menimbulkan bau di permukiman.',
      },
    ],
    safetyNotice:
      'Gunakan sarung tangan saat memilah sampah organik basah untuk menghindari kontak bakteri pembusuk.',
    simulatedDisclosure:
      'Hasil ini merupakan perkiraan panduan awal berbasis citra visual untuk membantu pemahaman, dan dapat disesuaikan dengan kondisi riil di lapangan. Analisis bersifat simulasi untuk demonstrasi.',
  },
}

export function getIdentificationData(categoryKey) {
  return IDENTIFICATION_DATA[categoryKey] || IDENTIFICATION_DATA.plastik
}
