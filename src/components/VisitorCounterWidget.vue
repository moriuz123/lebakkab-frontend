<template>
  <div>
    <!-- === LEFT FLOATING MENUS (STACKED TABS) === -->
    <div class="fixed left-0 top-1/4 md:top-1/3 z-40 flex flex-col gap-0 items-start">
      
      <!-- STATISTIK DRAWER -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="isOpen ? 'translate-x-[260px]' : 'translate-x-0'"
        @mouseleave="isOpen = false"
      >
        <!-- Drawer Content -->
        <div class="absolute left-[-260px] top-0 bg-white/95 backdrop-blur-md border-y border-r border-gray-100 p-6 w-[260px] rounded-br-3xl overflow-hidden shadow-[5px_0_25px_rgba(0,0,0,0.08)]">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0a2463] to-emerald-400"></div>
          
          <div class="flex items-center gap-3 mb-6 mt-1">
            <div class="bg-emerald-900 p-2.5 rounded-xl text-[#e8a020] shadow-inner">
              <Icon name="lucide:bar-chart2" class="w-5 h-5" />
            </div>
            <h3 class="text-gray-800 font-bold text-lg leading-tight">Statistik<br/><span class="text-[#e8a020]">Pengunjung</span></h3>
          </div>
          
          <div class="space-y-3 relative z-10">
            <div class="flex justify-between items-center bg-gray-50/80 p-3 rounded-xl hover:bg-[#f8f9fc] transition-colors border border-gray-100">
              <span class="text-gray-600 text-sm font-semibold">Hari Ini</span>
              <span class="font-bold text-[#e8a020] bg-white shadow-sm px-3 py-1 rounded-lg text-sm">{{ stats.today.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center bg-gray-50/80 p-3 rounded-xl hover:bg-[#f8f9fc] transition-colors border border-gray-100">
              <span class="text-gray-600 text-sm font-semibold">Bulan Ini</span>
              <span class="font-bold text-[#e8a020] bg-white shadow-sm px-3 py-1 rounded-lg text-sm">{{ stats.thisMonth.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center bg-gray-50/80 p-3 rounded-xl hover:bg-[#f8f9fc] transition-colors border border-gray-100">
              <span class="text-gray-600 text-sm font-semibold">Tahun Ini</span>
              <span class="font-bold text-[#e8a020] bg-white shadow-sm px-3 py-1 rounded-lg text-sm">{{ stats.thisYear.toLocaleString('id-ID') }}</span>
            </div>
            <div class="flex justify-between items-center bg-gradient-to-r from-[#0a2463] to-emerald-500 p-3 rounded-xl text-white shadow-md transform hover:-translate-y-0.5 transition-transform mt-4">
              <span class="text-blue-50 text-sm font-bold">Total Visitor</span>
              <span class="font-bold bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm text-sm shadow-inner">{{ stats.total.toLocaleString('id-ID') }}</span>
            </div>
          </div>
          
          <!-- Background subtle logo/icon -->
          <Icon name="lucide:users" class="absolute -bottom-4 -right-4 w-32 h-32 text-gray-50 opacity-40 pointer-events-none" />
        </div>

        <!-- Toggle Button -->
        <button 
          @click="toggleDrawer"
          @mouseenter="isOpen = true"
          class="relative z-10 bg-gradient-to-b from-[#0a2463] to-emerald-600 hover:from-[#0a2463] hover:to-emerald-500 text-white py-5 px-2.5 rounded-r-2xl shadow-[4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-3 transition-all border-t border-r border-b border-white/20 cursor-pointer group"
        >
          <div class="bg-white/20 rounded-full p-1 mb-1 group-hover:bg-white/30 transition-colors">
            <Icon name="lucide:chevron-right" class="w-4 h-4 transition-transform duration-500" :class="isOpen ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-left text-[13px] font-bold tracking-[0.2em] uppercase">Statistik</span>
          <Icon name="lucide:users" class="w-5 h-5 group-hover:scale-110 transition-transform mt-1" />
        </button>
      </div>

      <!-- LIVE STREAMING DRAWER -->
      <div 
        class="relative flex items-start transition-transform duration-500 ease-out drop-shadow-2xl"
        :class="isLiveOpen ? 'translate-x-[260px]' : 'translate-x-0'"
        @mouseleave="isLiveOpen = false"
      >
        <!-- Drawer Content -->
        <div class="absolute left-[-260px] top-0 bg-white/95 backdrop-blur-md border-y border-r border-gray-100 p-6 w-[260px] rounded-br-3xl overflow-hidden shadow-[5px_0_25px_rgba(0,0,0,0.08)] min-h-[120px]">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#cc0000] to-[#ff0000]"></div>
          
          <div class="flex items-center justify-start gap-3 mb-6 mt-1 text-left">
            <div class="bg-[#cc0000] p-2.5 rounded-xl text-white shadow-inner">
              <Icon name="lucide:youtube" class="w-5 h-5" />
            </div>
            <h3 class="text-gray-800 font-bold text-xl leading-tight uppercase tracking-wider">Live Stream</h3>
          </div>
          
          <div class="space-y-3 relative z-10">
            <button
              @click="showLiveModal = true; isLiveOpen = false"
              class="w-full flex items-center gap-3 bg-red-50/80 p-3 rounded-xl hover:bg-red-100 hover:text-red-700 transition-colors border border-red-100 group text-red-600"
            >
              <div class="bg-white p-2 rounded-lg shadow-sm group-hover:text-red-600">
                <Icon name="lucide:play" class="w-5 h-5" />
              </div>
              <span class="text-sm font-bold">Tonton Live Sekarang</span>
            </button>
          </div>
          
          <Icon name="lucide:youtube" class="absolute -bottom-4 -right-4 w-32 h-32 text-red-50 opacity-40 pointer-events-none" />
        </div>

        <!-- Toggle Button -->
        <button 
          @click="isLiveOpen = !isLiveOpen"
          @mouseenter="isLiveOpen = true"
          class="relative z-10 bg-[#cc0000] hover:bg-[#ff0000] text-white py-5 px-2.5 rounded-r-2xl shadow-[4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-3 transition-all border-t border-r border-b border-[#aa0000] cursor-pointer group"
        >
          <div class="bg-white/20 rounded-full p-1 mb-1 group-hover:bg-white/30 transition-colors">
            <Icon name="lucide:chevron-right" class="w-4 h-4 transition-transform duration-500" :class="isLiveOpen ? 'rotate-180' : ''" />
          </div>
          <span class="vertical-text-left text-[13px] font-black tracking-[0.2em] uppercase">LIVE</span>
          <Icon name="lucide:youtube" class="w-5 h-5 group-hover:scale-110 transition-transform mt-1" />
        </button>
      </div>
    </div>

    <!-- === MODAL LIVE STREAMING === -->
    <div
      v-if="showLiveModal"
      class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
    >
      <div class="bg-black rounded-2xl shadow-2xl w-[90%] md:w-[800px] max-h-[90vh] relative overflow-hidden transform transition-all scale-100 border border-gray-700 flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
          <div class="flex items-center gap-3">
            <Icon name="lucide:youtube" class="w-6 h-6 text-red-500" />
            <h2 class="text-lg font-bold text-white">Live Streaming Lebak</h2>
          </div>
          <button @click="showLiveModal = false" class="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Video Container -->
        <div class="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe 
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/live_stream?channel=UCrJ5mO9Gg_W1t6N-pI84p7g&autoplay=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const isLiveOpen = ref(false)
const showLiveModal = ref(false)

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
.vertical-text-left {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
