<template>
  <div class="enterprise-share-bar my-6 py-3.5 px-4 sm:px-5 bg-gray-50/80 rounded-2xl border border-gray-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
    <!-- Left: Label & Title -->
    <div class="flex items-center gap-2 text-gray-700 flex-shrink-0">
      <span class="w-7 h-7 rounded-xl bg-blue-100/60 text-[#1e5ca8] flex items-center justify-center flex-shrink-0">
        <Icon name="lucide:share-2" class="w-3.5 h-3.5" />
      </span>
      <div>
        <span class="font-bold text-gray-900">Bagikan Berita:</span>
        <span class="text-[11px] text-gray-400 ml-1 hidden md:inline">Sebarkan informasi resmi ini</span>
      </div>
    </div>

    <!-- Right: Compact Share & Utility Buttons -->
    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
      <!-- WhatsApp -->
      <a
        :href="whatsappShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="h-7.5 px-2.5 rounded-xl bg-white hover:bg-[#25D366] text-gray-700 hover:text-white border border-gray-200/80 hover:border-[#25D366] transition-all duration-200 inline-flex items-center gap-1.5 font-semibold text-[11px] shadow-sm hover:shadow"
        title="Bagikan ke WhatsApp"
      >
        <svg class="w-3.5 h-3.5 fill-[#25D366] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-0.86 4.27-2.42 5.82a8.18 8.18 0 0 1-5.82 2.42c-1.46 0-2.88-.38-4.14-1.11l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.42c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
        </svg>
        <span class="hidden sm:inline">WhatsApp</span>
      </a>

      <!-- Facebook -->
      <a
        :href="facebookShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="h-7.5 px-2.5 rounded-xl bg-white hover:bg-[#1877F2] text-gray-700 hover:text-white border border-gray-200/80 hover:border-[#1877F2] transition-all duration-200 inline-flex items-center gap-1.5 font-semibold text-[11px] shadow-sm hover:shadow"
        title="Bagikan ke Facebook"
      >
        <svg class="w-3.5 h-3.5 fill-[#1877F2] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span class="hidden sm:inline">Facebook</span>
      </a>

      <!-- X (Twitter) -->
      <a
        :href="twitterShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="h-7.5 px-2.5 rounded-xl bg-white hover:bg-black text-gray-700 hover:text-white border border-gray-200/80 hover:border-black transition-all duration-200 inline-flex items-center gap-1.5 font-semibold text-[11px] shadow-sm hover:shadow"
        title="Bagikan ke X (Twitter)"
      >
        <svg class="w-3 h-3 fill-gray-900 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <span class="hidden sm:inline">X</span>
      </a>

      <!-- Telegram -->
      <a
        :href="telegramShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="h-7.5 px-2.5 rounded-xl bg-white hover:bg-[#229ED9] text-gray-700 hover:text-white border border-gray-200/80 hover:border-[#229ED9] transition-all duration-200 inline-flex items-center gap-1.5 font-semibold text-[11px] shadow-sm hover:shadow"
        title="Bagikan ke Telegram"
      >
        <svg class="w-3.5 h-3.5 fill-[#229ED9] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z"/>
        </svg>
        <span class="hidden sm:inline">Telegram</span>
      </a>

      <!-- LinkedIn -->
      <a
        :href="linkedinShareUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="h-7.5 px-2.5 rounded-xl bg-white hover:bg-[#0A66C2] text-gray-700 hover:text-white border border-gray-200/80 hover:border-[#0A66C2] transition-all duration-200 inline-flex items-center gap-1.5 font-semibold text-[11px] shadow-sm hover:shadow"
        title="Bagikan ke LinkedIn"
      >
        <svg class="w-3 h-3 fill-[#0A66C2] group-hover:fill-white transition-colors" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        <span class="hidden sm:inline">LinkedIn</span>
      </a>

      <!-- Divider -->
      <span class="h-4 w-px bg-gray-200 mx-0.5 hidden sm:inline-block"></span>

      <!-- Salin Tautan (Copy Link Button) -->
      <button
        @click="copyToClipboard"
        class="h-7.5 px-2.5 rounded-xl border transition-all duration-200 inline-flex items-center gap-1.5 font-semibold text-[11px] shadow-sm hover:shadow"
        :class="isCopied 
          ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
          : 'bg-white hover:bg-gray-100 border-gray-200/80 text-gray-700'"
        title="Salin tautan artikel ini"
      >
        <Icon 
          :name="isCopied ? 'lucide:check' : 'lucide:copy'" 
          class="w-3.5 h-3.5"
          :class="isCopied ? 'text-emerald-600' : 'text-gray-500'"
        />
        <span>{{ isCopied ? 'Tersalin' : 'Salin' }}</span>
      </button>

      <!-- Web Share Native (Mobile / Tablet) -->
      <button
        v-if="canNativeShare"
        @click="handleNativeShare"
        class="h-7.5 px-2.5 rounded-xl bg-[#1e5ca8] text-white hover:bg-[#164a88] transition-all duration-200 inline-flex items-center gap-1 font-semibold text-[11px] shadow-sm"
        title="Bagikan via aplikasi ponsel"
      >
        <Icon name="lucide:share-2" class="w-3 h-3" />
        <span>Lainnya</span>
      </button>

      <!-- QR Code Modal Trigger -->
      <button
        @click="showQrModal = true"
        class="w-7.5 h-7.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-200/80 text-gray-600 hover:text-gray-900 transition-all duration-200 inline-flex items-center justify-center shadow-sm"
        title="Tampilkan QR Code"
      >
        <Icon name="lucide:qr-code" class="w-3.5 h-3.5" />
      </button>

      <!-- Print Article -->
      <button
        @click="handlePrint"
        class="w-7.5 h-7.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-200/80 text-gray-600 hover:text-gray-900 transition-all duration-200 inline-flex items-center justify-center shadow-sm"
        title="Cetak artikel"
      >
        <Icon name="lucide:printer" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- QR Code Modal (Clean & Compact) -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="showQrModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        @click.self="showQrModal = false"
      >
        <div class="bg-white rounded-2xl p-5 max-w-xs w-full shadow-xl border border-gray-100 relative text-center">
          <button
            @click="showQrModal = false"
            class="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          >
            <Icon name="lucide:x" class="w-3.5 h-3.5" />
          </button>

          <h4 class="text-sm font-bold text-gray-900 mb-0.5">
            Pindai Kode QR
          </h4>
          <p class="text-[11px] text-gray-400 mb-4 leading-relaxed">
            Scan untuk membuka artikel ini langsung di smartphone
          </p>

          <div class="p-2.5 bg-gray-50 rounded-xl border border-gray-100 inline-block mb-3">
            <img 
              :src="qrCodeUrl" 
              alt="QR Code Berita" 
              class="w-36 h-36 mx-auto rounded"
              loading="lazy"
            />
          </div>

          <p class="text-[10px] text-gray-400 truncate px-2 mb-3">
            {{ currentUrl }}
          </p>

          <button
            @click="showQrModal = false"
            class="w-full py-1.5 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition-colors"
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
  const text = `${props.title}\n\n${currentUrl.value}`
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
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl.value)}`
})

// Copy to Clipboard
const copyToClipboard = async () => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(currentUrl.value)
    } else {
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
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
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
  .enterprise-share-bar {
    display: none !important;
  }
}
</style>
