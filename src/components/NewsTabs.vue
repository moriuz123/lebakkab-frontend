<template>
  <div class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6">
    <!-- 🔹 Tabs Header -->
    <div class="flex bg-gray-100 rounded-xl p-1.5 mb-6">
      <button
        class="flex-1 py-2.5 text-center font-bold text-sm rounded-lg transition-all duration-300"
        :class="activeTab === 'latest' ? 'bg-white text-[#1e5ca8] shadow-sm' : 'text-gray-500 hover:text-gray-700'"
        @click="activeTab = 'latest'"
      >
        Terbaru
      </button>
      <button
        class="flex-1 py-2.5 text-center font-bold text-sm rounded-lg transition-all duration-300"
        :class="activeTab === 'popular' ? 'bg-white text-[#1e5ca8] shadow-sm' : 'text-gray-500 hover:text-gray-700'"
        @click="activeTab = 'popular'"
      >
        Terpopuler
      </button>
    </div>

    <!-- 🔹 Loading -->
    <div v-if="store.loading" class="text-center py-8 text-gray-400 text-sm font-medium">Memuat berita...</div>

    <!-- 🔹 Daftar Berita -->
    <ul v-else class="space-y-2">
      <li
        v-for="item in displayedNews"
        :key="item.id"
        class="group flex gap-4 items-start p-3 -mx-3 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300"
      >
        <!-- Thumbnail -->
        <div class="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <img
            :src="resolveThumbnail(item.thumbnail)"
            alt="thumbnail"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <!-- Judul dan Tanggal -->
        <div class="flex-1 min-w-0 py-1">
          <RouterLink
            :to="`/berita/${item.slug}`"
            class="block font-bold text-gray-800 group-hover:text-[#1e5ca8] transition-colors leading-snug text-sm line-clamp-2 mb-2"
          >
            {{ item.judul }}
          </RouterLink>
          <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <Calendar class="w-3.5 h-3.5 text-gray-400" />
            {{ formatDate(item.tanggal_publish) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBeritaStore } from '@/stores/useBeritaStore'
import { formatDate, getStorageUrl } from '@/utils/helpers'
import { Calendar } from 'lucide-vue-next'

const store = useBeritaStore()
const activeTab = ref('latest')

// ✅ Fungsi untuk memastikan path thumbnail benar
const resolveThumbnail = (img) => {
  if (!img) return '/images/default-thumbnail.jpg'
  return getStorageUrl(img)
}

// ✅ Tentukan daftar berita aktif
const displayedNews = computed(() => (activeTab.value === 'latest' ? store.latest : store.popular))

// ✅ Ambil data hanya sekali saat pertama kali
onMounted(async () => {
  if (store.latest.length === 0) await store.fetchLatest()
  if (store.popular.length === 0) await store.fetchPopular()
})
</script>
