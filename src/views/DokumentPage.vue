<template>
  <div class="bg-gray-50/50 min-h-screen pb-20">
    <PageHeader title="Daftar Dokumen" subtitle="Pusat unduhan dan publikasi dokumen resmi" />

    <section class="max-w-5xl mx-auto px-4 py-8">
      
      <!-- Filter & Search Bar -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:w-1/2">
          <Search class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama dokumen..."
            class="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-gray-800 font-medium outline-none transition-all placeholder-gray-400"
          />
        </div>
        <div class="relative w-full md:w-1/3 shrink-0">
          <Folder class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <select 
            v-model="selectedCategory" 
            class="w-full pl-11 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-gray-800 font-bold outline-none appearance-none transition-all cursor-pointer"
          >
            <option value="">Semua Kategori</option>
            <option v-for="(kategori, index) in kategoriList" :key="index" :value="kategori">
              {{ kategori }}
            </option>
          </select>
          <ChevronDown class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="dokumentStore.loading" class="space-y-4">
        <div v-for="i in 4" :key="i" class="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="dokumentStore.error" class="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 shadow-sm flex flex-col items-center justify-center">
         <AlertCircle class="w-12 h-12 mb-3 opacity-50" />
         <span class="font-bold text-lg">{{ dokumentStore.error }}</span>
      </div>

      <!-- Document List -->
      <div v-else class="space-y-4">
        <div 
          v-for="dokument in filteredDokument" 
          :key="dokument.id"
          class="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
        >
          <div class="flex items-start sm:items-center gap-4">
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <FileText class="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 class="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors leading-tight mb-1.5">{{ dokument.judul }}</h3>
              <div class="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
                <span class="bg-gray-100 px-2.5 py-1 rounded-md text-gray-600 border border-gray-200/60 flex items-center gap-1.5 font-bold">
                  <FolderOpen class="w-3.5 h-3.5"/> {{ dokument.kategori.nama }}
                </span>
                <span class="flex items-center gap-1.5"><Calendar class="w-3.5 h-3.5"/> {{ formatDate(dokument.created_at) }}</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-2 pl-16 sm:pl-0 shrink-0">
            <button 
              @click="openFlipbook(dokument)"
              class="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-4 py-2 sm:p-2.5 sm:px-4 rounded-xl transition-colors w-full sm:w-auto justify-center"
            >
              <Eye class="w-4 h-4" />
              <span class="sm:hidden lg:block">Lihat</span>
            </button>
            <a 
              :href="getFileUrl(dokument.file_path)"
              :download="dokument.judul + '.pdf'"
              class="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 hover:bg-green-600 hover:text-white px-4 py-2 sm:p-2.5 sm:px-4 rounded-xl transition-colors w-full sm:w-auto justify-center"
            >
              <Download class="w-4 h-4" />
              <span class="sm:hidden lg:block">Unduh</span>
            </a>
          </div>
        </div>

        <div v-if="filteredDokument.length === 0" class="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <FileSearch class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-800">Dokumen Tidak Ditemukan</h3>
          <p class="text-gray-500 mt-2">Coba ubah kata kunci atau kategori pencarian Anda.</p>
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
import { ref, computed, onMounted } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import { useDokumentStore } from '@/stores/dokument'
import { formatDate, getStorageUrl } from '@/utils/helpers'
import { Search, Folder, ChevronDown, FileText, Calendar, Eye, Download, FileSearch, X, FolderOpen, AlertCircle } from 'lucide-vue-next'
import VuePdfApp from 'vue3-pdf-app'
import 'vue3-pdf-app/dist/icons/main.css'

const dokumentStore = useDokumentStore()
const searchQuery = ref('')
const selectedCategory = ref('')
const showFlipbook = ref(false)
const selectedFileUrl = ref(null)

onMounted(() => {
  dokumentStore.fetchDokuments()
})

const filteredDokument = computed(() => {
  return dokumentStore.dokuments.filter((item) => {
    const matchCategory = selectedCategory.value
      ? item.kategori.nama === selectedCategory.value
      : true
    const matchSearch = item.judul.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const kategoriList = computed(() => {
  return [...new Set(dokumentStore.dokuments.map((item) => item.kategori.nama))]
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
