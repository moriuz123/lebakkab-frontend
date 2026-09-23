<template>
  <aside class="space-y-6">
    <BannerSlider />
    
    <section class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 mb-6">
      <h3 class="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Kategori Aplikasi</h3>

      <div v-if="kategoriList.length === 0" class="text-gray-400 text-sm font-medium">Memuat kategori...</div>

      <div class="space-y-2">
        <div v-for="kat in kategoriList" :key="kat.id" class="group flex items-center p-3 -mx-3 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300">
          <div class="w-2 h-2 rounded-full bg-[#1e5ca8] mr-3 group-hover:scale-150 transition-transform"></div>
          
          <router-link
            :to="{ path: '/aplikasi', query: { kategori: kat.id } }"
            class="flex-1 block font-bold text-gray-800 group-hover:text-[#1e5ca8] transition-colors leading-snug text-sm"
          >
            {{ kat.nama }}
          </router-link>
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/api'
import BannerSlider from './BannerSlider.vue'

const kategoriList = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/api/kategori-aplikasi')
    if (response.data && response.data.status === 'success') {
      kategoriList.value = response.data.data
    }
  } catch (err) {
    console.error('Gagal memuat kategori:', err)
  }
})
</script>
