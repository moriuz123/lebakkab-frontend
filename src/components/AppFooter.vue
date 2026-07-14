<template>
  <footer
    class="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white font-sans mt-12 shadow-inner"
  >
    <div class="container mx-auto px-6 max-w-screen-xl py-12">
      <!-- Grid 4 Kolom -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Kolom 1: Profil -->
        <div class="flex flex-col">
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-14 h-14 bg-white rounded flex items-center justify-center p-1.5 shrink-0 shadow-sm"
            >
              <img
                v-if="footer.logo_url"
                :src="footer.logo_url"
                alt="Logo"
                class="max-w-full max-h-full object-contain"
              />
            </div>
            <div>
              <h2 class="text-xl text-white font-bold leading-tight">
                {{ footer.site_name || 'Kabupaten Lebak' }}
              </h2>
              <p class="text-[10px] text-white font-bold tracking-wider uppercase mt-1">
                {{ footer.satuan_kerja || 'WORKING WITH HEART' }}
              </p>
            </div>
          </div>
          <p class="text-sm text-white mb-6 leading-relaxed">
            Portal Informasi dan Layanan Publik Terpadu Pemerintah Kabupaten Lebak, Provinsi Banten.
          </p>
          <div class="flex gap-3">
            <a
              v-if="footer.facebook"
              :href="footer.facebook"
              target="_blank"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:-translate-y-1 text-white transition-all duration-300"
            >
              <Facebook class="w-4 h-4" />
            </a>
            <a
              v-else
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:-translate-y-1 text-white transition-all duration-300"
            >
              <Share2 class="w-4 h-4" />
            </a>

            <a
              v-if="footer.twitter"
              :href="footer.twitter"
              target="_blank"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:-translate-y-1 text-white transition-all duration-300"
            >
              <Twitter class="w-4 h-4" />
            </a>
            <a
              v-else
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:-translate-y-1 text-white transition-all duration-300"
            >
              <AtSign class="w-4 h-4" />
            </a>

            <a
              v-if="footer.instagram"
              :href="footer.instagram"
              target="_blank"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:-translate-y-1 text-white transition-all duration-300"
            >
              <Instagram class="w-4 h-4" />
            </a>
            <a
              v-else
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:-translate-y-1 text-white transition-all duration-300"
            >
              <Camera class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Kolom 2: Widget 1 -->
        <div v-if="footerWidget1">
          <h3 class="text-sm font-bold text-white mb-6 uppercase tracking-wider">
            {{ footerWidget1.title }}
          </h3>
          <ul class="space-y-4 text-sm text-white">
            <li v-for="link in footerWidget1.children" :key="link.id">
              <a
                :href="link.url || '#'"
                class="inline-block hover:text-teal-500 hover:translate-x-1 transition-all duration-300"
                >{{ link.title }}</a
              >
            </li>
          </ul>
        </div>
        <div v-else>
          <h3 class="text-sm font-bold text-white mb-6 uppercase tracking-wider">Tautan Cepat</h3>
          <ul class="space-y-4 text-sm text-white">
            <li><span class="opacity-75">Memuat...</span></li>
          </ul>
        </div>

        <!-- Kolom 3: Widget 2 -->
        <div v-if="footerWidget2">
          <h3 class="text-sm font-bold text-white mb-6 uppercase tracking-wider">
            {{ footerWidget2.title }}
          </h3>
          <ul class="space-y-4 text-sm text-white">
            <li v-for="link in footerWidget2.children" :key="link.id">
              <a
                :href="link.url || '#'"
                class="inline-block hover:text-teal-500 hover:translate-x-1 transition-all duration-300"
                >{{ link.title }}</a
              >
            </li>
          </ul>
        </div>
        <div v-else>
          <h3 class="text-sm font-bold text-white mb-6 uppercase tracking-wider">
            Informasi Publik
          </h3>
          <ul class="space-y-4 text-sm text-white">
            <li><span class="opacity-75">Memuat...</span></li>
          </ul>
        </div>

        <!-- Kolom 4: Hubungi Kami -->
        <div>
          <h3 class="text-sm font-bold text-white mb-6 uppercase tracking-wider">Hubungi Kami</h3>
          <div class="space-y-4 text-sm text-white">
            <p class="leading-relaxed whitespace-pre-line">
              {{
                footer.address ||
                'Gedung Sekretariat Daerah (SETDA) Lebak,\nJl. Abdi Negara No. 3, Rangkasbitung,\nKabupaten Lebak, Banten 42312'
              }}
            </p>
            <div class="flex items-center gap-3">
              <Mail class="w-4 h-4 text-white" />
              <span>{{ footer.email || 'kontak@lebakkab.go.id' }}</span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="w-4 h-4 text-white" />
              <span>{{ footer.phone || '+62 252 201 001' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bagian Bawah -->
    <div class="bg-gradient-to-r from-green-950 to-green-900 border-t border-white/10">
      <div
        class="container mx-auto px-6 max-w-screen-xl py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white font-medium"
      >
        <p class="text-white">
          &copy; {{ new Date().getFullYear() }} Pemerintah Kabupaten Lebak. Dikembangkan oleh
          Diskominfo Lebak.
        </p>
        <div class="flex gap-6 font-medium">
          <a href="#" class="hover:text-teal-500 transition-colors duration-300">Syarat & Ketentuan</a>
          <a href="#" class="hover:text-teal-500 transition-colors duration-300">Kebijakan Privasi</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from '@/utils/api'
import { Facebook, Instagram, Twitter, Mail, Phone, Share2, AtSign, Camera } from 'lucide-vue-next'

export default {
  name: 'AppFooter',
  components: { Facebook, Instagram, Twitter, Mail, Phone, Share2, AtSign, Camera },
  data() {
    return {
      footer: {
        site_name: '',
        satuan_kerja: '',
        logo_url: null,
        address: '',
        phone: '',
        email: '',
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        whatsapp: '',
        footer_text: '',
      },
      footerWidget1: null,
      footerWidget2: null,
    }
  },
  mounted() {
    this.fetchFooterData()
    this.fetchFooterWidgets()
  },
  methods: {
    async fetchFooterWidgets() {
      try {
        const [res1, res2] = await Promise.all([
          axios.get('/api/menus/footer_widget_1'),
          axios.get('/api/menus/footer_widget_2'),
        ])

        if (res1.data.status === 'success' && res1.data.data.length > 0) {
          this.footerWidget1 = res1.data.data[0]
        }

        if (res2.data.status === 'success' && res2.data.data.length > 0) {
          this.footerWidget2 = res2.data.data[0]
        }
      } catch (error) {
        console.error('Gagal memuat widget footer:', error)
      }
    },
    async fetchFooterData() {
      try {
        const response = await axios.get('/api/settings/footer')
        if (response.data.status === 'success') {
          this.footer = response.data.data
        }
      } catch (error) {
        console.error('Gagal memuat data footer:', error)
      }
    },
  },
}
</script>
