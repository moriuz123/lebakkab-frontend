<template>
  <aside class="space-y-6">
    <BannerSlider />
    
    <section class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Kategori Aplikasi</h3>

      <div v-if="kategoriList.length === 0" class="text-gray-400 text-sm font-medium">Memuat kategori...</div>

      <div v-else class="space-y-2">
        <div v-for="kat in paginatedList" :key="kat.id" class="group flex items-center p-3 -mx-3 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="w-2 h-2 rounded-full bg-[#1e5ca8] mr-3 group-hover:scale-150 transition-transform"></div>
          
          <router-link
            :to="{ path: '/aplikasi', query: { kategori: kat.id } }"
            class="flex-1 block font-bold text-gray-800 group-hover:text-[#1e5ca8] transition-colors leading-snug text-sm"
          >
            {{ kat.nama }}
          </router-link>
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="p-2 rounded-lg transition-colors border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span class="text-xs font-bold text-gray-500">
            Hal {{ currentPage }} dari {{ totalPages }}
          </span>

          <button 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg transition-colors border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '@/utils/api'
import BannerSlider from './BannerSlider.vue'

const kategoriList = ref([])
const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => {
  return Math.ceil(kategoriList.value.length / itemsPerPage)
})

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return kategoriList.value.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/kategori-aplikasi')
    if (response.data && response.data.status === 'success') {
      kategoriList.value = response.data.data
    }
  } catch (err) {
    console.error('Gagal memuat kategori:', err)
  }
})
</script>
