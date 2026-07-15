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
                <Calendar class="w-4 h-4 text-[#e8a020]" />
                <span class="text-gray-400">Diterbitkan:</span>
                {{ formatDate(pengumuman.created_at, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
              <div v-if="pengumuman.tgl_pelaksanaan" class="flex items-center gap-2 bg-blue-50 text-[#1e5ca8] px-3 py-1 rounded-md border border-blue-100">
                <CalendarDays class="w-4 h-4 text-[#1e5ca8]" />
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

          <!-- Isi -->
          <div v-html="pengumuman.isi" class="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-[#1e5ca8] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"></div>
        </article>
      </div>

      <!-- Sidebar -->
      <aside class="page-sidebar" v-if="!loading && !error">
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
import { Calendar, CalendarDays } from 'lucide-vue-next'

import PageHeader2 from '@/components/PageHeader2.vue'
import SidebarPengumuman from '@/components/SidebarPengumuman.vue'

const route = useRoute()
const loading = ref(true)
const pengumuman = ref(null)
const error = ref(null)

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
</script>
