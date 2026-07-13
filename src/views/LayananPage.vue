<template>
  <div class="bg-gray-50 min-h-screen pb-20">
    <PageHeader title="Layanan Publik" subtitle="Pilih kategori layanan yang Anda butuhkan" />

    <div class="max-w-7xl mx-auto px-4 py-16">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>

      <div v-else-if="error" class="text-center py-10 bg-red-50 rounded-2xl border border-red-100 text-red-600">
        {{ error }}
      </div>

      <div v-else-if="kategoriLayanans.length === 0" class="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <p class="text-gray-500 font-medium">Belum ada kategori layanan.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <router-link
          v-for="kategori in kategoriLayanans"
          :key="kategori.slug"
          :to="{ name: 'LayananKategoriPage', params: { slug: kategori.slug } }"
          class="group bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="w-24 h-24 mb-6 relative z-10">
            <div class="absolute inset-0 bg-emerald-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center"></div>
            <img 
              v-if="kategori.thumbnail" 
              :src="getStorageUrl(kategori.thumbnail)" 
              :alt="kategori.nama"
              class="w-full h-full object-contain relative z-10 p-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300"
            />
            <div v-else class="w-full h-full bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 relative z-10 border-2 border-emerald-100">
              <span class="text-3xl font-black">L</span>
            </div>
          </div>
          
          <h3 class="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2 relative z-10">
            {{ kategori.nama }}
          </h3>
          <p class="text-sm text-gray-500 font-medium relative z-10 bg-gray-100 px-3 py-1 rounded-full group-hover:bg-white transition-colors">
            {{ kategori.informasi_layanans_count || 0 }} Layanan
          </p>
        </router-link>
      </div>

      <!-- Pagination -->
      <div v-if="kategoriPagination && kategoriPagination.last_page > 1" class="mt-16">
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
import PageHeader from '@/components/PageHeader.vue'
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
