<template>
  <div class="fixed inset-0 z-[9999] bg-[#0a2463] text-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <!-- Corak & Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0a2463] via-[#071840] to-black opacity-95"></div>
    <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#1e5ca8]/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-[#e8a020]/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-xl w-full text-center flex flex-col items-center my-auto py-8">
      
      <!-- Logo Pemkab -->
      <div class="mb-6 flex items-center justify-center">
        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 backdrop-blur-md p-3.5 border border-white/20 shadow-2xl flex items-center justify-center">
          <img 
            :src="logoUrl || '/images/logo-lebak.png'" 
            alt="Logo Kabupaten Lebak" 
            class="max-w-full max-h-full object-contain drop-shadow"
            @error="$event.target.style.display = 'none'"
          />
        </div>
      </div>

      <!-- Badge Pemeliharaan -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8a020]/20 border border-[#e8a020]/40 text-[#e8a020] text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-sm animate-pulse">
        <Icon name="lucide:wrench" class="w-4 h-4" />
        Mode Pemeliharaan
      </div>

      <!-- Judul -->
      <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3">
        Sistem Sedang Ditingkatkan
      </h1>

      <!-- Deskripsi -->
      <p class="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8 font-normal">
        Kami sedang melakukan pemeliharaan berkala untuk meningkatkan kualitas layanan dan keamanan informasi publik. Layanan akan segera kembali aktif.
      </p>

      <!-- Informasi Bantuan / Darurat -->
      <div class="w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 mb-8 text-left space-y-3">
        <div class="flex items-center justify-between border-b border-white/10 pb-3">
          <span class="text-xs text-gray-400 font-semibold uppercase tracking-wider">Butuh Layanan Darurat?</span>
          <a 
            href="tel:112" 
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md transition-colors"
          >
            <Icon name="lucide:phone-call" class="w-3.5 h-3.5" />
            Call Center 112
          </a>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-300">
          <span>Pusat Informasi:</span>
          <span class="font-semibold text-white">Diskominfo SP Kab. Lebak</span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-300">
          <span>Email Pengaduan:</span>
          <span class="font-semibold text-[#e8a020]">diskominfosp@lebakkab.go.id</span>
        </div>
      </div>

      <!-- Tombol Cek Status / Refresh -->
      <div class="flex items-center gap-3">
        <button
          @click="checkStatus"
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1e5ca8] hover:bg-[#184a86] text-white text-xs sm:text-sm font-bold shadow-lg transition-all transform hover:scale-105"
        >
          <Icon name="lucide:refresh-cw" class="w-4 h-4" :class="{ 'animate-spin': isChecking }" />
          {{ isChecking ? 'Memeriksa...' : 'Muat Ulang Halaman' }}
        </button>
      </div>

      <!-- Footer Info -->
      <p class="text-[11px] text-gray-400 mt-8 tracking-wide">
        &copy; {{ new Date().getFullYear() }} Pemerintah Kabupaten Lebak. Hak Cipta Dilindungi.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  logoUrl: {
    type: String,
    default: null
  }
})

const isChecking = ref(false)

const checkStatus = () => {
  isChecking.value = true
  setTimeout(() => {
    window.location.reload()
  }, 600)
}
</script>
