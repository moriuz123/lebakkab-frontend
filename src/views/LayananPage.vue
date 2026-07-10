<template>
  <div>
    <!-- Page Header -->
    <PageHeader title="Layanan" />

    <div class="max-w-7xl mx-auto px-4 py-10">
      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-500 text-lg">Loading...</div>

      <!-- Data Layanan -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in layanan"
          :key="item.slug"
          class="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex flex-col"
        >
          <!-- Cover -->
          <img
            v-if="item.cover"
            :src="item.cover"
            alt="Cover"
            class="w-full h-40 object-cover rounded-xl mb-4"
          />

          <!-- Judul -->
          <h3 class="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {{ item.judul }}
          </h3>
          
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-if="item.jenis" class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {{ item.jenis }}
            </span>
            <span v-if="item.kategori_layanan" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              {{ item.kategori_layanan.nama }}
            </span>
          </div>

          <!-- Kontak -->
          <p class="text-gray-600 text-sm mb-1">
            <span class="font-medium">Kontak:</span> {{ item.kontak || '-' }}
          </p>

          <!-- Unit Pelaksana -->
          <p class="text-gray-600 text-sm mb-4">
            <span class="font-medium">Unit Pelaksana:</span> {{ item.unit_pelaksana || '-' }}
          </p>

          <!-- Tombol Detail -->
          <router-link
            :to="{ name: 'LayananDetail', params: { slug: item.slug } }"
            class="mt-auto inline-block text-center bg-green-600 hover:bg-green-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Lihat Detail
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLayananStore } from '@/stores/layanan'
import { storeToRefs } from 'pinia'
import PageHeader from '@/components/PageHeader.vue'

const store = useLayananStore()
const { layanan, loading } = storeToRefs(store)

// Ambil data saat halaman dibuka
onMounted(async () => {
  await store.fetchLayanan()
})
</script>
