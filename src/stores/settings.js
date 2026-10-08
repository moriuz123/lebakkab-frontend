import { defineStore } from 'pinia'
import axios from '@/utils/api'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    data: null,
    loaded: false,
    cta: null,   // { label, url, target, color, icon }
    maintenanceMode: false,
  }),

  getters: {
    siteName: (state) => state.data?.site_name || 'Portal Resmi Kabupaten Lebak',
    siteDescription: (state) => state.data?.site_description || 'Portal resmi layanan dan informasi pemerintah daerah.',
    metaDescription: (state) => state.data?.meta_description || state.data?.site_description || 'Portal resmi layanan dan informasi Pemerintah Kabupaten Lebak.',
    metaKeywords: (state) => state.data?.meta_keywords || 'pemerintah kabupaten lebak, lebak, portal lebak, rangkasbitung, spbe lebak, layanan publik lebak',
    googleAnalyticsId: (state) => state.data?.google_analytics_id || null,
    logoUrl: (state) => state.data?.logo_url || '/images/logo.png',
    faviconUrl: (state) => state.data?.favicon_url || '/favicon.ico',
    headerSettings: (state) => state.data || {},
    socialMedia: (state) => ({
      facebook: state.data?.facebook || '',
      instagram: state.data?.instagram || '',
      twitter: state.data?.twitter || '',
      youtube: state.data?.youtube || '',
      whatsapp: state.data?.whatsapp || '',
    }),
    sameAs: (state) => {
      if (!state.data) {
        return [
          'https://www.facebook.com/PemerintahKabupatenLebak',
          'https://www.instagram.com/protokollebak',
          'https://www.youtube.com/@diskominfolebak2375'
        ]
      }
      const links = []
      if (state.data.facebook) links.push(state.data.facebook)
      if (state.data.instagram) links.push(state.data.instagram)
      if (state.data.twitter) {
        const tw = state.data.twitter
        links.push(tw.startsWith('http') ? tw : `https://x.com/${tw.replace('@', '')}`)
      }
      if (state.data.youtube) links.push(state.data.youtube)
      return links.length > 0 ? links : [
        'https://www.facebook.com/PemerintahKabupatenLebak',
        'https://www.instagram.com/protokollebak',
        'https://www.youtube.com/@diskominfolebak2375'
      ]
    },
    twitterHandle: (state) => {
      const tw = state.data?.twitter
      if (!tw) return '@protokollebak'
      if (tw.startsWith('@')) return tw
      if (tw.includes('twitter.com/') || tw.includes('x.com/')) {
        const parts = tw.split('/').filter(Boolean)
        const last = parts[parts.length - 1]
        return last ? `@${last}` : '@protokollebak'
      }
      return `@${tw}`
    },
    contact: (state) => ({
      phone: state.data?.phone || '(0252) 201001',
      email: state.data?.email || 'admin@lebakkab.go.id',
      address: state.data?.address || 'Jl. Abdi Negara No. 3 Rangkasbitung, Kabupaten Lebak, Banten',
    }),
  },

  actions: {
    async fetchSettings() {
      if (this.loaded) return

      try {
        const res = await axios.get('/api/settings/header')

        if (res.data.status === 'success') {
          this.data = res.data.data
          this.maintenanceMode = Boolean(this.data.maintenance_mode)
          this.loaded = true

          // CTA Button dari backend
          if (this.data.cta_text && this.data.cta_url) {
            this.cta = {
              label: this.data.cta_text,
              url: this.data.cta_url,
              target: this.data.cta_target || '_blank',
              color: this.data.cta_color || '#e8a020',
              icon: this.data.cta_icon || null,
            }
          }

          // Sinkronisasi Favicon
          const faviconUrl = this.data.favicon_url || '/favicon.ico'
          let icons = document.querySelectorAll("link[rel*='icon']")

          if (icons.length === 0) {
            let icon = document.createElement('link')
            icon.rel = 'icon'
            icon.href = faviconUrl + '?v=' + Date.now()
            document.head.appendChild(icon)
          } else {
            icons.forEach(icon => {
              icon.href = faviconUrl + '?v=' + Date.now()
            })
          }

          // Sinkronisasi Meta Description & Keywords Default jika ada
          if (this.data.meta_description) {
            const metaDesc = document.querySelector('meta[name="description"]')
            if (metaDesc) metaDesc.setAttribute('content', this.data.meta_description)
            const ogDesc = document.querySelector('meta[property="og:description"]')
            if (ogDesc) ogDesc.setAttribute('content', this.data.meta_description)
          }

          if (this.data.meta_keywords) {
            const metaKeywords = document.querySelector('meta[name="keywords"]')
            if (metaKeywords) metaKeywords.setAttribute('content', this.data.meta_keywords)
          }

          // Dynamic Google Analytics Injection
          if (this.data.google_analytics_id && !document.getElementById('ga-gtag-script')) {
            const gaId = this.data.google_analytics_id.trim()
            if (gaId && (gaId.startsWith('G-') || gaId.startsWith('UA-'))) {
              const script = document.createElement('script')
              script.id = 'ga-gtag-script'
              script.async = true
              script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
              document.head.appendChild(script)

              const inlineScript = document.createElement('script')
              inlineScript.id = 'ga-gtag-init'
              inlineScript.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `
              document.head.appendChild(inlineScript)
            }
          }
        }

      } catch (error) {
        console.error('Gagal load settings:', error)
      }
    }
  }
})