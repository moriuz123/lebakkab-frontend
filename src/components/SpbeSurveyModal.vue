<template>
  <Teleport to="body">
    <!-- Modal Overlay -->
    <div
      v-if="modelValue"
      id="spbe-survey-modal-overlay"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[99999] p-3 sm:p-4 transition-all duration-300"
      @click.self="closeModal"
    >
      <!-- Modal Container -->
      <div
        class="spbe-modal-container bg-white w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative p-5 sm:p-7 border border-gray-100 transform transition-all duration-200"
      >
        <!-- Close Button -->
        <button
          id="spbe-modal-close-btn"
          @click="closeModal"
          aria-label="Tutup"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full w-9 h-9 flex items-center justify-center transition-colors cursor-pointer text-xl z-20"
        >
          &times;
        </button>

        <!-- Loading State -->
        <div v-if="isValidating" class="py-16 flex flex-col items-center justify-center text-center">
          <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-sm font-medium text-gray-600">Memeriksa status survei...</p>
        </div>

        <!-- Success Submitted View -->
        <div v-else-if="submitted" class="py-12 px-4 flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
            <Icon name="lucide:check-circle2" class="w-9 h-9" />
          </div>
          <h2 class="text-2xl font-bold text-[#0a2463] mb-2">Terima Kasih!</h2>
          <p class="text-sm text-gray-600 max-w-md leading-relaxed mb-6">
            Survei Anda telah berhasil terkirim. Partisipasi Anda sangat berarti bagi peningkatan kualitas layanan digital Pemerintah Kabupaten Lebak.
          </p>
          <button
            @click="closeModal"
            class="px-6 py-2.5 bg-[#0a2463] hover:bg-[#15347a] text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>

        <!-- Already Filled View -->
        <div v-else-if="alreadyExists" class="py-12 px-4 flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 shadow-inner">
            <Icon name="lucide:shield-check" class="w-9 h-9" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Anda Telah Mengisi Survei Ini</h3>
          <p class="text-sm text-gray-600 max-w-md leading-relaxed mb-6">
            Terima kasih banyak atas partisipasi dan masukan yang telah Anda berikan untuk kemajuan Portal Lebakkab.
          </p>
          <button
            @click="closeModal"
            class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>

        <!-- Survey Form -->
        <div v-else class="spbe-survey-wrapper">
          <form id="form-survey" @submit.prevent="handleSubmit" class="flex flex-col gap-5">
            <!-- Survey Info -->
            <div class="survey-info text-left p-4 rounded-xl bg-slate-50 border-l-4 border-blue-600">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  SPBE · Kementerian PAN RB
                </span>
              </div>
              <h2 class="survey-title text-base sm:text-lg font-bold text-gray-900 leading-snug">
                Penilaian Kepuasan Pengguna Layanan - Pemerintah Kabupaten Lebak
              </h2>
              <p class="survey-description text-xs text-gray-600 mt-1 leading-relaxed">
                Survei ini bertujuan untuk mengukur tingkat kepuasan Anda terhadap layanan digital SPBE Pemerintah Kabupaten Lebak guna meningkatkan kualitas pelayanan publik secara berkelanjutan.
              </p>
            </div>

            <!-- Star Rating Section -->
            <div class="rating-container flex flex-col items-center gap-2 pt-1 text-center">
              <p class="text-sm sm:text-base font-semibold text-gray-800">
                Berapa nilai kepuasan Anda terhadap layanan ini?
              </p>

              <div class="star-wrapper flex items-center justify-center gap-1.5 py-1">
                <button
                  v-for="s in 5"
                  :key="'star-' + s"
                  type="button"
                  @click="rating = s"
                  @mouseenter="hoverRating = s"
                  @mouseleave="hoverRating = 0"
                  class="star p-1 text-3xl sm:text-4xl transition-all duration-150 cursor-pointer focus:outline-none"
                  :class="((hoverRating || rating) >= s) ? 'text-amber-400 scale-110' : 'text-gray-300'"
                >
                  ★
                </button>
              </div>

              <!-- Rating Label feedback -->
              <span v-if="rating > 0" class="text-xs font-bold text-amber-600">
                {{ ratingLabels[rating] }}
              </span>
            </div>

            <!-- Dynamic Aspek Perbaikan (Shows if rating < 5 and rating > 0) -->
            <div
              v-if="rating > 0 && rating < 5"
              class="aspek-section bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 sm:p-5 transition-all animate-in fade-in duration-200"
            >
              <h3 class="text-xs sm:text-sm font-bold text-gray-800 text-center mb-3">
                Menurut Anda, aspek apa yang perlu ditingkatkan? <span class="text-red-500">*</span>
              </h3>

              <div class="aspek-container flex flex-wrap gap-2 justify-center">
                <label
                  v-for="(opt, idx) in aspekOptions"
                  :key="'aspek-' + idx"
                  class="aspek-wrapper inline-flex items-center gap-2 border rounded-lg px-3 py-2 text-xs font-medium cursor-pointer transition-all"
                  :class="aspekSelected.includes(opt.text) ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-2xs' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'"
                >
                  <input
                    type="checkbox"
                    :value="opt.text"
                    v-model="aspekSelected"
                    class="aspek-checkbox w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  <span>{{ opt.text }}</span>
                </label>
              </div>
              <p v-if="aspekSelected.length === 0" class="text-[11px] text-amber-700 text-center mt-2 font-medium">
                Pilih minimal 1 aspek perbaikan sebelum mengirim.
              </p>
            </div>

            <!-- Question Masukan / Saran (Textarea) -->
            <div class="question-block text-left flex flex-col gap-1.5">
              <label for="modal-survey-saran" class="text-xs sm:text-sm font-semibold text-gray-800">
                Berikan saran atau masukan Anda untuk peningkatan layanan ini:
              </label>
              <textarea
                id="modal-survey-saran"
                v-model="saran"
                rows="3"
                maxlength="250"
                placeholder="Tuliskan masukan Anda di sini (opsional)..."
                class="w-full p-3 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y outline-none transition-all placeholder:text-gray-400"
              ></textarea>
              <div class="char-counter text-right text-[11px] text-gray-400">
                {{ saran.length }} / 250 karakter
              </div>
            </div>

            <!-- Form Actions: Cap Widget & Submit -->
            <div class="form-actions flex flex-col items-center justify-center gap-3 pt-4 border-t border-gray-100">
              <!-- Captcha Widget Container -->
              <div class="w-full flex justify-center py-1">
                <cap-widget
                  id="modal-cap-widget"
                  data-cap-api-endpoint="https://surveidigital.spbe.go.id/cap/d628fde2ce"
                  required
                ></cap-widget>
              </div>

              <!-- Error Feedback if any -->
              <p v-if="errorMessage" class="text-xs text-red-600 font-medium text-center">
                {{ errorMessage }}
              </p>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="!canSubmit"
                class="w-full max-w-[280px] py-3 px-6 rounded-xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                :class="canSubmit ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25 active:scale-[0.98]' : 'bg-gray-400 opacity-60'"
              >
                <span v-if="isSubmitting" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Survei' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import axios from '@/utils/api'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}

const isValidating = ref(false)
const alreadyExists = ref(false)
const submitted = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')

const rating = ref(0)
const hoverRating = ref(0)
const aspekSelected = ref([])
const saran = ref('')
const captchaToken = ref('')
const fingerprint = ref('')

const ratingLabels = {
  1: 'Sangat Tidak Puas (1/5)',
  2: 'Kurang Puas (2/5)',
  3: 'Cukup Puas (3/5)',
  4: 'Puas (4/5)',
  5: 'Sangat Puas (5/5)'
}

const aspekOptions = [
  { id: 4, text: 'Persyaratan, Biaya, dan Prosedur Layanan' },
  { id: 5, text: 'Fungsionalitas & Kemudahan Layanan Digital' },
  { id: 6, text: 'Kualitas & Kesesuaian Informasi' },
  { id: 7, text: 'Kecepatan & Kualitas Sistem' },
  { id: 8, text: 'Kualitas Respon & Dukungan Layanan' }
]

const canSubmit = computed(() => {
  if (isSubmitting.value) return false
  const hasRating = rating.value > 0
  const isMaxRating = rating.value === 5
  const hasRequiredAspeks = isMaxRating ? true : aspekSelected.value.length > 0
  const hasCaptcha = !!captchaToken.value

  return hasRating && hasRequiredAspeks && hasCaptcha
})

// Robust Browser Fingerprinting (matching SPBE algorithm)
async function generateRobustFingerprint() {
  const components = {}

  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 200
    canvas.height = 50
    ctx.textBaseline = 'top'
    ctx.font = "14px 'Arial'"
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText('CapFingerprint! 😃 🎓', 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.fillText('CapFingerprint! 😃 🎓', 4, 17)
    components.canvas = canvas.toDataURL()
  } catch (e) {
    components.canvas = 'canvas_blocked'
  }

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      const audioCtx = new AudioContext()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      oscillator.type = 'triangle'
      oscillator.frequency.setValueAtTime(10000, audioCtx.currentTime)
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      components.audio = `${oscillator.type}_${oscillator.frequency.value}`
      audioCtx.close()
    }
  } catch (e) {
    components.audio = 'audio_blocked'
  }

  components.hardware = {
    cores: navigator.hardwareConcurrency || 0,
    memory: navigator.deviceMemory || 0,
    languages: navigator.languages ? navigator.languages.join(',') : navigator.language,
    platform: navigator.platform || 'unknown',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  components.screen = {
    w: window.screen.width,
    h: window.screen.height,
    depth: window.screen.colorDepth,
    pixelRatio: window.devicePixelRatio || 1
  }

  components.botFlags = {
    webdriver: navigator.webdriver ? 'yes' : 'no',
    chromeWindow: !!window.chrome ? 'yes' : 'no',
    pluginsLength: navigator.plugins ? navigator.plugins.length : 0
  }

  const telemetryString = JSON.stringify(components)
  const msgBuffer = new TextEncoder().encode(telemetryString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

const attachCapWidgetListener = () => {
  nextTick(() => {
    const widget = document.getElementById('modal-cap-widget')
    if (widget) {
      widget.addEventListener('solve', (e) => {
        captchaToken.value = e.detail?.token || ''
      })
    }
  })
}

// Check fingerprint validation on open
const validateOnOpen = async () => {
  if (submitted.value) return

  isValidating.value = true
  errorMessage.value = ''
  try {
    if (!fingerprint.value) {
      fingerprint.value = await generateRobustFingerprint()
    }

    const res = await axios.post('/api/survey/validate', {
      fingerprint: fingerprint.value
    })

    if (res.data?.data?.is_already_exist) {
      alreadyExists.value = true
    } else {
      alreadyExists.value = false
      attachCapWidgetListener()
    }
  } catch (err) {
    console.warn('SPBE survey validation failed:', err)
    // Fallback: allow filling
    attachCapWidgetListener()
  } finally {
    isValidating.value = false
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      validateOnOpen()
    }
  }
)

const handleSubmit = async () => {
  if (!canSubmit.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    let finalAnswers = { question_3: String(rating.value) }

    if (rating.value < 5) {
      if (saran.value) {
        finalAnswers['question_1'] = saran.value
      }
      if (aspekSelected.value.length > 0) {
        finalAnswers['question_2'] = aspekSelected.value.join('--SEP--')
      }
    } else if (saran.value) {
      finalAnswers['question_1'] = saran.value
    }

    if (!fingerprint.value) {
      fingerprint.value = await generateRobustFingerprint()
    }

    const payload = {
      respondent_name: '',
      recaptcha_token: captchaToken.value,
      fingerprint: fingerprint.value,
      answers: finalAnswers,
      jenis_layanan: 'lebakkab'
    }

    const res = await axios.post('/api/survey/submit', payload)

    if (res.data?.status === 200 || res.data?.status === 201 || res.data?.success) {
      submitted.value = true
    } else {
      errorMessage.value = res.data?.message || res.data?.data?.message || 'Gagal mengirim survei. Silakan coba lagi.'
    }
  } catch (err) {
    console.error('Submit error:', err)
    errorMessage.value = 'Gagal terhubung ke server SPBE. Periksa koneksi internet Anda.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.spbe-modal-container::-webkit-scrollbar {
  width: 6px;
}
.spbe-modal-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.spbe-modal-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.spbe-modal-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
