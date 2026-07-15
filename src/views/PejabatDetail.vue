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

      <!-- Detail Layout (Sticky Sidebar + Scrollable Content) -->
      <div v-else-if="store.pejabatDetail" class="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start relative z-20">
        
        <!-- Kolom Kiri: Sticky Profile Card -->
        <div class="w-full lg:w-1/3 lg:sticky lg:top-24 bg-white rounded-3xl shadow-xl shadow-[#1e5ca8]/5 border border-gray-100/60 overflow-hidden flex flex-col group">
          
          <div class="relative bg-gradient-to-b from-[#0a2463] to-[#1e5ca8] pt-12 px-8 flex justify-center overflow-hidden">
            <!-- Decorative circle -->
            <div class="absolute inset-0 z-0">
               <div class="absolute top-0 right-0 w-64 h-64 bg-[#e8a020] rounded-full mix-blend-screen filter blur-[80px] opacity-30 translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <img 
              v-if="store.pejabatDetail.foto || store.pejabatDetail.foto_url"
              :src="store.pejabatDetail.foto_url || getStorageUrl(store.pejabatDetail.foto)"
              :alt="store.pejabatDetail.nama"
              class="relative z-10 w-full max-w-[220px] h-auto object-cover object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)] filter contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div v-else class="relative z-10 w-full h-[300px] flex flex-col items-center justify-center text-white/50 pb-8">
              <User class="w-24 h-24 mb-4" />
              <span class="font-medium text-sm">Foto Resmi</span>
            </div>
          </div>

          <div class="p-8 text-center bg-white relative z-20">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#1e5ca8] font-bold text-xs tracking-wider uppercase mb-5 border border-blue-100 shadow-sm">
              {{ store.pejabatDetail.jabatan }}
            </div>
            
            <h2 class="text-2xl font-black text-gray-900 mb-2 leading-snug group-hover:text-[#e8a020] transition-colors">
              {{ store.pejabatDetail.nama }}
            </h2>
            
            <div class="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>

            <div class="space-y-4 text-left">
              <div v-if="store.pejabatDetail.periode" class="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#1e5ca8]/30 transition-colors">
                <div class="w-10 h-10 rounded-xl bg-orange-50 text-[#e8a020] flex items-center justify-center shrink-0">
                   <Calendar class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-400 uppercase mb-0.5">Periode Jabatan</p>
                  <p class="font-semibold text-gray-900">{{ store.pejabatDetail.periode }}</p>
                </div>
              </div>

              <div v-if="store.pejabatDetail.nip" class="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#1e5ca8]/30 transition-colors">
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                   <BadgeCheck class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-400 uppercase mb-0.5">NIP</p>
                  <p class="font-semibold text-gray-900">{{ store.pejabatDetail.nip }}</p>
                </div>
              </div>

              <div v-if="store.pejabatDetail.pangkat_golongan" class="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#1e5ca8]/30 transition-colors">
                <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                   <Star class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-xs font-bold text-gray-400 uppercase mb-0.5">Pangkat / Golongan</p>
                  <p class="font-semibold text-gray-900">{{ store.pejabatDetail.pangkat_golongan }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Main Content (Scrolls) -->
        <div class="w-full lg:w-2/3 space-y-8">
          
          <!-- Section Deskripsi / Tentang -->
          <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 sm:p-12 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-40 h-40 bg-gray-50 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2"></div>
            
            <div class="flex items-center gap-4 mb-8 relative z-10">
              <div class="w-14 h-14 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center border border-gray-100 shadow-sm group-hover:bg-[#1e5ca8] group-hover:text-white transition-colors duration-500">
                <Info class="w-7 h-7" />
              </div>
              <h3 class="text-2xl font-black text-gray-900">Tentang Pejabat</h3>
            </div>
            
            <div class="prose prose-lg prose-blue max-w-none text-gray-600 leading-loose relative z-10" v-html="store.pejabatDetail.pesan_singkat || store.pejabatDetail.deskripsi || 'Tidak ada deskripsi tersedia.'">
            </div>
          </div>

          <!-- Section Pendidikan & Karir -->
          <div class="grid grid-cols-1 gap-8">
            <!-- Pendidikan -->
            <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 sm:p-12 relative overflow-hidden group">
              <div class="absolute bottom-0 right-0 w-40 h-40 bg-blue-50 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-1/2 translate-x-1/2"></div>
              
              <div class="flex items-center gap-4 mb-8 relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                  <GraduationCap class="w-7 h-7" />
                </div>
                <h3 class="text-2xl font-black text-gray-900">Riwayat Pendidikan</h3>
              </div>
              
              <div class="prose prose-blue max-w-none text-gray-700 leading-relaxed relative z-10" v-html="store.pejabatDetail.riwayat_pendidikan || store.pejabatDetail.pendidikan || 'Tidak ada data pendidikan.'">
              </div>
            </div>
            
            <!-- Karir -->
            <div class="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 p-8 sm:p-12 relative overflow-hidden group">
              <div class="absolute bottom-0 left-0 w-40 h-40 bg-orange-50 rounded-full filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-1/2 -translate-x-1/2"></div>
              
              <div class="flex items-center gap-4 mb-8 relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
                  <Briefcase class="w-7 h-7" />
                </div>
                <h3 class="text-2xl font-black text-gray-900">Riwayat Karir & Jabatan</h3>
              </div>
              
              <div class="prose prose-orange max-w-none text-gray-700 leading-relaxed relative z-10" v-html="store.pejabatDetail.riwayat_jabatan || store.pejabatDetail.karir || 'Tidak ada data riwayat karir.'">
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
