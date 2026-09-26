import { UserIcon } from '../../../../components/common/Icons'

export default function MyStandingCard({ currentUser }) {
  if (!currentUser) return null

  return (
    <article className="bg-white rounded-2xl border border-border-warm p-5 shadow-2xs">
      {/* Header Label */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold text-secondary font-body">
          Akun Saya
        </span>
        <span className="text-xs text-stone-400 font-body">
          Wilayah DKI Jakarta
        </span>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-sm shrink-0">
          <UserIcon className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-body font-bold text-primary text-base truncate">
            {currentUser.name}
          </h3>
          <p className="text-xs text-stone-500 font-body mt-0.5">
            Gelar: <strong className="text-primary font-semibold">{currentUser.badge}</strong>
          </p>
        </div>
      </div>

      {/* Clean Bottom Summary Row without nested card boxes */}
      <div className="mt-4 pt-3.5 border-t border-border-warm flex items-center justify-between text-xs font-body text-stone-600">
        <span>
          Peringkat <strong className="text-primary font-bold">#{currentUser.rank}</strong>
        </span>
        <span>
          Total Poin <strong className="text-primary font-bold">{currentUser.xp}</strong>
        </span>
      </div>
    </article>
  )
}


