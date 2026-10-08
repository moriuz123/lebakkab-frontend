<!-- batas normal-->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Maintenance Mode Overlay -->
    <MaintenanceOverlay 
      v-if="settingsStore.maintenanceMode" 
      :logo-url="settingsStore.data?.logo_url"
    />

    <!-- Header -->
    <HeaderNav />

    <!-- Konten utama -->
    <main class="flex-grow bg-gray-100">
      <!-- padding-top sama tinggi header -->
      <router-view />
    </main>
    <FloatingWidget />
    <VisitorCounterWidget />
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
import VisitorCounterWidget from '@/components/VisitorCounterWidget.vue'
import MaintenanceOverlay from '@/components/MaintenanceOverlay.vue'
import HeaderNav from './components/HeaderNav.vue'
import FooterSection from './components/AppFooter.vue'

const settingsStore = useSettingsStore()

useHead({
  title: computed(() => settingsStore.siteName),
  meta: [
    {
      name: 'description',
      content: computed(() => settingsStore.metaDescription)
    },
    {
      name: 'keywords',
      content: computed(() => settingsStore.metaKeywords)
    },
    {
      property: 'og:site_name',
      content: computed(() => settingsStore.siteName)
    },
    {
      property: 'og:title',
      content: computed(() => settingsStore.siteName)
    },
    {
      property: 'og:description',
      content: computed(() => settingsStore.metaDescription)
    },
    {
      property: 'og:image',
      content: computed(() => settingsStore.logoUrl)
    }
  ],
  link: [
    {
      rel: 'icon',
      href: computed(() => settingsStore.faviconUrl)
    }
  ]
})

onMounted(() => {
  settingsStore.fetchSettings()
})
</script>
