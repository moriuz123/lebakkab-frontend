<template>
  <div>
    <!-- Header -->
    <PageHeader
      :title="layanan?.judul || 'Detail Layanan'"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Layanan', link: '/layanan' },
        { label: layanan?.judul || 'Detail', link: '#' },
      ]"
    />

    <!-- Wrapper (global layout dari main.css) -->
    <div class="page-container">
      <!-- Konten Utama -->
      <div v-if="!loading && layanan" class="page-main">
        <article class="page-content">
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-if="layanan.jenis" class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {{ layanan.jenis }}
            </span>
            <span v-if="layanan.kategori_layanan" class="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              {{ layanan.kategori_layanan.nama }}
            </span>
          </div>
          <!-- Cover -->
          <img
            v-if="layanan.cover"
            :src="layanan.cover"
            alt="Cover Layanan"
            class="page-thumbnail"
          />

          <!-- Deskripsi -->
          <div v-html="layanan.deskripsi" class="page-body"></div>

          <!-- Link Rujukan / Akses Layanan -->
          <div v-if="layanan.link_rujukan" class="mt-8 flex justify-center lg:justify-start">
             <a :href="layanan.link_rujukan" target="_blank" rel="noopener noreferrer" 
                class="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                <span>Akses Layanan Ini</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
             </a>
          </div>

          <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
             <!-- Kontak -->
             <div v-if="layanan.kontak" class="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-start gap-4">
               <div class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
               </div>
               <div>
                  <h3 class="text-sm font-bold text-gray-900 mb-1">Kontak Informasi</h3>
                  <p class="text-gray-600 font-medium">{{ layanan.kontak }}</p>
               </div>
             </div>

             <!-- Unit Pelaksana / OPD -->
             <div v-if="layanan.opd || layanan.unit_pelaksana" class="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-start gap-4">
               <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
               </div>
               <div>
                  <h3 class="text-sm font-bold text-gray-900 mb-1">Unit Pelaksana</h3>
                  <p class="text-gray-600 font-medium">{{ layanan.opd?.nama || layanan.unit_pelaksana }}</p>
               </div>
             </div>
          </div>
        </article>
      </div>

      <!-- Sidebar -->
      <aside class="page-sidebar" v-if="!loading">
        <SidebarLayanan />
      </aside>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="page-loading-placeholder">Memuat detail layanan...</div>

    <!-- Not Found -->
    <div v-if="!loading && !layanan" class="page-loading-placeholder">
      Data layanan tidak ditemukan.
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
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

