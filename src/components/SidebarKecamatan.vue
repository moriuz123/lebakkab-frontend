<template>
  <div class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 mb-6">
    <h2 class="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Daftar Kecamatan</h2>

    <div v-if="loading" class="text-gray-400 text-sm font-medium">Memuat data...</div>

    <div v-else-if="error" class="text-red-500 text-sm font-medium">{{ error }}</div>

    <ul v-else class="space-y-1">
      <li
        v-for="item in kecamatans"
        :key="item.slug"
      >
        <router-link
          :to="`/kecamatan/${item.slug}`"
          class="group flex items-center p-3 -mx-3 rounded-2xl hover:bg-blue-50/50 transition-colors duration-300"
          active-class="bg-blue-50/50 text-[#1e5ca8]"
        >
          <div class="w-8 h-8 rounded-full bg-blue-50 text-[#1e5ca8] flex items-center justify-center mr-3 group-hover:bg-[#1e5ca8] group-hover:text-white transition-colors shadow-sm border border-blue-100/50">
            <span class="w-1.5 h-1.5 bg-current rounded-full"></span>
          </div>
          <span class="text-gray-700 group-hover:text-[#1e5ca8] font-semibold text-sm leading-snug">{{ item.nama }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useKecamatanStore } from '@/stores/kecamatan'
import { storeToRefs } from 'pinia'

const kecamatanStore = useKecamatanStore()
const { kecamatans, loading, error } = storeToRefs(kecamatanStore)

onMounted(() => {
  if (!kecamatans.value.length) kecamatanStore.fetchKecamatan()
})
</script>

