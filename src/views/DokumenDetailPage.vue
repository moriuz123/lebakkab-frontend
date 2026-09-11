<template>
  <div class="min-h-screen bg-gray-50/50">
    
    <PageHeader2 
      title="Detail Dokumen" 
      subtitle="Pratinjau dan informasi lengkap dokumen"
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Dokumen', link: '/dokumen' },
        { label: dokumen?.judul || 'Detail', link: '' }
      ]"
    />

    <section class="py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div v-if="dokumentStore.loading" class="animate-pulse space-y-8">
          <div class="h-8 bg-gray-200 rounded w-1/3"></div>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 h-[600px] bg-gray-200 rounded-2xl"></div>
            <div class="space-y-4">
              <div class="h-32 bg-gray-200 rounded-2xl"></div>
              <div class="h-32 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>

        <div v-else-if="dokumentStore.error || !dokumen" class="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
          <Icon name="lucide:file-question" class="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Dokumen Tidak Ditemukan</h2>
          <p class="text-gray-500 mb-6">{{ dokumentStore.error || 'Dokumen yang Anda cari mungkin telah dihapus atau tidak tersedia.' }}</p>
          <router-link to="/dokumen" class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            <Icon name="lucide:arrow-left" class="w-5 h-5" />
            Kembali ke Daftar Dokumen
          </router-link>
        </div>

        <div v-else>
          <!-- Header Judul -->
          <div class="mb-8">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{{ dokumen.judul }}</h1>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Kolom Kiri: Preview Dokumen -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col h-[600px] sm:h-[700px] lg:h-[800px] sticky top-6">
                <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:file-text" class="w-5 h-5 text-blue-600" />
                    <h3 class="font-bold text-gray-900">Preview Dokumen</h3>
                  </div>
                  <div class="flex gap-2">
                     <button @click="toggleFullscreen" class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Layar Penuh">
                      <Icon name="lucide:maximize" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div class="flex-1 w-full bg-gray-100 relative" ref="pdfContainer">
                  <VuePdfApp 
                    v-if="getFileUrl(dokumen.file_path)"
                    :pdf="getFileUrl(dokumen.file_path)" 
                    class="w-full h-full absolute inset-0" 
                    theme="light" 
                  />
                  <div v-else class="flex flex-col items-center justify-center h-full text-gray-400">
                    <Icon name="lucide:file-warning" class="w-16 h-16 mb-4 opacity-50" />
                    <p class="font-medium">File preview tidak tersedia</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Kolom Kanan: Metadata & Action -->
            <div class="lg:col-span-1 space-y-6">
              
              <!-- Card Download -->
              <div class="bg-gradient-to-br from-[#0a2463] to-[#1e5ca8] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                <div class="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <h3 class="text-xl font-bold mb-2 relative z-10">Unduh File Asli</h3>
                <p class="text-blue-100 text-sm mb-6 relative z-10 leading-relaxed">Simpan dokumen ini ke perangkat Anda untuk dibaca secara offline.</p>
                
                <a 
                  v-if="dokumen.file_path"
                  :href="getFileUrl(dokumen.file_path)"
                  :download="dokumen.judul + '.pdf'"
                  class="relative z-10 flex items-center justify-center gap-2 w-full bg-[#e8a020] hover:bg-[#d49015] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg hover:shadow-[#e8a020]/30 hover:-translate-y-0.5"
                >
                  <Icon name="lucide:download-cloud" class="w-5 h-5" />
                  Unduh Dokumen
                </a>
              </div>

              <!-- Card Metadata -->
              <div class="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100">
                <h3 class="font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <Icon name="lucide:info" class="w-5 h-5 text-blue-500" />
                  Informasi Dokumen
                </h3>
                
                <div class="space-y-4">
                  <div v-if="dokumen.kategoris && dokumen.kategoris.length > 0">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Kategori</p>
                    <div class="flex flex-wrap gap-2">
                      <router-link 
                        v-for="kat in dokumen.kategoris" 
                        :key="kat.id" 
                        :to="`/dokumen/kategori/${kat.slug}`"
                        class="bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <Icon name="lucide:folder" class="w-3.5 h-3.5" />
                        {{ kat.nama }}
                      </router-link>
                    </div>
                  </div>

                  <div>
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tanggal Diunggah</p>
                    <p class="text-gray-900 font-medium flex items-center gap-2">
                      <Icon name="lucide:calendar" class="w-4 h-4 text-gray-400" />
                      {{ formatDate(dokumen.created_at) }}
                    </p>
                  </div>

                  <div v-if="dokumen.sumber">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sumber Dokumen</p>
                    <p class="text-gray-900 font-medium flex items-center gap-2">
                      <Icon name="lucide:building-2" class="w-4 h-4 text-gray-400" />
                      {{ dokumen.sumber }}
                    </p>
                  </div>

                  <div v-if="dokumen.opd">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Instansi Pelaksana</p>
                    <p class="text-gray-900 font-medium flex items-center gap-2 leading-tight">
                      <Icon name="lucide:landmark" class="w-4 h-4 text-gray-400 shrink-0" />
                      {{ dokumen.opd.nama }}
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Back Button -->
              <router-link to="/dokumen" class="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-600 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm">
                <Icon name="lucide:arrow-left" class="w-4 h-4" />
                Kembali ke Daftar
              </router-link>

            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDokumentStore } from '@/stores/dokument'
import { formatDate, getStorageUrl } from '@/utils/helpers'
import PageHeader2 from '@/components/PageHeader2.vue'
import VuePdfApp from 'vue3-pdf-app'
import 'vue3-pdf-app/dist/icons/main.css'

const route = useRoute()
const dokumentStore = useDokumentStore()
const dokumen = ref(null)
const pdfContainer = ref(null)

onMounted(async () => {
  const slug = route.params.slug
  if (slug) {
    dokumen.value = await dokumentStore.fetchDokumenBySlug(slug)
  }
})

function getFileUrl(filePath) {
  if (!filePath) return null
  return getStorageUrl(filePath)
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    pdfContainer.value?.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
</script>

<style scoped>
/* Fullscreen styles for PDF container */
:fullscreen {
  background-color: white;
  width: 100vw;
  height: 100vh;
}
</style>
