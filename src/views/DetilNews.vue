<template>
  <div>
    <!-- ✅ Header -->
    <PageHeader
      :title="store.beritaDetail?.judul || 'Detail Berita'"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Berita', link: '/berita' },
        { label: store.beritaDetail?.judul || 'Detail', link: '#' },
      ]"
    />

    <!-- ✅ Konten Utama + Sidebar -->
    <div class="page-container">
      <div v-if="!store.loading && store.beritaDetail" class="page-main">
        <article class="bg-white shadow-md rounded-lg p-6 prose max-w-none">
          <!-- Thumbnail -->
          <img
            v-if="store.beritaDetail.image"
            :src="store.beritaDetail.image"
            alt="Thumbnail Berita"
            class="w-full aspect-video md:aspect-[21/9] object-cover rounded-xl shadow-sm mb-8"
          />

          <!-- Tanggal & Views -->
          <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
            <p>
              {{ formatDate(store.beritaDetail.tanggal_publish, { weekday: 'long', month: 'long' }) }}
            </p>
            <p class="text-gray-600">👁️ Dilihat: {{ store.beritaDetail.views ?? 0 }} kali</p>
          </div>

          <!-- Isi Konten -->
          <div v-html="store.beritaDetail.konten" class="leading-relaxed text-gray-700"></div>
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
