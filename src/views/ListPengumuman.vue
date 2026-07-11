<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- RESTORE ORIGINAL PAGE HEADER -->
    <PageHeader title="Daftar Pengumuman" subtitle="Informasi terbaru untuk masyarakat" />

    <div class="max-w-5xl mx-auto px-4 py-10">
      
      <!-- Search Bar -->
      <div v-if="!store.loading && !store.error" class="mb-10 relative">
        <div class="relative bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center px-5 py-2 hover:border-green-400 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/10 transition-all duration-300">
          <Search class="w-5 h-5 text-gray-400" />
          <input
            v-model="store.searchQuery"
            @input="store.currentPage = 1"
            type="text"
            placeholder="Cari informasi pengumuman..."
            class="w-full bg-transparent border-none focus:ring-0 text-gray-700 py-3 px-4 font-medium outline-none"
          />
          <button 
            v-if="store.searchQuery"
            @click="store.searchQuery = ''; store.currentPage = 1"
            class="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-all"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="space-y-5">
        <div v-for="i in 5" :key="i" class="animate-pulse bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
          <div class="w-full sm:w-56 h-48 sm:h-36 bg-gray-200 rounded-xl flex-shrink-0"></div>
          <div class="flex-1 py-2 pr-4">
            <div class="h-5 bg-gray-200 rounded w-1/4 mb-5"></div>
            <div class="h-7 bg-gray-200 rounded w-full mb-3"></div>
            <div class="h-7 bg-gray-200 rounded w-2/3"></div>
          </div>
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

      <!-- Content Layout (Horizontal List) -->
      <div v-else class="space-y-5">
        <div
          v-for="item in store.paginatedPengumuman"
          :key="item.id"
          class="bg-white rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row gap-5 sm:gap-6 group transform hover:-translate-y-1"
        >
          <!-- Image (Left Side) -->
          <div class="relative w-full sm:w-56 h-56 sm:h-auto sm:min-h-[170px] rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
            <div v-if="!item.gambar" class="absolute inset-0 flex items-center justify-center">
              <Megaphone class="w-12 h-12 text-gray-300" />
            </div>
            <img
              v-if="item.gambar"
              :src="$storageUrl(item.gambar)"
              alt="Pengumuman"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <button
              v-if="item.gambar"
              @click.prevent="openImage($storageUrl(item.gambar))"
              class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-sm"
            >
              <div class="bg-white/20 p-3 rounded-full text-white">
                <ZoomIn class="w-6 h-6" />
              </div>
            </button>
          </div>

          <!-- Content (Right Side) -->
          <div class="flex-1 flex flex-col py-1 pr-2 sm:pr-4">
            <div class="flex flex-wrap items-center gap-3 mb-3">
              <span class="bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1 rounded-md border border-green-100/50 uppercase tracking-wider">
                Pengumuman
              </span>
              <span class="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5" />
                {{ formatDate(item.created_at, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
              </span>
            </div>

            <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-snug line-clamp-2">
              {{ item.judul }}
            </h2>

            <div class="mt-auto flex justify-start sm:justify-end border-t border-gray-50 pt-4">
              <router-link
                :to="`/pengumuman/${item.slug}`"
                class="inline-flex items-center justify-center w-full sm:w-auto gap-2 text-sm font-bold text-green-700 bg-green-50 hover:bg-green-600 hover:text-white px-5 py-2.5 rounded-xl transition-colors group/link"
              >
                Baca Detail
                <ArrowRight class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </router-link>
            </div>
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
              ? 'bg-green-500 text-white border-transparent'
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
