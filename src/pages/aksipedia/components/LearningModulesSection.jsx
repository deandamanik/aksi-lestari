import { useState, useMemo } from 'react'
import ProtectedModuleLink from './ProtectedModuleLink'
import {
  ClockIcon,
  ArrowRightIcon,
  SearchIcon,
  XIcon,
} from '../../../components/common/Icons'
import { ALL_LEARNING_MODULES } from '../../../data/aksipedia/modulesData'
import { LEARNING_MODULES_DATA } from '../../../data/aksipedia/aksipediaHubData'
import { useInView } from '../../../hooks/useInView'

function LearningModulesSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sectionRef, inView] = useInView({ threshold: 0.08 })

  const baseTransition = 'transition-all duration-700 ease-out will-change-[opacity,transform]'

  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return ALL_LEARNING_MODULES

    return ALL_LEARNING_MODULES.filter((module) => {
      const titleMatch = module.title.toLowerCase().includes(query)
      const descMatch = module.description.toLowerCase().includes(query)
      const catMatch = module.category.toLowerCase().includes(query)
      return titleMatch || descMatch || catMatch
    })
  }, [searchQuery])

  const featuredModule = filteredModules[0] || null
  const secondaryModules = filteredModules.slice(1)

  return (
    <section ref={sectionRef} className="w-full pt-12 sm:pt-16 pb-8 sm:pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header & Restrained Search */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-border-warm mb-6 sm:mb-8 ${baseTransition} ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <h2 className="font-display font-medium text-primary text-2xl sm:text-3xl lg:text-[2.25rem] tracking-tight mb-2">
              {LEARNING_MODULES_DATA.heading}
            </h2>
            <p className="font-body text-primary/75 text-sm sm:text-base max-w-xl leading-relaxed">
              {LEARNING_MODULES_DATA.subheading}
            </p>
          </div>

          {/* Restrained Search Field */}
          <div className="w-full md:w-64 lg:w-72 shrink-0">
            <label htmlFor="cari-materi-input" className="sr-only">
              Cari materi
            </label>
            <div className="relative flex items-center w-full h-10 rounded-full bg-white/80 border border-border-warm focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <div className="pl-3.5 flex items-center pointer-events-none text-stone-400 shrink-0">
                <SearchIcon className="w-4 h-4" />
              </div>
              <input
                id="cari-materi-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setSearchQuery('')
                }}
                placeholder="Cari materi..."
                className="w-full h-full pl-2.5 pr-8 bg-transparent text-xs sm:text-sm font-body text-primary placeholder:text-stone-400 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-1 text-stone-400 hover:text-primary transition-colors cursor-pointer rounded-full"
                  aria-label="Hapus teks pencarian"
                  title="Hapus pencarian (Esc)"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card-Based Learning Library */}
        {filteredModules.length > 0 ? (
          <div className="flex flex-col gap-5 sm:gap-6">
            {/* 1. Featured / Primary Module Card */}
            {featuredModule && (
              <article
                style={{ transitionDelay: inView ? '90ms' : '0ms' }}
                className={`rounded-2xl bg-white border border-border-warm shadow-2xs hover:shadow-xs p-6 sm:p-7 lg:p-8 hover:border-primary/40 group flex flex-col justify-between ${baseTransition} ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div>
                  {/* Top metadata strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 font-semibold mb-4 select-none">
                    <div className="flex items-center gap-2.5">
                      <span className="font-display font-medium text-xl sm:text-2xl text-secondary shrink-0">
                        {featuredModule.index}
                      </span>
                      <span className="w-px h-4 bg-border-warm" aria-hidden="true" />
                      <span className="font-bold text-secondary uppercase tracking-wider text-[11px] sm:text-xs">
                        {featuredModule.category}
                      </span>
                      {featuredModule.badge && (
                        <>
                          <span className="text-stone-300">·</span>
                          <span className="text-primary/70 font-medium text-[11px] sm:text-xs">
                            {featuredModule.badge}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-stone-400 font-medium text-xs">
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>{featuredModule.readTime}</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="font-display font-medium text-primary text-xl sm:text-2xl lg:text-[1.75rem] leading-snug tracking-tight">
                    <ProtectedModuleLink
                      to={featuredModule.link}
                      className="hover:text-secondary group-hover:text-secondary transition-colors"
                    >
                      {featuredModule.title}
                    </ProtectedModuleLink>
                  </h3>

                  {/* Description */}
                  <p className="font-body text-primary/75 text-sm sm:text-base leading-relaxed mt-3 max-w-3xl">
                    {featuredModule.description}
                  </p>
                </div>

                {/* Editorial Link Action */}
                <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-end">
                  <ProtectedModuleLink
                    to={featuredModule.link}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary group-hover:text-secondary transition-colors py-1 group/link"
                  >
                    <span>{featuredModule.ctaLabel || 'Buka Materi'}</span>
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover:translate-x-1" />
                  </ProtectedModuleLink>
                </div>
              </article>
            )}

            {/* 2. Secondary Modules Grid */}
            {secondaryModules.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {secondaryModules.map((item, idx) => {
                  const isLastOdd =
                    idx === secondaryModules.length - 1 && secondaryModules.length % 2 !== 0

                  return (
                    <article
                      key={item.id}
                      style={{ transitionDelay: inView ? `${150 + idx * 70}ms` : '0ms' }}
                      className={`rounded-2xl bg-white border border-border-warm shadow-2xs hover:shadow-xs p-5 sm:p-6 hover:border-primary/40 group flex flex-col justify-between ${
                        isLastOdd ? 'md:col-span-2' : ''
                      } ${baseTransition} ${
                        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      }`}
                    >
                      <div>
                        {/* Header: Number + Category + Duration */}
                        <div className="flex items-center justify-between gap-3 text-xs text-stone-500 font-semibold mb-3 select-none">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-medium text-lg text-secondary shrink-0">
                              {item.index}
                            </span>
                            <span className="w-px h-3.5 bg-border-warm" aria-hidden="true" />
                            <span className="font-bold text-secondary uppercase tracking-wider text-[11px]">
                              {item.category}
                            </span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 text-stone-400 font-medium text-xs shrink-0">
                            <ClockIcon className="w-3.5 h-3.5" />
                            <span>{item.readTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="font-display font-medium text-primary text-base sm:text-lg lg:text-xl leading-snug tracking-tight">
                          <ProtectedModuleLink
                            to={item.link}
                            className="hover:text-secondary group-hover:text-secondary transition-colors"
                          >
                            {item.title}
                          </ProtectedModuleLink>
                        </h4>

                        {/* Description */}
                        <p className="font-body text-primary/75 text-xs sm:text-sm leading-relaxed mt-2.5 max-w-2xl">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer Action */}
                      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-end">
                        <ProtectedModuleLink
                          to={item.link}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary group-hover:text-secondary transition-colors py-1 group/link"
                        >
                          <span>{item.ctaLabel || 'Buka Materi'}</span>
                          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover:translate-x-1" />
                        </ProtectedModuleLink>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          /* Clean, Minimal Empty State */
          <div className="py-16 sm:py-20 text-center">
            <p className="font-body text-primary/80 text-sm sm:text-base mb-3">
              Tidak ada materi yang cocok dengan &ldquo;<span className="font-semibold text-primary">{searchQuery}</span>&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center text-xs sm:text-sm font-bold text-primary hover:text-secondary underline underline-offset-4 cursor-pointer transition-colors"
            >
              Hapus pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default LearningModulesSection
