<template>
  <div class="bg-[#f8fafc] min-h-screen pb-24 font-sans selection:bg-blue-500 selection:text-white">
    <PageHeader2
      :title="app?.nama || 'Detail Aplikasi'"
      :subtitle="'Informasi lengkap mengenai aplikasi dan layanan digital.'"
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Aplikasi', link: '/aplikasi' },
        { label: app?.nama || 'Detail', link: '#' },
      ]"
    />

    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 mt-6">
      
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/50">
        <div class="w-16 h-16 border-4 border-blue-100 border-t-[#1e5ca8] rounded-full animate-spin"></div>
        <p class="text-gray-500 font-semibold animate-pulse mt-4">Memuat detail aplikasi...</p>
      </div>

      <div v-if="!loading && !app" class="bg-red-50/90 backdrop-blur-md text-red-600 p-10 rounded-[2.5rem] text-center border border-red-100 shadow-xl max-w-2xl mx-auto mt-10">
        <span class="font-bold text-xl">Data aplikasi tidak ditemukan.</span>
        <div class="mt-4">
          <router-link to="/aplikasi" class="inline-block text-[#1e5ca8] hover:underline">
            Kembali ke Daftar Aplikasi
          </router-link>
        </div>
      </div>

      <div v-if="!loading && app" class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        <!-- Main Content -->
        <main class="w-full lg:w-2/3">
          <div class="bg-white rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden group">
            
            <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            
            <!-- App Header info -->
            <div class="flex flex-col sm:flex-row gap-8 items-start mb-10 relative z-10 border-b border-gray-100 pb-8">
              <div class="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-gray-50 rounded-[1.5rem] p-4 shadow-inner border border-gray-100 flex items-center justify-center">
                <img
                  :src="app.icon ? $storageUrl(app.icon) : 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'"
                  alt="icon"
                  class="w-full h-full object-contain"
                  @error="$event.target.src = 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'"
                />
              </div>
              <div>
                <h1 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">{{ app.nama }}</h1>
                <div class="flex flex-wrap items-center gap-2 mb-4">
                  <span v-for="kat in app.kategori_aplikasi" :key="kat.id" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#1e5ca8]/10 text-[#1e5ca8] border border-[#1e5ca8]/20">
                    {{ kat.nama }}
                  </span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="sub in app.subkategori_aplikasi" :key="sub.id" class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                    {{ sub.nama }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="prose prose-lg prose-blue max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed relative z-10 mb-12">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Tentang Aplikasi</h3>
              <p>{{ app.deskripsi || 'Tidak ada deskripsi tersedia untuk aplikasi ini.' }}</p>
            </div>
            
            <div class="mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <!-- Sumber -->
              <div class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-start gap-5 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Sumber Aplikasi</h3>
                  <p class="text-gray-900 font-semibold text-lg">{{ app.sumber || '-' }}</p>
                </div>
              </div>

              <!-- OPD Pelaksana -->
              <div class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-start gap-5 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                <div class="w-12 h-12 rounded-xl bg-[#e8a020]/20 text-[#e8a020] flex items-center justify-center shrink-0 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Unit Pelaksana</h3>
                  <p class="text-gray-900 font-semibold text-lg leading-snug">{{ app.opd_pelaksana || '-' }}</p>
                </div>
              </div>
            </div>

            <!-- Akses Layanan -->
            <div class="mt-12 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
              <a v-if="app.link" :href="app.link" target="_blank" rel="noopener noreferrer" 
                 class="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#0a2463] to-[#1e5ca8] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-[#1e5ca8]/30 hover:shadow-xl hover:shadow-[#1e5ca8]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <Icon name="lucide:globe" class="w-5 h-5 relative z-10" />
                <span class="relative z-10">Kunjungi Website</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <a v-if="app.url_playstore" :href="app.url_playstore" target="_blank" rel="noopener noreferrer" 
                 class="group relative inline-flex items-center justify-center gap-3 bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-bold shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <Icon name="logos:google-play-icon" class="w-5 h-5 relative z-10" />
                <span class="relative z-10">Google Play</span>
              </a>

              <a v-if="app.url_appstore" :href="app.url_appstore" target="_blank" rel="noopener noreferrer" 
                 class="group relative inline-flex items-center justify-center gap-3 bg-black text-white border-2 border-black px-8 py-4 rounded-full font-bold shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <Icon name="logos:apple" class="w-5 h-5 relative z-10" />
                <span class="relative z-10">App Store</span>
              </a>
            </div>

          </div>
        </main>
        
        <!-- Sidebar Kolom Kanan -->
        <aside class="w-full lg:w-1/3">
          <div class="sticky top-28">
            <SidebarAplikasi />
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/api'
import PageHeader2 from '@/components/PageHeader2.vue'
import SidebarAplikasi from '@/components/SidebarAplikasi.vue'
import { Icon } from '@iconify/vue'

const route = useRoute()
const app = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchApp = async () => {
  try {
    const response = await axios.get(`/api/data-aplikasi/${route.params.id}`)
    if (response.data?.status === 'success') {
      app.value = response.data.data
    } else {
      error.value = 'Data aplikasi tidak ditemukan'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Gagal memuat detail aplikasi'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchApp()
})
</script>
