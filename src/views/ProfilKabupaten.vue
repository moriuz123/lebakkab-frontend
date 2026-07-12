<template>
  <div class="bg-gray-50/50 min-h-screen pb-20 overflow-hidden">
    <PageHeader title="Profil Daerah" subtitle="Mengenal Lebih Dekat Kabupaten Lebak" />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="page-loading-placeholder">Memuat Profil Daerah...</div>
    </div>
    
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 py-20">
       <div class="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 shadow-sm max-w-2xl mx-auto">
        <span class="font-bold text-lg">{{ error }}</span>
      </div>
    </div>

    <!-- Konten Utama -->
    <div v-else-if="profil" class="max-w-7xl mx-auto px-4 py-12 sm:py-20 relative">
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <!-- Section: Sejarah & Peta Header -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10 mb-20">
        <div>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold text-sm tracking-widest uppercase mb-6 shadow-sm border border-green-200">
            <MapPin class="w-4 h-4" /> Lebak, Banten
          </div>
          <div class="prose prose-lg prose-green max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:font-medium prose-p:leading-relaxed" v-html="profil.sejarah_singkat"></div>
        </div>
        
        <div class="relative group" v-if="profil.peta_wilayah">
          <div class="absolute inset-0 bg-gradient-to-tr from-green-500 to-blue-500 rounded-[2rem] transform rotate-2 scale-105 opacity-20 group-hover:rotate-3 group-hover:scale-110 transition-all duration-700 z-0"></div>
          <div class="relative z-10 w-full aspect-square md:aspect-[4/3] rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden transform group-hover:-translate-y-2 transition-all duration-700 bg-gray-100 flex items-center justify-center">
             <div class="w-full h-full" v-html="profil.peta_wilayah"></div>
          </div>
        </div>
      </section>

      <!-- Section: Visi & Misi -->
      <section class="mb-20" v-if="profil.visi_misi">
        <div class="bg-gradient-to-br from-green-700 to-emerald-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl shadow-green-900/20 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <Target class="w-16 h-16 mb-6 text-green-300 opacity-80" />
          <div class="prose prose-lg prose-invert max-w-none prose-headings:font-black prose-p:font-medium prose-p:text-xl prose-li:text-lg" v-html="profil.visi_misi"></div>
        </div>
      </section>

      <!-- Grid 3 Kolom: Geografis, Demografi, Potensi -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div v-if="profil.kondisi_geografis" class="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <Compass class="w-6 h-6" />
          </div>
          <div class="prose prose-green max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 text-sm sm:text-base" v-html="profil.kondisi_geografis"></div>
        </div>
        
        <div v-if="profil.demografi" class="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
            <Users class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Demografi</h3>
          <div class="prose prose-green max-w-none prose-p:text-gray-600 text-sm sm:text-base" v-html="profil.demografi"></div>
        </div>

        <div v-if="profil.potensi_daerah" class="bg-white rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-600 group-hover:text-white transition-colors duration-300">
            <TrendingUp class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Potensi Daerah</h3>
          <div class="prose prose-green max-w-none prose-p:text-gray-600 text-sm sm:text-base" v-html="profil.potensi_daerah"></div>
        </div>
      </section>

      <!-- Section: Lambang Daerah -->
      <section v-if="profil.arti_lambang || profil.gambar_lambang_url" class="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
        <div class="md:w-1/3 flex justify-center shrink-0">
          <img 
            v-if="profil.gambar_lambang_url || profil.gambar_lambang" 
            :src="profil.gambar_lambang_url || getStorageUrl(profil.gambar_lambang)" 
            alt="Lambang Kabupaten Lebak" 
            class="w-64 h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="md:w-2/3">
           <h3 class="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
             <Shield class="w-8 h-8 text-green-600" /> Arti Lambang Daerah
           </h3>
           <div class="prose prose-lg prose-green max-w-none prose-p:text-gray-600 prose-p:leading-relaxed" style="white-space: pre-wrap;" v-html="profil.arti_lambang"></div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import axios from '@/utils/api'
import { getStorageUrl } from '@/utils/helpers'
import { MapPin, Compass, Target, Users, TrendingUp, Shield } from 'lucide-vue-next'

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

/* Memastikan peta iframe memuat proporsional */
::v-deep(iframe) {
  width: 100% !important;
  height: 100% !important;
  min-height: 300px;
  border-radius: 1.5rem;
}
</style>
