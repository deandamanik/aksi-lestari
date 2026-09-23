import { ArrowRightIcon } from '../../../components/common/Icons'

function PengaturanBantuan() {
  return (
    <section
      id="bantuan"
      aria-labelledby="heading-bantuan"
      className="bg-white rounded-2xl border border-[#E8E5DC] p-6 sm:p-8 flex flex-col gap-4 shadow-2xs"
    >
      {/* Header section */}
      <div className="flex flex-col gap-1 border-b border-[#E8E5DC]/80 pb-4">
        <h2
          id="heading-bantuan"
          className="font-display text-lg sm:text-xl font-bold text-stone-900 tracking-tight"
        >
          Bantuan
        </h2>
        <p className="text-xs sm:text-sm text-stone-500">
          Butuh bantuan atau ingin menyampaikan masukan seputar platform?
        </p>
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-[#E8E5DC]/70">
        <a
          href="https://aksilestari.id"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 py-3.5 text-left transition-colors hover:bg-[#FAF9F4]/60 -mx-3 px-3 rounded-xl cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-bold text-stone-900 group-hover:text-primary transition-colors">
              Pusat Bantuan &amp; FAQ
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Temukan jawaban untuk pertanyaan yang sering diajukan mengenai aksi dan verifikasi.
            </p>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-stone-300 group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
        </a>

        <a
          href="mailto:halo@aksilestari.id"
          className="group flex items-center justify-between gap-4 py-3.5 text-left transition-colors hover:bg-[#FAF9F4]/60 -mx-3 px-3 rounded-xl cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-sm font-bold text-stone-900 group-hover:text-primary transition-colors">
              Hubungi AksiLestari
            </span>
            <p className="text-xs text-stone-500 leading-relaxed">
              Kirim pertanyaan atau masukan langsung ke tim pengelola melalui surel resmi.
            </p>
          </div>
          <ArrowRightIcon className="w-4 h-4 text-stone-300 group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
        </a>
      </div>
    </section>
  )
}

export default PengaturanBantuan
