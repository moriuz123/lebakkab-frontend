<template>
  <section class="relative w-full h-screen min-h-[600px] overflow-hidden bg-gray-900">
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
      <!-- Gradient Overlay for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
    </div>

    <!-- Hero content -->
    <div class="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pt-20 lg:pt-0">
      
      <!-- Typography -->
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-2 sm:mb-4 drop-shadow-2xl leading-[1.1]">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">Selamat Datang</span> <br class="hidden lg:block"/> di Portal Resmi
      </h1>
      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-200 drop-shadow-xl mb-8 sm:mb-10 max-w-2xl">
        Pemerintah Kabupaten Lebak
      </h2>

      <!-- Form Pencarian (Glassmorphism) -->
      <div class="w-full max-w-xl lg:max-w-2xl relative group mb-10 z-30">
        <div class="absolute inset-0 bg-green-500/20 blur-xl rounded-2xl group-hover:bg-green-500/30 transition-all duration-500"></div>
        <form @submit.prevent="doSearch" class="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 sm:p-2 shadow-2xl overflow-hidden transition-all duration-300 focus-within:bg-white/20 focus-within:border-white/40">
          <Search class="w-5 h-5 sm:w-6 sm:h-6 text-white/70 ml-3 sm:ml-4 flex-shrink-0" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari informasi, layanan, atau dokumen..."
            class="flex-grow px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-white placeholder-white/60 focus:outline-none text-sm sm:text-base md:text-lg font-medium w-full"
          />
          <button
            type="submit"
            class="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-95 flex-shrink-0"
          >
            Cari
          </button>
        </form>
      </div>

      <!-- Icon Menu (Glass Dock) -->
      <div v-if="menus.length > 0" class="w-full max-w-3xl z-30">
        <p class="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 lg:text-left">Layanan Cepat</p>
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
            <div class="absolute inset-0 bg-white/5 rounded-2xl blur-md group-hover:bg-green-500/20 transition-all duration-300"></div>
            <div class="relative bg-white/10 backdrop-blur-lg border border-white/10 text-white p-3.5 sm:p-4 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-green-400 group-hover:to-green-600 group-hover:border-green-400/50 group-hover:shadow-green-500/50 flex items-center justify-center">
              <component :is="getIcon(item.icon)" class="h-6 w-6 sm:h-8 sm:w-8" stroke="currentColor" stroke-width="1.5" />
            </div>
            <span class="mt-2.5 text-[10px] sm:text-xs font-bold text-gray-300 group-hover:text-green-300 transition-colors text-center leading-tight tracking-wide drop-shadow-md">
              {{ item.title }}
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- Foto Bupati (Absolute Position on right) -->
    <div class="absolute bottom-0 right-0 lg:right-10 w-full lg:w-1/2 h-[45%] sm:h-[55%] lg:h-[85%] z-10 pointer-events-none flex justify-center lg:justify-end items-end">
      <img
        v-if="fotoBupati"
        :src="fotoBupati"
        alt="Bupati dan Wakil Bupati"
        class="h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-95 hover:opacity-100 transition-opacity duration-500"
      />
    </div>

    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden sm:flex flex-col items-center text-white/50">
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

// === Foto Bupati ===
const fotoBupati = computed(() => settingsStore.data?.photo_bupati || null)

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
</style>
