<template>
  <div>
    <!-- ✅ Header -->
    <PageHeader2
      title="Berita Daerah"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Berita', link: '/berita' },
        { label: store.beritaDetail?.judul || 'Detail', link: '#' },
      ]"
    />

    <!-- ✅ Konten Utama + Sidebar -->
    <div class="page-container">
      <div v-if="!store.loading && store.beritaDetail" class="page-main">
        <article class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 md:p-10 mb-8">
          <!-- Judul & Meta Informasi -->
          <div class="mb-8 border-b border-gray-100 pb-8">
            <div class="mb-4">
              <span class="inline-block bg-blue-50 text-[#1e5ca8] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-blue-100">
                {{ store.beritaDetail.kategori?.nama || 'Berita' }}
              </span>
            </div>
            
            <h1 class="text-2xl md:text-[28px] font-extrabold text-gray-900 leading-snug mb-5">
              {{ store.beritaDetail.judul }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4 text-[#e8a020]" />
                {{ formatDate(store.beritaDetail.tanggal_publish, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
              <div class="flex items-center gap-2">
                <Eye class="w-4 h-4 text-[#e8a020]" />
                Dilihat {{ store.beritaDetail.views ?? 0 }} kali
              </div>
            </div>
          </div>

          <!-- Thumbnail -->
          <div v-if="store.beritaDetail.image" class="relative rounded-2xl overflow-hidden mb-10 shadow-sm group">
            <img
              :src="store.beritaDetail.image"
              alt="Thumbnail Berita"
              class="w-full aspect-[16/9] md:aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
          </div>

          <!-- Isi Konten -->
          <div v-html="store.beritaDetail.konten" class="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-[#1e5ca8] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"></div>
        </article>
      </div>

      <!-- ✅ Sidebar -->
      <aside class="page-sidebar" v-if="!store.loading">
        <SidebarNews />
      </aside>
    </div>

    <!-- ✅ Loading State -->
    <div v-if="store.loading" class="page-loading-placeholder">Memuat detail berita...</div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBeritaStore } from '../stores/useBeritaStore'
import { useHead } from '@vueuse/head'
import { Calendar, Eye } from 'lucide-vue-next'
import SidebarNews from '../components/SidebarNews.vue'
import PageHeader from '../components/PageHeader.vue'
import { formatDate } from '@/utils/helpers'

const route = useRoute()
const store = useBeritaStore()

// Fungsi untuk load berita berdasarkan slug
const loadBerita = (slug) => {
  if (slug) store.fetchBeritaDetail(slug)
}

useHead({
  title: computed(() => store.beritaDetail?.judul ? `${store.beritaDetail.judul} - Berita` : 'Memuat Berita...'),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        if (!store.beritaDetail?.konten) return ''
        return store.beritaDetail.konten.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'
      })
    },
    {
      property: 'og:title',
      content: computed(() => store.beritaDetail?.judul || '')
    },
    {
      property: 'og:image',
      content: computed(() => store.beritaDetail?.image || '')
    }
  ]
})

// Jalankan saat pertama kali halaman dibuka
onMounted(() => loadBerita(route.params.slug))

// Jalankan ulang bila slug berubah
watch(
  () => route.params.slug,
  (slug) => loadBerita(slug),
)
</script>
