<template>
  <div class="bg-[#f8fafc] min-h-screen pb-24 font-sans selection:bg-blue-500 selection:text-white">
    <!-- Premium Header -->
    <div class="relative bg-blue-900 overflow-hidden pt-28 pb-32 lg:pt-36 lg:pb-40 rounded-b-[3rem] shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] mb-12 z-10 border-b border-blue-800">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/50 to-blue-950"></div>
      </div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        <!-- Breadcrumb Custom -->
        <nav class="flex items-center gap-2 text-sm text-blue-200/80 mb-6 font-medium">
          <router-link to="/" class="hover:text-white transition-colors">Beranda</router-link>
          <span class="w-1 h-1 rounded-full bg-blue-500/50"></span>
          <span class="text-white">PPID</span>
        </nav>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Layanan <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">PPID Publik</span>
        </h1>
        <p class="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
          Pejabat Pengelola Informasi dan Dokumentasi (PPID) Kabupaten Lebak
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-20">
      <div class="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/50 overflow-hidden">
        
        <!-- Tabs Navigation -->
        <div class="flex overflow-x-auto gap-2 pb-4 mb-8 hide-scrollbar border-b border-gray-100">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 md:gap-2',
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 -translate-y-1' 
                : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4 md:w-5 md:h-5" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Content: Informasi Publik -->
        <div v-if="activeTab === 'informasi'" class="animate-fade-in space-y-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900">Daftar Informasi Publik</h2>
            <p class="text-gray-500 mt-2">Telusuri arsip informasi yang tersedia secara proaktif untuk publik.</p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <div class="relative flex-1">
              <input type="text" v-model="searchQuery" placeholder="Cari dokumen..." class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4 pl-10">
              <svg class="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          <div v-if="loadingDocs" class="space-y-4">
             <div v-for="i in 3" :key="i" class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>

          <div v-else-if="filteredDokuments.length > 0" class="space-y-4">
            <div 
              v-for="doc in filteredDokuments" 
              :key="doc.id"
              class="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between gap-4"
            >
              <div>
                <h3 class="font-bold text-gray-900 text-lg mb-2">{{ doc.judul }}</h3>
                <div class="flex flex-wrap gap-2 text-xs font-semibold">
                   <span v-for="cat in doc.kategoris" :key="cat.id" class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">{{ cat.nama }}</span>
                </div>
              </div>
              <div class="shrink-0 flex items-center">
                 <a 
                  :href="getStorageUrl(doc.file_path)"
                  target="_blank"
                  class="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-4 py-2.5 rounded-xl transition-colors w-full sm:w-auto justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Unduh Dokumen
                </a>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200 border-dashed">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <h3 class="text-xl font-bold text-gray-800">Dokumen Tidak Ditemukan</h3>
            <p class="text-gray-500 mt-2">Belum ada dokumen atau coba ubah kata kunci pencarian Anda.</p>
          </div>
        </div>

        <!-- Tab Content: Permohonan Informasi -->
        <div v-if="activeTab === 'permohonan'" class="animate-fade-in">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Permohonan Informasi Publik</h2>
              <p class="text-gray-500 mt-2">Tidak menemukan yang Anda cari di Daftar Informasi? Ajukan permohonan baru dengan mengisi form ini.</p>
            </div>

            <form @submit.prevent="submitRequest" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Tujuan Instansi / OPD *</label>
                  <select v-model="formRequest.opd_id" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4">
                    <option value="" disabled>Pilih Instansi</option>
                    <option v-for="opd in opds" :key="opd.id" :value="opd.id">{{ opd.nama }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Kategori Pemohon *</label>
                  <select v-model="formRequest.kategori_pemohon" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4">
                    <option value="Perorangan">Perorangan</option>
                    <option value="Lembaga/Organisasi">Lembaga/Organisasi</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">NIK / No Identitas *</label>
                  <input type="text" v-model="formRequest.no_identitas" required maxlength="50" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Sesuai KTP / Akta">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                  <input type="text" v-model="formRequest.nama_lengkap" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Nama Pemohon">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Pekerjaan</label>
                  <input type="text" v-model="formRequest.pekerjaan" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Pekerjaan Pemohon">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input type="email" v-model="formRequest.email" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Alamat email aktif">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor HP / WhatsApp *</label>
                  <input type="text" v-model="formRequest.no_hp" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Nomor yang bisa dihubungi">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Alamat Lengkap</label>
                  <input type="text" v-model="formRequest.alamat" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Alamat Sesuai Identitas">
                </div>
                <div class="col-span-1 md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">File Identitas (PDF/Image) *</label>
                  <input type="file" @change="handleFileIdentitas" accept="application/pdf,image/jpeg,image/png" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white border py-2.5 px-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                  <p class="text-xs text-gray-500 mt-1">Upload KTP untuk perorangan, atau Akta untuk lembaga. Maksimal 2MB.</p>
                </div>
                <div class="col-span-1 md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Rincian Informasi yang Dibutuhkan *</label>
                  <textarea v-model="formRequest.rincian_informasi" required rows="4" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Sebutkan informasi spesifik yang ingin Anda minta"></textarea>
                </div>
                <div class="col-span-1 md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Tujuan Penggunaan Informasi *</label>
                  <textarea v-model="formRequest.tujuan_penggunaan" required rows="3" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Jelaskan alasan dan tujuan dari permintaan informasi ini"></textarea>
                </div>
                <div class="col-span-1 md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Cara Memperoleh Informasi *</label>
                  <select v-model="formRequest.cara_memperoleh" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4">
                    <option value="Melihat/Membaca">Melihat/Membaca</option>
                    <option value="Mendapatkan Salinan Softcopy">Mendapatkan Salinan Softcopy (Download Online)</option>
                    <option value="Mendapatkan Salinan Hardcopy">Mendapatkan Salinan Hardcopy (Ambil di Kantor)</option>
                  </select>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end">
                <button type="submit" :disabled="isSubmittingRequest" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70 flex items-center gap-2">
                  <span v-if="isSubmittingRequest" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {{ isSubmittingRequest ? 'Mengirim...' : 'Kirim Permohonan' }}
                </button>
              </div>

              <div v-if="reqSuccess" class="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 mt-4 font-medium flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Permohonan berhasil dikirim! Silakan simpan Nomor Registrasi berikut: <span class="font-bold text-lg bg-emerald-100 px-3 py-1 rounded-lg ml-2">{{ reqSuccessCode }}</span>
              </div>
              <div v-if="reqError" class="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mt-4 font-medium">
                {{ reqError }}
              </div>
            </form>
          </div>
        </div>

        <!-- Tab Content: Cek Status -->
        <div v-if="activeTab === 'status'" class="animate-fade-in">
          <div class="max-w-2xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Cek Status Permohonan</h2>
              <p class="text-gray-500 mt-2">Masukkan Nomor Registrasi yang Anda dapatkan saat mengajukan permohonan.</p>
            </div>

            <form @submit.prevent="checkStatus" class="space-y-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Registrasi *</label>
                <input type="text" v-model="formStatus.kode_registrasi" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Contoh: PPID-202607-XXXX">
              </div>
              
              <div class="pt-2 flex justify-end">
                <button type="submit" :disabled="isCheckingStatus" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70 flex items-center gap-2">
                  <span v-if="isCheckingStatus" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Cek Status
                </button>
              </div>
            </form>

            <div v-if="statusError" class="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 font-medium text-center">
              {{ statusError }}
            </div>

            <div v-if="statusResult" class="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-md animate-fade-in relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4">
                <span v-if="statusResult.status === 'Menunggu'" class="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold border border-yellow-200">Menunggu</span>
                <span v-if="statusResult.status === 'Diproses'" class="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-200">Diproses</span>
                <span v-if="statusResult.status === 'Selesai'" class="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold border border-green-200">Selesai</span>
                <span v-if="statusResult.status === 'Ditolak'" class="bg-red-100 text-red-800 px-4 py-1.5 rounded-full text-sm font-bold border border-red-200">Ditolak</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Hasil Pencarian</h3>
              <div class="space-y-4 text-gray-700">
                <div class="grid grid-cols-3 gap-2">
                  <div class="text-gray-500 font-medium">Pemohon</div>
                  <div class="col-span-2 font-semibold">{{ statusResult.nama_lengkap }}</div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <div class="text-gray-500 font-medium">Tgl Pengajuan</div>
                  <div class="col-span-2">{{ new Date(statusResult.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) }}</div>
                </div>
              </div>

              <div v-if="statusResult.alasan_penolakan" class="mt-6 bg-red-50 border border-red-200 p-4 rounded-xl">
                <h4 class="text-sm font-bold text-red-900 mb-1">Alasan Penolakan:</h4>
                <p class="text-red-800 text-sm">{{ statusResult.alasan_penolakan }}</p>
              </div>

              <div v-if="statusResult.file_jawaban" class="mt-6 bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                <h4 class="text-sm font-bold text-emerald-900 mb-2">Dokumen Jawaban:</h4>
                <a :href="getStorageUrl(statusResult.file_jawaban)" target="_blank" class="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Unduh File
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- Tab Content: Pengajuan Keberatan -->
        <div v-if="activeTab === 'keberatan'" class="animate-fade-in">
          <div class="max-w-2xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Pengajuan Keberatan</h2>
              <p class="text-gray-500 mt-2">Gunakan layanan ini jika permohonan Anda ditolak atau tanggapan yang diberikan tidak memuaskan.</p>
            </div>

            <form @submit.prevent="submitObjection" class="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Registrasi Permohonan Awal *</label>
                <input type="text" v-model="formObjection.kode_registrasi" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Contoh: PPID-202607-XXXX">
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Alasan Keberatan *</label>
                <select v-model="formObjection.alasan_keberatan" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4">
                  <option value="" disabled>Pilih Alasan Keberatan</option>
                  <option value="Permohonan Ditolak">Permohonan Ditolak</option>
                  <option value="Informasi Berkala Tidak Disediakan">Informasi Berkala Tidak Disediakan</option>
                  <option value="Permintaan Tidak Ditanggapi">Permintaan Tidak Ditanggapi</option>
                  <option value="Permintaan Ditanggapi Tidak Sesuai">Permintaan Ditanggapi Tidak Sesuai</option>
                  <option value="Biaya Tidak Wajar">Biaya Tidak Wajar</option>
                  <option value="Penyampaian Informasi Melebihi Waktu">Penyampaian Informasi Melebihi Waktu</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Penjelasan Singkat (Kasus Posisi) *</label>
                <textarea v-model="formObjection.kasus_posisi" required rows="4" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Jelaskan secara singkat alasan keberatan Anda"></textarea>
              </div>

              <div class="pt-6 border-t border-gray-100 flex justify-end">
                <button type="submit" :disabled="isSubmittingObjection" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-red-500/30 transition-all disabled:opacity-70 flex items-center gap-2">
                  <span v-if="isSubmittingObjection" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Kirim Keberatan
                </button>
              </div>
              
              <div v-if="objSuccess" class="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 mt-4 font-medium flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Pengajuan keberatan berhasil dikirim. Kami akan memproses eskalasi ini.
              </div>
              <div v-if="objError" class="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mt-4 font-medium">
                {{ objError }}
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, shallowRef } from 'import-vue'
import { DocumentTextIcon, PencilSquareIcon, MagnifyingGlassIcon, ScaleIcon } from '@heroicons/vue/24/outline'

const activeTab = ref('informasi')

const tabs = [
  { id: 'informasi', label: 'Informasi Publik', icon: shallowRef(DocumentTextIcon) },
  { id: 'permohonan', label: 'Permohonan Informasi', icon: shallowRef(PencilSquareIcon) },
  { id: 'status', label: 'Cek Status', icon: shallowRef(MagnifyingGlassIcon) },
  { id: 'keberatan', label: 'Keberatan', icon: shallowRef(ScaleIcon) },
]

// Data
const opds = ref([])
const dokuments = ref([])
const searchQuery = ref('')

// Load Init
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/api/opds')
    opds.value = await res.json()
    
    const resDoc = await fetch('http://localhost:8000/api/dokumen')
    dokuments.value = await resDoc.json()
  } catch(e) {
    console.error(e)
  }
})

const getStorageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `http://localhost:8000/storage/${path}`
}

const filteredDokuments = computed(() => {
  if (!searchQuery.value) return dokuments.value
  return dokuments.value.filter(d => d.judul.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

// === Permohonan Logic ===
const formRequest = ref({
  opd_id: '',
  kategori_pemohon: 'Perorangan',
  no_identitas: '',
  nama_lengkap: '',
  pekerjaan: '',
  email: '',
  no_hp: '',
  alamat: '',
  rincian_informasi: '',
  tujuan_penggunaan: '',
  cara_memperoleh: 'Mendapatkan Salinan Softcopy'
})
const fileIdentitas = ref(null)
const isSubmittingRequest = ref(false)
const reqSuccess = ref(false)
const reqSuccessCode = ref('')
const reqError = ref('')

const handleFileIdentitas = (e) => {
  fileIdentitas.value = e.target.files[0]
}

const submitRequest = async () => {
  isSubmittingRequest.value = true
  reqSuccess.value = false
  reqError.value = ''
  
  try {
    const formData = new FormData()
    for(const key in formRequest.value) {
      formData.append(key, formRequest.value[key])
    }
    if(fileIdentitas.value) formData.append('file_identitas', fileIdentitas.value)
    
    const response = await fetch('http://localhost:8000/api/ppid/request', {
      method: 'POST',
      body: formData
    })
    
    const data = await response.json()
    if(response.ok) {
      reqSuccess.value = true
      reqSuccessCode.value = data.data.kode_registrasi
      // reset
      formRequest.value.no_identitas = ''
      formRequest.value.nama_lengkap = ''
      formRequest.value.rincian_informasi = ''
      formRequest.value.tujuan_penggunaan = ''
    } else {
      reqError.value = data.message || 'Terjadi kesalahan saat memproses data.'
    }
  } catch(e) {
    reqError.value = 'Gagal terhubung ke server.'
  } finally {
    isSubmittingRequest.value = false
  }
}

// === Cek Status Logic ===
const formStatus = ref({ kode_registrasi: '' })
const isCheckingStatus = ref(false)
const statusResult = ref(null)
const statusError = ref('')

const checkStatus = async () => {
  isCheckingStatus.value = true
  statusResult.value = null
  statusError.value = ''
  
  try {
    const response = await fetch('http://localhost:8000/api/ppid/check-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formStatus.value)
    })
    
    const data = await response.json()
    if(response.ok) {
      statusResult.value = data.data
    } else {
      statusError.value = data.message || 'Data tidak ditemukan.'
    }
  } catch(e) {
    statusError.value = 'Gagal terhubung ke server.'
  } finally {
    isCheckingStatus.value = false
  }
}

// === Keberatan Logic ===
const formObjection = ref({
  kode_registrasi: '',
  alasan_keberatan: '',
  kasus_posisi: ''
})
const isSubmittingObjection = ref(false)
const objSuccess = ref(false)
const objError = ref('')

const submitObjection = async () => {
  isSubmittingObjection.value = true
  objSuccess.value = false
  objError.value = ''
  
  try {
    const response = await fetch('http://localhost:8000/api/ppid/objection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObjection.value)
    })
    
    const data = await response.json()
    if(response.ok) {
      objSuccess.value = true
      formObjection.value.kode_registrasi = ''
      formObjection.value.alasan_keberatan = ''
      formObjection.value.kasus_posisi = ''
    } else {
      objError.value = data.errors?.kode_registrasi?.[0] || data.message || 'Terjadi kesalahan.'
    }
  } catch(e) {
    objError.value = 'Gagal terhubung ke server.'
  } finally {
    isSubmittingObjection.value = false
  }
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
