<template>
  <div class="bg-gray-50/50 min-h-screen pb-20">
    <PageHeader2 :title="`Dokumen - ${dokumentStore.kategori?.nama || 'Kategori'}`" subtitle="Daftar dokumen berdasarkan kategori terpilih" />

    <section class="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Bagian Kiri: Konten Utama -->
        <div class="lg:col-span-2">
          
          <div class="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center gap-4">
            <div class="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <Icon name="lucide:folder-open" class="w-6 h-6" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900 leading-tight">Kategori: {{ dokumentStore.kategori?.nama || 'Memuat...' }}</h2>
              <p class="text-sm text-gray-500 mt-0.5">Jelajahi dokumen di dalam kategori ini</p>
            </div>
          </div>

          <!-- Tambahan Kolom Pencarian -->
          <div class="mb-6">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="lucide:search" class="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Cari dokumen dalam kategori ini..." 
                class="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm"
              >
              <button 
                v-if="searchQuery" 
                @click="searchQuery = ''"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name="lucide:x" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div v-if="dokumentStore.loading" class="space-y-4">
            <div v-for="i in 4" :key="i" class="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>

          <div v-else-if="dokumentStore.error" class="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 shadow-sm flex flex-col items-center justify-center">
            <Icon name="lucide:alert-circle" class="w-12 h-12 mb-3 opacity-50" />
            <span class="font-bold text-lg">{{ dokumentStore.error }}</span>
          </div>

          <div v-else class="space-y-4">
            <div v-if="dokumentStore.dokuments.length === 0" class="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
              <Icon name="lucide:file-search" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-xl font-bold text-gray-800">Kategori Ini Kosong</h3>
              <p class="text-gray-500 mt-2">Belum ada dokumen yang diunggah untuk kategori ini.</p>
              <router-link to="/dokumen" class="mt-6 inline-block text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-colors">
                Kembali ke Semua Dokumen
              </router-link>
            </div>

            <div v-else-if="filteredDokuments.length === 0" class="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
              <Icon name="lucide:search-x" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-xl font-bold text-gray-800">Dokumen Tidak Ditemukan</h3>
              <p class="text-gray-500 mt-2">Pencarian untuk "<span class="font-bold">{{ searchQuery }}</span>" tidak membuahkan hasil.</p>
              <button @click="searchQuery = ''" class="mt-6 inline-block text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-colors">
                Hapus Pencarian
              </button>
            </div>

            <div 
              v-else
              v-for="doc in paginatedDokument" 
              :key="doc.id"
              class="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
                <div class="flex items-start sm:items-center gap-4">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon name="lucide:file-text" class="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <router-link :to="`/dokumen/${doc.slug}`">
                      <h3 class="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors leading-tight mb-1.5 cursor-pointer">{{ doc.judul }}</h3>
                    </router-link>
                    <div class="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      <span class="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        <Icon name="lucide:calendar" class="w-3.5 h-3.5"/> 
                        {{ formatDate(doc.created_at) }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center gap-2 pl-16 sm:pl-0 shrink-0 mt-4 sm:mt-0">
                  <router-link 
                    :to="`/dokumen/${doc.slug}`"
                    class="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-4 py-2 sm:p-2.5 sm:px-4 rounded-xl transition-colors w-full sm:w-auto justify-center"
                  >
                    <Icon name="lucide:eye" class="w-4 h-4" />
                    <span class="sm:hidden lg:block">Lihat Detail</span>
                  </router-link>
                  <a 
                    :href="getFileUrl(doc.file_path)"
                    :download="doc.judul + '.pdf'"
                    class="flex items-center gap-2 text-sm font-bold text-[#e8a020] bg-[#f8f9fc] hover:bg-[#0a2463] hover:text-white px-4 py-2 sm:p-2.5 sm:px-4 rounded-xl transition-colors w-full sm:w-auto justify-center"
                  >
                    <Icon name="lucide:download" class="w-4 h-4" />
                    <span class="sm:hidden lg:block">Unduh</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredDokuments.length === 0" class="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
              <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:file-search" class="w-10 h-10 text-gray-400" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Belum ada dokumen</h3>
              <p class="text-gray-500 max-w-sm mx-auto">Dokumen untuk kategori ini belum tersedia atau tidak ditemukan berdasarkan pencarian Anda.</p>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-8 border-t border-gray-100 pt-8">
              <PaginationNav 
                :currentPage="currentPage"
                :totalPages="totalPages"
                @update:page="currentPage = $event"
              />
            </div>
          </div>

          <!-- Bagian Kanan (Sama seperti DokumentPage) -->
          <div class="lg:w-[340px] shrink-0 space-y-6">
            <!-- Widget Pencarian -->
            <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100">
              <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="lucide:search" class="w-5 h-5 text-blue-500" />
                Cari Dokumen
              </h3>
              <div class="relative group">
                <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  v-model="searchQuery"
                  placeholder="Ketik kata kunci..." 
                  class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 block pl-11 pr-4 py-3.5 transition-all outline-none font-medium"
                >
              </div>
            </div>

            <!-- Widget 2: Pengumuman Terbaru -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 overflow-hidden relative group/widget">
              <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover/widget:opacity-100 transition-opacity duration-700"></div>

              <h3 class="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2 relative z-10">
                <div class="p-2 bg-blue-50 rounded-lg text-blue-600 shadow-sm border border-blue-100/50">
                  <Icon name="lucide:megaphone" class="w-5 h-5" />
                </div>
                Info & Pengumuman
              </h3>
              
              <div v-if="pengumumanStore.loading" class="animate-pulse space-y-4">
                <div v-for="i in 3" :key="i" class="h-12 bg-gray-50 rounded-xl"></div>
              </div>
              
              <div v-else class="space-y-4 relative z-10">
                <router-link
                  v-for="(item, index) in recentPengumuman"
                  :key="item.id"
                  :to="`/pengumuman/${item.slug}`"
                  class="group flex gap-3 items-start border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                >
                  <div class="mt-0.5 text-gray-300 group-hover:text-blue-500 transition-colors">
                    <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-2 leading-relaxed transition-colors">{{ item.judul }}</h4>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">{{ formatDate(item.created_at) }}</span>
                      <span v-if="index === 0" class="flex h-2 w-2 relative">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    </div>
                  </div>
                </router-link>
              </div>
              
              <router-link to="/pengumuman" class="relative z-10 flex items-center justify-center gap-2 w-full text-center text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white py-3 rounded-xl mt-5 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/20">
                Lihat Semua
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </router-link>
            </div>

            <!-- Widget 3: Pusat Informasi Banner -->
            <div class="rounded-2xl shadow-lg p-6 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 group-hover:scale-105 transition-transform duration-500"></div>
              
              <div class="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700">
                <Icon name="lucide:info" class="w-40 h-40" />
              </div>
              <div class="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
              
              <div class="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/30">
                    <Icon name="lucide:info" class="w-6 h-6 text-white" />
                  </div>
                  <h3 class="text-xl font-black mb-2 tracking-tight">Butuh Bantuan?</h3>
                  <p class="text-white/90 text-sm mb-6 leading-relaxed font-medium">
                    Kesulitan menemukan dokumen yang Anda cari? Hubungi layanan informasi kami.
                  </p>
                </div>
                
                <router-link to="/kontak" class="inline-flex items-center justify-center gap-2 bg-white text-blue-700 text-sm font-extrabold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Pusat Bantuan
                </router-link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useDokumentStore } from '@/stores/dokument'
import { usePengumumanStore } from '@/stores/pengumuman'
import { onMounted, ref, computed, watch } from 'vue'
import PageHeader2 from '@/components/PageHeader2.vue'
import PaginationNav from '@/components/PaginationNav.vue'
import { formatDate, getStorageUrl } from '@/utils/helpers'

const route = useRoute()
const dokumentStore = useDokumentStore()
const pengumumanStore = usePengumumanStore()

const searchQuery = ref('')

onMounted(() => {
  dokumentStore.fetchDokumentsByKategori(route.params.slug)
  pengumumanStore.fetchPengumuman()
})

const currentPage = ref(1)
const itemsPerPage = 8

const filteredDokuments = computed(() => {
  let docs = dokumentStore.dokuments || []
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    docs = docs.filter(doc => doc.judul.toLowerCase().includes(q))
  }
  return docs
})

const totalPages = computed(() => {
  return Math.ceil(filteredDokuments.value.length / itemsPerPage) || 1
})

const paginatedDokument = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredDokuments.value.slice(start, end)
})

watch(() => route.params.slug, () => {
  currentPage.value = 1
  searchQuery.value = ''
})

watch(searchQuery, () => {
  currentPage.value = 1
})

const recentPengumuman = computed(() => {
  return pengumumanStore.list.slice(0, 3)
})

function getFileUrl(filePath) {
  return getStorageUrl(filePath)
}
</script>

<style scoped>
</style>
