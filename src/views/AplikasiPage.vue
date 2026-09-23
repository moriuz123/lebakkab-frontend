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
      <div class="bg-gradient-to-r from-[#0a2463] to-[#1e5ca8] p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-[#1e5ca8]/20 mb-10 flex flex-col md:flex-row flex-wrap items-end md:items-center gap-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        
        <div class="w-full md:w-1/4 relative z-10">
          <label class="block text-sm font-semibold text-blue-100 mb-2">Sumber</label>
          <select v-model="selectedSumber" @change="loadData(1)" class="w-full border-none bg-white/10 text-white placeholder-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e8a020] focus:bg-white focus:text-gray-900 transition-all shadow-inner outline-none">
            <option value="" class="bg-white text-gray-900">Semua Sumber</option>
            <option value="Kabupaten Lebak" class="bg-white text-gray-900">Kabupaten Lebak</option>
            <option value="Kementerian / Pusat" class="bg-white text-gray-900">Kementerian / Pusat</option>
          </select>
        </div>

        <div class="w-full md:w-1/4 relative z-10">
          <label class="block text-sm font-semibold text-blue-100 mb-2">Kategori</label>
          <select v-model="selectedKategori" @change="onKategoriChange" class="w-full border-none bg-white/10 text-white placeholder-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e8a020] focus:bg-white focus:text-gray-900 transition-all shadow-inner outline-none">
            <option value="" class="bg-white text-gray-900">Semua Kategori</option>
            <option v-for="kat in aplikasiStore.kategoriList" :key="kat.id" :value="kat.id" class="bg-white text-gray-900">{{ kat.nama }}</option>
          </select>
        </div>

        <div class="w-full md:w-1/4 relative z-10" v-if="selectedKategori">
          <label class="block text-sm font-semibold text-blue-100 mb-2">Subkategori</label>
          <select v-model="selectedSubkategori" @change="loadData(1)" class="w-full border-none bg-white/10 text-white placeholder-blue-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e8a020] focus:bg-white focus:text-gray-900 transition-all shadow-inner outline-none">
            <option value="" class="bg-white text-gray-900">Semua Subkategori</option>
            <option v-for="sub in activeSubkategoris" :key="sub.id" :value="sub.id" class="bg-white text-gray-900">{{ sub.nama }}</option>
          </select>
        </div>

        <div class="w-full md:flex-1 relative z-10">
          <label class="block text-sm font-semibold text-blue-100 mb-2">Pencarian</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama aplikasi..."
            class="w-full border-none bg-white/10 text-white placeholder-blue-200/60 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e8a020] focus:bg-white focus:text-gray-900 transition-all shadow-inner outline-none"
            @keyup.enter="loadData(1)"
          />
        </div>

        <button
          @click="loadData(1)"
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
          class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 border-t-4 border-t-[#e8a020] p-6 overflow-hidden transition-all duration-300 min-h-[220px]"
        >
          <!-- Default State (Appears normally, fades out on hover) -->
          <div class="flex flex-col h-full transition-opacity duration-300 group-hover:opacity-0">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center">
                <img
                  :src="app.icon ? $storageUrl(app.icon) : 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'"
                  alt="icon"
                  class="w-full h-full object-contain"
                  @error="$event.target.src = 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-800 text-lg leading-tight line-clamp-2" :title="app.nama">{{ app.nama }}</h3>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2" :title="app.kategori_aplikasi?.nama">
                  {{ app.kategori_aplikasi?.nama || 'Tanpa Kategori' }}
                </p>
              </div>
            </div>

            <!-- Badges -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-if="app.sumber" class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                {{ app.sumber }}
              </span>
              <span v-if="app.subkategori_aplikasi" class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide truncate max-w-full">
                {{ app.subkategori_aplikasi.nama }}
              </span>
            </div>
          </div>

          <!-- Hover State (Navy Overlay, Description, Button) -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#071840] to-[#0a2463] p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p class="text-white/90 text-sm line-clamp-3 mb-4 text-center flex-1 flex items-center justify-center leading-relaxed">
              {{ app.deskripsi || 'Tidak ada deskripsi tersedia.' }}
            </p>
            <div class="mt-auto flex flex-col gap-2">
              <a
                v-if="app.link"
                :href="app.link"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center bg-[#e8a020] hover:bg-white text-[#071840] font-bold px-4 py-2 rounded-xl transition-all border-2 border-transparent hover:border-[#e8a020] flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                Website
              </a>
              <a
                v-if="app.url_playstore"
                :href="app.url_playstore"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center bg-white hover:bg-gray-100 text-[#071840] font-bold px-4 py-2 rounded-xl transition-all border-2 border-transparent flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                Play Store
              </a>
              <a
                v-if="app.url_appstore"
                :href="app.url_appstore"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center bg-black hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-xl transition-all border-2 border-transparent flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                App Store
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="!aplikasiStore.loading && aplikasiStore.pagination.lastPage > 1" class="flex justify-center items-center mt-12 gap-2">
        <button 
          @click="loadData(aplikasiStore.pagination.currentPage - 1)" 
          :disabled="aplikasiStore.pagination.currentPage === 1"
          class="px-4 py-2 rounded-lg font-medium transition-colors border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sebelumnya
        </button>
        
        <div class="flex gap-1 mx-2">
          <button 
            v-for="page in aplikasiStore.pagination.lastPage" 
            :key="page"
            @click="loadData(page)"
            class="w-10 h-10 rounded-lg font-medium transition-colors flex items-center justify-center"
            :class="page === aplikasiStore.pagination.currentPage ? 'bg-[#0a2463] text-white' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'"
          >
            {{ page }}
          </button>
        </div>

        <button 
          @click="loadData(aplikasiStore.pagination.currentPage + 1)" 
          :disabled="aplikasiStore.pagination.currentPage === aplikasiStore.pagination.lastPage"
          class="px-4 py-2 rounded-lg font-medium transition-colors border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Selanjutnya
        </button>
      </div>

      <!-- Empty state -->
      <div v-else-if="!aplikasiStore.loading && !aplikasiStore.error && aplikasiStore.aplikasis.length === 0" class="page-loading-placeholder">
        Tidak ada data aplikasi ditemukan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAplikasiStore } from '../stores/aplikasi'
import PageHeader2 from '../components/PageHeader2.vue'

const aplikasiStore = useAplikasiStore()

const selectedSumber = ref('')
const selectedKategori = ref('')
const selectedSubkategori = ref('')
const searchQuery = ref('')

const activeSubkategoris = computed(() => {
  if (!selectedKategori.value) return []
  const kat = aplikasiStore.kategoriList.find(k => k.id === selectedKategori.value)
  return kat ? kat.subkategori_aplikasi : []
})

const onKategoriChange = () => {
  selectedSubkategori.value = '' // reset
  loadData(1)
}

const loadData = (page = 1) => {
  const params = { page }
  if (selectedKategori.value) params.kategori_aplikasi_id = selectedKategori.value
  if (selectedSubkategori.value) params.subkategori_aplikasi_id = selectedSubkategori.value
  if (selectedSumber.value) params.sumber = selectedSumber.value
  if (searchQuery.value) params.search = searchQuery.value
  aplikasiStore.fetchAplikasis(params)
}

onMounted(async () => {
  await aplikasiStore.fetchKategori()
  loadData(1)
})
</script>
