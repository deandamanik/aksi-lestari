import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import ModuleHeader from './components/ModuleHeader'
import ModuleLearningJourney from './components/ModuleLearningJourney'
import ModuleEditorialBody from './components/ModuleEditorialBody'
import ModuleCompletionCard from './components/ModuleCompletionCard'
import { DETAILED_MODULES } from '../../data/aksipedia/modulesData'

function ModuleDetailPage() {
  const { moduleId } = useParams()
  const module = DETAILED_MODULES[moduleId] || DETAILED_MODULES['memahami-jenis-sampah']

  const [activeSectionId, setActiveSectionId] = useState('sec-01')
  const [scrollProgress, setScrollProgress] = useState(0)
  const isManualScrollingRef = useRef(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [moduleId])

  // Continuous Scroll Progress Calculation & Scroll Spy
  useEffect(() => {
    let rafId = null

    const handleScroll = () => {
      if (isManualScrollingRef.current) return

      rafId = requestAnimationFrame(() => {
        const sections = module.sections
        const sectionEls = sections
          .map((s) => document.getElementById(s.id))
          .filter(Boolean)

        if (sectionEls.length < 2) return

        const scrollY = window.scrollY
        // Offset below sticky Navbar (~72px) + sticky Journey bar (~80px) + buffer (~48px)
        const headerOffset = 200

        // Calculate absolute top offset of each section
        const positions = sectionEls.map((el) => {
          const rect = el.getBoundingClientRect()
          return rect.top + scrollY - headerOffset
        })

        const startY = positions[0]
        const endY = positions[positions.length - 1]

        // 1. If above first section
        if (scrollY <= startY) {
          setScrollProgress(0)
          setActiveSectionId(sections[0].id)
          return
        }

        // 2. If reached or past last section
        if (scrollY >= endY) {
          setScrollProgress(100)
          setActiveSectionId(sections[sections.length - 1].id)
          return
        }

        // 3. Smoothly interpolate within current segment
        const numSegments = positions.length - 1
        for (let i = 0; i < numSegments; i++) {
          const segStart = positions[i]
          const segEnd = positions[i + 1]

          if (scrollY >= segStart && scrollY <= segEnd) {
            const segRatio = (scrollY - segStart) / (segEnd - segStart)
            const overallRatio = (i + segRatio) / numSegments
            const pct = overallRatio * 100

            setScrollProgress(pct)

            // Switch active node around mid-transition
            if (segRatio >= 0.5) {
              setActiveSectionId(sections[i + 1].id)
            } else {
              setActiveSectionId(sections[i].id)
            }
            break
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [module.sections])

  const handleScrollToSection = (id) => {
    setActiveSectionId(id)
    isManualScrollingRef.current = true

    const idx = module.sections.findIndex((s) => s.id === id)
    if (idx !== -1 && module.sections.length > 1) {
      setScrollProgress((idx / (module.sections.length - 1)) * 100)
    }

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }

    // Release manual scroll lock after smooth scrolling completes
    setTimeout(() => {
      isManualScrollingRef.current = false
    }, 750)
  }

  return (
    <main className="min-h-screen bg-neutral text-primary pt-28 sm:pt-32 pb-20 sm:pb-24">
      {/* 1. Header Container: Breadcrumb & Module Title */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8 select-none">
          <Link
            to="/aksipedia/modul"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary/80 hover:text-primary transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Kembali ke Modul</span>
          </Link>

          {/* Module Progress in Header */}
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span>{module.progressLabel}</span>
            <div
              className="w-16 sm:w-24 h-1.5 rounded-full bg-stone-200 overflow-hidden"
              role="progressbar"
              aria-valuenow={module.progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Kemajuan membaca modul"
            >
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${module.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <ModuleHeader module={module} />
      </div>

      {/* 2. Interactive Learning Journey (Full-width sticky progress path) */}
      <ModuleLearningJourney
        sections={module.sections}
        activeSectionId={activeSectionId}
        scrollProgress={scrollProgress}
        onSelectSection={handleScrollToSection}
      />

      {/* 3. Main Editorial Body with generous spacing below sticky journey */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <ModuleEditorialBody sections={module.sections} />

        {/* 4. Completion & Quiz CTA */}
        <ModuleCompletionCard
          completion={module.completion}
          moduleId={module.id}
        />
      </div>
    </main>
  )
}

export default ModuleDetailPage
