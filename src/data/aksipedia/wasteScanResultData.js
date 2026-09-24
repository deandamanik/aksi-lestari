/**
 * Data definitions for Hasil Identifikasi Sampah (PET Plastic Bottle),
 * 4 Handling Steps, and Reuse Ideas.
 */

export const DEFAULT_SCAN_RESULT = {
  category: 'Plastik',
  material: 'PET (Polyethylene Terephthalate)',
  code: '1',
  title: 'Botol Plastik Kemasan (PET)',
  timeString: 'Hari ini, 10:24 WIB',
  verified: true,
  description:
    'Botol PET merupakan kemasan plastik transparan yang umum digunakan untuk minuman botol sekali pakai. Material ini memiliki nilai daur ulang tinggi jika dalam kondisi bersih dan kering.',
  physicalCharacteristics:
    'Ringan, kedap cairan, mudah ditekan/remas, serta memiliki simbol panduan daur ulang berbentuk angka 1 di bagian dasar wadah.',
  prototypeNotice:
    'Hasil identifikasi merupakan bantuan simulasi prototipe dan dapat diverifikasi kembali dengan melihat kode pada bagian bawah kemasan.',
  version: 'AksiPedia v2.1',
}

export const HANDLING_STEPS = [
  {
    step: 1,
    title: 'Kosongkan Isi',
    description:
      'Pastikan tidak ada sisa cairan atau partikel makanan yang tertinggal di dalam botol.',
    tag: 'Cegah Pembusukan',
    iconType: 'trash',
  },
  {
    step: 2,
    title: 'Bilas Bersih',
    description:
      'Bilas bagian dalam dengan sedikit air agar tidak mengundang bau tidak sedap atau serangga.',
    tag: 'Higienis & Kering',
    iconType: 'droplets',
  },
  {
    step: 3,
    title: 'Remas / Pipihkan',
    description:
      'Tekan botol untuk mengurangi volume udara dan menghemat ruang penyimpanan wadah sampah.',
    tag: 'Hemat Ruang 70%',
    iconType: 'compress',
  },
  {
    step: 4,
    title: 'Pisahkan Label',
    description:
      'Lepaskan tutup botol dan segel plastik label jika memungkinkan untuk pemilahan daur ulang optimal.',
    tag: 'Pilah Tutup & Botol',
    iconType: 'tag',
  },
]

export const REUSE_IDEAS = [
  {
    id: 1,
    badge: 'Rekomendasi Utama',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    title: 'Pot Tanaman Hidroponik Sederhana',
    description:
      'Manfaatkan badan botol yang dipotong dua sebagai wadah sumbu kain flanel untuk tanaman herba atau sayuran dapur seperti seledri dan kangkung.',
    time: '15 Menit',
    difficulty: 'Tingkat: Mudah',
    iconType: 'sprout',
  },
  {
    id: 2,
    badge: 'Peralatan Rumah',
    badgeClass: 'bg-stone-100 text-stone-700 border-stone-200',
    title: 'Wadah Penyimpanan Perkakas Kecil',
    description:
      'Potong bagian atas botol setinggi 8-10 cm untuk membuat wadah transparan rapi penyimpan baut, paku, klip kertas, atau alat tulis meja kerja.',
    time: '5 Menit',
    difficulty: 'Tingkat: Sangat Mudah',
    iconType: 'wrench',
  },
  {
    id: 3,
    badge: 'Dapur & Sanitasi',
    badgeClass: 'bg-stone-100 text-stone-700 border-stone-200',
    title: 'Corong Tuang Rumah Tangga',
    description:
      'Potong bagian leher botol (ujung atas) sekitar 7 cm untuk dijadikan corong cairan serbaguna saat mengisi ulang sabun cuci piring atau minyak.',
    time: '3 Menit',
    difficulty: 'Tingkat: Instan',
    iconType: 'funnel',
  },
]

export const LEARN_MORE_BANNER_DATA = {
  title: 'Ingin Memahami Lebih Lanjut?',
  description:
    'Pelajari kode jenis plastik 1–7 dan dampak limbah kemasan di Indonesia melalui panduan singkat 3 menit di AksiPedia.',
  ctaText: 'Pelajari Modul',
}
