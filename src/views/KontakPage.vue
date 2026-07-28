<template>
  <div class="kontak-page pb-16 font-sans bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="bg-blue-900 text-white pt-24 pb-12 px-6 sm:px-12 rounded-b-[3rem] shadow-xl relative overflow-hidden">
      <!-- Ornamen Latar -->
      <div class="absolute -right-20 -top-20 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl"></div>
      <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 class="text-3xl md:text-5xl font-black mb-4 drop-shadow-md">Kontak Kami</h1>
        <p class="text-blue-100 text-sm md:text-base max-w-2xl">
          Hubungi kami melalui kanal resmi di bawah ini untuk layanan informasi, pengaduan, maupun bantuan terkait {{ kontakData?.nama_instansi || 'Pemerintah Daerah' }}.
        </p>
      </div>
    </div>

    <!-- Konten Utama -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div v-if="loading" class="flex justify-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100">
        <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      
      <div v-else-if="kontakData" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Informasi Kontak (Kiri) -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 h-full flex flex-col">
            <div class="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
               <img v-if="kontakData.logo_url" :src="kontakData.logo_url" alt="Logo" class="w-16 h-16 object-contain drop-shadow-sm" />
               <div v-else class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <span class="material-symbols-outlined text-3xl">apartment</span>
               </div>
               <div>
                 <h2 class="text-xl font-bold text-gray-900 leading-tight">{{ kontakData.nama_instansi }}</h2>
                 <span class="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1 block">Pemerintah Kabupaten Lebak</span>
               </div>
            </div>

            <div class="flex flex-col gap-6 flex-1">
              <!-- Alamat -->
              <div v-if="kontakData.alamat" class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span class="material-symbols-outlined text-2xl">location_on</span>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900 mb-1">Alamat Kantor</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">{{ kontakData.alamat }}</p>
                </div>
              </div>

              <!-- Telepon -->
              <div v-if="kontakData.telepon" class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <span class="material-symbols-outlined text-2xl">call</span>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900 mb-1">Nomor Telepon</h3>
                  <a :href="'tel:' + kontakData.telepon.replace(/[^0-9+]/g, '')" class="text-gray-600 text-sm hover:text-green-600 font-medium transition-colors">{{ kontakData.telepon }}</a>
                </div>
              </div>

              <!-- Email -->
              <div v-if="kontakData.email" class="flex items-start gap-4 group">
                <div class="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <span class="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900 mb-1">Alamat Email</h3>
                  <a :href="'mailto:' + kontakData.email" class="text-gray-600 text-sm hover:text-orange-600 font-medium transition-colors break-all">{{ kontakData.email }}</a>
                </div>
              </div>
            </div>

            <!-- Sosial Media Terintegrasi -->
            <div class="mt-8 pt-6 border-t border-gray-100">
              <h3 class="text-sm font-bold text-gray-900 mb-4 text-center uppercase tracking-wider">Kanal Digital Kami</h3>
              <div class="flex flex-wrap justify-center gap-3">
                <a v-if="kontakData.whatsapp" :href="kontakData.whatsapp" target="_blank" class="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/40 transition-all" title="WhatsApp">
                  <i class="fab fa-whatsapp text-lg"></i>
                </a>
                <a v-if="kontakData.facebook" :href="kontakData.facebook" target="_blank" class="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/40 transition-all" title="Facebook">
                  <i class="fab fa-facebook-f text-lg"></i>
                </a>
                <a v-if="kontakData.instagram" :href="kontakData.instagram" target="_blank" class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#fd5949] to-[#d6249f] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all" title="Instagram">
                  <i class="fab fa-instagram text-lg"></i>
                </a>
                <a v-if="kontakData.twitter" :href="kontakData.twitter" target="_blank" class="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all" title="Twitter / X">
                  <i class="fab fa-twitter text-lg"></i>
                </a>
                <a v-if="kontakData.youtube" :href="kontakData.youtube" target="_blank" class="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-[#FF0000]/40 transition-all" title="YouTube">
                  <i class="fab fa-youtube text-lg"></i>
                </a>
                <a v-if="kontakData.website" :href="kontakData.website" target="_blank" class="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all" title="Website Utama">
                  <span class="material-symbols-outlined text-[20px]">language</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Peta Interaktif (Kanan) -->
        <div class="lg:col-span-7">
          <div class="bg-white rounded-3xl shadow-lg p-2 border border-gray-100 h-full min-h-[400px] flex flex-col relative overflow-hidden group">
            <div v-if="kontakData.peta_embed" class="w-full h-full rounded-2xl overflow-hidden relative z-10" v-html="kontakData.peta_embed"></div>
            <div v-else class="w-full h-full rounded-2xl bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-8 text-center relative z-10">
              <span class="material-symbols-outlined text-6xl mb-4 text-gray-300">map</span>
              <p class="font-medium text-sm">Peta lokasi belum tersedia untuk instansi ini.</p>
            </div>

            <!-- Overlay Petunjuk (Opsional jika ada link maps murni) -->
            <a v-if="kontakData.maps_link" :href="kontakData.maps_link" target="_blank" class="absolute bottom-6 right-6 z-20 bg-white text-blue-700 font-bold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 hover:bg-blue-50 transition-colors border border-blue-100">
              <span class="material-symbols-outlined text-xl">directions</span> Petunjuk Arah
            </a>
          </div>
        </div>
      </div>

      <!-- State Kosong / Error -->
      <div v-else class="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
        <span class="material-symbols-outlined text-6xl text-gray-300 mb-4 block">error_outline</span>
        <h3 class="text-xl font-bold text-gray-800">Data Kontak Tidak Ditemukan</h3>
        <p class="text-gray-500 mt-2">Maaf, kami tidak dapat memuat informasi kontak saat ini.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const kontakData = ref(null)
const loading = ref(true)

// Ambil OPD ID dari config/env vue jika ada, atau biarkan kosong untuk setda global
// Di lebakkab-frontend, biasanya kita gunakan VITE_OPD_ID
const opdId = import.meta.env.VITE_OPD_ID || '' 

const fetchKontak = async () => {
  loading.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
    const apiKey = import.meta.env.VITE_API_KEY || ''
    
    // Bangun URL
    const url = new URL(`${apiUrl}/kontak`)
    if (opdId) {
      url.searchParams.append('opd_id', opdId)
    }

    const res = await fetch(url.toString(), {
      headers: {
        'x-api-key': apiKey,
        'Accept': 'application/json'
      }
    })
    const json = await res.json()
    if (json.status === 'success') {
      // Pastikan iframe maps responsif dan ukurannya 100%
      let mapEmbed = json.data.peta_embed
      if (mapEmbed) {
        mapEmbed = mapEmbed.replace(/width="[^"]+"/, 'width="100%"')
        mapEmbed = mapEmbed.replace(/height="[^"]+"/, 'height="100%"')
      }
      json.data.peta_embed = mapEmbed
      
      kontakData.value = json.data
    }
  } catch (error) {
    console.error('Gagal mengambil data kontak:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchKontak()
  
  // Update judul halaman
  document.title = 'Kontak Kami - Portal Informasi Lebak'
})
</script>

<style scoped>
/* Tambahkan CSS untuk memastikan isi iframe peta tidak bocor dan proporsional */
:deep(iframe) {
  width: 100% !important;
  height: 100% !important;
  min-height: 400px;
  border: 0;
}
</style>
