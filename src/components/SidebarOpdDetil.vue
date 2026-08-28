<template>
  <aside class="hidden lg:block">
    <div class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden mb-6">
      <!-- Header -->
      <div class="px-5 py-4 bg-gradient-to-r from-[#0a2463] to-[#1e5ca8]">
        <h2 class="text-sm font-bold text-white flex items-center gap-2">
          <Icon name="lucide:building-2" class="w-4 h-4 opacity-80" />
          Daftar OPD
        </h2>
      </div>

      <!-- Loading -->
      <div v-if="loadingList" class="px-5 py-6 text-center">
        <div class="text-gray-400 text-sm">Memuat data...</div>
      </div>

      <!-- Error -->
      <div v-else-if="errorList" class="px-5 py-4 text-red-500 text-sm">{{ errorList }}</div>

      <!-- List OPD -->
      <ul v-else class="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
        <li v-for="opd in opds" :key="opd.slug">
          <router-link
            :to="`/opd/${opd.slug}`"
            class="flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition-colors group"
            active-class="bg-blue-50 border-l-4 border-[#1e5ca8]"
          >
            <!-- Ikon / Logo -->
            <div class="shrink-0 w-8 h-8 rounded-lg overflow-hidden bg-blue-100 flex items-center justify-center">
              <img
                v-if="opd.logo"
                :src="$storageUrl(opd.logo)"
                :alt="opd.nama"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-[#1e5ca8] text-xs font-bold">
                {{ opd.singkatan?.charAt(0) || opd.nama.charAt(0) }}
              </span>
            </div>
            <!-- Nama -->
            <span class="text-xs text-gray-700 group-hover:text-[#1e5ca8] font-medium leading-snug line-clamp-2">
              {{ opd.nama }}
            </span>
          </router-link>
        </li>
      </ul>

      <!-- Footer link -->
      <div class="px-5 py-3 border-t border-gray-100 bg-gray-50">
        <router-link
          to="/opd"
          class="text-xs text-[#1e5ca8] font-semibold hover:underline flex items-center gap-1"
        >
          <Icon name="lucide:list" class="w-3.5 h-3.5" />
          Lihat semua OPD
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOpdStore } from '@/stores/opd'
import { storeToRefs } from 'pinia'

const opdStore = useOpdStore()
const { opds, loadingList, errorList } = storeToRefs(opdStore)

onMounted(() => {
  if (!opds.value || !opds.value.length) {
    opdStore.fetchOpds()
  }
})
</script>
