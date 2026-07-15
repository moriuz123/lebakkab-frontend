<template>
  <div class="bg-gray-50/50 min-h-screen pb-20">
    <PageHeader2 :title="`Dokumen - ${dokumentStore.kategori?.nama || 'Kategori'}`" subtitle="Daftar dokumen berdasarkan kategori terpilih" />

    <section class="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Bagian Kiri: Konten Utama -->
        <div class="lg:col-span-2">
          
          <div class="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center gap-4">
            <div class="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <FolderOpen class="w-6 h-6" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900 leading-tight">Kategori: {{ dokumentStore.kategori?.nama || 'Memuat...' }}</h2>
              <p class="text-sm text-gray-500 mt-0.5">Jelajahi dokumen di dalam kategori ini</p>
            </div>
          </div>

          <div v-if="dokumentStore.loading" class="space-y-4">
            <div v-for="i in 4" :key="i" class="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>

          <div v-else-if="dokumentStore.error" class="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 shadow-sm flex flex-col items-center justify-center">
            <AlertCircle class="w-12 h-12 mb-3 opacity-50" />
            <span class="font-bold text-lg">{{ dokumentStore.error }}</span>
          </div>

          <div v-else class="space-y-4">
            <div v-if="dokumentStore.dokuments.length === 0" class="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
              <FileSearch class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-xl font-bold text-gray-800">Kategori Ini Kosong</h3>
              <p class="text-gray-500 mt-2">Belum ada dokumen yang diunggah untuk kategori ini.</p>
              <router-link to="/dokumen" class="mt-6 inline-block text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-colors">
                Kembali ke Semua Dokumen
              </router-link>
            </div>

            <div 
              v-else
              v-for="doc in paginatedDokument" 
              :key="doc.id"
              class="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div class="flex items-start sm:items-center gap-4">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <FileText class="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors leading-tight mb-1.5">{{ doc.judul }}</h3>
                  <div class="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                    <span v-if="doc.sumber" class="bg-gray-100 px-2.5 py-1 rounded-md text-gray-600 border border-gray-200/60 flex items-center gap-1.5 font-bold">
                      <Building2 class="w-3.5 h-3.5"/> {{ doc.sumber }}
                    </span>
                    <span class="flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5"/> {{ formatDate(doc.created_at) }}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center gap-2 pl-16 sm:pl-0 shrink-0">
                <button 
                  @click="openFlipbook(doc)"
                  class="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-4 py-2 sm:p-2.5 sm:px-4 rounded-xl transition-colors w-full sm:w-auto justify-center"
                >
                  <Eye class="w-4 h-4" />
                  <span class="sm:hidden lg:block">Lihat</span>
                </button>
                <a 
                  v-if="doc.file_path"
                  :href="getFileUrl(doc.file_path)"
                  :download="doc.judul + '.pdf'"
                  class="flex items-center gap-2 text-sm font-bold text-[#e8a020] bg-[#f8f9fc] hover:bg-[#0a2463] hover:text-white px-4 py-2 sm:p-2.5 sm:px-4 rounded-xl transition-colors w-full sm:w-auto justify-center"
                >
                  <Download class="w-4 h-4" />
                  <span class="sm:hidden lg:block">Unduh</span>
                </a>
              </div>
            </div>
            
            <PaginationNav
              v-if="totalPages > 1"
              :current-page="currentPage"
              :total-pages="totalPages"
              @update:page="(page) => currentPage = page"
            />
          </div>
        </div>

        <!-- Bagian Kanan: Sidebar Widget -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- Widget 1: Navigasi Cepat -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 sticky top-6 overflow-hidden relative group/widget">
            <h3 class="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2 relative z-10">
              <div class="p-2 bg-blue-50 rounded-lg text-blue-600 shadow-sm border border-blue-100/50">
                <Folder class="w-5 h-5" />
              </div>
              Menu Dokumen
            </h3>
            <div class="relative z-10 space-y-3">
              <router-link to="/dokumen" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-100 transition-all group/link">
                <ArrowRight class="w-4 h-4 text-gray-400 group-hover/link:text-blue-500 group-hover/link:translate-x-1 transition-all" />
                Kembali ke Semua Dokumen
              </router-link>
            </div>
          </div>

          <!-- Widget 2: Pengumuman Terbaru -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 overflow-hidden relative group/widget">
            <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover/widget:opacity-100 transition-opacity duration-700"></div>

            <h3 class="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2 relative z-10">
              <div class="p-2 bg-blue-50 rounded-lg text-blue-600 shadow-sm border border-blue-100/50">
                <Megaphone class="w-5 h-5" />
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
                  <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>

          <!-- Widget 3: Pusat Informasi Banner -->
          <div class="rounded-2xl shadow-lg p-6 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 group-hover:scale-105 transition-transform duration-500"></div>
            
            <div class="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700">
              <Info class="w-40 h-40" />
            </div>
            <div class="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
            
            <div class="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/30">
                  <Info class="w-6 h-6 text-white" />
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
    </section>

    <!-- Modal Flipbook -->
    <Transition name="modal">
      <div v-if="showFlipbook" class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:p-6">
        <div class="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" @click="closeFlipbook"></div>
        <div class="relative w-full max-w-5xl h-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 shrink-0">
            <h3 class="font-bold text-gray-900 truncate pr-4 flex items-center gap-2">
              <FileText class="w-5 h-5 text-red-500" />
              Preview Dokumen
            </h3>
            <button @click="closeFlipbook" class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors">
              <X class="w-5 h-5" />
            </button>
          </div>
          <div class="flex-1 w-full bg-gray-100 relative">
            <VuePdfApp :pdf="selectedFileUrl" class="w-full h-full absolute inset-0" theme="light" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useDokumentStore } from '@/stores/dokument'
import { usePengumumanStore } from '@/stores/pengumuman'
import { onMounted, ref, computed, watch } from 'vue'
import PageHeader2 from '@/components/PageHeader2.vue'
import PaginationNav from '@/components/PaginationNav.vue'
import VuePdfApp from 'vue3-pdf-app'
import 'vue3-pdf-app/dist/icons/main.css'
import { formatDate, getStorageUrl } from '@/utils/helpers'
import { FileText, Calendar, Eye, Download, FileSearch, X, Building2, AlertCircle, FolderOpen, Megaphone, ArrowRight, Info, Folder } from 'lucide-vue-next'

const route = useRoute()
const dokumentStore = useDokumentStore()
const pengumumanStore = usePengumumanStore()

const showFlipbook = ref(false)
const selectedFileUrl = ref(null)

onMounted(() => {
  dokumentStore.fetchDokumentsByKategori(route.params.slug)
  pengumumanStore.fetchPengumuman()
})

const currentPage = ref(1)
const itemsPerPage = 8

const totalPages = computed(() => {
  return Math.ceil(dokumentStore.dokuments.length / itemsPerPage) || 1
})

const paginatedDokument = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return dokumentStore.dokuments.slice(start, end)
})

watch(() => route.params.slug, () => {
  currentPage.value = 1
})

const recentPengumuman = computed(() => {
  return pengumumanStore.list.slice(0, 3)
})

function getFileUrl(filePath) {
  return getStorageUrl(filePath)
}

function openFlipbook(doc) {
  selectedFileUrl.value = getFileUrl(doc.file_path)
  showFlipbook.value = true
}

function closeFlipbook() {
  showFlipbook.value = false
  selectedFileUrl.value = null
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
