<template>
  <div class="bg-gray-50/50 min-h-screen pb-20 overflow-hidden">
    <PageHeader title="Profil Kabupaten Lebak" subtitle="Mengenal Lebih Dekat Sejarah, Visi, dan Demografi Kabupaten Lebak" />

    <!-- Intro Section -->
    <section class="max-w-7xl mx-auto px-4 py-12 sm:py-20 relative">
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold text-sm tracking-widest uppercase mb-6 shadow-sm border border-green-200">
            <MapPin class="w-4 h-4" /> Banten, Indonesia
          </div>
          <h2 class="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Lebak <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Ruhay</span>
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed mb-6 font-medium">
            Kabupaten Lebak adalah sebuah kabupaten di Provinsi Banten, Indonesia. Ibukotanya adalah <strong>Rangkasbitung</strong>. Lebak merupakan kabupaten paling luas di Provinsi Banten yang berbatasan dengan Kabupaten Serang dan Kabupaten Pandeglang di utara, Provinsi Jawa Barat di timur, Samudra Hindia di selatan, serta pesisir barat.
          </p>
          <div class="flex flex-wrap gap-4">
            <div class="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
               <div class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                 <Calendar class="w-6 h-6" />
               </div>
               <div>
                 <p class="text-sm font-bold text-gray-400">Hari Jadi</p>
                 <p class="text-xl font-black text-gray-800">2 Desember 1828</p>
               </div>
            </div>
            <div class="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
               <div class="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                 <Compass class="w-6 h-6" />
               </div>
               <div>
                 <p class="text-sm font-bold text-gray-400">Luas Wilayah</p>
                 <p class="text-xl font-black text-gray-800">3.426,56 km²</p>
               </div>
            </div>
          </div>
        </div>
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-tr from-green-500 to-blue-500 rounded-[2.5rem] transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-700 z-0"></div>
          <img src="/storage/images/header-bg.jpg" alt="Pemandangan Kabupaten Lebak" class="relative z-10 w-full aspect-square md:aspect-[4/3] object-cover rounded-[2.5rem] shadow-2xl border-4 border-white transform group-hover:-translate-y-2 transition-all duration-700" @error="(e) => e.target.src = 'https://via.placeholder.com/800x600?text=Lebak+Kabupaten'" />
        </div>
      </div>
    </section>

    <!-- Visi Misi Section -->
    <section class="bg-white border-y border-gray-100 relative">
      <div class="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Visi & Misi</h2>
          <p class="text-gray-500 text-lg">Arah kebijakan dan tujuan pembangunan yang menjadi komitmen Pemerintah Kabupaten Lebak.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- Visi -->
          <div class="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl shadow-green-900/20 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <Target class="w-16 h-16 mb-6 text-green-300 opacity-80" />
            <h3 class="text-3xl font-black mb-4">Visi</h3>
            <p class="text-xl font-medium leading-relaxed">
              "Menjadikan Kabupaten Lebak Sebagai Daerah Wisata Yang Unggul Serta Mengandalkan Potensi Lokal Yang Berdaya Saing."
            </p>
          </div>

          <!-- Misi -->
          <div class="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm relative overflow-hidden group hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-500">
            <div class="absolute bottom-0 right-0 w-40 h-40 bg-blue-100 opacity-50 rounded-full blur-2xl transform translate-x-1/3 translate-y-1/3 group-hover:scale-150 transition-transform duration-700"></div>
            <Flag class="w-16 h-16 mb-6 text-blue-600 opacity-80" />
            <h3 class="text-3xl font-black text-gray-900 mb-6">Misi</h3>
            <ul class="space-y-4">
              <li v-for="(misi, idx) in daftarMisi" :key="idx" class="flex items-start gap-4 text-gray-700 font-medium leading-relaxed">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mt-0.5">
                  {{ idx + 1 }}
                </span>
                {{ misi }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistik Section -->
    <section class="max-w-7xl mx-auto px-4 py-16 sm:py-24">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Statistik Daerah</h2>
        <p class="text-gray-500 text-lg">Gambaran ringkas wilayah administratif dan kependudukan.</p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div v-for="(stat, idx) in statistik" :key="idx" class="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-50 transition-all duration-300">
            <component :is="stat.icon" class="w-8 h-8 text-gray-400 group-hover:text-green-600 transition-colors" />
          </div>
          <h4 class="text-4xl font-black text-gray-900 mb-2">{{ stat.value }}</h4>
          <p class="text-sm font-bold text-gray-500 uppercase tracking-widest">{{ stat.label }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import PageHeader from '@/components/PageHeader.vue'
import { MapPin, Calendar, Compass, Target, Flag, Users, Building, Map, Mountain } from 'lucide-vue-next'

const daftarMisi = [
  "Meningkatkan kualitas sumber daya manusia melalui pelayanan pendidikan dan kesehatan.",
  "Meningkatkan pertumbuhan ekonomi melalui optimalisasi potensi daerah.",
  "Meningkatkan ketersediaan infrastruktur wilayah secara merata.",
  "Mewujudkan tata kelola pemerintahan yang baik, bersih, dan melayani."
]

const statistik = [
  { label: 'Kecamatan', value: '28', icon: Map },
  { label: 'Kelurahan/Desa', value: '345', icon: Building },
  { label: 'Penduduk', value: '1.4M+', icon: Users },
  { label: 'Ketinggian (mdpl)', value: '0-1.929', icon: Mountain },
]
</script>

<style scoped>
/* Blob Animation Utilities */
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
</style>
