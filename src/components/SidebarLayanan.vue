<template>
  <aside class="space-y-6">
    <!-- Layanan Terbaru -->
    <BannerSlider />
    <section class="sidebar-widget">
      <h3 class="sidebar-title">Layanan Terbaru</h3>

      <div v-if="layananList.length === 0" class="text-gray-500 text-sm">Tidak ada layanan.</div>

      <div v-for="item in layananList" :key="item.slug" class="flex gap-3 mb-4">
        <!-- Thumbnail -->
        <img
          :src="item.cover ? item.cover : '/images/default-layanan.jpg'"
          class="w-20 h-16 object-cover rounded"
          alt="thumb"
        />

        <div class="flex-1">
          <router-link
            :to="`/layanan/${item.slug}`"
            class="font-medium text-gray-800 hover:text-[#e8a020] line-clamp-2"
          >
            {{ item.judul }}
          </router-link>

          <p class="text-xs text-gray-500 mt-1">
            {{ formatDate(item.created_at) }}
          </p>
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
