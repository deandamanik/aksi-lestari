import PhotoUploadCard from '../PhotoUploadCard'

/**
 * EvidenceSummaryCard — Step 02 Photo Evidence Card
 *
 * Uses the unified PhotoUploadCard in readOnly mode.
 */
function EvidenceSummaryCard({ photo, size = 'default', className = '' }) {
  return (
    <PhotoUploadCard
      value={photo instanceof File ? photo : photo?.file || null}
      statusText="Terekam"
      readOnly
      size={size}
      className={className}
    />
  )
}

export default EvidenceSummaryCard
