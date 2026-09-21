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
  ACTIVE_WEEKLY_MISSION,
  {
    id: 'wm-01',
    title: 'Laporkan 1 Timbulan Sampah Liar',
    description: 'Ambil foto dan kirim laporan temuan sampah liar di area sekitarmu melalui alur Lapor.',
    category: 'Pelaporan',
    progressCurrent: 1,
    progressTarget: 1,
    rewardXP: 100,
    status: 'completed',
    completedAt: '21 Sep 2026',
  },
  {
    id: 'wm-02',
    title: 'Pilah Sampah Plastik Rumah Tangga',
    description: 'Kumpulkan dan pisahkan minimal 3 wadah atau botol plastik bersih untuk disalurkan ke bank sampah.',
    category: 'Aksi Lapangan',
    progressCurrent: 2,
    progressTarget: 3,
    rewardXP: 75,
    status: 'in_progress',
  },
  {
    id: 'wm-03',
    title: 'Pelajari Panduan Kompos di AksiPedia',
    description: 'Buka materi identifikasi sampah organik dan selesaikan kuis pemahaman pengomposan mandiri.',
    category: 'AksiPedia',
    progressCurrent: 0,
    progressTarget: 1,
    rewardXP: 50,
    status: 'not_started',
  },
  {
    id: 'wm-04',
    title: 'Ikuti 1 Agenda Aksi Komunitas Terdekat',
    description: 'Daftarkan diri dan konfirmasi kehadiran dalam salah satu aksi bersih lingkungan bersama komunitas lokal.',
    category: 'Komunitas',
    progressCurrent: 0,
    progressTarget: 1,
    rewardXP: 120,
    status: 'not_started',
  },
]
