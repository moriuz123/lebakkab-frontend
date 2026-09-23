import { defineStore } from 'pinia'
import axios from '@/utils/api'

export const useAplikasiStore = defineStore('aplikasi', {
  state: () => ({
    aplikasis: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      total: 0
    },
    kategoriList: [],
  }),
  actions: {
    async fetchKategori() {
      try {
        const response = await axios.get('/api/kategori-aplikasi')
        this.kategoriList = response.data.data
      } catch (err) {
        console.error('Gagal memuat daftar kategori', err)
      }
    },
    async fetchAplikasis(params = {}) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/api/data-aplikasi', { params })
        // with laravel pagination, data is inside response.data.data.data
        // Wait, did I use ->paginate(9) without wrapping in response()->json?
        // Let's assume response.data.data is the paginator.
        
        if (response.data.data.data !== undefined) {
           this.aplikasis = response.data.data.data
           this.pagination.currentPage = response.data.data.current_page
           this.pagination.lastPage = response.data.data.last_page
           this.pagination.total = response.data.data.total
        } else {
           // Fallback if not paginated
           this.aplikasis = response.data.data
        }
      } catch (err) {
        this.error = err.message || 'Gagal memuat data aplikasi'
      } finally {
        this.loading = false
      }
    },
  },
})
