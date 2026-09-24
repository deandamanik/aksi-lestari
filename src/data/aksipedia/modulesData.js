/**
 * Centralized Data Architecture for Aksipedia Modules & Quizzes.
 * Designed with editorial clarity, clean typography hierarchy, and zero "AI slop".
 */

export const MODULE_CATEGORIES = [
  'Semua',
  'Jenis Sampah',
  'Pemilahan',
  'Pengelolaan',
  'Dampak Lingkungan',
  'Kebiasaan Hijau',
]

export const CONTINUE_LEARNING_DATA = {
  id: 'memahami-jenis-sampah',
  title: 'Memahami Jenis Sampah',
  partsInfo: '3 dari 5 bagian selesai · ± 5 menit',
  progressPercentage: 60,
  link: '/aksipedia/modul/memahami-jenis-sampah',
}

export const FEATURED_MODULE_DATA = {
  id: 'memahami-jenis-sampah',
  eyebrow: 'MODUL UNGGULAN · SAMPAH · ± 5 MENIT',
  title: 'Mengenal Jenis Sampah & Karakter Material',
  description:
    'Panduan komprehensif membedakan polimer plastik bernilai daur ulang tinggi, residu berlapis (multilaminate), dan serat organik pekarangan tidak bernilai daur ulang lokal.',
  progressLabel: 'Sedang Dipelajari (60%)',
  progressPercentage: 60,
  ctaText: 'Lanjutkan Modul',
  image: '/images/aksipedia/sample-waste.jpg',
  link: '/aksipedia/modul/memahami-jenis-sampah',
}

export const MODULES_LIST = [
  {
    id: 'kenali-sampah-organik-di-rumah',
    category: 'Jenis Sampah',
    meta: 'SAMPAH · ± 4 MENIT',
    status: 'Belum Dimulai',
    isCompleted: false,
    title: 'Kenali Sampah Organik di Rumah',
    description:
      'Teknik pemisahan sisa dapur dan dedaunan pekarangan secara higienis untuk mencegah timbulan gas metana dan bau tak sedap.',
    ctaText: 'Buka Modul',
    link: '/aksipedia/modul/memahami-jenis-sampah',
  },
  {
    id: 'memilah-sampah-rumah-tangga',
    category: 'Pemilahan',
    meta: 'PEMILAHAN · ± 5 MENIT',
    status: 'Belum Dimulai',
    isCompleted: false,
    title: 'Memilah Sampah Rumah Tangga dengan Benar',
    description:
      'Tata cara 3 ember dasar di dapur untuk mengamankan sampah organik sebelum berbau dan membusuk bersama anorganik.',
    ctaText: 'Buka Modul',
    link: '/aksipedia/modul/memahami-jenis-sampah',
  },
  {
    id: 'dasar-daur-ulang-kode-resin',
    category: 'Pengelolaan',
    meta: 'DAUR ULANG · ± 6 MENIT',
    status: 'Belum Dimulai',
    isCompleted: false,
    title: 'Dasar-Dasar Daur Ulang & Kode Resin',
    description:
      'Mengenal simbol angka 1–7 pada plastik kemasan dan rantai sirkularitas material anorganik bernilai ekonomis tinggi.',
    ctaText: 'Buka Modul',
    link: '/aksipedia/modul/memahami-jenis-sampah',
  },
  {
    id: 'kebiasaan-kecil-dampak-besar',
    category: 'Kebiasaan Hijau',
    meta: 'KEBIASAAN HIJAU · ± 4 MENIT',
    status: 'Selesai',
    isCompleted: true,
    title: 'Kebiasaan Kecil, Dampak Besar',
    description:
      'Langkah taktis harian mengurangi penggunaan kemasan sekali pakai di lingkungan pemukiman dan perkantoran.',
    ctaText: 'Baca Lagi',
    link: '/aksipedia/modul/memahami-jenis-sampah',
  },
]

export const MODULE_PROGRESS_FOOTER_DATA = {
  info: 'Progress Belajar Anda: 1 dari 8 modul selesai · Skor pemahaman rata-rata 88%',
  ctaText: 'Siap menguji pemahaman? Buka Modul Lanjutan →',
  link: '/aksipedia/modul/memahami-jenis-sampah',
}

/**
 * Editorial Article & Interactive Quiz Data for "Memahami Jenis Sampah"
 */
export const DETAILED_MODULES = {
  'memahami-jenis-sampah': {
    id: 'memahami-jenis-sampah',
    moduleNumber: 'MODUL 01',
    category: 'Sampah',
    eyebrow: 'AKSIPEDIA · MODUL 01',
    title: 'Memahami Jenis Sampah',
    description:
      'Kenali berbagai jenis sampah, cara membedakannya secara taktis, dan bagaimana menentukan penanganan yang tepat langsung dari sumbernya di rumah.',
    readTime: '5 Menit Baca',
    sectionsCount: '5 Bagian Materi',
    level: 'Tingkat Pemula',
    progressPercentage: 20,
    progressLabel: '1 dari 5 Bagian Tuntas (20%)',
    sections: [
      {
        id: 'sec-01',
        navLabel: '01 Mengenal Sampah',
        title: '01 Mengenal Sampah dari Sumbernya',
        paragraphs: [
          'Setiap hari, rumah tangga rata-rata menghasilkan 0,7 kilogram timbulan sampah per kapita. Dari jumlah ini, hampir 60 persennya adalah sisa organik basah dari dapur dan sisa makanan yang belum termanfaatkan. Sisanya didominasi kemasan plastik fleksibel, botol minuman sekali pakai, kertas/kardus, serta kemasan berlapis (multilaminate) seperti kotak susu dan bungkus bumbu instan.',
          'Kunci dari tata kelola sampah lestari bukanlah seberapa canggih teknologi pemusnahan di tempat pembuangan akhir (TPA), melainkan ketepatan klasifikasi pada detik pertama suatu sisa material lepas dari tangan kita di dapur, ruang makan, atau meja kerja.',
        ],
        image: '/images/aksipedia/module-editorial.jpg',
        imageCaption:
          'Pemilahan di tingkat dapur mencegah kontaminasi residu dan menjaga 90% sampah organik tetap dapat diolah.',
      },
      {
        id: 'sec-02',
        navLabel: '02 Kenali Jenisnya',
        title: '02 Kenali Dua Golongan Karakteristik',
        intro:
          'Secara esensial, semua timbulan sisa padat diklasifikasikan ke dalam dua pilar utama berdasarkan asal muasal dan daya uraian biologisnya di alam:',
        columns: [
          {
            type: 'organik',
            title: 'Organik',
            tagline: 'Mudah terurai secara hayati',
            description:
              'Material hayati yang berasal dari makhluk hidup (tumbuhan maupun hewan). Memiliki kadar air tinggi dan cepat mengalami proses pembusukan alami oleh mikroorganisme tanah.',
            examplesTitle: 'Contoh Karakteristik:',
            examples:
              'Sisa buah, sayuran, daun gugur, sisa kopi, kulit telur, tulang ikan kecil. Tidak termasuk minyak goreng bekas.',
          },
          {
            type: 'anorganik',
            title: 'Anorganik',
            tagline: 'Tahan lama & bernilai sirkular',
            description:
              'Material sintetis buatan pabrik non-hayati. Tidak dapat membusuk secara biologis namun memiliki nilai sirkularitas tinggi jika kondisinya bersih dan kering saat dipilah.',
            examplesTitle: 'Contoh Karakteristik:',
            examples:
              'Botol PET, kaleng aluminium, kardus, wadah kaca, plastik keras HDPE. Pastikan dibilas bersih.',
          },
        ],
      },
      {
        id: 'sec-03',
        navLabel: '03 Membedakannya',
        title: '03 Bagaimana Membedakannya di Keseharian?',
        intro:
          'Saat hendak membuang barang, ajukan pertanyaan sederhana: "Apakah benda ini pernah hidup atau dihasilkan langsung oleh tanaman/hewan?" Jika ya, maka hampir dipastikan material tersebut adalah organik.',
        classificationGuide: {
          title: 'Panduan Klasifikasi Kilat',
          categories: [
            {
              name: 'Organik Kompos',
              colorTheme: 'emerald',
              items: 'Sisa sayur, ampas kopi, kulit buah, nasi basi.',
              treatment: 'Alirkan ke wadah kompos atau biopori.',
            },
            {
              name: 'Anorganik Daur Ulang',
              colorTheme: 'sky',
              items: 'Botol PET, kardus paket, kaleng soda, kertas HVS.',
              treatment: 'Bilas, keringkan, simpan untuk bank sampah.',
            },
            {
              name: 'Residu Non-Daur Ulang',
              colorTheme: 'stone',
              items: 'Sachet berlapis, popok, tisu basah, styrofoam.',
              treatment: 'Wadah abu-abu menuju pemrosesan akhir TPA.',
            },
          ],
        },
        scenarios: [
          {
            number: '1',
            situation: 'Kulit semangka dan ampas perasan jeruk:',
            action: 'Langsung masuk wadah basah kompos dapur.',
          },
          {
            number: '2',
            situation: 'Kotak kardus paket belanja online:',
            action: 'Buka lipatannya hingga pipih, kumpulkan bersama tumpukan kertas kering.',
          },
          {
            number: '3',
            situation: 'Gelas kopi plastik dengan sisa es teh manis:',
            action: 'Buang cairan ke wastafel, bilas sebentar wadah plastiknya, baru masukkan wadah daur ulang.',
          },
          {
            number: '4',
            situation: 'Struk kasir kertas termal (thermal paper):',
            action: 'Masuk ke kategori residu karena mengandung bahan kimia BPA yang merusak bubur kertas daur ulang.',
          },
        ],
      },
      {
        id: 'sec-04',
        navLabel: '04 Apa yang Bisa Dilakukan?',
        title: '04 Apa yang Bisa Kamu Lakukan Sekarang?',
        intro:
          'Memulai perubahan di rumah tidak perlu menunggu tersedianya fasilitas canggih. Tiga kebiasaan taktis berikut terbukti memangkas 70% timbulan sampah rumah tangga yang berakhir sia-sia di TPA:',
        actions: [
          {
            number: '1',
            title: 'Sediakan Dua Wadah Terpisah di Dapur',
            description:
              'Gunakan satu ember tertutup untuk sisa organik dapur dan satu keranjang terpisah untuk kemasan kering. Jangan pernah mencampurkannya sejak awal.',
          },
          {
            number: '2',
            title: 'Bilas Cepat dan Keringkan Kemasan Bersih',
            description:
              'Sisa minyak atau kecap pada botol plastik dan kaleng adalah alasan utama material daur ulang ditolak oleh pemulung dan bank sampah karena memicu jamur.',
          },
          {
            number: '3',
            title: 'Hubungkan ke Bank Sampah atau Titik Pantau',
            description:
              'Salurkan material anorganik yang terkumpul setiap 2 minggu sekali ke Bank Sampah terdekat melalui rujukan peta AksiLestari untuk pencatatan dampak nyata.',
          },
        ],
      },
      {
        id: 'sec-05',
        navLabel: '05 Yang Perlu Diingat',
        title: '05 Yang Perlu Selalu Kamu Ingat',
        summaryTitle: 'Rangkuman Kunci',
        keyTakeaways: [
          'Kunci keberhasilan daur ulang adalah kebersihan fisik kemasan saat dipilah, bukan sekadar niat membuang.',
          'Sampah organik yang tercampur anorganik akan menghasilkan gas metana berbahaya dan bau menyengat.',
          'Pilihan paling bijak adalah selalu mengurangi kemasan sekali pakai sebelum berpikir cara mendaur ulangnya.',
        ],
      },
    ],
    completion: {
      badge: 'MATERI SELESAI DIBACA',
      headline: '5 dari 5 Bagian Tuntas Diserap!',
      description:
        'Uji pemahamanmu lewat evaluasi singkat selama 3 menit dan dapatkan poin kontribusi untuk tingkatkan peranmu.',
      ctaText: 'Mulai Kuis (+20 XP)',
      secondaryText: 'Kembali ke Daftar Modul',
      footnote:
        'Tersedia 5 pertanyaan pilihan ganda · Bobot kelulusan minimal 80% untuk perolehan poin.',
    },
    quizzes: [
      {
        id: 'q1',
        question:
          'Manakah dari barang sehari-hari berikut yang termasuk ke dalam kategori sampah organik?',
        options: [
          { key: 'A', text: 'Botol plastik air mineral bekas' },
          { key: 'B', text: 'Sisa potongan sayur kangkung dan daun kering' },
          { key: 'C', text: 'Kaleng minuman bersoda berbahan aluminium' },
          { key: 'D', text: 'Pecahan gelas kaca dan beling lampu' },
        ],
        correctKey: 'B',
        explanation:
          'Sisa sayuran dan daun kering adalah material hayati yang berasal dari makhluk hidup. Bahan organik dapat terurai secara alami oleh mikroorganisme tanah tanpa meninggalkan residu beracun.',
      },
      {
        id: 'q2',
        question:
          'Sebelum menyalurkan botol plastik PET ke bank sampah atau wadah daur ulang, langkah awal yang paling krusial adalah...',
        options: [
          { key: 'A', text: 'Membakar sisa label yang menempel pada botol' },
          { key: 'B', text: 'Mengosongkan sisa cairan dan membilasnya dengan sedikit air bersih' },
          { key: 'C', text: 'Memotong botol menjadi serpihan mikroplastik di dapur' },
          { key: 'D', text: 'Mencampurnya dengan sisa makanan basah agar lebih padat' },
        ],
        correctKey: 'B',
        explanation:
          'Mengosongkan sisa cairan dan membilas botol mencegah timbulnya bau tidak sedap, koloni serangga, serta kontaminasi jamur yang dapat menurunkan nilai daur ulang material plastik.',
      },
      {
        id: 'q3',
        question:
          'Mengapa kemasan sachet multilaminate (berlapis aluminium & plastik) dan popok sekali pakai dikategorikan sebagai sampah residu?',
        options: [
          { key: 'A', text: 'Karena harganya terlalu mahal untuk dibeli kembali oleh bank sampah' },
          { key: 'B', text: 'Karena terdiri atas lapisan campuran majemuk dan kontaminan higienis yang sulit dipisahkan secara mekanis' },
          { key: 'C', text: 'Karena warnanya terlalu mencolok untuk dilebur' },
          { key: 'D', text: 'Karena mudah larut di dalam air mengalir' },
        ],
        correctKey: 'B',
        explanation:
          'Sampah residu memiliki lapisan komposit majemuk atau tingkat cemaran higienis yang belum dapat didaur ulang secara ekonomis oleh fasilitas bank sampah lokal.',
      },
      {
        id: 'q4',
        question:
          'Apa dampak negatif paling berbahaya jika sampah organik basah dibuang tercampur bersama plastik di dalam kantong tertutup ke TPA?',
        options: [
          { key: 'A', text: 'Membuat kantong sampah terlihat lebih ramping' },
          { key: 'B', text: 'Memicu dekomposisi anaerobik yang menghasilkan gas metana penyebab efek rumah kaca dan risiko ledakan sampah' },
          { key: 'C', text: 'Membuat tanah di TPA menjadi terlalu subur' },
          { key: 'D', text: 'Meningkatkan konsumsi daya listrik pendingin ruangan' },
        ],
        correctKey: 'B',
        explanation:
          'Sampah organik yang terjebak tanpa oksigen di bawah tumpukan plastik akan membusuk secara anaerobik dan melepaskan gas metana (CH4), gas rumah kaca yang 25 kali lebih kuat dari CO2.',
      },
      {
        id: 'q5',
        question:
          'Prinsip utama sistem pemilahan "Dua Wadah Terpisah" yang paling sederhana di dapur rumah tangga adalah memisahkan...',
        options: [
          { key: 'A', text: 'Wadah basah (organik mudah busuk) dan wadah kering (anorganik bersih & residu)' },
          { key: 'B', text: 'Wadah berbahan plastik dan wadah berbahan logam' },
          { key: 'C', text: 'Sampah pagi hari dan sampah malam hari' },
          { key: 'D', text: 'Wadah ukuran kecil dan wadah ukuran besar' },
        ],
        correctKey: 'A',
        explanation:
          'Pemisahan hulu antara organik basah dan anorganik kering adalah fondasi utama yang menyelamatkan lebih dari 70% material dari kepunahan di TPA.',
      },
    ],
  },
}
