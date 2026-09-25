import { useRef } from 'react'

/**
 * TemukanDescriptionCard
 * Renders the optional description textarea and character counter for Lapor Step 1.
 *
 * @param {object} props
 * @param {string} props.value
 * @param {(e: import('react').ChangeEvent<HTMLTextAreaElement>) => void} props.onChange
 * @param {number} props.maxLength
 */
export default function TemukanDescriptionCard({ value, onChange, maxLength }) {
  const textareaRef = useRef(null)
  const remaining = maxLength - value.length

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary" aria-hidden="true">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" x2="8" y1="13" y2="13"/>
            <line x1="16" x2="8" y1="17" y2="17"/>
          </svg>
          <span className="font-bold text-sm text-primary">Deskripsi Tambahan</span>
        </div>
        <span className="text-[11px] font-medium text-stone-400">
          Opsional
        </span>
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-2.5">
        <p className="text-xs text-stone-500 leading-relaxed">
          Berikan catatan ringkas yang relevan dengan kondisi fisik lapangan jika diperlukan.
        </p>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          rows={4}
          placeholder="Contoh: Sampah kemasan menumpuk di dekat bibir selokan, berpotensi menyumbat aliran air saat hujan."
          className="w-full resize-none rounded-xl border border-border-warm bg-stone-50/60 px-3 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors leading-relaxed"
          aria-label="Deskripsi tambahan temuan sampah"
        />

        <div className="flex items-center justify-between">
          <p className="text-[11px] text-stone-400">
            Hanya untuk keterangan tempat / situasi khusus
          </p>
          <span className={`text-[11px] font-semibold tabular-nums ${remaining < 30 ? 'text-amber-600' : 'text-stone-400'}`}>
            {value.length} / {maxLength}
          </span>
        </div>
      </div>
    </div>
  )
}
