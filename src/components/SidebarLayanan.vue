<template>
  <aside class="space-y-6">
    <!-- Layanan Terbaru -->
    <BannerSlider />
    <section class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Layanan Terbaru</h3>

      <div v-if="layananList.length === 0" class="text-gray-400 text-sm font-medium">Tidak ada layanan.</div>

      <div class="space-y-2">
        <div v-for="item in layananList" :key="item.slug" class="group flex gap-4 items-start p-3 -mx-3 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
          <!-- Thumbnail -->
          <div class="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img
              :src="item.cover ? item.cover : '/images/default-layanan.jpg'"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt="thumb"
            />
          </div>

          <div class="flex-1 min-w-0 py-1">
            <router-link
              :to="`/layanan/${item.slug}`"
              class="block font-bold text-gray-800 group-hover:text-[#1e5ca8] transition-colors leading-snug text-sm line-clamp-2 mb-2"
            >
              {{ item.judul }}
            </router-link>

            <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-[#e8a020]"></span>
              {{ formatDate(item.created_at) }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/api'
import { formatDate } from '@/utils/helpers'
import BannerSlider from './BannerSlider.vue'

const layananList = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/layanan?limit=5')
    const baseStorage = import.meta.env.VITE_STORAGE_BASE_URL || '/storage'
    
    layananList.value = (res.data || []).map(item => {
      if (item.cover && !item.cover.startsWith('http') && !item.cover.startsWith('/storage')) {
        item.cover = `${baseStorage}/${item.cover}`
      }
      return item
    })
  } catch (e) {
    console.error('Gagal memuat layanan terbaru:', e)
  }
})
</script>
