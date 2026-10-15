// src/stores/bannerStore.js
import { defineStore } from 'pinia'
import axios from '@/utils/api'

const sortLatest = (items) => {
  if (!Array.isArray(items)) return []
  return [...items].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0
    if (timeB !== timeA) return timeB - timeA
    return (b.id || 0) - (a.id || 0)
  })
}

export const useBannerStore = defineStore('banner', {
  state: () => ({
    banners: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const res = await axios.get('/api/banner')
        this.banners = sortLatest(res.data)
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
    async fetchByKategori(kategori) {
      this.loading = true
      try {
        const res = await axios.get(`/api/banner/${kategori}`)
        this.banners = sortLatest(res.data)
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
  },
})
