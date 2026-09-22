import { MODULE_CATEGORIES } from '../../../data/aksipedia/modulesData'

function ModuleFilterTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="w-full overflow-x-auto pb-2 mb-8 select-none no-scrollbar">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
        {MODULE_CATEGORIES.map((category) => {
          const isActive = activeCategory === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? 'bg-primary text-white font-semibold shadow-xs'
                  : 'bg-white border border-stone-300/80 text-stone-700 hover:bg-stone-50 hover:border-stone-400 font-medium'
              }`}
              aria-pressed={isActive}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ModuleFilterTabs
