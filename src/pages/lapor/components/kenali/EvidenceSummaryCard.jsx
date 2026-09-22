import PhotoUploadCard from '../PhotoUploadCard'

/**
 * EvidenceSummaryCard — Step 02 Photo Evidence Card
 *
 * Uses the unified PhotoUploadCard in readOnly mode.
 */
function EvidenceSummaryCard({ photo, size = 'default', className = '' }) {
  return (
    <PhotoUploadCard
      file={photo}
      statusText="Terekam"
      readOnly
      size={size}
      className={className}
    />
  )
}

export default EvidenceSummaryCard
