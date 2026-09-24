/**
 * PengaturanHeader — Clean Settings Header
 *
 * Dominant typography heading (Quando) and clear descriptive subtitle.
 * No redundant duplicate title in eyebrow.
 */
function PengaturanHeader() {
  return (
    <header className="flex flex-col gap-1.5">
      <h1 className="font-display text-2xl sm:text-3xl text-stone-900 font-bold tracking-tight leading-tight">
        Pengaturan Akun
      </h1>
      <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-2xl">
        Kelola informasi pribadi, preferensi notifikasi, dan keamanan akun partisipasimu.
      </p>
    </header>
  )
}

export default PengaturanHeader
