import { defineStore } from 'pinia'
import axios from '@/utils/api'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    data: null,
    loaded: false,
    cta: null,   // { label, url, target, color, icon }
  }),

  actions: {
    async fetchSettings() {
      if (this.loaded) return

      try {
        const res = await axios.get('/api/settings/header')

        if (res.data.status === 'success') {
          this.data = res.data.data
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

          // title
          if (this.data.site_name) {
            document.title = this.data.site_name
          }

          // favicon
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
        }

      } catch (error) {
        console.error('Gagal load settings:', error)
      }
    }
  }
})