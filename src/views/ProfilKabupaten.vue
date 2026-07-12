<template>
  <div class="bg-white min-h-screen pb-24 font-sans selection:bg-emerald-500 selection:text-white">
    
    <!-- Loading & Error -->
    <div v-if="loading" class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center space-y-4">
      <div class="w-12 h-12 border-2 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
      <p class="text-sm font-medium text-slate-500 tracking-widest uppercase">Memuat Profil...</p>
    </div>
    
    <div v-else-if="error" class="min-h-screen flex items-center justify-center p-6">
       <div class="bg-red-50 text-red-600 p-8 rounded-2xl text-center max-w-md w-full border border-red-100">
        <span class="font-medium">{{ error }}</span>
      </div>
    </div>

    <div v-else-if="profil" class="animate-fade-in">
      
      <!-- 1. HERO SECTION (Minimalist & High-End) -->
      <header class="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-slate-100">
        <!-- Subtle Grid Background -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div class="flex-1 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold tracking-widest uppercase mb-8">
              <MapPin class="w-3.5 h-3.5" /> Banten, Indonesia
            </div>
            <h1 class="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-slate-900 tracking-tighter leading-[1.1] mb-6">
              Kabupaten <br class="hidden lg:block"/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">Lebak</span>
            </h1>
            <p class="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Mengenal lebih dekat identitas, sejarah, dan potensi daerah dengan visi yang kuat menuju masa depan yang inklusif dan berkelanjutan.
            </p>
          </div>
          
          <div class="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 relative shrink-0">
            <!-- Glow behind logo -->
            <div class="absolute inset-0 bg-emerald-400 rounded-full filter blur-[80px] opacity-20 animate-pulse"></div>
            <img 
              v-if="profil.gambar_lambang_url || profil.gambar_lambang" 
              :src="profil.gambar_lambang_url || getStorageUrl(profil.gambar_lambang)" 
              alt="Lambang Kabupaten Lebak" 
              class="relative z-10 w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </header>

      <!-- 2. MAKNA LAMBANG (Split Layout) -->
      <section v-if="profil.arti_lambang" class="py-24 bg-slate-50 border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div class="lg:col-span-4 lg:sticky lg:top-32">
              <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">Arti Lambang Daerah</h2>
              <p class="text-slate-500 text-lg">Setiap elemen pada lambang Kabupaten Lebak memiliki makna historis dan filosofis yang mendalam.</p>
              <div class="hidden lg:block w-12 h-1 bg-emerald-500 mt-8 rounded-full"></div>
            </div>
            <div class="lg:col-span-8">
              <div class="prose prose-lg prose-slate max-w-none 
                          prose-headings:font-bold prose-headings:text-slate-900 
                          prose-p:text-slate-600 prose-p:leading-loose"
                   style="white-space: pre-wrap;"
                   v-html="profil.arti_lambang">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. VISI & MISI (Elegant Typography) -->
      <section v-if="profil.visi_misi" class="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div class="bg-slate-900 rounded-[2rem] p-10 sm:p-16 lg:p-24 relative overflow-hidden text-center shadow-2xl">
          <!-- Background decoration -->
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-10"></div>
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
          
          <Target class="w-12 h-12 text-emerald-400 mx-auto mb-8 relative z-10" />
          
          <div class="prose prose-xl sm:prose-2xl prose-invert max-w-4xl mx-auto relative z-10
                      prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white
                      prose-p:font-light prose-p:leading-relaxed prose-p:text-slate-300
                      prose-li:text-slate-300 prose-li:text-left prose-ul:text-left" 
               v-html="profil.visi_misi">
          </div>
        </div>
      </section>

      <!-- 4. SEJARAH SINGKAT (Magazine Reading Style) -->
      <section v-if="profil.sejarah_singkat" class="py-24 bg-white border-y border-slate-100">
        <div class="max-w-4xl mx-auto px-6 lg:px-8">
          <div class="text-center mb-16">
            <BookOpen class="w-10 h-10 text-emerald-600 mx-auto mb-6" />
            <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Sejarah Singkat</h2>
          </div>
          <article class="prose prose-lg sm:prose-xl prose-slate max-w-none mx-auto
                          prose-headings:font-bold prose-headings:text-slate-900 
                          prose-p:text-slate-600 prose-p:leading-relaxed text-justify" 
                   v-html="profil.sejarah_singkat">
          </article>
        </div>
      </section>

      <!-- 5. STATISTIK & POTENSI (Clean Minimalist Cards) -->
      <section class="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Kondisi Geografis -->
          <div v-if="profil.kondisi_geografis" class="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
            <Compass class="w-8 h-8 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-bold text-slate-900 mb-4">Geografis</h3>
            <div class="prose prose-sm prose-slate max-w-none" v-html="profil.kondisi_geografis"></div>
          </div>

          <!-- Demografi -->
          <div v-if="profil.demografi" class="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
            <Users class="w-8 h-8 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-bold text-slate-900 mb-4">Demografi</h3>
            <div class="prose prose-sm prose-slate max-w-none" v-html="profil.demografi"></div>
          </div>

          <!-- Potensi -->
          <div v-if="profil.potensi_daerah" class="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
            <TrendingUp class="w-8 h-8 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-bold text-slate-900 mb-4">Potensi Daerah</h3>
            <div class="prose prose-sm prose-slate max-w-none" v-html="profil.potensi_daerah"></div>
          </div>

        </div>
      </section>

      <!-- 6. PETA WILAYAH (Full Bleed Content) -->
      <section v-if="profil.peta_wilayah" class="max-w-7xl mx-auto px-6 lg:px-8 pb-12">
         <div class="bg-slate-50 p-4 sm:p-6 rounded-[2rem] border border-slate-100">
            <h3 class="text-xl font-bold text-slate-900 mb-6 px-4">Peta Administrasi Kabupaten Lebak</h3>
            <div class="map-container relative w-full h-[500px] sm:h-[600px] rounded-[1.5rem] overflow-hidden bg-slate-200 ring-1 ring-slate-900/5">
              <div class="w-full h-full" v-html="profil.peta_wilayah"></div>
            </div>
         </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/api'
import { getStorageUrl } from '@/utils/helpers'
import { MapPin, Target, Users, TrendingUp, Compass, BookOpen } from 'lucide-vue-next'

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

/* Cleanup extra spacing in prose */
::v-deep(.prose p:empty) {
  display: none;
}
::v-deep(.prose p) {
  margin-bottom: 1.5em;
}
::v-deep(.prose h3) {
  margin-top: 2em;
  margin-bottom: 0.75em;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
</style>
