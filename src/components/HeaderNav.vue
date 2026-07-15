<template>
  <header
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-500 border-t-4 border-t-[#e8a020]',
      isScrolled || isHovered
        ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]'
        : 'bg-gradient-to-b from-[#0a2463]/80 via-[#0a2463]/40 to-transparent',
    ]"
  >
    <div :class="['max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-500', isScrolled || isHovered ? 'py-3' : 'py-5']">
      <!-- Logo + Identitas -->
      <a href="/" class="flex items-center space-x-4 group">
        <img
          v-if="header.logo_url"
          :src="header.logo_url"
          alt="Logo"
          :class="['w-auto transition-all duration-500 group-hover:scale-105 group-hover:rotate-1', isScrolled || isHovered ? 'h-10' : 'h-12']"
        />

        <!-- TITLE FIX — jarak lebih rapat -->
        <div class="header-title flex flex-col justify-center">
          <p class="header-parent text-[11px] font-bold tracking-widest uppercase transition-colors duration-500" :class="isScrolled || isHovered ? 'text-gray-500' : 'text-blue-100'">
            {{ header.satuan_kerja }}
          </p>
          <p class="header-name text-lg md:text-xl font-black tracking-tight transition-colors duration-500 leading-tight" :class="isScrolled || isHovered ? 'text-[#0a2463]' : 'text-white'">
            {{ header.site_name }}
          </p>
        </div>
      </a>

      <!-- Menu Dinamis Desktop -->
      <nav class="hidden md:flex items-center space-x-2 relative z-10">
        <template v-for="item in menu" :key="item.id">
          <MenuItem :item="item" :is-scrolled="isScrolled || isHovered" />
        </template>
      </nav>

      <!-- Tombol Hamburger Mobile -->
      <button
        @click="isMobileOpen = !isMobileOpen"
        class="md:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors"
        :class="isScrolled || isHovered ? 'text-gray-900' : 'text-white'"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!isMobileOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Menu Mobile -->
    <transition name="slide-ffade">
      <div
        v-if="isMobileOpen"
        class="md:hidden bg-white/95 backdrop-blur-md shadow-2xl px-6 py-6 space-y-4 border-t border-gray-100 max-h-[80vh] overflow-y-auto"
      >
        <template v-for="item in menu" :key="item.id">
          <MenuItem :item="item" :is-scrolled="true" />
        </template>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import axios from '@/utils/api'
import { useSettingsStore } from '@/stores/settings'
import MenuItem from './MenuItem.vue'

const settingsStore = useSettingsStore()
const isScrolled = ref(false)
const isHovered = ref(false)
const isMobileOpen = ref(false)

const menu = ref([])
const header = computed(() => settingsStore.data || {
  site_name: '',
  satuan_kerja: '',
  logo_url: null,
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const fetchMenu = async () => {
  try {
    const res = await axios.get('/api/menus/main')
    if (res.data.status === 'success') {
      menu.value = res.data.data
    }
  } catch (error) {
    console.error('Gagal mengambil menu:', error)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchMenu()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
