<template>
  <div>
    <PageHeader title="Data Kecamatan" />

    <div class="max-w-7xl mx-auto px-4 py-10">
      <div v-if="loading" class="page-loading-placeholder">Memuat data kecamatan...</div>

      <div v-if="error" class="text-center py-10 text-red-500">{{ error }}</div>

      <div v-if="!loading && !error" class="mb-8 flex flex-col items-center">
        <label class="text-gray-700 font-medium mb-2 text-center"> Cari Kecamatan </label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Masukkan nama kecamatan..."
          class="w-full sm:w-1/2 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-900"
        />
      </div>

      <div v-if="!loading && !error">
        <div v-if="paginatedKecamatan.length === 0" class="text-center py-10 text-gray-400">
          Kecamatan tidak ditemukan.
        </div>

        <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="(kecamatan, index) in paginatedKecamatan"
            :key="kecamatan.slug || index"
            class="relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg hover:border-[#1e5ca8] transition-all duration-300 p-4 flex flex-col"
          >
            <div class="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <img
                v-if="kecamatan.logo"
                :src="$storageUrl(kecamatan.logo)"
                alt="Logo Kecamatan"
                class="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-900 shadow-sm bg-white"
              />
              <div
                v-else
                class="h-12 w-12 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full ring-2 ring-emerald-900 text-[10px]"
              >
                No Logo
              </div>
            </div>

            <div class="pt-10 text-left">
              <h3 class="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                {{ kecamatan.nama }}
              </h3>

              <div class="text-xs text-gray-600 space-y-1">
                <p><strong>Telepon:</strong> {{ kecamatan.telepon || '-' }}</p>
                <p>
                  <strong>Website:</strong>
                  <a
                    v-if="kecamatan.website"
                    :href="kecamatan.website"
                    target="_blank"
                    class="text-[#e8a020] hover:underline break-all"
                  >
                    {{ kecamatan.website }}
                  </a>
                  <span v-else>-</span>
                </p>
                <p class="line-clamp-3">
                  <strong>Alamat:</strong> {{ kecamatan.alamat_kantor || '-' }}
                </p>
              </div>
            </div>

            <div class="mt-auto pt-4">
              <router-link
                :to="{ name: 'KecamatanDetail', params: { slug: kecamatan.slug || 'unknown' } }"
                class="block text-center text-white bg-[#0a2463] hover:bg-[#1e5ca8] text-sm py-2 rounded-lg transition"
              >
                Lihat Detail
              </router-link>
            </div>
          </div>
        </div>

        <PaginationNav
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="(page) => currentPage = page"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useKecamatanStore } from '@/stores/kecamatan'
import { onMounted, computed, ref, watch } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import PaginationNav from '@/components/PaginationNav.vue'

const kecamatanStore = useKecamatanStore()
const currentPage = ref(1)
const perPage = 8
const searchQuery = ref('')

// Fetch data kecamatan
onMounted(() => {
  kecamatanStore.fetchKecamatan()
})

const kecamatans = computed(() => kecamatanStore.kecamatans || [])
const loading = computed(() => kecamatanStore.loading)
const error = computed(() => kecamatanStore.error)

// Filter berdasarkan search
const filteredKecamatan = computed(() => {
  if (!searchQuery.value) return kecamatans.value
  return kecamatans.value.filter((k) =>
    k.nama && k.nama.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Pagination Aman (Minimal bernilai 1 halaman jika data kosong)
const totalPages = computed(() => {
  const pages = Math.ceil(filteredKecamatan.value.length / perPage)
  return pages < 1 ? 1 : pages
})

const paginatedKecamatan = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredKecamatan.value.slice(start, start + perPage)
})

// Reset halaman jika search berubah
watch(searchQuery, () => {
  currentPage.value = 1
})

// Functions previously used for old pagination removed
</script>