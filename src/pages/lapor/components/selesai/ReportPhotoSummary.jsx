import PhotoUploadCard from '../PhotoUploadCard'

/**
 * ReportPhotoSummary — Step 04 / Confirmation Photo Summary Card
 *
 * Uses the unified PhotoUploadCard in readOnly mode.
 */
function ReportPhotoSummary({ photo, size = 'default', className = '' }) {
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

export default ReportPhotoSummary
