<template>
  <div class="relative" @mouseenter="open" @mouseleave="close">
    <!-- Jika punya anak -->
    <template v-if="hasChildren">
      <button
        type="button"
        class="flex items-center space-x-1 px-4 py-2 rounded-full focus:outline-none transition-all duration-300 font-semibold text-[13px] tracking-wide uppercase"
        :class="[isScrolled ? 'text-gray-700 hover:text-[#1e5ca8] hover:bg-blue-50/80' : 'text-white hover:text-white hover:bg-white/20 backdrop-blur-sm']"
        @click.prevent="toggle"
        :aria-expanded="isOpen.toString()"
      >
        <span>{{ item.title }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Dropdown anak -->
      <div
        v-show="isOpen"
        class="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-100/50 min-w-[220px] z-50 overflow-hidden transform origin-top-left transition-all"
      >
        <ul class="py-2">
          <li v-for="child in item.children" :key="child.id">
            <MenuItem :item="child" :is-scrolled="true" />
          </li>
        </ul>
      </div>
    </template>

    <!-- Jika tidak punya anak -->
    <template v-else>
      <!-- Link eksternal -->
      <template v-if="item.link_type === 'eksternal'">
        <a
          :href="resolveUrl(item)"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 rounded-full block whitespace-nowrap transition-all duration-300 font-semibold text-[13px] tracking-wide uppercase"
          :class="[
            isScrolled ? 'text-gray-700 hover:text-[#1e5ca8] hover:bg-blue-50/80' : 'text-white hover:text-white hover:bg-white/20 backdrop-blur-sm',
          ]"
        >
          {{ item.title }}
        </a>
      </template>

      <!-- Link internal -->
      <template v-else-if="item.link_type && item.link_type !== 'parent'">
        <a
          :href="resolveUrl(item)"
          class="px-4 py-2 rounded-full block whitespace-nowrap transition-all duration-300 font-semibold text-[13px] tracking-wide uppercase"
          :class="[
            isScrolled ? 'text-gray-700 hover:text-[#1e5ca8] hover:bg-blue-50/80' : 'text-white hover:text-white hover:bg-white/20 backdrop-blur-sm',
          ]"
        >
          {{ item.title }}
        </a>
      </template>

      <!-- Induk tanpa link -->
      <template v-else>
        <span
          class="px-4 py-2 rounded-full block cursor-default transition-all duration-300 font-semibold text-[13px] tracking-wide uppercase"
          :class="[isScrolled ? 'text-gray-700' : 'text-white']"
        >
          {{ item.title }}
        </span>
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MenuItem from './MenuItem.vue'

const props = defineProps({
  item: { type: Object, required: true },
  isScrolled: { type: Boolean, default: false },
})

const isOpen = ref(false)
let closeTimer = null

const hasChildren = computed(
  () => props.item && props.item.children && props.item.children.length > 0,
)

const open = () => {
  if (closeTimer) clearTimeout(closeTimer)
  isOpen.value = true
}

const close = () => {
  closeTimer = setTimeout(() => {
    isOpen.value = false
    closeTimer = null
  }, 150)
}

const toggle = () => {
  isOpen.value = !isOpen.value
}

const resolveUrl = (item) => {
  // Selalu gunakan URL dari backend jika tersedia (backend sudah meng-handle prefix yang tepat)
  if (item.url) {
    return item.url
  }

  // Fallback jika item.url kosong
  switch (item.link_type) {
    case 'home':
      return '/'
    case 'halaman_statis':
      return `/page/${item.slug || item.link_ref}`
    case 'kategori_berita':
      return `/berita/kategori/${item.slug || item.link_ref}`
    case 'kategori_dokumen':
      return `/dokumen/kategori/${item.slug || item.link_ref}`
    case 'pejabat':
      return `/profil-pejabat/${item.link_ref}`
    case 'modul':
      if (item.link_ref === 'profil-daerah') return '/profil-kabupaten'
      if (item.link_ref === 'pejabat') return '/profil-pejabat'
      return `/${item.link_ref}`
    case 'eksternal':
      return item.url || '#'
    default:
      return '#'
  }
}
</script>
