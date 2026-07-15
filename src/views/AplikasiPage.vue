<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Header -->
    <PageHeader2 
      title="Daftar Aplikasi" 
      subtitle="Kumpulan aplikasi pendukung pemerintahan dan layanan publik Kabupaten Lebak."
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Aplikasi', link: '/aplikasi' },
      ]"
    />

    <div class="max-w-7xl mx-auto px-4 py-8 mt-6">
      <!-- Filter Section -->
      <div class="bg-gradient-to-r from-[#0a2463] to-[#1e5ca8] p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-[#1e5ca8]/20 mb-10 flex flex-col md:flex-row items-end md:items-center gap-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        <div class="w-full md:w-1/4 relative z-10">
          <label class="block text-sm font-semibold text-blue-100 mb-2">Kategori</label>
          <select v-model="selectedKategori" class="w-full border-none bg-white/10 text-white placeholder-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e8a020] focus:bg-white focus:text-gray-900 transition-all shadow-inner outline-none">
            <option value="" class="bg-white text-gray-900">Semua Kategori</option>
            <option value="Aplikasi Layanan Publik" class="bg-white text-gray-900">Layanan Publik</option>
            <option value="Internal Pemerintah" class="bg-white text-gray-900">Internal Pemerintah</option>
          </select>
        </div>

        <div class="w-full md:w-1/4 relative z-10">
          <label class="block text-sm font-semibold text-blue-100 mb-2">Jenis</label>
          <select v-model="selectedJenis" class="w-full border-none bg-white/10 text-white placeholder-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e8a020] focus:bg-white focus:text-gray-900 transition-all shadow-inner outline-none">
            <option value="" class="bg-white text-gray-900">Semua Jenis</option>
            <option value="Website" class="bg-white text-gray-900">Website</option>
            <option value="Mobile" class="bg-white text-gray-900">Mobile</option>
          </select>
        </div>

        <div class="w-full md:flex-1 relative z-10">
          <label class="block text-sm font-semibold text-blue-100 mb-2">Pencarian</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama aplikasi..."
            class="w-full border-none bg-white/10 text-white placeholder-blue-200/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e8a020] focus:bg-white focus:text-gray-900 transition-all shadow-inner outline-none"
            @keyup.enter="loadData"
          />
        </div>

        <button
          @click="loadData"
          class="w-full md:w-auto bg-[#e8a020] hover:bg-[#f6b033] text-[#0a2463] font-black px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 relative z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Cari
        </button>
      </div>

      <!-- Loading -->
      <div v-if="aplikasiStore.loading" class="page-loading-placeholder">Memuat data aplikasi...</div>

      <!-- Error -->
      <div v-if="aplikasiStore.error" class="text-center bg-red-50 text-red-500 py-6 rounded-xl border border-red-100">
        {{ aplikasiStore.error }}
      </div>

      <!-- Card Grid -->
      <div v-if="!aplikasiStore.loading && aplikasiStore.aplikasis.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="app in aplikasiStore.aplikasis"
          :key="app.id"
          class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 overflow-hidden transition-all duration-300 min-h-[180px]"
        >
          <!-- Default State (Appears normally, fades out on hover) -->
          <div class="flex flex-col h-full transition-opacity duration-300 group-hover:opacity-0">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center">
                <img
                  :src="$storageUrl(app.icon)"
                  alt="icon"
                  class="w-full h-full object-contain"
                  @error="$event.target.src = '/images/default-layanan.jpg'"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-800 text-lg truncate" :title="app.nama">{{ app.nama }}</h3>
                <p class="text-sm text-gray-500 truncate" :title="app.kategori || 'Aplikasi Layanan Publik'">{{ app.kategori || 'Aplikasi Layanan Publik' }}</p>
              </div>
            </div>

            <!-- Badges -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-if="app.jenis" class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                {{ app.jenis }}
              </span>
              <span v-else class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                Website
              </span>
            </div>
          </div>

          <!-- Hover State (Navy Overlay, Description, Button) -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#071840] to-[#0a2463] p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p class="text-white/90 text-sm line-clamp-3 mb-4 text-center flex-1 flex items-center justify-center leading-relaxed">
              {{ app.deskripsi || 'Tidak ada deskripsi tersedia.' }}
            </p>
            <a
              :href="app.link"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-auto block w-full text-center bg-[#e8a020] hover:bg-white text-[#071840] font-bold px-4 py-2.5 rounded-xl transition-all border-2 border-transparent hover:border-[#e8a020] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Buka Aplikasi
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!aplikasiStore.loading && !aplikasiStore.error" class="page-loading-placeholder">
        Tidak ada data aplikasi ditemukan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAplikasiStore } from '../stores/aplikasi'
import PageHeader2 from '../components/PageHeader2.vue'

const aplikasiStore = useAplikasiStore()

const selectedKategori = ref('')
const selectedJenis = ref('')
const searchQuery = ref('')

const loadData = () => {
  const params = {}
  if (selectedKategori.value) params.kategori = selectedKategori.value
  if (selectedJenis.value) params.jenis = selectedJenis.value
  if (searchQuery.value) params.search = searchQuery.value
  aplikasiStore.fetchAplikasis(params)
}

onMounted(() => {
  loadData()
})
</script>
