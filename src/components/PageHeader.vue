<template>
  <section class="relative bg-gray-900 py-10 sm:py-14 lg:py-16 overflow-hidden flex flex-col justify-center items-center text-center min-h-[180px] sm:min-h-[220px]">
    <!-- Background Gradient / Image Overlay -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-0 right-0 w-[70%] sm:w-[60%] h-full">
        <img :src="'/storage/images/header-bg.jpg'" alt="Header Background" class="w-full h-full object-cover opacity-60" style="-webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%); mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);" @error="(e) => e.target.style.display = 'none'" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#0a2463]/90 via-[#0a2463]/80 to-[#071840]/90 mix-blend-multiply"></div>
      
      <!-- Subtle Pattern Texture -->
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle, #ffffff 1.5px, transparent 1.5px); background-size: 16px 16px;"></div>
      
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
    </div>

    <!-- Judul -->
    <h1
      class="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 sm:mb-6 leading-tight drop-shadow-xl px-4"
      v-html="formattedTitle"
    ></h1>

    <!-- Breadcrumb -->
    <nav class="relative z-10 text-sm sm:text-base font-medium" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 sm:space-x-3 justify-center px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
        <template v-if="breadcrumbs && breadcrumbs.length > 0">
          <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
            <router-link
              v-if="crumb.link && index < breadcrumbs.length - 1"
              :to="crumb.link"
              class="text-gray-300 hover:text-white transition-colors"
            >
              {{ crumb.label }}
            </router-link>
            <span v-else class="text-[#e8a020] font-semibold">{{ crumb.label }}</span>
            <span v-if="index < breadcrumbs.length - 1" class="mx-2 sm:mx-3 text-gray-400">/</span>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/" class="text-gray-300 hover:text-white transition-colors">Beranda</router-link>
          </li>
          <li class="mx-2 sm:mx-3 text-gray-400">/</li>
          <li class="text-[#e8a020] font-semibold truncate max-w-[200px] sm:max-w-md">{{ title }}</li>
        </template>
      </ol>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    breakAfterWords: {
      type: Number,
      default: 6, // jumlah kata setelah itu otomatis baris baru
    },
  },
  computed: {
    formattedTitle() {
      const words = this.title.split(' ')
      if (words.length > this.breakAfterWords) {
        const firstLine = words.slice(0, this.breakAfterWords).join(' ')
        const secondLine = words.slice(this.breakAfterWords).join(' ')
        return `${firstLine}<br>${secondLine}`
      }
      return this.title
    },
  },
}
</script>
