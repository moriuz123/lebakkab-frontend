<template>
  <div v-if="items && items.length > 0" class="related-news-section mt-12 pt-10 border-t border-gray-100">
    <!-- Section Header with Title & Navigation Controls -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <span class="w-2 h-2 rounded-full bg-[#e8a020]"></span>
          <span class="text-xs font-bold uppercase tracking-wider text-[#1e5ca8]">
            Informasi Terkait
          </span>
        </div>
        <h3 class="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Berita Terkait
        </h3>
        <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
          Perkembangan dan informasi daerah lainnya yang relevan untuk Anda.
        </p>
      </div>

      <!-- Navigation Arrows (Previous / Next) & Page Indicator -->
      <div v-if="totalPages > 1" class="flex items-center gap-2 self-end sm:self-auto">
        <span class="text-xs font-semibold text-gray-400 mr-1 hidden sm:inline">
          {{ currentPage + 1 }} / {{ totalPages }}
        </span>

        <button
          @click="prevSlide"
          :disabled="currentPage === 0"
          class="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm hover:shadow hover:border-[#1e5ca8] hover:text-[#1e5ca8] focus:outline-none"
          title="Berita sebelumnya"
        >
          <Icon name="lucide:chevron-left" class="w-4 h-4" />
        </button>

        <button
          @click="nextSlide"
          :disabled="currentPage >= totalPages - 1"
          class="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm hover:shadow hover:border-[#1e5ca8] hover:text-[#1e5ca8] focus:outline-none"
          title="Berita selanjutnya"
        >
          <Icon name="lucide:chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Carousel Slider Container -->
    <div class="overflow-hidden relative rounded-2xl">
      <div
        class="flex transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(-${currentPage * 100}%)` }"
      >
        <!-- Slides Pages -->
        <div
          v-for="(page, pageIdx) in pagedItems"
          :key="'page-' + pageIdx"
          class="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <!-- Related News Card -->
          <article
            v-for="item in page"
            :key="item.id || item.slug"
            class="group bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
          >
            <!-- Card Thumbnail with Aspect Ratio & Badges -->
            <router-link
              :to="'/berita/' + item.slug"
              @click="handleNavigate"
              class="relative aspect-[16/10] overflow-hidden bg-gray-100 block"
            >
              <img
                :src="item.image || '/images/default-thumbnail.jpg'"
                :alt="item.judul"
                class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                @error="$event.target.src = '/images/default-thumbnail.jpg'"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

              <!-- Category Badge -->
              <span
                v-if="item.kategori?.nama || item.kategori"
                class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md text-[#1e5ca8] shadow-sm border border-white/50"
              >
                {{ item.kategori?.nama || item.kategori }}
              </span>

              <!-- OPD Badge if available -->
              <span
                v-if="item.opd?.singkatan || item.opd?.nama"
                class="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 backdrop-blur-sm text-gray-200 border border-white/10"
              >
                {{ item.opd?.singkatan || item.opd?.nama }}
              </span>
            </router-link>

            <!-- Card Body -->
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <!-- Date Meta -->
                <div class="flex items-center gap-2 text-xs text-gray-500 font-medium mb-2.5">
                  <Icon name="lucide:calendar" class="w-3.5 h-3.5 text-[#e8a020]" />
                  <span>{{ formatDate(item.tanggal_publish, { day: 'numeric', month: 'short', year: 'numeric' }) }}</span>
                  <span v-if="item.views !== undefined" class="text-gray-300">•</span>
                  <span v-if="item.views !== undefined" class="flex items-center gap-1 text-[11px] text-gray-400">
                    <Icon name="lucide:eye" class="w-3 h-3 text-gray-400" />
                    {{ item.views }}
                  </span>
                </div>

                <!-- News Title -->
                <h4 class="text-base font-extrabold text-gray-900 group-hover:text-[#1e5ca8] transition-colors line-clamp-2 leading-snug">
                  <router-link :to="'/berita/' + item.slug" @click="handleNavigate">
                    {{ item.judul }}
                  </router-link>
                </h4>
              </div>

              <!-- Read More Action Link -->
              <div class="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <router-link
                  :to="'/berita/' + item.slug"
                  @click="handleNavigate"
                  class="font-bold text-[#1e5ca8] group-hover:text-[#e8a020] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Baca Selengkapnya</span>
                  <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Bottom Dot Navigation -->
    <div v-if="totalPages > 1" class="mt-6 flex items-center justify-center gap-2">
      <button
        v-for="(_, dotIdx) in totalPages"
        :key="'dot-' + dotIdx"
        @click="goToSlide(dotIdx)"
        class="h-2 rounded-full transition-all duration-300 focus:outline-none"
        :class="currentPage === dotIdx ? 'w-6 bg-[#1e5ca8]' : 'w-2 bg-gray-200 hover:bg-gray-300'"
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

// Responsive items per page detection
const updateItemsPerPage = () => {
  if (typeof window !== 'undefined') {
    // Mobile: 1 card per slide, Desktop/Tablet (inside 2-col main): 2 cards per slide
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

// Group items into pages based on itemsPerPage
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

// Scroll to top when navigating to another news article
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
