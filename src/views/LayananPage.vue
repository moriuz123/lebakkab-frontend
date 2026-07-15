<template>
  <div class="bg-[#f8fafc] min-h-screen pb-24 font-sans selection:bg-emerald-500 selection:text-white">
    
    <!-- Gunakan komponen PageHeader2 -->
    <PageHeader2
      title="Pusat Layanan Publik"
      subtitle="Temukan dan akses berbagai layanan administrasi, perizinan, dan informasi publik Kabupaten Lebak dengan mudah, cepat, dan transparan."
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Layanan Publik', link: '/layanan' },
      ]"
    />

    <!-- Main Content Container -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
      
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
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <router-link
          v-for="kategori in kategoriLayanans"
          :key="kategori.slug"
          :to="{ name: 'LayananKategoriPage', params: { slug: kategori.slug } }"
          class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 border-t-4 border-t-[#e8a020] p-6 overflow-hidden transition-all duration-300 min-h-[180px] flex flex-col"
        >
          <!-- Default State -->
          <div class="flex flex-col h-full transition-opacity duration-300 group-hover:opacity-0">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center relative overflow-hidden">
                <img 
                  v-if="kategori.thumbnail" 
                  :src="getStorageUrl(kategori.thumbnail)" 
                  :alt="kategori.nama"
                  class="w-full h-full object-contain relative z-20"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-800 text-lg line-clamp-2" :title="kategori.nama">{{ kategori.nama }}</h3>
                <p class="text-sm text-gray-500 mt-1">Kategori Layanan</p>
              </div>
            </div>

            <!-- Badges -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                {{ kategori.informasi_layanans_count || 0 }} Layanan Tersedia
              </span>
            </div>
          </div>

          <!-- Hover State (Navy Overlay, Button) -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#071840] to-[#0a2463] p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p class="text-white/90 text-sm mb-4 text-center flex-1 flex items-center justify-center leading-relaxed">
              Jelajahi {{ kategori.informasi_layanans_count || 0 }} layanan yang tersedia pada kategori ini.
            </p>
            <div class="mt-auto block w-full text-center bg-[#e8a020] text-[#071840] font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              Lihat Layanan
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
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
import PageHeader2 from '@/components/PageHeader2.vue'
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
