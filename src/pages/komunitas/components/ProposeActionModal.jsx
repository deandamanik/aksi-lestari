import { useState, useEffect, useRef, useCallback } from 'react'
import Modal from '../../../components/common/Modal'
import { XIcon } from '../../../components/common/Icons'
import { COMMUNITY_CATEGORIES } from '../../../data/komunitas/communityActionsData'
import ProposeActionForm from './ProposeActionForm'
import ProposeActionSuccess from './ProposeActionSuccess'

/**
 * ProposeActionModal
 * Modal orchestrator for submitting citizen-led environmental action proposals.
 * Uses shared Modal foundation from Phase 2.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {(data: object) => void} props.onSubmitProposal
 */
export default function ProposeActionModal({ isOpen, onClose, onSubmitProposal }) {
  const [submissionState, setSubmissionState] = useState('idle') // 'idle' | 'loading' | 'success'
  const [submittedData, setSubmittedData] = useState(null)
  const loadingTimerRef = useRef(null)

  const availableCategories = COMMUNITY_CATEGORIES.filter((c) => c !== 'Semua Aksi')

  const handleClose = useCallback(() => {
    if (submissionState === 'loading') return
    onClose()
    if (submissionState === 'success') {
      setSubmittedData(null)
      setSubmissionState('idle')
    }
  }, [onClose, submissionState])

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current)
      }
    }
  }, [])

  if (!isOpen) return null

  const handleFormSubmit = (data) => {
    setSubmissionState('loading')
    loadingTimerRef.current = setTimeout(() => {
      setSubmittedData(data)
      setSubmissionState('success')
      if (onSubmitProposal) {
        onSubmitProposal(data)
      }
    }, 800)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnEscape={submissionState !== 'loading'}
      closeOnBackdrop={submissionState !== 'loading'}
      ariaLabelledBy="propose-modal-title"
      backdropClassName="bg-black/50"
      className="w-full max-w-2xl bg-white rounded-3xl border border-border-warm shadow-2xl overflow-hidden max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-48px)] flex flex-col animate-dialog-enter my-auto"
    >
      {/* Header */}
      <div className="p-6 sm:p-7 sm:px-8 border-b border-border-warm/60 relative shrink-0">
        {submissionState !== 'loading' && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-5 sm:top-6 right-5 sm:right-6 w-9 h-9 rounded-full flex items-center justify-center text-stone-400 hover:text-primary hover:bg-stone-100 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Tutup form pengajuan"
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}


        <h2
          id="propose-modal-title"
          className="font-display text-primary text-xl sm:text-2xl font-bold tracking-tight pr-8"
        >
          Ajukan Kegiatan Lingkungan
        </h2>
        <p className="font-body text-stone-600 text-xs sm:text-sm mt-1">
          Gagas aksi nyata di lingkungan RT/RW atau komunitasmu untuk mengajak partisipasi sukarela warga.
        </p>
      </div>

      {/* Modal Body */}
      {submissionState === 'success' ? (
        <ProposeActionSuccess
          proposalData={submittedData}
          onClose={handleClose}
        />
      ) : (
        <ProposeActionForm
          availableCategories={availableCategories}
          isLoading={submissionState === 'loading'}
          onSubmit={handleFormSubmit}
          onCancel={handleClose}
        />
      )}
    </Modal>
  )
}
