<template>
  <div class="bg-[#f8fafc] min-h-screen pb-24 font-sans selection:bg-[#1e5ca8] selection:text-white">
    <!-- Header -->
    <PageHeader2
      title="Profil Kabupaten Lebak"
      subtitle="Eksplorasi mendalam tentang identitas, sejarah, dan potensi daerah dengan visi yang kuat menuju masa depan."
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Profil', link: '/profil' },
      ]"
    />

    <!-- Loading & Error State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32 gap-4">
      <div class="w-16 h-16 border-4 border-[#1e5ca8] border-t-[#e8a020] rounded-full animate-spin"></div>
      <p class="text-gray-500 font-medium animate-pulse">Menyiapkan Data Profil...</p>
    </div>
    
    <div v-else-if="error" class="max-w-7xl mx-auto px-6 py-20">
       <div class="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100 shadow-sm max-w-2xl mx-auto">
        <span class="font-bold text-xl">{{ error }}</span>
      </div>
    </div>

    <!-- Main Layout: Vertical Tabs -->
    <div v-else-if="profil" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      
      <!-- Mobile Dropdown Selector (visible on small screens) -->
      <div class="block lg:hidden mb-8 relative">
         <select 
           v-model="activeTab" 
           class="w-full appearance-none bg-white border border-gray-200 text-gray-800 py-4 px-6 rounded-2xl shadow-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#1e5ca8]"
         >
           <option v-for="tab in tabs" :key="tab.id" :value="tab.id">
             {{ tab.label }}
           </option>
         </select>
         <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-gray-500">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
         </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
        
        <!-- Kiri: Sidebar Menu (Sticky on Desktop) -->
        <div class="hidden lg:flex w-full lg:w-[320px] shrink-0 sticky top-28 flex-col gap-2">
          
          <div class="bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
            <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest px-4 pt-2 pb-4">Navigasi Profil</h3>
            
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              class="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-left relative group mb-2 last:mb-0"
              :class="activeTab === tab.id 
                ? 'bg-[#0a2463] text-white shadow-lg shadow-[#0a2463]/20' 
                : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
            >
              <div 
                class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                :class="activeTab === tab.id ? 'bg-white/20 text-[#e8a020]' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-[#1e5ca8]'"
              >
                <component :is="tab.icon" class="w-5 h-5" />
              </div>
              <span class="font-bold tracking-wide text-sm">{{ tab.label }}</span>
              
              <div v-if="activeTab === tab.id" class="absolute right-4 w-2 h-2 rounded-full bg-[#e8a020]"></div>
            </button>
          </div>

          <!-- Mini info card below tabs -->
          <div class="bg-gradient-to-br from-[#1e5ca8] to-[#0a2463] rounded-3xl p-6 text-white shadow-xl mt-4 relative overflow-hidden">
             <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             <Shield class="w-10 h-10 text-[#e8a020] mb-4 relative z-10" />
             <h4 class="font-black text-lg mb-1 relative z-10">Lebak Unique</h4>
             <p class="text-blue-100 text-sm leading-relaxed relative z-10">Satu tekad mewujudkan Lebak yang sejahtera dan berdaya saing.</p>
          </div>
        </div>

        <!-- Kanan: Dynamic Content Area -->
        <div class="w-full lg:flex-1 min-w-0">
           <Transition name="fade-slide" mode="out-in">
              <div :key="activeTab" class="w-full">
                
                <!-- 1. Visi Misi -->
                <div v-if="activeTab === 'visi_misi'" class="bg-white rounded-[2.5rem] p-8 sm:p-12 xl:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
                  
                  <div class="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 mb-10 relative z-10">
                    <div class="w-20 h-20 bg-gray-50/80 p-2 rounded-2xl border border-gray-100 shadow-sm shrink-0 flex items-center justify-center">
                      <img v-if="profil.gambar_lambang_url || profil.gambar_lambang" :src="profil.gambar_lambang_url || getStorageUrl(profil.gambar_lambang)" class="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span class="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-widest uppercase mb-3">Arah Pembangunan</span>
                      <h2 class="text-4xl font-black text-gray-900 tracking-tight">Visi & Misi</h2>
                    </div>
                  </div>
                  <div class="prose prose-lg md:prose-xl prose-blue max-w-none prose-headings:font-black prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-li:marker:text-[#e8a020] relative z-10" v-html="profil.visi_misi || 'Data belum tersedia.'"></div>
                </div>

                <!-- 2. Sejarah -->
                <div v-if="activeTab === 'sejarah'" class="bg-gradient-to-br from-[#071840] to-gray-900 rounded-[2.5rem] p-8 sm:p-12 xl:p-16 shadow-2xl text-white relative overflow-hidden">
                  <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                  <div class="absolute top-10 right-10 text-[10rem] font-black text-white/5 pointer-events-none leading-none">1828</div>
                  
                  <div class="mb-10 relative z-10">
                    <span class="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur text-white font-bold text-xs tracking-widest uppercase mb-3 border border-white/20">Latar Belakang</span>
                    <h2 class="text-4xl font-black tracking-tight">Sejarah Daerah</h2>
                  </div>
                  <div class="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-p:text-gray-300 relative z-10" v-html="profil.sejarah_singkat || 'Data belum tersedia.'"></div>
                </div>

                <!-- 3. Geografis -->
                <div v-if="activeTab === 'geografis'" class="bg-white rounded-[2.5rem] p-8 sm:p-12 xl:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden">
                  <div class="absolute bottom-0 right-0 w-64 h-64 bg-emerald-50 rounded-full filter blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>
                  <div class="mb-10 relative z-10">
                    <span class="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs tracking-widest uppercase mb-3">Topografi Wilayah</span>
                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Kondisi Geografis</h2>
                  </div>
                  <div class="prose prose-lg md:prose-xl prose-emerald max-w-none prose-headings:font-black prose-p:text-gray-600 relative z-10" v-html="profil.kondisi_geografis || 'Data belum tersedia.'"></div>
                </div>

                <!-- 4. Demografi -->
                <div v-if="activeTab === 'demografi'" class="bg-white rounded-[2.5rem] p-8 sm:p-12 xl:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden">
                  <div class="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
                  <div class="mb-10 relative z-10">
                    <span class="inline-block px-4 py-1 rounded-full bg-purple-50 text-purple-600 font-bold text-xs tracking-widest uppercase mb-3">Penduduk</span>
                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Demografi</h2>
                  </div>
                  <div class="prose prose-lg md:prose-xl prose-purple max-w-none prose-headings:font-black prose-p:text-gray-600 relative z-10" v-html="profil.demografi || 'Data belum tersedia.'"></div>
                </div>

                <!-- 5. Potensi Daerah -->
                <div v-if="activeTab === 'potensi'" class="bg-gradient-to-br from-[#fffdf5] to-[#fff8e5] rounded-[2.5rem] p-8 sm:p-12 xl:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-orange-100 relative overflow-hidden">
                  <div class="mb-10 relative z-10">
                    <span class="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-bold text-xs tracking-widest uppercase mb-3">Sumber Daya</span>
                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Potensi Daerah</h2>
                  </div>
                  <div class="prose prose-lg md:prose-xl prose-orange max-w-none prose-headings:font-black prose-p:text-gray-700 relative z-10" v-html="profil.potensi_daerah || 'Data belum tersedia.'"></div>
                </div>

                <!-- 6. Arti Lambang -->
                <div v-if="activeTab === 'lambang'" class="bg-white rounded-[2.5rem] p-8 sm:p-12 xl:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden">
                  <div class="flex flex-col xl:flex-row gap-12 items-start">
                     <div class="w-full xl:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-10 flex items-center justify-center border border-gray-100">
                        <img v-if="profil.gambar_lambang_url || profil.gambar_lambang" :src="profil.gambar_lambang_url || getStorageUrl(profil.gambar_lambang)" class="w-full max-w-[200px] h-auto object-contain drop-shadow-xl" />
                     </div>
                     <div class="w-full xl:flex-1">
                        <div class="mb-8">
                          <span class="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs tracking-widest uppercase mb-3 border border-gray-200">Filosofi</span>
                          <h2 class="text-4xl font-black text-gray-900 tracking-tight">Makna Lambang</h2>
                        </div>
                        <div class="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed text-justify" style="white-space: pre-wrap;" v-html="profil.arti_lambang || 'Data belum tersedia.'"></div>
                     </div>
                  </div>
                </div>

                <!-- 7. Peta -->
                <div v-if="activeTab === 'peta'" class="bg-white rounded-[2.5rem] p-8 sm:p-12 xl:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 relative overflow-hidden">
                  <div class="mb-10">
                    <span class="inline-block px-4 py-1 rounded-full bg-red-50 text-red-600 font-bold text-xs tracking-widest uppercase mb-3">Lokasi</span>
                    <h2 class="text-4xl font-black text-gray-900 tracking-tight">Peta Wilayah</h2>
                  </div>
                  <div class="w-full bg-gray-100 rounded-3xl overflow-hidden shadow-inner map-container relative h-[500px] xl:h-[600px] border border-gray-200" v-html="profil.peta_wilayah || '<div class=\'flex items-center justify-center h-full text-gray-400\'>Peta belum tersedia</div>'"></div>
                </div>

              </div>
           </Transition>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '@/utils/api'
import PageHeader2 from '@/components/PageHeader2.vue'
import { getStorageUrl } from '@/utils/helpers'
import { Target, BookOpen, MapPin, Users, TrendingUp, Shield, Map } from 'lucide-vue-next'

const profil = ref(null)
const loading = ref(true)
const error = ref(null)

const activeTab = ref('visi_misi')

const tabs = [
  { id: 'visi_misi', label: 'Visi & Misi', icon: Target },
  { id: 'sejarah', label: 'Sejarah Daerah', icon: BookOpen },
  { id: 'geografis', label: 'Kondisi Geografis', icon: MapPin },
  { id: 'demografi', label: 'Demografi', icon: Users },
  { id: 'potensi', label: 'Potensi Daerah', icon: TrendingUp },
  { id: 'lambang', label: 'Makna Lambang', icon: Shield },
  { id: 'peta', label: 'Peta Wilayah', icon: Map }
]

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
/* Transisi Tab (Fade + Slight Slide up) */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

/* Iframe Map Overrides */
::v-deep(.map-container iframe) {
  width: 100% !important;
  height: 100% !important;
  min-height: 100%;
  border: none !important;
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
