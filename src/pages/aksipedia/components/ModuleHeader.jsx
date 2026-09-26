import { ClockIcon, BookOpenIcon, SparklesIcon } from '../../../components/common/Icons'

function ModuleHeader({ module }) {
  const { title, description, readTime, sectionsCount, level } = module

  return (
    <header className="mb-10 text-center max-w-3xl mx-auto lapor-enter-header">
      {/* Main Title in Quando Serif */}
      <h1 className="font-display font-normal text-primary text-3xl sm:text-4xl lg:text-[2.625rem] tracking-tight mb-4 leading-tight">
        {title}
      </h1>

      {/* Editorial Description */}
      <p className="font-body text-primary/75 text-base sm:text-lg leading-relaxed mb-6">
        {description}
      </p>

      {/* Clean Inline Metadata (No bulky pills) */}
      <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs sm:text-sm text-stone-500 font-medium select-none">
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon className="w-3.5 h-3.5 text-stone-400" />
          <span>{readTime}</span>
        </span>
        <span className="text-stone-300">·</span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpenIcon className="w-3.5 h-3.5 text-stone-400" />
          <span>{sectionsCount}</span>
        </span>
        <span className="text-stone-300">·</span>
        <span className="inline-flex items-center gap-1.5">
          <SparklesIcon className="w-3.5 h-3.5 text-stone-400" />
          <span>{level}</span>
        </span>
      </div>
    </header>
  )
}

export default ModuleHeader
