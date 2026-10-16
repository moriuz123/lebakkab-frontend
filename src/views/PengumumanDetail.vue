<template>
  <div>
    <PageHeader2
      title="Pengumuman Daerah"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Pengumuman', link: '/pengumuman' },
        { label: pengumuman?.judul || 'Detail', link: '#' },
      ]"
    />

    <!-- Wrapper (global layout dari main.css, sama dengan layanan) -->
    <div class="page-container">
      <!-- Error -->
      <div v-if="error" class="page-main">
        <div class="page-content">
          <p class="text-red-600">Terjadi kesalahan: {{ error }}</p>
          <p class="text-sm text-gray-600">Silakan refresh halaman atau periksa koneksi/server.</p>
        </div>
      </div>

      <!-- Konten Utama -->
      <div v-else-if="!loading && pengumuman" class="page-main">
        <article class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 md:p-10 mb-8">
          
          <!-- Judul & Meta -->
          <div class="mb-8 border-b border-gray-100 pb-8">
            <h1 class="text-2xl md:text-[28px] font-extrabold text-gray-900 leading-snug mb-5">
              {{ pengumuman.judul }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
              <div class="flex items-center gap-2">
                <Icon name="lucide:calendar" class="w-4 h-4 text-[#e8a020]" />
                <span class="text-gray-400">Diterbitkan:</span>
                {{ formatDate(pengumuman.created_at, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
              <div v-if="pengumuman.tgl_pelaksanaan" class="flex items-center gap-2 bg-blue-50 text-[#1e5ca8] px-3 py-1 rounded-md border border-blue-100">
                <Icon name="lucide:calendar-days" class="w-4 h-4 text-[#1e5ca8]" />
                <span class="font-bold">Pelaksanaan:</span>
                {{ formatDate(pengumuman.tgl_pelaksanaan, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
            </div>
          </div>

          <!-- Thumbnail -->
          <div v-if="pengumuman.gambar" class="relative rounded-2xl overflow-hidden mb-10 shadow-sm group">
            <img 
              :src="thumbnailSrc" 
              alt="Thumbnail Pengumuman" 
              class="w-full aspect-[16/9] md:aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
          </div>

          <!-- Isi Konten Pengumuman -->
          <div v-html="pengumuman.isi" class="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-[#1e5ca8] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"></div>

          <!-- Dokumen Lampiran Section -->
          <div v-if="pengumuman.file_lampiran" class="mt-12 pt-8 border-t border-gray-100">
            <div class="flex items-center gap-2.5 mb-5">
              <div class="w-9 h-9 rounded-xl bg-amber-50 text-[#e8a020] flex items-center justify-center shadow-xs">
                <Icon name="lucide:paperclip" class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-xl font-black text-gray-900 tracking-tight">Dokumen Lampiran</h2>
                <p class="text-xs text-gray-500 font-medium">Dokumen atau berkas pendukung resmi pengumuman ini</p>
              </div>
            </div>

            <!-- Card Lampiran -->
            <div class="bg-gradient-to-r from-blue-50/80 via-slate-50 to-white rounded-2xl p-5 sm:p-6 border border-blue-100/80 shadow-sm">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div class="flex items-start sm:items-center gap-4 min-w-0">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1e5ca8] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon :name="getFileIcon(pengumuman.file_lampiran)" class="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span class="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-white text-[#1e5ca8] border border-blue-200/80 shadow-2xs">
                        {{ getFileExtension(pengumuman.file_lampiran) }}
                      </span>
                      <span class="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <Icon name="lucide:shield-check" class="w-3.5 h-3.5 text-emerald-600" />
                        Dokumen Resmi
                      </span>
                    </div>
                    <h4 class="font-bold text-gray-900 text-sm sm:text-base leading-snug break-all" :title="getFileName(pengumuman.file_lampiran)">
                      {{ getFileName(pengumuman.file_lampiran) }}
                    </h4>
                    <!-- Tautan Link Dokumen -->
                    <div class="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                      <span class="font-medium shrink-0">Tautan:</span>
                      <a
                        :href="lampiranUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-[#1e5ca8] hover:text-[#0a2463] hover:underline font-semibold flex items-center gap-1 truncate max-w-xs sm:max-w-md"
                        title="Buka tautan dokumen"
                      >
                        <span class="truncate">{{ lampiranUrl }}</span>
                        <Icon name="lucide:external-link" class="w-3 h-3 shrink-0 opacity-70" />
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap items-center gap-2.5 sm:shrink-0 pt-2 sm:pt-0">
                  <!-- Buka Link / Tab Baru -->
                  <a
                    :href="lampiranUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 transition-all shadow-xs"
                    title="Buka dokumen di tab baru"
                  >
                    <Icon name="lucide:external-link" class="w-4 h-4 text-gray-500" />
                    <span>Buka Tautan</span>
                  </a>

                  <!-- Toggle Preview jika PDF -->
                  <button
                    v-if="isPdf(pengumuman.file_lampiran)"
                    type="button"
                    @click="showPdfPreview = !showPdfPreview"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#1e5ca8] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all shadow-xs"
                  >
                    <Icon :name="showPdfPreview ? 'lucide:eye-off' : 'lucide:eye'" class="w-4 h-4" />
                    <span>{{ showPdfPreview ? 'Tutup Pratinjau' : 'Lihat Pratinjau' }}</span>
                  </button>

                  <!-- Unduh Dokumen -->
                  <a
                    :href="lampiranUrl"
                    :download="getFileName(pengumuman.file_lampiran)"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1e5ca8] to-[#0a2463] hover:from-[#174885] hover:to-[#071840] shadow-md hover:shadow-lg transition-all"
                    title="Unduh dokumen lampiran"
                  >
                    <Icon name="lucide:download" class="w-4 h-4 text-[#e8a020]" />
                    <span>Unduh Dokumen</span>
                  </a>
                </div>
              </div>

              <!-- PDF Viewer (Embedded Preview) -->
              <div v-if="isPdf(pengumuman.file_lampiran) && showPdfPreview" class="mt-6 pt-6 border-t border-blue-100/60">
                <div class="h-[600px] sm:h-[700px] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100 relative">
                  <VuePdfApp
                    :pdf="lampiranUrl"
                    class="w-full h-full absolute inset-0"
                    theme="light"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Sidebar -->
      <aside class="page-sidebar" v-if="!loading && !error">
        <!-- Widget Unduh Lampiran jika ada di Sidebar -->
        <div v-if="pengumuman?.file_lampiran" class="bg-gradient-to-br from-[#0a2463] to-[#1e5ca8] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group mb-6">
          <div class="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
          <div class="flex items-center gap-2 mb-3 relative z-10">
            <div class="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Icon name="lucide:paperclip" class="w-4 h-4 text-[#e8a020]" />
            </div>
            <span class="text-xs font-bold uppercase tracking-wider text-amber-300">File Tersedia</span>
          </div>
          <h3 class="text-lg font-bold mb-1.5 relative z-10 leading-snug">Lampiran Dokumen</h3>
          <p class="text-blue-100 text-xs mb-4 relative z-10 leading-relaxed truncate" :title="getFileName(pengumuman.file_lampiran)">
            {{ getFileName(pengumuman.file_lampiran) }}
          </p>
          <div class="space-y-2 relative z-10">
            <a
              :href="lampiranUrl"
              :download="getFileName(pengumuman.file_lampiran)"
              class="flex items-center justify-center gap-2 w-full bg-[#e8a020] hover:bg-[#d49015] text-[#0a2463] font-black py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
            >
              <Icon name="lucide:download" class="w-4 h-4" />
              Unduh Dokumen
            </a>
            <a
              :href="lampiranUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full bg-white/15 hover:bg-white/25 text-white font-bold py-2.5 px-4 rounded-xl transition-all text-xs border border-white/20"
            >
              <Icon name="lucide:external-link" class="w-3.5 h-3.5 text-amber-200" />
              Buka Tautan Dokumen
            </a>
          </div>
        </div>

        <SidebarPengumuman />
      </aside>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="page-loading-placeholder">Memuat detail pengumuman...</div>

    <!-- Not Found -->
    <div v-if="!loading && !pengumuman && !error" class="page-loading-placeholder">
      Pengumuman tidak ditemukan.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/api'
import { formatDate, getStorageUrl } from '@/utils/helpers'
import { useSeo } from '@/composables/useSeo'

import PageHeader2 from '@/components/PageHeader2.vue'
import SidebarPengumuman from '@/components/SidebarPengumuman.vue'
import VuePdfApp from 'vue3-pdf-app'
import 'vue3-pdf-app/dist/icons/main.css'

const route = useRoute()
const loading = ref(true)
const pengumuman = ref(null)
const error = ref(null)
const showPdfPreview = ref(true)

useSeo({
  title: computed(() => pengumuman.value?.judul ? `${pengumuman.value.judul} - Pengumuman Resmi` : 'Pengumuman'),
  description: computed(() => {
    if (!pengumuman.value?.isi) return 'Pengumuman resmi Pemerintah Kabupaten Lebak.'
    return pengumuman.value.isi.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 160).trim() + '...'
  }),
  image: computed(() => pengumuman.value?.gambar ? getStorageUrl(pengumuman.value.gambar) : '/images/logo.png'),
  url: computed(() => `https://lebakkab.go.id/pengumuman/${route.params.slug}`),
  type: 'article',
  publishedTime: computed(() => pengumuman.value?.created_at || null),
})

// Fetch detail pengumuman
const fetchDetail = async (slug) => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`/api/pengumuman/${slug}`)
    pengumuman.value = res.data.data
  } catch (err) {
    error.value = 'Gagal memuat detail pengumuman.'
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchDetail(route.params.slug))

watch(
  () => route.params.slug,
  (slug) => fetchDetail(slug),
)

const thumbnailSrc = computed(() => {
  return pengumuman.value?.gambar
    ? getStorageUrl(pengumuman.value.gambar)
    : '/images/default-pengumuman.jpg'
})

const lampiranUrl = computed(() => {
  if (!pengumuman.value?.file_lampiran) return ''
  return getStorageUrl(pengumuman.value.file_lampiran)
})

const getFileName = (path) => {
  if (!path) return 'Dokumen-Lampiran'
  const cleanPath = path.split('?')[0]
  const parts = cleanPath.split('/')
  const raw = parts[parts.length - 1]
  return decodeURIComponent(raw) || 'Dokumen-Lampiran'
}

const getFileExtension = (path) => {
  if (!path) return 'FILE'
  const cleanPath = path.split('?')[0]
  const ext = cleanPath.split('.').pop()
  return ext ? ext.toUpperCase() : 'FILE'
}

const isPdf = (path) => {
  if (!path) return false
  return path.toLowerCase().split('?')[0].endsWith('.pdf')
}

const getFileIcon = (path) => {
  const ext = getFileExtension(path).toLowerCase()
  if (ext === 'pdf') return 'lucide:file-text'
  if (['doc', 'docx'].includes(ext)) return 'lucide:file-code'
  if (['xls', 'xlsx'].includes(ext)) return 'lucide:file-spreadsheet'
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'lucide:file-archive'
  if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(ext)) return 'lucide:file-image'
  return 'lucide:file-down'
}
</script>
