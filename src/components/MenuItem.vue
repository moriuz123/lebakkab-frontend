<template>
  <div class="relative" @mouseenter="open" @mouseleave="close">
    <!-- Jika punya anak -->
    <template v-if="hasChildren">
      <button
        type="button"
        class="group/btn flex items-center space-x-1.5 py-2 focus:outline-none transition-colors duration-200 font-medium text-[15px]"
        :class="[isScrolled ? 'text-gray-700 hover:text-[#0a2463]' : 'text-white/90 hover:text-white']"
        @click.prevent="toggle"
        :aria-expanded="isOpen.toString()"
      >
        <span class="relative">
          {{ item.title }}
          <span class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#e8a020] transition-all duration-300 group-hover/btn:w-full"></span>
        </span>
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
        class="absolute left-0 top-full mt-4 bg-white shadow-xl rounded-lg border border-gray-100 min-w-[240px] z-50 overflow-hidden transform origin-top-left transition-all"
      >
        <div class="absolute top-0 left-0 w-full h-1 bg-[#0a2463]"></div>
        <ul class="py-2">
          <li v-for="child in item.children" :key="child.id">
            <MenuItem :item="child" :is-scrolled="true" :is-child="true" />
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
          class="group/link py-2 block whitespace-nowrap transition-colors duration-200 font-medium text-[15px]"
          :class="[
            isScrolled ? 'text-gray-700 hover:text-[#0a2463]' : 'text-white/90 hover:text-white',
            isChild ? 'px-4 hover:bg-gray-50 hover:text-[#0a2463] w-full text-left font-normal text-[14px]' : ''
          ]"
        >
          <span :class="{'relative': !isChild}">
            {{ item.title }}
            <span v-if="!isChild" class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#e8a020] transition-all duration-300 group-hover/link:w-full"></span>
          </span>
        </a>
      </template>

      <!-- Link internal -->
      <template v-else-if="item.link_type && item.link_type !== 'parent'">
        <a
          :href="resolveUrl(item)"
          class="group/link py-2 block whitespace-nowrap transition-colors duration-200 font-medium text-[15px]"
          :class="[
            isScrolled ? 'text-gray-700 hover:text-[#0a2463]' : 'text-white/90 hover:text-white',
            isChild ? 'px-4 hover:bg-gray-50 hover:text-[#0a2463] w-full text-left font-normal text-[14px]' : ''
          ]"
        >
          <span :class="{'relative': !isChild}">
            {{ item.title }}
            <span v-if="!isChild" class="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#e8a020] transition-all duration-300 group-hover/link:w-full"></span>
          </span>
        </a>
      </template>

      <!-- Induk tanpa link -->
      <template v-else>
        <span
          class="py-2 block cursor-default transition-colors duration-200 font-medium text-[15px]"
          :class="[
            isScrolled ? 'text-gray-700' : 'text-white',
            isChild ? 'px-4 text-gray-400 font-normal text-[14px]' : ''
          ]"
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
  isChild: { type: Boolean, default: false }, // Prop to know if this is rendered inside a dropdown
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
