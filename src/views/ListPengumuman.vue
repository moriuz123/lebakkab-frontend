<template>
  <div class="bg-gray-50/50 min-h-screen pb-16">
    <PageHeader title="Daftar Pengumuman" subtitle="Informasi terbaru untuk masyarakat" />

    <div class="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <!-- Search Section -->
      <div v-if="!store.loading && !store.error" class="mb-10 max-w-2xl mx-auto relative group">
        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
          <Search class="w-5 h-5" />
        </div>
        <input
          v-model="store.searchQuery"
          @input="store.currentPage = 1"
          type="text"
          placeholder="Cari pengumuman..."
          class="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-700 font-medium"
        />
        <button 
          v-if="store.searchQuery"
          @click="store.searchQuery = ''; store.currentPage = 1"
          class="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="i in 8" :key="i" class="animate-pulse bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div class="h-40 bg-gray-200 rounded-xl mb-4"></div>
          <div class="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100 text-center max-w-2xl mx-auto shadow-sm">
        <AlertCircle class="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p class="font-semibold text-lg">{{ store.error }}</p>
        <button @click="store.fetchPengumuman()" class="mt-4 bg-white px-6 py-2.5 rounded-xl text-red-600 font-bold hover:bg-red-50 border border-red-200 transition-colors shadow-sm">
          Coba Lagi
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="store.filteredPengumuman.length === 0" class="bg-white py-16 px-4 rounded-3xl border border-gray-100 border-dashed text-center max-w-3xl mx-auto shadow-sm">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <SearchX class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Tidak Ditemukan</h3>
        <p class="text-gray-500 max-w-md mx-auto">Kami tidak dapat menemukan pengumuman yang sesuai dengan pencarian Anda.</p>
        <button v-if="store.searchQuery" @click="store.searchQuery = ''; store.currentPage = 1" class="mt-6 text-green-600 font-bold hover:text-green-700 bg-green-50 px-6 py-3 rounded-xl hover:bg-green-100 transition-colors">
          Hapus Pencarian
        </button>
      </div>

      <!-- Grid Cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div
          v-for="item in store.paginatedPengumuman"
          :key="item.id"
          class="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 overflow-hidden group flex flex-col border border-gray-100 transform hover:-translate-y-1.5"
        >
          <!-- Image Section -->
          <div class="relative h-48 w-full overflow-hidden bg-gray-50">
            <!-- Fallback Icon if no image -->
            <div v-if="!item.gambar" class="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-100">
              <Megaphone class="w-16 h-16 opacity-50" />
            </div>
            
            <img
              v-if="item.gambar"
              :src="$storageUrl(item.gambar)"
              alt="Pengumuman"
              class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <!-- Date Badge -->
            <div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm font-bold text-xs text-green-700 flex flex-col items-center border border-white/50">
              <span class="text-lg leading-none">{{ getDay(item.created_at) }}</span>
              <span class="text-[9px] uppercase tracking-wider">{{ getMonthShort(item.created_at) }}</span>
            </div>

            <!-- Zoom Overlay -->
            <div
              v-if="item.gambar"
              @click.prevent="openImage($storageUrl(item.gambar))"
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-10"
            >
              <div class="bg-white/90 text-gray-900 p-3 rounded-full transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-lg hover:bg-white hover:text-green-600">
                <ZoomIn class="w-6 h-6" />
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-5 flex flex-col flex-grow">
            <div class="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-3 bg-gray-50 w-fit px-2.5 py-1 rounded-md border border-gray-100">
              <Calendar class="w-3.5 h-3.5 text-green-500" />
              {{ formatDate(item.created_at) }}
            </div>
            
            <h2 class="text-gray-900 font-bold text-base mb-5 leading-snug group-hover:text-green-600 transition-colors line-clamp-3">
              {{ item.judul }}
            </h2>

            <router-link
              :to="`/pengumuman/${item.slug}`"
              class="mt-auto flex items-center justify-center gap-2 w-full bg-green-50/50 text-green-600 font-bold py-3 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-300 border border-green-100 hover:border-transparent group/btn"
            >
              Selengkapnya
              <ArrowRight class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </router-link>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-12 gap-2" v-if="store.totalPages > 1">
        <button
          @click="store.prevPage"
          :disabled="store.currentPage === 1"
          class="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-green-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-colors shadow-sm"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>

        <button
          v-for="page in store.totalPages"
          :key="page"
          @click="store.goToPage(page)"
          :class="[
            'w-11 h-11 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center',
            store.currentPage === page
              ? 'bg-green-500 text-white border-transparent scale-105'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-green-600 hover:border-green-300',
          ]"
        >
          {{ page }}
        </button>

        <button
          @click="store.nextPage"
          :disabled="store.currentPage === store.totalPages"
          class="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-green-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-colors shadow-sm"
        >
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Image Modal -->
    <Transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click="closeImage"
      >
        <button @click.stop="closeImage" class="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all backdrop-blur-md hover:scale-110">
          <X class="w-6 h-6" />
        </button>
        <img :src="selectedImage" class="max-w-full max-h-[90vh] rounded-2xl shadow-2xl ring-1 ring-white/10" @click.stop />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePengumumanStore } from '@/stores/pengumuman'
import PageHeader from '@/components/PageHeader.vue'
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

onMounted(() => {
  store.fetchPengumuman()
})
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
