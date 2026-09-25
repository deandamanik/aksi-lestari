import { Link } from 'react-router-dom'
import { CameraIcon } from '../../../components/common/Icons'
import { HUB_CLOSING_CTA_DATA } from '../../../data/aksipedia/aksipediaHubData'

function AksiPediaHubCTA({ onStartScan }) {
  const { tag, heading, subheading, primaryCta, secondaryCta } = HUB_CLOSING_CTA_DATA

  return (
    <section className="w-full pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl sm:rounded-[36px] p-8 sm:p-12 lg:p-14 text-white shadow-md relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div
            className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3 select-none">
                {tag}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
                {heading}
              </h2>
              <p className="font-body text-white/85 text-sm sm:text-base leading-relaxed">
                {subheading}
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={onStartScan}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-neutral text-primary text-sm sm:text-base font-bold hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                <CameraIcon className="w-4 h-4 text-primary" />
                <span>{primaryCta}</span>
              </button>

              <Link
                to="/komunitas"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full text-white hover:text-white/90 hover:bg-white/10 text-sm sm:text-base font-semibold transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white text-center"
              >
                <span>{secondaryCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AksiPediaHubCTA
