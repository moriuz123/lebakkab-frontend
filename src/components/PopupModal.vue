<template>
  <Teleport to="body">
    <!-- Main Modal Overlay -->
    <Transition name="popup-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <!-- Modal Card Container -->
        <div
          class="relative w-full max-w-lg md:max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border border-gray-100 overflow-hidden flex flex-col my-auto max-h-[90vh] transition-all duration-300"
          role="dialog"
          aria-modal="true"
        >
          <!-- Top Accent Line -->
          <div class="h-1.5 w-full bg-gradient-to-r from-[#0a2463] via-[#1e5ca8] to-[#e8a020]"></div>

          <!-- Header -->
          <div class="px-5 sm:px-7 pt-5 pb-3 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
            <!-- Badge Tipe Pop-up -->
            <div class="flex items-center gap-2">
              <span
                v-if="popupData?.source === 'pengumuman'"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#1e5ca8] border border-blue-200 shadow-xs"
              >
                <Icon name="lucide:megaphone" class="w-3.5 h-3.5" />
                <span>Pengumuman Resmi</span>
              </span>
              <span
                v-else-if="popupData?.source === 'infografis'"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs"
              >
                <Icon name="lucide:pie-chart" class="w-3.5 h-3.5" />
                <span>Infografis Publik</span>
              </span>
              <span
                v-else
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs"
              >
                <Icon name="lucide:bell" class="w-3.5 h-3.5" />
                <span>Pemberitahuan</span>
              </span>
            </div>

            <!-- Close Button -->
            <button
              @click="closeModal"
              aria-label="Tutup Pop-up"
              class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>

          <!-- Body Content (Scrollable) -->
          <div class="px-5 sm:px-7 py-5 overflow-y-auto custom-scrollbar flex-grow space-y-4">
            <!-- Title -->
            <h2 class="text-lg sm:text-2xl font-black text-gray-900 leading-tight">
              {{ popupData?.title }}
            </h2>

            <!-- Date / Info Badge (if available) -->
            <div
              v-if="popupData?.extra?.tgl_pelaksanaan || popupData?.extra?.created_at"
              class="flex items-center gap-2 text-xs font-semibold text-gray-500"
            >
              <Icon name="lucide:calendar" class="w-3.5 h-3.5 text-gray-400" />
              <span>
                {{ formatDate(popupData.extra.tgl_pelaksanaan || popupData.extra.created_at) }}
              </span>
            </div>

            <!-- Image / Flyer / Infographic Preview -->
            <div
              v-if="popupData?.image_url"
              class="relative rounded-2xl overflow-hidden bg-slate-50 border border-gray-200/80 group cursor-pointer shadow-inner"
              @click="isImageZoomed = true"
              title="Klik untuk memperbesar gambar"
            >
              <img
                :src="popupData.image_url"
                :alt="popupData.title"
                class="w-full max-h-[380px] object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <div
                class="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md pointer-events-none group-hover:bg-[#0a2463] transition-colors"
              >
                <Icon name="lucide:maximize-2" class="w-3 h-3" />
                <span>Klik untuk Zoom</span>
              </div>
            </div>

            <!-- Description / Body Content -->
            <div
              v-if="popupData?.content"
              class="prose prose-sm max-w-none text-gray-700 leading-relaxed custom-html-content"
              v-html="popupData.content"
            ></div>

            <!-- Lampiran Berkas Pengumuman (if available) -->
            <div
              v-if="popupData?.extra?.file_lampiran_url"
              class="p-3 sm:p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl flex items-center justify-between gap-3 shadow-xs"
            >
              <div class="flex items-center gap-3 overflow-hidden">
                <div class="p-2.5 bg-[#1e5ca8] text-white rounded-xl flex-shrink-0 shadow-xs">
                  <Icon name="lucide:file-text" class="w-5 h-5" />
                </div>
                <div class="truncate">
                  <p class="text-xs sm:text-sm font-bold text-gray-900 truncate">Dokumen Lampiran Resmi</p>
                  <p class="text-[11px] text-gray-500">Berkas pendukung pengumuman</p>
                </div>
              </div>
              <a
                :href="popupData.extra.file_lampiran_url"
                target="_blank"
                download
                class="px-3.5 py-2 bg-[#1e5ca8] hover:bg-[#15347a] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <Icon name="lucide:download" class="w-3.5 h-3.5" />
                <span>Unduh</span>
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="px-5 sm:px-7 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3.5 flex-shrink-0"
          >
            <!-- Checkbox "Jangan tampilkan lagi hari ini" -->
            <label class="flex items-center gap-2 cursor-pointer select-none text-left w-full sm:w-auto">
              <input
                type="checkbox"
                v-model="dontShowAgain"
                class="w-4 h-4 rounded border-gray-300 text-[#1e5ca8] focus:ring-[#1e5ca8] cursor-pointer"
              />
              <span class="text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors">
                Jangan tampilkan lagi hari ini
              </span>
            </label>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                @click="closeModal"
                class="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Tutup
              </button>

              <button
                v-if="hasCta"
                @click="handleCtaClick"
                class="px-5 py-2 text-xs font-black text-white bg-gradient-to-r from-[#0a2463] via-[#1e5ca8] to-[#15347a] hover:from-[#081c4d] hover:to-[#0f275c] rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{{ popupData?.cta_text || 'Lihat Selengkapnya' }}</span>
                <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Sub-Modal: Full Image Zoom / Lightbox -->
    <Transition name="popup-fade">
      <div
        v-if="isImageZoomed && popupData?.image_url"
        class="fixed inset-0 z-[99995] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        @click.self="isImageZoomed = false"
      >
        <button
          @click="isImageZoomed = false"
          class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-yellow-400 bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Tutup Pratinjau Gambar"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>

        <div class="max-w-4xl max-h-[92vh] flex flex-col items-center">
          <img
            :src="popupData.image_url"
            :alt="popupData.title"
            class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
          <p class="text-white/80 text-xs mt-3 font-semibold text-center max-w-xl truncate">
            {{ popupData.title }}
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'
import { formatDate } from '@/utils/helpers'

const router = useRouter()

const isOpen = ref(false)
const isImageZoomed = ref(false)
const dontShowAgain = ref(false)
const popupData = ref(null)

const hasCta = computed(() => {
  if (!popupData.value) return false
  if (popupData.value.source === 'pengumuman' || popupData.value.source === 'infografis') {
    return true
  }
  return Boolean(popupData.value.cta_url && popupData.value.cta_text)
})

const checkAndOpenPopup = async () => {
  try {
    const res = await api.get('/api/settings/popup')
    if (res.data?.status === 'success' && res.data.data?.active) {
      const data = res.data.data
      popupData.value = data
      const key = data.updated_key || 'popup_default'

      // Periksa apakah pengunjung sudah memilih "Jangan tampilkan lagi hari ini"
      const savedKey = localStorage.getItem('lebakkab_popup_key')
      const dismissedUntil = localStorage.getItem('lebakkab_popup_dismissed_until')
      const sessionClosed = sessionStorage.getItem('lebakkab_popup_session_closed')

      if (savedKey === key && dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
        return
      }

      if (sessionClosed === key) {
        return
      }

      // Beri sedikit jeda agar initial render halaman utama selesai
      setTimeout(() => {
        isOpen.value = true
        document.body.style.overflow = 'hidden'
      }, 700)
    }
  } catch (err) {
    console.warn('Gagal memuat pop-up pemberitahuan:', err)
  }
}

const closeModal = () => {
  isOpen.value = false
  isImageZoomed.value = false
  document.body.style.overflow = ''

  const key = popupData.value?.updated_key || 'popup_default'
  sessionStorage.setItem('lebakkab_popup_session_closed', key)

  if (dontShowAgain.value) {
    localStorage.setItem('lebakkab_popup_key', key)
    // Berlaku 24 jam ke depan
    localStorage.setItem(
      'lebakkab_popup_dismissed_until',
      (Date.now() + 24 * 60 * 60 * 1000).toString()
    )
  }
}

const handleCtaClick = () => {
  const url = popupData.value?.cta_url
  closeModal()
  if (!url) return

  if (url.startsWith('http://') || url.startsWith('https://')) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    router.push(url)
  }
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (isImageZoomed.value) {
      isImageZoomed.value = false
    } else if (isOpen.value) {
      closeModal()
    }
  }
}

onMounted(() => {
  checkAndOpenPopup()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.custom-html-content :deep(p) {
  margin-bottom: 0.75rem;
}
.custom-html-content :deep(a) {
  color: #1e5ca8;
  font-weight: 600;
  text-decoration: underline;
}
</style>
