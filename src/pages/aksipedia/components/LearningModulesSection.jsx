import { Link } from 'react-router-dom'
import ProtectedModuleLink from './ProtectedModuleLink'
import {
  ClockIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
  ChevronRightIcon,
} from '../../../components/common/Icons'
import { LEARNING_MODULES_DATA } from '../../../data/aksipedia/aksipediaHubData'

function LearningModulesSection() {
  const { featuredModule, secondaryModules } = LEARNING_MODULES_DATA

  return (
    <section className="w-full pb-10 sm:pb-12 lg:pb-14">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-secondary block mb-1.5 select-none">
              {LEARNING_MODULES_DATA.badge}
            </span>
            <h2 className="font-display font-bold text-primary text-2xl sm:text-3xl lg:text-[2.25rem] tracking-tight mb-2">
              {LEARNING_MODULES_DATA.heading}
            </h2>
            <p className="font-body text-primary/75 text-sm sm:text-base max-w-xl">
              {LEARNING_MODULES_DATA.subheading}
            </p>
          </div>

          <Link
            to="/aksipedia/modul"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-secondary transition-colors self-start md:self-end group"
          >
            <span>{LEARNING_MODULES_DATA.seeAllText}</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 2-Column Grid: 1 Big Left Card, 2 Small Stacked Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Large Card (Left) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border-warm p-6 sm:p-8 flex flex-col justify-between hover:border-primary/40 transition-colors">
            <div>
              {/* Clean Inline Metadata (No bulky pill backgrounds) */}
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-3 select-none">
                <span className="font-bold text-primary tracking-wider uppercase">
                  {featuredModule.category}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5 text-stone-400" />
                  {featuredModule.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-primary text-xl sm:text-2xl lg:text-3xl leading-snug mb-3">
                {featuredModule.title}
              </h3>

              {/* Description */}
              <p className="font-body text-primary/75 text-sm sm:text-base leading-relaxed mb-6">
                {featuredModule.description}
              </p>
            </div>

            {/* Bottom Meta & CTA */}
            <div className="pt-4 border-t border-border-warm/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary/80 select-none">
                <CheckCircle2Icon className="w-4 h-4 text-secondary shrink-0" />
                <span>{featuredModule.interactiveFeature}</span>
              </div>

              <ProtectedModuleLink
                to="/aksipedia/modul/memahami-jenis-sampah"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200"
              >
                <BookOpenIcon className="w-4 h-4" />
                <span>{featuredModule.ctaLabel}</span>
              </ProtectedModuleLink>
            </div>
          </div>

          {/* Secondary Stacked Cards (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryModules.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-border-warm p-6 flex flex-col justify-between hover:border-primary/40 transition-colors flex-1"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-2.5 select-none">
                    <span className="font-bold text-secondary tracking-wider uppercase">
                      {item.category}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5 text-stone-400" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-primary text-lg sm:text-xl leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="font-body text-primary/75 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <ProtectedModuleLink
                  to="/aksipedia/modul/memahami-jenis-sampah"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-primary hover:text-secondary transition-colors self-start group"
                >
                  <span>{item.ctaLabel}</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </ProtectedModuleLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningModulesSection
