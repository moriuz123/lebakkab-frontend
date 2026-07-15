<template>
  <div class="bg-gray-50/50 min-h-screen pb-20 font-sans selection:bg-[#1e5ca8] selection:text-white">
    
    <!-- PageHeader2 -->
    <PageHeader2
      title="Profil Pejabat Daerah"
      subtitle="Mengenal pimpinan dan jajaran pejabat Pemerintah Kabupaten Lebak yang berdedikasi melayani masyarakat."
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Pemerintah Daerah', link: '/profil-pejabat' }
      ]"
    />

    <!-- Main Content Container -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
      
      <!-- Loading State -->
      <div v-if="store.loading" class="flex flex-col items-center justify-center py-20 gap-4 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/50 min-h-[400px]">
        <div class="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
        <p class="text-gray-500 font-semibold animate-pulse">Memuat Data Pejabat...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50/90 backdrop-blur-md text-red-600 p-10 rounded-[2.5rem] text-center border border-red-100 shadow-xl max-w-2xl mx-auto mt-10">
        <span class="font-bold text-xl">{{ store.error }}</span>
      </div>

      <!-- Content Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <router-link
          v-for="(pejabat, index) in store.pejabats"
          :key="pejabat.id"
          :to="`/profil-pejabat/${pejabat.slug}`"
          class="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl hover:shadow-[#1e5ca8]/10 hover:border-[#1e5ca8] transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full"
        >
          <!-- Dekorasi Background Belakang -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

          <!-- Bagian Foto -->
          <div class="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden z-10">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <img 
              v-if="pejabat.foto || pejabat.foto_url" 
              :src="pejabat.foto_url || getStorageUrl(pejabat.foto)" 
              :alt="pejabat.nama"
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-400 group-hover:scale-105 transition-transform duration-700">
              <User class="w-20 h-20 mb-2 opacity-50" />
              <span class="text-sm font-medium">Belum ada foto</span>
            </div>

            <!-- Badge Jabatan Absolute -->
            <div class="absolute bottom-4 left-4 right-4 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span class="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold text-xs px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">
                {{ pejabat.jabatan }}
              </span>
            </div>
          </div>

          <!-- Bagian Text & Info -->
          <div class="p-6 relative z-10 flex flex-col flex-grow bg-white group-hover:bg-transparent transition-colors duration-500">
            <h3 class="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-[#e8a020] transition-colors line-clamp-2">
              {{ pejabat.nama }}
            </h3>
            
            <p class="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
              {{ pejabat.pesan_singkat || pejabat.deskripsi }}
            </p>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                <Calendar class="w-4 h-4 text-[#e8a020]" />
                Periode {{ pejabat.periode }}
              </div>
              <div class="w-8 h-8 rounded-full bg-[#f8f9fc] text-[#e8a020] flex items-center justify-center group-hover:bg-[#0a2463] group-hover:text-white transition-colors duration-300">
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </div>
          
        </router-link>

      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePejabatStore } from '@/stores/pejabat'
import { getStorageUrl } from '@/utils/helpers'
import PageHeader2 from '@/components/PageHeader2.vue'
import { User, Calendar, ArrowRight } from 'lucide-vue-next'

const store = usePejabatStore()

onMounted(() => {
  store.fetchPejabats()
})
</script>
