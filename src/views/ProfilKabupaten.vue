<template>
  <div class="bg-[#f8fafc] min-h-screen pb-20 font-sans selection:bg-[#1e5ca8] selection:text-white">
    <!-- Gunakan komponen PageHeader2 yang lebih ramping dan smooth -->
    <PageHeader2
      title="Profil Kabupaten Lebak"
      subtitle="Mengenal lebih dekat identitas, sejarah, dan potensi daerah dengan visi yang kuat menuju masa depan."
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Profil', link: '/profil' },
      ]"
    />

    <!-- Loading & Error State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="w-16 h-16 border-4 border-[#1e5ca8] border-t-[#e8a020] rounded-full animate-spin"></div>
      <p class="text-gray-500 font-medium animate-pulse">Memuat Data Profil Wilayah...</p>
    </div>
    
    <div v-else-if="error" class="max-w-7xl mx-auto px-6 py-20">
       <div class="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100 shadow-sm max-w-2xl mx-auto">
        <span class="font-bold text-xl">{{ error }}</span>
      </div>
    </div>

    <!-- Main Content Container -->
    <div v-else-if="profil" class="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 space-y-8 sm:space-y-12">

      <!-- ================= BENTO GRID 1: Sejarah & Visi Misi ================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        <!-- Visi Misi (Kiri/Besar) -->
        <div v-if="profil.visi_misi" class="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
          <!-- Dekorasi -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-[#f8f9fc] rounded-full mix-blend-multiply filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2"></div>
          
          <div class="flex items-start gap-6 mb-8 relative z-10">
            <!-- Logo Lebak in Visi Misi section -->
            <div 
              v-if="profil && (profil.gambar_lambang_url || profil.gambar_lambang)" 
              class="w-20 h-20 bg-gray-50/80 p-2 rounded-2xl border border-gray-100 shadow-sm shrink-0 flex items-center justify-center"
            >
              <img 
                :src="profil.gambar_lambang_url || getStorageUrl(profil.gambar_lambang)" 
                alt="Lambang Kabupaten Lebak" 
                class="w-full h-full object-contain"
              />
            </div>
            
            <div>
              <div class="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-[#0a2463] to-emerald-600 flex items-center justify-center text-white shadow-md shadow-[#1e5ca8]/30">
                <Target class="w-6 h-6" />
              </div>
              <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Visi & Misi</h2>
            </div>
          </div>
          
          <div class="prose prose-lg md:prose-xl prose-blue max-w-none 
                      prose-headings:font-black prose-headings:text-gray-800 prose-headings:mt-0 
                      prose-p:text-gray-600 prose-p:leading-relaxed
                      prose-li:text-gray-600 prose-li:marker:text-[#e8a020] prose-ul:space-y-3 relative z-10" 
               v-html="profil.visi_misi">
          </div>
        </div>

        <!-- Sejarah (Kanan/Kecil) -->
        <div v-if="profil.sejarah_singkat" class="lg:col-span-5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-8 md:p-12 shadow-2xl text-white relative overflow-hidden group">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          
          <div class="flex items-center gap-4 mb-8 relative z-10">
            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transform group-hover:-translate-y-2 transition-all duration-300">
              <BookOpen class="w-7 h-7" />
            </div>
            <h2 class="text-3xl font-extrabold tracking-tight">Sejarah</h2>
          </div>

          <div class="prose prose-invert prose-lg max-w-none 
                      prose-headings:font-black prose-headings:text-white
                      prose-p:text-gray-300 prose-p:leading-relaxed relative z-10" 
               v-html="profil.sejarah_singkat">
          </div>
        </div>
      </div>

      <!-- ================= BENTO GRID 2: Demografi, Geografis, Peta ================= -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
        
        <!-- Kondisi Geografis -->
        <div v-if="profil.kondisi_geografis" class="lg:col-span-4 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
          <div class="absolute bottom-0 right-0 w-40 h-40 bg-blue-50 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-1/3 translate-y-1/3"></div>
          
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 relative z-10">
            <MapPin class="w-6 h-6" />
          </div>
          <h3 class="text-2xl font-black text-gray-900 mb-4 relative z-10">Geografis</h3>
          <div class="prose prose-blue prose-sm sm:prose-base max-w-none prose-p:text-gray-600 prose-li:text-gray-600 relative z-10" v-html="profil.kondisi_geografis"></div>
        </div>

        <!-- Demografi -->
        <div v-if="profil.demografi" class="lg:col-span-4 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
           <div class="absolute top-0 right-0 w-40 h-40 bg-purple-50 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-1/3 -translate-y-1/3"></div>
           
           <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 relative z-10">
             <Users class="w-6 h-6" />
           </div>
           <h3 class="text-2xl font-black text-gray-900 mb-4 relative z-10">Demografi</h3>
           <div class="prose prose-purple prose-sm sm:prose-base max-w-none prose-p:text-gray-600 relative z-10" v-html="profil.demografi"></div>
        </div>

        <!-- Potensi Daerah -->
        <div v-if="profil.potensi_daerah" class="lg:col-span-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-orange-100/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 group relative overflow-hidden">
          <div class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 relative z-10">
            <TrendingUp class="w-6 h-6" />
          </div>
          <h3 class="text-2xl font-black text-gray-900 mb-4 relative z-10">Potensi</h3>
          <div class="prose prose-orange prose-sm sm:prose-base max-w-none prose-p:text-gray-700 relative z-10" v-html="profil.potensi_daerah"></div>
        </div>

        <!-- Peta Wilayah (Lebar Penuh Bawah) -->
        <div v-if="profil.peta_wilayah" class="lg:col-span-12 bg-white rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
           <div class="map-container relative w-full h-[400px] sm:h-[500px] rounded-[1.5rem] overflow-hidden bg-gray-100 filter grayscale hover:grayscale-0 transition-all duration-1000">
             <div class="absolute inset-0 z-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] rounded-[1.5rem]"></div>
             <div class="w-full h-full" v-html="profil.peta_wilayah"></div>
           </div>
        </div>
      </div>

      <!-- ================= ARTI LAMBANG ================= -->
      <div v-if="profil.arti_lambang" class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 overflow-hidden flex flex-col md:flex-row group hover:shadow-2xl transition-shadow duration-500">
        
        <!-- Kiri: Logo Besar dengan Background -->
        <div class="md:w-5/12 lg:w-2/5 bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-12 sm:p-20 relative">
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a2463]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img 
            v-if="profil.gambar_lambang_url || profil.gambar_lambang" 
            :src="profil.gambar_lambang_url || getStorageUrl(profil.gambar_lambang)" 
            alt="Lambang Kabupaten Lebak" 
            class="w-full max-w-[280px] h-auto object-contain drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        
        <!-- Kanan: Penjelasan -->
        <div class="md:w-7/12 lg:w-3/5 p-8 sm:p-12 lg:p-16">
          <div class="flex items-center gap-4 mb-8">
             <div class="w-12 h-12 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center">
               <Shield class="w-6 h-6" />
             </div>
             <h3 class="text-3xl font-black text-gray-900">Makna Lambang Daerah</h3>
          </div>
          <div 
            class="prose prose-lg prose-blue max-w-none prose-p:text-gray-600 prose-p:leading-loose text-justify columns-1 sm:columns-2 gap-8" 
            style="white-space: pre-wrap;" 
            v-html="profil.arti_lambang">
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/api'
import PageHeader2 from '@/components/PageHeader2.vue'
import { getStorageUrl } from '@/utils/helpers'
import { MapPin, Target, Users, TrendingUp, Shield, BookOpen } from 'lucide-vue-next'

const profil = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchProfil = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get('/api/profil-daerah')
    if (res.data && res.data.status === 'success') {
      profil.value = res.data.data
    } else {
      error.value = 'Data Profil Daerah tidak ditemukan.'
    }
  } catch (err) {
    console.error('Error fetching profil daerah:', err)
    error.value = 'Gagal memuat profil daerah. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfil()
})
</script>

<style scoped>
/* Iframe Map Overrides */
::v-deep(.map-container iframe) {
  width: 100% !important;
  height: 100% !important;
  min-height: 100%;
  border: none !important;
  border-radius: 1.5rem !important;
}

/* Ensure empty paragraphs don't mess up layout in prose */
::v-deep(.prose p:empty) {
  display: none;
}
::v-deep(.prose br) {
  content: "";
  display: block;
  margin-top: 0.5em;
}
</style>
