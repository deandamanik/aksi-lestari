import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ModuleHeader from './components/ModuleHeader'
import ModuleLearningJourney from './components/ModuleLearningJourney'
import ModuleEditorialBody from './components/ModuleEditorialBody'
import ModuleCompletionCard from './components/ModuleCompletionCard'
import { DETAILED_MODULES } from '../../data/aksipedia/modulesData'

function ModuleDetailPage() {
  const { moduleId } = useParams()
  const module = DETAILED_MODULES[moduleId] || DETAILED_MODULES['memahami-jenis-sampah']

  const [activeSectionId, setActiveSectionId] = useState('sec-01')
  const isManualScrollingRef = useRef(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [moduleId])

  // Scroll Spy to detect active section during reading
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
          setActiveSectionId(sections[0].id)
          return
        }

        // 2. If reached or past last section
        if (scrollY >= endY) {
          setActiveSectionId(sections[sections.length - 1].id)
          return
        }

        // 3. Smoothly detect active section in view
        const numSegments = positions.length - 1
        for (let i = 0; i < numSegments; i++) {
          const segStart = positions[i]
          const segEnd = positions[i + 1]

          if (scrollY >= segStart && scrollY <= segEnd) {
            const segRatio = (scrollY - segStart) / (segEnd - segStart)
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
    <main className="min-h-screen bg-neutral text-primary pt-28 sm:pt-32 pb-20 sm:pb-24 animate-page-enter">
      {/* 1. Header Container: Clean Module Title & Metadata */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <ModuleHeader module={module} />
      </div>

      {/* 2. Interactive Learning Journey (Sticky progress path matching reading width) */}
      <ModuleLearningJourney
        sections={module.sections}
        activeSectionId={activeSectionId}
        onSelectSection={handleScrollToSection}
      />

      {/* 3. Main Editorial Body with comfortable spacing below sticky journey */}
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 lapor-enter-card-delay-1">
        <ModuleEditorialBody sections={module.sections} />

        {/* 4. Bottom Actions (Consistent with Scan Result Pattern) */}
        <ModuleCompletionCard moduleId={module.id} />
      </div>
    </main>
  )
}

export default ModuleDetailPage
