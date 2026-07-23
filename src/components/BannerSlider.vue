<template>
  <div v-if="banners.length" class="relative bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden group">
    <!-- Gambar Banner -->
    <div class="w-full aspect-square bg-gray-50">
      <img
        :src="banners[current].single_gambar"
        :alt="banners[current].judul || banners[current].title"
        class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
    </div>

    <!-- Gradient Overlay untuk tombol navigasi -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

    <!-- Tombol Navigasi -->
    <button
      class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#1e5ca8] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 pointer-events-auto"
      @click="prevSlide"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>
    <button
      class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#1e5ca8] p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 pointer-events-auto"
      @click="nextSlide"
    >
      <ChevronRight class="w-5 h-5" />
    </button>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from '@/utils/api'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const banners = ref([])
const current = ref(0)
let intervalId = null

onMounted(async () => {
  try {
    const res = await axios.get('/api/banner?kategori=ucapan&limit=5')
    const rawBanners = res.data || []
    banners.value = rawBanners.flatMap(b => {
      const urls = Array.isArray(b.gambar_url) ? b.gambar_url : (b.gambar_url ? [b.gambar_url] : [b.gambar])
      return urls.map(u => ({ ...b, single_gambar: u }))
    })
    startSlideshow()
  } catch (err) {
    console.error('Gagal ambil banner:', err)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const nextSlide = () => {
  current.value = (current.value + 1) % banners.value.length
}

const prevSlide = () => {
  current.value = (current.value - 1 + banners.value.length) % banners.value.length
}

const startSlideshow = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    nextSlide()
  }, 6000) // 6 detik biar lebih smooth
}
</script>
