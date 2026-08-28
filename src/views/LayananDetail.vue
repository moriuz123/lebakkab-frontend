<template>
  <div class="bg-[#f8fafc] min-h-screen pb-24 font-sans selection:bg-emerald-500 selection:text-white">
    <!-- Gunakan komponen PageHeader2 -->
    <PageHeader2
      :title="layanan?.judul || 'Detail Layanan'"
      :subtitle="layanan ? `${layanan.jenis || ''} ${layanan.kategori_layanan ? '- ' + layanan.kategori_layanan.nama : ''}` : ''"
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Layanan', link: '/layanan' },
        { label: layanan?.judul || 'Detail Layanan', link: '#' },
      ]"
    />

    <!-- Main Content Grid -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
      
      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/50">
        <div class="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
        <p class="text-gray-500 font-semibold animate-pulse mt-4">Memuat detail layanan...</p>
      </div>

      <!-- Not Found -->
      <div v-if="!loading && !layanan" class="bg-red-50/90 backdrop-blur-md text-red-600 p-10 rounded-[2.5rem] text-center border border-red-100 shadow-xl max-w-2xl mx-auto mt-10">
        <span class="font-bold text-xl">Data layanan tidak ditemukan.</span>
      </div>

      <div v-if="!loading && layanan" class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        <!-- Kolom Konten -->
        <main class="w-full lg:w-2/3">
          <div class="bg-white rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden group">
            
            <!-- Dekorasi Subtle -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            
            <img
              v-if="layanan.cover"
              :src="layanan.cover"
              :alt="layanan.judul"
              class="w-full h-auto max-h-[450px] object-cover rounded-[1.5rem] shadow-md mb-10 border border-gray-100 relative z-10"
            />
            
            <div class="prose prose-lg prose-emerald max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed relative z-10" v-html="layanan.deskripsi"></div>
            
            <div class="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <!-- Kontak -->
              <div v-if="layanan.kontak" class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-start gap-5 hover:bg-white hover:shadow-lg hover:border-emerald-100 transition-all duration-300">
                <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Kontak Resmi</h3>
                  <p class="text-gray-900 font-semibold text-lg">{{ layanan.kontak }}</p>
                </div>
              </div>

              <!-- OPD -->
              <div v-if="layanan.opd || layanan.unit_pelaksana" class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex items-start gap-5 hover:bg-white hover:shadow-lg hover:border-emerald-100 transition-all duration-300">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Unit Pelaksana</h3>
                  <p class="text-gray-900 font-semibold text-lg leading-snug">{{ layanan.opd?.nama || layanan.unit_pelaksana }}</p>
                </div>
              </div>
            </div>

            <!-- Link Rujukan / Akses Layanan -->
            <div v-if="layanan.link_rujukan" class="mt-12 flex justify-center lg:justify-start">
             <a :href="layanan.link_rujukan" target="_blank" rel="noopener noreferrer" 
                 class="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                
                <!-- Hover highlight effect -->
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                
                <span class="relative z-10 text-lg">Akses Layanan Ini</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

          </div>
        </main>

        <!-- Sidebar Kolom Kanan -->
        <aside class="w-full lg:w-1/3">
          <div class="sticky top-28">
            <SidebarLayanan />
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/api'
import PageHeader2 from '@/components/PageHeader2.vue'
import SidebarLayanan from '@/components/SidebarLayanan.vue'
import { useLayananStore } from '@/stores/layanan'

const route = useRoute()
const layananStore = useLayananStore()

const layanan = computed(() => layananStore.layananDetail)
const loading = computed(() => layananStore.loading)

// Load pertama saat halaman dibuka
onMounted(() => {
  layananStore.fetchLayananDetail(route.params.slug)
})

// Load ulang ketika slug berubah
watch(
  () => route.params.slug,
  (newSlug) => {
    layananStore.fetchLayananDetail(newSlug)
  },
)
</script>

