import { ChevronDownIcon } from '../../../components/common/Icons'

/**
 * RiwayatFilterBar — Segmented Text Navigation + Compact Sort
 *
 * Clean segmented filter:
 * - Active: stronger typography, subtle underline/border
 * - Inactive: neutral text, no loud container boxes
 *
 * Compact sorting dropdown:
 * - Terbaru / Terlama / XP Tertinggi
 */
function RiwayatFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  sortOrder,
  onChangeSortOrder,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-warm pb-px">
      {/* Segmented text navigation filter */}
      <nav
        aria-label="Filter Kategori Riwayat"
        className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none -mb-px"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm transition-all border-b-2 whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-t-sm cursor-pointer select-none ${
                isActive
                  ? 'font-bold text-stone-900 border-primary'
                  : 'font-medium text-stone-500 hover:text-stone-800 border-transparent hover:border-stone-300'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[11px] tabular-nums ${
                  isActive ? 'text-primary font-bold' : 'text-stone-500'
                }`}
              >
                ({cat.count})
              </span>
            </button>
          )
        })}
      </nav>

      {/* Compact sorting dropdown */}
      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pb-2 sm:pb-0">
        <label
          htmlFor="riwayat-sort-select"
          className="text-xs font-medium text-stone-500 select-none"
        >
          Urutan:
        </label>
        <div className="relative">
          <select
            id="riwayat-sort-select"
            value={sortOrder}
            onChange={(e) => onChangeSortOrder(e.target.value)}
            className="appearance-none bg-white border border-border-warm rounded-lg px-3 py-1.5 pr-7 text-xs font-semibold text-stone-700 hover:border-stone-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary cursor-pointer transition-colors shadow-2xs"
          >
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
            <option value="xp-tinggi">XP Tertinggi</option>
          </select>
          <ChevronDownIcon
            className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}

export default RiwayatFilterBar
