<template>
  <div class="bg-gray-50 min-h-screen pb-16">
    <PageHeader2 
      title="Detail Aplikasi" 
      subtitle="Informasi lengkap mengenai aplikasi dan layanan digital."
      :breadcrumbs="[
        { label: 'Beranda', link: '/' },
        { label: 'Aplikasi', link: '/aplikasi' },
        { label: app ? app.nama : 'Detail', link: '#' },
      ]"
    />

    <div class="max-w-4xl mx-auto px-4 py-8 mt-6">
      <div v-if="loading" class="text-center py-12">
        <p class="text-gray-500">Memuat detail aplikasi...</p>
      </div>

      <div v-else-if="error" class="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <p class="text-red-500 font-medium">{{ error }}</p>
        <router-link to="/aplikasi" class="mt-4 inline-block text-[#1e5ca8] hover:underline">
          Kembali ke Daftar Aplikasi
        </router-link>
      </div>

      <div v-else-if="app" class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <!-- Banner/Header -->
        <div class="bg-gradient-to-r from-[#0a2463] to-[#1e5ca8] p-8 md:p-12 relative">
          <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
          <div class="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div class="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-white rounded-3xl p-4 shadow-2xl flex items-center justify-center">
              <img
                :src="app.icon ? $storageUrl(app.icon) : 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'"
                alt="icon"
                class="w-full h-full object-contain"
                @error="$event.target.src = 'https://media.lebakkab.go.id/lebakkab-media/settings/c6FknsB1zB1bIsIrn4y9uNGzvTnzUU-metaMTY0ODQ1MjQ5MF9hNmJlMTlkMTIwMjk0YjE5NjBkNy5wbmc=-.png'"
              />
            </div>
            <div class="text-center md:text-left flex-1">
              <h1 class="text-3xl md:text-4xl font-black text-white mb-2">{{ app.nama }}</h1>
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                <span v-for="kat in app.kategori_aplikasi" :key="kat.id" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                  {{ kat.nama }}
                </span>
              </div>
              <p class="text-blue-100/90 text-sm md:text-base mb-6 max-w-2xl leading-relaxed">
                {{ app.deskripsi || 'Tidak ada deskripsi tersedia untuk aplikasi ini.' }}
              </p>
              
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a v-if="app.link" :href="app.link" target="_blank" class="px-6 py-2.5 bg-[#e8a020] hover:bg-white text-[#0a2463] font-bold rounded-xl transition-colors shadow-lg flex items-center gap-2">
                  <Icon name="lucide:globe" class="w-5 h-5" /> Kunjungi Website
                </a>
                <a v-if="app.url_playstore" :href="app.url_playstore" target="_blank" class="px-6 py-2.5 bg-white hover:bg-gray-100 text-[#0a2463] font-bold rounded-xl transition-colors shadow-lg flex items-center gap-2">
                  <Icon name="logos:google-play-icon" class="w-5 h-5" /> Play Store
                </a>
                <a v-if="app.url_appstore" :href="app.url_appstore" target="_blank" class="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-colors shadow-lg flex items-center gap-2">
                  <Icon name="logos:apple" class="w-5 h-5" /> App Store
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Details Content -->
        <div class="p-8 md:p-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="lucide:tags" class="w-5 h-5 text-[#1e5ca8]" /> Subkategori Layanan
              </h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="sub in app.subkategori_aplikasi" :key="sub.id" class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 border border-amber-100">
                  {{ sub.nama }}
                </span>
                <span v-if="!app.subkategori_aplikasi || app.subkategori_aplikasi.length === 0" class="text-gray-500 italic text-sm">
                  Tidak ada subkategori terdaftar
                </span>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="lucide:info" class="w-5 h-5 text-[#1e5ca8]" /> Informasi Tambahan
              </h3>
              <ul class="space-y-4">
                <li class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon name="lucide:building-2" class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">OPD Pelaksana</p>
                    <p class="text-sm font-bold text-gray-900">{{ app.opd_pelaksana || '-' }}</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon name="lucide:server" class="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 font-medium">Sumber Aplikasi</p>
                    <p class="text-sm font-bold text-gray-900">{{ app.sumber || '-' }}</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/utils/api'
import PageHeader2 from '@/components/PageHeader2.vue'
import { Icon } from '@iconify/vue'

const route = useRoute()
const app = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchApp = async () => {
  try {
    const response = await axios.get(`/api/data-aplikasi/${route.params.id}`)
    if (response.data?.status === 'success') {
      app.value = response.data.data
    } else {
      error.value = 'Data aplikasi tidak ditemukan'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Gagal memuat detail aplikasi'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchApp()
})
</script>
