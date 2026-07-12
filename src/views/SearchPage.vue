<template>
  <div class="min-h-screen bg-gray-50 pb-12">
    <!-- Page Header -->
    <PageHeader
      title="Hasil Pencarian"
      subtitle="Cari dan temukan informasi berita, layanan, dokumen, hingga agenda pemerintahan daerah dengan mudah"
    />

    <div class="container mx-auto px-4 md:px-6 lg:px-8 mt-[-3rem] relative z-10">
      <!-- Form Pencarian -->
      <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-2 flex items-center mb-10 ring-1 ring-black/5">
        <div class="pl-4 text-gray-400">
          <Search class="w-6 h-6" />
        </div>
        <form @submit.prevent="doSearch" class="flex-grow flex">
          <input
            v-model="q"
            type="text"
            placeholder="Ketik kata kunci pencarian..."
            class="w-full px-4 py-4 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800 text-lg placeholder-gray-400"
          />
          <button
            type="submit"
            class="px-8 py-4 bg-green-600 hover:bg-green-700 transition-colors text-white font-medium rounded-xl flex items-center gap-2"
          >
            <span>Cari</span>
          </button>
        </form>
      </div>

      <!-- Hasil Pencarian -->
      <div class="max-w-6xl mx-auto">
        <div v-if="q && !loading" class="mb-8 flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-800">
            Hasil Pencarian untuk <span class="text-green-600">"{{ q }}"</span>
          </h1>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="page-loading-placeholder">
          Mencari informasi...
        </div>

        <div v-else>
          <div v-if="hasResults" class="space-y-12">
            <!-- Berita -->
            <div v-if="results.berita && results.berita.length">
              <div class="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-200">
                <div class="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Newspaper class="w-6 h-6" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Berita</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{{ results.berita.length }}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link v-for="item in results.berita" :key="item.id" :to="`/berita/${item.slug}`" class="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 p-5">
                  <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2" v-html="highlightText(item.judul, q)"></h3>
                  <div class="mt-auto flex items-center text-sm text-gray-500 font-medium pt-4">
                    <span>Baca selengkapnya</span>
                    <ArrowRight class="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </router-link>
              </div>
            </div>

            <!-- Dokumen -->
            <div v-if="results.dokumen && results.dokumen.length">
              <div class="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-200">
                <div class="bg-red-100 p-2 rounded-lg text-red-600">
                  <FileText class="w-6 h-6" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Dokumen</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{{ results.dokumen.length }}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link v-for="item in results.dokumen" :key="item.id" :to="`/dokumen/${item.slug}`" class="group flex items-start p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300">
                  <div class="bg-gray-50 p-3 rounded-lg mr-4 group-hover:bg-red-50 transition-colors flex-shrink-0">
                    <FileText class="w-6 h-6 text-gray-400 group-hover:text-red-500" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2" v-html="highlightText(item.judul, q)"></h3>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- OPD -->
            <div v-if="results.opd && results.opd.length">
              <div class="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-200">
                <div class="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <Building2 class="w-6 h-6" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Perangkat Daerah (OPD)</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{{ results.opd.length }}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link v-for="item in results.opd" :key="item.id" :to="`/opd/${item.slug}`" class="group flex items-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                  <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
                    <Building2 class="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 class="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors" v-html="highlightText(item.nama, q)"></h3>
                </router-link>
              </div>
            </div>

            <!-- Pengumuman -->
            <div v-if="results.pengumuman && results.pengumuman.length">
              <div class="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-200">
                <div class="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                  <Megaphone class="w-6 h-6" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Pengumuman</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{{ results.pengumuman.length }}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link v-for="item in results.pengumuman" :key="item.id" :to="`/pengumuman/${item.slug}`" class="group relative p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all duration-300 overflow-hidden flex flex-col justify-center">
                  <div class="absolute top-0 left-0 w-1 h-full bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h3 class="font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors line-clamp-2" v-html="highlightText(item.judul, q)"></h3>
                </router-link>
              </div>
            </div>

            <!-- Agenda -->
            <div v-if="results.agenda && results.agenda.length">
              <div class="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-200">
                <div class="bg-purple-100 p-2 rounded-lg text-purple-600">
                  <CalendarDays class="w-6 h-6" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Agenda</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{{ results.agenda.length }}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link v-for="item in results.agenda" :key="item.id" :to="`/agenda/${item.slug}`" class="group flex flex-col p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300">
                  <h3 class="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 mb-4" v-html="highlightText(item.judul, q)"></h3>
                  <div class="mt-auto flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                    <CalendarDays class="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                    <span class="truncate">{{ item.tanggal_mulai }} <template v-if="item.tanggal_selesai"> - {{ item.tanggal_selesai }}</template></span>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- Layanan -->
            <div v-if="results.layanan && results.layanan.length">
              <div class="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-200">
                <div class="bg-teal-100 p-2 rounded-lg text-teal-600">
                  <Briefcase class="w-6 h-6" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Layanan</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{{ results.layanan.length }}</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <router-link v-for="item in results.layanan" :key="item.id" :to="`/layanan/${item.id}`" class="group flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300">
                  <div class="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform">
                    <Briefcase class="w-7 h-7 text-teal-500" />
                  </div>
                  <h3 class="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors" v-html="highlightText(item.judul, q)"></h3>
                </router-link>
              </div>
            </div>

            <!-- Aplikasi -->
            <div v-if="results.aplikasi && results.aplikasi.length">
              <div class="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-200">
                <div class="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <LayoutGrid class="w-6 h-6" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Aplikasi</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{{ results.aplikasi.length }}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link v-for="item in results.aplikasi" :key="item.id" :to="`/aplikasi/${item.slug}`" class="group flex flex-col p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
                  <div class="flex items-center mb-3">
                    <div class="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <LayoutGrid class="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 class="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors" v-html="highlightText(item.nama, q)"></h3>
                  </div>
                  <p class="text-sm text-gray-500 line-clamp-2 mt-auto" v-html="highlightText(item.deskripsi, q)"></p>
                </router-link>
              </div>
            </div>

            <!-- Kecamatan -->
            <div v-if="results.kecamatan && results.kecamatan.length">
              <div class="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-200">
                <div class="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <MapPin class="w-6 h-6" />
                </div>
                <h2 class="text-xl font-bold text-gray-800">Kecamatan</h2>
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{{ results.kecamatan.length }}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <router-link v-for="item in results.kecamatan" :key="item.id" :to="`/kecamatan/${item.slug}`" class="group p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-col">
                  <div class="flex items-center mb-2">
                    <MapPin class="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
                    <h3 class="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors" v-html="highlightText(item.nama, q)"></h3>
                  </div>
                  <p class="text-sm text-gray-500 line-clamp-2 ml-7 mt-auto" v-html="highlightText(item.keterangan, q)"></p>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="q && !hasResults" class="flex flex-col items-center justify-center py-20 text-center">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <SearchX class="w-12 h-12 text-gray-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Hasil tidak ditemukan</h3>
            <p class="text-gray-500 max-w-md mx-auto">
              Maaf, kami tidak dapat menemukan hasil untuk kata kunci <span class="font-semibold text-gray-800">"{{ q }}"</span>. Coba gunakan kata kunci lain yang lebih umum.
            </p>
          </div>
          
          <div v-else-if="!q" class="flex flex-col items-center justify-center py-20 text-center">
            <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <Search class="w-12 h-12 text-green-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Mulai Pencarian</h3>
            <p class="text-gray-500 max-w-md mx-auto">
              Ketikkan kata kunci di kolom pencarian di atas untuk menemukan informasi, berita, dokumen, layanan, dan lainnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/utils/api'
import PageHeader from '@/components/PageHeader.vue'
import { 
  Search, 
  SearchX, 
  Loader2, 
  Newspaper, 
  FileText, 
  Building2, 
  Megaphone, 
  CalendarDays, 
  Briefcase, 
  LayoutGrid, 
  MapPin,
  ArrowRight
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const q = ref(route.query.q || '')
const results = ref({
  berita: [],
  dokumen: [],
  opd: [],
  layanan: [],
  pengumuman: [],
  agenda: [],
  aplikasi: [],
  kecamatan: [],
})
const loading = ref(false)

const hasResults = computed(
  () =>
    (results.value.berita && results.value.berita.length > 0) ||
    (results.value.dokumen && results.value.dokumen.length > 0) ||
    (results.value.opd && results.value.opd.length > 0) ||
    (results.value.layanan && results.value.layanan.length > 0) ||
    (results.value.pengumuman && results.value.pengumuman.length > 0) ||
    (results.value.agenda && results.value.agenda.length > 0) ||
    (results.value.aplikasi && results.value.aplikasi.length > 0) ||
    (results.value.kecamatan && results.value.kecamatan.length > 0)
)

const highlightText = (text, query) => {
  if (!query || !text) return text
  // Escape query for regex
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${safeQuery})`, 'gi')
  return text.toString().replace(regex, '<mark class="bg-yellow-200 text-yellow-900 rounded px-1 font-semibold">$1</mark>')
}

const fetchResults = async () => {
  if (!q.value) return
  loading.value = true
  try {
    const res = await axios.get(`/api/search?q=${encodeURIComponent(q.value)}`)
    results.value = res.data
  } catch (err) {
    console.error('Gagal mencari:', err)
  } finally {
    loading.value = false
  }
}

const doSearch = () => {
  if (q.value.trim()) {
    router.push({ name: 'SearchPage', query: { q: q.value } })
  }
}

watch(
  () => route.query.q,
  (newQ) => {
    q.value = newQ || ''
    if (q.value) {
      fetchResults()
    } else {
      results.value = {
        berita: [],
        dokumen: [],
        opd: [],
        layanan: [],
        pengumuman: [],
        agenda: [],
        aplikasi: [],
        kecamatan: [],
      }
    }
  },
)

onMounted(() => {
  if (q.value) {
    fetchResults()
  }
})
</script>
