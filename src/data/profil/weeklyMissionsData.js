/**
 * Mock Data: Weekly Missions (Misi Mingguan)
 *
 * Aturan PRD Mutlak:
 * - Misi HANYA bersiklus MINGGUAN (Weekly).
 * - DILARANG membuat daily mission, daily challenge, daily streak, login streak,
 *   atau split daily/weekly system.
 * - Berorientasi pada aksi nyata lingkungan: Pelaporan, AksiPedia, Aksi Lapangan, Komunitas.
 * - Reward berupa XP (Platform Progression).
 */

export const CURRENT_WEEK_METADATA = {
  weekNumber: 38,
  cycleTitle: 'Siklus Minggu Ini',
  cycleRange: '21 – 27 September 2026',
  resetCountdown: 'Reset dalam 3 hari',
  status: 'active',
}

/**
 * ACTIVE_WEEKLY_MISSION — used by ProfileActiveMission on Profile Overview.
 * Derived from the primary weekly mission data below.
 */
export const ACTIVE_WEEKLY_MISSION = {
  id: 'wm-active',
  eyebrow: 'TANTANGAN AKTIF',
  resetCountdown: 'Reset dalam 3 hari',
  title: 'Misi Mingguan: Penjaga Kebersihan Wilayah',
  description:
    'Tuntaskan 1 pelaporan timbulan sampah liar dan ikuti 1 kegiatan pilah sampah organik untuk klaim bonus +60 XP serta lencana kontribusi.',
  category: 'Aksi Lapangan',
  progressCurrent: 2,
  progressTarget: 3,
  progressLabel: '2 dari 3 Target',
  progressPercent: 66,
  rewardXP: 60,
  badgeReward: 'Lencana: Penjaga Wilayah',
  status: 'in_progress',
  ctaLabel: 'Lanjutkan Misi',
  ctaPath: '/profil/misi',
}


export const WEEKLY_MISSIONS = [
  {
    id: 'wm-01',
    eyebrow: 'TANTANGAN UTAMA PEKAN INI',
    title: 'Penjaga Kebersihan Wilayah',
    description:
      'Selesaikan 3 aksi kolaboratif pekan ini: tuntaskan 1 laporan sampah ter-verifikasi, ikuti 1 gotong royong komunitas, dan lakukan 1 pemilahan mandiri di rumah.',
    category: 'Aksi Lapangan',
    progressCurrent: 2,
    progressTarget: 3,
    rewardXP: 60,
    status: 'in_progress',
    ctaLabel: 'Lanjutkan Aksi Terakhir',
    ctaPath: '/lapor',
    tasks: [
      { label: '1 Laporan Sampah Terverifikasi', done: true, statusText: 'Tuntas' },
      { label: '1 Aksi Bersih Lingkungan Bersama Warga', done: true, statusText: 'Tuntas' },
      { label: '1 Pemilahan Sampah Organik Rumah Tangga', done: false, statusText: 'Langkah Terakhir' },
    ],
  },
  {
    id: 'wm-02',
    eyebrow: 'TANTANGAN LITERASI & PARTISIPASI',
    title: 'Belajar & Bergerak Bersama',
    description:
      'Perluas wawasan ekologi melalui modul AksiPedia serta daftarkan diri pada salah satu aksi lapangan komunitas terdaftar untuk membangun jaringan relawan.',
    category: 'AksiPedia',
    progressCurrent: 1,
    progressTarget: 2,
    rewardXP: 80,
    status: 'in_progress',
    ctaLabel: 'Lihat Kegiatan Komunitas',
    ctaPath: '/komunitas',
    tasks: [
      { label: '1 / 2 Modul Daur Ulang Dipelajari', done: true, statusText: '50%' },
      { label: '0 / 1 Pendaftaran Aksi Komunitas', done: false, statusText: 'Belum' },
    ],
  },
]

/**
 * Aktivitas Kontribusi Ringan
 *
 * Pengganti "Misi Hari Ini" dari referensi visual.
 * BUKAN daily mission — hanya aktivitas pendukung kontribusi lingkungan.
 * Tidak ada: reset harian, countdown, streak, atau mekanik daily apapun.
 */
export const LIGHT_ACTIVITIES = [
  {
    id: 'la-01',
    icon: 'camera',
    title: 'Laporkan 1 Titik Sampah Liar',
    description: 'Temukan dan kirimkan satu foto temuan timbulan sampah liar di area sekitarmu melalui fitur Lapor.',
    progressCurrent: 0,
    progressTarget: 1,
    rewardXP: 20,
    status: 'not_started',
    ctaLabel: 'Mulai Lapor',
    ctaPath: '/lapor',
  },
  {
    id: 'la-02',
    icon: 'fileText',
    title: 'Selesaikan 1 Modul AksiPedia',
    description: 'Pelajari panduan pilah sampah anorganik rumah tangga dan tuntaskan kuis evaluasinya.',
    progressCurrent: 0,
    progressTarget: 1,
    rewardXP: 15,
    status: 'not_started',
    ctaLabel: 'Buka Modul',
    ctaPath: '/aksipedia',
  },
  {
    id: 'la-03',
    icon: 'recycle',
    title: 'Edukasi Singkat: Kenali Residu Plastik',
    description: 'Baca tips pengelolaan sampah sachet dan kemasan multilayer berstandar daur ulang.',
    progressCurrent: 1,
    progressTarget: 1,
    rewardXP: 10,
    status: 'completed',
    ctaLabel: 'Selesai',
    ctaPath: null,
  },
]
