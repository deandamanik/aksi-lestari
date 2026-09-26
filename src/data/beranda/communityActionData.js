/**
 * Section 4 — "Aksi Komunitas & Papan Apresiasi" Data
 * Strictly synchronized with the canonical community data source.
 */
import {
  COMMUNITY_ACTIONS,
  LEADERBOARD_PREVIEW,
} from '../komunitas/communityActionsData'
import { LEADERBOARD_DATA } from '../komunitas/leaderboardData'

export const COMMUNITY_HEADER = {
  eyebrow: 'AKSI KOMUNITAS',
  title: 'Tidak Harus Bergerak Sendiri',
  description: 'Aksi lingkungan di sekitarmu.',
  allActionsLabel: 'Lihat Semua Aksi',
  allActionsHref: '/komunitas',
}

// Canonical preview actions derived directly from community source of truth
export const COMMUNITY_AGENDAS = COMMUNITY_ACTIONS.slice(0, 2).map((action) => ({
  id: action.id,
  tag: action.date,
  date: action.date,
  category: action.category,
  subCategory: action.subCategory,
  title: action.title,
  volunteersCount: action.participants,
  volunteersLabel: 'Relawan',
  statusLabel: action.status || 'Terbuka',
  time: action.time,
  location: action.location.split('·')[0].trim(),
  organizer: action.organizer,
}))

export const APPRECIATION_HEADER = {
  eyebrow: 'PAPAN APRESIASI',
  title: 'Setiap Aksi Berarti',
  description: 'Kontribusi yang tervalidasi tercatat dalam perjalananmu.',
  updatedNotice: LEADERBOARD_PREVIEW.updatedText || 'Diperbarui setiap Senin pukul 00.00 WIB',
  viewBoardLabel: 'Lihat Papan Apresiasi',
  viewBoardHref: '/komunitas/leaderboard',
}

// Canonical preview leaderboard (Top 4 leaders for balanced presentation)
const dewiLestari = LEADERBOARD_DATA?.bulan?.rankings?.[0]

export const APPRECIATION_LEADERBOARD = [
  ...LEADERBOARD_PREVIEW.leaders.map((leader) => ({
    id: leader.id,
    rank: String(leader.rank).padStart(2, '0'),
    rawRank: leader.rank,
    initials: leader.initials,
    name: leader.name,
    level: leader.badge,
    stats: leader.stats,
    xp: leader.xp,
    isTop: Boolean(leader.isTop),
  })),
  ...(dewiLestari
    ? [
        {
          id: dewiLestari.id,
          rank: String(dewiLestari.rank).padStart(2, '0'),
          rawRank: dewiLestari.rank,
          initials: dewiLestari.initials,
          name: dewiLestari.name,
          level: dewiLestari.badge,
          stats: dewiLestari.stats,
          xp: dewiLestari.xp,
          isTop: false,
        },
      ]
    : []),
]
