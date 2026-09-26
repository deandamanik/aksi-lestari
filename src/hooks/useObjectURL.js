import { useState, useEffect } from 'react'

/**
 * useObjectURL hook
 *
 * Centralizes DOM Blob object URL lifecycle management for File or Blob instances.
 * Safely creates object URLs, revokes previous URLs on file changes,
 * clears URL on null/undefined input, and revokes active URLs on component unmount.
 *
 * @param {File | Blob | null | undefined} file - File or Blob object to generate URL for
 * @returns {string | null} Created object URL, or null if no valid file provided
 */
export function useObjectURL(file) {
  const [objectUrl, setObjectUrl] = useState(null)

  useEffect(() => {
    if (!file || !(file instanceof Blob)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronizing temporary DOM Blob URL with File object lifecycle
      setObjectUrl(null)
      return
    }

    const url = URL.createObjectURL(file)
    setObjectUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  return objectUrl
}

export default useObjectURL
