<template>
  <div class="bg-gray-50/50 min-h-screen pb-20">
    <PageHeader2 :title="store.pejabatDetail?.nama || 'Profil Pejabat'" :subtitle="store.pejabatDetail?.jabatan || 'Pemerintah Kabupaten Lebak'" />

    <section class="max-w-5xl mx-auto px-4 py-8 sm:py-16">
      
      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center py-20">
        <div class="page-loading-placeholder">Memuat Detail Profil...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 shadow-sm max-w-2xl mx-auto">
        <span class="font-bold text-lg">{{ store.error }}</span>
        <div class="mt-4">
          <router-link to="/profil-pejabat" class="inline-block px-6 py-2.5 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
            Kembali
          </router-link>
        </div>
      </div>

      <!-- Detail Layout -->
      <div v-else-if="store.pejabatDetail" class="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        <!-- Kolom Foto Kiri -->
        <div class="md:w-5/12 lg:w-2/5 relative bg-gradient-to-b from-blue-50 to-white flex-shrink-0">
          <div class="absolute inset-0 z-0 opacity-30 mix-blend-multiply bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0a2463] via-transparent to-transparent"></div>
          
          <div class="relative z-10 w-full h-full min-h-[400px] flex items-end justify-center pt-10 px-8 pb-0">
            <img 
              v-if="store.pejabatDetail.foto || store.pejabatDetail.foto_url"
              :src="store.pejabatDetail.foto_url || getStorageUrl(store.pejabatDetail.foto)"
              :alt="store.pejabatDetail.nama"
              class="w-full max-w-[280px] h-auto object-cover object-bottom drop-shadow-2xl filter contrast-105"
            />
            <div v-else class="w-full h-[400px] flex flex-col items-center justify-center text-gray-300 pb-10">
              <User class="w-32 h-32 mb-4 opacity-50" />
              <span class="font-medium text-lg">Foto Resmi</span>
            </div>
          </div>
        </div>

        <!-- Kolom Data Kanan -->
        <div class="md:w-7/12 lg:w-3/5 p-8 sm:p-12 lg:p-14 relative z-10">
          <div class="inline-block px-4 py-1.5 rounded-full bg-emerald-900 text-[#e8a020] font-extrabold text-xs tracking-widest uppercase mb-4 shadow-sm border border-[#1e5ca8]">
            {{ store.pejabatDetail.jabatan }}
          </div>
          
          <h2 class="text-3xl sm:text-4xl font-black text-gray-900 mb-2 leading-tight">
            {{ store.pejabatDetail.nama }}
          </h2>
          
          <p class="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
            <Calendar class="w-4 h-4 text-[#e8a020]" />
            Periode Masa Jabatan: <span class="text-gray-800">{{ store.pejabatDetail.periode }}</span>
          </p>

          <div class="flex flex-wrap gap-4 mb-8">
            <div v-if="store.pejabatDetail.nip" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-sm font-medium text-gray-600">
              <BadgeCheck class="w-4 h-4 text-blue-500" />
              NIP: <span class="text-gray-900">{{ store.pejabatDetail.nip }}</span>
            </div>
            <div v-if="store.pejabatDetail.pangkat_golongan" class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-sm font-medium text-gray-600">
              <Star class="w-4 h-4 text-yellow-500" />
              Pangkat/Golongan: <span class="text-gray-900">{{ store.pejabatDetail.pangkat_golongan }}</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="w-16 h-1 bg-[#1e5ca8] rounded-full mb-8"></div>

          <!-- Section Deskripsi -->
          <div class="mb-10">
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Info class="w-4 h-4" /> Tentang
            </h3>
            <div class="prose prose-blue max-w-none text-gray-700 leading-relaxed font-medium bg-gray-50/50 p-6 rounded-2xl border border-gray-100" v-html="store.pejabatDetail.pesan_singkat || store.pejabatDetail.deskripsi || 'Tidak ada deskripsi'">
            </div>
          </div>

          <!-- Grid Info Spesifik -->
          <div class="grid grid-cols-1 gap-10 mb-10">
            <!-- Pendidikan -->
            <div>
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <GraduationCap class="w-4 h-4" /> Pendidikan
              </h3>
              <div class="prose prose-sm sm:prose-base prose-blue max-w-none text-gray-800 font-medium leading-snug" v-html="store.pejabatDetail.riwayat_pendidikan || store.pejabatDetail.pendidikan || 'Tidak ada data pendidikan'">
              </div>
            </div>
            
            <!-- Karir -->
            <div>
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Briefcase class="w-4 h-4" /> Riwayat Karir
              </h3>
              <div class="prose prose-sm sm:prose-base prose-blue max-w-none text-gray-800 font-medium leading-snug" v-html="store.pejabatDetail.riwayat_jabatan || store.pejabatDetail.karir || 'Tidak ada data riwayat karir'">
              </div>
            </div>
          </div>
          
          <!-- Sosial Media (Jika ada) -->
          <div v-if="(store.pejabatDetail.social_media || store.pejabatDetail.sosmed) && Object.keys(store.pejabatDetail.social_media || store.pejabatDetail.sosmed).length > 0" class="pt-8 border-t border-gray-100 flex items-center gap-4">
            <span class="text-sm font-bold text-gray-500">Kanal Resmi:</span>
            <div class="flex gap-3">
              <a v-if="(store.pejabatDetail.social_media || store.pejabatDetail.sosmed).instagram" :href="(store.pejabatDetail.social_media || store.pejabatDetail.sosmed).instagram" target="_blank" class="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all shadow-sm transform hover:scale-110">
                <Instagram class="w-5 h-5" />
              </a>
              <a v-if="(store.pejabatDetail.social_media || store.pejabatDetail.sosmed).twitter" :href="(store.pejabatDetail.social_media || store.pejabatDetail.sosmed).twitter" target="_blank" class="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white hover:border-transparent transition-all shadow-sm transform hover:scale-110">
                <Twitter class="w-5 h-5" />
              </a>
              <a v-if="(store.pejabatDetail.social_media || store.pejabatDetail.sosmed).facebook" :href="(store.pejabatDetail.social_media || store.pejabatDetail.sosmed).facebook" target="_blank" class="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all shadow-sm transform hover:scale-110">
                <Facebook class="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div class="mt-12 flex justify-start">
             <router-link to="/profil-pejabat" class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
               <ArrowLeft class="w-4 h-4" /> Kembali ke Daftar
             </router-link>
          </div>

        </div>

      </div>

    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader2 from '@/components/PageHeader2.vue'
import { usePejabatStore } from '@/stores/pejabat'
import { getStorageUrl } from '@/utils/helpers'
import { User, Calendar, Info, GraduationCap, Briefcase, Instagram, Twitter, Facebook, ArrowLeft, BadgeCheck, Star } from 'lucide-vue-next'

const store = usePejabatStore()
const route = useRoute()

onMounted(() => {
  store.fetchPejabatBySlug(route.params.slug)
})
</script>
