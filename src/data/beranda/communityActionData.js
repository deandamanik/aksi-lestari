/**
 * Section 4 — "Aksi Komunitas & Papan Apresiasi" Data
 * Strictly synchronized with the canonical community data source.
 */
import {
  COMMUNITY_ACTIONS,
  LEADERBOARD_PREVIEW,
} from '../komunitas/communityActionsData'

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
  title: action.title,
  volunteersCount: action.participants,
  volunteersLabel: 'Relawan',
  statusLabel: action.status || 'Terbuka',
  time: action.time,
  location: action.location.split('·')[0].trim(),
}))

export const APPRECIATION_HEADER = {
  eyebrow: 'PAPAN APRESIASI',
  title: 'Setiap Aksi Berarti',
  description: 'Kontribusi yang tervalidasi tercatat dalam perjalananmu.',
  updatedNotice: LEADERBOARD_PREVIEW.updatedText || 'Diperbarui setiap Senin',
  viewBoardLabel: 'Lihat Papan Apresiasi',
  viewBoardHref: '/komunitas/leaderboard',
}

// Canonical preview leaderboard derived directly from community source of truth
export const APPRECIATION_LEADERBOARD = LEADERBOARD_PREVIEW.leaders.map(
  (leader) => ({
    id: leader.id,
    rank: String(leader.rank).padStart(2, '0'),
    initials: leader.initials,
    name: leader.name,
    level: leader.badge,
    xp: leader.xp,
    isTop: Boolean(leader.isTop),
  })
)
