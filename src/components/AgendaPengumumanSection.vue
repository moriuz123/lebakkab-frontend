<template>
  <section class="py-8 relative bg-white">
    <!-- Modern & Stylish Background -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full mix-blend-multiply filter blur-[80px]"></div>
      <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-50/50 rounded-full mix-blend-multiply filter blur-[80px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- 3 Columns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <!-- ===========================
             KOLOM 1: Agenda (Tema Biru)
             =========================== -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-6 pb-2 border-b border-gray-200/60">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span class="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Agenda Daerah
            </h2>
          </div>

          <div class="relative w-full h-full min-h-[250px] bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-xl group">
            <!-- Background elements for rich aesthetics -->
            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
            <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl transform group-hover:scale-150 transition-transform duration-700"></div>
            
            <div class="relative z-10">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-inner">
                <Calendar class="w-6 h-6 text-white" />
              </div>
              <h3 class="text-2xl font-black text-white mb-2 leading-tight drop-shadow-sm">
                Jadwal & <br/>Agenda Daerah
              </h3>
              <p class="text-blue-50 text-sm font-medium opacity-90 leading-relaxed max-w-[90%]">
                Pantau terus berbagai kegiatan, rapat, dan acara resmi Pemerintah Kabupaten Lebak.
              </p>
            </div>

            <router-link to="/agenda" class="relative z-10 mt-6 inline-flex items-center justify-between w-full bg-gradient-to-r from-[#e8a020] to-[#d48f10] hover:from-[#c98918] hover:to-[#b3770d] text-[#0a2463] font-black px-5 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#e8a020]/30 active:scale-[0.98] group/btn border border-white/10">
              <span>Jelajahi Agenda</span>
              <ArrowRight class="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform text-[#0a2463]" />
            </router-link>
          </div>
        </div>

        <!-- ===========================
             KOLOM 2: Pengumuman (Orange)
             =========================== -->
        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-6 pb-2 border-b border-gray-200/60">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span class="w-1.5 h-6 bg-orange-500 rounded-full"></span>
              Pengumuman
            </h2>
            <router-link to="/pengumuman" class="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline">Lihat Semua</router-link>
          </div>

          <div v-if="loadingPengumuman.value" class="space-y-4">
            <div v-for="i in 4" :key="i" class="flex gap-4 animate-pulse">
              <div class="w-12 h-14 bg-gray-100 rounded-lg"></div>
              <div class="flex-1 space-y-2"><div class="h-3 bg-gray-100 rounded w-3/4"></div><div class="h-3 bg-gray-100 rounded w-1/2"></div></div>
            </div>
          </div>
          
          <div v-else-if="pengumumanLimited.length === 0" class="py-4 text-gray-500 text-sm font-medium">
            Belum ada pengumuman.
          </div>

          <div v-else class="space-y-5">
            <router-link
              v-for="item in pengumumanLimited"
              :key="item.id"
              :to="`/pengumuman/${item.slug || item.id}`"
              class="group flex items-start gap-4"
            >
              <div class="shrink-0 flex flex-col items-center justify-center w-14 h-[4.5rem] bg-orange-50/50 group-hover:bg-orange-100/50 text-orange-700 rounded-lg transition-colors border border-orange-100/50">
                <span class="text-[10px] font-bold uppercase tracking-widest text-orange-500">{{ formatMonth(item.tgl_pelaksanaan || item.created_at) }}</span>
                <span class="text-xl font-black leading-none my-0.5">{{ formatDay(item.tgl_pelaksanaan || item.created_at) }}</span>
                <span class="text-[9px] font-bold opacity-70">{{ formatYear(item.tgl_pelaksanaan || item.created_at) }}</span>
              </div>
              <h3 class="font-semibold text-sm text-gray-800 leading-snug group-hover:text-orange-600 transition-colors line-clamp-3">
                {{ item.judul || item.title || '—' }}
              </h3>
            </router-link>
          </div>
        </div>

        <!-- ===========================
             KOLOM 3: Kategori Layanan (Emerald)
             =========================== -->
        <div class="flex flex-col md:col-span-2 lg:col-span-1">
          <div class="flex items-center justify-between mb-6 pb-2 border-b border-gray-200/60">
            <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span class="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Layanan Publik
            </h2>
            <router-link to="/layanan" class="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">Semua Layanan</router-link>
          </div>

          <div v-if="loadingKategoriLayanan.value" class="space-y-4">
            <div v-for="i in 4" :key="i" class="flex gap-4 animate-pulse">
              <div class="w-10 h-10 bg-gray-100 rounded-full"></div>
              <div class="flex-1 py-3"><div class="h-3 bg-gray-100 rounded w-1/2"></div></div>
            </div>
          </div>
          
          <div v-else-if="kategoriLayananLimited.length === 0" class="py-4 text-gray-500 text-sm font-medium">
            Belum ada kategori layanan.
          </div>

          <div v-else class="space-y-3">
            <router-link
              v-for="kategori in kategoriLayananLimited"
              :key="kategori.id"
              :to="{ name: 'LayananKategoriPage', params: { slug: kategori.slug } }"
              class="group flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 hover:bg-emerald-50/50 p-2 rounded-xl transition-colors"
            >
              <div class="flex items-center gap-3">
                <div class="shrink-0 w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors overflow-hidden border border-emerald-100">
                   <img v-if="kategori.thumbnail" :src="getStorageUrl(kategori.thumbnail)" class="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert" />
                   <ArrowRight v-else class="w-4 h-4" />
                </div>
                <h3 class="font-semibold text-sm text-gray-800 leading-snug group-hover:text-emerald-600 transition-colors">
                  {{ kategori.nama }}
                </h3>
              </div>
              <span class="text-xs font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                {{ kategori.informasi_layanans_count || 0 }}
              </span>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '@/utils/api'
import dayjs from 'dayjs'
import { ArrowRight, Calendar } from 'lucide-vue-next'
import { getStorageUrl } from '@/utils/helpers'

const pengumuman = ref([])
const kategoriLayanan = ref([])

const loadingPengumuman = ref(true)
const loadingKategoriLayanan = ref(true)
const pengumumanLimited = computed(() => pengumuman.value.slice(0, 4))
const kategoriLayananLimited = computed(() => kategoriLayanan.value.slice(0, 5))

async function fetchPengumuman() {
  loadingPengumuman.value = true
  try {
    let res = await axios.get('/api/pengumuman').catch(() => axios.get('/api/pengumumans'))
    const payload = res?.data?.data || res?.data || []
    pengumuman.value = Array.isArray(payload) ? payload : []
  } catch (err) {
    pengumuman.value = []
  } finally {
    loadingPengumuman.value = false
  }
}

async function fetchKategoriLayanan() {
  loadingKategoriLayanan.value = true
  try {
    const res = await axios.get('/api/kategori-layanan')
    const payload = res?.data?.data || res?.data || []
    kategoriLayanan.value = Array.isArray(payload) ? payload : []
  } catch (err) {
    console.error('Error fetch kategori layanan', err)
    kategoriLayanan.value = []
  } finally {
    loadingKategoriLayanan.value = false
  }
}

const formatDay = (date) => {
  if (!date) return ''
  const d = dayjs(date)
  return d.isValid() ? d.format('D') : ''
}

const formatMonth = (date) => {
  if (!date) return ''
  const d = dayjs(date)
  return d.isValid() ? d.format('MMM') : ''
}

const formatYear = (date) => {
  if (!date) return ''
  const d = dayjs(date)
  return d.isValid() ? d.format('YYYY') : ''
}

onMounted(() => {
  fetchPengumuman()
  fetchKategoriLayanan()
})
</script>
