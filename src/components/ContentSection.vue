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
              class="md:col-span-3 flex flex-col group cursor-pointer relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 min-h-[300px]"
              @click="$router.push(`/berita/${featured.slug}`)"
            >
              <img
                :src="featured.image"
                alt="Featured News"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a2463]/90 via-[#0a2463]/40 to-transparent"></div>
              
              <div class="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col z-10">
                <span class="w-max px-3 py-1 bg-[#e8a020] text-[#0a2463] text-[10px] font-black uppercase tracking-widest rounded-full mb-3 shadow-sm">
                  Berita Utama
                </span>
                <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-gray-200 transition-colors line-clamp-3 drop-shadow-md">
                  {{ featured.title }}
                </h2>
                <div class="flex items-center gap-2 text-sm text-gray-300 font-medium">
                  <Calendar class="w-4 h-4"/> {{ formatDate(featured.date, { month: 'long', year: 'numeric' }) }}
                </div>
              </div>
            </div>

            <!-- KANAN: LIST BERITA (40%) -->
            <div class="md:col-span-2 flex flex-col justify-between">
              <div class="flex flex-col h-full bg-white rounded-2xl p-5 border border-gray-100 border-t-4 border-t-[#e8a020] shadow-sm">
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <span class="w-2 h-2 rounded-full bg-[#1e5ca8]"></span> Berita Lainnya
                </h3>
                <div class="flex flex-col divide-y divide-gray-100 h-full justify-between">
                  <div
                    v-for="(news, index) in latestNews.slice(0, 3)"
                    :key="index"
                    class="flex gap-4 py-3 first:pt-0 last:pb-0 group cursor-pointer"
                    @click="$router.push(`/berita/${news.slug}`)"
                  >
                     <div class="w-24 h-20 shrink-0 relative overflow-hidden rounded-xl shadow-sm border border-gray-100">
                        <img :src="news.image" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     </div>
                     <div class="flex-1 flex flex-col justify-center">
                        <h4 class="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-[#1e5ca8] transition-colors mb-2">
                           {{ news.title }}
                        </h4>
                        <div class="text-[11px] text-gray-500 font-medium mt-auto flex items-center gap-1.5">
                           <Calendar class="w-3 h-3"/> {{ formatDate(news.date) }}
                        </div>
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
          <div class="bg-white p-2 rounded-2xl border border-gray-100 border-t-4 border-t-[#1e5ca8] shadow-sm h-full flex flex-col relative overflow-hidden group">
            <div class="relative overflow-hidden rounded-xl h-full min-h-[300px] w-full shadow-inner bg-gray-50 flex-1">
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
              
              <!-- Hover Overlay with Actions -->
              <div class="absolute inset-0 bg-black/40 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                 <button @click="openZoomModal" class="w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0a2463] backdrop-blur-sm flex items-center justify-center transition-all transform hover:scale-110 shadow-lg" title="Perbesar Banner">
                    <ZoomIn class="w-5 h-5" />
                 </button>
                 <button @click="nextBanner" class="w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0a2463] backdrop-blur-sm flex items-center justify-center transition-all transform hover:scale-110 shadow-lg" title="Ganti Banner">
                    <RefreshCw class="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Zoom Banner -->
    <transition name="fade">
      <div v-if="showZoomModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" @click="closeZoomModal">
        <button class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" @click="closeZoomModal">
           <X class="w-8 h-8" />
        </button>
        <img :src="banners[currentBanner]" class="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" @click.stop />
      </div>
    </transition>
  </section>
</template>

<script>
import { useBeritaStore } from '@/stores/useBeritaStore'
import { onMounted, ref } from 'vue'
import axios from '@/utils/api'
import { formatDate, getStorageUrl } from '@/utils/helpers'
import { ArrowRight, Calendar, Clock, Image as ImageIcon, RefreshCw, ZoomIn, X } from 'lucide-vue-next'

export default {
  name: 'ContentSection',
  components: {
    ArrowRight,
    Calendar,
    Clock,
    ImageIcon,
    RefreshCw,
    ZoomIn,
    X
  },
  setup() {
    const beritaStore = useBeritaStore()
    const featured = ref(null)
    const latestNews = ref([])
    const banners = ref([])
    const currentBanner = ref(0)
    const previousBanner = ref(0)
    const showZoomModal = ref(false)
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

    const openZoomModal = () => {
      showZoomModal.value = true
    }

    const closeZoomModal = () => {
      showZoomModal.value = false
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
      showZoomModal,
      openZoomModal,
      closeZoomModal,
      formatDate,
    }
  },
}
</script>
