import { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useObjectURL } from '../../hooks/useObjectURL'
import AksiPediaHero from './components/AksiPediaHero'
import LearningModulesSection from './components/LearningModulesSection'
import LearningProgressCard from './components/LearningProgressCard'
import ScanUploadSection from './components/ScanUploadSection'
import ScanResultSection from './components/ScanResultSection'
import HandlingStepsSection from './components/HandlingStepsSection'
import ReuseIdeasSection from './components/ReuseIdeasSection'
import WasteBankSection from './components/WasteBankSection'
import LearnMoreBanner from './components/LearnMoreBanner'
import AuthPromptModal from '../../components/common/AuthPromptModal'

function AksiPediaPage() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const modeParam = searchParams.get('mode')

  // Derive viewMode directly from searchParams (idiomatic React, no redundant sync effect)
  const viewMode = modeParam === 'scan' ? 'scan' : modeParam === 'hasil' ? 'result' : 'hub'

  const [selectedFile, setSelectedFile] = useState(null)
  const [isIdentifying, setIsIdentifying] = useState(false)
  const [showScanAuthPrompt, setShowScanAuthPrompt] = useState(false)

  // Manage safe object URL lifecycle for uploaded file
  const objectUrl = useObjectURL(selectedFile)

  // Scroll to hash target if provided, otherwise top
  useEffect(() => {
    if (viewMode === 'hub' && location.hash) {
      const targetId = location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
        return () => clearTimeout(timer)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [viewMode, location.hash])

  const handleStartScan = () => {
    if (!isAuthenticated) {
      setShowScanAuthPrompt(true)
      return
    }
    setSearchParams({ mode: 'scan' })
  }

  const handleBackToHub = () => {
    setSearchParams({})
  }

  const handleIdentify = () => {
    if (!selectedFile) return
    setIsIdentifying(true)

    // Simulated identification latency (~1.2s) for realistic prototype UX
    setTimeout(() => {
      setIsIdentifying(false)
      setSearchParams({ mode: 'hasil' })
    }, 1200)
  }

  const handleResetScan = () => {
    setSelectedFile(null)
    setSearchParams({ mode: 'scan' })
  }

  return (
    <main className="min-h-screen bg-neutral text-primary">
      {viewMode === 'hub' && (
        <div className="animate-in fade-in duration-300">
          <AksiPediaHero onStartScan={handleStartScan} />
          <div id="modul" className="scroll-mt-16">
            <div id="modul-belajar-section" className="sr-only" aria-hidden="true" />
            <LearningModulesSection />
            <LearningProgressCard />
          </div>
        </div>
      )}

      {viewMode === 'scan' && (
        <div className="animate-in fade-in duration-300">
          <ScanUploadSection
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            onIdentify={handleIdentify}
            isIdentifying={isIdentifying}
            onBackToHub={handleBackToHub}
          />
        </div>
      )}

      {viewMode === 'result' && (
        <div className="animate-in fade-in duration-300">
          <ScanResultSection
            uploadedImage={objectUrl}
            onResetScan={handleResetScan}
          />
          <HandlingStepsSection />
          <ReuseIdeasSection />
          <WasteBankSection />
          <LearnMoreBanner />
        </div>
      )}

      <AuthPromptModal
        isOpen={showScanAuthPrompt}
        onClose={() => setShowScanAuthPrompt(false)}
        title="Masuk untuk melanjutkan"
        description="Masuk untuk menggunakan Scan dan menyimpan aktivitasmu."
        returnTo={{ pathname: '/aksipedia', search: '?mode=scan', hash: '' }}
        intent={{ type: 'start-scan' }}
      />
    </main>
  )
}

export default AksiPediaPage
