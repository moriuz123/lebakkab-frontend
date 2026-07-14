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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in aplikasiItems"
          :key="item.id"
          class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 overflow-hidden transition-all duration-300 min-h-[180px]"
        >
          <!-- Default State (Appears normally, fades out on hover) -->
          <div class="flex flex-col h-full transition-opacity duration-300 group-hover:opacity-0">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center">
                <img
                  :src="getIconUrl(item.icon)"
                  alt="icon"
                  class="w-full h-full object-contain"
                  @error="$event.target.src = '/images/default-layanan.jpg'"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-800 text-lg truncate" :title="item.nama">{{ item.nama }}</h3>
                <p class="text-sm text-gray-500 truncate" :title="item.kategori || 'Aplikasi Layanan Publik'">{{ item.kategori || 'Aplikasi Layanan Publik' }}</p>
              </div>
            </div>

            <!-- Badges -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-if="item.jenis" class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                {{ item.jenis }}
              </span>
              <span v-else class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                Website
              </span>
            </div>
          </div>

          <!-- Hover State (Navy Overlay, Description, Button) -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#071840] to-[#0a2463] p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p class="text-white/90 text-sm line-clamp-3 mb-4 text-center flex-1 flex items-center justify-center leading-relaxed">
              {{ item.deskripsi || 'Tidak ada deskripsi tersedia.' }}
            </p>
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-auto block w-full text-center bg-[#e8a020] hover:bg-white text-[#071840] font-bold px-4 py-2.5 rounded-xl transition-all border-2 border-transparent hover:border-[#e8a020] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Buka Aplikasi
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
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
