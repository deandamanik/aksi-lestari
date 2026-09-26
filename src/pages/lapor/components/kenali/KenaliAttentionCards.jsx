import { AlertTriangleIcon, ShieldAlertIcon } from '../../../../components/common/Icons'

/**
 * KenaliAttentionCards — Displays environmental attention level and safety notices
 * placed under the photo evidence card in Step 02 (Kenali) for balanced 2-column layout.
 */
export default function KenaliAttentionCards({ data }) {
  if (!data) return null

  const {
    attentionLevel,
    attentionMessage,
    safetyNotice,
  } = data

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Tingkat Perhatian Lingkungan */}
      {attentionLevel && (
        <div className="rounded-2xl bg-[#FFF9E6] border border-[#FDE68A] p-3.5 sm:p-4 flex items-start gap-3 shadow-2xs">
          <AlertTriangleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-[#92400E]">
              Tingkat Perhatian: {attentionLevel}
            </h3>
            {attentionMessage && (
              <p className="text-xs text-[#B45309] leading-relaxed mt-1">
                {attentionMessage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 2. Utamakan Keselamatan */}
      {safetyNotice && (
        <div className="rounded-2xl bg-[#FFF1F2] border border-[#FECDD3] p-3.5 sm:p-4 flex items-start gap-3 shadow-2xs">
          <ShieldAlertIcon className="w-4.5 h-4.5 text-[#E11D48] shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-[#9F1239]">
              Utamakan Keselamatan
            </h3>
            <p className="text-xs font-medium text-[#9F1239]/90 leading-relaxed mt-0.5">
              {safetyNotice}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
