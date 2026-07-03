<!-- batas normal-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <HeaderNav />

    <!-- Konten utama -->
    <main class="flex-grow bg-gray-100">
      <!-- padding-top sama tinggi header -->
      <router-view />
    </main>
    <FloatingWidget />
    <!-- Footer tetap -->
    <FooterSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import FloatingWidget from '@/components/FloatingWidget.vue'
import HeaderNav from './components/HeaderNav.vue'
import FooterSection from './components/AppFooter.vue'

const settingsStore = useSettingsStore()

useHead({
  title: computed(() => settingsStore.headerSettings?.site_name || 'LebakKab Portal'),
  meta: [
    {
      name: 'description',
      content: computed(() => settingsStore.headerSettings?.tagline || 'Portal Web Resmi Pemerintah Kabupaten Lebak')
    }
  ],
  link: [
    {
      rel: 'icon',
      href: computed(() => settingsStore.headerSettings?.favicon_url || '/favicon.ico')
    }
  ]
})

onMounted(() => {
  settingsStore.fetchSettings()
})
</script>
