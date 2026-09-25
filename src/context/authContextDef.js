import { createContext } from 'react'

export const AuthContext = createContext(null)

/**
 * Single Demo Account: Invention 2026
 * Sourced directly from AksiLestari Profile baseline (userProfileData.js).
 */
export const DEMO_USER = {
  id: 'usr-001',
  name: 'Invention 2026',
  username: 'deann.lestari',
  email: 'deann@aksilestari.id',
  role: 'Relawan Lestari',
  avatar: null,
  initials: 'I',
  currentLevel: 'Level 12',
  levelTierName: 'Peduli Aktif',
  xp: 420,
  badge: 'Pelapor Aktif',
}
