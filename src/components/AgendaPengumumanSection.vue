<template>
  <section class="py-12 relative overflow-hidden bg-slate-50">
    <!-- Modern & Stylish Background -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[80px] -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-400/20 rounded-full mix-blend-multiply filter blur-[80px] translate-y-1/3"></div>
      <div class="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full mix-blend-multiply filter blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- 3 Columns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- ===========================
             KOLOM 1: Agenda (Tema Biru)
             =========================== -->
        <div class="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div class="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="w-6 h-1 bg-blue-500 rounded-full"></span>
                <span class="text-blue-600 font-bold uppercase tracking-widest text-[10px]">Kegiatan</span>
              </div>
              <h2 class="text-2xl font-black text-slate-900 tracking-tight">Agenda</h2>
            </div>
            <router-link to="/agenda" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 border border-slate-200 hover:border-blue-200 flex items-center justify-center transition-all">
               <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>

          <div v-if="loadingAgenda.value" class="space-y-3">
            <div v-for="i in 4" :key="i" class="flex gap-4 p-3 rounded-2xl bg-slate-50/50 animate-pulse">
              <div class="w-14 h-16 bg-slate-200 rounded-xl"></div>
              <div class="flex-1 py-1 space-y-2"><div class="h-3 bg-slate-200 rounded w-3/4"></div><div class="h-3 bg-slate-200 rounded w-1/2"></div></div>
            </div>
          </div>
          
          <div v-else-if="agendasLimited.length === 0" class="text-center py-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <p class="text-slate-500 text-sm font-medium">Belum ada agenda.</p>
          </div>

          <div v-else class="space-y-3">
            <router-link
              v-for="item in agendasLimited"
              :key="item.id"
              :to="`/agenda/${item.slug || item.id}`"
              class="group flex items-center gap-4 p-3 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div class="shrink-0 w-14 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-200 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:border-blue-400 transition-all duration-300">
                <span class="text-[9px] font-bold text-slate-500 group-hover:text-blue-100 uppercase">{{ formatMonth(item.tanggal_mulai) }}</span>
                <span class="text-xl font-black text-blue-600 group-hover:text-white leading-none my-0.5">{{ formatDay(item.tanggal_mulai) }}</span>
              </div>
              <h3 class="font-bold text-sm text-slate-700 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {{ item.judul || item.title || '—' }}
              </h3>
            </router-link>
          </div>
        </div>

        <!-- ===========================
             KOLOM 2: Pengumuman (Orange)
             =========================== -->
        <div class="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div class="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="w-6 h-1 bg-orange-500 rounded-full"></span>
                <span class="text-orange-600 font-bold uppercase tracking-widest text-[10px]">Informasi</span>
              </div>
              <h2 class="text-2xl font-black text-slate-900 tracking-tight">Pengumuman</h2>
            </div>
            <router-link to="/pengumuman" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-600 border border-slate-200 hover:border-orange-200 flex items-center justify-center transition-all">
               <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>

          <div v-if="loadingPengumuman.value" class="space-y-3">
            <div v-for="i in 4" :key="i" class="flex gap-4 p-3 rounded-2xl bg-slate-50/50 animate-pulse">
              <div class="w-14 h-16 bg-slate-200 rounded-xl"></div>
              <div class="flex-1 py-1 space-y-2"><div class="h-3 bg-slate-200 rounded w-3/4"></div><div class="h-3 bg-slate-200 rounded w-1/2"></div></div>
            </div>
          </div>
          
          <div v-else-if="pengumumanLimited.length === 0" class="text-center py-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <p class="text-slate-500 text-sm font-medium">Belum ada pengumuman.</p>
          </div>

          <div v-else class="space-y-3">
            <router-link
              v-for="item in pengumumanLimited"
              :key="item.id"
              :to="`/pengumuman/${item.slug || item.id}`"
              class="group flex items-center gap-4 p-3 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300"
            >
              <div class="shrink-0 w-14 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-200 group-hover:from-orange-400 group-hover:to-orange-500 group-hover:border-orange-400 transition-all duration-300">
                <span class="text-[9px] font-bold text-slate-500 group-hover:text-orange-100 uppercase">{{ formatMonth(item.tgl_pelaksanaan || item.created_at) }}</span>
                <span class="text-xl font-black text-orange-500 group-hover:text-white leading-none my-0.5">{{ formatDay(item.tgl_pelaksanaan || item.created_at) }}</span>
              </div>
              <h3 class="font-bold text-sm text-slate-700 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                {{ item.judul || item.title || '—' }}
              </h3>
            </router-link>
          </div>
        </div>

        <!-- ===========================
             KOLOM 3: Layanan (Emerald)
             =========================== -->
        <div class="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:col-span-2 lg:col-span-1">
          <div class="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="w-6 h-1 bg-emerald-500 rounded-full"></span>
                <span class="text-emerald-600 font-bold uppercase tracking-widest text-[10px]">Publik</span>
              </div>
              <h2 class="text-2xl font-black text-slate-900 tracking-tight">Layanan</h2>
            </div>
            <router-link to="/layanan" class="w-8 h-8 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 border border-slate-200 hover:border-emerald-200 flex items-center justify-center transition-all">
               <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>

          <div v-if="loadingLayanan.value" class="space-y-3">
            <div v-for="i in 4" :key="i" class="flex gap-4 p-3 rounded-2xl bg-slate-50/50 animate-pulse">
              <div class="w-14 h-16 bg-slate-200 rounded-xl"></div>
              <div class="flex-1 py-1 space-y-2"><div class="h-3 bg-slate-200 rounded w-3/4"></div><div class="h-3 bg-slate-200 rounded w-1/2"></div></div>
            </div>
          </div>
          
          <div v-else-if="layananLimited.length === 0" class="text-center py-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <p class="text-slate-500 text-sm font-medium">Belum ada layanan.</p>
          </div>

          <div v-else class="space-y-3">
            <router-link
              v-for="item in layananLimited"
              :key="item.id"
              :to="`/layanan/${item.id}`"
              class="group flex items-center gap-4 p-3 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
            >
              <div class="shrink-0 w-14 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex flex-col items-center justify-center border border-slate-200 group-hover:from-emerald-400 group-hover:to-emerald-500 group-hover:border-emerald-400 transition-all duration-300">
                 <Briefcase class="w-6 h-6 text-emerald-500 group-hover:text-white mb-1" />
                 <span class="text-[8px] font-bold text-slate-400 group-hover:text-emerald-100 uppercase tracking-widest">Akses</span>
              </div>
              <h3 class="font-bold text-sm text-slate-700 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                {{ item.judul || item.title || '—' }}
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
import { ArrowRight, Briefcase } from 'lucide-vue-next'

const agendas = ref([])
const pengumuman = ref([])
const layanan = ref([])

const loadingAgenda = ref(true)
const loadingPengumuman = ref(true)
const loadingLayanan = ref(true)

const agendasLimited = computed(() => agendas.value.slice(0, 4))
const pengumumanLimited = computed(() => pengumuman.value.slice(0, 4))
const layananLimited = computed(() => layanan.value.slice(0, 4))

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

onMounted(() => {
  fetchAgendas()
  fetchPengumuman()
  fetchLayanan()
})
</script>
