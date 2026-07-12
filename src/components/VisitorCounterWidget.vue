<template>
  <div 
    class="fixed left-0 top-1/4 md:top-1/3 z-40 flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
    :class="isOpen ? 'translate-x-0' : '-translate-x-[260px]'"
    @mouseleave="isOpen = false"
  >
    <!-- Drawer Content -->
    <div class="bg-white/95 backdrop-blur-md border-y border-r border-gray-100 p-6 w-[260px] relative rounded-br-3xl overflow-hidden shadow-[5px_0_25px_rgba(0,0,0,0.08)]">
      <!-- Decorative top accent -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
      
      <div class="flex items-center gap-3 mb-6 mt-1">
        <div class="bg-green-100 p-2.5 rounded-xl text-green-600 shadow-inner">
          <BarChart2 class="w-5 h-5" />
        </div>
        <h3 class="text-gray-800 font-bold text-lg leading-tight">Statistik<br/><span class="text-green-600">Pengunjung</span></h3>
      </div>
      
      <div class="space-y-3 relative z-10">
        <div class="flex justify-between items-center bg-gray-50/80 p-3 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
          <span class="text-gray-600 text-sm font-semibold">Hari Ini</span>
          <span class="font-bold text-green-700 bg-white shadow-sm px-3 py-1 rounded-lg text-sm">{{ stats.today.toLocaleString('id-ID') }}</span>
        </div>
        <div class="flex justify-between items-center bg-gray-50/80 p-3 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
          <span class="text-gray-600 text-sm font-semibold">Bulan Ini</span>
          <span class="font-bold text-green-700 bg-white shadow-sm px-3 py-1 rounded-lg text-sm">{{ stats.thisMonth.toLocaleString('id-ID') }}</span>
        </div>
        <div class="flex justify-between items-center bg-gray-50/80 p-3 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
          <span class="text-gray-600 text-sm font-semibold">Tahun Ini</span>
          <span class="font-bold text-green-700 bg-white shadow-sm px-3 py-1 rounded-lg text-sm">{{ stats.thisYear.toLocaleString('id-ID') }}</span>
        </div>
        <div class="flex justify-between items-center bg-gradient-to-r from-green-600 to-emerald-500 p-3 rounded-xl text-white shadow-md transform hover:-translate-y-0.5 transition-transform mt-4">
          <span class="text-green-50 text-sm font-bold">Total Visitor</span>
          <span class="font-bold bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm text-sm shadow-inner">{{ stats.total.toLocaleString('id-ID') }}</span>
        </div>
      </div>
      
      <!-- Background subtle logo/icon -->
      <Users class="absolute -bottom-4 -right-4 w-32 h-32 text-gray-50 opacity-40 pointer-events-none" />
    </div>

    <!-- Toggle Button -->
    <button 
      @click="toggleDrawer"
      @mouseenter="isOpen = true"
      class="bg-gradient-to-b from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-5 px-2.5 rounded-r-2xl shadow-[4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-3 transition-all border-t border-r border-b border-white/20 cursor-pointer mt-4 group"
    >
      <Users class="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span class="vertical-text text-[13px] font-bold tracking-[0.2em] uppercase">Statistik</span>
      <div class="bg-white/20 rounded-full p-1 mt-1">
        <ChevronRight class="w-4 h-4 transition-transform duration-500" :class="isOpen ? 'rotate-180' : ''" />
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Users, ChevronRight, BarChart2 } from 'lucide-vue-next'

const isOpen = ref(false)

const stats = ref({
  today: 142,
  thisMonth: 4521,
  thisYear: 52140,
  total: 128450
})

const toggleDrawer = () => {
  isOpen.value = !isOpen.value
}

// In a real scenario, fetch this from API
onMounted(() => {
  // Simulate randomizing the last digit slightly to look 'live'
  setInterval(() => {
    stats.value.today += Math.floor(Math.random() * 2);
    stats.value.thisMonth += Math.floor(Math.random() * 2);
    stats.value.thisYear += Math.floor(Math.random() * 2);
    stats.value.total += Math.floor(Math.random() * 2);
  }, 10000)
})
</script>

<style scoped>
.vertical-text {
  writing-mode: vertical-lr;
  text-orientation: mixed;
  transform: rotate(180deg);
}
</style>
