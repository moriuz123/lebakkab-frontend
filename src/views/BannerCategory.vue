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
          <!-- Thumbnail Slider -->
          <div class="w-full h-48 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar relative group-hover:opacity-90">
            <img
              v-for="(imgUrl, idx) in (Array.isArray(item.gambar_url) ? item.gambar_url : [item.gambar_url])"
              :key="idx"
              :src="imgUrl"
              :alt="item.judul"
              class="w-full flex-shrink-0 h-48 object-cover snap-center transition duration-500"
            />
          </div>

          <!-- Overlay + Tombol Zoom -->
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition pointer-events-none"
          >
            <button
              @click="openPreview(Array.isArray(item.gambar_url) ? item.gambar_url : [item.gambar_url])"
              class="bg-white text-gray-700 rounded-full p-3 shadow-lg hover:bg-gray-200 transition pointer-events-auto"
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
      v-if="previewImages.length > 0"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      @click="closePreview"
    >
      <div class="relative max-w-4xl w-full flex items-center justify-center" @click.stop>
        <button
          @click="closePreview"
          class="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300 z-10"
        >
          ✖
        </button>

        <button
          v-if="previewImages.length > 1"
          @click="prevImage"
          class="absolute left-0 -ml-12 text-white text-4xl hover:text-gray-300 z-10"
        >
          &#10094;
        </button>

        <img
          :src="previewImages[currentIndex]"
          alt="Preview"
          class="w-full max-h-[80vh] object-contain rounded-lg shadow-lg transition-all duration-300"
        />

        <button
          v-if="previewImages.length > 1"
          @click="nextImage"
          class="absolute right-0 -mr-12 text-white text-4xl hover:text-gray-300 z-10"
        >
          &#10095;
        </button>
        
        <!-- Indicators -->
        <div v-if="previewImages.length > 1" class="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
          <div v-for="(_, idx) in previewImages" :key="idx" 
               class="w-3 h-3 rounded-full transition-colors duration-300"
               :class="idx === currentIndex ? 'bg-emerald-500' : 'bg-gray-500'">
          </div>
        </div>
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
const previewImages = ref([])
const currentIndex = ref(0)
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

const openPreview = (images, idx = 0) => {
  previewImages.value = Array.isArray(images) ? images : [images]
  currentIndex.value = idx
}

const closePreview = () => {
  previewImages.value = []
  currentIndex.value = 0
}

const nextImage = () => {
  if (currentIndex.value < previewImages.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = previewImages.value.length - 1
  }
}
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
