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
  availableBalance: 35000,
  totalEarned: 80000,
  totalRedeemed: 45000,
  currency: 'IDR',
  formattedBalance: 'Rp 35.000',

  // Penambahan saldo terbaru dari aksi nyata yang terverifikasi
  recentAddition: {
    amount: 15000,
    formattedAmount: '+Rp 15.000',
    source: 'Insentif Aksi Mandiri Pemilahan Sampah Terverifikasi',
    date: '18 Sep 2026',
  },

  // Mock Provider E-Wallet (penarikan saldo tunai digital)
  walletProviders: [
    {
      id: 'gopay',
      name: 'GoPay',
      minRedeem: 20000,
      fee: 0,
      description: 'Transfer saldo instan ke akun GoPay terdaftar',
    },
    {
      id: 'dana',
      name: 'DANA',
      minRedeem: 20000,
      fee: 0,
      description: 'Transfer langsung ke dompet DANA',
    },
    {
      id: 'ovo',
      name: 'OVO',
      minRedeem: 20000,
      fee: 0,
      description: 'Transfer saldo OVO Cash',
    },
  ],

  // Mock Katalog Voucher Digital (penukaran voucher mitra lingkungan)
  voucherCatalog: [
    {
      id: 'vcr-01',
      partner: 'Bank Sampah Induk Sadang',
      title: 'Voucher Sembako Murah Rp25.000',
      description: 'Potongan belanja bahan pangan pokok di gerai mitra Bank Sampah Induk.',
      costRupiah: 25000,
      category: 'Sembako',
      stock: 14,
    },
    {
      id: 'vcr-02',
      partner: 'Kompos Lestari Bandung',
      title: 'Diskon 20% Pembelian Starter Kit Kompos',
      description: 'Potongan harga paket wadah komposter dan mikroba pengurai.',
      costRupiah: 15000,
      category: 'Pertanian',
      stock: 25,
    },
    {
      id: 'vcr-03',
      partner: 'Toko Bibit Hijau',
      title: 'Voucher Tebus 2 Bibit Tanaman Produktif',
      description: 'Dapat ditukarkan dengan bibit pohon buah atau tanaman herbal obat keluarga.',
      costRupiah: 20000,
      category: 'Penghijauan',
      stock: 8,
    },
  ],

  // Riwayat Penarikan / Redeem
  redemptionHistory: [
    {
      id: 'red-01',
      type: 'wallet',
      methodTitle: 'Penarikan GoPay',
      target: '0812-****-7890',
      amountRupiah: 25000,
      date: '10 Sep 2026, 14.30 WIB',
      status: 'completed',
      statusLabel: 'Berhasil Ditransfer',
    },
    {
      id: 'red-02',
      type: 'voucher',
      methodTitle: 'Voucher Starter Kit Kompos',
      target: 'Kode: KLB-8839-2026',
      amountRupiah: 15000,
      date: '28 Agu 2026, 10.15 WIB',
      status: 'completed',
      statusLabel: 'Telah Ditukar',
    },
    {
      id: 'red-03',
      type: 'wallet',
      methodTitle: 'Penarikan DANA',
      target: '0812-****-7890',
      amountRupiah: 20000,
      date: '14 Agu 2026, 16.45 WIB',
      status: 'completed',
      statusLabel: 'Berhasil Ditransfer',
    },
  ],
}
