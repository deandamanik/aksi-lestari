/**
 * Mock data for Bank Sampah Terdekat and disclaimer notice.
 */

export const WASTE_BANKS_DATA = {
  title: 'Bank Sampah Terdekat',
  subtitle: 'Lokasi pengumpulan resmi di sekitar Coblong yang menerima kemasan botol plastik PET.',
  items: [
    {
      id: 'bs-1',
      name: 'Bank Sampah Hijau Lestari',
      status: 'Aktif Menerima',
      statusType: 'success',
      distance: '1,2 km',
      address: 'Jl. Taman Sari No. 42, Coblong, Bandung',
      acceptedItems: 'Plastik PET, Botol Kaca, Kardus',
      schedule: 'Rabu & Sabtu, 08.00 - 14.00 WIB',
      mapUrl: 'https://maps.google.com/?q=Jl.+Taman+Sari+No.+42,+Coblong,+Bandung',
      iconType: 'recycle',
    },
    {
      id: 'bs-2',
      name: 'Bank Sampah Bersih Bersama RW 05',
      status: 'Jadwal Mingguan',
      statusType: 'neutral',
      distance: '2,4 km',
      address: 'Jl. Dago Elos No. 18, Bandung',
      acceptedItems: 'Semua Jenis Plastik, Kertas, Logam',
      schedule: 'Setiap Minggu, 09.00 - 12.00 WIB',
      mapUrl: 'https://maps.google.com/?q=Jl.+Dago+Elos+No.+18,+Bandung',
      iconType: 'building',
    },
  ],
  disclaimer: {
    title: 'Pemberitahuan Layanan:',
    content:
      'Layanan Bank Sampah menyediakan titik penyaluran fisik secara mandiri di komunitas. AksiLestari menyajikan informasi lokasi untuk rujukan warga tanpa memproses transaksi komersial atau pencairan saldo tabungan sampah.',
  },
}
