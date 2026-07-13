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
            <router-link to="/agenda" class="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">Lihat Semua</router-link>
          </div>

          <div v-if="loadingAgenda.value" class="space-y-4">
            <div v-for="i in 4" :key="i" class="flex gap-4 animate-pulse">
              <div class="w-12 h-14 bg-gray-100 rounded-lg"></div>
              <div class="flex-1 space-y-2"><div class="h-3 bg-gray-100 rounded w-3/4"></div><div class="h-3 bg-gray-100 rounded w-1/2"></div></div>
            </div>
          </div>
          
          <div v-else-if="agendasLimited.length === 0" class="py-4 text-gray-500 text-sm font-medium">
            Belum ada agenda.
          </div>

          <div v-else class="space-y-5">
            <router-link
              v-for="item in agendasLimited"
              :key="item.id"
              :to="`/agenda/${item.slug || item.id}`"
              class="group flex items-start gap-4"
            >
              <div class="shrink-0 flex flex-col items-center justify-center w-14 h-[4.5rem] bg-blue-50/50 group-hover:bg-blue-100/50 text-blue-700 rounded-lg transition-colors border border-blue-100/50">
                <span class="text-[10px] font-bold uppercase tracking-widest text-blue-500">{{ formatMonth(item.tanggal_mulai) }}</span>
                <span class="text-xl font-black leading-none my-0.5">{{ formatDay(item.tanggal_mulai) }}</span>
                <span class="text-[9px] font-bold opacity-70">{{ formatYear(item.tanggal_mulai) }}</span>
              </div>
              <h3 class="font-semibold text-sm text-gray-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-3">
                {{ item.judul || item.title || '—' }}
              </h3>
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

          <div v-if="loadingLayanan.value" class="space-y-4">
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
              to="/layanan"
              class="group flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0"
            >
              <div class="shrink-0 w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                 <ArrowRight class="w-4 h-4" />
              </div>
              <h3 class="font-semibold text-sm text-gray-800 leading-snug group-hover:text-emerald-600 transition-colors">
                {{ kategori.nama }}
              </h3>
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
import { ArrowRight } from 'lucide-vue-next'

const agendas = ref([])
const pengumuman = ref([])
const layanan = ref([])

const loadingAgenda = ref(true)
const loadingPengumuman = ref(true)
const loadingLayanan = ref(true)

const agendasLimited = computed(() => agendas.value.slice(0, 4))
const pengumumanLimited = computed(() => pengumuman.value.slice(0, 4))

// Mengambil kategori unik dari daftar layanan berdasarkan relasi kategori_layanan
const kategoriLayananLimited = computed(() => {
  const map = new Map()
  layanan.value.forEach(l => {
    if (l.kategori_layanan && l.kategori_layanan.nama) {
      if (!map.has(l.kategori_layanan.id)) {
        map.set(l.kategori_layanan.id, l.kategori_layanan)
      }
    }
  })
  return Array.from(map.values()).slice(0, 6)
})

async function fetchAgendas() {
  loadingAgenda.value = true
  try {
    const res = await axios.get('/api/agendas').catch(() => axios.get('/api/agenda'))
    const payload = res?.data?.data || res?.data || []
    agendas.value = Array.isArray(payload) ? payload : []
  } catch (err) {
    agendas.value = []
  } finally {
    loadingAgenda.value = false
  }
}

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

async function fetchLayanan() {
  loadingLayanan.value = true
  try {
    const res = await axios.get('/api/layanan')
    const payload = res?.data?.data || res?.data || []
    layanan.value = Array.isArray(payload) ? payload : []
  } catch (err) {
    console.error('Error fetch layanan', err)
    layanan.value = []
  } finally {
    loadingLayanan.value = false
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
  fetchAgendas()
  fetchPengumuman()
  fetchLayanan()
})
</script>
