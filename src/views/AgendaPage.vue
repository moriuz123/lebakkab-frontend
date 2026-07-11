<template>
  <PageHeader title="Agenda Kegiatan" />
  <div class="max-w-7xl mx-auto px-4 py-8 sm:py-12">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Bagian Kiri: Konten Utama (Daftar Agenda) -->
      <div class="lg:col-span-2">
        <!-- Filter Section -->
        <div class="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-primary-50 text-primary-600 rounded-xl border border-primary-100">
              <CalendarDays class="w-6 h-6" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900 leading-tight">Daftar Agenda</h2>
              <p class="text-sm text-gray-500 mt-0.5">Jadwal kegiatan & acara pemerintahan</p>
            </div>
          </div>
          
          <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div class="relative flex-1 md:w-40">
              <label class="absolute -top-2 left-3 bg-white px-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider rounded-sm transition-colors duration-200">Dari Tanggal</label>
              <input type="date" v-model="startDate" class="w-full border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-gray-50/50 hover:bg-white transition-all outline-none shadow-inner" />
            </div>
            <div class="hidden md:block text-gray-300">
              <ArrowRight class="w-4 h-4" />
            </div>
            <div class="relative flex-1 md:w-40">
              <label class="absolute -top-2 left-3 bg-white px-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider rounded-sm transition-colors duration-200">Sampai Tanggal</label>
              <input type="date" v-model="endDate" class="w-full border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-gray-50/50 hover:bg-white transition-all outline-none shadow-inner" />
            </div>
            
            <button v-if="startDate || endDate" @click="startDate = ''; endDate = ''" class="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors border border-transparent hover:border-red-100" title="Reset Filter">
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Skeleton Loading -->
        <div v-if="agendaStore.loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="animate-pulse flex items-center gap-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div class="w-[70px] h-[70px] bg-gray-100 rounded-xl"></div>
            <div class="flex-1 space-y-3">
              <div class="h-5 bg-gray-100 rounded w-3/4"></div>
              <div class="h-4 bg-gray-50 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="agendaStore.error" class="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
          <p class="font-medium">{{ agendaStore.error }}</p>
          <button @click="agendaStore.fetchAgendas()" class="mt-3 text-sm font-semibold bg-white text-red-600 px-5 py-2.5 rounded-xl border border-red-200 hover:bg-red-50 transition-colors shadow-sm">
            Coba Lagi
          </button>
        </div>

        <!-- Agenda List -->
        <div v-else class="space-y-4">
          <router-link
            v-for="agenda in filteredAgendas"
            :key="agenda.id"
            :to="`/agenda/${agenda.id}`"
            class="group block bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-400 to-primary-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center ml-2">
              <div class="flex-shrink-0 bg-primary-50/70 rounded-xl p-3 text-center min-w-[70px] border border-primary-100/50 group-hover:bg-primary-100 transition-colors">
                <span class="block text-primary-600 font-extrabold text-xs uppercase tracking-widest mb-1">{{ getMonthShort(agenda.tanggal_mulai) }}</span>
                <span class="block text-gray-900 font-black text-2xl leading-none">{{ getDay(agenda.tanggal_mulai) }}</span>
              </div>
              
              <div class="flex-1 min-w-0 w-full">
                <h3 class="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2 pr-4">
                  {{ agenda.judul }}
                </h3>
                
                <div class="flex flex-col sm:flex-row flex-wrap sm:items-center gap-x-5 gap-y-2 text-sm text-gray-600">
                  <div class="flex items-center gap-1.5 font-medium bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                    <Clock class="w-4 h-4 text-primary-500" />
                    <span v-if="agenda.opsi_waktu_selesai === 'selesai'">
                      {{ agenda.waktu_mulai ? agenda.waktu_mulai.slice(0, 5) : '-' }} WIB - Selesai
                    </span>
                    <span v-else-if="agenda.waktu_selesai">
                      {{ agenda.waktu_mulai ? agenda.waktu_mulai.slice(0, 5) : '-' }} - {{ agenda.waktu_selesai.slice(0, 5) }} WIB
                    </span>
                    <span v-else>
                      {{ agenda.waktu_mulai ? agenda.waktu_mulai.slice(0, 5) : '-' }} WIB
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-1.5">
                    <MapPin class="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span class="truncate max-w-full sm:max-w-[250px] text-gray-500">{{ agenda.lokasi }}</span>
                  </div>
                </div>
              </div>
              
              <div class="hidden sm:flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 border border-gray-100 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300">
                <ArrowRight class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </router-link>

          <!-- Empty State -->
          <div v-if="filteredAgendas.length === 0" class="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-gray-100 border-dashed text-center">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <CalendarX2 class="w-8 h-8" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-1">Tidak Ada Agenda</h3>
            <p class="text-gray-500 max-w-sm">Maaf, kami tidak menemukan agenda pemerintahan pada rentang tanggal yang Anda pilih.</p>
            <button v-if="startDate || endDate" @click="startDate = ''; endDate = ''" class="mt-6 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 px-5 py-2.5 rounded-xl transition-colors">
              Hapus Filter Tanggal
            </button>
          </div>
        </div>
      </div>

      <!-- Bagian Kanan: Sidebar Widget -->
      <div class="lg:col-span-1 space-y-6">
        
        <!-- Widget 1: Agenda Mendatang (Selalu Tampil) -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 sticky top-6">
          <h3 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
            <CalendarDays class="w-5 h-5 text-primary-500" />
            Agenda Terdekat
          </h3>
          
          <div v-if="agendaStore.loading" class="animate-pulse space-y-4">
            <div v-for="i in 3" :key="i" class="h-16 bg-gray-100 rounded-xl"></div>
          </div>
          
          <div v-else class="space-y-3">
            <router-link
              v-for="agenda in upcomingAgendas"
              :key="'side-'+agenda.id"
              :to="`/agenda/${agenda.id}`"
              class="group block p-3 rounded-xl hover:bg-primary-50 transition-all duration-300 border border-transparent hover:border-primary-100"
            >
              <div class="flex items-start gap-3.5">
                <div class="w-12 h-12 flex-shrink-0 bg-primary-50 group-hover:bg-primary-100 text-primary-600 rounded-xl flex flex-col items-center justify-center font-bold border border-primary-100/50 transition-colors">
                  <span class="text-[9px] uppercase tracking-wider">{{ getMonthShort(agenda.tanggal_mulai) }}</span>
                  <span class="text-lg leading-none -mt-0.5">{{ getDay(agenda.tanggal_mulai) }}</span>
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 mb-1.5 leading-tight">{{ agenda.judul }}</h4>
                  <div class="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                    <Clock class="w-3 h-3 text-primary-400" />
                    {{ agenda.waktu_mulai ? agenda.waktu_mulai.slice(0, 5) : '-' }} WIB
                  </div>
                </div>
              </div>
            </router-link>
            
            <div v-if="upcomingAgendas.length === 0" class="text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
              Tidak ada agenda terdekat.
            </div>
          </div>
        </div>

        <!-- Widget 2: Pengumuman Terbaru -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Megaphone class="w-5 h-5 text-primary-500" />
            Pengumuman Terbaru
          </h3>
          
          <div v-if="pengumumanStore.loading" class="animate-pulse space-y-4">
            <div v-for="i in 3" :key="i" class="h-12 bg-gray-100 rounded-xl"></div>
          </div>
          
          <div v-else class="space-y-4">
            <router-link
              v-for="item in recentPengumuman"
              :key="item.id"
              :to="`/pengumuman/${item.slug}`"
              class="group block border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <h4 class="text-sm font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 mb-2 leading-relaxed">{{ item.judul }}</h4>
              <span class="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">{{ formatDate(item.created_at) }}</span>
            </router-link>
          </div>
          
          <router-link to="/pengumuman" class="block w-full text-center text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 py-2.5 rounded-xl mt-5 transition-colors">
            Lihat Semua Pengumuman
          </router-link>
        </div>

        <!-- Widget 3: Pusat Informasi Banner -->
        <div class="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-md p-6 text-white relative overflow-hidden group">
          <div class="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
            <Info class="w-32 h-32" />
          </div>
          <h3 class="text-lg font-bold mb-2 relative z-10">Pusat Informasi</h3>
          <p class="text-primary-50 text-sm mb-5 relative z-10 leading-relaxed">
            Dapatkan informasi lebih lanjut terkait jadwal dan acara pemerintahan daerah.
          </p>
          <router-link to="/kontak" class="inline-flex items-center gap-2 bg-white text-primary-600 text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all relative z-10 group-hover:-translate-y-0.5">
            Hubungi Kami
            <ArrowRight class="w-4 h-4" />
          </router-link>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAgendaStore } from '@/stores/agenda'
import { usePengumumanStore } from '@/stores/pengumuman'
import PageHeader from '@/components/PageHeader.vue'
import { formatDate } from '@/utils/helpers'
import { CalendarDays, Clock, MapPin, ArrowRight, X, CalendarX2, Megaphone, Info } from 'lucide-vue-next'

const agendaStore = useAgendaStore()
const pengumumanStore = usePengumumanStore()

// filter tanggal
const startDate = ref('')
const endDate = ref('')

// computed: filter berdasarkan rentang tanggal
const filteredAgendas = computed(() => {
  if (!startDate.value && !endDate.value) {
    return agendaStore.agendas
  }

  return agendaStore.agendas.filter((agenda) => {
    if (!agenda.tanggal_mulai) return false
    const agendaDate = new Date(agenda.tanggal_mulai).setHours(0, 0, 0, 0)
    const start = startDate.value ? new Date(startDate.value).setHours(0, 0, 0, 0) : null
    const end = endDate.value ? new Date(endDate.value).setHours(23, 59, 59, 999) : null

    if (start && agendaDate < start) return false
    if (end && agendaDate > end) return false
    return true
  })
})

// computed: Agenda Mendatang (berdasarkan tanggal hari ini)
const upcomingAgendas = computed(() => {
  const today = new Date().setHours(0, 0, 0, 0)
  return agendaStore.agendas
    .filter(a => a.tanggal_mulai && new Date(a.tanggal_mulai).setHours(0, 0, 0, 0) >= today)
    .sort((a, b) => new Date(a.tanggal_mulai) - new Date(b.tanggal_mulai))
    .slice(0, 3)
})

// computed: Pengumuman Terbaru
const recentPengumuman = computed(() => {
  return pengumumanStore.list.slice(0, 3)
})

const getDay = (dateStr) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.getDate().toString().padStart(2, '0')
}

const getMonthShort = (dateStr) => {
  if (!dateStr) return '-'
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const date = new Date(dateStr)
  return months[date.getMonth()]
}

// ambil data ketika halaman dibuka
onMounted(() => {
  agendaStore.fetchAgendas()
  pengumumanStore.fetchPengumuman()
})
</script>
