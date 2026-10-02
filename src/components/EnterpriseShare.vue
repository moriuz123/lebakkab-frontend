<template>
  <div class="enterprise-share-container my-10 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
    <!-- Accent Background Decoration -->
    <div class="absolute -right-16 -top-16 w-44 h-44 bg-blue-100/50 rounded-full blur-2xl pointer-events-none"></div>
    <div class="absolute -left-16 -bottom-16 w-44 h-44 bg-amber-100/40 rounded-full blur-2xl pointer-events-none"></div>

    <div class="relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-[#1e5ca8]">
              <Icon name="lucide:share-2" class="w-3.5 h-3.5" />
            </span>
            <span class="text-xs font-bold uppercase tracking-wider text-[#1e5ca8]">
              Bagikan Informasi
            </span>
          </div>
          <h3 class="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
            Bagikan Berita Ini
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
            Bantu sebarkan informasi resmi Pemerintah Kabupaten Lebak kepada masyarakat luas.
          </p>
        </div>

        <!-- Quick Utility Actions (Print & Native Share) -->
        <div class="flex items-center gap-2 self-start sm:self-auto">
          <!-- Web Share API (Mobile / Tablet native) -->
          <button
            v-if="canNativeShare"
            @click="handleNativeShare"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1e5ca8] text-white hover:bg-[#164a88] shadow-sm hover:shadow transition-all duration-200"
            title="Bagikan via aplikasi ponsel"
          >
            <Icon name="lucide:share-2" class="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>

          <!-- Print Article -->
          <button
            @click="handlePrint"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 shadow-sm transition-all duration-200"
            title="Cetak artikel ini"
          >
            <Icon name="lucide:printer" class="w-3.5 h-3.5 text-gray-600" />
            <span class="hidden sm:inline">Cetak</span>
          </button>

          <!-- QR Code Modal Trigger -->
          <button
            @click="showQrModal = true"
            class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 shadow-sm transition-all duration-200"
            title="Tampilkan QR Code untuk scan di smartphone"
          >
            <Icon name="lucide:qr-code" class="w-3.5 h-3.5 text-gray-600" />
            <span class="hidden sm:inline">QR Code</span>
          </button>
        </div>
      </div>

      <!-- Social Media Share Buttons Grid -->
      <div class="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
        <!-- WhatsApp -->
        <a
          :href="whatsappShareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/20 transition-all duration-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <svg class="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-0.86 4.27-2.42 5.82a8.18 8.18 0 0 1-5.82 2.42c-1.46 0-2.88-.38-4.14-1.11l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.42c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        <!-- Facebook -->
        <a
          :href="facebookShareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/20 transition-all duration-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <svg class="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </a>

        <!-- X (Twitter) -->
        <a
          :href="twitterShareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/5 hover:bg-black text-gray-900 hover:text-white border border-black/10 transition-all duration-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <svg class="w-3.5 h-3.5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>X (Twitter)</span>
        </a>

        <!-- Telegram -->
        <a
          :href="telegramShareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#229ED9]/10 hover:bg-[#229ED9] text-[#229ED9] hover:text-white border border-[#229ED9]/20 transition-all duration-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <svg class="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z"/>
          </svg>
          <span>Telegram</span>
        </a>

        <!-- LinkedIn -->
        <a
          :href="linkedinShareUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/20 transition-all duration-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <svg class="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span>LinkedIn</span>
        </a>

        <!-- Salin Tautan (Copy Link Button with animated feedback) -->
        <button
          @click="copyToClipboard"
          class="group flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all duration-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5"
          :class="isCopied 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
            : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-800'"
        >
          <Icon 
            :name="isCopied ? 'lucide:check-circle-2' : 'lucide:copy'" 
            class="w-4 h-4 transition-transform duration-300"
            :class="isCopied ? 'text-emerald-600 scale-110' : 'text-gray-500 group-hover:text-gray-800'"
          />
          <span>{{ isCopied ? 'Tautan Tersalin!' : 'Salin Tautan' }}</span>
        </button>
      </div>

      <!-- Toast Feedback Floating Pill -->
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="opacity-0 translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-200 ease-in transform"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-95"
      >
        <div 
          v-if="showToast"
          class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-lg"
        >
          <Icon name="lucide:check" class="w-4 h-4" />
          <span>Tautan berhasil disalin ke papan klip!</span>
        </div>
      </transition>
    </div>

    <!-- QR Code Modal (Enterprise Standard) -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showQrModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="showQrModal = false"
      >
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-gray-100 relative text-center">
          <!-- Close Button -->
          <button
            @click="showQrModal = false"
            class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>

          <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-[#1e5ca8] mb-3">
            <Icon name="lucide:qr-code" class="w-6 h-6" />
          </div>

          <h4 class="text-lg font-black text-gray-900 mb-1">
            Pindai Kode QR
          </h4>
          <p class="text-xs text-gray-500 mb-5 leading-relaxed">
            Scan dengan kamera smartphone Anda untuk langsung membaca artikel ini di perangkat seluler.
          </p>

          <!-- QR Image Container -->
          <div class="p-3 bg-gray-50 rounded-2xl border border-gray-200 inline-block shadow-inner mb-5">
            <img 
              :src="qrCodeUrl" 
              alt="QR Code Berita" 
              class="w-48 h-48 mx-auto rounded-lg"
              loading="lazy"
            />
          </div>

          <div class="text-[11px] text-gray-400 break-all px-2 line-clamp-1">
            {{ currentUrl }}
          </div>

          <button
            @click="showQrModal = false"
            class="mt-5 w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Berita Pemerintah Kabupaten Lebak'
  },
  url: {
    type: String,
    default: ''
  },
  excerpt: {
    type: String,
    default: ''
  }
})

const isCopied = ref(false)
const showToast = ref(false)
const showQrModal = ref(false)
const canNativeShare = ref(false)

const currentUrl = computed(() => {
  if (props.url) return props.url
  if (typeof window !== 'undefined') return window.location.href
  return ''
})

onMounted(() => {
  if (typeof navigator !== 'undefined' && !!navigator.share) {
    canNativeShare.value = true
  }
})

// Share URLs
const whatsappShareUrl = computed(() => {
  const text = `${props.title}\n\nBaca selengkapnya di portal resmi Kabupaten Lebak:\n${currentUrl.value}`
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
})

const facebookShareUrl = computed(() => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`
})

const twitterShareUrl = computed(() => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(props.title)}&url=${encodeURIComponent(currentUrl.value)}`
})

const telegramShareUrl = computed(() => {
  return `https://t.me/share/url?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(props.title)}`
})

const linkedinShareUrl = computed(() => {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`
})

const qrCodeUrl = computed(() => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl.value)}`
})

// Copy to Clipboard
const copyToClipboard = async () => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(currentUrl.value)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = currentUrl.value
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    
    isCopied.value = true
    showToast.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2500)
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  } catch (err) {
    console.error('Gagal menyalin tautan:', err)
  }
}

// Native Web Share API
const handleNativeShare = async () => {
  if (navigator?.share) {
    try {
      await navigator.share({
        title: props.title,
        text: props.excerpt || props.title,
        url: currentUrl.value,
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err)
      }
    }
  }
}

// Print Handler
const handlePrint = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<style scoped>
@media print {
  .enterprise-share-container {
    display: none !important;
  }
}
</style>
