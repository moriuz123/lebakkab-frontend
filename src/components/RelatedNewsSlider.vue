<template>
  <div v-if="items && items.length > 0" class="related-news-section mt-8 pt-6 border-t border-gray-100">
    <!-- Header: Compact Title & Navigation Controls -->
    <div class="flex items-center justify-between gap-3 mb-4">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-4 bg-[#1e5ca8] rounded-full inline-block"></span>
        <h3 class="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
          Berita Terkait
        </h3>
      </div>

      <!-- Navigation Arrows & Status -->
      <div v-if="totalPages > 1" class="flex items-center gap-1.5">
        <span class="text-[11px] font-medium text-gray-400 mr-1 hidden sm:inline">
          {{ currentPage + 1 }} / {{ totalPages }}
        </span>

        <button
          @click="prevSlide"
          :disabled="currentPage === 0"
          class="w-7 h-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:border-[#1e5ca8] hover:text-[#1e5ca8] focus:outline-none"
          title="Berita sebelumnya"
        >
          <Icon name="lucide:chevron-left" class="w-3.5 h-3.5" />
        </button>

        <button
          @click="nextSlide"
          :disabled="currentPage >= totalPages - 1"
          class="w-7 h-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:border-[#1e5ca8] hover:text-[#1e5ca8] focus:outline-none"
          title="Berita selanjutnya"
        >
          <Icon name="lucide:chevron-right" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Carousel Slider Track -->
    <div class="overflow-hidden relative rounded-xl">
      <div
        class="flex transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${currentPage * 100}%)` }"
      >
        <!-- Page of Cards -->
        <div
          v-for="(page, pageIdx) in pagedItems"
          :key="'page-' + pageIdx"
          class="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <!-- Compact Related News Card -->
          <article
            v-for="item in page"
            :key="item.id || item.slug"
            class="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
          >
            <!-- Thumbnail -->
            <router-link
              :to="'/berita/' + item.slug"
              @click="handleNavigate"
              class="relative aspect-[16/9] overflow-hidden bg-gray-100 block"
            >
              <img
                :src="item.image || '/images/default-thumbnail.jpg'"
                :alt="item.judul"
                class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                @error="$event.target.src = '/images/default-thumbnail.jpg'"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity"></div>

              <!-- Compact Category Badge -->
              <span
                v-if="item.kategori?.nama || item.kategori"
                class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-white/95 backdrop-blur-xs text-[#1e5ca8] shadow-xs"
              >
                {{ item.kategori?.nama || item.kategori }}
              </span>

              <!-- OPD Badge -->
              <span
                v-if="item.opd?.singkatan || item.opd?.nama"
                class="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-medium bg-black/60 backdrop-blur-xs text-gray-200"
              >
                {{ item.opd?.singkatan || item.opd?.nama }}
              </span>
            </router-link>

            <!-- Card Content -->
            <div class="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <!-- Date Meta -->
                <div class="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium mb-1.5">
                  <Icon name="lucide:calendar" class="w-3 h-3 text-[#e8a020]" />
                  <span>{{ formatDate(item.tanggal_publish, { day: 'numeric', month: 'short', year: 'numeric' }) }}</span>
                  <span v-if="item.views !== undefined" class="text-gray-300">•</span>
                  <span v-if="item.views !== undefined" class="flex items-center gap-0.5 text-[10px] text-gray-400">
                    <Icon name="lucide:eye" class="w-2.5 h-2.5 text-gray-400" />
                    {{ item.views }}
                  </span>
                </div>

                <!-- Title -->
                <h4 class="text-xs sm:text-[13px] font-bold text-gray-900 group-hover:text-[#1e5ca8] transition-colors line-clamp-2 leading-snug">
                  <router-link :to="'/berita/' + item.slug" @click="handleNavigate">
                    {{ item.judul }}
                  </router-link>
                </h4>
              </div>

              <!-- Compact Read More Link -->
              <div class="pt-2 mt-2.5 border-t border-gray-50 flex items-center justify-between text-[11px]">
                <router-link
                  :to="'/berita/' + item.slug"
                  @click="handleNavigate"
                  class="font-semibold text-[#1e5ca8] group-hover:text-[#e8a020] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Baca Selengkapnya</span>
                  <Icon name="lucide:arrow-right" class="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Micro Dot Navigation -->
    <div v-if="totalPages > 1" class="mt-4 flex items-center justify-center gap-1.5">
      <button
        v-for="(_, dotIdx) in totalPages"
        :key="'dot-' + dotIdx"
        @click="goToSlide(dotIdx)"
        class="h-1 rounded-full transition-all duration-300 focus:outline-none"
        :class="currentPage === dotIdx ? 'w-4 bg-[#1e5ca8]' : 'w-1.5 bg-gray-200 hover:bg-gray-300'"
        :title="`Buka halaman ${dotIdx + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { formatDate } from '@/utils/helpers'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const currentPage = ref(0)
const itemsPerPage = ref(2)

const updateItemsPerPage = () => {
  if (typeof window !== 'undefined') {
    itemsPerPage.value = window.innerWidth < 640 ? 1 : 2
  }
}

onMounted(() => {
  updateItemsPerPage()
  window.addEventListener('resize', updateItemsPerPage)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateItemsPerPage)
  }
})

const pagedItems = computed(() => {
  if (!props.items || props.items.length === 0) return []
  const pages = []
  const perPage = itemsPerPage.value || 2
  for (let i = 0; i < props.items.length; i += perPage) {
    pages.push(props.items.slice(i, i + perPage))
  }
  return pages
})

const totalPages = computed(() => pagedItems.value.length)

const nextSlide = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}

const prevSlide = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const goToSlide = (idx) => {
  currentPage.value = idx
}

const handleNavigate = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
@media print {
  .related-news-section {
    display: none !important;
  }
}
</style>
