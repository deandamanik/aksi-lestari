import { FlagIcon, RecycleIcon } from '../../../../components/common/Icons'

function ActionChoiceCard({ option, isSelected, onSelect }) {
  const IconComponent = option.id === 'laporkan' ? FlagIcon : RecycleIcon

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(option.id)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          onSelect(option.id)
        }
      }}
      className={`rounded-2xl p-5 sm:p-5.5 transition-all duration-150 cursor-pointer flex flex-col gap-3.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none ${
        isSelected
          ? 'border-2 border-primary bg-primary/[0.025] shadow-xs'
          : 'border border-[#E8E5DC] bg-white hover:border-primary/40 hover:bg-stone-50/50 shadow-2xs'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <IconComponent
            className={`w-5 h-5 shrink-0 transition-colors ${
              isSelected ? 'text-primary' : 'text-stone-600'
            }`}
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <h3
            className={`font-display font-bold text-base sm:text-lg tracking-tight transition-colors truncate ${
              isSelected ? 'text-primary' : 'text-stone-900'
            }`}
          >
            {option.title}
          </h3>
        </div>

        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
            isSelected ? 'border-primary bg-primary' : 'border-stone-300 bg-white'
          }`}
          aria-hidden="true"
        >
          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
        {option.description}
      </p>

      <div className="pt-3 border-t border-stone-100/80 flex-1">
        <p className="text-xs font-semibold text-stone-700">Cocok ketika</p>
        <ul className="mt-1.5 space-y-1 text-xs text-stone-600 leading-relaxed">
          {option.suitableCriteria.map((criterion, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-stone-400 select-none" aria-hidden="true">•</span>
              <span>{criterion}</span>
            </li>
          ))}
        </ul>
      </div>

      {option.nextStepNote && (
        <p className="pt-2.5 border-t border-stone-100/80 text-[11px] sm:text-xs text-stone-500 leading-normal">
          {option.nextStepNote}
        </p>
      )}
    </div>
  )
}

export default ActionChoiceCard
