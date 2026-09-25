import PhotoUploadCard from '../PhotoUploadCard'

/**
 * ReportPhotoSummary — Unified Read-Only Photo Summary Card for Lapor Flow
 *
 * Used in Step 02 (Kenali) and Step 04 (Review/Confirmation) to display
 * the captured/uploaded photo with verified status indicator.
 *
 * @param {object} props
 * @param {File|object|null} props.photo
 * @param {'default'|'compact'} [props.size='default']
 * @param {string} [props.className='']
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
