import PhotoUploadCard from '../PhotoUploadCard'

/**
 * ReportPhotoSummary — Step 04 / Confirmation Photo Summary Card
 *
 * Uses the unified PhotoUploadCard in readOnly mode.
 */
function ReportPhotoSummary({ photo, size = 'default', className = '' }) {
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

export default ReportPhotoSummary
