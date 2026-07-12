<template>
  <div class="bg-[#F5F5F7] min-h-screen pb-24">
    <!-- RESTORE ORIGINAL PAGE HEADER -->
    <PageHeader title="Daftar Pengumuman" subtitle="Informasi terbaru untuk masyarakat" />

    <div class="max-w-7xl mx-auto px-4 py-8">
      
      <!-- Modern Search Bar -->
      <div v-if="!store.loading && !store.error" class="mb-12 max-w-2xl mx-auto">
        <div class="relative bg-white rounded-full shadow-md shadow-gray-200/50 flex items-center px-6 py-2.5 hover:shadow-xl hover:shadow-green-500/10 focus-within:shadow-xl focus-within:shadow-green-500/20 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-500">
          <Search class="w-6 h-6 text-green-600/70" />
          <input
            v-model="store.searchQuery"
            @input="store.currentPage = 1"
            type="text"
            placeholder="Cari pengumuman..."
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
      <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[240px] grid-flow-row-dense">
        <div class="animate-pulse bg-gray-200 rounded-[2rem] md:col-span-2 md:row-span-2 min-h-[300px]"></div>
        <div class="animate-pulse bg-gray-200 rounded-[2rem] min-h-[200px]"></div>
        <div class="animate-pulse bg-gray-200 rounded-[2rem] min-h-[200px]"></div>
        <div class="animate-pulse bg-gray-200 rounded-[2rem] md:col-span-2 min-h-[200px]"></div>
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

      <!-- TRUE STRUCTURAL BENTO GRID -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[240px] grid-flow-row-dense">
        <router-link
          v-for="(item, index) in store.paginatedPengumuman"
          :key="item.id"
          :to="`/pengumuman/${item.slug}`"
          :class="[
            'bg-white rounded-[2rem] p-5 md:p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 border border-gray-100/50 flex flex-col group overflow-hidden',
            getBentoClass(index)
          ]"
        >
           <!-- === LARGE BENTO CARD (2x2) === -->
           <template v-if="getBentoType(index) === 'large'">
             <div class="w-full h-48 md:h-[55%] rounded-2xl overflow-hidden mb-4 md:mb-5 relative shrink-0 bg-gray-50">
               <img v-if="item.gambar" :src="$storageUrl(item.gambar)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div v-else class="w-full h-full flex items-center justify-center text-gray-300"><Megaphone class="w-16 h-16"/></div>
               
               <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1.5">
                 <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Terbaru
               </div>
               <button v-if="item.gambar" @click.prevent="openImage($storageUrl(item.gambar))" class="absolute top-4 right-4 bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"><ZoomIn class="w-4 h-4" /></button>
             </div>
             
             <div class="flex-1 flex flex-col justify-between">
               <div>
                 <div class="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5"/> {{ formatDate(item.created_at, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</div>
                 <h2 class="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug line-clamp-3 group-hover:text-green-600 transition-colors">{{ item.judul }}</h2>
               </div>
               <div class="mt-4 flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 w-fit px-4 py-2 rounded-xl">
                  Baca Selengkapnya <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </div>
             </div>
           </template>

           <!-- === WIDE BENTO CARD (2x1) === -->
           <template v-else-if="getBentoType(index) === 'wide'">
             <div class="flex flex-col md:flex-row gap-5 h-full w-full">
               <div class="w-full md:w-2/5 h-40 md:h-full rounded-2xl overflow-hidden shrink-0 bg-gray-50 relative">
                  <img v-if="item.gambar" :src="$storageUrl(item.gambar)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-300"><Megaphone class="w-10 h-10"/></div>
                  <button v-if="item.gambar" @click.prevent="openImage($storageUrl(item.gambar))" class="absolute top-3 right-3 bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"><ZoomIn class="w-4 h-4" /></button>
               </div>
               <div class="flex-1 flex flex-col justify-center py-2">
                 <div class="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5"/> {{ formatDate(item.created_at, { day: 'numeric', month: 'long', year: 'numeric' }) }}</div>
                 <h2 class="text-lg md:text-xl font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-green-600 transition-colors">{{ item.judul }}</h2>
                 <div class="mt-auto pt-4 flex items-center gap-2 text-sm font-bold text-gray-500 group-hover:text-green-600 transition-colors">
                    Detail Pengumuman <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </div>
               </div>
             </div>
           </template>

           <!-- === TALL BENTO CARD (1x2) === -->
           <template v-else-if="getBentoType(index) === 'tall'">
             <div class="w-full h-48 md:h-[50%] rounded-2xl overflow-hidden mb-4 shrink-0 bg-gray-50 relative">
               <img v-if="item.gambar" :src="$storageUrl(item.gambar)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div v-else class="w-full h-full flex items-center justify-center text-gray-300"><Megaphone class="w-12 h-12"/></div>
               <button v-if="item.gambar" @click.prevent="openImage($storageUrl(item.gambar))" class="absolute top-3 right-3 bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"><ZoomIn class="w-4 h-4" /></button>
             </div>
             <div class="flex-1 flex flex-col justify-between">
               <div>
                 <div class="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5"/> {{ formatDate(item.created_at, { day: 'numeric', month: 'short', year: 'numeric' }) }}</div>
                 <h2 class="text-lg font-bold text-gray-900 leading-snug line-clamp-5 group-hover:text-green-600 transition-colors">{{ item.judul }}</h2>
               </div>
               <div class="mt-4 bg-gray-50 group-hover:bg-green-50 p-3 rounded-xl flex items-center justify-center transition-colors">
                  <ArrowRight class="w-5 h-5 text-gray-400 group-hover:text-green-600" />
               </div>
             </div>
           </template>

           <!-- === SMALL BENTO CARD (1x1) === -->
           <template v-else>
             <div class="flex-1 flex flex-col h-full relative">
               <div class="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5"/> {{ formatDate(item.created_at, { day: 'numeric', month: 'short' }) }}</div>
               <h2 class="text-base font-bold text-gray-900 leading-snug line-clamp-3 group-hover:text-green-600 transition-colors z-10">{{ item.judul }}</h2>
               
               <div class="mt-auto pt-4 flex justify-between items-end">
                  <div class="bg-gray-50 group-hover:bg-green-50 p-2.5 rounded-full transition-colors shrink-0">
                     <ArrowRight class="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                  </div>
                  <div v-if="item.gambar" class="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 relative">
                     <img :src="$storageUrl(item.gambar)" class="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
               </div>
             </div>
           </template>

        </router-link>
      </div>

      <!-- Pagination -->
      <!-- PaginationNav -->
      <PaginationNav
        v-if="store.totalPages > 1"
        :current-page="store.currentPage"
        :total-pages="store.totalPages"
        @update:page="store.goToPage"
      />
    </div>

    <!-- Image Modal -->
    <Transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 sm:p-10"
        @click="closeImage"
      >
        <button @click.stop="closeImage" class="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/30 p-3 rounded-full transition-all backdrop-blur-md hover:scale-110 hover:rotate-90 duration-300">
          <X class="w-6 h-6" />
        </button>
        <img :src="selectedImage" class="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10 transform transition-transform" @click.stop />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePengumumanStore } from '@/stores/pengumuman'
import PageHeader from '@/components/PageHeader.vue'
import PaginationNav from '@/components/PaginationNav.vue'
import { formatDate } from '@/utils/helpers'
import { Search, SearchX, X, AlertCircle, ZoomIn, Calendar, ArrowRight, Megaphone } from 'lucide-vue-next'

const store = usePengumumanStore()
const selectedImage = ref(null)

const openImage = (url) => {
  selectedImage.value = url
}

const closeImage = () => {
  selectedImage.value = null
}

// ==== BENTO GRID LOGIC ====
// Pattern ensures a perfect dense packing in a 3 or 4 column grid
const bentoPatterns = [
  { class: 'md:col-span-2 md:row-span-2', type: 'large' }, // Index 0
  { class: 'md:col-span-1 md:row-span-1', type: 'small' }, // Index 1
  { class: 'md:col-span-1 md:row-span-1', type: 'small' }, // Index 2
  { class: 'md:col-span-2 md:row-span-1', type: 'wide' },  // Index 3
  { class: 'md:col-span-1 md:row-span-2', type: 'tall' },  // Index 4
  { class: 'md:col-span-1 md:row-span-1', type: 'small' }  // Index 5
]

const getBentoClass = (index) => {
  return bentoPatterns[index % bentoPatterns.length].class
}

const getBentoType = (index) => {
  return bentoPatterns[index % bentoPatterns.length].type
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
