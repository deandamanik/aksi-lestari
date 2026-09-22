/**
 * Mock Data: Saldo Apresiasi & Redeem
 *
 * Aturan PRD Mutlak:
 * - Saldo Apresiasi adalah nilai moneter riil dalam Rupiah (Rp).
 * - Saldo Apresiasi ≠ XP (XP adalah platform progression, Saldo adalah apresiasi finansial riil).
 * - DILARANG mengonversi XP menjadi Rupiah atau menggabungkan keduanya.
 * - E-Wallet dan Voucher adalah 2 jalur penukaran yang terpisah secara tegas:
 *   * E-Wallet: Memilih provider, input manual nominal, input nomor HP, konfirmasi.
 *   * Voucher: Memilih katalog item voucher digital, konfirmasi penukaran.
 */

export const SALDO_APRESIASI = {
  // Nilai moneter dalam Rupiah
  availableBalance: 38500,
  totalEarned: 52500,
  totalRedeemed: 14000,
  currency: 'IDR',
  formattedBalance: 'Rp38.500',
  formattedTotalEarned: 'Rp52.500',
  formattedTotalRedeemed: 'Rp14.000',

  // Penambahan saldo terbaru dari aksi nyata yang terverifikasi
  recentAddition: {
    amount: 4000,
    formattedAmount: '+Rp4.000',
    source: 'Insentif Aksi Mandiri Pemilahan Sampah Terverifikasi',
    date: '18 Sep 2026',
  },

  // Mock Provider E-Wallet (penarikan saldo tunai digital)
  walletProviders: [
    {
      id: 'gopay',
      name: 'GoPay',
      minRedeem: 10000,
      fee: 0,
      description: 'Transfer saldo instan ke akun GoPay terdaftar',
    },
    {
      id: 'dana',
      name: 'DANA',
      minRedeem: 10000,
      fee: 0,
      description: 'Transfer langsung ke dompet DANA',
    },
    {
      id: 'ovo',
      name: 'OVO',
      minRedeem: 10000,
      fee: 0,
      description: 'Transfer saldo OVO Cash',
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      minRedeem: 10000,
      fee: 0,
      description: 'Transfer ke saldo ShopeePay',
    },
  ],

  // Mock Katalog Voucher Digital (penukaran voucher mitra lingkungan)
  voucherCatalog: [
    {
      id: 'vcr-01',
      title: 'Pulsa Reguler',
      description: 'Pulsa semua operator senilai nominal yang dipilih.',
      costRupiah: 10000,
      formattedCost: 'Rp10.000',
      category: 'Pulsa',
    },
    {
      id: 'vcr-02',
      title: 'Token Listrik',
      description: 'Voucher token listrik PLN prabayar.',
      costRupiah: 20000,
      formattedCost: 'Rp20.000',
      category: 'Utilitas',
    },
    {
      id: 'vcr-03',
      title: 'Voucher Belanja',
      description: 'Potongan belanja di gerai mitra Bank Sampah.',
      costRupiah: 25000,
      formattedCost: 'Rp25.000',
      category: 'Belanja',
    },
    {
      id: 'vcr-04',
      title: 'Voucher Transportasi',
      description: 'Saldo transportasi online untuk perjalanan.',
      costRupiah: 15000,
      formattedCost: 'Rp15.000',
      category: 'Transportasi',
    },
  ],

  // Riwayat Penarikan / Redeem
  redemptionHistory: [
    {
      id: 'red-01',
      type: 'voucher',
      methodTitle: 'Voucher Pulsa Reguler',
      target: 'ID: #TRX-9821-PL',
      amountRupiah: 10000,
      formattedAmount: '-Rp10.000',
      date: '12 September 2026, 14:20 WITA',
      status: 'completed',
      statusLabel: 'Berhasil',
    },
    {
      id: 'red-02',
      type: 'voucher',
      methodTitle: 'Token Listrik PLN Rp20.000',
      target: 'ID: SN-9901-TK2',
      amountRupiah: 20000,
      formattedAmount: '-Rp20.000',
      date: '28 Agustus 2026, 10:15 WIB',
      status: 'completed',
      statusLabel: 'Berhasil',
    },
    {
      id: 'red-03',
      type: 'wallet',
      methodTitle: 'Penarikan Saldo ke GoPay',
      target: 'Nomor: Rp10.000 — 0812-3456-7890',
      amountRupiah: 10000,
      formattedAmount: '-Rp10.000',
      date: '14 Agustus 2026, 16:45 WIB',
      status: 'completed',
      statusLabel: 'Berhasil',
    },
  ],
}

/**
 * Sumber penambahan saldo — kontribusi nyata.
 * Displayed on the "Saldo Bertambah Dari Kontribusi Nyata" section.
 */
export const SALDO_SOURCES = [
  {
    id: 'src-01',
    icon: 'camera',
    title: 'Laporan Sampah Tervalidasi',
    description: 'Setiap laporan timbulan sampah yang terverifikasi oleh sistem dan petugas wilayah.',
    amount: '+Rp2.000',
    amountSuffix: 'per laporan terverifikasi',
  },
  {
    id: 'src-02',
    icon: 'users',
    title: 'Aksi Gotong Royong / Mandiri',
    description: 'Apresiasi atas keikutsertaan dalam aksi pembersihan bersama atau penanganan mandiri.',
    amount: '+Rp3.000',
    amountSuffix: 'per aksi terverifikasi',
  },
  {
    id: 'src-03',
    icon: 'recycle',
    title: 'Pemilahan & Bank Sampah',
    description: 'Bonus dari penyetoran sampah terpilah ke bank sampah mitra terdekat.',
    amount: 'Bonus',
    amountSuffix: 'sesuai berat & jenis',
  },
]
