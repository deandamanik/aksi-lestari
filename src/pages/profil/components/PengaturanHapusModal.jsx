import { useRef } from 'react'
import { AlertTriangleIcon } from '../../../components/common/Icons'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'

function PengaturanHapusModal({ isOpen, onClose, onConfirmDelete }) {
  const cancelBtnRef = useRef(null)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="delete-modal-title"
      initialFocusRef={cancelBtnRef}
      className="bg-white rounded-2xl border border-border-warm p-6 sm:p-7 max-w-md w-full shadow-lg flex flex-col gap-5"
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
        <Button
          ref={cancelBtnRef}
          variant="secondary"
          size="md"
          onClick={onClose}
        >
          Batal
        </Button>
        <Button
          variant="destructive"
          size="md"
          onClick={onConfirmDelete}
        >
          Konfirmasi Hapus
        </Button>
      </div>
    </Modal>
  )
}

export default PengaturanHapusModal
