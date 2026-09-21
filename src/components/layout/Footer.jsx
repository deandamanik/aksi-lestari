import { Link } from 'react-router-dom'
import logoAksiLestari from '../../assets/logo-aksilestari.svg'
import { ShieldCheckIcon } from '../common/Icons'

function Footer() {
  return (
    <footer className="bg-white border-t border-border-warm/60">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Column 1: Brand / About */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 sm:gap-3 select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label="AksiLestari Beranda"
            >
              <img
                src={logoAksiLestari}
                alt="Logo AksiLestari"
                className="h-7.5 sm:h-8 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl text-primary tracking-tight">
                AksiLestari
              </span>
            </Link>
            <p className="text-sm text-stone-600 leading-relaxed max-w-sm">
              Gerakan partisipasi masyarakat Indonesia untuk aksi nyata kebersihan lingkungan dan kelestarian alam bersama.
            </p>
          </div>

          {/* Column 2: Fitur Platform */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-bold text-base text-primary tracking-tight">
              Fitur Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/lapor"
                  className="text-stone-600 hover:text-primary transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded"
                >
                  Lapor Sampah Liar
                </Link>
              </li>
              <li>
                <Link
                  to="/peta-sampah"
                  className="text-stone-600 hover:text-primary transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded"
                >
                  Peta Titik Pantau
                </Link>
              </li>
              <li>
                <Link
                  to="/aksipedia"
                  className="text-stone-600 hover:text-primary transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded"
                >
                  AksiPedia Edukasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Partisipasi */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-base text-primary tracking-tight">
              Partisipasi
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/komunitas"
                  className="text-stone-600 hover:text-primary transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded"
                >
                  Komunitas Relawan
                </Link>
              </li>
              <li>
                <span className="text-stone-600 hover:text-primary transition-colors cursor-pointer">
                  Poin &amp; Penghargaan
                </span>
              </li>
              <li>
                <span className="text-stone-600 hover:text-primary transition-colors cursor-pointer">
                  Kebijakan Privasi
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak Sipil */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-bold text-base text-primary tracking-tight">
              Kontak Sipil
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Terbuka untuk kolaborasi pemda, bank sampah, dan komunitas lokal nusantara.
            </p>
            <p className="pt-1">
              <a
                href="mailto:halo@aksilestari.id"
                className="text-sm font-semibold text-primary hover:underline focus:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded"
              >
                halo@aksilestari.id
              </a>
            </p>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-border-warm mt-10 sm:mt-12" />

        {/* Bottom Bar: Copyright and System Verification */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-stone-500">
          <p>© 2024 AksiLestari. Inisiatif Warga untuk Ekosistem Indonesia.</p>
          <div className="flex items-center gap-1.5 font-semibold text-primary text-xs sm:text-sm">
            <ShieldCheckIcon className="w-4 h-4 text-[#22603B]" />
            <span>Sistem Aktif &amp; Terverifikasi</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
