<template>
  <section class="relative w-full h-screen min-h-[600px] overflow-hidden bg-emerald-900">
    <!-- Background carousel -->
    <div class="absolute inset-0 z-0">
      <transition-group name="fade">
        <img
          v-if="heroSlides.length > 0"
          :key="currentImage"
          :src="$storageUrl(heroSlides[currentImage]?.gambar)"
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
        style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2' opacity='1'%3E%3Cpath d='M0 40 Q20 20 40 40 T80 40' /%3E%3Cpath d='M0 40 Q20 60 40 40 T80 40' /%3E%3Cpath d='M40 0 Q20 20 40 40 T40 80' /%3E%3Cpath d='M40 0 Q60 20 40 40 T40 80' /%3E%3Cpath d='M40 30 L50 40 L40 50 L30 40 Z' /%3E%3Ccircle cx='40' cy='40' r='4' fill='%23ffffff' /%3E%3C/g%3E%3C/svg%3E&quot;); background-size: 80px 80px;"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-emerald-900 via-transparent to-transparent opacity-90"
      ></div>
    </div>

    <!-- Hero content -->
    <div
      class="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0"
    >
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight drop-shadow-lg">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Selamat Datang</span><br class="hidden lg:block" />
        di Portal Resmi <br class="hidden sm:block" />
        Kabupaten Lebak
      </h1>
      <h2
        class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-200 drop-shadow-xl mb-6 max-w-2xl"
      >
        Pemerintah Kabupaten Lebak
      </h2>

      <!-- Mobile: Logo Hero & Taglines (Above Form) -->
      <div
        class="flex lg:hidden flex-col items-center justify-center gap-3 mb-6 z-30 w-full pointer-events-auto"
      >
        <!-- Logo Hero -->
        <img
          v-if="logoHero"
          :src="logoHero"
          alt="Hero Logo Mobile"
          class="h-32 sm:h-40 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] opacity-95 animate-floating"
        />
        <!-- Taglines -->
        <div class="flex items-center justify-center gap-4 mt-2">
          <img
            v-if="logoTagline"
            :src="logoTagline + cacheBuster"
            alt="Tagline 1"
            class="h-10 sm:h-14 object-contain drop-shadow-lg"
          />
          <img
            v-if="logoTagline2"
            :src="logoTagline2 + cacheBuster"
            alt="Tagline 2"
            class="h-8 sm:h-11 object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <!-- Form Pencarian (Glassmorphism) -->
      <div class="w-full max-w-xl lg:max-w-2xl relative group mb-10 z-30">
        <div
          class="absolute inset-0 bg-[#1e5ca8]/20 blur-xl rounded-2xl group-hover:bg-[#1e5ca8]/30 transition-all duration-500"
        ></div>
        <form
          @submit.prevent="doSearch"
          class="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 sm:p-2 shadow-2xl overflow-hidden transition-all duration-300 focus-within:bg-white/20 focus-within:border-white/40"
        >
          <Search class="w-5 h-5 sm:w-6 sm:h-6 text-white/70 ml-3 sm:ml-4 flex-shrink-0" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari informasi, layanan, atau dokumen..."
            class="flex-grow px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white placeholder-white/60 focus:outline-none text-sm sm:text-base md:text-lg font-medium w-full"
          />
          <button
            type="submit"
            class="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transform transition-all duration-300 hover:scale-[1.02] active:scale-95 flex-shrink-0"
          >
            Cari
          </button>
        </form>
      </div>

      <!-- Icon Menu (Glass Dock) -->
      <div v-if="menus.length > 0" class="w-full max-w-3xl z-30">
        <p
          class="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 lg:text-left"
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
              <component
                :is="getIcon(item.icon)"
                class="h-6 w-6 sm:h-8 sm:w-8"
                stroke="currentColor"
                stroke-width="1.5"
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

    <!-- Desktop: Logo Hero & Taglines (Symmetrically positioned with offset to align with form) -->
    <div
      class="hidden lg:flex absolute inset-y-0 right-10 w-1/2 z-10 pointer-events-none flex-col justify-center items-center gap-6 pr-10 pt-32"
    >
      <!-- Logo Hero -->
      <img
        v-if="logoHero"
        :src="logoHero"
        alt="Hero Logo"
        class="w-auto h-[35%] sm:h-[45%] lg:h-[53%] max-h-[530px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] opacity-95 hover:opacity-100 transition-all duration-500 animate-floating pointer-events-auto"
      />

      <!-- Taglines -->
      <div class="flex items-center gap-4 sm:gap-6 pointer-events-auto mt-4">
        <!-- Tagline 1 diperbesar ~20% -->
        <img
          v-if="logoTagline"
          :src="logoTagline + cacheBuster"
          alt="Tagline 1"
          class="h-14 sm:h-20 lg:h-24 object-contain drop-shadow-lg transition-transform hover:scale-105"
        />
        <img
          v-if="logoTagline2"
          :src="logoTagline2 + cacheBuster"
          alt="Tagline 2"
          class="h-12 sm:h-16 lg:h-20 object-contain drop-shadow-lg transition-transform hover:scale-105"
        />
      </div>
    </div>

    <!-- Scroll Down Indicator -->
    <div
      class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:flex flex-col items-center text-white/50"
    >
      <span class="text-xs font-bold tracking-widest uppercase mb-2">Jelajahi</span>
      <ChevronDown class="w-6 h-6" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/utils/api'
import { useSettingsStore } from '@/stores/settings'

// === Import Lucide ===
import * as LucideIcons from 'lucide-vue-next'
const DefaultIcon = LucideIcons.HelpCircle
const { Search, ChevronDown } = LucideIcons

// === Import Heroicons ===
import * as HeroiconsOutline from '@heroicons/vue/24/outline'
import * as HeroiconsSolid from '@heroicons/vue/24/solid'

// Router
const router = useRouter()
const settingsStore = useSettingsStore()

// Format nama untuk Lucide
const formatIconNameLucide = (name) => {
  if (!name) return ''
  return name
    .replace(/[-_]/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s+/g, '')
}

// Ambil icon sesuai nama (Heroicon atau Lucide)
const getIcon = (name) => {
  if (!name) return DefaultIcon

  // Cek Heroicons
  if (name.startsWith('heroicon-o-') || name.startsWith('heroicon-s-')) {
    const parts = name.split('-')
    const style = parts[1] // o atau s
    const iconName =
      parts
        .slice(2)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join('') + 'Icon'

    if (style === 'o' && HeroiconsOutline[iconName]) {
      return HeroiconsOutline[iconName]
    } else if (style === 's' && HeroiconsSolid[iconName]) {
      return HeroiconsSolid[iconName]
    }
    console.warn(`Heroicon "${name}" tidak ditemukan, fallback ke DefaultIcon.`)
    return DefaultIcon
  }

  // Cek Lucide
  const formatted = formatIconNameLucide(name)
  if (formatted && LucideIcons[formatted]) {
    return LucideIcons[formatted]
  }

  console.warn(`Icon "${name}" tidak ditemukan di Heroicons/Lucide, fallback ke DefaultIcon.`)
  return DefaultIcon
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

// === Logos ===
const logoHero = computed(() => settingsStore.data?.logo_hero_url || null)
const logoTagline = computed(() => settingsStore.data?.logo_tagline_url || null)
const logoTagline2 = computed(() => settingsStore.data?.logo_tagline2_url || null)

// Cache buster for images to prevent stale caching
const cacheBuster = `?v=${Date.now()}`

// === Search ===
const searchQuery = ref('')

const doSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'SearchPage', query: { q: searchQuery.value } })
  }
}

onMounted(() => {
  fetchHeroSlides()
  fetchMenus()

  setInterval(() => {
    if (heroSlides.value.length > 0) {
      currentImage.value = (currentImage.value + 1) % heroSlides.value.length
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
