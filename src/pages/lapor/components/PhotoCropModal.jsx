import { useState, useRef, useEffect, useCallback } from 'react'
import Modal from '../../../components/common/Modal'
import { useObjectURL } from '../../../hooks/useObjectURL'
import {
  XIcon,
  CheckIcon,
  RefreshCwIcon,
} from '../../../components/common/Icons'

/**
 * PhotoCropModal — Interactive 4:3 Aspect Ratio Image Frame & Crop Editor
 *
 * Allows users to adjust, drag/pan, and zoom their uploaded photo to ensure
 * the waste object is properly centered in a standardized 4:3 frame.
 * Exports a high-definition (1200x900) cropped JPEG using HTML5 Canvas.
 * Zero external libraries needed.
 */
export default function PhotoCropModal({
  isOpen,
  onClose,
  file,
  initialCrop = null,
  onApplyCrop,
}) {
  const imageSrc = useObjectURL(file)
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 })
  const [boxSize, setBoxSize] = useState({ width: 400, height: 300 })
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 })

  // Measure crop box dimensions on mount & window resize
  const measureBox = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      if (rect.width > 0) {
        setBoxSize({ width: rect.width, height: rect.height })
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Allow DOM to settle then measure
      const timer = setTimeout(measureBox, 50)
      window.addEventListener('resize', measureBox)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', measureBox)
      }
    }
  }, [isOpen, measureBox])

  // Calculate cover scaling factor (so image fills the 4:3 box without empty gaps)
  const baseScale =
    naturalSize.width > 0 && naturalSize.height > 0
      ? Math.max(
          boxSize.width / naturalSize.width,
          boxSize.height / naturalSize.height
        )
      : 1

  const currentWidth = naturalSize.width * baseScale * zoom
  const currentHeight = naturalSize.height * baseScale * zoom

  // Clamp helper to ensure image always completely covers the 4:3 frame
  const getClampedOffset = useCallback(
    (candX, candY, customZoom = zoom) => {
      const w = naturalSize.width * baseScale * customZoom
      const h = naturalSize.height * baseScale * customZoom

      const minX = boxSize.width - w
      const maxX = 0
      const minY = boxSize.height - h
      const maxY = 0

      // If dimensions are smaller than box (edge case), center it
      const clampedX = minX >= maxX ? (boxSize.width - w) / 2 : Math.min(maxX, Math.max(minX, candX))
      const clampedY = minY >= maxY ? (boxSize.height - h) / 2 : Math.min(maxY, Math.max(minY, candY))

      return { x: clampedX, y: clampedY }
    },
    [baseScale, boxSize.height, boxSize.width, naturalSize.height, naturalSize.width, zoom]
  )

  // Natural size calculation & initial centering (or restoring previously applied crop) on load
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target
    setNaturalSize({ width: naturalWidth, height: naturalHeight })

    const targetZoom = initialCrop?.zoom || 1
    setZoom(targetZoom)

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      if (rect.width > 0) {
        setBoxSize({ width: rect.width, height: rect.height })
        const bScale = Math.max(rect.width / naturalWidth, rect.height / naturalHeight)

        let targetX
        let targetY
        if (
          initialCrop &&
          typeof initialCrop.relX === 'number' &&
          typeof initialCrop.relY === 'number'
        ) {
          // Restore position from previous crop application
          targetX = initialCrop.relX * rect.width
          targetY = initialCrop.relY * rect.height
        } else {
          // Default center
          targetX = (rect.width - naturalWidth * bScale * targetZoom) / 2
          targetY = (rect.height - naturalHeight * bScale * targetZoom) / 2
        }

        const w = naturalWidth * bScale * targetZoom
        const h = naturalHeight * bScale * targetZoom
        const minX = rect.width - w
        const minY = rect.height - h
        const clampedX = minX >= 0 ? (rect.width - w) / 2 : Math.min(0, Math.max(minX, targetX))
        const clampedY = minY >= 0 ? (rect.height - h) / 2 : Math.min(0, Math.max(minY, targetY))
        setOffset({ x: clampedX, y: clampedY })
      }
    }
  }

  // Drag handlers (Mouse + Touch)
  const handleStartDrag = (clientX, clientY) => {
    setIsDragging(true)
    dragStartRef.current = {
      x: clientX,
      y: clientY,
      initialX: offset.x,
      initialY: offset.y,
    }
  }

  const handleMoveDrag = useCallback(
    (clientX, clientY) => {
      if (!isDragging) return
      const dx = clientX - dragStartRef.current.x
      const dy = clientY - dragStartRef.current.y
      const candidateX = dragStartRef.current.initialX + dx
      const candidateY = dragStartRef.current.initialY + dy
      setOffset(getClampedOffset(candidateX, candidateY))
    },
    [isDragging, getClampedOffset]
  )

  const handleEndDrag = () => {
    setIsDragging(false)
  }

  // Global window listeners while dragging to ensure smooth pointer tracking
  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e) => {
      e.preventDefault()
      handleMoveDrag(e.clientX, e.clientY)
    }
    const onMouseUp = () => handleEndDrag()

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMoveDrag(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const onTouchEnd = () => handleEndDrag()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isDragging, handleMoveDrag])

  // Handle Zoom change
  const handleZoomChange = (newZoom) => {
    const nextZoom = Math.min(3, Math.max(1, newZoom))
    setZoom(nextZoom)
    // Adjust offset to remain clamped at new zoom level
    setOffset((prev) => getClampedOffset(prev.x, prev.y, nextZoom))
  }

  // Reset to default cover center
  const handleReset = () => {
    setZoom(1)
    const initialX = (boxSize.width - naturalSize.width * baseScale) / 2
    const initialY = (boxSize.height - naturalSize.height * baseScale) / 2
    setOffset(getClampedOffset(initialX, initialY, 1))
  }

  // Canvas 4:3 Crop Export
  const handleApply = () => {
    if (!imgRef.current || isApplying) return
    setIsApplying(true)

    // Standard High Definition 4:3 dimensions
    const OUTPUT_WIDTH = 1200
    const OUTPUT_HEIGHT = 900

    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT_WIDTH
    canvas.height = OUTPUT_HEIGHT
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      setIsApplying(false)
      onClose()
      return
    }

    const ratio = OUTPUT_WIDTH / boxSize.width
    const clamped = getClampedOffset(offset.x, offset.y, zoom)

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      imgRef.current,
      clamped.x * ratio,
      clamped.y * ratio,
      currentWidth * ratio,
      currentHeight * ratio
    )

    canvas.toBlob(
      (blob) => {
        setIsApplying(false)
        if (!blob) {
          onClose()
          return
        }

        const originalName = file?.name || 'foto-laporan.jpg'
        const baseName = originalName.replace(/\.[^/.]+$/, '')
        const croppedFile = new File([blob], `${baseName}-4x3.jpg`, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        })

        if (onApplyCrop) {
          const cropState = {
            zoom,
            relX: clamped.x / boxSize.width,
            relY: clamped.y / boxSize.height,
          }
          onApplyCrop(croppedFile, cropState)
        }
        onClose()
      },
      'image/jpeg',
      0.92
    )
  }

  if (!isOpen || !file) return null

  const clampedOffset = getClampedOffset(offset.x, offset.y, zoom)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEscape={!isApplying}
      closeOnBackdrop={!isApplying}
      ariaLabelledBy="photo-crop-title"
      backdropClassName="bg-black/60 backdrop-blur-xs"
      className="w-full max-w-xl bg-white rounded-3xl border border-border-warm shadow-2xl overflow-hidden flex flex-col animate-dialog-enter my-auto mx-4"
    >
      {/* 1. Header */}
      <div className="p-5 sm:p-6 border-b border-border-warm/70 flex items-center justify-between relative shrink-0">
        <div className="flex flex-col">
          <h2
            id="photo-crop-title"
            className="font-display text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-snug"
          >
            Sesuaikan Posisi Foto
          </h2>
          <p className="text-xs text-stone-500 font-medium leading-tight mt-0.5">
            Geser dan perbesar agar objek sampah berada di tengah bingkai rasio 4:3.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isApplying}
          className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer select-none"
          aria-label="Tutup penyesuaian foto"
        >
          <XIcon className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* 2. Interactive 4:3 Crop Viewport */}
      <div className="p-5 sm:p-6 flex flex-col gap-4 bg-stone-50/50 flex-1 min-h-0">
        <div className="w-full max-w-[460px] mx-auto">
          {/* 4:3 Crop Window */}
          <div
            ref={containerRef}
            onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
            onTouchStart={(e) => {
              if (e.touches.length > 0) {
                handleStartDrag(e.touches[0].clientX, e.touches[0].clientY)
              }
            }}
            className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative select-none touch-none bg-stone-900 shadow-md cursor-grab active:cursor-grabbing border-2 border-primary/50 group"
          >
            {/* The Scaled & Translated Source Image */}
            {imageSrc && (
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Foto untuk disesuaikan"
                onLoad={handleImageLoad}
                draggable={false}
                style={{
                  width: `${currentWidth}px`,
                  height: `${currentHeight}px`,
                  transform: `translate3d(${clampedOffset.x}px, ${clampedOffset.y}px, 0)`,
                  willChange: 'transform',
                }}
                className="absolute top-0 left-0 max-w-none pointer-events-none select-none transition-none"
              />
            )}

            {/* 3x3 Rule-of-Thirds Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/20">
              <div className="border-r border-b border-white/25" />
              <div className="border-r border-b border-white/25" />
              <div className="border-b border-white/25" />
              <div className="border-r border-b border-white/25" />
              <div className="border-r border-b border-white/25" />
              <div className="border-b border-white/25" />
              <div className="border-r border-white/25" />
              <div className="border-r border-white/25" />
              <div />
            </div>

            {/* Viewport Corner Camera Brackets */}
            <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-primary pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-primary pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-primary pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-primary pointer-events-none" />

            {/* Aspect Ratio Badge */}
            <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white/90 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase pointer-events-none select-none border border-white/10">
              Rasio 4:3
            </div>

            {/* Drag Hint Overlay */}
            <div className="absolute bottom-2.5 inset-x-0 flex justify-center pointer-events-none">
              <span className="bg-stone-900/75 backdrop-blur-xs text-white/90 text-[11px] font-medium px-3.5 py-1 rounded-full shadow-xs border border-white/10">
                Geser foto untuk memposisikan
              </span>
            </div>
          </div>
        </div>

        {/* 3. Controls: Zoom Slider & Reset */}
        <div className="w-full max-w-[460px] mx-auto bg-white rounded-2xl p-3.5 sm:p-4 border border-border-warm shadow-2xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-600 select-none">
            <span>Perbesar Objek (Zoom)</span>
            <span className="text-primary tabular-nums font-bold">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleZoomChange(zoom - 0.2)}
              disabled={zoom <= 1}
              className="w-8 h-8 rounded-lg border border-border-warm flex items-center justify-center text-stone-600 hover:text-primary hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-base font-bold cursor-pointer select-none"
              aria-label="Perkecil zoom"
            >
              −
            </button>

            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="flex-1 accent-primary h-2 bg-stone-100 rounded-lg cursor-pointer"
              aria-label="Slider tingkat pembesaran foto"
            />

            <button
              type="button"
              onClick={() => handleZoomChange(zoom + 0.2)}
              disabled={zoom >= 3}
              className="w-8 h-8 rounded-lg border border-border-warm flex items-center justify-center text-stone-600 hover:text-primary hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-base font-bold cursor-pointer select-none"
              aria-label="Perbesar zoom"
            >
              +
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border-warm text-[11px] font-semibold text-stone-500 hover:text-primary hover:border-primary/40 transition-colors cursor-pointer select-none"
              aria-label="Reset posisi dan zoom"
            >
              <RefreshCwIcon className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Modal Footer: Batal & Terapkan */}
      <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-neutral border-t border-border-warm/70 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onClose}
          disabled={isApplying}
          className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white hover:bg-stone-50 border border-border-warm text-stone-700 hover:text-primary text-xs sm:text-sm font-semibold transition-all duration-180 active:scale-[0.98] cursor-pointer shadow-2xs w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed select-none"
        >
          Batal
        </button>

        <button
          type="button"
          onClick={handleApply}
          disabled={isApplying}
          className={`inline-flex items-center justify-center gap-2 h-10 px-6 sm:px-7 rounded-full text-xs sm:text-sm font-semibold transition-all duration-180 active:scale-[0.98] select-none w-full sm:w-auto ${
            isApplying
              ? 'bg-[#C6CFC9] text-white/90 cursor-not-allowed shadow-none'
              : 'bg-primary hover:bg-primary/90 text-white cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary'
          }`}
        >
          {isApplying ? (
            <>
              <span
                className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"
                aria-hidden="true"
              />
              <span>Menerapkan Foto...</span>
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4" strokeWidth={2.25} />
              <span>Terapkan Foto (4:3)</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  )
}
