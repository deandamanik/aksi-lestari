/**
 * Section 4 — "Aksi Komunitas & Papan Apresiasi" Data
 * Strictly synchronized with the approved Figma design.
 */

export const COMMUNITY_HEADER = {
  eyebrow: 'AKSI KOMUNITAS',
  badge: '2 Agenda Dekatmu',
  title: 'Tidak Harus Bergerak Sendiri',
  description: 'Aksi lingkungan di sekitarmu.',
  allActionsLabel: 'Lihat Semua Aksi',
  allActionsHref: '/aksi',
}

export const COMMUNITY_AGENDAS = [
  {
    id: 'cikapundung',
    tag: 'Sabtu, 06 September 2026',
    title: 'Aksi Bersih Sungai Cikapundung',
    volunteersCount: 24,
    volunteersLabel: 'Relawan',
    statusLabel: 'terdaftar',
    time: '07.30 WIB',
    location: 'Coblong, Kota Bandung',
  },
  {
    id: 'pilah-rw04',
    tag: 'Minggu, 07 September 2026',
    title: 'Aksi Pilah Sampah Bersama RW 04',
    volunteersCount: 16,
    volunteersLabel: 'Relawan',
    statusLabel: 'terdaftar',
    time: '08.00 WIB',
    location: 'Dago Atas, Kota Bandung',
  },
]

export const APPRECIATION_HEADER = {
  eyebrow: 'PAPAN APRESIASI',
  title: 'Setiap Aksi Berarti',
  description: 'Kontribusi yang tervalidasi tercatat dalam perjalananmu.',
  updatedNotice: 'Diperbarui setiap hari kerja',
  viewBoardLabel: 'Lihat Papan Apresiasi',
  viewBoardHref: '/apresiasi',
}

export const APPRECIATION_LEADERBOARD = [
  {
    id: 'raka-pratama',
    rank: '01',
    initials: 'RP',
    name: 'Raka Pratama',
    level: 'Level Penggerak',
    xp: '1.240 XP',
    isTop: true,
  },
  {
    id: 'naya-kirana',
    rank: '02',
    initials: 'NK',
    name: 'Naya Kirana',
    level: 'Level Peduli',
    xp: '1.180 XP',
    isTop: false,
  },
  {
    id: 'dimas-setiawan',
    rank: '03',
    initials: 'DS',
    name: 'Dimas Setiawan',
    level: 'Level Peduli',
    xp: '1.040 XP',
    isTop: false,
  },
]
