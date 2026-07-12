<template>
  <div class="bg-gray-50/50 min-h-screen pb-20">
    <PageHeader title="Profil Pejabat Daerah" subtitle="Pimpinan Pemerintah Kabupaten Lebak" />

    <section class="max-w-7xl mx-auto px-4 py-8 sm:py-16">
      
      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center py-20">
        <div class="page-loading-placeholder">Memuat Data Pejabat...</div>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 shadow-sm max-w-2xl mx-auto">
        <span class="font-bold text-lg">{{ store.error }}</span>
      </div>

      <!-- Content Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <router-link
          v-for="(pejabat, index) in store.pejabats"
          :key="pejabat.id"
          :to="`/profil-pejabat/${pejabat.slug}`"
          class="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-100 transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full"
        >
          <!-- Dekorasi Background Belakang -->
          <div class="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

          <!-- Bagian Foto -->
          <div class="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden z-10">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <img 
              v-if="pejabat.foto" 
              :src="pejabat.foto" 
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
            <h3 class="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
              {{ pejabat.nama }}
            </h3>
            
            <p class="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
              {{ pejabat.deskripsi }}
            </p>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                <Calendar class="w-4 h-4 text-green-500" />
                Periode {{ pejabat.periode }}
              </div>
              <div class="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
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
import PageHeader from '@/components/PageHeader.vue'
import { usePejabatStore } from '@/stores/pejabat'
import { User, ArrowRight, Calendar } from 'lucide-vue-next'

const store = usePejabatStore()

onMounted(() => {
  store.fetchPejabats()
})
</script>
