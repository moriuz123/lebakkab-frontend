<template>
  <section class="bg-gray-50/50 py-16 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      
      <!-- Decorative Background Blurs -->
      <div class="absolute top-10 left-10 w-72 h-72 bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 relative z-10">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-1 bg-[#1e5ca8] rounded-full"></span>
            <span class="text-[#e8a020] font-bold uppercase tracking-wider text-sm">Visual Data</span>
          </div>
          <h2 class="text-3xl font-black text-gray-900 tracking-tight">Infografis Publik</h2>
        </div>

        <router-link
          to="/banner/infografis"
          class="group flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#e8a020] transition-colors"
        >
          Semua Infografis
          <div class="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center group-hover:border-[#1e5ca8] group-hover:bg-[#f8f9fc] transition-all">
             <ArrowRight class="w-4 h-4" />
          </div>
        </router-link>
      </div>

      <!-- Content carousel -->
      <div v-if="loading" class="flex gap-6 overflow-hidden py-4">
        <div v-for="i in 4" :key="i" class="w-[280px] h-[350px] bg-gray-200 rounded-3xl animate-pulse flex-shrink-0"></div>
      </div>
      <div v-else-if="error" class="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 font-bold shadow-sm">
        {{ error?.message ?? error }}
      </div>

      <div v-else class="relative group/carousel">
        <!-- tombol navigasi -->
        <button
          @click="scrollLeft"
          class="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-[#e8a020] hover:bg-[#f8f9fc] hover:scale-110 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          aria-label="Previous"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button
          @click="scrollRight"
          class="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-100 text-gray-600 hover:text-[#e8a020] hover:bg-[#f8f9fc] hover:scale-110 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          aria-label="Next"
        >
          <ChevronRight class="w-6 h-6" />
        </button>

        <!-- carousel scrollable -->
        <div
          ref="carouselRef"
          @scroll="updateActiveDot"
          class="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth py-6 px-2 -mx-2 snap-x snap-mandatory"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <div
            v-for="item in banners"
            :key="item.id"
            class="snap-center w-[280px] sm:w-[320px] bg-white border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-[#1e5ca8]/10 hover:border-[#1e5ca8] transition-all duration-500 flex-shrink-0 group overflow-hidden cursor-pointer flex flex-col"
            @click="openPreview(item.gambar_url)"
          >
            <!-- Thumbnail & Overlay -->
            <div class="relative w-full h-[320px] overflow-hidden bg-gray-100">
              <img
                :src="item.gambar_url"
                :alt="item.judul"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div class="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100 border border-white/30 shadow-2xl">
                  <ZoomIn class="w-8 h-8" />
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="px-6 py-5 bg-white relative z-10 flex-1 flex flex-col justify-center">
              <span class="text-[10px] font-bold text-[#e8a020] uppercase tracking-widest mb-1.5">{{ item.kategori || 'Infografis' }}</span>
              <h3 class="font-bold text-gray-900 text-lg leading-snug truncate group-hover:text-[#e8a020] transition-colors" :title="item.judul">
                {{ item.judul }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Dot indicators -->
        <div class="flex justify-center mt-6 space-x-2.5 relative z-10">
          <button
            v-for="(b, index) in banners"
            :key="index"
            @click="goToDot(index)"
            :class="[
              'rounded-full cursor-pointer transition-all duration-300',
              activeIndex === index ? 'bg-[#0a2463] w-8 h-2' : 'bg-gray-300 w-2 h-2 hover:bg-[#1e5ca8]',
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>

    <!-- Modal Preview -->
    <Transition name="modal">
      <div
        v-if="previewImage"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <div class="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" @click="closePreview"></div>
        <div class="relative w-full max-w-5xl max-h-screen flex flex-col items-center justify-center pointer-events-none">
          <button
            @click="closePreview"
            class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 p-3 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-auto z-10"
          >
            <X class="w-6 h-6" />
          </button>
          <img
            :src="previewImage"
            alt="Preview"
            class="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl pointer-events-auto transform transition-transform"
          />
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBannerStore } from '@/stores/bannerStore'
import { ArrowRight, ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-vue-next'

const bannerStore = useBannerStore()
const { banners, loading, error } = storeToRefs(bannerStore)

const carouselRef = ref(null)
const activeIndex = ref(0)
const previewImage = ref(null)

// ambil data
onMounted(() => {
  bannerStore.fetchByKategori('infografis')
})

// navigasi scroll
const scrollLeft = () => {
  if (!carouselRef.value) return
  carouselRef.value.scrollBy({ left: -320, behavior: 'smooth' })
  setTimeout(updateActiveDot, 200)
}
const scrollRight = () => {
  if (!carouselRef.value) return
  carouselRef.value.scrollBy({ left: 320, behavior: 'smooth' })
  setTimeout(updateActiveDot, 200)
}

// update dot aktif berdasarkan posisi scroll
function updateActiveDot() {
  if (!carouselRef.value) return
  const scrollLeftVal = carouselRef.value.scrollLeft
  const maxScroll = carouselRef.value.scrollWidth - carouselRef.value.clientWidth
  const totalDots = Math.max(1, banners.value.length)
  if (maxScroll <= 0) {
    activeIndex.value = 0
    return
  }
  activeIndex.value = Math.round((scrollLeftVal / maxScroll) * (totalDots - 1))
}

// klik dot untuk scroll ke posisi
function goToDot(index) {
  if (!carouselRef.value) return
  const maxScroll = carouselRef.value.scrollWidth - carouselRef.value.clientWidth
  const denom = Math.max(1, banners.value.length - 1)
  const scrollPos = (maxScroll / denom) * index
  carouselRef.value.scrollTo({ left: scrollPos, behavior: 'smooth' })
  activeIndex.value = index
}

// preview image
function openPreview(img) {
  previewImage.value = img
}
function closePreview() {
  previewImage.value = null
}
</script>

<style scoped>
/* Sembunyikan scrollbar bawaan browser untuk efek carousel mulus */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>

