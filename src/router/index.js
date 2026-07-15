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
import KategoriPage from '@/views/KategoriPage.vue' // ✅ tambah import statis
import SearchPage from '@/views/SearchPage.vue' // ✅ import baru
// ✅ import halaman banner
import BannerUcapan from '@/views/BannerUcapan.vue'
import BannerInfografis from '@/views/BannerInfografis.vue'
import KritikSaranPage from '@/views/KritikSaranPage.vue'
import PejabatPage from '@/views/PejabatPage.vue'
import PejabatDetail from '@/views/PejabatDetail.vue'
import ProfilKabupaten from '@/views/ProfilKabupaten.vue'
import SponTtePage from '@/views/SponTtePage.vue' // ✅ import SPON TTE

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
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/page/:slug',
      name: 'StaticPage',
      component: StaticPage,
      props: true,
    },
    {
      path: '/berita',
      name: 'berita.list',
      component: NewsList,
    },
    {
      path: '/berita/:slug',
      name: 'berita.detail',
      component: DetilNews,
      props: true,
    },
    {
      path: '/berita/kategori/:slug', // ✅ konsisten
      name: 'KategoriPage',
      component: KategoriPage,
      props: true,
    },
    {
      path: '/pengumuman',
      name: 'ListPengumuman',
      component: ListPengumuman,
    },
    {
      path: '/pengumuman/:slug',
      name: 'PengumumanDetail',
      component: PengumumanDetail,
      props: true,
    },
    {
      path: '/dokumen',
      name: 'DokumentPage',
      component: DokumentPage,
    },

    {
      path: '/dokumen/kategori/:slug',
      name: 'DokumenKategoriPage',
      component: DokumenKategoriPage,
      props: true,
    },

    {
      path: '/foto',
      name: 'FotoPage',
      component: FotoPage,
    },
    {
      path: '/vidio',
      name: 'VidioPage',
      component: VidioPage,
    },
    {
      path: '/opd',
      name: 'Opd',
      component: OpdPage,
    },
    {
      path: '/opd/:slug',
      name: 'OpdDetail',
      component: OpdDetail,
      props: true,
    },
    {
      path: '/kecamatan',
      name: 'Kecamatan',
      component: KecamatanPage,
    },
    {
      path: '/kecamatan/:slug',
      name: 'KecamatanDetail',
      component: KecamatanDetail,
      props: true,
    },
    {
      path: '/layanan',
      name: 'LayananPage',
      component: LayananPage,
    },
    {
      path: '/layanan/kategori/:slug',
      name: 'LayananKategoriPage',
      component: () => import('@/views/LayananKategoriPage.vue'),
      props: true,
    },
    {
      path: '/layanan/:slug',
      name: 'LayananDetail',
      component: LayananDetail,
      props: true,
    },
    {
      path: '/aplikasi',
      name: 'Aplikasi',
      component: AplikasiPage,
    },
    {
      path: '/agenda',
      name: 'Agenda',
      component: AgendaPage,
    },
    {
      path: '/agenda/:id', // ✅ route baru
      name: 'AgendaDetail',
      component: AgendaDetail,
      props: true,
    },

    // ✅ route banner
    {
      path: '/banner/ucapan',
      name: 'BannerUcapan',
      component: BannerUcapan,
    },
    {
      path: '/banner/infografis',
      name: 'BannerInfografis',
      component: BannerInfografis,
    },

    {
      path: '/kritik-saran',
      name: 'KritikSaranPage',
      component: KritikSaranPage,
    },
    {
      path: '/profil-kabupaten',
      name: 'ProfilKabupaten',
      component: ProfilKabupaten,
    },
    {
      path: '/profil-pejabat',
      name: 'Pejabat',
      component: PejabatPage,
    },
    {
      path: '/profil-pejabat/:slug',
      name: 'PejabatDetail',
      component: PejabatDetail,
      props: true,
    },
    {
      path: '/pencarian',
      name: 'SearchPage',
      component: SearchPage,
      props: (route) => ({ q: route.query.q }),
    },
    {
      path: '/spon-tte',
      name: 'SponTte',
      component: SponTtePage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
