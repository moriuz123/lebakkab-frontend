<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
    <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

    <div class="relative z-10 text-center px-4 max-w-2xl mx-auto">
      <div class="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl text-[#0a2463]">
        <Icon name="lucide:cctv" class="w-12 h-12 animate-pulse" />
      </div>
      
      <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Segera <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#0a2463] to-[#1e5ca8]">Hadir</span></h1>
      
      <p class="text-lg text-gray-600 mb-10 leading-relaxed">
        Fitur pemantauan CCTV secara real-time sedang dalam tahap pengembangan oleh tim kami. Kami akan segera meluncurkannya dalam waktu dekat!
      </p>

      <router-link to="/" class="inline-flex items-center gap-2 bg-[#0a2463] hover:bg-[#15347a] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
        Kembali ke Beranda
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Segera Hadir - Portal Kabupaten Lebak',
  meta: [
    { name: 'description', content: 'Halaman ini sedang dalam tahap pengembangan.' }
  ]
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
