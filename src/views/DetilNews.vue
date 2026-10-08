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
                <Icon name="lucide:calendar" class="w-4 h-4 text-[#e8a020]" />
                {{ formatDate(store.beritaDetail.tanggal_publish, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:eye" class="w-4 h-4 text-[#e8a020]" />
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

          <!-- Fitur Share Standar Enterprise -->
          <EnterpriseShare
            :title="store.beritaDetail.judul"
            :excerpt="excerptText"
          />

          <!-- Fitur Berita Terkait dengan Navigasi dan Thumbnail -->
          <RelatedNewsSlider
            :items="store.beritaDetail.related || []"
          />
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
import { useSeo } from '@/composables/useSeo'
import SidebarNews from '../components/SidebarNews.vue'
import PageHeader2 from '../components/PageHeader2.vue'
import EnterpriseShare from '../components/EnterpriseShare.vue'
import RelatedNewsSlider from '../components/RelatedNewsSlider.vue'
import { formatDate } from '@/utils/helpers'

const route = useRoute()
const store = useBeritaStore()

const excerptText = computed(() => {
  if (!store.beritaDetail?.konten) return ''
  return store.beritaDetail.konten.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 160).trim() + '...'
})

// Fungsi untuk load berita berdasarkan slug
const loadBerita = (slug) => {
  if (slug) store.fetchBeritaDetail(slug)
}

// Enterprise SEO: Title, OpenGraph, Twitter, and Schema.org NewsArticle
useSeo({
  title: computed(() => store.beritaDetail?.judul ? `${store.beritaDetail.judul} - Berita Lebak` : 'Memuat Berita...'),
  description: excerptText,
  image: computed(() => store.beritaDetail?.image || '/images/logo.png'),
  url: computed(() => `https://lebakkab.go.id/berita/${route.params.slug}`),
  type: 'article',
  author: computed(() => store.beritaDetail?.penulis || store.beritaDetail?.opd?.nama || 'Pemerintah Kabupaten Lebak'),
  publishedTime: computed(() => store.beritaDetail?.tanggal_publish || store.beritaDetail?.created_at || null),
  schema: computed(() => {
    if (!store.beritaDetail?.judul) return null
    const articleUrl = `https://lebakkab.go.id/berita/${route.params.slug}`
    const imageUrl = store.beritaDetail?.image || 'https://lebakkab.go.id/images/logo.png'
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'NewsArticle',
          '@id': `${articleUrl}#article`,
          'isPartOf': {
            '@type': 'WebPage',
            '@id': articleUrl,
            'url': articleUrl,
            'name': store.beritaDetail.judul
          },
          'headline': store.beritaDetail.judul,
          'description': excerptText.value,
          'image': [imageUrl],
          'datePublished': store.beritaDetail.tanggal_publish || store.beritaDetail.created_at,
          'dateModified': store.beritaDetail.updated_at || store.beritaDetail.created_at,
          'mainEntityOfPage': articleUrl,
          'author': {
            '@type': 'Person',
            'name': store.beritaDetail.penulis || 'Redaksi Portal Lebak'
          },
          'publisher': {
            '@type': 'GovernmentOrganization',
            'name': 'Pemerintah Daerah Kabupaten Lebak',
            'url': 'https://lebakkab.go.id',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://lebakkab.go.id/images/logo.png'
            }
          },
          'articleSection': store.beritaDetail.kategori?.nama || 'Berita Daerah'
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${articleUrl}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Beranda',
              'item': 'https://lebakkab.go.id'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Berita',
              'item': 'https://lebakkab.go.id/berita'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': store.beritaDetail.judul,
              'item': articleUrl
            }
          ]
        }
      ]
    }
  })
})

// Jalankan saat pertama kali halaman dibuka
onMounted(() => loadBerita(route.params.slug))

// Jalankan ulang bila slug berubah
watch(
  () => route.params.slug,
  (slug) => loadBerita(slug),
)
</script>
