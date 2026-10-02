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
             <Icon name="lucide:arrow-right" class="w-4 h-4 text-gray-600 group-hover:text-[#1e5ca8]" />
          </div>
        </router-link>
      </div>

      <!-- ==============================================
           BARIS ATAS: BERITA UTAMA SLIDER (8 Cols) & BANNER (4 Cols)
           ============================================== -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- KOLOM BERITA UTAMA (LG: 8 Cols - Full Slider) -->
        <div class="lg:col-span-8 flex flex-col">
          <div 
            v-if="featuredSlides.length > 0"
            class="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-gray-950 group flex flex-col border border-gray-100 border-t-4 border-t-[#e8a020]"
            @mouseenter="stopSlider"
            @mouseleave="startSlider"
          >
            <!-- Slides Container with Crossfade Transition -->
            <div class="relative w-full h-full overflow-hidden">
              <div
                v-for="(slide, idx) in featuredSlides"
                :key="slide.id || idx"
                class="absolute inset-0 w-full h-full transition-all duration-700 ease-out cursor-pointer"
                :class="{
                  'opacity-100 z-10 scale-100 pointer-events-auto': currentSlide === idx,
                  'opacity-0 z-0 scale-105 pointer-events-none': currentSlide !== idx,
                }"
                @click="$router.push(`/berita/${slide.slug}`)"
              >
                <!-- Image Background with Zoom on Hover -->
                <img
                  :src="slide.image"
                  :alt="slide.title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  @error="$event.target.src = '/images/default-thumbnail.jpg'"
                />

                <!-- High-End Multi-Layer Gradient Overlays -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a2463] via-[#0a2463]/60 to-transparent"></div>
                <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>

                <!-- Slide Header (Top Badges) -->
                <div class="absolute top-5 left-5 sm:top-7 sm:left-7 right-5 sm:right-7 flex items-center justify-between z-20">
                  <div class="flex items-center gap-2">
                    <span class="px-3.5 py-1.5 bg-gradient-to-r from-[#e8a020] to-amber-500 text-[#0a2463] text-xs font-black uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#0a2463] animate-pulse"></span>
                      Berita Utama
                    </span>
                    <span 
                      v-if="slide.kategori" 
                      class="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full shadow-sm"
                    >
                      {{ slide.kategori }}
                    </span>
                  </div>

                  <!-- OPD / Source Badge -->
                  <span 
                    v-if="slide.opd"
                    class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/30 backdrop-blur-md border border-white/10 text-gray-200 text-xs font-medium rounded-full shadow-sm"
                  >
                    <Icon name="lucide:building-2" class="w-3.5 h-3.5 text-[#e8a020]" />
                    {{ slide.opd }}
                  </span>
                </div>

                <!-- Slide Content (Bottom) -->
                <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 flex flex-col justify-end">
                  <!-- Date & Meta -->
                  <div class="flex items-center gap-3 text-xs sm:text-sm text-amber-300 font-semibold mb-2.5">
                    <span class="flex items-center gap-1.5">
                      <Icon name="lucide:calendar" class="w-4 h-4 text-[#e8a020]" />
                      {{ formatDate(slide.date, { day: 'numeric', month: 'long', year: 'numeric' }) }}
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight mb-2.5 group-hover:text-amber-200 transition-colors line-clamp-2 sm:line-clamp-3 drop-shadow-md">
                    {{ slide.title }}
                  </h3>

                  <!-- Excerpt -->
                  <p 
                    v-if="slide.excerpt"
                    class="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-3xl font-normal leading-relaxed drop-shadow mb-4 hidden sm:block"
                  >
                    {{ slide.excerpt }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Controls: Dot Navigation & Arrow Buttons (Always Accessible) -->
            <div class="absolute bottom-5 sm:bottom-7 right-5 sm:right-7 z-30 flex items-center gap-3 pointer-events-auto">
              <!-- Dots Navigation -->
              <div class="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 shadow-lg">
                <button
                  v-for="(slide, idx) in featuredSlides"
                  :key="'dot-' + idx"
                  @click.stop="goToSlide(idx)"
                  class="transition-all duration-300 rounded-full focus:outline-none"
                  :class="currentSlide === idx 
                    ? 'w-7 h-2 bg-[#e8a020] shadow-sm' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/80'"
                  :aria-label="`Slide ${idx + 1}`"
                ></button>
              </div>

              <!-- Arrows (Desktop) -->
              <div class="hidden sm:flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg">
                <button
                  @click.stop="prevSlide"
                  class="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0a2463] flex items-center justify-center transition-all duration-200 focus:outline-none"
                  title="Slide Sebelumnya"
                >
                  <Icon name="lucide:chevron-left" class="w-4 h-4" />
                </button>
                <button
                  @click.stop="nextSlide"
                  class="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0a2463] flex items-center justify-center transition-all duration-200 focus:outline-none"
                  title="Slide Berikutnya"
                >
                  <Icon name="lucide:chevron-right" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Loading Skeleton for Slider -->
          <div v-else class="w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl bg-gray-200 animate-pulse"></div>
        </div>

        <!-- =========================
             KOLOM BANNER (LG: 4 Cols)
             ========================= -->
        <div class="lg:col-span-4 flex flex-col" v-if="banners.length">
          <div class="bg-white p-2 rounded-3xl border border-gray-100 border-t-4 border-t-[#1e5ca8] shadow-md hover:shadow-xl transition-all duration-500 h-[380px] sm:h-[440px] lg:h-[480px] flex flex-col relative overflow-hidden group">
            <div class="relative overflow-hidden rounded-2xl h-full w-full shadow-inner bg-gray-50 flex-1">
              
              <!-- Floating Pill Label -->
              <span class="absolute top-3.5 left-3.5 z-30 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#1e5ca8] shadow-md flex items-center gap-1.5 border border-gray-100">
                <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-[#e8a020]" />
                Banner Ucapan
              </span>

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
                    <Icon name="lucide:zoom-in" class="w-5 h-5" />
                 </button>
                 <button @click="nextBanner" class="w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#0a2463] backdrop-blur-sm flex items-center justify-center transition-all transform hover:scale-110 shadow-lg" title="Ganti Banner">
                    <Icon name="lucide:refresh-cw" class="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==============================================
           BARIS BAWAH: GRID BERITA TERKINI (4 Kolom x 2 Baris)
           Clean, Compact, Modern Enterprise Style
           ============================================== -->
      <div class="mt-14 sm:mt-16">
        <!-- Grid Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3 pb-4 border-b border-gray-200/70">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-6 bg-gradient-to-b from-[#1e5ca8] to-[#0a2463] rounded-full"></div>
            <div>
              <h3 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Kabar & Informasi Daerah</h3>
              <p class="text-xs text-gray-500 font-medium mt-0.5">Warta terkini dan kabar pembangunan di Kabupaten Lebak</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <router-link
              to="/berita"
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#1e5ca8] bg-blue-50/80 hover:bg-[#1e5ca8] hover:text-white border border-blue-100 transition-all duration-200 shadow-sm"
            >
              Lihat Indeks Berita
              <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
            </router-link>
          </div>
        </div>

        <!-- 4 Kolom x 2 Baris Grid (Total 8 Berita) -->
        <div 
          v-if="gridNews.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          <article
            v-for="item in gridNews"
            :key="item.id || item.slug"
            @click="$router.push(`/berita/${item.slug}`)"
            class="bg-white rounded-2xl border border-gray-100 border-t-4 border-t-[#e8a020] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(10,36,99,0.08)] hover:border-[#1e5ca8]/30 transition-all duration-300 flex flex-col h-full group cursor-pointer overflow-hidden transform hover:-translate-y-1"
          >
            <!-- Compact Thumbnail (16:10 Ratio) -->
            <div class="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
                @error="$event.target.src = '/images/default-thumbnail.jpg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-2.5 left-2.5 z-10">
                <span class="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#1e5ca8] shadow-sm border border-gray-100">
                  {{ item.kategori || 'Warta' }}
                </span>
              </div>
            </div>

            <!-- Card Content Body -->
            <div class="p-4 flex flex-col flex-1 justify-between bg-white">
              <div>
                <!-- Date & OPD Meta -->
                <div class="flex items-center gap-2 text-[11px] font-medium text-gray-500 mb-2">
                  <span class="flex items-center gap-1 text-gray-500">
                    <Icon name="lucide:calendar" class="w-3.5 h-3.5 text-[#1e5ca8]" />
                    {{ formatDate(item.date) }}
                  </span>
                  <span v-if="item.opd" class="text-gray-300">•</span>
                  <span v-if="item.opd" class="truncate max-w-[110px] text-gray-500 font-semibold" :title="item.opd">
                    {{ item.opd }}
                  </span>
                </div>

                <!-- Title (Clean 2-line clamp) -->
                <h4 class="text-sm font-bold text-gray-900 group-hover:text-[#1e5ca8] line-clamp-2 leading-snug transition-colors mb-3">
                  {{ item.title }}
                </h4>
              </div>

              <!-- Footer Row -->
              <div class="pt-3 border-t border-gray-100/80 flex items-center justify-between text-[11px] text-gray-500 font-medium mt-auto">
                <span class="font-semibold text-gray-500 group-hover:text-[#1e5ca8] transition-colors flex items-center gap-1">
                  Baca Berita
                </span>
                <div class="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1e5ca8] group-hover:text-white transition-all transform group-hover:translate-x-0.5">
                  <Icon name="lucide:arrow-right" class="w-3 h-3" />
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Skeleton Loading State for Grid -->
        <div 
          v-else-if="beritaStore.loading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          <div 
            v-for="i in 8" 
            :key="'skeleton-' + i" 
            class="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse flex flex-col gap-3 h-[280px]"
          >
            <div class="w-full h-32 bg-gray-200 rounded-xl"></div>
            <div class="w-24 h-3 bg-gray-200 rounded"></div>
            <div class="w-full h-4 bg-gray-200 rounded"></div>
            <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
            <div class="w-full h-3 bg-gray-200 rounded mt-auto"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Zoom Banner -->
    <transition name="fade">
      <div v-if="showZoomModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" @click="closeZoomModal">
        <button class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" @click="closeZoomModal">
           <Icon name="lucide:x" class="w-8 h-8" />
        </button>
        <img :src="banners[currentBanner]" class="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" @click.stop />
      </div>
    </transition>
  </section>
</template>

<script>
import { useBeritaStore } from '@/stores/useBeritaStore'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import axios from '@/utils/api'
import { formatDate, getStorageUrl } from '@/utils/helpers'

export default {
  name: 'ContentSection',
  setup() {
    const beritaStore = useBeritaStore()
    const featuredSlides = ref([])
    const gridNews = ref([])
    const currentSlide = ref(0)
    let sliderInterval = null

    const banners = ref([])
    const currentBanner = ref(0)
    const previousBanner = ref(0)
    const showZoomModal = ref(false)
    let bannerInterval = null

    const stripHtml = (html) => {
      if (!html) return ''
      return html.replace(/<[^>]*>?/gm, '').trim()
    }

    const mapItem = (item) => ({
      id: item.id,
      image: item.image || (item.thumbnail ? getStorageUrl(item.thumbnail) : '/images/default-thumbnail.jpg'),
      title: item.judul,
      date: item.tanggal_publish,
      slug: item.slug,
      excerpt: item.konten ? stripHtml(item.konten).slice(0, 140) + '...' : (item.excerpt || ''),
      kategori: item.kategori?.nama || '',
      opd: item.opd?.singkatan || item.opd?.nama || '',
    })

    const fetchData = async () => {
      // Fetch up to 14 latest news to populate both the top slider (4 slides) and bottom grid (8 cards)
      await beritaStore.fetchBeritas(1, 14)
      const data = beritaStore.beritas || []

      if (data.length > 0) {
        // Slider takes up to 4 items
        const sliderCount = Math.min(4, data.length)
        featuredSlides.value = data.slice(0, sliderCount).map(mapItem)

        // Grid takes 8 items: if we have >= 12, use items 4 to 12 (distinct)
        // If data is smaller, take whatever remaining up to 8, or the full list up to 8
        if (data.length >= 12) {
          gridNews.value = data.slice(sliderCount, sliderCount + 8).map(mapItem)
        } else if (data.length > sliderCount) {
          gridNews.value = data.slice(sliderCount).map(mapItem)
        } else {
          gridNews.value = data.slice(0, 8).map(mapItem)
        }
      }

      // Fetch banners
      try {
        const bannerRes = await axios.get('/api/banner?kategori=ucapan')
        if (Array.isArray(bannerRes.data)) {
          banners.value = bannerRes.data.flatMap((item) => {
            const urls = Array.isArray(item.gambar_url) 
              ? item.gambar_url 
              : (item.gambar_url ? [item.gambar_url] : [item.gambar])
            return urls.map(u => u.startsWith('http') ? u : getStorageUrl(u))
          })
        }
      } catch (err) {
        console.error('Gagal mengambil banner:', err)
      }
    }

    // Slider Controls
    const nextSlide = () => {
      if (featuredSlides.value.length <= 1) return
      currentSlide.value = (currentSlide.value + 1) % featuredSlides.value.length
    }

    const prevSlide = () => {
      if (featuredSlides.value.length <= 1) return
      currentSlide.value = (currentSlide.value - 1 + featuredSlides.value.length) % featuredSlides.value.length
    }

    const goToSlide = (idx) => {
      currentSlide.value = idx
      resetSliderTimer()
    }

    const startSlider = () => {
      stopSlider()
      if (featuredSlides.value.length > 1) {
        sliderInterval = setInterval(nextSlide, 5000)
      }
    }

    const stopSlider = () => {
      if (sliderInterval) {
        clearInterval(sliderInterval)
        sliderInterval = null
      }
    }

    const resetSliderTimer = () => {
      stopSlider()
      startSlider()
    }

    // Banner Controls
    const nextBanner = () => {
      if (banners.value.length <= 1) return
      previousBanner.value = currentBanner.value
      currentBanner.value = (currentBanner.value + 1) % banners.value.length
    }

    const openZoomModal = () => {
      showZoomModal.value = true
    }

    const closeZoomModal = () => {
      showZoomModal.value = false
    }

    onMounted(async () => {
      await fetchData()
      startSlider()
      if (banners.value.length > 1) {
        bannerInterval = setInterval(nextBanner, 6000)
      }
    })

    onBeforeUnmount(() => {
      stopSlider()
      if (bannerInterval) {
        clearInterval(bannerInterval)
      }
    })

    return {
      featuredSlides,
      gridNews,
      currentSlide,
      goToSlide,
      nextSlide,
      prevSlide,
      startSlider,
      stopSlider,
      banners,
      currentBanner,
      previousBanner,
      nextBanner,
      showZoomModal,
      openZoomModal,
      closeZoomModal,
      formatDate,
      beritaStore,
    }
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
