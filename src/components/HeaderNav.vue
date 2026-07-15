<template>
  <header
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled || isHovered
        ? 'bg-white shadow-md border-b border-gray-200'
        : 'bg-gradient-to-b from-gray-900/60 to-transparent',
    ]"
  >
    <div :class="['max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300', isScrolled || isHovered ? 'py-3' : 'py-5']">
      <!-- Logo + Identitas -->
      <a href="/" class="flex items-center space-x-4 group">
        <img
          v-if="header.logo_url"
          :src="header.logo_url"
          alt="Logo"
          :class="['w-auto transition-all duration-300', isScrolled || isHovered ? 'h-10' : 'h-12']"
        />

        <div class="header-title flex flex-col justify-center border-l pl-4" :class="isScrolled || isHovered ? 'border-gray-200' : 'border-white/30'">
          <p class="header-parent text-xs font-semibold tracking-wide uppercase transition-colors duration-300" :class="isScrolled || isHovered ? 'text-gray-500' : 'text-gray-200'">
            {{ header.satuan_kerja }}
          </p>
          <p class="header-name text-lg font-bold tracking-tight transition-colors duration-300" :class="isScrolled || isHovered ? 'text-[#0a2463]' : 'text-white'">
            {{ header.site_name }}
          </p>
        </div>
      </a>

      <!-- Menu Dinamis Desktop -->
      <nav class="hidden md:flex items-center space-x-6 relative z-10">
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
        class="md:hidden bg-white shadow-xl px-6 py-6 space-y-4 border-t border-gray-200 max-h-[80vh] overflow-y-auto"
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
