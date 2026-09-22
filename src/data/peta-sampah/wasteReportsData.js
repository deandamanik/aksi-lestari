/**
 * Static dummy dataset for waste reports on Peta Sampah (AksiLestari).
 * Deterministic coordinates across Jabodetabek with category, severity, and status.
 */

export const WASTE_REPORTS = [
  // Cluster 1: Muara Angke & Penjaringan (Pesisir Jakarta Utara)
  {
    id: 'rep-001',
    title: 'Akumulasi Botol & Kantong Plastik di Muara',
    category: 'Plastik',
    severity: 'tinggi',
    status: 'menunggu',
    latitude: -6.1158,
    longitude: 106.7742,
    address: 'Kawasan Muara Angke, Penjaringan, Jakarta Utara',
    reportedAt: '2026-09-20',
  },
  {
    id: 'rep-002',
    title: 'Timbunan Sampah Plastik Sekitar Dermaga',
    category: 'Plastik',
    severity: 'tinggi',
    status: 'diproses',
    latitude: -6.1182,
    longitude: 106.7795,
    address: 'Dermaga Kali Adem, Penjaringan, Jakarta Utara',
    reportedAt: '2026-09-19',
  },
  {
    id: 'rep-003',
    title: 'Sampah Sisa Pasar Ikan & Organik',
    category: 'Organik',
    severity: 'sedang',
    status: 'menunggu',
    latitude: -6.1215,
    longitude: 106.772,
    address: 'Sekitar Pasar Ikan Muara Baru, Jakarta Utara',
    reportedAt: '2026-09-21',
  },
  {
    id: 'rep-004',
    title: 'Endapan Residu Plastik di Tanggul Banjir',
    category: 'Plastik',
    severity: 'tinggi',
    status: 'menunggu',
    latitude: -6.114,
    longitude: 106.778,
    address: 'Tanggul Kali Asin, Pluit, Jakarta Utara',
    reportedAt: '2026-09-18',
  },
  {
    id: 'rep-005',
    title: 'Kemasan Plastik & Sterofoam di Saluran Air',
    category: 'Residu',
    severity: 'sedang',
    status: 'diproses',
    latitude: -6.124,
    longitude: 106.782,
    address: 'Jl. Pluit Karang Barat, Penjaringan, Jakarta Utara',
    reportedAt: '2026-09-17',
  },

  // Cluster 2: Manggarai & Bantaran Kali Ciliwung
  {
    id: 'rep-006',
    title: 'Tumpukan Sampah Campuran di Pintu Air',
    category: 'Residu',
    severity: 'tinggi',
    status: 'menunggu',
    latitude: -6.2095,
    longitude: 106.8492,
    address: 'Pintu Air Manggarai, Tebet, Jakarta Selatan',
    reportedAt: '2026-09-21',
  },
  {
    id: 'rep-007',
    title: 'Limbah Plastik Kemasan Menumpuk di Bantaran',
    category: 'Plastik',
    severity: 'tinggi',
    status: 'menunggu',
    latitude: -6.213,
    longitude: 106.852,
    address: 'Bantaran Ciliwung, Bukit Duri, Jakarta Selatan',
    reportedAt: '2026-09-20',
  },
  {
    id: 'rep-008',
    title: 'Sampah Rumah Tangga & Organik Liar',
    category: 'Organik',
    severity: 'sedang',
    status: 'diproses',
    latitude: -6.206,
    longitude: 106.845,
    address: 'Jl. Tambak, Pegangsaan, Menteng, Jakarta Pusat',
    reportedAt: '2026-09-19',
  },
  {
    id: 'rep-009',
    title: 'Residu Material Bangunan & Plastik',
    category: 'Residu',
    severity: 'sedang',
    status: 'selesai',
    latitude: -6.216,
    longitude: 106.856,
    address: 'Kampung Pulo, Jatinegara, Jakarta Timur',
    reportedAt: '2026-09-15',
  },
  {
    id: 'rep-010',
    title: 'Kaleng Cat & Bekas Pelarut Liar',
    category: 'B3',
    severity: 'tinggi',
    status: 'menunggu',
    latitude: -6.2025,
    longitude: 106.842,
    address: 'Kawasan Manggarai Utara, Tebet, Jakarta Selatan',
    reportedAt: '2026-09-22',
  },

  // Cluster 3: Tanah Abang & Kanal Cideng
  {
    id: 'rep-011',
    title: 'Timbunan Limbah Tekstil & Plastik Pembungkus',
    category: 'Residu',
    severity: 'tinggi',
    status: 'menunggu',
    latitude: -6.187,
    longitude: 106.814,
    address: 'Kanal Cideng, Kebon Kacang, Tanah Abang, Jakarta Pusat',
    reportedAt: '2026-09-21',
  },
  {
    id: 'rep-012',
    title: 'Sampah Gelas Plastik Minuman Sekali Pakai',
    category: 'Plastik',
    severity: 'sedang',
    status: 'diproses',
    latitude: -6.184,
    longitude: 106.818,
    address: 'Kawasan Pasar Tanah Abang Blok G, Jakarta Pusat',
    reportedAt: '2026-09-20',
  },
  {
    id: 'rep-013',
    title: 'Kardus & Plastik Tercecer di Bahu Jalan',
    category: 'Plastik',
    severity: 'sedang',
    status: 'selesai',
    latitude: -6.191,
    longitude: 106.8115,
    address: 'Jl. Fachrudin, Tanah Abang, Jakarta Pusat',
    reportedAt: '2026-09-16',
  },

  // Cluster 4: Tanjung Priok & Danau Sunter
  {
    id: 'rep-014',
    title: 'Ceceran Sampah Plastik Pelabuhan',
    category: 'Plastik',
    severity: 'tinggi',
    status: 'menunggu',
    latitude: -6.1325,
    longitude: 106.882,
    address: 'Kawasan Pelabuhan Tanjung Priok, Jakarta Utara',
    reportedAt: '2026-09-20',
  },
  {
    id: 'rep-015',
    title: 'Sampah Botol Plastik & Kantong di Danau',
    category: 'Plastik',
    severity: 'sedang',
    status: 'diproses',
    latitude: -6.136,
    longitude: 106.878,
    address: 'Danau Sunter Selatan, Tanjung Priok, Jakarta Utara',
    reportedAt: '2026-09-18',
  },
  {
    id: 'rep-016',
    title: 'Sisa Ranting & Dedaunan Mengendap',
    category: 'Organik',
    severity: 'rendah',
    status: 'selesai',
    latitude: -6.142,
    longitude: 106.889,
    address: 'Taman Sunter Agung, Tanjung Priok, Jakarta Utara',
    reportedAt: '2026-09-14',
  },

  // Cluster 5: Kebayoran Baru & Gandaria
  {
    id: 'rep-017',
    title: 'Sampah Plastik Kemasan di Bawah Jembatan',
    category: 'Plastik',
    severity: 'sedang',
    status: 'menunggu',
    latitude: -6.244,
    longitude: 106.789,
    address: 'Kebayoran Lama Utara, Kebayoran Lama, Jakarta Selatan',
    reportedAt: '2026-09-21',
  },
  {
    id: 'rep-018',
    title: 'Ranting & Sampah Taman Kota',
    category: 'Organik',
    severity: 'rendah',
    status: 'diproses',
    latitude: -6.2485,
    longitude: 106.793,
    address: 'Jl. Gandaria I, Kramat Pela, Jakarta Selatan',
    reportedAt: '2026-09-19',
  },

  // Cluster 6: Kelapa Gading & Cakung Drain
  {
    id: 'rep-019',
    title: 'Endapan Plastik di Saluran Penghubung',
    category: 'Plastik',
    severity: 'sedang',
    status: 'menunggu',
    latitude: -6.162,
    longitude: 106.908,
    address: 'Boulevard Barat Raya, Kelapa Gading, Jakarta Utara',
    reportedAt: '2026-09-19',
  },
  {
    id: 'rep-020',
    title: 'Kemasan Makanan & Kardus Basah',
    category: 'Residu',
    severity: 'rendah',
    status: 'selesai',
    latitude: -6.158,
    longitude: 106.914,
    address: 'Jl. Pegangsaan Dua, Kelapa Gading, Jakarta Utara',
    reportedAt: '2026-09-15',
  },

  // Cluster 7: Jatinegara & Kampung Melayu
  {
    id: 'rep-021',
    title: 'Tumpukan Sampah Liar di Saluran Drainase',
    category: 'Plastik',
    severity: 'tinggi',
    status: 'menunggu',
    latitude: -6.228,
    longitude: 106.865,
    address: 'Jl. Matraman Raya, Jatinegara, Jakarta Timur',
    reportedAt: '2026-09-21',
  },
  {
    id: 'rep-022',
    title: 'Baterai & Lampu Bekas Terbuang Sembarangan',
    category: 'B3',
    severity: 'sedang',
    status: 'diproses',
    latitude: -6.223,
    longitude: 106.861,
    address: 'Kawasan Kampung Melayu, Jatinegara, Jakarta Timur',
    reportedAt: '2026-09-18',
  },

  // Cluster 8: Bekasi Barat & Kalimalang
  {
    id: 'rep-023',
    title: 'Sampah Plastik Terbawa Aliran Kali Malang',
    category: 'Plastik',
    severity: 'sedang',
    status: 'menunggu',
    latitude: -6.239,
    longitude: 106.992,
    address: 'Bantaran Kalimalang, Jakasampurna, Bekasi Barat',
    reportedAt: '2026-09-20',
  },

  // Cluster 9: Tangerang & Kali Angke Hulu
  {
    id: 'rep-024',
    title: 'Residu Sampah Plastik Rumah Tangga',
    category: 'Plastik',
    severity: 'sedang',
    status: 'menunggu',
    latitude: -6.179,
    longitude: 106.668,
    address: 'Kawasan Cipondoh Indah, Kota Tangerang',
    reportedAt: '2026-09-19',
  },

  // Cluster 10: Depok & Margonda
  {
    id: 'rep-025',
    title: 'Sisa Pembungkus Plastik & Sedotan Minuman',
    category: 'Plastik',
    severity: 'rendah',
    status: 'selesai',
    latitude: -6.372,
    longitude: 106.834,
    address: 'Jl. Margonda Raya, Pondok Cina, Kota Depok',
    reportedAt: '2026-09-17',
  },
]

/**
 * Deterministic conversion of waste reports array to a standard GeoJSON FeatureCollection.
 * Coordinates are formatted strictly as [longitude, latitude] per GeoJSON standard.
 */
export function wasteReportsToGeoJSON(reports = WASTE_REPORTS) {
  return {
    type: 'FeatureCollection',
    features: reports.map((report) => {
      // Deterministic weight mapping based on severity
      const weight =
        report.severity === 'tinggi' ? 1.5 : report.severity === 'sedang' ? 1.0 : 0.5

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [report.longitude, report.latitude],
        },
        properties: {
          id: report.id,
          title: report.title,
          category: report.category,
          severity: report.severity,
          weight,
          status: report.status,
        },
      }
    }),
  }
}
