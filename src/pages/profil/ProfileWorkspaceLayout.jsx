import { Outlet } from 'react-router-dom'
import ProfileIdentityArea from './components/ProfileIdentityArea'
import ProfileWorkspaceNav from './components/ProfileWorkspaceNav'

/**
 * ProfileWorkspaceLayout — Personal Environmental Workspace Shell
 *
 * Implements the core 2-column workspace architecture:
 * - LEFT (Desktop lg+): Persistent ProfileIdentityArea (who I am)
 * - RIGHT (Desktop lg+): ProfileWorkspaceNav + Active Route Content (what I am doing)
 * - Mobile / Tablet (< lg): Stacked compact identity + scrollable tabs + route content
 */
function ProfileWorkspaceLayout() {
  return (
    <main
      className="relative min-h-[100svh] bg-neutral pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 animate-page-enter"
      aria-label="Profile Workspace AksiLestari"
    >
      {/* Layer 1: Exact Beranda/Lapor first viewport hero composition */}
      <div
        className="absolute top-0 left-0 right-0 h-[100svh] min-h-[580px] pointer-events-none select-none z-0 overflow-hidden"
        style={{
          backgroundImage: 'url(/images/pattern.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Seamless repeating vertical continuation for long profile pages */}
      <div
        className="absolute top-[100svh] left-0 right-0 bottom-0 pointer-events-none select-none z-0 overflow-hidden"
        style={{
          backgroundImage: 'url(/images/pattern.webp)',
          backgroundSize: 'max(100%, 1024px) auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'repeat-y',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-6 sm:gap-8">
        {/* Left Column: Persistent Identity Panel (Sticky on Desktop) */}
        <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0 lg:sticky lg:top-28">
          <div className="profil-enter-left">
            <ProfileIdentityArea />
          </div>
        </aside>

        {/* Right Column: Active Workspace Area */}
        <section className="flex-1 min-w-0 w-full flex flex-col gap-6 sm:gap-8">
          {/* Workspace Navigation Bar */}
          <div className="profil-enter">
            <ProfileWorkspaceNav />
          </div>

          {/* Active Route Content */}
          <div className="min-w-0 w-full">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProfileWorkspaceLayout
