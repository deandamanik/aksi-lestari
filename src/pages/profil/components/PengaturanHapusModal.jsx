import { useEffect, useRef } from 'react'
import { AlertTriangleIcon } from '../../../components/common/Icons'

function PengaturanHapusModal({ isOpen, onClose, onConfirmDelete }) {
  const cancelBtnRef = useRef(null)
  const modalBoxRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Save element that triggered the modal to restore focus on close
      triggerRef.current = document.activeElement

      // Shift focus into modal
      requestAnimationFrame(() => {
        cancelBtnRef.current?.focus()
      })

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          onClose()
          return
        }

        // Focus trap for Tab key
        if (e.key === 'Tab' && modalBoxRef.current) {
          const focusable = modalBoxRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable.length === 0) return

          const firstElem = focusable[0]
          const lastElem = focusable[focusable.length - 1]

          if (e.shiftKey) {
            if (document.activeElement === firstElem) {
              e.preventDefault()
              lastElem.focus()
            }
          } else {
            if (document.activeElement === lastElem) {
              e.preventDefault()
              firstElem.focus()
            }
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        // Return focus back to trigger
        if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
          triggerRef.current.focus()
        }
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={onClose}
    >
      <div
        ref={modalBoxRef}
        className="bg-white rounded-2xl border border-border-warm p-6 sm:p-7 max-w-md w-full shadow-lg flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon + Title */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0 border border-red-200">
            <AlertTriangleIcon className="w-5 h-5" strokeWidth={2} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 id="delete-modal-title" className="font-bold text-lg text-stone-900">
              Konfirmasi Penghapusan Akun
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Tindakan ini tidak dapat dibatalkan. Mohon baca konsekuensi di bawah sebelum melanjutkan.
            </p>
          </div>
        </div>

        {/* Impact List */}
        <div className="bg-neutral rounded-xl border border-border-warm p-4 text-xs text-stone-600 flex flex-col gap-2">
          <span className="font-bold text-stone-800">Dampak penghapusan akun:</span>
          <ul className="list-disc list-inside space-y-1 text-stone-500">
            <li>Akses masuk dan profil relawan akan dinonaktifkan secara permanen.</li>
            <li>Pengaturan notifikasi dan preferensi personal akan dihapus.</li>
            <li>Rekam jejak kontribusi publik tetap tercatat secara anonim demi integritas data lingkungan hidup.</li>
          </ul>
        </div>

        <p className="text-[11px] text-stone-500 italic">
          *Pada versi prototipe ini, tindakan konfirmasi hanya mensimulasikan alur verifikasi tanpa menghapus data sebenarnya.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border-warm hover:border-stone-300 hover:bg-neutral text-stone-700 text-xs sm:text-sm font-semibold transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer active:scale-[0.98]"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirmDelete}
            className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm font-semibold transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Konfirmasi Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default PengaturanHapusModal
