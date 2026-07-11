<template>
  <section class="bg-gray-50/50 py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-1 bg-green-500 rounded-full"></span>
            <span class="text-green-600 font-bold uppercase tracking-wider text-sm">Update Publik</span>
          </div>
          <h2 class="text-3xl font-black text-gray-900 tracking-tight">Berita Terkini</h2>
        </div>
        <router-link to="/berita" class="group flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-green-600 transition-colors">
          Lihat Semua Berita
          <div class="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center group-hover:border-green-200 group-hover:bg-green-50 transition-all">
             <ArrowRight class="w-4 h-4" />
          </div>
        </router-link>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- =========================
             KOLOM BERITA (LG: 8 Cols)
             ========================= -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <!-- BERITA UTAMA -->
          <div
            v-if="featured"
            class="group cursor-pointer bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-green-500/10 hover:border-green-200 transition-all duration-500 flex flex-col sm:flex-row overflow-hidden"
            @click="$router.push(`/berita/${featured.slug}`)"
          >
            <div class="w-full sm:w-1/2 relative overflow-hidden shrink-0 h-64 sm:h-auto">
              <img
                :src="featured.image"
                alt="Featured News"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 sm:from-transparent sm:bg-gradient-to-r sm:from-gray-900/10 sm:to-transparent to-transparent opacity-100"></div>
              <div class="absolute top-4 left-4 z-10">
                <span class="inline-block px-3 py-1.5 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">Sorotan Utama</span>
              </div>
            </div>
            <div class="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-white z-10 relative">
              <!-- Decorative blob -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl opacity-50 pointer-events-none transform translate-x-10 -translate-y-10 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="flex items-center gap-3 text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider relative z-10">
                <span class="flex items-center gap-1.5 text-green-600 bg-green-50 px-2.5 py-1 rounded-md"><Calendar class="w-4 h-4"/> {{ formatDate(featured.date, { month: 'short' }) }}</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-black mb-4 text-gray-900 leading-tight group-hover:text-green-600 transition-colors line-clamp-3 relative z-10">
                {{ featured.title }}
              </h2>
              <p class="text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium relative z-10">
                {{ featured.excerpt || 'Temukan informasi selengkapnya mengenai berita ini dan berbagai perkembangan terbaru lainnya...' }}
              </p>
              <div class="mt-6 relative z-10">
                <span class="text-sm font-bold text-green-600 flex items-center gap-1 group-hover:translate-x-2 transition-transform bg-transparent w-max">
                  Baca Selengkapnya <ArrowRight class="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          <!-- LIST BERITA GRID -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              v-for="(news, index) in latestNews"
              :key="index"
              class="flex flex-col bg-white rounded-3xl border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-xl hover:shadow-green-500/10 cursor-pointer transition-all duration-300 group overflow-hidden"
              @click="$router.push(`/berita/${news.slug}`)"
            >
              <div class="relative overflow-hidden w-full h-48 shrink-0 bg-gray-50">
                <img
                  :src="news.image"
                  alt="News Thumbnail"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <!-- Date Badge -->
                <div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-sm border border-white/20 transform translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-300">
                  <p class="text-[10px] font-bold text-gray-700 flex items-center gap-1.5">
                    <Clock class="w-3 h-3 text-green-500" /> {{ formatDate(news.date) }}
                  </p>
                </div>
              </div>
              <div class="p-5 flex-1 flex flex-col justify-center relative">
                <!-- Hover indicator line -->
                <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-green-500 group-hover:h-1/2 transition-all duration-300 rounded-r-md"></div>
                
                <h3 class="text-base font-bold leading-snug text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors pl-1">
                  {{ news.title }}
                </h3>
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
                <ImageIcon class="w-5 h-5 text-green-500" /> Banner
              </h3>
              <button @click="nextBanner" class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Ganti Banner">
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
