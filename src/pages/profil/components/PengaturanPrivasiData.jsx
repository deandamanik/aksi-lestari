import { ArrowRightIcon } from '../../../components/common/Icons'

function PengaturanPrivasiData({ onOpenDeleteModal, onDownloadData }) {
  return (
    <section
      id="privasi"
      aria-labelledby="heading-privasi"
      className="bg-white rounded-2xl border border-border-warm p-6 sm:p-8 flex flex-col gap-5 shadow-2xs"
    >
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b border-border-warm/80 pb-5">
        <h2
          id="heading-privasi"
          className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Privasi &amp; Data
        </h2>
        <p className="text-xs sm:text-sm text-stone-500">
          Atur bagaimana data kontribusi dan informasi akun kamu digunakan dalam platform.
        </p>
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-border-warm/70">
        {/* Row 1: Pengaturan Privasi */}
        <div className="flex items-center justify-between gap-4 py-4 -mx-3 px-3 rounded-xl transition-colors hover:bg-neutral/60">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-bold text-stone-900">
              Pengaturan Privasi Profil
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Nama dan lencana aksi ditampilkan secara publik dalam rekam jejak sipil lokal.
            </p>
          </div>
          <span className="text-xs font-semibold text-primary select-none shrink-0">
            Publik
          </span>
        </div>

        {/* Row 2: Unduh Data */}
        <button
          type="button"
          onClick={onDownloadData}
          className="group flex items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-neutral/60 -mx-3 px-3 rounded-xl cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-bold text-stone-900 group-hover:text-primary transition-colors">
              Unduh Data Saya
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Dapatkan salinan data profil dan riwayat seluruh aksi partisipasi dalam format JSON.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline shrink-0">
            <span>Unduh</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </button>

        {/* Row 3: Hapus Akun */}
        <button
          type="button"
          onClick={onOpenDeleteModal}
          className="group flex items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-red-50/50 -mx-3 px-3 rounded-xl cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-red-600"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-bold text-red-700 transition-colors">
              Hapus Akun
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Tindakan ini bersifat permanen dan akan menonaktifkan akun partisipasi kamu.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 group-hover:underline shrink-0">
            <span>Hapus</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </button>
      </div>
    </section>
  )
}

export default PengaturanPrivasiData
