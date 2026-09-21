/* eslint-disable react-refresh/only-export-components -- LaporProvider (component) and useLapor (hook) are intentionally co-located as a coupled context unit */
import { createContext, useContext, useState, useCallback } from 'react'


// ---------------------------------------------------------------------------
// Initial report shape
// ---------------------------------------------------------------------------

const INITIAL_REPORT = {
  // Step 01 — Temukan (Photo · Location · Description are internal sub-steps)
  temukan: {
    photo: {
      file: null,        // File object — blob URLs are NEVER stored here
      fileName: '',
      fileSize: 0,       // bytes
      mimeType: '',
      capturedAt: null,  // Date.now() when the file was accepted
    },
    location: {
      lat: null,
      lng: null,
      address: '',
      source: null,      // 'gps' | 'manual' | 'map'
    },
    description: {
      text: '',
      urgencyLevel: null, // 'low' | 'medium' | 'high'
    },
  },

  // Step 02 — Kenali
  kenali: {
    category: null,      // 'plastik' | 'organik' | 'b3' | 'elektronik' | 'lainnya'
    label: '',
    notes: '',
  },

  // Step 03 — Pilih Aksi
  aksi: {
    type: null,          // 'laporkan' | 'mandiri'
    assignedTo: null,    // authority/community target for 'laporkan' (future)
  },

  // Step 04 (Mandiri) — Tangani Sendiri documentation
  mandiri: {
    afterPhoto: {
      file: null,        // File object — blob URLs are NEVER stored here
      fileName: '',
      fileSize: 0,       // bytes
      mimeType: '',
      capturedAt: null,  // Date.now() when the file was accepted
    },
    submittedAt: null,   // Date.now() when user submitted action for validation
  },

  // Meta
  reportStatus: 'idle',
  // Lifecycle values (extend as backend integration is added):
  // 'idle'         — flow opened, no data committed yet
  // 'in-progress'  — user has committed at least one field
  // 'review'       — user reached the confirmation screen
  // 'submitting'   — async submission in flight (future)
  // 'submitted'    — report delivered to backend/authority (future)
  // 'acknowledged' — authority has received and acknowledged (future)
  // 'resolved'     — issue closed (future)
  // 'cancelled'    — user explicitly abandoned the flow

  createdAt: null, // Date.now() when the flow first started
}

// ---------------------------------------------------------------------------
// Deep merge utility (one-level-aware, handles nested plain objects)
// Merges `override` into `base` without mutating either.
// File objects, Arrays, and null values are replaced, not merged.
// ---------------------------------------------------------------------------

function isPlainObject(v) {
  return (
    v !== null &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    !(v instanceof File)
  )
}

function deepMerge(base, override) {
  const result = { ...base }
  for (const key of Object.keys(override)) {
    const val = override[key]
    const baseVal = base[key]
    if (isPlainObject(val) && isPlainObject(baseVal)) {
      result[key] = deepMerge(baseVal, val)
    } else {
      result[key] = val
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const LaporContext = createContext(null)

export function LaporProvider({ children }) {
  const [reportData, setReportData] = useState(INITIAL_REPORT)

  /**
   * updateReport(partial)
   *
   * Deep-merges `partial` into the current `reportData`.
   * Each top-level key in `partial` is deep-merged with the corresponding
   * existing key, so updating `temukan.photo` does NOT wipe `temukan.location`.
   *
   * Example:
   *   updateReport({ temukan: { photo: { file: f, fileName: f.name, ... } } })
   */
  const updateReport = useCallback((partial) => {
    setReportData((prev) => deepMerge(prev, partial))
  }, [])

  /**
   * resetReport()
   *
   * Resets all report data to the initial empty state.
   * Called when the user navigates away from the Lapor flow entirely.
   */
  const resetReport = useCallback(() => {
    setReportData(INITIAL_REPORT)
  }, [])

  return (
    <LaporContext.Provider value={{ reportData, updateReport, resetReport }}>
      {children}
    </LaporContext.Provider>
  )
}

/**
 * useLapor()
 *
 * Consumer hook. Throws a clear error if used outside of LaporProvider,
 * which prevents silent bugs when components are rendered outside the flow.
 */
export function useLapor() {
  const ctx = useContext(LaporContext)
  if (!ctx) {
    throw new Error(
      '[LaporContext] useLapor() must be used inside a <LaporProvider>. ' +
        'Make sure the component is rendered within the Lapor route tree (LaporLayout).'
    )
  }
  return ctx
}
