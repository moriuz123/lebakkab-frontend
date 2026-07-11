<template>
  <section class="py-16 bg-white relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        <!-- ===========================
             KIRI: Agenda (Tema Biru)
             =========================== -->
        <div>
          <!-- Header Agenda -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="w-8 h-1 bg-blue-500 rounded-full"></span>
                <span class="text-blue-600 font-bold uppercase tracking-wider text-sm">Kegiatan</span>
              </div>
              <h2 class="text-3xl font-black text-gray-900 tracking-tight">Agenda Daerah</h2>
            </div>
            <router-link to="/agenda" class="group flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
              Semua Agenda
              <div class="w-8 h-8 rounded-full bg-gray-50 shadow-sm border border-gray-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
                 <ArrowRight class="w-4 h-4" />
              </div>
            </router-link>
          </div>

          <!-- Loading State -->
          <div v-if="loadingAgenda.value" class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex gap-4 p-4 rounded-3xl bg-gray-50 animate-pulse">
              <div class="w-16 h-20 bg-gray-200 rounded-2xl"></div>
              <div class="flex-1 py-2 space-y-3"><div class="h-4 bg-gray-200 rounded w-3/4"></div><div class="h-4 bg-gray-200 rounded w-1/2"></div></div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="agendasLimited.length === 0" class="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p class="text-gray-500 font-medium">Belum ada agenda tersedia.</p>
          </div>

          <!-- List Agenda -->
          <div v-else class="space-y-4">
            <router-link
              v-for="item in agendasLimited"
              :key="item.id"
              :to="`/agenda/${item.slug || item.id}`"
              class="group flex items-center gap-5 p-3 pr-5 bg-white rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex-shrink-0 w-16 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex flex-col items-center justify-center shadow-inner group-hover:scale-105 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300 text-blue-600 border border-blue-200 group-hover:border-blue-400">
                <span class="text-[10px] font-bold uppercase tracking-widest">{{ formatMonth(item.tanggal_mulai) }}</span>
                <span class="text-2xl font-black leading-none my-0.5">{{ formatDay(item.tanggal_mulai) }}</span>
                <span class="text-[10px] font-bold opacity-80">{{ formatYear(item.tanggal_mulai) }}</span>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {{ item.judul || item.title || '—' }}
                </h3>
              </div>
            </router-link>
          </div>
        </div>

        <!-- ===========================
             KANAN: Pengumuman (Tema Orange)
             =========================== -->
        <div>
          <!-- Header Pengumuman -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-gray-100 pb-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="w-8 h-1 bg-orange-500 rounded-full"></span>
                <span class="text-orange-600 font-bold uppercase tracking-wider text-sm">Informasi</span>
              </div>
              <h2 class="text-3xl font-black text-gray-900 tracking-tight">Pengumuman</h2>
            </div>
            <router-link to="/pengumuman" class="group flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-orange-600 transition-colors">
              Semua Pengumuman
              <div class="w-8 h-8 rounded-full bg-gray-50 shadow-sm border border-gray-200 flex items-center justify-center group-hover:border-orange-200 group-hover:bg-orange-50 transition-all">
                 <ArrowRight class="w-4 h-4" />
              </div>
            </router-link>
          </div>

          <!-- Loading State -->
          <div v-if="loadingPengumuman.value" class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex gap-4 p-4 rounded-3xl bg-gray-50 animate-pulse">
              <div class="w-16 h-20 bg-gray-200 rounded-2xl"></div>
              <div class="flex-1 py-2 space-y-3"><div class="h-4 bg-gray-200 rounded w-3/4"></div><div class="h-4 bg-gray-200 rounded w-1/2"></div></div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="pengumumanLimited.length === 0" class="text-center py-10 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p class="text-gray-500 font-medium">Belum ada pengumuman tersedia.</p>
          </div>

          <!-- List Pengumuman -->
          <div v-else class="space-y-4">
            <router-link
              v-for="item in pengumumanLimited"
              :key="item.id"
              :to="`/pengumuman/${item.slug || item.id}`"
              class="group flex items-center gap-5 p-3 pr-5 bg-white rounded-3xl border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div class="flex-shrink-0 w-16 h-20 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex flex-col items-center justify-center shadow-inner group-hover:scale-105 group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white transition-all duration-300 text-orange-600 border border-orange-200 group-hover:border-orange-400">
                <span class="text-[10px] font-bold uppercase tracking-widest">{{ formatMonth(item.tgl_pelaksanaan || item.created_at) }}</span>
                <span class="text-2xl font-black leading-none my-0.5">{{ formatDay(item.tgl_pelaksanaan || item.created_at) }}</span>
                <span class="text-[10px] font-bold opacity-80">{{ formatYear(item.tgl_pelaksanaan || item.created_at) }}</span>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
                  {{ item.judul || item.title || '—' }}
                </h3>
              </div>
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

const loadingAgenda = ref(true)
const loadingPengumuman = ref(true)

const agendasLimited = computed(() => agendas.value.slice(0, 5))
const pengumumanLimited = computed(() => pengumuman.value.slice(0, 5))

async function fetchAgendas() {
  loadingAgenda.value = true
  try {
    let res = null
    const urls = ['/api/agendas', '/api/agenda']
    for (const u of urls) {
      try {
        res = await axios.get(u)
        if (res) break
      } catch (e) {
        res = null
      }
    }
    const payload = res ? (Array.isArray(res.data) ? res.data : (res.data?.data ?? [])) : []
    agendas.value = Array.isArray(payload) ? payload : []
  } catch (err) {
    console.error('Error fetch agendas', err)
    agendas.value = []
  } finally {
    loadingAgenda.value = false
  }
}

async function fetchPengumuman() {
  loadingPengumuman.value = true
  try {
    let res = null
    const urls = ['/api/pengumuman', '/api/pengumumans', '/api/announcements']
    for (const u of urls) {
      try {
        res = await axios.get(u)
        if (res) break
      } catch (e) {
        res = null
      }
    }

    if (!res) {
      pengumuman.value = []
      return
    }

    let payload = []
    if (Array.isArray(res.data)) {
      payload = res.data
    } else if (Array.isArray(res.data?.data)) {
      payload = res.data.data
    } else {
      payload = []
    }

    pengumuman.value = Array.isArray(payload) ? payload : []
  } catch (err) {
    console.error('Error fetch pengumuman', err)
    pengumuman.value = []
  } finally {
    loadingPengumuman.value = false
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
})
</script>
