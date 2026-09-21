import ProfilNavTabs from './components/ProfilNavTabs'
import { CheckCircle2Icon, InfoIcon } from '../../components/common/Icons'
import { SALDO_APRESIASI } from '../../data/profil/saldoRedeemData'

function ProfilSaldoPage() {
  return (
    <main className="min-h-[100svh] bg-[#FAF9F4] pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Header Title */}
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl sm:text-3xl text-primary font-bold">
            Saldo &amp; Redeem
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Apresiasi moneter dalam mata uang Rupiah atas kontribusi nyata yang telah tervalidasi.
          </p>
        </div>

        {/* Sub-navigation tabs */}
        <ProfilNavTabs />

        {/* Placeholder Foundation Card */}
        <section className="bg-white rounded-2xl border border-[#E8E5DC] shadow-xs p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
            <CheckCircle2Icon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>
          <h2 className="font-display font-bold text-lg text-stone-900">
            Fondasi Saldo Apresiasi Siap
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
            Data saldo riil ({SALDO_APRESIASI.formattedBalance}) dan dua jalur penukaran terpisah (E-Wallet &amp; Voucher) telah terpasang. Tampilan penarikan dan katalog voucher akan dibangun pada tahap berikutnya.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 pt-2">
            <InfoIcon className="w-3.5 h-3.5 text-stone-400" strokeWidth={2} />
            <span>Saldo Apresiasi berdenominasi Rupiah dan terpisah mutlak dari XP.</span>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProfilSaldoPage
