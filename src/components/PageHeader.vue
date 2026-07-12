<template>
  <section class="relative bg-gray-900 py-16 sm:py-20 lg:py-24 overflow-hidden flex flex-col justify-center items-center text-center min-h-[250px] sm:min-h-[300px]">
    <!-- Background Gradient / Image Overlay -->
    <div class="absolute inset-0 z-0">
      <img :src="'/storage/images/header-bg.jpg'" alt="Header Background" class="w-full h-full object-cover opacity-30" @error="(e) => e.target.style.display = 'none'" />
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-gray-900/80 to-blue-900/90 mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
    </div>

    <!-- Judul -->
    <h1
      class="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight drop-shadow-xl px-4"
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
            <span v-else class="text-blue-300 font-semibold">{{ crumb.label }}</span>
            <span v-if="index < breadcrumbs.length - 1" class="mx-2 sm:mx-3 text-gray-400">/</span>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/" class="text-gray-300 hover:text-white transition-colors">Beranda</router-link>
          </li>
          <li class="mx-2 sm:mx-3 text-gray-400">/</li>
          <li class="text-blue-300 font-semibold truncate max-w-[200px] sm:max-w-md">{{ title }}</li>
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
