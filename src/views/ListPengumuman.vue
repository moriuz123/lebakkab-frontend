<template>
  <div class="bg-[#F5F5F7] min-h-screen pb-24">
    <!-- Page Header -->
    <PageHeader2
      title="Daftar Pengumuman"
      subtitle="Informasi dan pengumuman resmi Pemerintah Kabupaten Lebak"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Pengumuman', link: '/pengumuman' }
      ]"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Modern Search Bar -->
      <div v-if="!store.loading && !store.error" class="mb-10 max-w-2xl mx-auto">
        <div class="relative bg-white rounded-full shadow-md shadow-gray-200/50 flex items-center px-6 py-2.5 hover:shadow-xl hover:shadow-[#1e5ca8]/10 focus-within:shadow-xl focus-within:shadow-[#1e5ca8]/20 focus-within:ring-2 focus-within:ring-[#1e5ca8] transition-all duration-300">
          <Icon name="lucide:search" class="w-6 h-6 text-[#e8a020]" />
          <input
            v-model="store.searchQuery"
            @input="store.currentPage = 1"
            type="text"
            placeholder="Cari pengumuman..."
            class="w-full bg-transparent border-none focus:ring-0 text-gray-800 text-base sm:text-lg py-2.5 px-4 placeholder-gray-400 font-semibold outline-none"
          />
          <button 
            v-if="store.searchQuery"
            @click="store.searchQuery = ''; store.currentPage = 1"
            class="p-2 text-gray-400 hover:text-white bg-gray-50 hover:bg-red-500 rounded-full transition-all duration-200"
            title="Hapus pencarian"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Loading State (Uniform Grid Skeletons) -->
      <div v-if="store.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="i in 6"
          :key="i"
          class="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse flex flex-col"
        >
          <div class="w-full h-52 bg-gray-200 rounded-2xl mb-4"></div>
          <div class="w-28 h-4 bg-gray-200 rounded-full mb-3"></div>
          <div class="w-full h-6 bg-gray-200 rounded-lg mb-2"></div>
          <div class="w-3/4 h-6 bg-gray-200 rounded-lg mb-4"></div>
          <div class="w-full h-12 bg-gray-100 rounded-lg mb-4"></div>
          <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            <div class="w-24 h-4 bg-gray-200 rounded-full"></div>
            <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center max-w-2xl mx-auto shadow-sm">
        <Icon name="lucide:alert-circle" class="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p class="font-bold text-xl mb-2">Terjadi Kesalahan</p>
        <p class="font-medium text-red-500/80 mb-6">{{ store.error }}</p>
        <button
          @click="store.fetchPengumuman()"
          class="bg-white px-8 py-3 rounded-xl text-red-600 font-bold hover:bg-red-600 hover:text-white border border-red-200 hover:border-red-600 transition-all shadow-sm hover:shadow-md"
        >
          Muat Ulang
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="store.filteredPengumuman.length === 0" class="bg-white py-16 px-4 rounded-3xl border border-gray-100 border-dashed text-center max-w-2xl mx-auto shadow-sm">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <Icon name="lucide:search-x" class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Tidak Ditemukan</h3>
        <p class="text-gray-500 max-w-md mx-auto">Kami tidak dapat menemukan pengumuman yang sesuai dengan pencarian Anda.</p>
        <button
          v-if="store.searchQuery"
          @click="store.searchQuery = ''; store.currentPage = 1"
          class="mt-6 text-[#1e5ca8] font-bold hover:text-[#0a2463] bg-blue-50 hover:bg-blue-100 px-6 py-2.5 rounded-xl transition-colors"
        >
          Hapus Pencarian
        </button>
      </div>

      <!-- Uniform Responsive Card Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <article
          v-for="item in store.paginatedPengumuman"
          :key="item.id"
          class="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col group overflow-hidden"
        >
          <!-- Thumbnail Container -->
          <div class="relative w-full h-52 sm:h-56 bg-gray-100 overflow-hidden shrink-0 group/img">
            <!-- Image with Zoom Transition -->
            <img
              v-if="item.gambar"
              :src="$storageUrl(item.gambar)"
              :alt="item.judul"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              @error="$event.target.style.display = 'none'"
            />
            <!-- Fallback Icon if no image -->
            <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/80 to-slate-100 text-gray-400">
              <div class="w-16 h-16 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center mb-2">
                <Icon name="lucide:megaphone" class="w-8 h-8 text-[#1e5ca8]" />
              </div>
              <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pengumuman Resmi</span>
            </div>

            <!-- Date Badge (Top Left) -->
            <div class="absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 shadow-sm flex items-center gap-1.5 border border-white/60">
              <span class="w-1.5 h-1.5 rounded-full bg-[#e8a020]"></span>
              {{ formatDate(item.created_at, { day: 'numeric', month: 'short', year: 'numeric' }) }}
            </div>

            <!-- Zoom Overlay on Hover if image exists -->
            <div
              v-if="item.gambar"
              @click.stop="openImage($storageUrl(item.gambar))"
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-zoom-in z-20"
            >
              <div class="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#0a2463] text-xs font-bold shadow-lg flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                <Icon name="lucide:zoom-in" class="w-4 h-4 text-[#e8a020]" />
                Perbesar Gambar
              </div>
            </div>

            <!-- Zoom Icon Button (Top Right) -->
            <button
              v-if="item.gambar"
              type="button"
              @click.stop="openImage($storageUrl(item.gambar))"
              class="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-[#1e5ca8] text-white flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
              title="Perbesar gambar"
              aria-label="Perbesar gambar pengumuman"
            >
              <Icon name="lucide:zoom-in" class="w-4 h-4" />
            </button>
          </div>

          <!-- Card Body -->
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <!-- OPD or Category Badge -->
              <div class="flex items-center gap-2 mb-2.5">
                <span
                  v-if="item.opd?.nama_opd"
                  class="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1e5ca8] bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-100/60 line-clamp-1"
                >
                  <Icon name="lucide:building-2" class="w-3 h-3 text-[#e8a020] shrink-0" />
                  {{ item.opd.nama_opd }}
                </span>
                <span
                  v-else
                  class="text-[11px] font-bold text-[#e8a020] uppercase tracking-wider"
                >
                  Pengumuman
                </span>
              </div>

              <!-- Judul with Router Link -->
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#1e5ca8] transition-colors mb-3">
                <router-link :to="`/pengumuman/${item.slug}`" class="hover:underline">
                  {{ item.judul }}
                </router-link>
              </h3>

              <!-- Excerpt / Ringkasan Isi -->
              <p class="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                {{ stripHtml(item.isi) }}
              </p>
            </div>

            <!-- Card Footer -->
            <div class="pt-4 border-t border-gray-100/80 flex items-center justify-between mt-auto">
              <!-- Detail Link -->
              <router-link
                :to="`/pengumuman/${item.slug}`"
                class="inline-flex items-center gap-1.5 text-sm font-bold text-[#1e5ca8] group-hover:text-[#e8a020] transition-colors"
              >
                <span>Baca Selengkapnya</span>
                <Icon name="lucide:arrow-right" class="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </router-link>

              <!-- Attachment indicator if available -->
              <span
                v-if="item.file_lampiran"
                class="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200/60"
                title="Memiliki lampiran dokumen"
              >
                <Icon name="lucide:paperclip" class="w-3.5 h-3.5 text-gray-400" />
                <span class="text-[11px] font-medium">Lampiran</span>
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination Navigation -->
      <div class="mt-12">
        <PaginationNav
          v-if="store.totalPages > 1"
          :current-page="store.currentPage"
          :total-pages="store.totalPages"
          @update:page="handlePageChange"
        />
      </div>
    </div>

    <!-- Image Lightbox Modal -->
    <Transition name="fade">
      <div
        v-if="selectedImage"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        @keydown.esc="closeImage"
        tabindex="0"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          @click="closeImage"
        ></div>

        <!-- Content Container -->
        <div class="relative max-w-5xl max-h-[90vh] z-10 flex flex-col items-center">
          <!-- Close button -->
          <button
            @click="closeImage"
            class="absolute -top-12 right-0 sm:top-2 sm:right-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 p-2.5 rounded-full backdrop-blur-md transition-all hover:scale-110 duration-200 z-20"
            title="Tutup (Esc)"
            aria-label="Tutup preview gambar"
          >
            <Icon name="lucide:x" class="w-6 h-6" />
          </button>

          <!-- Zoomed Image -->
          <img
            :src="selectedImage"
            alt="Preview Pengumuman"
            class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
            @click.stop
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePengumumanStore } from '@/stores/pengumuman'
import PageHeader2 from '@/components/PageHeader2.vue'
import PaginationNav from '@/components/PaginationNav.vue'
import { formatDate } from '@/utils/helpers'

const store = usePengumumanStore()
const selectedImage = ref(null)

const openImage = (url) => {
  selectedImage.value = url
}

const closeImage = () => {
  selectedImage.value = null
}

const handlePageChange = (page) => {
  store.goToPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim()
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && selectedImage.value) {
    closeImage()
  }
}

onMounted(() => {
  store.fetchPengumuman()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
