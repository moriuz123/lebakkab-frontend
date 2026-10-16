<template>
  <section class="relative w-full min-h-screen lg:h-screen lg:min-h-[720px] flex flex-col justify-between overflow-hidden bg-emerald-900">
    <div class="absolute inset-0 z-0">
      <transition-group name="fade">
        <img
          v-if="backgrounds.length > 0"
          :key="currentImage % backgrounds.length"
          :src="backgrounds[currentImage % backgrounds.length]"
          alt="Hero background"
          class="w-full h-full object-cover absolute transition-opacity duration-1000 ease-in-out"
          :class="{ 'scale-105 transition-transform duration-[10000ms]': true }"
        />
      </transition-group>
      <!-- Gradient & Pattern Overlay for SPBE styling -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-[#0a2463]/80 to-emerald-900/40 mix-blend-multiply"
      ></div>
      <!-- Corak Batik Overlay (Kawung Motif) -->
      <div 
        class="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay" 
        :style="batikStyle"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-emerald-900 via-transparent to-transparent opacity-90"
      ></div>
    </div>

    <!-- Hero content -->
    <div
      class="relative z-20 flex-grow flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4 lg:py-0"
    >
      <div class="w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight drop-shadow-lg">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#e8a020] to-yellow-300">
            {{ heroSlides.length > 0 ? (heroSlides[currentImage % heroSlides.length]?.judul || 'Selamat Datang') : 'Selamat Datang' }}
          </span>
        </h1>
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 drop-shadow-xl mt-4 mb-6 max-w-2xl"
        >
          {{ heroSlides.length > 0 ? (heroSlides[currentImage % heroSlides.length]?.deskripsi || 'Website Resmi Pemerintah Kabupaten Lebak') : 'Website Resmi Pemerintah Kabupaten Lebak' }}
        </h2>

        <!-- Mobile: Logo Hero (Above Form) -->
        <div
          class="flex lg:hidden flex-col items-center justify-center mb-6 z-30 w-full pointer-events-auto"
        >
          <img
            v-if="heroSlides.length > 0 && heroSlides[currentImage % heroSlides.length]?.gambar"
            :src="$storageUrl(heroSlides[currentImage % heroSlides.length].gambar)"
            alt="Hero Logo Mobile"
            class="h-32 sm:h-40 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] opacity-95 animate-floating"
          />
        </div>

        <!-- Form Pencarian (Glassmorphism) -->
        <div class="w-full max-w-xl lg:max-w-2xl relative group mb-8 z-30">
          <div
            class="absolute inset-0 bg-[#1e5ca8]/20 blur-xl rounded-2xl group-hover:bg-[#1e5ca8]/30 transition-all duration-500"
          ></div>
          <form
            @submit.prevent="doSearch"
            class="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 sm:p-2 shadow-2xl overflow-hidden transition-all duration-300 focus-within:bg-white/20 focus-within:border-white/40"
          >
            <Icon name="lucide:search" class="w-5 h-5 sm:w-6 sm:h-6 text-white/70 ml-3 sm:ml-4 flex-shrink-0" />
            <input
              v-model="searchQuery"
              type="text"
              maxlength="50"
              placeholder="Cari informasi, layanan, atau dokumen..."
              class="flex-grow px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white placeholder-white/60 focus:outline-none text-sm sm:text-base md:text-lg font-medium w-full"
            />
            <button
              type="submit"
              class="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#e8a020] to-[#d48f10] hover:from-[#c98918] hover:to-[#b3770d] text-[#0a2463] font-black rounded-xl shadow-lg shadow-[#e8a020]/20 transform transition-all duration-300 hover:scale-[1.02] active:scale-95 flex-shrink-0 cursor-pointer"
            >
              Cari
            </button>
          </form>
        </div>

        <!-- Icon Menu (Glass Dock) -->
        <div v-if="menus.length > 0" class="w-full max-w-3xl z-30">
          <p
            class="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3.5 lg:text-left"
          >
            DATA SEKTORAL LEBAK
          </p>
          <div class="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5">
            <a
              v-for="(item, index) in menus"
              :key="index"
              :href="resolveUrl(item)"
              class="flex flex-col items-center w-20 sm:w-24 group relative"
              target="_blank"
              rel="noopener noreferrer"
              :title="item.title"
            >
              <div
                class="absolute inset-0 bg-white/5 rounded-2xl blur-md group-hover:bg-[#1e5ca8]/20 transition-all duration-300"
              ></div>
              <div
                class="relative bg-white/10 backdrop-blur-lg border border-white/10 text-white p-3.5 sm:p-4 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-[#0a2463] group-hover:to-[#071840] group-hover:border-[#1e5ca8]/50 group-hover:shadow-[#1e5ca8]/50 flex items-center justify-center"
              >
                <Icon
                  :name="formatIconName(item.icon)"
                  class="h-6 w-6 sm:h-8 sm:w-8"
                />
              </div>
              <span
                class="mt-2.5 text-[10px] sm:text-xs font-bold text-gray-300 group-hover:text-[#e8a020] transition-colors text-center leading-tight tracking-wide drop-shadow-md"
              >
                {{ item.title }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop: Logo Hero (Right Side, centered) -->
    <div
      class="hidden lg:flex absolute inset-y-0 right-10 w-1/2 z-10 pointer-events-none flex-col justify-center items-center pr-10 pt-12"
    >
      <img
        v-if="heroSlides.length > 0 && heroSlides[currentImage % heroSlides.length]?.gambar"
        :src="$storageUrl(heroSlides[currentImage % heroSlides.length].gambar)"
        alt="Hero Logo"
        class="w-auto h-[45%] lg:h-[55%] max-h-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] opacity-95 hover:opacity-100 transition-all duration-500 animate-floating pointer-events-auto"
      />
    </div>

    <!-- Scroll Down Indicator (Centered above bottom bar) -->
    <div
      class="hidden lg:flex flex-col items-center justify-center text-white/40 hover:text-white/80 transition-colors cursor-pointer mb-1 pointer-events-auto select-none z-30"
      @click="scrollToContent"
    >
      <span class="text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">Jelajahi</span>
      <Icon name="lucide:chevron-down" class="w-4 h-4 animate-bounce" />
    </div>

    <!-- ==============================================
         ENTERPRISE BOTTOM LOGO TAGLINE BAR (MEMANJANG DI BAWAH & TENGAH PRESISI)
         Tanpa garis pembatas, presisi di tengah
         ============================================== -->
    <div
      v-if="logoTaglines.length > 0 || logoTagline || logoTagline2"
      class="relative z-30 w-full pb-4 sm:pb-5 px-4 sm:px-6 lg:px-8 mt-auto"
    >
      <div class="max-w-7xl mx-auto w-full">
        <div
          class="relative w-full bg-slate-950/40 hover:bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] py-4 sm:py-5 px-6 sm:px-10 flex items-center justify-center transition-all duration-300"
        >
          <!-- Subtle Top Gold Gradient Hairline Accent -->
          <div class="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 h-[1.5px] bg-gradient-to-r from-transparent via-[#e8a020]/80 to-transparent"></div>

          <!-- Tagline Logos Centered with Exact Symmetry (Presisi di Tengah, Tanpa Garis Pembatas, Ukuran +30%) -->
          <div class="w-full flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 flex-wrap sm:flex-nowrap">
            <template v-if="logoTaglines.length > 0">
              <div
                v-for="item in logoTaglines"
                :key="item.id"
                class="flex items-center justify-center group cursor-pointer"
                :title="item.judul || 'Logo Tagline Lebak'"
              >
                <img
                  :src="item.url + cacheBuster"
                  :alt="item.judul || 'Tagline'"
                  class="h-12 sm:h-14 lg:h-16 w-auto max-w-[200px] sm:max-w-[260px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
            </template>

            <!-- Fallback if logoTaglines array is empty but legacy props exist -->
            <template v-else>
              <div v-if="logoTagline" class="flex items-center justify-center group cursor-pointer">
                <img
                  :src="logoTagline + cacheBuster"
                  alt="Tagline 1"
                  class="h-12 sm:h-14 lg:h-16 w-auto max-w-[200px] sm:max-w-[260px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>

              <div v-if="logoTagline2" class="flex items-center justify-center group cursor-pointer">
                <img
                  :src="logoTagline2 + cacheBuster"
                  alt="Tagline 2"
                  class="h-12 sm:h-14 lg:h-16 w-auto max-w-[200px] sm:max-w-[260px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/utils/api'
import { useSettingsStore } from '@/stores/settings'

// Router
const router = useRouter()
const settingsStore = useSettingsStore()

const batikStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2' opacity='1'%3E%3Cpath d='M0 40 Q20 20 40 40 T80 40' /%3E%3Cpath d='M0 40 Q20 60 40 40 T80 40' /%3E%3Cpath d='M40 0 Q20 20 40 40 T40 80' /%3E%3Cpath d='M40 0 Q60 20 40 40 T40 80' /%3E%3Cpath d='M40 30 L50 40 L40 50 L30 40 Z' /%3E%3Ccircle cx='40' cy='40' r='4' fill='%23ffffff' /%3E%3C/g%3E%3C/svg%3E")`,
  backgroundSize: '80px 80px'
}

// Format nama icon untuk Iconify
const formatIconName = (name) => {
  if (!name) return 'lucide:help-circle'

  // Jika nama sudah berformat Iconify (ada titik dua)
  if (name.includes(':')) {
    // Handle typo di database (misal lucide:licide-landmark)
    if (name.includes('licide-')) return name.replace('licide-', '')
    // Hilangkan spasi berlebih
    return name.trim()
  }

  // Jika nama menggunakan heroicon-o- / heroicon-s-
  if (name.startsWith('heroicon-o-')) {
    return `heroicons:${name.replace('heroicon-o-', '')}-outline`
  }
  if (name.startsWith('heroicon-s-')) {
    return `heroicons:${name.replace('heroicon-s-', '')}-solid`
  }

  // Jika nama menggunakan lucide-
  if (name.startsWith('lucide-')) {
    return `lucide:${name.replace('lucide-', '')}`
  }

  // Fallback (anggap lucide default)
  return `lucide:${name}`
}

// === Hero Slider ===
const heroSlides = ref([])
const currentImage = ref(0)

const fetchHeroSlides = async () => {
  try {
    const res = await axios.get('/api/hero-sliders')
    heroSlides.value = res.data
  } catch (err) {
    console.error('Gagal mengambil hero slider:', err)
  }
}

// === Menu ===
const menus = ref([])

const fetchMenus = async () => {
  try {
    const res = await axios.get('/api/menus/front')
    menus.value = res.data.data || []
  } catch (err) {
    console.error('Gagal mengambil menu:', err)
  }
}

// === Resolve URL ===
const resolveUrl = (item) => {
  switch (item.link_type) {
    case 'eksternal':
      return item.url || '#'
    case 'home':
      return '/'
    case 'halaman_statis':
      return `/page/${item.slug || item.link_ref}`
    case 'kategori_berita':
      return `/berita/kategori/${item.slug || item.link_ref}`
    case 'kategori_dokumen':
      return `/dokumen/kategori/${item.slug || item.link_ref}`
    case 'modul':
      return `/${item.link_ref}`
    default:
      return item.link_ref || '#'
  }
}

// === Logos & Backgrounds ===
const backgrounds = computed(() => settingsStore.data?.backgrounds || [])
const logoTaglines = computed(() => settingsStore.data?.logo_taglines || [])
const logoTagline = computed(() => settingsStore.data?.logo_tagline_url || null)
const logoTagline2 = computed(() => settingsStore.data?.logo_tagline2_url || null)

// Cache buster for images to prevent stale caching
const cacheBuster = `?v=${Date.now()}`

// === Search ===
const searchQuery = ref('')

const doSearch = () => {
  // 1. Batasi maksimal 50 karakter (jaga-jaga jika di-bypass dari html)
  let query = searchQuery.value.substring(0, 50)
  
  // 2. Sanitasi: Hapus semua karakter aneh (terutama tag HTML < > { } [ ])
  // Hanya membolehkan huruf, angka, spasi, titik, dan koma.
  query = query.replace(/[<>={}\[\]();"']/g, '')

  if (query.trim()) {
    searchQuery.value = query // Update tampilan di kotak input jika ada yang dihapus
    router.push({ name: 'SearchPage', query: { q: query.trim() } })
  }
}

// === Smooth Scroll to Content ===
const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight - 50,
    behavior: 'smooth'
  })
}

onMounted(() => {
  fetchHeroSlides()
  fetchMenus()

  const maxSlides = computed(() => Math.max(heroSlides.value.length || 1, backgrounds.value.length || 1))

  setInterval(() => {
    if (maxSlides.value > 0) {
      currentImage.value = (currentImage.value + 1) % maxSlides.value
    }
  }, 5000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes floating {
  0% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-12px) scale(1.02);
  }
  100% {
    transform: translateY(0px) scale(1);
  }
}
.animate-floating {
  animation: floating 4s ease-in-out infinite;
}
</style>
