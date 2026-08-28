<template>
  <div class="flex items-center justify-center space-x-1 sm:space-x-2 mt-10">
    <!-- Tombol Sebelumnya -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      aria-label="Previous Page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Angka Halaman -->
    <template v-for="page in displayedPages" :key="page">
      <button
        v-if="page !== '...'"
        @click="changePage(page)"
        class="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-sm font-semibold transition-all shadow-sm"
        :class="{
          'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-blue-500/30 border-transparent': currentPage === page,
          'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-blue-600': currentPage !== page
        }"
      >
        {{ page }}
      </button>
      
      <!-- Titik Elipsis -->
      <span
        v-else
        class="flex items-center justify-center w-8 h-10 sm:w-10 sm:h-11 text-gray-400 font-bold"
      >
        ...
      </span>
    </template>

    <!-- Tombol Selanjutnya -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
      aria-label="Next Page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisibleButtons: {
    type: Number,
    default: 5,
  }
})

const emit = defineEmits(['update:page'])

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:page', page)
  }
}

const displayedPages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage
  const maxButtons = props.maxVisibleButtons

  if (total <= maxButtons) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    const half = Math.floor(maxButtons / 2)
    let start = current - half
    let end = current + half

    if (start <= 1) {
      start = 1
      end = maxButtons - 1
    }

    if (end >= total) {
      end = total
      start = total - (maxButtons - 2)
    }

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < total) {
      if (end < total - 1) pages.push('...')
      pages.push(total)
    }
  }

  return pages
})
</script>
