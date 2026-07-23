<template>
  <section>
    <!-- Page Header (full width) -->
    <PageHeader2 :title="pageTitle" subtitle="Kumpulan informasi dalam bentuk visual" />

    <!-- Konten dibatasi -->
    <div class="max-w-screen-xl mx-auto px-4 py-10">
      <div v-if="bannerStore.loading" class="page-loading-placeholder">Loading...</div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="item in bannerStore.banners"
          :key="item.id"
          class="relative group bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
        >
          <!-- Thumbnail -->
          <img
            :src="item.gambar_url"
            :alt="item.judul"
            class="w-full h-48 object-cover transform group-hover:scale-105 transition duration-500"
          />

          <!-- Overlay + Tombol Zoom -->
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <button
              @click="openPreview(item.gambar_url)"
              class="bg-white text-gray-700 rounded-full p-3 shadow-lg hover:bg-gray-200 transition"
            >
              🔍
            </button>
          </div>

          <!-- Judul -->
          <div class="p-3">
            <h3 class="text-sm font-semibold text-gray-700 text-center">
              {{ item.judul }}
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Preview -->
    <div
      v-if="previewImage"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div class="relative max-w-4xl w-full px-4">
        <button
          @click="previewImage = null"
          class="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
        >
          ✖
        </button>
        <img
          :src="previewImage"
          alt="Preview"
          class="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useBannerStore } from '@/stores/bannerStore'
import PageHeader2 from '@/components/PageHeader2.vue'
import { useRoute } from 'vue-router'

const bannerStore = useBannerStore()
const previewImage = ref(null)
const route = useRoute()

const slug = computed(() => route.params.slug || 'banner')
const pageTitle = computed(() => {
  return 'Banner ' + slug.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
})

const fetchBanners = () => {
  if (route.params.slug) {
    bannerStore.fetchByKategori(route.params.slug)
  }
}

onMounted(() => {
  fetchBanners()
})

watch(() => route.params.slug, () => {
  fetchBanners()
})

function openPreview(img) {
  previewImage.value = img
}
</script>
