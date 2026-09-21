import { useState } from 'react'
import { FileTextIcon, CheckIcon } from '../../../../components/common/Icons'

const MAX_DESC = 300

/**
 * EditableDescriptionSection
 *
 * Displays committed description text in read-only mode by default.
 * Provides an inline textarea editor with character limit when "Ubah Deskripsi" is clicked.
 * Commits on "Simpan" and discards on "Batal".
 */
function EditableDescriptionSection({ description, onSaveDescription, className = '' }) {
  const [isEditing, setIsEditing] = useState(false)
  const currentText = typeof description === 'string' ? description : description?.text || ''
  const [draftText, setDraftText] = useState('')

  const handleStartEdit = () => {
    setDraftText(currentText)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setDraftText(currentText)
    setIsEditing(false)
  }

  const handleSave = () => {
    if (onSaveDescription) {
      onSaveDescription(draftText.trim())
    }
    setIsEditing(false)
  }

  return (
    <div className={`pt-4.5 border-t border-stone-100 flex flex-col gap-3 min-w-0 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider">
          <FileTextIcon className="w-3.5 h-3.5 text-primary shrink-0" strokeWidth={2} />
          <span>Deskripsi Tambahan</span>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={handleStartEdit}
            className="text-[11px] font-normal leading-none tracking-normal text-stone-400 hover:text-stone-600 hover:underline transition-colors cursor-pointer shrink-0 select-none p-0 bg-transparent border-0 shadow-none"
            aria-label="Ubah deskripsi tambahan"
          >
            Ubah Deskripsi
          </button>
        )}
      </div>

      {/* Read-Only State */}
      {!isEditing ? (
        <p className={`text-xs sm:text-sm leading-relaxed break-words [overflow-wrap:anywhere] ${currentText ? 'text-stone-700' : 'text-stone-400 italic'}`}>
          {currentText ? `"${currentText}"` : 'Tidak ada deskripsi tambahan.'}
        </p>
      ) : (
        /* Inline Edit State */
        <div className="flex flex-col gap-2.5 mt-0.5">
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value.slice(0, MAX_DESC))}
            maxLength={MAX_DESC}
            rows={3}
            placeholder="Tuliskan catatan ringkas kondisi fisik lapangan jika diperlukan..."
            className="w-full resize-none rounded-xl border border-[#E0DBCF] bg-stone-50/60 px-3 py-2.5 text-xs sm:text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors leading-relaxed"
            aria-label="Ubah deskripsi tambahan"
          />

          <div className="flex items-center justify-between text-[11px] text-stone-400">
            <span>Maksimal {MAX_DESC} karakter</span>
            <span className="font-semibold tabular-nums">
              {draftText.length} / {MAX_DESC}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-1.5 h-9 px-5 rounded-full font-semibold text-xs sm:text-sm bg-primary hover:bg-primary/90 text-white transition-colors cursor-pointer shadow-xs active:scale-[0.98] select-none"
              aria-label="Simpan perubahan deskripsi"
            >
              <CheckIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>Simpan</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center h-9 px-4 rounded-full font-semibold text-xs sm:text-sm text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer active:scale-[0.98] select-none"
              aria-label="Batalkan perubahan deskripsi"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditableDescriptionSection
