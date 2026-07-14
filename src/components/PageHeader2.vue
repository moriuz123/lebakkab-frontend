<template>
  <section class="relative bg-[#071840] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden flex flex-col justify-center items-center text-center rounded-b-[2.5rem] shadow-[0_10px_40px_-10px_rgba(10,36,99,0.3)] mb-10 mx-auto w-full max-w-[1920px]">
    <!-- Background Gradient / Pattern -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-[#1e5ca8] rounded-full mix-blend-screen filter blur-[80px] opacity-40 translate-x-1/3 -translate-y-1/3"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-[#e8a020] rounded-full mix-blend-screen filter blur-[100px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a2463]/40 to-[#071840]"></div>
    </div>

    <!-- Judul -->
    <h1
      class="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 leading-tight tracking-tight drop-shadow-md px-6 max-w-4xl"
      v-html="formattedTitle"
    ></h1>

    <!-- Subtitle (Optional) -->
    <p
      v-if="subtitle"
      class="relative z-10 text-sm sm:text-base lg:text-lg text-blue-100/90 max-w-2xl px-6 mb-5 font-light"
    >
      {{ subtitle }}
    </p>

    <!-- Breadcrumb -->
    <nav class="relative z-10 text-xs sm:text-sm font-medium" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 sm:space-x-3 justify-center px-5 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
        <template v-if="breadcrumbs && breadcrumbs.length > 0">
          <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
            <router-link
              v-if="crumb.link && index < breadcrumbs.length - 1"
              :to="crumb.link"
              class="text-blue-100/70 hover:text-white transition-colors"
            >
              {{ crumb.label }}
            </router-link>
            <span v-else class="text-[#e8a020] font-bold">{{ crumb.label }}</span>
            <span v-if="index < breadcrumbs.length - 1" class="mx-2 sm:mx-2.5 text-white/30">/</span>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/" class="text-blue-100/70 hover:text-white transition-colors">Beranda</router-link>
          </li>
          <li class="mx-2 sm:mx-2.5 text-white/30">/</li>
          <li class="text-[#e8a020] font-bold truncate max-w-[150px] sm:max-w-xs">{{ title }}</li>
        </template>
      </ol>
    </nav>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
  breakAfterWords: {
    type: Number,
    default: 8,
  },
})

const formattedTitle = computed(() => {
  const words = props.title.split(' ')
  if (words.length > props.breakAfterWords) {
    const firstLine = words.slice(0, props.breakAfterWords).join(' ')
    const secondLine = words.slice(props.breakAfterWords).join(' ')
    return `${firstLine}<br>${secondLine}`
  }
  return props.title
})
</script>
