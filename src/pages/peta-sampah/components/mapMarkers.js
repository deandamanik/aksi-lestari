import { Marker } from 'maplibre-gl'

/**
 * Shared builder for circular DOM markers with subtle pulse/scale hover transitions.
 */
function createBaseMarkerElement({
  ariaLabel,
  title,
  bgColor,
  shadowColor = 'rgba(0, 0, 0, 0.35)',
  defaultShadow = '0 2px 8px rgba(0, 0, 0, 0.22)',
  innerShapeHtml,
  isSelected,
  onClick,
}) {
  const markerEl = document.createElement('div')
  markerEl.className = 'group relative cursor-pointer'
  markerEl.setAttribute('role', 'button')
  markerEl.setAttribute('aria-label', ariaLabel)
  markerEl.setAttribute('title', title)

  const selectedShadow = `0 0 0 2.5px ${bgColor}, 0 3px 12px ${shadowColor}`
  const initialShadow = isSelected ? selectedShadow : defaultShadow
  const initialTransform = isSelected ? 'scale(1.15)' : 'scale(1)'

  markerEl.innerHTML = `
    <div style="
      width: 26px;
      height: 26px;
      background-color: ${bgColor};
      border: 2.5px solid #FFFFFF;
      border-radius: 9999px;
      box-shadow: ${initialShadow};
      transform: ${initialTransform};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.18s ease-out, box-shadow 0.18s ease-out;
    ">
      ${innerShapeHtml}
    </div>
  `

  const innerBadge = markerEl.firstElementChild
  if (innerBadge) {
    innerBadge.dataset.selected = isSelected ? 'true' : 'false'
  }

  markerEl.addEventListener('mouseenter', () => {
    if (innerBadge) {
      innerBadge.style.transform = 'scale(1.22)'
      innerBadge.style.boxShadow = `0 4px 14px ${shadowColor}`
    }
  })

  markerEl.addEventListener('mouseleave', () => {
    if (innerBadge) {
      const selected = innerBadge.dataset.selected === 'true'
      innerBadge.style.transform = selected ? 'scale(1.15)' : 'scale(1)'
      innerBadge.style.boxShadow = selected ? selectedShadow : defaultShadow
    }
  })

  markerEl.addEventListener('click', (e) => {
    e.stopPropagation()
    onClick?.()
  })

  return { markerEl, innerBadge, bgColor, selectedShadow, defaultShadow }
}

/**
 * Creates a distinct circular DOM marker for waste reports (with severity color coding).
 */
export function createWasteMarkerElement(report, isSelected, onClick) {
  const bgColor =
    report.severity === 'tinggi'
      ? '#FFA938' // Accent warm amber
      : report.severity === 'sedang'
        ? '#7AAB2B' // Secondary green
        : '#22603B' // Primary forest green

  const innerShapeHtml = `
    <div style="
      width: 8px;
      height: 8px;
      background-color: #FFFFFF;
      border-radius: 9999px;
    "></div>
  `

  return createBaseMarkerElement({
    ariaLabel: `${report.title} (${report.category}, Tingkat: ${report.severity})`,
    title: `${report.title}\n${report.category} · Tingkat: ${report.severity}\n${report.address}`,
    bgColor,
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    defaultShadow: '0 2px 8px rgba(0, 0, 0, 0.22)',
    innerShapeHtml,
    isSelected,
    onClick: () => onClick?.(report),
  })
}

/**
 * Creates a dedicated blue location marker for Bank Sampah points.
 */
export function createBankMarkerElement(bank, isSelected, onClick) {
  const bgColor = '#1D70B8'

  const innerShapeHtml = `
    <div style="
      width: 8px;
      height: 8px;
      background-color: #FFFFFF;
      border-radius: 1.5px;
      transform: rotate(45deg);
    "></div>
  `

  return createBaseMarkerElement({
    ariaLabel: `${bank.name} (${bank.district})`,
    title: `${bank.name}\n${bank.address}\nJam: ${bank.operatingHours}\nTerima: ${bank.acceptedMaterials.join(', ')}`,
    bgColor,
    shadowColor: 'rgba(29, 112, 184, 0.45)',
    defaultShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    innerShapeHtml,
    isSelected,
    onClick: () => onClick?.(bank),
  })
}

/**
 * Clears and unmounts all MapLibre markers in a ref array.
 */
export function clearMarkers(markersRef, markersDataRef) {
  if (markersRef.current) {
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []
  }
  if (markersDataRef && markersDataRef.current) {
    markersDataRef.current = []
  }
}

/**
 * Renders waste report DOM markers onto the MapLibre instance.
 */
export function renderWasteMarkers(
  targetMap,
  reportsList,
  selectedPoint,
  onSelectPoint,
  markersRef,
  markersDataRef
) {
  clearMarkers(markersRef, markersDataRef)
  if (!targetMap || !reportsList) return

  const selectedId = selectedPoint?.data?.id
  const selectedType = selectedPoint?.type

  reportsList.forEach((report) => {
    const isSelected = selectedType === 'report' && report.id === selectedId
    const { markerEl, innerBadge, bgColor, selectedShadow, defaultShadow } =
      createWasteMarkerElement(report, isSelected, (rep) => {
        onSelectPoint?.({ type: 'report', data: rep })
      })

    const marker = new Marker({
      element: markerEl,
      anchor: 'center',
    })
      .setLngLat([report.longitude, report.latitude])
      .addTo(targetMap)

    markersRef.current.push(marker)
    markersDataRef.current.push({
      id: report.id,
      innerBadge,
      bgColor,
      selectedShadow,
      defaultShadow,
    })
  })
}

/**
 * Renders Bank Sampah DOM markers onto the MapLibre instance.
 */
export function renderBankMarkers(
  targetMap,
  banksList,
  selectedPoint,
  onSelectPoint,
  markersRef,
  markersDataRef
) {
  clearMarkers(markersRef, markersDataRef)
  if (!targetMap || !banksList) return

  const selectedId = selectedPoint?.data?.id
  const selectedType = selectedPoint?.type

  banksList.forEach((bank) => {
    const isSelected = selectedType === 'bank' && bank.id === selectedId
    const { markerEl, innerBadge, bgColor, selectedShadow, defaultShadow } =
      createBankMarkerElement(bank, isSelected, (b) => {
        onSelectPoint?.({ type: 'bank', data: b })
      })

    const marker = new Marker({
      element: markerEl,
      anchor: 'center',
    })
      .setLngLat([bank.longitude, bank.latitude])
      .addTo(targetMap)

    markersRef.current.push(marker)
    markersDataRef.current.push({
      id: bank.id,
      innerBadge,
      bgColor,
      selectedShadow,
      defaultShadow,
    })
  })
}

/**
 * Reactively updates marker selection highlight styles in-place without rebuilding DOM markers.
 */
export function updateMarkerSelectionStyles(
  markersDataRef,
  selectedType,
  expectedType,
  selectedId
) {
  if (!markersDataRef?.current) return

  markersDataRef.current.forEach(
    ({ id, innerBadge, selectedShadow, defaultShadow }) => {
      const isSelected = selectedType === expectedType && id === selectedId
      if (innerBadge) {
        innerBadge.dataset.selected = isSelected ? 'true' : 'false'
        innerBadge.style.transform = isSelected ? 'scale(1.15)' : 'scale(1)'
        innerBadge.style.boxShadow = isSelected ? selectedShadow : defaultShadow
      }
    }
  )
}

/**
 * Creates DOM element for user's GPS location marker.
 * A solid blue dot with an animated pulsing radar ring and an accessible hover tooltip.
 */
export function createUserLocationMarkerElement() {
  const markerEl = document.createElement('div')
  markerEl.className = 'user-location-marker group relative flex items-center justify-center'
  markerEl.setAttribute('role', 'status')
  markerEl.setAttribute('aria-label', 'Lokasi Anda Saat Ini')
  markerEl.setAttribute('title', 'Lokasi Anda Saat Ini')
  markerEl.setAttribute('tabindex', '0')

  markerEl.innerHTML = `
    <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
      <!-- Outer pulsing radar wave -->
      <span class="animate-gps-pulse" style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        background-color: rgba(37, 99, 235, 0.28);
        pointer-events: none;
      "></span>

      <!-- Inner semi-transparent halo -->
      <span style="
        position: absolute;
        width: 24px;
        height: 24px;
        border-radius: 9999px;
        background-color: rgba(37, 99, 235, 0.18);
        pointer-events: none;
      "></span>

      <!-- Center solid blue GPS pin with crisp white border -->
      <div style="
        position: relative;
        z-index: 10;
        width: 16px;
        height: 16px;
        background-color: #2563EB;
        border: 2.5px solid #FFFFFF;
        border-radius: 9999px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(37, 99, 235, 0.25);
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      "></div>

      <!-- Hover / Focus Tooltip -->
      <div class="user-gps-tooltip" style="
        position: absolute;
        bottom: calc(100% + 4px);
        left: 50%;
        transform: translateX(-50%);
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.18s ease-out, transform 0.18s ease-out;
        z-index: 20;
      ">
        <div style="
          padding: 4px 9px;
          background: rgba(28, 25, 23, 0.92);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-family: inherit;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
        ">
          Lokasi Anda Saat Ini
        </div>
      </div>
    </div>
  `

  const tooltip = markerEl.querySelector('.user-gps-tooltip')
  const centerDot = markerEl.querySelector('div > div:nth-child(3)')

  const showTooltip = () => {
    if (tooltip) {
      tooltip.style.opacity = '1'
      tooltip.style.visibility = 'visible'
      tooltip.style.transform = 'translateX(-50%) translateY(-2px)'
    }
    if (centerDot) {
      centerDot.style.transform = 'scale(1.25)'
    }
  }

  const hideTooltip = () => {
    if (tooltip) {
      tooltip.style.opacity = '0'
      tooltip.style.visibility = 'hidden'
      tooltip.style.transform = 'translateX(-50%) translateY(0)'
    }
    if (centerDot) {
      centerDot.style.transform = 'scale(1)'
    }
  }

  markerEl.addEventListener('mouseenter', showTooltip)
  markerEl.addEventListener('mouseleave', hideTooltip)
  markerEl.addEventListener('focus', showTooltip)
  markerEl.addEventListener('blur', hideTooltip)

  return markerEl
}

/**
 * Renders or updates the user location marker on the MapLibre instance.
 */
export function renderUserLocationMarker(targetMap, coords, existingMarkerRef) {
  if (!coords) {
    if (existingMarkerRef?.current) {
      existingMarkerRef.current.remove()
      existingMarkerRef.current = null
    }
    return
  }

  if (existingMarkerRef?.current) {
    existingMarkerRef.current.setLngLat(coords)
  } else if (targetMap) {
    const markerEl = createUserLocationMarkerElement()
    const marker = new Marker({
      element: markerEl,
      anchor: 'center',
    })
      .setLngLat(coords)
      .addTo(targetMap)

    existingMarkerRef.current = marker
  }
}

