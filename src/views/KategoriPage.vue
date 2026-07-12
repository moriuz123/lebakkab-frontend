<template>
  <div>
    <!-- ✅ Page Header -->
    <PageHeader
      :title="`Berita Kategori: ${kategoriSlug}`"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Berita', link: '/berita' },
        { label: kategoriSlug, link: `/berita/kategori/${kategoriSlug}` },
      ]"
    />

    <!-- ✅ Layout konten & sidebar -->
    <div class="page-container">
      <!-- Konten utama -->
      <main class="page-main">
        <!-- Loading state -->
        <div v-if="store.loading" class="page-loading-placeholder">Memuat berita...</div>

        <!-- Jika kosong -->
        <div v-else-if="store.beritas.length === 0" class="text-gray-500 text-center py-8">
          Tidak ada berita di kategori ini.
        </div>

        <!-- ✅ Daftar Berita -->
        <div v-else class="news-grid">
          <NewsCard
            v-for="berita in store.beritas"
            :key="berita.id"
            :judul="berita.judul"
            :slug="berita.slug"
            :thumbnail="
              berita.image?.includes('/storage') ? berita.image : $storageUrl(berita.image)
            "
            :konten="berita.konten"
            :tanggal="berita.tanggal_publish"
            :kategori="berita.kategori?.nama || kategoriSlug"
            :excerpt="
              berita.excerpt ||
              (berita.konten
                ? stripHtml(berita.konten).slice(0, 120) + '...'
                : 'Tidak ada ringkasan')
            "
          />
        </div>

        <!-- ✅ Pagination Navigasi -->
        <PaginationNav
          v-if="pagination.last_page > 1"
          :current-page="pagination.current_page"
          :total-pages="pagination.last_page"
          @update:page="changePage"
        />
      </main>

      <!-- ✅ Sidebar -->
      <aside class="page-sidebar">
        <SidebarNews />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/api'
import { useBeritaStore } from '@/stores/useBeritaStore'
import PageHeader from '@/components/PageHeader.vue'
import NewsCard from '@/components/NewsCard.vue'
import SidebarNews from '@/components/SidebarNews.vue'
import PaginationNav from '@/components/PaginationNav.vue'

const route = useRoute()
const store = useBeritaStore()
const kategoriSlug = ref(route.params.slug)
const pagination = ref({ current_page: 1, last_page: 1 })

// 🔹 Fungsi bersihkan HTML
const stripHtml = (html) => {
  if (!html) return ''
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// Ambil berita berdasarkan kategori
const fetchKategoriBerita = async (slug, page = 1) => {
  store.loading = true
  try {
    const res = await axios.get(`/api/berita/kategori/${slug}?page=${page}`)
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
    console.error('Gagal memuat berita kategori:', err)
    store.error = err.response?.data?.message || 'Gagal memuat berita kategori'
  } finally {
    store.loading = false
  }
}

// 🔹 Ganti Halaman
const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= pagination.value.last_page) {
    fetchKategoriBerita(kategoriSlug.value, newPage)
  }
}

// Fetch pertama kali
onMounted(() => {
  fetchKategoriBerita(kategoriSlug.value, 1)
})

// Watch saat slug berubah (misal pindah kategori)
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      kategoriSlug.value = newSlug
      fetchKategoriBerita(newSlug, 1) // reset ke halaman 1
    }
  },
)
</script>
