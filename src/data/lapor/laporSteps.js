/**
 * LAPOR_STEPS — The 4 main stages of the Lapor reporting workflow.
 *
 * These are the stages displayed in the LaporStepper.
 * The /lapor photo-entry screen is NOT part of this list —
 * it is a pre-flow entry point that exists outside the 4-step progression.
 *
 * Photo, Location, and Description are internal sub-steps within
 * Step 1 (Temukan) and do NOT appear here as separate entries.
 */
export const LAPOR_STEPS = [
  { step: 1, key: 'temukan', path: '/lapor/temukan', label: 'Temukan'    },
  { step: 2, key: 'kenali',  path: '/lapor/kenali',  label: 'Kenali'     },
  { step: 3, key: 'aksi',    path: '/lapor/aksi',    label: 'Pilih Aksi' },
  { step: 4, key: 'selesai', path: '/lapor/selesai', label: 'Selesai'    },
]

