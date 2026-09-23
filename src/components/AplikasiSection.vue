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
             <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </div>
        </router-link>
      </div>

      <!-- Grid Aplikasi -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in aplikasiItems"
          :key="item.id"
          class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 border-t-4 border-t-[#e8a020] p-6 overflow-hidden transition-all duration-300 min-h-[220px]"
        >
          <!-- Default State (Appears normally, fades out on hover) -->
          <div class="flex flex-col h-full transition-opacity duration-300 group-hover:opacity-0">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center">
                <img
                  :src="getIconUrl(item.icon)"
                  alt="icon"
                  class="w-full h-full object-contain"
                  @error="$event.target.src = 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap gap-1">
                  <span v-for="kat in item.kategori_aplikasi" :key="kat.id" class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-[#1e5ca8]/10 text-[#1e5ca8] border border-[#1e5ca8]/20 uppercase tracking-wide truncate max-w-full">
                    {{ kat.nama }}
                  </span>
                  <span v-if="!item.kategori_aplikasi || item.kategori_aplikasi.length === 0" class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-gray-100 text-gray-500 border border-gray-200 uppercase tracking-wide truncate max-w-full">Tanpa Kategori</span>
                </div>
              </div>
            </div>

            <h3 class="font-bold text-gray-800 text-lg leading-tight line-clamp-2 mb-3" :title="item.nama">{{ item.nama }}</h3>

            <!-- Badges -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wide">
                {{ item.sumber || 'Kementerian / Pusat' }}
              </span>
              
            </div>
          </div>

          <!-- Hover State (Navy Overlay, Description, Button) -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#071840] to-[#0a2463] p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p class="text-white/90 text-sm line-clamp-3 mb-4 text-center flex-1 flex items-center justify-center leading-relaxed">
              {{ item.deskripsi || 'Tidak ada deskripsi tersedia.' }}
            </p>
            <router-link :to="`/aplikasi/${item.slug}`" class="mt-auto w-full text-center bg-[#e8a020] hover:bg-white text-[#071840] font-bold px-4 py-2.5 rounded-xl transition-all border-2 border-transparent hover:border-[#e8a020] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">Detail Aplikasi <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '@/utils/api'

export default {
  name: 'DataAplikasiCards',
  components: {  },
  data() {
    return {
      aplikasiItems: [],
    }
  },
  mounted() {
    this.fetchDataAplikasi()
  },
  methods: {
    async fetchDataAplikasi() {
      try {
        const response = await axios.get('/api/data-aplikasi', {
          // get top 8 newest
          params: { page: 1 }, 
        })
        if (response.data?.status === 'success' && response.data.data?.data) {
          this.aplikasiItems = response.data.data.data.slice(0, 8)
        } else if (response.data?.status === 'success' && Array.isArray(response.data.data)) {
          this.aplikasiItems = response.data.data.slice(0, 8)
        } else if (Array.isArray(response.data)) {
          this.aplikasiItems = response.data.slice(0, 8)
        } else {
          console.warn('API returned unexpected format:', response.data)
        }
      } catch (error) {
        console.error('Gagal fetch data aplikasi:', error)
      }
    },

    getIconUrl(iconPath) {
      if (!iconPath) {
        return 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'
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
