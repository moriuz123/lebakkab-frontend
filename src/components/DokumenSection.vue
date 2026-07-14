<!-- frontend/src/components/DokumenSection.vue -->
<script setup>
import { onMounted, ref, computed } from 'vue'
import { useDokumentStore } from '@/stores/dokument'
import { storeToRefs } from 'pinia'
import VuePdfApp from 'vue3-pdf-app'
import 'vue3-pdf-app/dist/icons/main.css'
import { getStorageUrl } from '@/utils/helpers'
import { FileText, Eye, Download, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'

const dokumentStore = useDokumentStore()
const { dokuments, loading, error } = storeToRefs(dokumentStore)

const carouselRef = ref(null)
const activeIndex = ref(0) // dot aktif

// Modal flipbook
const showFlipbook = ref(false)
const selectedFileUrl = ref(null)

onMounted(() => {
  dokumentStore.fetchDokuments()
})

// Tombol scroll
const scrollLeft = () => {
  carouselRef.value.scrollBy({ left: -320, behavior: 'smooth' })
  updateActiveDot()
}
const scrollRight = () => {
  carouselRef.value.scrollBy({ left: 320, behavior: 'smooth' })
  updateActiveDot()
}

// ✅ Tombol Lihat (flipbook modal)
function getFileUrl(filePath) {
  return getStorageUrl(filePath)
}
function openFlipbook(doc) {
  selectedFileUrl.value = getFileUrl(doc.file_path)
  showFlipbook.value = true
}
function closeFlipbook() {
  showFlipbook.value = false
  selectedFileUrl.value = null
}

// ✅ Tombol Unduh (langsung download)
function unduh(doc) {
  const link = document.createElement('a')
  link.href = getFileUrl(doc.file_path)
  link.download = `${doc.judul}.pdf`
  link.click()
}

// FIXED DOTS (misal 5 titik)
const DOT_COUNT = 5

const visibleDots = computed(() => {
  return Array.from({ length: DOT_COUNT })
})

// Hitung dot aktif berdasarkan posisi scroll
const updateActiveDot = () => {
  if (!carouselRef.value) return
  const maxScroll = carouselRef.value.scrollWidth - carouselRef.value.clientWidth
  if (maxScroll <= 0) return
  const ratio = carouselRef.value.scrollLeft / maxScroll
  activeIndex.value = Math.round(ratio * (DOT_COUNT - 1))
}

// Klik dot → scroll ke posisi tertentu
const goToDot = (index) => {
  if (!carouselRef.value) return
  const maxScroll = carouselRef.value.scrollWidth - carouselRef.value.clientWidth
  const scrollPos = (maxScroll / (DOT_COUNT - 1)) * index
  carouselRef.value.scrollTo({ left: scrollPos, behavior: 'smooth' })
  activeIndex.value = index
}
</script>

<template>
  <section class="relative overflow-hidden py-10">
    <!-- Gradient Background Transparent -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-[#071840] from-60% to-[#2a6cbd] z-0 pointer-events-none"
    ></div>
    
    <!-- Corak Batik Overlay (Kawung Motif) for Light Theme -->
    <div 
      class="absolute inset-0 pointer-events-none mix-blend-overlay z-0" 
      style="opacity: 0.12; -webkit-mask-image: linear-gradient(to left, black 0%, transparent 50%); mask-image: linear-gradient(to left, black 0%, transparent 50%); background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='3' opacity='1'%3E%3Cpath d='M0 40 Q20 20 40 40 T80 40' /%3E%3Cpath d='M0 40 Q20 60 40 40 T80 40' /%3E%3Cpath d='M40 0 Q20 20 40 40 T40 80' /%3E%3Cpath d='M40 0 Q60 20 40 40 T40 80' /%3E%3Cpath d='M40 30 L50 40 L40 50 L30 40 Z' /%3E%3Ccircle cx='40' cy='40' r='4' fill='%23ffffff' /%3E%3C/g%3E%3C/svg%3E&quot;); background-size: 80px 80px;"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 relative z-10">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-1 bg-[#1e5ca8] rounded-full"></span>
            <span class="text-[#e8a020] font-bold uppercase tracking-wider text-sm">Transparansi</span>
          </div>
          <h2 class="text-3xl font-black text-white tracking-tight">Dokumen Publik</h2>
        </div>
        <router-link to="/dokumen" class="group flex items-center gap-2 text-sm font-bold text-white/70 hover:text-[#e8a020] transition-colors">
          Lihat Semua Dokumen
          <div class="w-8 h-8 rounded-full bg-white/10 shadow-sm border border-white/20 flex items-center justify-center group-hover:border-[#e8a020] group-hover:bg-[#e8a020] group-hover:text-[#071840] text-white transition-all">
             <ArrowRight class="w-4 h-4" />
          </div>
        </router-link>
      </div>

      <!-- Content Carousel -->
      <div v-if="loading" class="flex gap-6 overflow-hidden py-4">
        <div v-for="i in 4" :key="i" class="w-[300px] h-64 bg-gray-200 rounded-3xl animate-pulse flex-shrink-0"></div>
      </div>
      <div v-else-if="error" class="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 font-bold shadow-sm">
        {{ error }}
      </div>

      <div v-else class="relative group/carousel">
        <!-- Tombol navigasi -->
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

        <!-- Carousel -->
        <div
          ref="carouselRef"
          @scroll="updateActiveDot"
          class="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth py-6 px-2 -mx-2 snap-x snap-mandatory"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <div
            v-for="doc in dokuments"
            :key="doc.id"
            class="snap-center w-[280px] sm:w-[320px] bg-white border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:shadow-[#1e5ca8]/10 hover:border-[#1e5ca8] transition-all duration-500 flex-shrink-0 group overflow-hidden flex flex-col relative"
          >
            <!-- Decorative Background Shape -->
            <div class="absolute -right-12 -top-12 w-32 h-32 bg-[#f8f9fc] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <!-- Icon Section -->
            <div class="p-6 pb-2 relative z-10 flex items-start justify-between">
              <div class="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:scale-110">
                <FileText class="w-7 h-7" />
              </div>
              <span v-if="doc.kategori?.nama" class="bg-gray-50 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-gray-200/60 max-w-[130px] truncate">
                {{ doc.kategori.nama }}
              </span>
            </div>

            <!-- Info -->
            <div class="p-6 pt-3 relative z-10 flex-1 flex flex-col">
              <h3 class="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-[#e8a020] transition-colors" :title="doc.judul">
                {{ doc.judul }}
              </h3>
              <p class="text-sm text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">{{ doc.deskripsi || 'Tidak ada deskripsi' }}</p>
              
              <div class="mt-auto grid grid-cols-2 gap-3">
                <button
                  @click="openFlipbook(doc)"
                  class="flex items-center justify-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 border border-transparent hover:bg-blue-600 hover:text-white py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Eye class="w-4 h-4" /> Lihat
                </button>
                <button
                  @click="unduh(doc)"
                  class="flex items-center justify-center gap-2 text-sm font-bold text-[#e8a020] bg-[#f8f9fc] border border-transparent hover:bg-[#0a2463] hover:text-white py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Download class="w-4 h-4" /> Unduh
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Dot indicators -->
        <div class="flex justify-center mt-6 space-x-2.5 relative z-10">
          <button
            v-for="(dot, index) in visibleDots"
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

    <!-- ✅ Modal Flipbook -->
    <Transition name="modal">
      <div v-if="showFlipbook" class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:p-6">
        <div class="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" @click="closeFlipbook"></div>
        <div class="relative w-full max-w-5xl h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
            <h3 class="font-bold text-gray-900 flex items-center gap-2">
              <FileText class="w-5 h-5 text-red-500" />
              Preview Dokumen
            </h3>
            <button @click="closeFlipbook" class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors">
              <X class="w-5 h-5" />
            </button>
          </div>
          <div class="flex-1 w-full bg-gray-100 relative">
            <VuePdfApp :pdf="selectedFileUrl" class="w-full h-full absolute inset-0" theme="light" />
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

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
