<template>
  <section class="bg-gray-50/50 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-1 bg-[#1e5ca8] rounded-full"></span>
            <span class="text-[#e8a020] font-bold uppercase tracking-wider text-sm">Update Publik</span>
          </div>
          <h2 class="text-3xl font-black text-gray-900 tracking-tight">Berita Terkini</h2>
        </div>
        <router-link to="/berita" class="group flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#e8a020] transition-colors">
          Lihat Semua Berita
          <div class="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center group-hover:border-[#1e5ca8] group-hover:bg-[#f8f9fc] transition-all">
             <ArrowRight class="w-4 h-4" />
          </div>
        </router-link>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- =========================
             KOLOM BERITA (LG: 8 Cols)
             ========================= -->
        <div class="lg:col-span-8">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6 h-full">
            
            <!-- KIRI: BERITA UTAMA (60%) -->
            <div
              v-if="featured"
              class="md:col-span-3 flex flex-col group cursor-pointer"
              @click="$router.push(`/berita/${featured.slug}`)"
            >
              <div class="w-full relative overflow-hidden rounded-2xl aspect-[16/9] mb-4 shadow-sm group-hover:shadow-md transition-all duration-500">
                <img
                  :src="featured.image"
                  alt="Featured News"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div class="flex-1 flex flex-col px-1">
                <!-- Gunakan Kategori asli jika ada, sementara default ke "PEMERINTAHAN" -->
                <span class="text-[10px] font-bold text-[#e8a020] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#1e5ca8]"></span> Pemerintahan
                </span>
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#e8a020] transition-colors line-clamp-3">
                  {{ featured.title }}
                </h2>
                <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-auto">
                  <Calendar class="w-3 h-3"/> {{ formatDate(featured.date, { month: 'long' }) }}
                </div>
              </div>
            </div>

            <!-- KANAN: LIST BERITA (40%) -->
            <div class="md:col-span-2 flex flex-col justify-between">
              <div class="flex flex-col divide-y divide-gray-100 h-full">
                <!-- Tampilkan 3 berita saja agar proporsi tingginya seimbang dengan Berita Utama -->
                <div
                  v-for="(news, index) in latestNews.slice(0, 3)"
                  :key="index"
                  class="flex gap-4 py-4 first:pt-0 last:pb-0 group cursor-pointer"
                  @click="$router.push(`/berita/${news.slug}`)"
                >
                  <div class="w-24 h-20 sm:w-28 sm:h-24 shrink-0 relative overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                      :src="news.image"
                      alt="News Thumbnail"
                      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div class="flex-1 flex flex-col justify-center">
                    <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-[#e8a020] transition-colors">Informasi Publik</span>
                    <h3 class="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#e8a020] transition-colors mb-1.5">
                      {{ news.title }}
                    </h3>
                    <div class="text-[11px] text-gray-500 font-medium mt-auto">
                      {{ formatDate(news.date) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <!-- =========================
             KOLOM BANNER (LG: 4 Cols)
             ========================= -->
        <div class="lg:col-span-4" v-if="banners.length">
          <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col">
            <div class="flex items-center justify-between mb-6 shrink-0">
              <h3 class="text-lg font-black text-gray-900 flex items-center gap-2">
                <ImageIcon class="w-5 h-5 text-[#e8a020]" /> Banner
              </h3>
              <button @click="nextBanner" class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#e8a020] hover:bg-[#f8f9fc] transition-colors" title="Ganti Banner">
                <RefreshCw class="w-4 h-4" />
              </button>
            </div>

            <div class="relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:flex-1 shadow-inner group">
              <img
                :src="banners[previousBanner]"
                alt="Banner Previous"
                class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                :class="{
                  'opacity-0': currentBanner === previousBanner,
                  'opacity-100 z-10': currentBanner !== previousBanner,
                }"
              />
              <img
                :src="banners[currentBanner]"
                alt="Banner Current"
                class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                :class="{
                  'opacity-100 z-20': currentBanner === previousBanner,
                  'opacity-0': currentBanner !== previousBanner,
                }"
              />
              
              <!-- Gradient Overlay for Banner -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useBeritaStore } from '@/stores/useBeritaStore'
import { onMounted, ref } from 'vue'
import axios from '@/utils/api'
import { formatDate, getStorageUrl } from '@/utils/helpers'
import { ArrowRight, Calendar, Clock, Image as ImageIcon, RefreshCw } from 'lucide-vue-next'

export default {
  name: 'ContentSection',
  components: {
    ArrowRight,
    Calendar,
    Clock,
    ImageIcon,
    RefreshCw
  },
  setup() {
    const beritaStore = useBeritaStore()
    const featured = ref(null)
    const latestNews = ref([])
    const banners = ref([])
    const currentBanner = ref(0)
    const previousBanner = ref(0)
    let bannerInterval = null

    const fetchData = async () => {
      await beritaStore.fetchBeritas()
      if (beritaStore.beritas.length > 0) {
        const data = beritaStore.beritas
        featured.value = {
          image: getStorageUrl(data[0].thumbnail),
          title: data[0].judul,
          date: data[0].tanggal_publish,
          excerpt: data[0].excerpt ?? '',
          slug: data[0].slug,
        }
        latestNews.value = data.slice(1, 5).map((item) => ({
          image: getStorageUrl(item.thumbnail),
          title: item.judul,
          date: item.tanggal_publish,
          slug: item.slug,
        }))
      }

      const bannerRes = await axios.get('/api/banner?kategori=ucapan')
      if (Array.isArray(bannerRes.data)) {
        banners.value = bannerRes.data.map((item) => getStorageUrl(item.gambar))
      }
    }

    const nextBanner = () => {
      previousBanner.value = currentBanner.value
      currentBanner.value = (currentBanner.value + 1) % banners.value.length
    }

    onMounted(() => {
      fetchData()
      bannerInterval = setInterval(nextBanner, 5000)
    })

    return {
      featured,
      latestNews,
      banners,
      currentBanner,
      previousBanner,
      nextBanner,
      formatDate,
    }
  },
}
</script>
