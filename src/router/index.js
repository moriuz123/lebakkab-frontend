import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StaticPage from '../views/StaticPage.vue'
import DetilNews from '../views/DetilNews.vue'
import NotFound from '../views/NotFound.vue'
import NewsList from '../views/NewsList.vue'
import ListPengumuman from '../views/ListPengumuman.vue'
import PengumumanDetail from '../views/PengumumanDetail.vue'
import DokumentPage from '../views/DokumentPage.vue'
import DokumenKategoriPage from '@/views/DokumenKategoriPage.vue' // ✅ import baru
import DokumenDetailPage from '@/views/DokumenDetailPage.vue' // ✅ import baru
import OpdPage from '../views/OpdPage.vue'
import OpdDetail from '../views/OpdDetail.vue'
import FotoPage from '../views/FotoPage.vue'
import VidioPage from '../views/VidioPage.vue'
import KecamatanPage from '@/views/KecamatanPage.vue'
import KecamatanDetail from '@/views/KecamatanDetail.vue'
import LayananPage from '@/views/LayananPage.vue'
import LayananDetail from '@/views/LayananDetail.vue'
import AgendaPage from '@/views/AgendaPage.vue'
import AgendaDetail from '@/views/AgendaDetail.vue'
import AplikasiPage from '../views/AplikasiPage.vue'
import AplikasiDetail from "../views/AplikasiDetail.vue"
import KategoriPage from '@/views/KategoriPage.vue' // ✅ tambah import statis
import SearchPage from '@/views/SearchPage.vue' // ✅ import baru
import BannerUcapan from '@/views/BannerUcapan.vue'
import BannerCategory from '@/views/BannerCategory.vue'
import KritikSaranPage from '@/views/KritikSaranPage.vue'
import PejabatPage from '../views/PejabatPage.vue'
import PejabatDetail from '../views/PejabatDetail.vue'
import ProfilKabupaten from '../views/ProfilKabupaten.vue'
import KontakPage from '../views/KontakPage.vue'
import ComingSoonPage from '../views/ComingSoonPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
  routes: [
    {
      path: '/cctv',
      name: 'ComingSoonCCTV',
      component: ComingSoonPage,
      meta: {
        title: 'Pantauan CCTV Lebak',
        description: 'Layanan pantauan kamera CCTV publik langsung di wilayah Kabupaten Lebak.'
      }
    },
    {
      path: '/kontak',
      name: 'KontakPage',
      component: KontakPage,
      meta: {
        title: 'Hubungi Kami & Layanan Pengaduan',
        description: 'Informasi kontak resmi, alamat kantor, telepon, dan saluran pengaduan Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Beranda',
        description: 'Pusat informasi resmi, transparansi publik, berita daerah, pengumuman, dan layanan terintegrasi Pemerintah Daerah Kabupaten Lebak.'
      }
    },
    {
      path: '/page/:slug',
      name: 'StaticPage',
      component: StaticPage,
      props: true,
      meta: {
        title: 'Halaman Informasi',
        description: 'Informasi dan dokumentasi publik Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/berita',
      name: 'berita.list',
      component: NewsList,
      meta: {
        title: 'Berita & Publikasi Daerah',
        description: 'Kabar terkini seputar pembangunan, kegiatan pemerintah, ekonomi, pariwisata, dan kemasyarakatan di Kabupaten Lebak.'
      }
    },
    {
      path: '/berita/:slug',
      name: 'berita.detail',
      component: DetilNews,
      props: true,
      meta: {
        title: 'Detail Berita',
        description: 'Baca berita lengkap seputar Kabupaten Lebak.'
      }
    },
    {
      path: '/berita/kategori/:slug',
      name: 'KategoriPage',
      component: KategoriPage,
      props: true,
      meta: {
        title: 'Kategori Berita',
        description: 'Daftar berita berdasarkan topik dan kategori di Kabupaten Lebak.'
      }
    },
    {
      path: '/pengumuman',
      name: 'ListPengumuman',
      component: ListPengumuman,
      meta: {
        title: 'Pengumuman Resmi',
        description: 'Informasi pengumuman kedinasan, penerimaan pegawai, lelang, dan edaran bupati Lebak.'
      }
    },
    {
      path: '/pengumuman/:slug',
      name: 'PengumumanDetail',
      component: PengumumanDetail,
      props: true,
      meta: {
        title: 'Detail Pengumuman',
        description: 'Informasi pengumuman resmi Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/dokumen',
      name: 'DokumentPage',
      component: DokumentPage,
      meta: {
        title: 'Dokumen & Regulasi Publik',
        description: 'Unduh produk hukum daerah, Peraturan Daerah (Perda), Peraturan Bupati (Perbup), SK, dan laporan resmi Pemkab Lebak.'
      }
    },
    {
      path: '/dokumen/:slug',
      name: 'DokumenDetailPage',
      component: DokumenDetailPage,
      props: true,
      meta: {
        title: 'Detail Dokumen Resmi',
        description: 'Pratinjau dan unduh dokumen resmi Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/dokumen/kategori/:slug',
      name: 'DokumenKategoriPage',
      component: DokumenKategoriPage,
      props: true,
      meta: {
        title: 'Kategori Dokumen',
        description: 'Daftar dokumen berdasarkan kategori dan instansi penerbit.'
      }
    },
    {
      path: '/foto',
      name: 'FotoPage',
      component: FotoPage,
      meta: {
        title: 'Galeri Foto Kegiatan',
        description: 'Dokumentasi visual kegiatan pemerintahan, keindahan alam, dan budaya Kabupaten Lebak.'
      }
    },
    {
      path: '/vidio',
      name: 'VidioPage',
      component: VidioPage,
      meta: {
        title: 'Galeri Video Daerah',
        description: 'Liputan video dan dokumentasi pembangunan Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/opd',
      name: 'Opd',
      component: OpdPage,
      meta: {
        title: 'Daftar Perangkat Daerah (OPD)',
        description: 'Daftar dinas, badan, kantor, dan instansi pelaksana teknis Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/opd/:slug',
      name: 'OpdDetail',
      component: OpdDetail,
      props: true,
      meta: {
        title: 'Profil Perangkat Daerah',
        description: 'Profil tugas, fungsi, dan layanan Organisasi Perangkat Daerah Kabupaten Lebak.'
      }
    },
    {
      path: '/kecamatan',
      name: 'Kecamatan',
      component: KecamatanPage,
      meta: {
        title: 'Profil 28 Kecamatan',
        description: 'Informasi wilayah, alamat kantor, profil camat, dan layanan 28 kecamatan di Kabupaten Lebak.'
      }
    },
    {
      path: '/kecamatan/:slug',
      name: 'KecamatanDetail',
      component: KecamatanDetail,
      props: true,
      meta: {
        title: 'Detail Kecamatan',
        description: 'Profil wilayah dan pemerintahan kecamatan di Kabupaten Lebak.'
      }
    },
    {
      path: '/layanan',
      name: 'LayananPage',
      component: LayananPage,
      meta: {
        title: 'Katalog Layanan Publik',
        description: 'Daftar layanan administrasi kependudukan, perizinan, kesehatan, sosial, dan fasilitas publik di Kabupaten Lebak.'
      }
    },
    {
      path: '/layanan/kategori/:slug',
      name: 'LayananKategoriPage',
      component: () => import('@/views/LayananKategoriPage.vue'),
      props: true,
      meta: {
        title: 'Kategori Layanan Publik',
        description: 'Daftar layanan terpadu berdasarkan kategori layanan masyarakat.'
      }
    },
    {
      path: '/layanan/:slug',
      name: 'LayananDetail',
      component: LayananDetail,
      props: true,
      meta: {
        title: 'Detail Layanan Publik',
        description: 'Persyaratan, prosedur, durasi, dan cara pengurusan layanan di Kabupaten Lebak.'
      }
    },
    {
      path: '/aplikasi',
      name: 'Aplikasi',
      component: AplikasiPage,
      meta: {
        title: 'Portal Aplikasi & SPBE',
        description: 'Direktori aplikasi digital dan sistem pemerintahan berbasis elektronik (SPBE) Kabupaten Lebak.'
      }
    },
    {
      path: "/aplikasi/:slug",
      name: 'AplikasiDetail',
      component: AplikasiDetail,
      props: true,
      meta: {
        title: 'Detail Aplikasi Digital',
        description: 'Informasi dan akses aplikasi layanan online Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/agenda',
      name: 'Agenda',
      component: AgendaPage,
      meta: {
        title: 'Agenda Kegiatan Daerah',
        description: 'Jadwal agenda kegiatan bupati, wakil bupati, dan acara resmi di Kabupaten Lebak.'
      }
    },
    {
      path: '/agenda/:id',
      name: 'AgendaDetail',
      component: AgendaDetail,
      props: true,
      meta: {
        title: 'Detail Agenda',
        description: 'Rincian jadwal dan lokasi kegiatan resmi Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/banner/ucapan',
      name: 'BannerUcapan',
      component: BannerUcapan,
      meta: {
        title: 'Banner Ucapan & Hari Besar',
        description: 'Kumpulan banner ucapan selamat dan peringatan hari besar daerah.'
      }
    },
    {
      path: '/banner/:slug',
      name: 'BannerCategory',
      component: BannerCategory,
      meta: {
        title: 'Kategori Banner',
        description: 'Kumpulan banner informasi publik Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/kritik-saran',
      name: 'KritikSaranPage',
      component: KritikSaranPage,
      meta: {
        title: 'Kritik, Saran & Pengaduan',
        description: 'Kanal partisipasi masyarakat untuk menyampaikan masukan, aspirasi, dan saran pembangunan.'
      }
    },
    {
      path: '/survei-kepuasan',
      name: 'SurveiKepuasan',
      component: () => import('@/views/SurveiKepuasanPage.vue'),
      meta: {
        title: 'Survei Kepuasan Masyarakat (IKM)',
        description: 'Indeks kepuasan masyarakat terhadap kualitas layanan digital Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/profil-kabupaten',
      name: 'ProfilKabupaten',
      component: ProfilKabupaten,
      meta: {
        title: 'Profil Kabupaten Lebak',
        description: 'Sejarah, visi-misi, lambang daerah, demografi, potensi pariwisata, dan letak geografis Kabupaten Lebak.'
      }
    },
    {
      path: '/profil-pejabat',
      name: 'Pejabat',
      component: PejabatPage,
      meta: {
        title: 'Profil Pimpinan & Pejabat Daerah',
        description: 'Profil bupati, wakil bupati, sekretaris daerah, dan kepala OPD di lingkungan Pemkab Lebak.'
      }
    },
    {
      path: '/profil-pejabat/:slug',
      name: 'PejabatDetail',
      component: PejabatDetail,
      props: true,
      meta: {
        title: 'Detail Pejabat Daerah',
        description: 'Biografi dan riwayat jabatan pimpinan Pemerintah Kabupaten Lebak.'
      }
    },
    {
      path: '/pencarian',
      name: 'SearchPage',
      component: SearchPage,
      props: (route) => ({ q: route.query.q }),
      meta: {
        title: 'Pencarian Terpadu',
        description: 'Cari berita, dokumen, layanan publik, dan regulasi di portal resmi Kabupaten Lebak.'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: 'Halaman Tidak Ditemukan (404)',
        description: 'Maaf, halaman yang Anda tuju tidak ditemukan pada portal ini.'
      }
    },
  ],
})

// Enterprise SEO Navigation Guard
router.afterEach((to) => {
  const siteSuffix = 'Portal Resmi Kabupaten Lebak'
  if (to.meta?.title && !to.meta?.title.includes(siteSuffix)) {
    document.title = `${to.meta.title} | ${siteSuffix}`
  }

  // Synchronize Canonical Link Tag
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  const baseUrl = 'https://lebakkab.go.id'
  canonical.setAttribute('href', `${baseUrl}${to.path}`)

  // Synchronize Meta Description
  if (to.meta?.description) {
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', to.meta.description)
    }
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.setAttribute('content', to.meta.description)
    }
  }

  // Synchronize og:url
  let ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) {
    ogUrl.setAttribute('content', `${baseUrl}${to.path}`)
  }
})

export default router
