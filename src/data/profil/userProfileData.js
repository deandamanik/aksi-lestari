/**
 * Mock Data: User Profile (AksiLestari Relawan)
 *
 * Catatan Domain:
 * - Profil ini adalah personal civic participation space, bukan profil media sosial.
 * - XP (Experience Points) HANYA untuk platform progression (tingkatan relawan).
 * - XP BUKAN uang, BUKAN currency, dan TIDAK BISA ditukar menjadi Rupiah.
 * - Saldo Apresiasi dikelola terpisah di saldoRedeemData.js dalam mata uang Rupiah.
 */

import { getValidatedContributionsCount } from './contributionHistoryData'

export const USER_PROFILE = {
  id: 'usr-001',
  name: 'Invention 2026',
  username: 'Invention 2026',
  email: 'invention2026@aksilestari.id',
  phone: '0812-3456-7890',
  location: 'Bandung, Jawa Barat',
  city: 'Kota Bandung',
  province: 'Jawa Barat',
  joinDate: 'Januari 2026',
  avatar: null, // fallback initial 'I'
  initials: 'I',
  bio: 'Terus bergerak dan bangun kebiasaan baik untuk kelestarian lingkungan sekitar.',

  // Platform Progression (Level & XP)
  currentLevelNumber: 12,
  currentLevel: 'Level 12',
  levelTierName: 'Peduli Aktif',
  currentXP: 420,
  nextLevelXP: 500,
  xpToNextLevel: 80,
  nextLevelNumber: 13,
  levelProgressPercent: 84, // (420 / 500) * 100

  // Konsistensi Mingguan (Weekly consistency — strictly weekly, no daily streaks)
  streakWeeks: 3,
  streakLabel: 'Konsisten berkontribusi setiap minggu.',

  // Civic badges count & list
  badgesCount: 8,
  featuredBadges: [
    { id: 'b-01', name: 'Pelapor Aktif', style: 'primary' },
    { id: 'b-02', name: 'Tangan Tuntas', style: 'emerald' },
    { id: 'b-03', name: 'Pilah Cerdas', style: 'amber' },
  ],

  // Ringkasan metrik dampak nyata (Civic Impact Metrics)
  impactMetrics: {
    totalReportsSubmitted: 6,
    // Source of truth: tervalidasi dari daftar riwayat kontribusi sipil
    verifiedReportsCount: getValidatedContributionsCount(),
    totalWasteManagedKg: 38.5,
    communityEventsAttended: 2,
    weeklyMissionsCompleted: 5,
  },
}
