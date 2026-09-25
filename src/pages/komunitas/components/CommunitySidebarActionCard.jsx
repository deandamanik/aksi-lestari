import Button from '../../../components/common/Button'
import {
  GraduationCapIcon,
  ClockIcon,
  UsersIcon,
  ArrowRightIcon,
} from '../../../components/common/Icons'

export default function CommunitySidebarActionCard({
  action,
  onOpenDetail,
}) {
  if (!action) return null

  return (
    <article className="bg-white rounded-2xl sm:rounded-3xl border border-border-warm p-5 sm:p-6 shadow-2xs hover:border-primary/30 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 motion-reduce:transform-none flex flex-col justify-between">
      <div>
        {/* Top Header: Status and SubCategory */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span>{action.status || 'Terbuka'}</span>
          </span>
          <span className="text-xs text-stone-400 font-normal">
            {action.subCategory || 'Edukasi Generasi'}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetail(action)}
          className="font-display text-primary text-base sm:text-lg font-bold leading-snug tracking-tight mb-2 hover:text-primary transition-colors duration-150 cursor-pointer"
        >
          {action.title}
        </h3>

        {/* Description */}
        <p className="font-body text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
          {action.description}
        </p>

        {/* Action Details List */}
        <div className="space-y-2 text-xs text-stone-600">
          <div className="flex items-center gap-2.5">
            <GraduationCapIcon className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{action.location}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ClockIcon className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{action.date} · {action.time}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <UsersIcon className="w-4 h-4 text-primary shrink-0" />
            <span>
              {action.note || `${action.participants} relawan pendamping bergabung`}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onOpenDetail(action)}
        className="w-full mt-5 hover:bg-primary hover:text-white group"
      >
        <span>Lihat Aksi</span>
        <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-180 group-hover:translate-x-0.5 motion-reduce:transform-none" />
      </Button>
    </article>
  )
}
