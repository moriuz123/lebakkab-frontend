<template>
  <div>
    <!-- Header Section -->
    <PageHeader2
      title="Survei Kepuasan"
      :breadcrumbs="[
        { label: 'Home', link: '/' },
        { label: 'Survei Kepuasan Layanan', link: '#' },
      ]"
    />

    <!-- Main Content Shell -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <!-- Eyebrow & Titles -->
      <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#1e5ca8] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
          <span class="w-2 h-2 rounded-full bg-[#e8a020]"></span>
          <span>PAN RB · Survei Pemerintah Digital (SPBE)</span>
        </div>

        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
          Survei Kepuasan Layanan Digital
        </h1>

        <p class="mt-3.5 text-sm sm:text-base text-gray-600 leading-relaxed">
          Isi survei singkat di bawah (1–2 menit). Respons Anda tercatat langsung di dashboard instansi pada
          <a
            href="https://surveidigital.spbe.go.id/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#1e5ca8] font-bold hover:underline"
          >
            surveidigital.spbe.go.id
          </a>
          Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PAN RB) dan digunakan untuk mengevaluasi serta meningkatkan kualitas pelayanan digital Pemerintah Kabupaten Lebak.
        </p>
      </div>

      <!-- Notice / Pengaduan Box -->
      <div class="mb-8 bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-white border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="lucide:alert-circle" class="w-5 h-5" />
          </div>
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-gray-900">
              Ada kendala teknis atau pengaduan layanan?
            </h4>
            <p class="text-xs text-gray-600 mt-0.5 leading-relaxed">
              Silakan sampaikan aduan atau kendala Anda ke admin sebelum mengisi survei kepuasan.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
          <a
            href="https://wa.me/6281944114581?text=Halo%20Admin%20Portal%20Lebak%2C%20saya%20ingin%20menyampaikan%20kendala%2Flaporan%20layanan."
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xs hover:shadow transition-all"
          >
            <Icon name="lucide:message-circle" class="w-4 h-4" />
            <span>Kanal Aduan WA</span>
          </a>

          <router-link
            to="/kritik-saran"
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-xs transition-all"
          >
            <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
            <span>Kritik & Saran</span>
          </router-link>
        </div>
      </div>

      <!-- Ministry Embed Iframe Card -->
      <div class="bg-white rounded-3xl border border-gray-200/90 shadow-lg overflow-hidden relative">
        <!-- Top Colored Accent -->
        <div class="h-1.5 w-full bg-gradient-to-r from-[#0a2463] via-[#1e5ca8] to-[#e8a020]"></div>

        <!-- Frame Header -->
        <div class="px-5 py-3.5 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="font-medium text-gray-700">Layanan: <strong>Portal Lebakkab (SPBE)</strong></span>
          </div>

          <a
            :href="directEmbedUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-[#1e5ca8] font-semibold hover:underline"
            title="Buka form di tab baru"
          >
            <span>Buka Jendela Penuh</span>
            <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
          </a>
        </div>

        <!-- The Iframe Embed -->
        <div class="relative w-full bg-gray-50 min-h-[680px] sm:min-h-[760px]">
          <iframe
            id="skFrame"
            :src="embedSurveyUrl"
            class="w-full h-full min-h-[680px] sm:min-h-[760px] border-0"
            title="Survei Kepuasan Pengguna Layanan Digital"
            loading="eager"
            referrerpolicy="no-referrer-when-downgrade"
            allow="fullscreen"
          ></iframe>
        </div>

        <!-- Frame Footer Note -->
        <div class="p-4 px-6 bg-gray-50/90 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500">
          <div class="flex items-center gap-1.5">
            <Icon name="lucide:shield-check" class="w-4 h-4 text-emerald-600" />
            <span>Terintegrasi resmi dengan <strong>Kementerian PAN RB / SPBE</strong></span>
          </div>
          <span class="text-gray-400">Pemerintah Kabupaten Lebak</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import PageHeader2 from '@/components/PageHeader2.vue'

useHead({
  title: 'Survei Kepuasan Layanan Digital - Pemerintah Kabupaten Lebak',
  meta: [
    {
      name: 'description',
      content: 'Survei Kepuasan Pengguna Layanan Digital Portal Lebakkab — terintegrasi Survei Pemerintah Digital (PAN RB / SPBE).'
    }
  ]
})

const directEmbedUrl = 'https://surveidigital.spbe.go.id/embed/survey/eyJzdXJ2ZXlfaWQiOjIsInNlcnZpY2VfaWQiOjg3MiwiaG9zdCI6Imh0dHBzOi8vbGViYWtrYWIuZ28uaWQiLCJrZXkiOiJraW1MZTlodyJ9/embed/view/?jenis_layanan=lebakkab'

const embedSurveyUrl = computed(() => {
  // Jika di local development, gunakan proxy backend /api/survey/embed agar lolos validasi referer host
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return '/api/survey/embed?jenis_layanan=lebakkab'
  }
  return directEmbedUrl
})
</script>
