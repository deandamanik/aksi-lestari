import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ModuleContinueCard from './components/ModuleContinueCard'
import ModuleFilterTabs from './components/ModuleFilterTabs'
import FeaturedModuleCard from './components/FeaturedModuleCard'
import ModuleGridCard from './components/ModuleGridCard'
import ModuleProgressFooter from './components/ModuleProgressFooter'
import { MODULES_LIST } from '../../data/aksipedia/modulesData'

function ModuleListPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const filteredModules =
    activeCategory === 'Semua'
      ? MODULES_LIST
      : MODULES_LIST.filter((item) => item.category === activeCategory)

  return (
    <main className="min-h-screen bg-neutral text-primary pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 animate-page-enter">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link to Aksipedia Hub */}
        <div className="mb-6 sm:mb-8 select-none">
          <Link
            to="/aksipedia"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary/80 hover:text-primary transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Kembali ke AksiPedia</span>
          </Link>
        </div>

        {/* Editorial Page Header */}
        <div className="mb-8 sm:mb-10 lapor-enter-header">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-2 select-none">
            MODUL
          </span>
          <h1 className="font-display font-bold text-primary text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight mb-3">
            Belajar tentang Sampah, Satu Modul Sekaligus.
          </h1>
          <p className="font-body text-primary/75 text-sm sm:text-base max-w-2xl leading-relaxed">
            Pelajari jenis sampah, cara memilah, dan topik lingkungan melalui materi singkat terstruktur yang dapat dilanjutkan ke kuis.
          </p>
        </div>

        {/* 1. Continue Learning Card */}
        <div className="lapor-enter-card">
          <ModuleContinueCard />
        </div>

        {/* 2. Category Filter Tabs */}
        <ModuleFilterTabs
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* 3. Featured Module Card (Shown on "Semua" or "Jenis Sampah") */}
        {(activeCategory === 'Semua' || activeCategory === 'Jenis Sampah') && (
          <div className="lapor-enter-card-delay-1">
            <FeaturedModuleCard />
          </div>
        )}

        {/* 4. 2-Column Grid of Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lapor-enter-card-delay-2">
          {filteredModules.map((item) => (
            <ModuleGridCard key={item.id} module={item} />
          ))}
        </div>

        {/* Empty state if category has no matches */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-border-warm">
            <p className="text-stone-500 text-sm">
              Belum ada modul untuk kategori <strong>{activeCategory}</strong>.
            </p>
          </div>
        )}

        {/* 5. Progress Belajar Footer Card */}
        <ModuleProgressFooter />
      </div>
    </main>
  )
}

export default ModuleListPage
