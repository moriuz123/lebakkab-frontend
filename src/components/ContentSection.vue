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
        <div class="lg:col-span-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            <!-- BERITA UTAMA -->
            <div
              v-if="featured"
              class="col-span-1 group cursor-pointer relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 h-full min-h-[350px] md:min-h-0"
              @click="$router.push(`/berita/${featured.slug}`)"
            >
              <img
                :src="featured.image"
                alt="Featured News"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90"></div>
              
              <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end">
                <div>
                  <span class="inline-block px-3 py-1 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg mb-3 shadow-lg">Berita Utama</span>
                  <h2 class="text-2xl sm:text-3xl font-bold mb-3 text-white leading-tight group-hover:text-green-300 transition-colors line-clamp-3">
                    {{ featured.title }}
                  </h2>
                  <div class="flex items-center gap-3 text-xs font-medium text-gray-300">
                    <span class="flex items-center gap-1.5"><Calendar class="w-4 h-4"/> {{ formatDate(featured.date, { month: 'long' }) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- LIST BERITA -->
            <div class="col-span-1 flex flex-col gap-4">
              <div
                v-for="(news, index) in latestNews"
                :key="index"
                class="flex items-center gap-4 bg-white p-3 pr-5 rounded-2xl border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-lg hover:shadow-green-500/5 cursor-pointer transition-all duration-300 group h-full"
                @click="$router.push(`/berita/${news.slug}`)"
              >
                <div class="relative overflow-hidden rounded-xl w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                  <img
                    :src="news.image"
                    alt="News Thumbnail"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div class="flex-1 py-1">
                  <p class="text-[10px] font-bold text-green-600 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Clock class="w-3 h-3" /> {{ formatDate(news.date) }}
                  </p>
                  <h3 class="text-sm sm:text-base font-bold leading-snug text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {{ news.title }}
                  </h3>
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
