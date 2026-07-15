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
          <span class="text-white">SPON TTE</span>
        </nav>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
          Sistem Pelayanan Online <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">Tanda Tangan Elektronik</span>
        </h1>
        <p class="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
          Dikelola oleh Dinas Komunikasi, Informatika, Statistik dan Persandian Kabupaten Lebak
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

        <!-- Tab Content: Tentang TTE -->
        <div v-if="activeTab === 'tentang'" class="animate-fade-in space-y-8">
          <div v-if="loadingInfo" class="animate-pulse space-y-4">
            <div class="h-8 bg-gray-200 rounded w-1/3"></div>
            <div class="h-32 bg-gray-100 rounded-xl"></div>
          </div>
          <template v-else>
            <div v-for="info in infoData.tentang" :key="info.id" class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ info.judul }}</h2>
              <div v-html="info.konten" class="prose prose-blue max-w-none text-gray-700"></div>
              <img v-if="info.gambar" :src="getStorageUrl(info.gambar)" class="mt-6 rounded-2xl shadow-md max-w-full h-auto" />
            </div>
            <div v-if="!infoData.tentang?.length" class="text-center py-12 text-gray-500">
              Informasi belum tersedia.
            </div>
          </template>
        </div>

        <!-- Tab Content: Alur & Prosedur -->
        <div v-if="activeTab === 'alur'" class="animate-fade-in space-y-8">
          <div v-for="info in infoData.alur_prosedur" :key="info.id" class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ info.judul }}</h2>
            <div v-html="info.konten" class="prose prose-blue max-w-none text-gray-700"></div>
            <img v-if="info.gambar" :src="getStorageUrl(info.gambar)" class="mt-6 rounded-2xl shadow-md max-w-full h-auto mx-auto" />
          </div>
          <div v-if="!infoData.alur_prosedur?.length" class="text-center py-12 text-gray-500">
            Alur pendaftaran belum tersedia.
          </div>
        </div>

        <!-- Tab Content: Daftar TTE (Form) -->
        <div v-if="activeTab === 'daftar'" class="animate-fade-in">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Formulir Pengajuan TTE</h2>
              <p class="text-gray-500 mt-2">Isi data di bawah ini dengan benar untuk mengajukan penerbitan Tanda Tangan Elektronik.</p>
            </div>

            <form @submit.prevent="submitRegistration" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Instansi / OPD / Kecamatan *</label>
                  <select v-model="formReg.instansi_combined" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4">
                    <option value="" disabled>Pilih Instansi</option>
                    <optgroup label="OPD / Dinas">
                      <option v-for="opd in opds" :key="'opd-'+opd.id" :value="'opd-'+opd.id">{{ opd.nama }}</option>
                    </optgroup>
                    <optgroup label="Kecamatan">
                      <option v-for="kec in kecamatans" :key="'kec-'+kec.id" :value="'kec-'+kec.id">{{ kec.nama }}</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">NIK *</label>
                  <input type="text" v-model="formReg.nik" required maxlength="20" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Nomor Induk Kependudukan">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                  <input type="text" v-model="formReg.nama_lengkap" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Nama beserta gelar">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">NIP</label>
                  <input type="text" v-model="formReg.nip" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Nomor Induk Pegawai (Opsional)">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Jabatan</label>
                  <input type="text" v-model="formReg.jabatan" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Contoh: Kepala Bidang X">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input type="email" v-model="formReg.email" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Alamat email aktif">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor HP / WhatsApp *</label>
                  <input type="text" v-model="formReg.no_hp" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Nomor yang bisa dihubungi">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Surat Rekomendasi (PDF) *</label>
                  <input type="file" @change="handleFileUpload" accept="application/pdf" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white border py-2.5 px-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                  <p class="text-xs text-gray-500 mt-1">Maksimal 5MB.</p>
                </div>
              </div>

              <!-- Syarat tambahan (dari DB) -->
              <div v-if="infoData.syarat?.length" class="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-6">
                <h4 class="font-bold text-blue-900 mb-2">Persyaratan Tambahan:</h4>
                <div v-for="info in infoData.syarat" :key="info.id">
                  <div v-html="info.konten" class="prose prose-sm text-blue-800"></div>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end">
                <button type="submit" :disabled="isSubmittingReg" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70 flex items-center gap-2">
                  <span v-if="isSubmittingReg" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {{ isSubmittingReg ? 'Mengirim...' : 'Kirim Pengajuan' }}
                </button>
              </div>

              <div v-if="regSuccess" class="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 mt-4 font-medium flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Pengajuan berhasil dikirim! Tim kami akan segera memprosesnya.
              </div>
              <div v-if="regError" class="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mt-4 font-medium">
                {{ regError }}
              </div>
            </form>
          </div>
        </div>

        <!-- Tab Content: Video Tutorial -->
        <div v-if="activeTab === 'tutorial'" class="animate-fade-in space-y-8">
           <div v-for="info in infoData.tutorial" :key="info.id" class="mb-10">
            <h2 class="text-xl font-bold text-gray-900 mb-4">{{ info.judul }}</h2>
            <div v-if="getYoutubeEmbedUrl(info.konten)" class="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-4">
              <iframe 
                :src="getYoutubeEmbedUrl(info.konten)" 
                class="w-full h-full"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
            <div v-else-if="info.konten" v-html="info.konten" class="prose prose-blue max-w-none text-gray-700 mb-4"></div>
          </div>
          <div v-if="!infoData.tutorial?.length" class="text-center py-12 text-gray-500">
            Video tutorial belum tersedia.
          </div>
        </div>

        <!-- Tab Content: Cek Status TTE -->
        <div v-if="activeTab === 'status'" class="animate-fade-in">
          <div class="max-w-2xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Cek Status Pengajuan</h2>
              <p class="text-gray-500 mt-2">Masukkan NIK dan NIP (opsional) Anda untuk melihat status pendaftaran TTE.</p>
            </div>

            <form @submit.prevent="checkStatus" class="space-y-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">NIK *</label>
                <input type="text" v-model="formStatus.nik" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Nomor Induk Kependudukan">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">NIP</label>
                <input type="text" v-model="formStatus.nip" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4" placeholder="Nomor Induk Pegawai (Opsional)">
              </div>
              
              <div class="pt-2 flex justify-end">
                <button type="submit" :disabled="isCheckingStatus" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70 flex items-center gap-2">
                  <span v-if="isCheckingStatus" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Cari Data
                </button>
              </div>
            </form>

            <div v-if="statusError" class="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 font-medium text-center">
              {{ statusError }}
            </div>

            <div v-if="statusResult" class="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-md animate-fade-in relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4">
                <span v-if="statusResult.status === 'menunggu'" class="bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-bold border border-yellow-200">Menunggu</span>
                <span v-if="statusResult.status === 'diproses'" class="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-200">Diproses</span>
                <span v-if="statusResult.status === 'selesai'" class="bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold border border-green-200">Selesai</span>
                <span v-if="statusResult.status === 'ditolak'" class="bg-red-100 text-red-800 px-4 py-1.5 rounded-full text-sm font-bold border border-red-200">Ditolak</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Hasil Pencarian</h3>
              <div class="space-y-4 text-gray-700">
                <div class="grid grid-cols-3 gap-2">
                  <div class="text-gray-500 font-medium">Nama</div>
                  <div class="col-span-2 font-semibold">{{ statusResult.nama_lengkap }}</div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <div class="text-gray-500 font-medium">Instansi</div>
                  <div class="col-span-2">{{ statusResult.opd || '-' }}</div>
                </div>
                <div class="grid grid-cols-3 gap-2">
                  <div class="text-gray-500 font-medium">Tgl Pengajuan</div>
                  <div class="col-span-2">{{ new Date(statusResult.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) }}</div>
                </div>
              </div>

              <div v-if="statusResult.catatan_admin" class="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <h4 class="text-sm font-bold text-blue-900 mb-1">Catatan Admin:</h4>
                <p class="text-blue-800 text-sm">{{ statusResult.catatan_admin }}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Tab Content: Ulasan Layanan -->
        <div v-if="activeTab === 'ulasan'" class="animate-fade-in">
          <div class="max-w-2xl mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Ulasan & Masukan</h2>
              <p class="text-gray-500 mt-2">Bantu kami meningkatkan kualitas layanan SPON TTE dengan memberikan penilaian Anda.</p>
            </div>

            <form @submit.prevent="submitFeedback" class="space-y-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nama</label>
                <input type="text" v-model="formFb.nama" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" v-model="formFb.email" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Instansi / OPD / Kecamatan</label>
                <select v-model="formFb.instansi" required class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4">
                  <option value="" disabled>Pilih Instansi</option>
                  <optgroup label="OPD / Dinas">
                    <option v-for="opd in opds" :key="'fb-opd-'+opd.id" :value="opd.nama">{{ opd.nama }}</option>
                  </optgroup>
                  <optgroup label="Kecamatan">
                    <option v-for="kec in kecamatans" :key="'fb-kec-'+kec.id" :value="kec.nama">{{ kec.nama }}</option>
                  </optgroup>
                </select>
              </div>
              <div class="space-y-4">
                <label class="block text-sm font-semibold text-gray-700">Penilaian Layanan (Opsional)</label>
                
                <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span class="text-gray-700 text-sm font-medium">Kemudahan Penggunaan Sistem</span>
                  <div class="flex gap-1">
                     <button type="button" v-for="star in 5" :key="'kemudah-'+star" @click="formFb.rating_kemudahan = star" class="text-2xl focus:outline-none transition-transform hover:scale-110" :class="star <= formFb.rating_kemudahan ? 'text-yellow-400' : 'text-gray-200'">★</button>
                  </div>
                </div>
                
                <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span class="text-gray-700 text-sm font-medium">Kecepatan Proses Pelayanan</span>
                  <div class="flex gap-1">
                     <button type="button" v-for="star in 5" :key="'kecep-'+star" @click="formFb.rating_kecepatan = star" class="text-2xl focus:outline-none transition-transform hover:scale-110" :class="star <= formFb.rating_kecepatan ? 'text-yellow-400' : 'text-gray-200'">★</button>
                  </div>
                </div>
                
                <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span class="text-gray-700 text-sm font-medium">Kejelasan Informasi & Alur</span>
                  <div class="flex gap-1">
                     <button type="button" v-for="star in 5" :key="'kejel-'+star" @click="formFb.rating_kejelasan = star" class="text-2xl focus:outline-none transition-transform hover:scale-110" :class="star <= formFb.rating_kejelasan ? 'text-yellow-400' : 'text-gray-200'">★</button>
                  </div>
                </div>
                
                <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <span class="text-gray-700 text-sm font-medium">Kualitas Bantuan / Support</span>
                  <div class="flex gap-1">
                     <button type="button" v-for="star in 5" :key="'pelay-'+star" @click="formFb.rating_pelayanan = star" class="text-2xl focus:outline-none transition-transform hover:scale-110" :class="star <= formFb.rating_pelayanan ? 'text-yellow-400' : 'text-gray-200'">★</button>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Pesan / Masukan *</label>
                <textarea v-model="formFb.pesan" required rows="5" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-3 px-4"></textarea>
              </div>

              <div class="pt-4 flex justify-end">
                <button type="submit" :disabled="isSubmittingFb" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70 flex items-center gap-2">
                  <span v-if="isSubmittingFb" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Kirim Pesan
                </button>
              </div>

              <div v-if="fbSuccess" class="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 mt-4 font-medium flex items-center gap-3">
                Terima kasih atas ulasan dan masukan Anda!
              </div>
              <div v-if="fbError" class="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mt-4 font-medium">
                {{ fbError }}
              </div>
            </form>
          </div>
        </div>

        <!-- Tab Content: Bantuan -->
        <div v-if="activeTab === 'bantuan'" class="animate-fade-in">
          <div class="max-w-2xl mx-auto text-center">
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900">Pusat Bantuan TTE</h2>
              <p class="text-gray-500 mt-2">Mengalami kendala teknis atau punya pertanyaan seputar pendaftaran? Hubungi tim support kami via WhatsApp.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <a href="https://wa.me/628111111111" target="_blank" class="bg-white p-6 rounded-2xl border border-green-100 shadow-lg shadow-green-500/10 hover:-translate-y-1 hover:shadow-green-500/20 transition-all group flex flex-col items-center">
                <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 class="font-bold text-gray-900 text-lg mb-1">Admin Support 1</h3>
                <p class="text-green-600 font-semibold mb-3">0811-1111-1111</p>
                <span class="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">Senin - Jumat (08:00 - 16:00)</span>
              </a>

              <a href="https://wa.me/628222222222" target="_blank" class="bg-white p-6 rounded-2xl border border-green-100 shadow-lg shadow-green-500/10 hover:-translate-y-1 hover:shadow-green-500/20 transition-all group flex flex-col items-center">
                <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 class="font-bold text-gray-900 text-lg mb-1">Admin Support 2</h3>
                <p class="text-green-600 font-semibold mb-3">0822-2222-2222</p>
                <span class="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">Senin - Jumat (08:00 - 16:00)</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Info, Map, FileSignature, PlaySquare, MessageSquare, Search, HelpCircle } from 'lucide-vue-next'
import axios from '@/utils/api'
import { getStorageUrl } from '@/utils/helpers'

const tabs = [
  { id: 'tentang', label: 'Tentang', icon: Info },
  { id: 'alur', label: 'Alur', icon: Map },
  { id: 'daftar', label: 'Daftar', icon: FileSignature },
  { id: 'status', label: 'Status', icon: Search },
  { id: 'tutorial', label: 'Tutorial', icon: PlaySquare },
  { id: 'ulasan', label: 'Ulasan', icon: MessageSquare },
  { id: 'bantuan', label: 'Bantuan', icon: HelpCircle },
]

const activeTab = ref('tentang')

// Data info dari backend
const loadingInfo = ref(false)
const infoData = ref({
  tentang: [],
  alur_prosedur: [],
  syarat: [],
  tutorial: []
})

// Data OPD untuk select box
const opds = ref([])
const kecamatans = ref([])

// Form Pendaftaran
const formReg = ref({
  instansi_combined: '',
  nik: '',
  nama_lengkap: '',
  nip: '',
  jabatan: '',
  email: '',
  no_hp: '',
  surat_rekomendasi: null
})
const isSubmittingReg = ref(false)
const regSuccess = ref(false)
const regError = ref('')

// Form Feedback
const formFb = ref({
  nama: '',
  email: '',
  instansi: '',
  pesan: '',
  rating_kemudahan: 0,
  rating_kecepatan: 0,
  rating_kejelasan: 0,
  rating_pelayanan: 0
})
const isSubmittingFb = ref(false)
const fbSuccess = ref(false)
const fbError = ref('')

// Form Cek Status
const formStatus = ref({
  nik: '',
  nip: ''
})
const isCheckingStatus = ref(false)
const statusResult = ref(null)
const statusError = ref('')

const fetchInfo = async () => {
  loadingInfo.value = true
  try {
    const res = await axios.get('/api/spon-tte/info')
    infoData.value = res.data.data
  } catch (error) {
    console.error('Failed to fetch TTE info', error)
  } finally {
    loadingInfo.value = false
  }
}

const getYoutubeEmbedUrl = (htmlContent) => {
  if (!htmlContent) return null;
  // Menghapus tag HTML (seperti <p>) yang mungkin ditambahkan oleh RichEditor
  const text = htmlContent.replace(/<[^>]+>/g, '').trim();
  
  // Regex untuk mencocokkan URL Youtube (youtube.com atau youtu.be)
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = text.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
}

const fetchOpds = async () => {
  try {
    const res = await axios.get('/api/opds')
    opds.value = res.data.data || res.data
  } catch (error) {
    console.error('Failed to fetch OPDs', error)
  }
}

const fetchKecamatans = async () => {
  try {
    const res = await axios.get('/api/kecamatan')
    kecamatans.value = res.data.data || res.data
  } catch (error) {
    console.error('Failed to fetch Kecamatans', error)
  }
}

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file && file.type === 'application/pdf') {
    formReg.value.surat_rekomendasi = file
  } else {
    alert('Harap unggah file PDF.')
    e.target.value = ''
  }
}

const submitRegistration = async () => {
  isSubmittingReg.value = true
  regSuccess.value = false
  regError.value = ''

  try {
    const formData = new FormData()
    
    // Parse instansi_combined
    const [instansi_type, instansi_id] = formReg.value.instansi_combined.split('-');
    formData.append('instansi_type', instansi_type);
    formData.append('instansi_id', instansi_id);
    
    Object.keys(formReg.value).forEach(key => {
      if (key !== 'instansi_combined') {
        formData.append(key, formReg.value[key])
      }
    })

    await axios.post('/api/spon-tte/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    regSuccess.value = true
    // Reset form
    formReg.value = {
      instansi_combined: '', nik: '', nama_lengkap: '', nip: '', jabatan: '', email: '', no_hp: '', surat_rekomendasi: null
    }
  } catch (error) {
    regError.value = error.response?.data?.message || 'Terjadi kesalahan saat mengirim pengajuan.'
  } finally {
    isSubmittingReg.value = false
  }
}

const submitFeedback = async () => {
  isSubmittingFb.value = true
  fbSuccess.value = false
  fbError.value = ''

  try {
    await axios.post('/api/spon-tte/feedback', formFb.value)
    
    fbSuccess.value = true
    // Reset form
    formFb.value = {
      nama: '', email: '', instansi: '', pesan: '', 
      rating_kemudahan: 0, rating_kecepatan: 0, rating_kejelasan: 0, rating_pelayanan: 0
    }
  } catch (error) {
    fbError.value = error.response?.data?.message || 'Terjadi kesalahan saat mengirim pesan.'
  } finally {
    isSubmittingFb.value = false
  }
}

const checkStatus = async () => {
  isCheckingStatus.value = true
  statusResult.value = null
  statusError.value = ''

  try {
    const res = await axios.get('/api/spon-tte/check-status', {
      params: {
        nik: formStatus.value.nik,
        nip: formStatus.value.nip
      }
    })
    statusResult.value = res.data.data
  } catch (error) {
    statusError.value = error.response?.data?.message || 'Gagal memeriksa status. Coba lagi.'
  } finally {
    isCheckingStatus.value = false
  }
}

onMounted(() => {
  fetchInfo()
  fetchOpds()
  fetchKecamatans()
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
