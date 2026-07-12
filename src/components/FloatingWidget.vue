<template>
  <!-- Floating menu -->
  <div>
    <!-- === DESKTOP FLOATING MENU === -->
    <div 
      class="hidden md:flex fixed right-0 top-1/4 md:top-1/3 z-40 items-start transition-transform duration-500 ease-out drop-shadow-2xl"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-[260px]'"
      @mouseleave="isMenuOpen = false"
    >
      <!-- Toggle Button -->
      <button 
        @click="isMenuOpen = !isMenuOpen"
        @mouseenter="isMenuOpen = true"
        class="bg-gradient-to-b from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-5 px-2.5 rounded-l-2xl shadow-[-4px_4px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center gap-3 transition-all border-t border-l border-b border-white/20 cursor-pointer mt-4 group"
      >
        <div class="bg-white/20 rounded-full p-1 mb-1">
          <ChevronLeft class="w-4 h-4 transition-transform duration-500" :class="isMenuOpen ? 'rotate-180' : ''" />
        </div>
        <span class="vertical-text-right text-[13px] font-bold tracking-[0.2em] uppercase">Layanan Pintar</span>
        <MenuIcon class="w-5 h-5 group-hover:scale-110 transition-transform mt-1" />
      </button>

      <!-- Drawer Content -->
      <div class="bg-white/95 backdrop-blur-md border-y border-l border-gray-100 p-6 w-[260px] relative rounded-bl-3xl overflow-hidden shadow-[-5px_0_25px_rgba(0,0,0,0.08)]">
        <!-- Decorative top accent -->
        <div class="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-green-500 to-emerald-400"></div>
        
        <div class="flex items-center justify-end gap-3 mb-6 mt-1 text-right">
          <h3 class="text-gray-800 font-bold text-lg leading-tight">Layanan<br/><span class="text-green-600">Pintar</span></h3>
          <div class="bg-green-100 p-2.5 rounded-xl text-green-600 shadow-inner">
            <Settings class="w-5 h-5" />
          </div>
        </div>
        
        <div class="space-y-3 relative z-10">
          <div v-for="(item, index) in items" :key="index">
            <button
              v-if="item.type !== 'link'"
              @click="handleAction(item.type)"
              class="w-full flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl hover:bg-green-50 hover:text-green-700 transition-colors border border-gray-100 group text-gray-700"
            >
              <div class="bg-white p-2 rounded-lg shadow-sm group-hover:text-green-600">
                <component :is="item.icon" class="w-5 h-5" />
              </div>
              <span class="text-sm font-semibold">{{ item.label }}</span>
            </button>
            <a
              v-else
              :href="item.link"
              class="w-full flex items-center gap-3 bg-gray-50/80 p-3 rounded-xl hover:bg-green-50 hover:text-green-700 transition-colors border border-gray-100 group text-gray-700"
            >
              <div class="bg-white p-2 rounded-lg shadow-sm group-hover:text-green-600">
                <component :is="item.icon" class="w-5 h-5" />
              </div>
              <span class="text-sm font-semibold">{{ item.label }}</span>
            </a>
          </div>
        </div>
        
        <!-- Background subtle icon -->
        <Settings class="absolute -bottom-4 -left-4 w-32 h-32 text-gray-50 opacity-40 pointer-events-none" />
      </div>
    </div>

    <!-- === MOBILE BOTTOM MENU === -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-green-600 flex justify-around items-center py-2 z-50 md:hidden shadow-[0_-2px_8px_rgba(0,0,0,0.2)]"
    >
      <div
        v-for="(item, index) in mobileItems"
        :key="'mobile-' + index"
        class="flex flex-col items-center text-white text-xs active:scale-110 transition-transform duration-150"
      >
        <button
          v-if="item.type !== 'link'"
          @click="handleAction(item.type)"
          class="flex flex-col items-center focus:outline-none"
        >
          <component :is="item.icon" class="w-6 h-6 mb-1" />
          <span>{{ item.label }}</span>
        </button>

        <a v-else :href="item.link" class="flex flex-col items-center focus:outline-none">
          <component :is="item.icon" class="w-6 h-6 mb-1" />
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>

    <!-- === MODAL ADUAN === -->
    <div
      v-if="showAduan"
      class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-[400px] relative overflow-hidden transform transition-all scale-100 m-4">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <div class="p-6">
          <button
            @click="showAduan = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
          
          <div class="flex items-center gap-3 mb-6">
            <div class="bg-blue-100 p-2.5 rounded-xl text-blue-600">
              <MessageCircle class="w-6 h-6" />
            </div>
            <h2 class="text-xl font-bold text-gray-800">Kanal Aduan</h2>
          </div>
          
          <div class="flex flex-col gap-3">
            <a
              href="https://www.lapor.go.id/instansi/pemerintah-kabupaten-lebak"
              target="_blank"
              class="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 p-4 rounded-xl text-gray-700 hover:text-blue-700 font-semibold transition-all group"
            >
              <span>SP4N Lapor</span>
              <ExternalLink class="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
            </a>
            <a 
              href="https://wbs.lebakkab.go.id/" 
              target="_blank" 
              class="flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 p-4 rounded-xl text-gray-700 hover:text-blue-700 font-semibold transition-all group"
            >
              <span>WBS Inspektorat</span>
              <ExternalLink class="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
            </a>
            <a 
              href="https://wa.me/6281944114581" 
              target="_blank" 
              class="flex items-center justify-between bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 p-4 rounded-xl text-gray-700 hover:text-green-700 font-semibold transition-all group"
            >
              <div class="flex items-center gap-2">
                <span class="text-green-600 font-bold">Bot WhatsApp</span>
              </div>
              <ExternalLink class="w-4 h-4 text-gray-400 group-hover:text-green-500" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- === MODAL POLLING === -->
    <div
      v-if="showPolling"
      class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-[450px] relative overflow-hidden m-4">
        <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
        <div class="p-6">
          <button
            @click="showPolling = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
          
          <div class="flex items-center gap-3 mb-6">
            <div class="bg-orange-100 p-2.5 rounded-xl text-orange-600">
              <BarChart class="w-6 h-6" />
            </div>
            <h2 class="text-xl font-bold text-gray-800">Jajak Pendapat</h2>
          </div>

          <div v-if="polling.length" class="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="p in polling" :key="p.id" class="mb-6 bg-gray-50 p-5 rounded-xl border border-gray-100">
              <p class="font-bold text-gray-800 mb-4 leading-relaxed">{{ p.pertanyaan }}</p>
              <div class="space-y-3">
                <label 
                  v-for="j in p.jawaban" 
                  :key="j.id" 
                  class="flex items-center p-3 rounded-lg border cursor-pointer transition-all"
                  :class="selected === j.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-orange-300'"
                >
                  <div class="relative flex items-center justify-center w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0" :class="selected === j.id ? 'border-orange-500' : 'border-gray-300'">
                    <div v-if="selected === j.id" class="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                  </div>
                  <input type="radio" :value="j.id" v-model="selected" class="hidden" />
                  <span class="text-gray-700 font-medium text-sm" :class="selected === j.id ? 'text-orange-700 font-bold' : ''">{{ j.pilihan }}</span>
                </label>
              </div>
            </div>
            
            <button
              @click="submitPolling"
              class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3.5 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 mt-2"
            >
              <span>Kirim Suara</span>
              <Send class="w-4 h-4" />
            </button>
          </div>
          <div v-else class="flex flex-col items-center justify-center py-10 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BarChart class="w-8 h-8 text-gray-400" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">Belum Ada Polling</h3>
            <p class="text-gray-500 text-sm">Saat ini tidak ada jajak pendapat yang aktif.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- === SIDEBAR AKSESIBILITAS === -->
    <div v-if="showDisabilitas" class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-end z-50">
      <div class="bg-white w-[350px] h-full shadow-[-10px_0_30px_rgba(0,0,0,0.1)] relative flex flex-col">
        <!-- Header -->
        <div class="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 p-2.5 rounded-xl text-purple-600">
              <Accessibility class="w-6 h-6" />
            </div>
            <h2 class="text-lg font-bold text-gray-800">Aksesibilitas</h2>
          </div>
          <button
            @click="showDisabilitas = false"
            class="text-gray-400 hover:text-gray-700 bg-white shadow-sm border border-gray-100 hover:bg-gray-50 rounded-full p-2 transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
          
          <!-- Mode Suara -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Audio Pembaca</h3>
            <button 
              @click="toggleVoiceMode" 
              class="w-full flex items-center justify-between p-4 rounded-xl border transition-all shadow-sm"
              :class="isVoiceActive ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-purple-100' : 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'"
            >
              <div class="flex items-center gap-3">
                <Volume2 class="w-5 h-5" :class="isVoiceActive ? 'text-purple-600' : 'text-gray-400'" />
                <span class="font-semibold text-sm">{{ isVoiceActive ? 'Mode Suara Aktif' : 'Aktifkan Pembaca' }}</span>
              </div>
              <div class="w-10 h-6 rounded-full relative transition-colors" :class="isVoiceActive ? 'bg-purple-500' : 'bg-gray-200'">
                <div class="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform" :class="isVoiceActive ? 'translate-x-4' : ''"></div>
              </div>
            </button>
          </div>

          <!-- Tipografi -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipografi</h3>
            
            <div class="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100 shadow-sm">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 flex items-center gap-2"><Type class="w-4 h-4 text-gray-400"/> Ukuran Teks</span>
                <div class="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <button @click="decreaseFont" class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-r border-gray-200 hover:text-purple-600">-</button>
                  <span class="px-3 py-1.5 text-sm font-bold text-gray-800 min-w-[3.5rem] text-center">{{ fontSize }}%</span>
                  <button @click="increaseFont" class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-l border-gray-200 hover:text-purple-600">+</button>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-gray-700 flex items-center gap-2"><ArrowUpDown class="w-4 h-4 text-gray-400"/> Tinggi Baris</span>
                <div class="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <button @click="decreaseLineHeight" class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-r border-gray-200 hover:text-purple-600">-</button>
                  <span class="px-3 py-1.5 text-sm font-bold text-gray-800 min-w-[3.5rem] text-center">{{ lineHeight.toFixed(1) }}</span>
                  <button @click="increaseLineHeight" class="px-3 py-1.5 hover:bg-gray-100 text-gray-600 border-l border-gray-200 hover:text-purple-600">+</button>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
              <span class="text-sm font-semibold text-gray-700 mb-3 block">Spasi Huruf</span>
              <div class="grid grid-cols-3 gap-2">
                <button @click="setLetterSpacing('0px')" class="py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm">Biasa</button>
                <button @click="setLetterSpacing('2px')" class="py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm tracking-wide">Sedang</button>
                <button @click="setLetterSpacing('4px')" class="py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors shadow-sm tracking-widest">Lebar</button>
              </div>
            </div>
          </div>

          <!-- Tampilan Visual -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Tampilan Visual</h3>
            
            <div class="grid grid-cols-2 gap-3">
              <button @click="toggleBold" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <Bold class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700">Tebalkan Teks</span>
              </button>
              <button @click="toggleHighlightLinks" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <LinkIcon class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700">Sorot Tautan</span>
              </button>
              <button @click="toggleMonochrome" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <MonitorPlay class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700">Monokrom</span>
              </button>
              <button @click="toggleHighContrast" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <Sun class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700">Kontras Tinggi</span>
              </button>
              <button @click="toggleBigCursor" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <MousePointer2 class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700 text-center">Kursor Besar</span>
              </button>
              <button @click="toggleReduceMotion" class="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-sm group">
                <VideoOff class="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <span class="text-xs font-semibold text-gray-700 text-center">Hentikan Animasi</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- Custom Alert Popup -->
    <div 
      class="fixed top-10 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out flex items-center justify-center pointer-events-none"
      :class="customAlert.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'"
    >
      <div v-if="customAlert.show" class="bg-white shadow-2xl rounded-xl p-4 flex items-center gap-4 min-w-[320px] max-w-md pointer-events-auto border-l-4" :class="customAlert.type === 'success' ? 'border-green-500' : (customAlert.type === 'error' ? 'border-red-500' : 'border-orange-500')">
        <div class="rounded-full p-2 flex-shrink-0" :class="customAlert.type === 'success' ? 'bg-green-100 text-green-600' : (customAlert.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600')">
          <CheckCircle2 v-if="customAlert.type === 'success'" class="w-6 h-6" />
          <XCircle v-if="customAlert.type === 'error'" class="w-6 h-6" />
          <AlertCircle v-if="customAlert.type === 'warning'" class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-gray-800 text-sm">{{ customAlert.title }}</h4>
          <p class="text-gray-600 text-xs mt-0.5">{{ customAlert.message }}</p>
        </div>
        <button @click="customAlert.show = false" class="text-gray-400 hover:text-gray-700 transition-colors p-1">
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { BarChart, MessageCircle, Accessibility, Pencil, Home, ChevronLeft, Settings, Menu as MenuIcon, X, ExternalLink, Send, Volume2, Type, ArrowUpDown, Bold, Link as LinkIcon, MonitorPlay, Sun, MousePointer2, VideoOff, CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'
import axios from '@/utils/api'

// state dan logic tetap sama dengan versi kamu
const showAduan = ref(false)
const showPolling = ref(false)
const showDisabilitas = ref(false)
const isVoiceActive = ref(false)
const isMenuOpen = ref(false)

const customAlert = ref({
  show: false,
  title: '',
  message: '',
  type: 'success'
})

const showAlert = (title, message, type = 'success') => {
  customAlert.value = { show: true, title, message, type }
  setTimeout(() => {
    customAlert.value.show = false
  }, 3500)
}

const polling = ref([])
const selected = ref(null)
const fontSize = ref(100)
const lineHeight = ref(1)

const items = [
  { icon: BarChart, label: 'Polling', type: 'polling' },
  { icon: MessageCircle, label: 'Aduan', type: 'aduan' },
  { icon: Accessibility, label: 'Aksesibilitas', type: 'disabilitas' },
  { icon: Pencil, label: 'Kritik & Saran', type: 'link', link: '/kritik-saran' },
]

const mobileItems = [
  { icon: BarChart, label: 'Polling', type: 'polling' },
  { icon: MessageCircle, label: 'Aduan', type: 'aduan' },
  { icon: Home, label: 'Beranda', type: 'link', link: '/' },
  { icon: Accessibility, label: 'Akses', type: 'disabilitas' },
  { icon: Pencil, label: 'Kritik', type: 'link', link: '/kritik-saran' },
]

const handleAction = async (type) => {
  if (type === 'polling') {
    showPolling.value = true
    try {
      const res = await axios.get('/api/polling')
      polling.value = res.data
    } catch (err) {
      console.error('Gagal ambil polling:', err)
    }
  } else if (type === 'aduan') {
    showAduan.value = true
  } else if (type === 'disabilitas') {
    showDisabilitas.value = true
  }
}

const submitPolling = async () => {
  if (!selected.value) {
    showAlert('Perhatian', 'Silakan pilih salah satu opsi polling terlebih dahulu!', 'warning')
    return
  }
  try {
    await axios.post('/api/polling/vote', { id: selected.value })
    showAlert('Berhasil', 'Terima kasih telah berpartisipasi dalam polling ini!', 'success')
    showPolling.value = false
    selected.value = null
  } catch (err) {
    console.error('Gagal submit polling:', err)
    showAlert('Gagal', 'Terjadi kesalahan saat mengirim suara. Silakan coba lagi.', 'error')
  }
}

let utterance = null
const toggleVoiceMode = () => {
  if (isVoiceActive.value) {
    window.speechSynthesis.cancel()
    isVoiceActive.value = false
  } else {
    isVoiceActive.value = true
    utterance = new SpeechSynthesisUtterance(document.body.innerText)
    utterance.lang = 'id-ID'
    window.speechSynthesis.speak(utterance)
  }
}
onBeforeUnmount(() => window.speechSynthesis.cancel())

// === Aksesibilitas ===
const increaseFont = () => (document.body.style.fontSize = `${(fontSize.value += 10)}%`)
const decreaseFont = () => {
  if (fontSize.value > 50) document.body.style.fontSize = `${(fontSize.value -= 10)}%`
}
const increaseLineHeight = () => (document.body.style.lineHeight = lineHeight.value += 0.2)
const decreaseLineHeight = () => {
  if (lineHeight.value > 0.8) document.body.style.lineHeight = lineHeight.value -= 0.2
}
const setLetterSpacing = (v) => (document.body.style.letterSpacing = v)
const setTextAlign = (v) => (document.body.style.textAlign = v)
const toggleBold = () => document.body.classList.toggle('access-bold')
const toggleHighlightLinks = () => document.body.classList.toggle('access-highlight-links')
const toggleMonochrome = () => document.body.classList.toggle('access-monochrome')
const toggleHighContrast = () => document.body.classList.toggle('access-contrast')
const toggleBigCursor = () => document.body.classList.toggle('access-big-cursor')
const toggleReduceMotion = () => document.body.classList.toggle('access-reduce-motion')
</script>

<style scoped>
.vertical-text-right {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
