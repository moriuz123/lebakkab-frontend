<template>
  <div class="bg-[#f8fafc] min-h-screen pb-20 relative overflow-hidden">
    <!-- Dekorasi Latar Belakang Ambien -->
    <div class="fixed top-0 left-1/4 w-96 h-96 bg-green-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 pointer-events-none"></div>
    <div class="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 pointer-events-none"></div>

    <!-- Header Halaman dengan Gradien -->
    <div class="relative pt-12 pb-8 sm:pt-20 sm:pb-12 px-4 text-center z-10">
      <h1 class="text-3xl md:text-5xl font-black mb-4 tracking-tight">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">Pusat</span>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 ml-2">Pengumuman</span>
      </h1>
      <p class="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base font-medium">Temukan informasi, edaran, dan berita terbaru langsung dari instansi pemerintahan kami secara cepat dan transparan.</p>
    </div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <!-- Search Section (Floating Glowing Bar) -->
      <div v-if="!store.loading && !store.error" class="mb-12 max-w-2xl mx-auto relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition duration-500"></div>
        <div class="relative bg-white rounded-2xl shadow-xl flex items-center px-4 py-1">
          <div class="p-3 text-gray-400 group-focus-within:text-green-600 transition-colors">
            <Search class="w-6 h-6" />
          </div>
          <input
            v-model="store.searchQuery"
            @input="store.currentPage = 1"
            type="text"
            placeholder="Cari kata kunci pengumuman..."
            class="w-full bg-transparent border-none focus:ring-0 text-gray-800 text-lg py-4 px-2 placeholder-gray-400 font-medium outline-none"
          />
          <button 
            v-if="store.searchQuery"
            @click="store.searchQuery = ''; store.currentPage = 1"
            class="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="space-y-8">
        <!-- Featured Skeleton -->
        <div class="animate-pulse bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 h-[400px]">
          <div class="w-full md:w-1/2 h-full bg-gray-200 rounded-3xl"></div>
          <div class="w-full md:w-1/2 py-8 pr-8 space-y-4">
            <div class="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
            <div class="h-10 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-full mt-8"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
        <!-- Grid Skeleton -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="animate-pulse bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
            <div class="h-48 bg-gray-200 rounded-2xl mb-4"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center max-w-2xl mx-auto shadow-lg">
        <AlertCircle class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p class="font-bold text-xl mb-2">Terjadi Kesalahan</p>
        <p class="font-medium text-red-500/80 mb-6">{{ store.error }}</p>
        <button @click="store.fetchPengumuman()" class="bg-white px-8 py-3 rounded-xl text-red-600 font-bold hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 transition-all shadow-sm hover:shadow-md">
          Muat Ulang
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="store.filteredPengumuman.length === 0" class="bg-white/60 backdrop-blur-md py-20 px-4 rounded-[2.5rem] border border-white text-center max-w-3xl mx-auto shadow-xl">
        <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <SearchX class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-2xl font-black text-gray-900 mb-3 tracking-tight">Pencarian Nihil</h3>
        <p class="text-gray-500 max-w-md mx-auto text-lg">Maaf, kata kunci <span class="font-bold text-gray-700">"{{ store.searchQuery }}"</span> tidak cocok dengan pengumuman apa pun.</p>
        <button v-if="store.searchQuery" @click="store.searchQuery = ''; store.currentPage = 1" class="mt-8 text-white font-bold bg-gray-900 px-8 py-4 rounded-2xl hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/30">
          Tampilkan Semua
        </button>
      </div>

      <!-- Content Layout -->
      <div v-else class="space-y-10">
        
        <!-- FEATURED HERO (Hanya tampil di Halaman 1 dan jika tidak sedang mencari spesifik) -->
        <div v-if="store.currentPage === 1 && !store.searchQuery && featuredPengumuman" class="group relative bg-white rounded-[2rem] shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 flex flex-col md:flex-row overflow-hidden border border-white">
          <!-- Gambar Featured -->
          <div class="relative w-full md:w-1/2 h-[300px] md:h-[450px] overflow-hidden bg-gray-100">
            <div v-if="!featuredPengumuman.gambar" class="absolute inset-0 flex items-center justify-center">
              <Megaphone class="w-24 h-24 text-gray-300" />
            </div>
            <img
              v-if="featuredPengumuman.gambar"
              :src="$storageUrl(featuredPengumuman.gambar)"
              alt="Featured Pengumuman"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:bg-gradient-to-t md:from-black/60 md:to-transparent opacity-80"></div>
            
            <div class="absolute top-6 left-6 flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-lg uppercase tracking-widest animate-bounce">
              <div class="w-2 h-2 bg-white rounded-full animate-ping"></div>
              Terbaru
            </div>
            
            <!-- Zoom Icon -->
            <button
              v-if="featuredPengumuman.gambar"
              @click.prevent="openImage($storageUrl(featuredPengumuman.gambar))"
              class="absolute bottom-6 left-6 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white transition-all duration-300 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            >
              <ZoomIn class="w-5 h-5" />
            </button>
          </div>

          <!-- Konten Featured -->
          <div class="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white z-10">
            <!-- Elemen Dekoratif Melengkung (Desktop) -->
            <div class="hidden md:block absolute -left-10 top-0 bottom-0 w-10 bg-white rounded-l-3xl"></div>
            
            <div class="flex items-center gap-2 text-sm font-bold text-green-600 mb-4 bg-green-50 w-fit px-4 py-2 rounded-xl">
              <Calendar class="w-4 h-4" />
              {{ formatDate(featuredPengumuman.created_at, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
            
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all line-clamp-4">
              {{ featuredPengumuman.judul }}
            </h2>
            
            <router-link
              :to="`/pengumuman/${featuredPengumuman.slug}`"
              class="mt-auto inline-flex items-center gap-3 w-fit bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 group/btn hover:-translate-y-1"
            >
              Baca Selengkapnya
              <ArrowRight class="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
            </router-link>
          </div>
        </div>

        <!-- GRID REGULER -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="item in regularPengumuman"
            :key="item.id"
            class="bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden group flex flex-col border border-gray-100 hover:border-blue-100 relative"
          >
            <!-- Image Section -->
            <div class="relative h-56 w-full overflow-hidden bg-gray-50">
              <div v-if="!item.gambar" class="absolute inset-0 flex items-center justify-center text-gray-200">
                <Megaphone class="w-16 h-16" />
              </div>
              <img
                v-if="item.gambar"
                :src="$storageUrl(item.gambar)"
                alt="Pengumuman"
                class="h-full w-full object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-60"></div>
              
              <!-- Zoom Button -->
              <button
                v-if="item.gambar"
                @click.prevent="openImage($storageUrl(item.gambar))"
                class="absolute top-4 right-4 bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md p-2.5 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
              >
                <ZoomIn class="w-5 h-5" />
              </button>
            </div>

            <!-- Content Section -->
            <div class="relative p-6 md:p-8 flex flex-col flex-grow bg-white -mt-6 rounded-t-3xl z-10 transition-transform duration-500">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-1.5 text-xs font-extrabold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                  <Calendar class="w-3.5 h-3.5" />
                  {{ getDay(item.created_at) }} {{ getMonthShort(item.created_at) }}
                </div>
              </div>
              
              <h2 class="text-gray-900 font-bold text-lg mb-6 leading-relaxed group-hover:text-blue-600 transition-colors line-clamp-3">
                {{ item.judul }}
              </h2>

              <router-link
                :to="`/pengumuman/${item.slug}`"
                class="mt-auto flex items-center justify-between w-full border-t border-gray-100 pt-5 text-gray-400 font-semibold hover:text-blue-600 transition-colors group/link"
              >
                <span class="text-sm">Buka Detail</span>
                <div class="bg-gray-50 group-hover/link:bg-blue-50 p-2 rounded-full transition-colors">
                  <ArrowRight class="w-4 h-4 group-hover/link:-rotate-45 transition-transform duration-300" />
                </div>
              </router-link>
            </div>
          </div>
        </div>

      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-16 gap-3" v-if="store.totalPages > 1">
        <button
          @click="store.prevPage"
          :disabled="store.currentPage === 1"
          class="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-900 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all duration-300 shadow-sm"
        >
          <ChevronLeft class="w-5 h-5" />
          <span class="font-bold hidden sm:block">Prev</span>
        </button>

        <div class="flex gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <button
            v-for="page in store.totalPages"
            :key="page"
            @click="store.goToPage(page)"
            :class="[
              'w-10 h-10 rounded-xl font-bold transition-all flex items-center justify-center',
              store.currentPage === page
                ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="store.nextPage"
          :disabled="store.currentPage === store.totalPages"
          class="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-900 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all duration-300 shadow-sm"
        >
          <span class="font-bold hidden sm:block">Next</span>
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Image Modal -->
    <Transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4 sm:p-10"
        @click="closeImage"
      >
        <button @click.stop="closeImage" class="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/30 p-3 rounded-full transition-all backdrop-blur-md hover:scale-110 hover:rotate-90 duration-300">
          <X class="w-6 h-6" />
        </button>
        <img :src="selectedImage" class="max-w-full max-h-full object-contain rounded-2xl shadow-2xl ring-1 ring-white/10 transform transition-transform" @click.stop />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePengumumanStore } from '@/stores/pengumuman'
import { formatDate } from '@/utils/helpers'
import { Search, SearchX, X, AlertCircle, ZoomIn, Calendar, ArrowRight, ChevronLeft, ChevronRight, Megaphone } from 'lucide-vue-next'

const store = usePengumumanStore()
const selectedImage = ref(null)

const openImage = (url) => {
  selectedImage.value = url
}

const closeImage = () => {
  selectedImage.value = null
}

const getDay = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.getDate().toString().padStart(2, '0')
}

const getMonthShort = (dateStr) => {
  if (!dateStr) return '-'
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const date = new Date(dateStr)
  return months[date.getMonth()]
}

// Logic untuk memisahkan Featured (urutan ke-1) dan Regular (sisanya)
const featuredPengumuman = computed(() => {
  if (store.paginatedPengumuman.length > 0) {
    return store.paginatedPengumuman[0]
  }
  return null
})

const regularPengumuman = computed(() => {
  // Jika di halaman 1 dan tidak ada pencarian, hilangkan item pertama karena sudah jadi featured
  if (store.currentPage === 1 && !store.searchQuery) {
    return store.paginatedPengumuman.slice(1)
  }
  return store.paginatedPengumuman
})

onMounted(() => {
  store.fetchPengumuman()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
