<template>
  <div>
    <!-- Page Header -->
    <PageHeader2
      :title="kecamatan?.nama || 'Detail Kecamatan'"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Kecamatan', link: '/kecamatan' },
        { label: kecamatan?.nama || 'Detail', link: '#' },
      ]"
    />

    <!-- Konten Utama + Sidebar -->
    <div class="page-container">
      <main class="page-main">

        <!-- Loading -->
        <div v-if="loading" class="page-loading-placeholder">Memuat detail kecamatan...</div>

        <!-- Error -->
        <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>

        <!-- Konten Kecamatan -->
        <article v-else-if="kecamatan" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <!-- Foto Kantor -->
          <div v-if="kecamatan.foto_kantor" class="w-full">
            <img
              :src="$storageUrl(kecamatan.foto_kantor)"
              alt="Foto Kantor"
              class="w-full h-64 object-cover"
            />
          </div>
          <!-- Placeholder jika tidak ada foto -->
          <div v-else class="w-full h-32 bg-gradient-to-r from-[#0a2463] to-[#1e5ca8]"></div>

          <!-- Header Identity -->
          <div class="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center gap-5">
            <!-- Avatar Inisial -->
            <div class="shrink-0 w-20 h-20 rounded-full bg-blue-50 text-[#0a2463] flex items-center justify-center ring-4 ring-white shadow-md border border-gray-100 text-2xl font-bold">
              {{ kecamatan.nama?.charAt(0) || 'K' }}
            </div>
            <!-- Nama & Kode -->
            <div>
              <h1 class="text-xl font-bold text-gray-900 leading-tight">
                {{ kecamatan.nama }}
              </h1>
              <span
                v-if="kecamatan.kode_kecamatan"
                class="inline-block mt-1 px-3 py-0.5 bg-blue-50 text-[#1e5ca8] text-xs font-semibold rounded-full"
              >
                Kode: {{ kecamatan.kode_kecamatan }}
              </span>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6 space-y-8">

            <!-- Grid: Kontak + Peta -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <!-- Informasi Kontak -->
              <div class="space-y-5">
                <h2 class="text-base font-bold text-gray-800 flex items-center gap-2">
                  <span class="w-1 h-5 bg-[#1e5ca8] rounded-full inline-block"></span>
                  Informasi Kontak
                </h2>

                <ul class="space-y-3">
                  <!-- Alamat -->
                  <li class="flex items-start gap-3 text-sm text-gray-700">
                    <div class="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Icon name="lucide:map-pin" class="w-4 h-4 text-[#1e5ca8]" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-400 font-medium mb-0.5">Alamat</p>
                      <p>{{ kecamatan.alamat_kantor || '-' }}</p>
                    </div>
                  </li>
                  <!-- Telepon -->
                  <li class="flex items-start gap-3 text-sm text-gray-700">
                    <div class="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Icon name="lucide:phone" class="w-4 h-4 text-[#1e5ca8]" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-400 font-medium mb-0.5">Telepon</p>
                      <p>{{ kecamatan.telepon || '-' }}</p>
                    </div>
                  </li>
                  <!-- Email -->
                  <li class="flex items-start gap-3 text-sm text-gray-700">
                    <div class="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Icon name="lucide:mail" class="w-4 h-4 text-[#1e5ca8]" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-400 font-medium mb-0.5">Email</p>
                      <a
                        v-if="kecamatan.email"
                        :href="`mailto:${kecamatan.email}`"
                        class="text-[#1e5ca8] hover:underline"
                      >
                        {{ kecamatan.email }}
                      </a>
                      <span v-else>-</span>
                    </div>
                  </li>
                  <!-- Website -->
                  <li class="flex items-start gap-3 text-sm text-gray-700">
                    <div class="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Icon name="lucide:globe" class="w-4 h-4 text-[#1e5ca8]" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-400 font-medium mb-0.5">Website</p>
                      <a
                        v-if="kecamatan.website"
                        :href="kecamatan.website"
                        target="_blank"
                        class="text-[#1e5ca8] hover:underline break-all"
                      >
                        {{ kecamatan.website }}
                      </a>
                      <span v-else>-</span>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Peta Lokasi -->
              <div v-if="kecamatan.peta_embed">
                <h2 class="text-base font-bold text-gray-800 flex items-center gap-2 mb-4">
                  <span class="w-1 h-5 bg-[#1e5ca8] rounded-full inline-block"></span>
                  Peta Lokasi
                </h2>
                <div
                  class="rounded-xl overflow-hidden border border-gray-100 h-72 shadow-sm"
                  v-html="kecamatan.peta_embed"
                ></div>
              </div>
              <!-- Placeholder peta tidak ada -->
              <div v-else class="flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 h-48">
                <div class="text-center text-gray-400">
                  <Icon name="lucide:map" class="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p class="text-sm">Peta belum tersedia</p>
                </div>
              </div>
            </div>

            <!-- Deskripsi -->
            <div v-if="kecamatan.deskripsi" class="pt-2">
              <h2 class="text-base font-bold text-gray-800 flex items-center gap-2 mb-3">
                <span class="w-1 h-5 bg-[#1e5ca8] rounded-full inline-block"></span>
                Deskripsi
              </h2>
              <p class="text-sm text-gray-700 leading-relaxed">{{ kecamatan.deskripsi }}</p>
            </div>

            <!-- Nama Camat -->
            <div v-if="kecamatan.nama_camat" class="pt-2">
              <h2 class="text-base font-bold text-gray-800 flex items-center gap-2 mb-3">
                <span class="w-1 h-5 bg-[#1e5ca8] rounded-full inline-block"></span>
                Camat
              </h2>
              <div class="inline-flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-xl border border-blue-100">
                <div class="w-9 h-9 rounded-full bg-[#0a2463] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {{ kecamatan.nama_camat.charAt(0) }}
                </div>
                <span class="text-sm font-semibold text-gray-800">{{ kecamatan.nama_camat }}</span>
              </div>
            </div>

          </div>
        </article>

        <!-- Not Found -->
        <div v-else class="page-loading-placeholder">Data tidak ditemukan</div>
      </main>

      <!-- Sidebar -->
      <div class="page-sidebar">
        <SidebarKecamatan :activeSlug="slug" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useKecamatanStore } from '@/stores/kecamatan'
import PageHeader2 from '@/components/PageHeader2.vue'
import SidebarKecamatan from '@/components/SidebarKecamatan.vue'

const route = useRoute()
const store = useKecamatanStore()

const kecamatan = ref(null)
const loading = ref(true)
const error = ref(null)
const slug = ref(route.params.slug)

const fetchDetail = async () => {
  loading.value = true
  error.value = null
  try {
    kecamatan.value = await store.getKecamatanBySlug(slug.value)
  } catch (err) {
    error.value = 'Gagal memuat detail kecamatan.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchDetail)

watch(
  () => route.params.slug,
  (newSlug, oldSlug) => {
    if (newSlug && newSlug !== oldSlug) {
      slug.value = newSlug
      fetchDetail()
    }
  },
)
</script>
