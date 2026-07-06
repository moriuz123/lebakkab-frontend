<template>
  <div>
    <!-- ✅ Page Header -->
    <PageHeader
      title="Berita"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Berita', link: '/berita' },
      ]"
    />

    <!-- ✅ Layout konten & sidebar -->
    <div class="max-w-screen-xl mx-auto px-4 py-8 lg:flex lg:space-x-8">
      <!-- Konten utama -->
      <div class="lg:w-3/4">
        <!-- Loading state -->
        <div v-if="store.loading" class="text-gray-500 text-center py-8">Memuat berita...</div>

        <!-- ✅ Filter Kategori Berita -->
        <div class="mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          <div class="flex space-x-2">
            <router-link
              to="/berita"
              class="inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="{
                'bg-green-600 text-white': $route.path === '/berita',
                'bg-gray-100 text-gray-700 hover:bg-gray-200': $route.path !== '/berita'
              }"
            >
              Semua
            </router-link>
            
            <router-link
              v-for="cat in kategoriList"
              :key="cat.id"
              :to="`/berita/kategori/${cat.slug}`"
              class="inline-block px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {{ cat.nama }}
            </router-link>
          </div>
        </div>

        <!-- Jika kosong -->
        <div v-else-if="store.beritas.length === 0" class="text-gray-500 text-center py-8">
          Tidak ada berita tersedia.
        </div>

        <!-- ✅ Daftar Berita -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NewsCard
            v-for="berita in store.beritas"
            :key="berita.id"
            :judul="berita.judul || 'Tidak ada judul'"
            :slug="berita.slug || ''"
            :thumbnail="berita.image || berita.thumbnail || ''"
            :tanggal="berita.tanggal_publish || berita.tanggal || 'Tanggal tidak tersedia'"
            :kategori="berita.kategori?.nama || berita.kategori_nama || 'Umum'"
            :excerpt="
              berita.excerpt ||
              (berita.konten
                ? stripHtml(berita.konten).slice(0, 120) + '...'
                : 'Tidak ada ringkasan')
            "
          />
        </div>

        <!-- ✅ Pagination Navigasi -->
        <div v-if="pagination.last_page > 1" class="flex justify-center items-center mt-10 space-x-4">
          <button 
            @click="changePage(pagination.current_page - 1)" 
            :disabled="pagination.current_page === 1"
            class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Sebelumnya
          </button>
          
          <span class="text-gray-600 font-medium">
            Halaman {{ pagination.current_page }} dari {{ pagination.last_page }}
          </span>

          <button 
            @click="changePage(pagination.current_page + 1)" 
            :disabled="pagination.current_page === pagination.last_page"
            class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Selanjutnya
          </button>
        </div>
      </div>

      <!-- ✅ Sidebar -->
      <aside class="lg:w-1/4 mt-8 lg:mt-0">
        <SidebarNews />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/api'
import { useBeritaStore } from '@/stores/useBeritaStore'
import PageHeader from '@/components/PageHeader.vue'
import NewsCard from '@/components/NewsCard.vue'
import SidebarNews from '@/components/SidebarNews.vue'

const store = useBeritaStore()
const pagination = ref({ current_page: 1, last_page: 1 })
const kategoriList = ref([])

// 🔹 Fungsi bersihkan HTML
const stripHtml = (html) => {
  if (!html) return ''
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// 🔹 Ambil Kategori Berita
const fetchKategori = async () => {
  try {
    const res = await axios.get('/api/kategori-berita')
    kategoriList.value = res.data || []
  } catch (err) {
    console.error('Gagal memuat kategori:', err)
  }
}

// 🔹 Ambil semua berita (dengan pagination)
const fetchBerita = async (page = 1) => {
  store.loading = true
  try {
    const res = await axios.get(`/api/berita?page=${page}`)
    store.beritas = res.data.data || res.data || []
    
    // Set status pagination
    pagination.value = {
      current_page: res.data.current_page || 1,
      last_page: res.data.last_page || 1
    }
    
    // Scroll ke atas dengan halus jika pindah halaman
    if (page > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (err) {
    console.error('Gagal memuat berita:', err)
    store.error = err.response?.data?.message || 'Gagal memuat berita'
  } finally {
    store.loading = false
  }
}

// 🔹 Ganti Halaman
const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= pagination.value.last_page) {
    fetchBerita(newPage)
  }
}

onMounted(() => {
  fetchKategori()
  fetchBerita(1)
})
</script>
