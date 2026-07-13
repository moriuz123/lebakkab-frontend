<template>
  <div class="bg-[#f8fafc] min-h-screen pb-24 font-sans selection:bg-emerald-500 selection:text-white">
    
    <!-- Premium Hero Section -->
    <div class="relative bg-emerald-900 overflow-hidden pt-28 pb-36 lg:pt-36 lg:pb-48 rounded-b-[3rem] lg:rounded-b-[5rem] shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] mb-16 lg:mb-24 z-10 border-b border-emerald-800">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 -translate-x-1/4 translate-y-1/4"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/50 to-emerald-950"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-800/50 border border-emerald-400/30 backdrop-blur-md mb-8 shadow-inner">
           <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
           <span class="text-emerald-100 text-sm font-semibold tracking-wide uppercase">Layanan Terpadu Terintegrasi</span>
        </div>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
          Pusat <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">Layanan Publik</span>
        </h1>
        <p class="mt-4 text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
          Temukan dan akses berbagai layanan administrasi, perizinan, dan informasi publik Kabupaten Lebak dengan mudah, cepat, dan transparan.
        </p>
      </div>
    </div>

    <!-- Main Content Container (Overlapping Hero) -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 -mt-28 sm:-mt-36 relative z-20">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/50 min-h-[400px]">
        <div class="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
        <p class="text-gray-500 font-semibold animate-pulse">Memuat Kategori Layanan...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50/90 backdrop-blur-md text-red-600 p-10 rounded-[2.5rem] text-center border border-red-100 shadow-xl max-w-2xl mx-auto mt-10">
        <span class="font-bold text-xl">{{ error }}</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="kategoriLayanans.length === 0" class="text-center py-24 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-xl mt-10">
        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Belum Ada Kategori</h3>
        <p class="text-gray-500 font-medium">Kategori layanan publik saat ini belum tersedia.</p>
      </div>

      <!-- Categories Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        <router-link
          v-for="kategori in kategoriLayanans"
          :key="kategori.slug"
          :to="{ name: 'LayananKategoriPage', params: { slug: kategori.slug } }"
          class="group bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden transform hover:-translate-y-2"
        >
          <!-- Hover Effect Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          
          <div class="w-28 h-28 mb-6 relative z-10 flex items-center justify-center">
            <div class="absolute inset-0 bg-emerald-100/50 rounded-[1.5rem] rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 origin-center"></div>
            <div class="absolute inset-0 bg-emerald-50 rounded-[1.5rem] -rotate-3 group-hover:-rotate-6 group-hover:scale-105 transition-all duration-500 origin-center"></div>
            
            <img 
              v-if="kategori.thumbnail" 
              :src="getStorageUrl(kategori.thumbnail)" 
              :alt="kategori.nama"
              class="w-16 h-16 object-contain relative z-20 drop-shadow-md group-hover:scale-110 transition-transform duration-500"
            />
            <div v-else class="w-16 h-16 rounded-full flex items-center justify-center text-emerald-500 relative z-20">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
          </div>
          
          <h3 class="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-3 relative z-10">
            {{ kategori.nama }}
          </h3>
          <div class="inline-flex items-center gap-1.5 bg-gray-50 group-hover:bg-emerald-50 text-gray-500 group-hover:text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 relative z-10 border border-gray-100 group-hover:border-emerald-100">
            <span>{{ kategori.informasi_layanans_count || 0 }}</span>
            <span>Layanan Tersedia</span>
          </div>
        </router-link>
      </div>

      <!-- Pagination -->
      <div v-if="kategoriPagination && kategoriPagination.last_page > 1" class="mt-16 flex justify-center">
        <PaginationNav
          :currentPage="kategoriPagination.current_page"
          :totalPages="kategoriPagination.last_page"
          @update:page="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLayananStore } from '@/stores/layanan'
import { storeToRefs } from 'pinia'
import PaginationNav from '@/components/PaginationNav.vue'
import { getStorageUrl } from '@/utils/helpers'

const store = useLayananStore()
const { kategoriLayanans, kategoriPagination, loading, error } = storeToRefs(store)

const handlePageChange = (page) => {
  store.fetchKategoriLayanan(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  store.fetchKategoriLayanan(1)
})
</script>
