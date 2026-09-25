import { getIdentificationData } from '../../../../data/lapor/identificationData'
import { AlertTriangleIcon } from '../../../../components/common/Icons'
import EditableLocationSection from '../shared/EditableLocationSection'
import EditableDescriptionSection from '../shared/EditableDescriptionSection'

function MandiriReviewSummary({
  temukan,
  kenali,
  onSaveLocation,
  onSaveDescription,
}) {
  const categoryKey = kenali?.category || 'plastik'
  const ident = getIdentificationData(categoryKey)
  const location = temukan?.location

  return (
    <div className="rounded-2xl bg-white border border-border-warm shadow-xs p-5 sm:p-6 flex flex-col gap-5.5">
      {/* 1. Identification Summary */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-primary">
              Hasil Identifikasi
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-stone-900 tracking-tight mt-0.5">
              {kenali?.label || ident.label}
            </h2>
          </div>

          {ident.attentionLevel && (
            <div className="shrink-0 pt-0.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 select-none">
                <AlertTriangleIcon className="w-3.5 h-3.5 text-amber-600 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <span>{ident.attentionLevel}</span>
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-stone-500 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>Kategori: {ident.categoryLabel}</span>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <span>Jenis: {ident.typeLabel}</span>
          <span className="text-stone-300 select-none" aria-hidden="true">·</span>
          <span>Material: {ident.materialLabel}</span>
        </p>
      </div>

      {/* 2. Editable Location Section */}
      <EditableLocationSection
        location={location}
        onSaveLocation={onSaveLocation}
      />

      {/* 3. Editable Description Section */}
      <EditableDescriptionSection
        description={temukan?.description}
        onSaveDescription={onSaveDescription}
      />
    </div>
  )
}

export default MandiriReviewSummary
