<template>
  <div class="bg-gray-50/50 min-h-screen pb-24">
    <!-- RESTORE ORIGINAL PAGE HEADER -->
    <PageHeader title="Daftar Pengumuman" subtitle="Informasi terbaru untuk masyarakat" />

    <div class="max-w-7xl mx-auto px-4 py-8">
      
      <!-- Modern Search Bar -->
      <div v-if="!store.loading && !store.error" class="mb-12 max-w-2xl mx-auto">
        <div class="relative bg-white rounded-full shadow-lg shadow-gray-200/50 flex items-center px-6 py-2.5 hover:shadow-xl hover:shadow-green-500/10 focus-within:shadow-xl focus-within:shadow-green-500/20 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-500">
          <Search class="w-6 h-6 text-green-600/70" />
          <input
            v-model="store.searchQuery"
            @input="store.currentPage = 1"
            type="text"
            placeholder="Ketik untuk mencari pengumuman..."
            class="w-full bg-transparent border-none focus:ring-0 text-gray-800 text-lg py-3 px-4 placeholder-gray-400 font-semibold outline-none"
          />
          <button 
            v-if="store.searchQuery"
            @click="store.searchQuery = ''; store.currentPage = 1"
            class="p-2.5 text-gray-400 hover:text-white bg-gray-50 hover:bg-red-500 rounded-full transition-all duration-300"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
        <div class="animate-pulse bg-gray-200 rounded-[2rem] md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[584px]"></div>
        <div class="animate-pulse bg-gray-200 rounded-[2rem] min-h-[280px]"></div>
        <div class="animate-pulse bg-gray-200 rounded-[2rem] min-h-[280px]"></div>
        <div class="animate-pulse bg-gray-200 rounded-[2rem] min-h-[280px]"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center max-w-2xl mx-auto shadow-sm">
        <AlertCircle class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p class="font-bold text-xl mb-2">Terjadi Kesalahan</p>
        <p class="font-medium text-red-500/80 mb-6">{{ store.error }}</p>
        <button @click="store.fetchPengumuman()" class="bg-white px-8 py-3 rounded-xl text-red-600 font-bold hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 transition-all shadow-sm hover:shadow-md">
          Muat Ulang
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="store.filteredPengumuman.length === 0" class="bg-white py-16 px-4 rounded-3xl border border-gray-100 border-dashed text-center max-w-2xl mx-auto shadow-sm">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <SearchX class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Tidak Ditemukan</h3>
        <p class="text-gray-500 max-w-md mx-auto">Kami tidak dapat menemukan pengumuman yang sesuai dengan pencarian Anda.</p>
        <button v-if="store.searchQuery" @click="store.searchQuery = ''; store.currentPage = 1" class="mt-6 text-green-600 font-bold hover:text-green-700 bg-green-50 px-6 py-3 rounded-xl hover:bg-green-100 transition-colors">
          Hapus Pencarian
        </button>
      </div>

      <!-- BENTO GRID CARDS -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense">
        <router-link
          v-for="(item, index) in store.paginatedPengumuman"
          :key="item.id"
          :to="`/pengumuman/${item.slug}`"
          :class="[
            'block relative rounded-[2rem] overflow-hidden group shadow-md hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:-translate-y-1',
            index === 0 && !store.searchQuery ? 'md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[584px]' : 'min-h-[300px] md:min-h-[280px]'
          ]"
        >
          <!-- Background Image or Gradient -->
          <div v-if="!item.gambar" class="absolute inset-0 bg-gradient-to-br from-green-600 via-teal-600 to-blue-700">
            <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <Megaphone class="w-32 h-32 text-white/10 group-hover:scale-125 transition-transform duration-1000" />
            </div>
          </div>
          
          <img
            v-if="item.gambar"
            :src="$storageUrl(item.gambar)"
            alt="Pengumuman"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-1000 ease-out"
          />
          
          <!-- Gradient Overlays for Readability -->
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60"></div>
          
          <!-- Lencana Terbaru (Hanya untuk item pertama) -->
          <div v-if="index === 0 && !store.searchQuery" class="absolute top-6 right-6 flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-lg uppercase tracking-widest animate-bounce z-20">
            <div class="w-2 h-2 bg-white rounded-full animate-ping"></div>
            Terbaru
          </div>

          <!-- Date Badge -->
          <div class="absolute top-6 left-6 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold border border-white/30 flex items-center gap-2 transition-colors z-20">
             <Calendar class="w-4 h-4" />
             {{ formatDate(item.created_at, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>

          <!-- Zoom Icon -->
          <div
            v-if="item.gambar"
            @click.prevent="openImage($storageUrl(item.gambar))"
            class="absolute top-6 right-6 bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 z-20"
            :class="{ 'right-36': index === 0 && !store.searchQuery }"
          >
            <ZoomIn class="w-5 h-5" />
          </div>

          <!-- Content at Bottom -->
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 z-20">
             <h2 :class="[
                'font-extrabold text-white mb-4 line-clamp-3 leading-snug drop-shadow-md group-hover:text-green-300 transition-colors',
                index === 0 && !store.searchQuery ? 'text-2xl md:text-4xl' : 'text-xl'
             ]">
                {{ item.judul }}
             </h2>
             
             <div class="opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2 text-white font-bold bg-white/20 backdrop-blur-md w-fit px-5 py-2.5 rounded-xl border border-white/20 hover:bg-green-500 hover:border-green-500">
                Baca Pengumuman
                <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </div>
          </div>
        </router-link>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-16 gap-3" v-if="store.totalPages > 1">
        <button
          @click="store.prevPage"
          :disabled="store.currentPage === 1"
          class="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-900 hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all duration-300 shadow-sm"
        >
          <ChevronLeft class="w-5 h-5" />
          <span class="font-bold hidden sm:block">Sebelumnya</span>
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
          <span class="font-bold hidden sm:block">Selanjutnya</span>
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
