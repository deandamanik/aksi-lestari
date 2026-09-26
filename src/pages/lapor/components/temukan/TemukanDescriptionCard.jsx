import { useRef } from 'react'
import { FileTextIcon } from '../../../../components/common/Icons'

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
          <FileTextIcon className="w-4 h-4 text-primary" strokeWidth={1.75} />
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
