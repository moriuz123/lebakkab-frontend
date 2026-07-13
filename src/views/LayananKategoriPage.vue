<template>
  <div class="bg-gray-50 min-h-screen pb-20">
    <PageHeader :title="'Kategori Layanan'" :breadcrumbs="[{label: 'Home', link: '/'}, {label: 'Layanan', link: '/layanan'}, {label: 'Kategori', link: '#'}]" />

    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Banner Widget Atas -->
      <div class="mb-12 rounded-3xl overflow-hidden shadow-lg relative group">
         <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 opacity-90 z-10"></div>
         <img src="https://source.unsplash.com/1200x400/?technology,service" class="w-full h-48 object-cover absolute inset-0 z-0" />
         <div class="relative z-20 p-10 flex flex-col items-center text-center text-white">
            <h2 class="text-3xl font-black mb-2">Portal Layanan Publik</h2>
            <p class="text-emerald-50 text-lg max-w-2xl">Temukan berbagai layanan publik secara digital dan terintegrasi untuk masyarakat Kabupaten Lebak.</p>
         </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- Sidebar Kiri -->
        <aside class="w-full lg:w-1/4 shrink-0 space-y-8">
          <div class="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Semua Kategori</h3>
            
            <div v-if="loadingKategori" class="space-y-4 animate-pulse">
              <div v-for="i in 5" :key="i" class="h-10 bg-gray-100 rounded-xl"></div>
            </div>

            <ul v-else class="space-y-2">
              <li>
                <router-link to="/layanan" class="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-colors font-medium">
                  Semua Layanan
                </router-link>
              </li>
              <li v-for="kat in kategoriLayanans" :key="kat.slug">
                <router-link 
                  :to="{ name: 'LayananKategoriPage', params: { slug: kat.slug } }"
                  :class="['flex items-center justify-between p-3 rounded-xl transition-colors font-medium', 
                           $route.params.slug === kat.slug ? 'bg-emerald-500 text-white shadow-md' : 'hover:bg-emerald-50 text-gray-600 hover:text-emerald-600']"
                >
                  <span class="line-clamp-1">{{ kat.nama }}</span>
                  <span :class="['text-xs py-1 px-2 rounded-full', $route.params.slug === kat.slug ? 'bg-white/20' : 'bg-gray-100']">
                    {{ kat.informasi_layanans_count || 0 }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Konten Utama (List Layanan) -->
        <main class="w-full lg:w-3/4">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-black text-gray-900">
              Daftar Layanan
            </h2>
          </div>

          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="i in 4" :key="i" class="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
          </div>

          <div v-else-if="error" class="text-center py-10 bg-red-50 rounded-2xl border border-red-100 text-red-600">
            {{ error }}
          </div>

          <div v-else-if="layanans.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p class="text-gray-500 font-medium">Tidak ada layanan di kategori ini.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <router-link
              v-for="item in layanans"
              :key="item.slug"
              :to="{ name: 'LayananDetail', params: { slug: item.slug } }"
              class="group bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div class="h-48 overflow-hidden relative">
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  v-if="item.cover"
                  :src="item.cover"
                  :alt="item.judul"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div v-else class="w-full h-full bg-emerald-50 flex items-center justify-center">
                  <span class="text-emerald-200 font-black text-4xl">OPD</span>
                </div>
                <!-- Kategori Badge -->
                <div class="absolute top-4 left-4 z-20">
                  <span v-if="item.kategori_layanan" class="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-full font-bold shadow-md">
                    {{ item.kategori_layanan.nama }}
                  </span>
                </div>
              </div>

              <div class="p-6 flex flex-col flex-1">
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-3 line-clamp-2">
                  {{ item.judul }}
                </h3>
                
                <div class="mt-auto space-y-2">
                  <p class="text-gray-500 text-sm flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">🏛</span>
                    <span class="line-clamp-1 font-medium">{{ item.opd?.nama || '-' }}</span>
                  </p>
                  <p v-if="item.kontak" class="text-gray-500 text-sm flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">📞</span>
                    <span class="font-medium">{{ item.kontak }}</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Pagination -->
          <div v-if="layananPagination && layananPagination.last_page > 1" class="mt-12">
            <PaginationNav
              :currentPage="layananPagination.current_page"
              :totalPages="layananPagination.last_page"
              @update:page="handlePageChange"
            />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLayananStore } from '@/stores/layanan'
import { storeToRefs } from 'pinia'
import PageHeader from '@/components/PageHeader.vue'
import PaginationNav from '@/components/PaginationNav.vue'
import axios from '@/utils/api'

const route = useRoute()
const store = useLayananStore()
const { layanans, layananPagination, loading, error, kategoriLayanans } = storeToRefs(store)

const loadingKategori = ref(true)

const fetchKategoriSidebar = async () => {
  loadingKategori.value = true
  if (kategoriLayanans.value.length === 0) {
    await store.fetchKategoriLayanan(1) // Load kategori for sidebar (bisa buat unpaginated kalo API nya dukung)
  }
  loadingKategori.value = false
}

const loadData = async (page = 1) => {
  await store.fetchLayananByKategori(route.params.slug, page)
}

const handlePageChange = (page) => {
  loadData(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  fetchKategoriSidebar()
  loadData(1)
})

watch(
  () => route.params.slug,
  () => {
    loadData(1)
  }
)
</script>
