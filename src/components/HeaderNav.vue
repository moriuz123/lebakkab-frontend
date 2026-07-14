<template>
  <header
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled || isHovered
        ? 'bg-white shadow-lg'
        : 'bg-transparent backdrop-blur-sm',
    ]"
  >
    <div class="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo + Identitas -->
      <a href="/" class="flex items-center space-x-3 group">
        <img
          v-if="header.logo_url"
          :src="header.logo_url"
          alt="Logo"
          class="h-12 w-auto transition-transform group-hover:scale-105"
        />

        <!-- TITLE FIX — jarak lebih rapat -->
        <div class="header-title font-poppins">
          <p class="header-parent text-xs transition-colors duration-300" :class="isScrolled || isHovered ? 'text-gray-500' : 'text-white'">
            {{ header.satuan_kerja }}
          </p>
          <p class="header-name text-lg font-bold transition-colors duration-300" :class="isScrolled || isHovered ? 'text-gray-900' : 'text-white'">
            {{ header.site_name }}
          </p>
        </div>
      </a>

      <!-- Menu Dinamis Desktop -->
      <nav class="hidden md:flex space-x-6 text-sm font-medium font-poppins relative">
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
        class="md:hidden bg-white shadow-lg px-4 py-4 space-y-2 font-poppins border-t border-gray-100"
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
