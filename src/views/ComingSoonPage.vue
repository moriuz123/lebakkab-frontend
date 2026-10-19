<template>
  <div class="min-h-[85vh] flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden py-16 px-4">
    <!-- Decorative background elements -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
    <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

    <div class="relative z-10 text-center max-w-2xl mx-auto w-full">
      
      <!-- ==============================================
           MODE 1: PEMELIHARAAN (MAINTENANCE)
           ============================================== -->
      <div v-if="cctvStatus === 'maintenance'">
        <div class="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl text-amber-500 border border-amber-100 relative">
          <Icon name="lucide:wrench" class="w-12 h-12 animate-bounce" />
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full border-2 border-white animate-pulse"></span>
        </div>
        
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          Mode Pemeliharaan
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Layanan CCTV Sedang <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">Dalam Pemeliharaan</span>
        </h1>
        
        <p class="text-base sm:text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
          {{ cctvMaintenanceMessage }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4">
          <router-link to="/" class="inline-flex items-center gap-2 bg-[#0a2463] hover:bg-[#15347a] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <Icon name="lucide:arrow-left" class="w-5 h-5" />
            Kembali ke Beranda
          </router-link>
          <a v-if="cctvUrl" :href="cctvUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-6 py-3.5 rounded-xl font-bold transition-all shadow-xs">
            <Icon name="lucide:external-link" class="w-4 h-4 text-gray-500" />
            Coba Tautan Cadangan
          </a>
        </div>
      </div>

      <!-- ==============================================
           MODE 2: AKTIF (STREAMING / LINK TERSEDIA)
           ============================================== -->
      <div v-else-if="cctvStatus === 'active' && cctvUrl">
        <div class="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl text-emerald-600 border border-emerald-100 relative">
          <Icon name="lucide:cctv" class="w-12 h-12" />
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Siaran Aktif
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Pantauan CCTV <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#0a2463] to-[#1e5ca8]">Kabupaten Lebak</span>
        </h1>
        
        <p class="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
          Layanan pemantauan kamera CCTV publik langsung dari titik-titik strategis wilayah Kabupaten Lebak.
        </p>

        <!-- CTA Box -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 mb-8 max-w-lg mx-auto text-center">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tautan Siaran Langsung</p>
          <div class="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 truncate mb-6 font-mono">
            {{ cctvUrl }}
          </div>
          <a
            :href="cctvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2.5 w-full bg-gradient-to-r from-[#1e5ca8] to-[#0a2463] hover:from-[#174885] hover:to-[#071840] text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-base"
          >
            <Icon name="lucide:video" class="w-5 h-5 text-[#e8a020]" />
            Buka Siaran CCTV Sekarang
            <Icon name="lucide:external-link" class="w-4 h-4 text-white/80" />
          </a>
        </div>

        <router-link to="/" class="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Kembali ke Beranda
        </router-link>
      </div>

      <!-- ==============================================
           MODE 3: SEGERA HADIR (COMING SOON)
           ============================================== -->
      <div v-else>
        <div class="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl text-[#0a2463] border border-blue-50">
          <Icon name="lucide:cctv" class="w-12 h-12 animate-pulse" />
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1e5ca8] border border-blue-100 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-[#e8a020]" />
          Dalam Pengembangan
        </div>

        <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Segera <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#0a2463] to-[#1e5ca8]">Hadir</span>
        </h1>
        
        <p class="text-base sm:text-lg text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto">
          Fitur pemantauan CCTV secara real-time sedang dalam tahap integrasi dan pengujian oleh Dinas Komunikasi, Informatika, Statistik dan Persandian Kabupaten Lebak.
        </p>

        <router-link to="/" class="inline-flex items-center gap-2 bg-[#0a2463] hover:bg-[#15347a] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
          Kembali ke Beranda
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const cctvStatus = computed(() => settingsStore.cctvStatus || 'coming_soon')
const cctvUrl = computed(() => settingsStore.cctvUrl || '')
const cctvMaintenanceMessage = computed(() => {
  return settingsStore.cctvMaintenanceMessage || 'Layanan pemantauan CCTV sedang dalam pemeliharaan berkala untuk peningkatan kualitas layanan. Silakan kembali beberapa saat lagi.'
})

// 🔹 Proteksi Google: Hanya indeks jika siaran CCTV aktif, noindex jika coming_soon / pemeliharaan
useSeo({
  title: computed(() => {
    if (cctvStatus.value === 'maintenance') return 'Pemeliharaan CCTV - Portal Kabupaten Lebak'
    if (cctvStatus.value === 'active') return 'Pantauan CCTV Lebak - Portal Kabupaten Lebak'
    return 'Segera Hadir CCTV - Portal Kabupaten Lebak'
  }),
  description: 'Layanan pemantauan kamera CCTV publik Pemerintah Kabupaten Lebak.',
  robotsIndex: computed(() => cctvStatus.value === 'active'),
  robotsFollow: true,
})
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
