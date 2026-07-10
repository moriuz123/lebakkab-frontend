import { defineStore } from 'pinia'
import axios from '@/utils/api'

export const useLayananStore = defineStore('layanan', {
  state: () => ({
    layanan: [],
    layananDetail: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchLayanan() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('/api/layanan')
        const baseStorage = import.meta.env.VITE_STORAGE_BASE_URL || '/storage'
        
        this.layanan = res.data.map(item => {
          if (item.cover && !item.cover.startsWith('http') && !item.cover.startsWith('/storage')) {
            item.cover = `${baseStorage}/${item.cover}`
          }
          return item
        })
      } catch (err) {
        console.error('Gagal memuat data layanan:', err)
        this.error = 'Gagal memuat data layanan'
      } finally {
        this.loading = false
      }
    },

    async fetchLayananDetail(slug) {
      this.loading = true
      this.error = null

      // ⭐ Reset dulu data lama
      this.layananDetail = null

      try {
        const res = await axios.get(`/api/layanan/${slug}`)

        // Tambahkan baseUrl/storage jika backend hanya kirim nama file
        const baseStorage = import.meta.env.VITE_STORAGE_BASE_URL || '/storage'
        const data = res.data

        if (data.cover && !data.cover.startsWith('http') && !data.cover.startsWith('/storage')) {
          data.cover = `${baseStorage}/${data.cover}`
        }

        this.layananDetail = data
      } catch (err) {
        console.error('Gagal memuat detail layanan:', err)
        this.error = 'Gagal memuat detail layanan'
      } finally {
        this.loading = false
      }
    },
  },
})
