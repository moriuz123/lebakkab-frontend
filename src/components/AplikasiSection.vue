<template>
  <section class="bg-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-8 h-1 bg-[#1e5ca8] rounded-full"></span>
            <span class="text-[#e8a020] font-bold uppercase tracking-wider text-sm">Layanan Digital</span>
          </div>
          <h2 class="text-3xl font-black text-gray-900 tracking-tight">Aplikasi Daerah</h2>
        </div>
        <router-link to="/aplikasi" class="group flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#e8a020] transition-colors">
          Lihat Semua Aplikasi
          <div class="w-8 h-8 rounded-full bg-gray-50 shadow-sm border border-gray-200 flex items-center justify-center group-hover:border-[#1e5ca8] group-hover:bg-[#f8f9fc] transition-all">
             <ArrowRight class="w-4 h-4" />
          </div>
        </router-link>
      </div>

      <!-- Grid Aplikasi -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="item in aplikasiItems"
          :key="item.id"
          class="group relative bg-white p-6 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-[#1e5ca8] hover:shadow-xl hover:shadow-[#1e5ca8]/10 cursor-pointer transition-all duration-300 flex flex-col items-center text-center overflow-hidden z-10"
          @click="goToLink(item.link)"
          role="link"
          tabindex="0"
          @keyup.enter="goToLink(item.link)"
        >
          <!-- Hover Background Effect -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          
          <div class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-3 mb-4 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
            <img :src="getIconUrl(item.icon)" alt="icon" class="w-full h-full object-contain drop-shadow-sm" />
          </div>
          
          <h3 class="text-gray-800 font-bold text-base leading-snug group-hover:text-[#e8a020] transition-colors">
            {{ item.nama }}
          </h3>
          
          <p v-if="item.deskripsi" class="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {{ item.deskripsi }}
          </p>

          <div class="mt-4 flex items-center gap-1 text-[10px] font-bold text-[#e8a020] uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Akses <ArrowRight class="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '@/utils/api'
import { ArrowRight } from 'lucide-vue-next'

export default {
  name: 'DataAplikasiCards',
  components: {
    ArrowRight
  },
  data() {
    return {
      aplikasiItems: [],
      kategori: 'Aplikasi Layanan Publik',
    }
  },
  mounted() {
    this.fetchDataAplikasi()
  },
  methods: {
    async fetchDataAplikasi() {
      try {
        const response = await axios.get('/api/data-aplikasi', {
          params: { kategori: this.kategori },
        })
        if (response.data?.status === 'success' && Array.isArray(response.data.data)) {
          this.aplikasiItems = response.data.data
        } else if (Array.isArray(response.data)) {
          this.aplikasiItems = response.data
        } else {
          console.warn('API returned unexpected format:', response.data)
        }
      } catch (error) {
        console.error('Gagal fetch data aplikasi:', error)
      }
    },

    getIconUrl(iconPath) {
      if (!iconPath) {
        return '/images/icons/default-app-icon.webp'
      }
      const cleanPath = iconPath.startsWith('/') ? iconPath.substring(1) : iconPath
      return this.$storageUrl(cleanPath)
    },

    goToLink(link) {
      if (link) {
        window.open(link, '_blank')
      }
    },
  },
}
</script>
