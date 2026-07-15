<template>
  <div class="group bg-white border border-gray-100 border-t-4 border-t-[#e8a020] rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
    <!-- Thumbnail -->
    <div class="relative w-full aspect-video overflow-hidden bg-gray-100">
      <img
        v-if="thumbnail"
        :src="resolveThumbnail(thumbnail)"
        :alt="judul || 'Thumbnail Berita'"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <!-- Kategori Badge Overlay -->
      <div v-if="kategori" class="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
        {{ kategori }}
      </div>
    </div>

    <!-- Konten -->
    <div class="flex flex-col flex-1 p-5 sm:p-6">
      <!-- Tanggal -->
      <div class="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{{ formatTanggal(tanggal) }}</span>
      </div>

      <!-- Judul -->
      <h2 class="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
        <router-link
          :to="`/berita/${slug}`"
          class="focus:outline-none"
        >
          <span class="absolute inset-0" aria-hidden="true"></span>
          {{ judul }}
        </router-link>
      </h2>

      <!-- Excerpt -->
      <p v-if="excerpt" class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
        {{ excerpt }}
      </p>

      <!-- Baca Selengkapnya -->
      <div class="mt-auto flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
        Baca Selengkapnya
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate, getStorageUrl } from '@/utils/helpers'

const props = defineProps({
  judul: String,
  slug: String,
  thumbnail: String,
  tanggal: String,
  kategori: String,
  excerpt: String,
})

/**
 * Resolusi thumbnail, fallback ke default
 */
const resolveThumbnail = (img) => {
  if (!img) return '/images/default-thumbnail.jpg'
  const fixedPath = decodeURIComponent(img)
  return getStorageUrl(fixedPath)
}

/**
 * Format tanggal aman
 */
const formatTanggal = (tgl) => {
  if (!tgl) return 'Tanggal tidak tersedia'
  const d = new Date(tgl)
  if (isNaN(d.getTime())) return 'Tanggal tidak tersedia'
  return formatDate(tgl, { month: 'long' })
}
</script>
