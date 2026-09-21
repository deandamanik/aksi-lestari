/**
 * Mock Data: Contribution History (Kontribusi & Riwayat)
 *
 * Catatan Konseptual:
 * Selaras dengan alur partisipasi AksiLestari:
 * Temukan -> Laporkan/Tangani -> Kenali -> Belajar -> Beraksi -> Dapat Apresiasi -> Terus Berkontribusi.
 *
 * Status yang valid:
 * - pending (Menunggu verifikasi / sedang ditindaklanjuti)
 * - verified (Aksi tervalidasi oleh sistem/petugas)
 * - completed (Penanganan tuntas & apresiasi diberikan)
 */

export const CONTRIBUTION_HISTORY = [
  {
    id: 'cnt-01',
    title: 'Aksi Mandiri: Pembersihan Saluran Air',
    type: 'Aksi Mandiri',
    description: 'Pembersihan endapan sampah plastik dan lumpur pada saluran drainase lingkungan RT 04.',
    location: 'Banjaran Saluran Kanal, RT 04',
    timeAgo: '2 jam yang lalu',
    date: '21 September 2026',
    status: 'verified',
    statusLabel: 'Terverifikasi',
    xp: 50,
    badgeEarned: 'Lencana: Tangan Tuntas',
    actionTarget: 'Saluran Air Bersih',
  },
  {
    id: 'cnt-02',
    title: 'Partisipasi: Bersih Pantai & Muara Bersama Warga',
    type: 'Aksi Komunitas',
    description: 'Pembersihan sampah anorganik dan residu plastik di muara pesisir bersama relawan komunitas.',
    location: 'Pantai Sanur, Denpasar',
    timeAgo: 'Sabtu lalu',
    date: '19 September 2026',
    status: 'completed',
    statusLabel: 'Hadir',
    xp: 60,
    organizer: 'Diselenggarakan Komunitas Peduli Pesisir',
    actionTarget: 'Pesisir Pantai Bersih',
  },
  {
    id: 'cnt-03',
    title: 'Laporan Timbulan Sampah Liar TPS Ilegal',
    type: 'Laporan Sampah',
    description: 'Timbulan kantong plastik dan residu rumah tangga di bahu jalan Cisitu.',
    location: 'Jl. Cisitu Indah, Dago, Bandung',
    timeAgo: '3 hari lalu',
    date: '18 September 2026',
    status: 'verified',
    statusLabel: 'Terverifikasi',
    xp: 100,
    actionTarget: '1 Titik Timbulan Teratasi',
  },
  {
    id: 'cnt-04',
    title: 'Aksi Mandiri Pemilahan Sampah Rumah Tangga',
    type: 'Aksi Mandiri',
    description: 'Pemilahan 4.2 kg sampah botol plastik PET dan kardus untuk disetorkan ke bank sampah.',
    location: 'Coblong, Bandung',
    timeAgo: '1 minggu lalu',
    date: '14 September 2026',
    status: 'verified',
    statusLabel: 'Terverifikasi',
    xp: 80,
    actionTarget: '4.2 kg Sampah Terpilah',
  },
  {
    id: 'cnt-05',
    title: 'Partisipasi Bersih Sungai Cikapundung',
    type: 'Aksi Komunitas',
    description: 'Mengikuti gotong royong pembersihan sampah anorganik di bantaran Sungai Cikapundung.',
    location: 'Sungai Cikapundung, Coblong',
    timeAgo: '2 minggu lalu',
    date: '06 September 2026',
    status: 'verified',
    statusLabel: 'Terverifikasi',
    xp: 150,
    actionTarget: '24 Relawan Terlibat',
  },
  {
    id: 'cnt-06',
    title: 'Menyelesaikan Modul Pengomposan Skala Rumah',
    type: 'AksiPedia',
    description: 'Membaca modul panduan pembuatan komposter takakura dan lulus kuis evaluasi pemahaman.',
    location: 'Daring (AksiPedia)',
    timeAgo: '3 minggu lalu',
    date: '30 Agustus 2026',
    status: 'verified',
    statusLabel: 'Terverifikasi',
    xp: 60,
    actionTarget: '1 Modul Dikuasai',
  },
]
