<template>
  <div>
    <PageHeader2
      title="Kritik & Saran"
      subtitle="Kami menghargai setiap masukan dari Anda untuk perbaikan layanan pemerintah"
    />

    <section class="max-w-3xl mx-auto px-4 py-10">
      <!-- Card Form -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <!-- Header Card -->
        <div class="px-8 py-6 bg-gradient-to-r from-[#0a2463] to-[#1e5ca8]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon name="lucide:message-square" class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Kirim Kritik & Saran</h2>
              <p class="text-blue-100 text-xs mt-0.5">Sampaikan masukan Anda kepada kami</p>
            </div>
          </div>
        </div>

        <!-- Rate Limit Warning -->
        <div v-if="rateLimitActive" class="mx-8 mt-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <Icon name="lucide:clock" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p class="text-sm text-amber-700 font-medium">
            Anda baru saja mengirim pesan. Silakan tunggu <strong>{{ rateLimitCountdown }} detik</strong> sebelum mengirim kembali.
          </p>
        </div>

        <!-- Success State -->
        <div v-if="submitted" class="mx-8 my-8 flex flex-col items-center text-center gap-3 py-10">
          <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Icon name="lucide:check-circle-2" class="w-8 h-8 text-green-500" />
          </div>
          <h3 class="text-xl font-bold text-gray-800">Terima Kasih!</h3>
          <p class="text-gray-500 text-sm max-w-xs">{{ successMessage }}</p>
          <button
            @click="resetForm"
            class="mt-2 px-6 py-2.5 bg-[#0a2463] text-white text-sm font-semibold rounded-xl hover:bg-[#1e5ca8] transition-colors"
          >
            Kirim Lagi
          </button>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="kirimData" class="px-8 py-6 space-y-5" novalidate>

          <!-- Honeypot field (tersembunyi dari user, jebak bot) -->
          <div aria-hidden="true" class="absolute -left-[9999px] opacity-0 pointer-events-none" tabindex="-1">
            <label for="website_url">Website</label>
            <input
              id="website_url"
              v-model="honeypot"
              type="text"
              name="website_url"
              autocomplete="off"
              tabindex="-1"
            />
          </div>

          <!-- Nama -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
              Nama <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.nama"
              type="text"
              maxlength="100"
              placeholder="Nama lengkap Anda"
              class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              :class="errors.nama ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-200 focus:ring-[#1e5ca8]/30 focus:border-[#1e5ca8]'"
              @input="clearError('nama')"
            />
            <p v-if="errors.nama" class="mt-1 text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.nama }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
              Email <span class="text-gray-400 font-normal text-xs">(opsional)</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              maxlength="150"
              placeholder="contoh@email.com"
              class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              :class="errors.email ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-200 focus:ring-[#1e5ca8]/30 focus:border-[#1e5ca8]'"
              @input="clearError('email')"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.email }}
            </p>
          </div>

          <!-- No HP -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
              Nomor HP <span class="text-gray-400 font-normal text-xs">(opsional)</span>
            </label>
            <input
              v-model="form.no_hpusr"
              type="text"
              maxlength="20"
              placeholder="08xxxxxxxxxx"
              class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              :class="errors.no_hpusr ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-200 focus:ring-[#1e5ca8]/30 focus:border-[#1e5ca8]'"
              @input="clearError('no_hpusr')"
            />
            <p v-if="errors.no_hpusr" class="mt-1 text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.no_hpusr }}
            </p>
          </div>

          <!-- Judul -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
              Judul <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.judul"
              type="text"
              maxlength="150"
              placeholder="Judul singkat kritik atau saran Anda"
              class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              :class="errors.judul ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-200 focus:ring-[#1e5ca8]/30 focus:border-[#1e5ca8]'"
              @input="clearError('judul')"
            />
            <p v-if="errors.judul" class="mt-1 text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.judul }}
            </p>
          </div>

          <!-- Isi Pesan -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">
              Isi Kritik / Saran <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.isi_kritik"
              rows="5"
              maxlength="2000"
              placeholder="Tuliskan kritik atau saran Anda di sini..."
              class="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition resize-none"
              :class="errors.isi_kritik ? 'border-red-400 focus:ring-red-300 bg-red-50' : 'border-gray-200 focus:ring-[#1e5ca8]/30 focus:border-[#1e5ca8]'"
              @input="clearError('isi_kritik')"
            ></textarea>
            <div class="flex justify-between mt-1">
              <p v-if="errors.isi_kritik" class="text-xs text-red-500 flex items-center gap-1">
                <Icon name="lucide:alert-circle" class="w-3.5 h-3.5" /> {{ errors.isi_kritik }}
              </p>
              <span class="text-xs text-gray-400 ml-auto">{{ form.isi_kritik.length }}/2000</span>
            </div>
          </div>

          <!-- Cloudflare Turnstile Widget -->
          <div class="mb-6 flex flex-col items-center">
            <div ref="turnstileContainer"></div>
            <p v-if="errors.turnstile" class="mt-1 text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:shield-off" class="w-3.5 h-3.5" /> {{ errors.turnstile }}
            </p>
          </div>

          <!-- Error umum -->
          <div v-if="generalError" class="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <Icon name="lucide:x-circle" class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p class="text-sm text-red-600">{{ generalError }}</p>
          </div>

          <!-- Tombol Submit -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="loading || rateLimitActive"
              class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              :class="loading || rateLimitActive
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#0a2463] hover:bg-[#1e5ca8] text-white shadow-sm hover:shadow-md'"
            >
              <Icon v-if="loading" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
              <Icon v-else name="lucide:send" class="w-4 h-4" />
              {{ loading ? 'Mengirim...' : rateLimitActive ? `Tunggu ${rateLimitCountdown}d` : 'Kirim Sekarang' }}
            </button>
          </div>

          <!-- Info keamanan -->
          <p class="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5 pt-1">
            <Icon name="lucide:shield-check" class="w-3.5 h-3.5 text-green-500" />
            Form ini dilindungi oleh Cloudflare Turnstile & enkripsi keamanan
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import PageHeader2 from '@/components/PageHeader2.vue'
import axios from '@/utils/api'

// ─── Config ─────────────────────────────────────────────
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'
const RATE_LIMIT_SECONDS = 60 // cooldown antar pengiriman

// ─── State ──────────────────────────────────────────────
const form = ref({ nama: '', email: '', judul: '', isi_kritik: '', no_hpusr: '' })
const errors = ref({})
const generalError = ref('')
const loading = ref(false)
const submitted = ref(false)
const successMessage = ref('')

// Honeypot
const honeypot = ref('')

// Cloudflare Turnstile
const turnstileContainer = ref(null)
const turnstileToken = ref('')
let turnstileWidgetId = null

// Rate limiting
const rateLimitActive = ref(false)
const rateLimitCountdown = ref(0)
let rateLimitTimer = null

// ─── Turnstile Callbacks ─────
const handleTurnstileSuccess = (token) => {
  turnstileToken.value = token
  clearError('turnstile')
}

const handleTurnstileExpired = () => {
  turnstileToken.value = ''
}

// ─── Lifecycle ──────────────────────────────────────────
onMounted(() => {
  renderTurnstile()
})

onUnmounted(() => {
  if (rateLimitTimer) clearInterval(rateLimitTimer)
  // Hapus widget saat komponen dilepas
  if (turnstileWidgetId !== null && window.turnstile) {
    window.turnstile.remove(turnstileWidgetId)
  }
})

// ─── Turnstile ──────────────────────────────────────────
const renderTurnstile = () => {
  if (!turnstileContainer.value) return
  // Tunggu script Cloudflare siap
  const tryRender = () => {
    if (window.turnstile) {
      turnstileWidgetId = window.turnstile.render(turnstileContainer.value, {
        sitekey: turnstileSiteKey,
        callback: handleTurnstileSuccess,
        'expired-callback': handleTurnstileExpired,
        theme: 'light',
      })
    } else {
      setTimeout(tryRender, 300)
    }
  }
  tryRender()
}

const resetTurnstile = () => {
  turnstileToken.value = ''
  if (turnstileWidgetId !== null && window.turnstile) {
    window.turnstile.reset(turnstileWidgetId)
  }
}

// ─── Validasi Input ─────────────────────────────────────
const sanitize = (str) => str.trim().replace(/[<>]/g, '')

const validate = () => {
  const e = {}

  // Nama
  if (!form.value.nama.trim()) {
    e.nama = 'Nama wajib diisi.'
  } else if (form.value.nama.trim().length < 3) {
    e.nama = 'Nama minimal 3 karakter.'
  } else if (form.value.nama.length > 100) {
    e.nama = 'Nama maksimal 100 karakter.'
  }

  // Email (opsional tapi jika diisi harus valid)
  if (form.value.email) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(form.value.email)) {
      e.email = 'Format email tidak valid.'
    } else if (form.value.email.length > 150) {
      e.email = 'Email maksimal 150 karakter.'
    }
  }

  // No HP (opsional tapi jika diisi harus angka)
  if (form.value.no_hpusr) {
    const hpRe = /^[0-9+\-\s]{7,20}$/
    if (!hpRe.test(form.value.no_hpusr)) {
      e.no_hpusr = 'Format nomor HP tidak valid (hanya angka, 7-20 karakter).'
    }
  }

  // Judul
  if (!form.value.judul.trim()) {
    e.judul = 'Judul wajib diisi.'
  } else if (form.value.judul.trim().length < 5) {
    e.judul = 'Judul minimal 5 karakter.'
  } else if (form.value.judul.length > 150) {
    e.judul = 'Judul maksimal 150 karakter.'
  }

  // Isi
  if (!form.value.isi_kritik.trim()) {
    e.isi_kritik = 'Isi kritik/saran wajib diisi.'
  } else if (form.value.isi_kritik.trim().length < 10) {
    e.isi_kritik = 'Isi minimal 10 karakter.'
  } else if (form.value.isi_kritik.length > 2000) {
    e.isi_kritik = 'Isi maksimal 2000 karakter.'
  }

  // Turnstile
  if (!turnstileToken.value) {
    e.turnstile = 'Mohon selesaikan verifikasi keamanan Cloudflare.'
  }

  errors.value = e
  return Object.keys(e).length === 0
}

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

// ─── Rate Limiting ──────────────────────────────────────
const startRateLimit = () => {
  rateLimitActive.value = true
  rateLimitCountdown.value = RATE_LIMIT_SECONDS
  rateLimitTimer = setInterval(() => {
    rateLimitCountdown.value--
    if (rateLimitCountdown.value <= 0) {
      rateLimitActive.value = false
      clearInterval(rateLimitTimer)
    }
  }, 1000)
}

// ─── Submit ─────────────────────────────────────────────
const kirimData = async () => {
  generalError.value = ''

  // Cek honeypot — jika diisi berarti bot
  if (honeypot.value) {
    console.warn('Bot detected via honeypot.')
    return
  }

  // Cek rate limit
  if (rateLimitActive.value) return

  // Validasi
  if (!validate()) return

  loading.value = true
  try {
    const payload = {
      nama: sanitize(form.value.nama),
      email: form.value.email ? sanitize(form.value.email) : '',
      no_hpusr: form.value.no_hpusr ? sanitize(form.value.no_hpusr) : '',
      judul: sanitize(form.value.judul),
      isi_kritik: sanitize(form.value.isi_kritik),
      'cf-turnstile-response': turnstileToken.value,
    }

    const res = await axios.post('/api/kritik-saran', payload)
    successMessage.value = res.data.message || 'Pesan Anda berhasil terkirim. Terima kasih!'
    submitted.value = true
    startRateLimit()
  } catch (err) {
    const status = err?.response?.status
    if (status === 429) {
      generalError.value = 'Terlalu banyak permintaan. Mohon tunggu beberapa saat sebelum mencoba lagi.'
    } else if (status === 422) {
      generalError.value = 'Data yang dikirim tidak valid. Periksa kembali isian Anda.'
    } else {
      generalError.value = 'Gagal mengirim pesan. Silakan coba lagi nanti.'
    }
    resetTurnstile()
  } finally {
    loading.value = false
  }
}

// ─── Reset Form ─────────────────────────────────────────
const resetForm = () => {
  submitted.value = false
  successMessage.value = ''
  generalError.value = ''
  errors.value = {}
  honeypot.value = ''
  form.value = { nama: '', email: '', judul: '', isi_kritik: '', no_hpusr: '' }
  resetTurnstile()
}
</script>
