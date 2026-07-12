import { defineStore } from 'pinia'
import axios from '@/utils/api'

export const usePejabatStore = defineStore('pejabat', {
  state: () => ({
    pejabats: [],
    pejabatDetail: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPejabats() {
      this.loading = true
      this.error = null
      try {
        // Attempting to fetch from API if exists. If not, fallback to mock data
        const response = await axios.get('/api/pejabat').catch(() => null)
        if (response && response.data && response.data.data) {
          this.pejabats = response.data.data
        } else {
          // Fallback MOCK DATA
          this.pejabats = [
            {
              id: 1,
              slug: 'bupati-lebak',
              nama: 'Dr. H. Contoh Bupati, M.Si.',
              jabatan: 'Bupati Lebak',
              foto: '',
              periode: '2019 - 2024',
              deskripsi: 'Bertanggung jawab penuh atas penyelenggaraan pemerintahan daerah di Kabupaten Lebak.',
              pendidikan: 'S3 Ilmu Pemerintahan, Universitas Contoh',
              karir: 'Pernah menjabat sebagai Wakil Bupati Lebak periode sebelumnya.',
              sosmed: { instagram: '#', twitter: '#', facebook: '#' }
            },
            {
              id: 2,
              slug: 'wakil-bupati-lebak',
              nama: 'H. Contoh Wakil, S.E.',
              jabatan: 'Wakil Bupati Lebak',
              foto: '',
              periode: '2019 - 2024',
              deskripsi: 'Membantu Bupati dalam penyelenggaraan pemerintahan dan pembangunan daerah.',
              pendidikan: 'S1 Ekonomi, Universitas Contoh',
              karir: 'Pernah menjabat sebagai Anggota DPRD.',
              sosmed: { instagram: '#', facebook: '#' }
            },
            {
              id: 3,
              slug: 'sekretaris-daerah',
              nama: 'Ir. H. Contoh Sekda, M.M.',
              jabatan: 'Sekretaris Daerah',
              foto: '',
              periode: '2021 - Sekarang',
              deskripsi: 'Membantu Bupati dalam menyusun kebijakan dan mengoordinasikan dinas daerah.',
              pendidikan: 'S2 Magister Manajemen',
              karir: 'Mantan Kepala Bappeda Lebak.',
              sosmed: {}
            }
          ]
        }
      } catch (err) {
        console.error('Error fetching pejabats:', err)
        this.error = 'Gagal memuat data profil pejabat.'
      } finally {
        this.loading = false
      }
    },
    async fetchPejabatBySlug(slug) {
      this.loading = true
      this.error = null
      this.pejabatDetail = null
      try {
        const response = await axios.get(`/api/pejabat/${slug}`).catch(() => null)
        if (response && response.data && response.data.data) {
          this.pejabatDetail = response.data.data
        } else {
          // Fallback to local filtering from mock data
          if (this.pejabats.length === 0) {
            await this.fetchPejabats()
          }
          this.pejabatDetail = this.pejabats.find((p) => p.slug === slug)
          if (!this.pejabatDetail) {
             throw new Error('Data pejabat tidak ditemukan')
          }
        }
      } catch (err) {
        console.error('Error fetching pejabat detail:', err)
        this.error = 'Profil pejabat tidak ditemukan.'
      } finally {
        this.loading = false
      }
    },
  },
})
