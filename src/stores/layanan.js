import { defineStore } from 'pinia'
import axios from '@/utils/api'
import { getStorageUrl } from '@/utils/helpers'

export const useLayananStore = defineStore('layanan', {
  state: () => ({
    layanans: [],
    layananPagination: null,
    
    kategoriLayanans: [],
    kategoriPagination: null,
    
    layananDetail: null,
    
    loading: false,
    error: null,
  }),

  actions: {
    async fetchKategoriLayanan(page = 1) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`/api/kategori-layanan?page=${page}`)
        if (res.data && res.data.data) {
          this.kategoriLayanans = res.data.data
          this.kategoriPagination = res.data
        } else {
          this.kategoriLayanans = Array.isArray(res.data) ? res.data : []
          this.kategoriPagination = null
        }
      } catch (err) {
        console.error('Gagal memuat kategori layanan:', err)
        this.error = 'Gagal memuat kategori layanan'
      } finally {
        this.loading = false
      }
    },

    async fetchLayanan(page = 1) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`/api/layanan?page=${page}`)
        
        let data = []
        if (res.data && res.data.data) {
          data = res.data.data
          this.layananPagination = res.data
        } else {
          data = Array.isArray(res.data) ? res.data : []
          this.layananPagination = null
        }

        this.layanans = data.map(item => {
          if (item.cover) item.cover = getStorageUrl(item.cover)
          return item
        })
      } catch (err) {
        console.error('Gagal memuat data layanan:', err)
        this.error = 'Gagal memuat data layanan'
      } finally {
        this.loading = false
      }
    },

    async fetchLayananByKategori(slug, page = 1) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`/api/layanan/kategori/${slug}?page=${page}`)
        
        let data = []
        if (res.data && res.data.data) {
          data = res.data.data
          this.layananPagination = res.data
        } else {
          data = Array.isArray(res.data) ? res.data : []
          this.layananPagination = null
        }

        this.layanans = data.map(item => {
          if (item.cover) item.cover = getStorageUrl(item.cover)
          return item
        })
      } catch (err) {
        console.error('Gagal memuat data layanan berdasarkan kategori:', err)
        this.error = 'Gagal memuat data layanan'
      } finally {
        this.loading = false
      }
    },

    async fetchLayananDetail(slug) {
      this.loading = true
      this.error = null
      this.layananDetail = null

      try {
        const res = await axios.get(`/api/layanan/${slug}`)
        const data = res.data

        if (data.cover) {
          data.cover = getStorageUrl(data.cover)
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
