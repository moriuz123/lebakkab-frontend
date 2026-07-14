<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <!-- Header -->
    <PageHeader title="Daftar Aplikasi" />

    <div class="max-w-7xl mx-auto px-4 py-8 mt-6">
      <!-- Filter Section -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row items-end md:items-center gap-4">
        <div class="w-full md:w-1/4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select v-model="selectedKategori" class="w-full border-gray-300 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-emerald-900 focus:border-[#1e5ca8] transition-colors">
            <option value="">Semua Kategori</option>
            <option value="Aplikasi Layanan Publik">Layanan Publik</option>
            <option value="Internal Pemerintah">Internal Pemerintah</option>
          </select>
        </div>

        <div class="w-full md:w-1/4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
          <select v-model="selectedJenis" class="w-full border-gray-300 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-emerald-900 focus:border-[#1e5ca8] transition-colors">
            <option value="">Semua Jenis</option>
            <option value="Website">Website</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>

        <div class="w-full md:flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">Pencarian</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama aplikasi..."
            class="w-full border-gray-300 bg-gray-50 rounded-xl px-4 py-2.5 focus:ring-emerald-900 focus:border-[#1e5ca8] transition-colors"
            @keyup.enter="loadData"
          />
        </div>

        <button
          @click="loadData"
          class="w-full md:w-auto bg-[#0a2463] hover:bg-[#1e5ca8] text-white font-medium px-8 py-2.5 rounded-xl transition-all shadow-md shadow-[#1e5ca8] flex items-center justify-center gap-2"
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
          class="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1"
        >
          <!-- App Icon & Header -->
          <div class="flex items-start gap-4 mb-4">
            <div class="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img
                :src="$storageUrl(app.icon)"
                alt="icon"
                class="w-full h-full object-contain"
                @error="$event.target.src = '/images/default-layanan.jpg'"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-800 text-lg truncate" :title="app.nama">{{ app.nama }}</h3>
              <p class="text-sm text-gray-500 truncate" :title="app.kategori">{{ app.kategori }}</p>
            </div>
          </div>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              {{ app.jenis }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
            {{ app.deskripsi || 'Tidak ada deskripsi tersedia.' }}
          </p>

          <!-- Action Button -->
          <a
            :href="app.link"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-auto block w-full text-center bg-gray-50 hover:bg-[#0a2463] hover:text-white text-[#e8a020] font-semibold px-4 py-2.5 rounded-xl transition-colors border border-[#1e5ca8] hover:border-[#1e5ca8] flex items-center justify-center gap-2"
          >
            Buka Aplikasi
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
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
import PageHeader from '../components/PageHeader.vue'

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
