import {
  CameraIcon,
  SearchIcon,
  ClipboardCheckIcon,
  SparklesIcon,
} from '../../components/common/Icons'

/**
 * Configuration for Section 3: "Empat Langkah Nyata Bergerak".
 * Represents the four sequential steps from environmental observation to meaningful participation.
 */
export const ACTION_JOURNEY_STEPS = [
  {
    id: 1,
    number: '01',
    title: 'Temukan',
    description:
      'Lihat dan laporkan masalah lingkungan di sekitar kamu melalui foto dan lokasi.',
    supportingText: 'Mulai dari satu temuan nyata.',
    icon: CameraIcon,
  },
  {
    id: 2,
    number: '02',
    title: 'Kenali',
    description:
      'Pahami jenis sampah, tingkat pencemaran, dan dampaknya bagi lingkungan.',
    supportingText: 'Pahami sebelum menentukan langkah.',
    icon: SearchIcon,
  },
  {
    id: 3,
    number: '03',
    title: 'Pilih Aksi',
    description:
      'Laporkan temuan ke instansi terkait atau ajukan tindakan bersama warga sekitar.',
    supportingText: 'Pilih tindakan yang paling relevan.',
    icon: ClipboardCheckIcon,
  },
  {
    id: 4,
    number: '04',
    title: 'Berkontribusi',
    description:
      'Setiap aksi tervalidasi menjadi kontribusi nyata yang tercatat dalam catatan rekam jejak aplikasi.',
    supportingText: 'Setiap aksi meninggalkan jejak.',
    icon: SparklesIcon,
  },
]
