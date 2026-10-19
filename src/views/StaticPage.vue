<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/api'
import { useSeo } from '@/composables/useSeo'
import SidebarStatic from '../components/SidebarStatic.vue'
import PageHeader2 from '../components/PageHeader2.vue'

const route = useRoute()
const page = ref(null)
const loading = ref(true)

const excerptText = computed(() => {
  if (!page.value?.isi) return ''
  return page.value.isi.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').substring(0, 160).trim() + '...'
})

// 🔹 Yoast SEO Support for Static Page
useSeo({
  seo: computed(() => page.value?.seo || {}),
  title: computed(() => page.value?.judul ? `${page.value.judul} - Kabupaten Lebak` : 'Memuat Halaman...'),
  description: excerptText,
  image: computed(() => page.value?.cover || '/images/logo.png'),
  url: computed(() => `https://lebakkab.go.id/page/${route.params.slug}`),
  schemaType: 'WebPage',
})

const loadPage = async (slug) => {
  loading.value = true
  try {
    const { data } = await axios.get(`/api/halaman-statis/${slug}`)
    if (data.status === 'success') {
      page.value = data.data
    }
  } catch (err) {
    console.error('Gagal memuat halaman statis:', err)
  } finally {
    loading.value = false
  }
}

// 🔹 Saat pertama kali mount
onMounted(() => {
  loadPage(route.params.slug)
})

// 🔹 Watch perubahan slug agar isi halaman otomatis diperbarui
watch(
  () => route.params.slug,
  (newSlug) => {
    loadPage(newSlug)
  },
)
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="page-loading-placeholder">Memuat konten...</div>

    <!-- Halaman Statis -->
    <div v-else-if="page">
      <!-- Header -->
      <PageHeader2 :title="page.judul" />

      <div class="page-container">
        <!-- Konten Utama -->
        <div class="page-main">
          <article class="page-content prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800">
            <div v-html="page.isi" class="text-gray-800 leading-relaxed"></div>
          </article>
        </div>

        <!-- Sidebar -->
        <aside class="page-sidebar">
          <SidebarStatic />
        </aside>
      </div>
    </div>

    <!-- Jika Tidak Ada Konten -->
    <div v-else class="text-center py-20 text-gray-500">Halaman tidak ditemukan.</div>
  </div>
</template>
