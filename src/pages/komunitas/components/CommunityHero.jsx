export default function CommunityHero() {
  return (
    <section className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 md:pb-10 overflow-visible select-none z-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl flex flex-col items-start">
          {/* Headline in Quando serif font */}
          <h1 className="font-display font-normal text-primary text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.125rem] tracking-tight leading-[1.18] mb-2.5 sm:mb-3.5">
            Bergerak Bersama
          </h1>

          {/* Subtitle with authentic brand green tone matching Beranda & AksiPedia */}
          <p className="font-body text-primary/80 md:text-primary/75 font-medium md:font-normal text-sm sm:text-base md:text-[1.0625rem] leading-relaxed max-w-2xl">
            Temukan kegiatan lingkungan di sekitarmu dan ikut ambil bagian dalam perubahan nyata di lapangan. Tanpa hiruk pikuk media sosial—fokus pada gotong royong terukur.
          </p>
        </div>
      </div>
    </section>
  )
}


