<template>
  <PageHeader2 title="Halaman Tidak ada" />
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
    <h1 class="text-9xl font-bold text-gray-800">404</h1>
    <p class="mt-4 text-2xl font-semibold text-gray-600">Halaman Tidak Ditemukan</p>
    <p class="mt-2 text-gray-500">
      Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
    </p>

    <router-link
      to="/"
      class="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
    >
      Kembali ke Beranda
    </router-link>
  </div>
</template>

<script setup>
import PageHeader2 from '@/components/PageHeader2.vue'
import { useSeo } from '@/composables/useSeo'

// 🔹 Proteksi Google: Jangan pernah indeks halaman 404
useSeo({
  title: 'Halaman Tidak Ditemukan (404)',
  description: 'Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.',
  robotsIndex: false,
  robotsFollow: false,
})
</script>
