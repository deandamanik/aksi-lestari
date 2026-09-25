import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AksiPediaHero from './components/AksiPediaHero'
import ScanFeatureCard from './components/ScanFeatureCard'
import LearningModulesSection from './components/LearningModulesSection'
import LearningProgressCard from './components/LearningProgressCard'
import AksiPediaHubCTA from './components/AksiPediaHubCTA'
import ScanUploadSection from './components/ScanUploadSection'
import ScanResultSection from './components/ScanResultSection'
import HandlingStepsSection from './components/HandlingStepsSection'
import ReuseIdeasSection from './components/ReuseIdeasSection'
import WasteBankSection from './components/WasteBankSection'
import LearnMoreBanner from './components/LearnMoreBanner'
import AuthPromptModal from '../../components/common/AuthPromptModal'

function AksiPediaPage() {
  const { isAuthenticated } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const modeParam = searchParams.get('mode')

  // Derive viewMode directly from searchParams (idiomatic React, no redundant sync effect)
  const viewMode = modeParam === 'scan' ? 'scan' : modeParam === 'hasil' ? 'result' : 'hub'

  const [selectedImage, setSelectedImage] = useState(null)
  const [isIdentifying, setIsIdentifying] = useState(false)
  const [showScanAuthPrompt, setShowScanAuthPrompt] = useState(false)

  // Scroll to top whenever the view mode changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewMode])

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
    if (!selectedImage) return
    setIsIdentifying(true)

    // Simulated identification latency (~1.2s) for realistic prototype UX
    setTimeout(() => {
      setIsIdentifying(false)
      setSearchParams({ mode: 'hasil' })
    }, 1200)
  }

  const handleResetScan = () => {
    setSelectedImage(null)
    setSearchParams({ mode: 'scan' })
  }

  return (
    <main className="min-h-screen bg-neutral text-primary">
      {viewMode === 'hub' && (
        <div className="animate-in fade-in duration-300">
          <AksiPediaHero />
          <ScanFeatureCard onStartScan={handleStartScan} />
          <div id="modul-belajar-section">
            <LearningModulesSection />
          </div>
          <LearningProgressCard />
          <AksiPediaHubCTA onStartScan={handleStartScan} />
        </div>
      )}

      {viewMode === 'scan' && (
        <div className="animate-in fade-in duration-300">
          <ScanUploadSection
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            onIdentify={handleIdentify}
            isIdentifying={isIdentifying}
            onBackToHub={handleBackToHub}
          />
        </div>
      )}

      {viewMode === 'result' && (
        <div className="animate-in fade-in duration-300">
          <ScanResultSection
            uploadedImage={selectedImage}
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
