/**
 * RiwayatHeader — Editorial Civic Header
 *
 * Eyebrow, dominant typography heading (Quando), and descriptive subtitle.
 * Sits at the top of the Kontribusi & Riwayat workspace area.
 */
function RiwayatHeader() {
  return (
    <header className="flex flex-col gap-1.5 sm:gap-2">
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-normal tracking-tight leading-tight">
        Kontribusi &amp; Riwayat
      </h1>

      <p className="text-sm sm:text-base text-stone-500 leading-relaxed max-w-2xl">
        Lihat kembali setiap langkah nyata yang sudah kamu lakukan untuk menjaga kelestarian lingkungan dan tata kelola ruang hidup bersama.
      </p>
    </header>
  )
}

export default RiwayatHeader
