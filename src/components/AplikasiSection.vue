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
          class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 overflow-hidden transition-all duration-300 min-h-[220px]"
        >
          <!-- Default State (Appears normally, fades out on hover) -->
          <div class="flex flex-col h-full transition-opacity duration-300 group-hover:opacity-0">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-16 h-16 shrink-0 bg-gray-50 rounded-2xl p-2 border border-gray-100 flex items-center justify-center">
                <img
                  :src="getIconUrl(item.icon)"
                  alt="icon"
                  class="w-full h-full object-contain"
                  @error="$event.target.src = 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-800 text-lg leading-tight line-clamp-2" :title="item.nama">{{ item.nama }}</h3>
                <p class="text-xs text-gray-500 mt-1 line-clamp-2" :title="item.kategori_aplikasi?.nama">
                  {{ item.kategori_aplikasi?.nama || 'Tanpa Kategori' }}
                </p>
              </div>
            </div>

            <!-- Badges -->
            <div class="flex flex-wrap gap-2 mt-auto">
              <span v-if="item.sumber" class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                {{ item.sumber }}
              </span>
              <span v-if="item.subkategori_aplikasi" class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide truncate max-w-full">
                {{ item.subkategori_aplikasi.nama }}
              </span>
            </div>
          </div>

          <!-- Hover State (Navy Overlay, Description, Button) -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#071840] to-[#0a2463] p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <p class="text-white/90 text-sm line-clamp-3 mb-4 text-center flex-1 flex items-center justify-center leading-relaxed">
              {{ item.deskripsi || 'Tidak ada deskripsi tersedia.' }}
            </p>
            <div class="mt-auto flex flex-col gap-2">
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center bg-[#e8a020] hover:bg-white text-[#071840] font-bold px-4 py-2 rounded-xl transition-all border-2 border-transparent hover:border-[#e8a020] flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                Website
              </a>
              <a
                v-if="item.url_playstore"
                :href="item.url_playstore"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center bg-white hover:bg-gray-100 text-[#071840] font-bold px-4 py-2 rounded-xl transition-all border-2 border-transparent flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                Play Store
              </a>
              <a
                v-if="item.url_appstore"
                :href="item.url_appstore"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center bg-black hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-xl transition-all border-2 border-transparent flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                App Store
              </a>
            </div>
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
