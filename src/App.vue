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
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:site',
      content: computed(() => settingsStore.twitterHandle)
    },
    {
      name: 'twitter:creator',
      content: computed(() => settingsStore.twitterHandle)
    }
  ],
  link: [
    {
      rel: 'icon',
      href: computed(() => settingsStore.faviconUrl)
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'GovernmentOrganization',
            '@id': 'https://lebakkab.go.id/#organization',
            'name': settingsStore.siteName,
            'alternateName': 'Pemerintah Daerah Kabupaten Lebak',
            'url': 'https://lebakkab.go.id',
            'logo': {
              '@type': 'ImageObject',
              'url': settingsStore.logoUrl,
              'caption': `Logo ${settingsStore.siteName}`
            },
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': settingsStore.contact.address,
              'addressLocality': 'Lebak',
              'addressRegion': 'Banten',
              'postalCode': '42312',
              'addressCountry': 'ID'
            },
            'contactPoint': [
              {
                '@type': 'ContactPoint',
                'telephone': settingsStore.contact.phone,
                'email': settingsStore.contact.email,
                'contactType': 'customer service',
                'areaServed': 'ID',
                'availableLanguage': ['id', 'en']
              }
            ],
            'sameAs': settingsStore.sameAs
          },
          {
            '@type': 'WebSite',
            '@id': 'https://lebakkab.go.id/#website',
            'url': 'https://lebakkab.go.id',
            'name': settingsStore.siteName,
            'description': settingsStore.metaDescription,
            'publisher': {
              '@id': 'https://lebakkab.go.id/#organization'
            },
            'inLanguage': 'id-ID',
            'potentialAction': {
              '@type': 'SearchAction',
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': 'https://lebakkab.go.id/pencarian?q={search_term_string}'
              },
              'query-input': 'required name=search_term_string'
            }
          }
        ]
      }))
    }
  ]
})

onMounted(() => {
  settingsStore.fetchSettings()
})
</script>
