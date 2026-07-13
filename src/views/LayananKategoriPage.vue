<template>
  <div class="bg-[#f8fafc] min-h-screen pb-24 font-sans selection:bg-emerald-500 selection:text-white">
    <!-- Premium Header -->
    <div class="relative bg-emerald-900 overflow-hidden pt-28 pb-32 lg:pt-36 lg:pb-40 rounded-b-[3rem] shadow-[0_20px_60px_-15px_rgba(16,185,129,0.3)] mb-12 z-10 border-b border-emerald-800">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/50 to-emerald-950"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        <!-- Breadcrumb Custom -->
        <nav class="flex items-center gap-2 text-sm text-emerald-200/80 mb-6 font-medium">
          <router-link to="/" class="hover:text-white transition-colors">Beranda</router-link>
          <span class="w-1 h-1 rounded-full bg-emerald-500/50"></span>
          <router-link to="/layanan" class="hover:text-white transition-colors">Layanan</router-link>
          <span class="w-1 h-1 rounded-full bg-emerald-500/50"></span>
          <span class="text-white">Kategori</span>
        </nav>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Portal <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">Layanan Digital</span>
        </h1>
        <p class="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
          Temukan berbagai layanan publik secara digital dan terintegrasi untuk masyarakat Kabupaten Lebak.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        <!-- Sidebar Kiri (Kategori) -->
        <aside class="w-full lg:w-1/4 shrink-0 space-y-8">
          <div class="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/50 sticky top-28 group hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 overflow-hidden">
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <h3 class="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              Semua Kategori
            </h3>
            
            <div v-if="loadingKategori" class="space-y-4 animate-pulse">
              <div v-for="i in 5" :key="i" class="h-12 bg-gray-100 rounded-2xl"></div>
            </div>

            <ul v-else class="space-y-3 relative z-10">
              <li>
                <router-link to="/layanan" class="group/item flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-100 text-gray-600 hover:text-emerald-700 transition-all duration-300 font-semibold shadow-sm hover:shadow-md">
                  <span>Semua Layanan</span>
                  <svg class="w-5 h-5 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </router-link>
              </li>
              <li v-for="kat in kategoriLayanans" :key="kat.slug">
                <router-link 
                  :to="{ name: 'LayananKategoriPage', params: { slug: kat.slug } }"
                  :class="['flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 font-semibold shadow-sm', 
                           $route.params.slug === kat.slug ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30 translate-x-2' : 'bg-white border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 text-gray-600 hover:text-emerald-700 hover:shadow-md hover:translate-x-1']"
                >
                  <span class="line-clamp-1 pr-2">{{ kat.nama }}</span>
                  <span :class="['text-xs py-1 px-3 rounded-full font-bold shadow-inner', $route.params.slug === kat.slug ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500']">
                    {{ kat.informasi_layanans_count || 0 }}
                  </span>
                </router-link>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Konten Utama (List Layanan) -->
        <main class="w-full lg:w-3/4 bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-xl">
          <div class="flex items-center justify-between mb-8 pb-6 border-b border-gray-200/50">
            <h2 class="text-3xl font-black text-gray-900 tracking-tight">
              Daftar Layanan Tersedia
            </h2>
          </div>

          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="i in 4" :key="i" class="h-[350px] bg-gray-100/80 backdrop-blur-sm rounded-[2rem] animate-pulse border border-gray-200/50 shadow-sm"></div>
          </div>

          <div v-else-if="error" class="text-center py-12 bg-red-50/80 backdrop-blur-md rounded-[2rem] border border-red-100 text-red-600 shadow-lg">
            <span class="font-bold text-lg">{{ error }}</span>
          </div>

          <div v-else-if="layanans.length === 0" class="text-center py-24 bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-dashed border-gray-300 shadow-sm">
            <div class="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
               <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </div>
            <p class="text-gray-500 font-bold text-xl">Tidak Ada Layanan</p>
            <p class="text-gray-400 mt-2">Belum ada layanan yang ditambahkan pada kategori ini.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <router-link
              v-for="item in layanans"
              :key="item.slug"
              :to="{ name: 'LayananDetail', params: { slug: item.slug } }"
              class="group bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-300 hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden relative"
            >
              <div class="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
              
              <div class="h-56 overflow-hidden relative z-10">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 group-hover:opacity-80 transition-opacity duration-500"></div>
                <img
                  v-if="item.cover"
                  :src="item.cover"
                  :alt="item.judul"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div v-else class="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center">
                  <span class="text-emerald-300/50 font-black text-6xl tracking-tighter">LAYANAN</span>
                </div>
                
                <!-- Kategori Badge Floating -->
                <div class="absolute top-5 left-5 z-20">
                  <span v-if="item.kategori_layanan" class="text-xs bg-white/20 backdrop-blur-md border border-white/40 text-white px-4 py-1.5 rounded-full font-bold shadow-lg">
                    {{ item.kategori_layanan.nama }}
                  </span>
                </div>
                
                <!-- Title Overlay on Image -->
                <div class="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <h3 class="text-xl font-black text-white leading-tight drop-shadow-md line-clamp-2">
                     {{ item.judul }}
                   </h3>
                </div>
              </div>

              <div class="p-6 sm:p-8 flex flex-col flex-1 relative z-10 bg-white">
                <div class="mt-auto space-y-3">
                  <p class="text-gray-600 text-sm flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </span>
                    <span class="line-clamp-1 font-semibold text-gray-700">{{ item.opd?.nama || '-' }}</span>
                  </p>
                  <p v-if="item.kontak" class="text-gray-600 text-sm flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </span>
                    <span class="font-semibold text-gray-700">{{ item.kontak }}</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Pagination -->
          <div v-if="layananPagination && layananPagination.last_page > 1" class="mt-14 flex justify-center">
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
