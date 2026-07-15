<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/api'
import SidebarStatic from '../components/SidebarStatic.vue'
import PageHeader from '../components/PageHeader.vue'

const route = useRoute()
const page = ref(null)
const loading = ref(true)

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
