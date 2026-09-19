import { useNavigate } from 'react-router-dom'
import { CheckIcon, ArrowRightIcon } from '../../../../components/common/Icons'

function ReportSubmittedCard({ createdAt }) {
  const navigate = useNavigate()

  const formattedDate = createdAt
    ? new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(createdAt))
    : null

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-white border border-[#E8E5DC] shadow-xs p-6 sm:p-10 text-center flex flex-col items-center gap-5">
      <div
        className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center"
        aria-hidden="true"
      >
        <CheckIcon className="w-6 h-6 text-primary" strokeWidth={2.5} />
      </div>

      <div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
          Laporan Berhasil Dikirim
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto mt-2">
          Terima kasih atas kontribusimu. Informasi temuan telah tercatat dan masuk ke antrean verifikasi lapangan.
        </p>
        {formattedDate && (
          <p className="text-[11px] text-stone-400 mt-2 font-medium">
            Dikirim pada {formattedDate}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-stone-100 w-full flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/peta-sampah')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 sm:px-7 rounded-full font-semibold text-sm text-primary bg-white border border-primary/25 hover:bg-primary/[0.04] hover:border-primary/45 transition-colors cursor-pointer active:scale-[0.98]"
        >
          <span>Lihat Peta Sampah</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-7 sm:px-8 rounded-full font-semibold text-sm bg-primary hover:bg-primary/90 text-white transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>Kembali ke Beranda</span>
          <ArrowRightIcon className="w-4 h-4" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  )
}

export default ReportSubmittedCard
