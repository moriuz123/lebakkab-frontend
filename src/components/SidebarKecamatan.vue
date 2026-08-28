<template>
  <aside class="hidden lg:block">
    <div class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden mb-6">
      <!-- Header -->
      <div class="px-5 py-4 bg-gradient-to-r from-[#0a2463] to-[#1e5ca8]">
        <h2 class="text-sm font-bold text-white flex items-center gap-2">
          <Icon name="lucide:map" class="w-4 h-4 opacity-80" />
          Daftar Kecamatan
        </h2>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="px-5 py-6 text-center">
        <div class="text-gray-400 text-sm">Memuat data...</div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="px-5 py-4 text-red-500 text-sm">{{ error }}</div>

      <!-- List Kecamatan -->
      <ul v-else class="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
        <li v-for="item in kecamatans" :key="item.slug">
          <router-link
            :to="`/kecamatan/${item.slug}`"
            class="flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition-colors group"
            active-class="bg-blue-50 border-l-4 border-[#1e5ca8]"
          >
            <!-- Avatar Inisial -->
            <div class="shrink-0 w-8 h-8 rounded-lg bg-blue-100 text-[#1e5ca8] flex items-center justify-center text-xs font-bold">
              {{ item.nama?.charAt(0) || 'K' }}
            </div>
            <!-- Nama -->
            <span class="text-xs text-gray-700 group-hover:text-[#1e5ca8] font-medium leading-snug line-clamp-2">
              {{ item.nama }}
            </span>
          </router-link>
        </li>
      </ul>

      <!-- Footer link -->
      <div class="px-5 py-3 border-t border-gray-100 bg-gray-50">
        <router-link
          to="/kecamatan"
          class="text-xs text-[#1e5ca8] font-semibold hover:underline flex items-center gap-1"
        >
          <Icon name="lucide:list" class="w-3.5 h-3.5" />
          Lihat semua kecamatan
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { onMounted } from 'vue'
import { useKecamatanStore } from '@/stores/kecamatan'
import { storeToRefs } from 'pinia'

defineProps({
  activeSlug: {
    type: String,
    default: '',
  },
})

const kecamatanStore = useKecamatanStore()
const { kecamatans, loading, error } = storeToRefs(kecamatanStore)

onMounted(() => {
  if (!kecamatans.value.length) kecamatanStore.fetchKecamatan()
})
</script>
