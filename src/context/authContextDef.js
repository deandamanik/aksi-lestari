import { createContext } from 'react'
import { USER_PROFILE } from '../data/profil/userProfileData'

export const AuthContext = createContext(null)

/**
 * Single Demo Account: Invention 2026
 * Canonical source of truth for authenticated user and active profile state.
 */
export const DEMO_USER = {
  ...USER_PROFILE,
  role: 'Relawan Lestari',
  badge: 'Pelapor Aktif',
  xp: USER_PROFILE.currentXP,
}
