<template>
  <aside class="sidebar-news space-y-6">
    <!-- Banner -->
    <section class="sidebar-section">
      <BannerSlider />
    </section>

    <!-- Pengumuman Terbaru -->
    <section class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Pengumuman Terbaru</h3>
      <ul class="space-y-2">
        <li v-for="item in latestPengumuman" :key="item.id" class="group flex gap-4 items-start p-3 -mx-3 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
          <!-- Thumbnail (default jika kosong) -->
          <div class="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img
              :src="item.gambar ? $storageUrl(item.gambar) : '/images/default-pengumuman.jpg'"
              alt="Thumbnail"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <!-- Judul & Tanggal -->
          <div class="flex-1 min-w-0 py-1">
            <router-link
              :to="`/pengumuman/${item.slug}`"
              class="block font-bold text-gray-800 group-hover:text-[#1e5ca8] transition-colors leading-snug text-sm line-clamp-2 mb-2"
            >
              {{ item.judul }}
            </router-link>
            <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-[#e8a020]"></span>
              {{ formatDate(item.tanggal) }}
            </div>
          </div>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/api'
import { formatDate } from '@/utils/helpers'
import BannerSlider from './BannerSlider.vue'

const latestPengumuman = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/pengumuman?sort=latest&limit=5')
    latestPengumuman.value = res.data.data || []
  } catch (err) {
    console.error('Gagal memuat sidebar pengumuman:', err)
  }
})
</script>
