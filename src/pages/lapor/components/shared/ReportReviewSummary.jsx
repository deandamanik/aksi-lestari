import { getIdentificationData } from '../../../../data/lapor/identificationData'
import { AlertTriangleIcon, FlagIcon, RecycleIcon } from '../../../../components/common/Icons'
import EditableLocationSection from './EditableLocationSection'
import EditableDescriptionSection from './EditableDescriptionSection'

/**
 * ReportReviewSummary — Unified Review & Edit Card for Lapor Flow
 *
 * Renders identification summary, editable location, and editable description.
 * Optionally renders the selected action section when `aksi` is provided (public report flow).
 *
 * @param {object} props
 * @param {object} props.temukan
 * @param {object} props.kenali
 * @param {object} [props.aksi] - Optional: if present, renders the "Aksi Dipilih" section
 * @param {(newLocation: object) => void} props.onSaveLocation
 * @param {(newDescription: string) => void} props.onSaveDescription
 */
function ReportReviewSummary({
  temukan,
  kenali,
  aksi,
  onSaveLocation,
  onSaveDescription,
}) {
  const categoryKey = kenali?.category || 'plastik'
  const ident = getIdentificationData(categoryKey)
  const location = temukan?.location
  const isLaporkan = (aksi?.type ?? 'laporkan') === 'laporkan'

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

      {/* 4. Selected Action Summary (Optional — only when `aksi` is provided) */}
      {aksi && (
        <div className="pt-4.5 border-t border-stone-100 flex flex-col gap-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase text-stone-400">
            Aksi Dipilih
          </span>
          <div className="flex items-center gap-2">
            {isLaporkan ? (
              <FlagIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2.2} />
            ) : (
              <RecycleIcon className="w-4 h-4 text-primary shrink-0" strokeWidth={2.2} />
            )}
            <h3 className="font-display font-bold text-base text-stone-900 tracking-tight">
              {isLaporkan ? 'Laporkan Sampah' : 'Tangani Sendiri'}
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {isLaporkan
              ? 'Laporan akan dikirim untuk proses penanganan dan verifikasi.'
              : 'Kamu akan melanjutkan proses pencatatan hasil penanganan.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ReportReviewSummary
