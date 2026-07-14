<template>
  <footer
    class="relative bg-[#071840] font-sans overflow-hidden"
  >
    <!-- Gradient & Pattern Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-[#071840] from-80% to-[#2a6cbd] z-0"
    ></div>
    <!-- Corak Batik Overlay (Kawung Motif) -->
    <div 
      class="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-overlay z-0" 
      style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='2' opacity='1'%3E%3Cpath d='M0 40 Q20 20 40 40 T80 40' /%3E%3Cpath d='M0 40 Q20 60 40 40 T80 40' /%3E%3Cpath d='M40 0 Q20 20 40 40 T40 80' /%3E%3Cpath d='M40 0 Q60 20 40 40 T40 80' /%3E%3Cpath d='M40 30 L50 40 L40 50 L30 40 Z' /%3E%3Ccircle cx='40' cy='40' r='4' fill='%23ffffff' /%3E%3C/g%3E%3C/svg%3E&quot;); background-size: 80px 80px;"
    ></div>

    <div class="relative container mx-auto px-6 max-w-screen-xl py-12 z-10">
      <!-- Grid 4 Kolom -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Kolom 1: Profil -->
        <div class="flex flex-col">
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-9 h-10 shrink-0"
            >
              <img
                v-if="footer.logo_url"
                :src="footer.logo_url"
                alt="Logo"
                class="max-w-full max-h-full object-contain"
              />
            </div>
            <div>
              <div class="text-[15px] font-bold text-white">
                {{ footer.site_name || 'SPBE Kabupaten Lebak' }}
              </div>
              <div class="text-xs text-white/45">
                {{ footer.satuan_kerja || 'Sistem Pemerintahan Berbasis Elektronik' }}
              </div>
            </div>
          </div>
          <p class="text-[13.6px] text-white/55 leading-[1.8] mb-6 max-w-[38ch]">
            Mewujudkan tata kelola pemerintahan yang transparan, efektif, dan efisien melalui pemanfaatan teknologi informasi dan komunikasi di Kabupaten Lebak.
          </p>
          <div class="flex gap-3">
            <a
              v-if="footer.facebook"
              :href="footer.facebook"
              target="_blank"
              class="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:text-[#071840] text-white/70 transition-all duration-200"
            >
              <Facebook class="w-4 h-4" />
            </a>
            <a
              v-else
              href="#"
              class="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:text-[#071840] text-white/70 transition-all duration-200"
            >
              <Share2 class="w-4 h-4" />
            </a>

            <a
              v-if="footer.twitter"
              :href="footer.twitter"
              target="_blank"
              class="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:text-[#071840] text-white/70 transition-all duration-200"
            >
              <Twitter class="w-4 h-4" />
            </a>
            <a
              v-else
              href="#"
              class="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:text-[#071840] text-white/70 transition-all duration-200"
            >
              <AtSign class="w-4 h-4" />
            </a>

            <a
              v-if="footer.instagram"
              :href="footer.instagram"
              target="_blank"
              class="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:text-[#071840] text-white/70 transition-all duration-200"
            >
              <Instagram class="w-4 h-4" />
            </a>
            <a
              v-else
              href="#"
              class="w-[34px] h-[34px] rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 hover:text-[#071840] text-white/70 transition-all duration-200"
            >
              <Camera class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Kolom 2: Widget 1 -->
        <div v-if="footerWidget1">
          <h6 class="text-[12.8px] font-bold text-white/85 uppercase tracking-widest mb-4">
            {{ footerWidget1.title }}
          </h6>
          <ul class="space-y-4 text-sm text-white">
            <li v-for="link in footerWidget1.children" :key="link.id">
              <a
                :href="link.url || '#'"
                class="inline-block text-[13.6px] text-white/55 hover:text-white/90 hover:pl-1.5 transition-all duration-200"
                >{{ link.title }}</a
              >
            </li>
          </ul>
        </div>
        <div v-else>
          <h6 class="text-[12.8px] font-bold text-white/85 uppercase tracking-widest mb-4">Tautan Cepat</h6>
          <ul class="space-y-4 text-sm text-white">
            <li><span class="opacity-75">Memuat...</span></li>
          </ul>
        </div>

        <!-- Kolom 3: Widget 2 -->
        <div v-if="footerWidget2">
          <h6 class="text-[12.8px] font-bold text-white/85 uppercase tracking-widest mb-4">
            {{ footerWidget2.title }}
          </h6>
          <ul class="space-y-4 text-sm text-white">
            <li v-for="link in footerWidget2.children" :key="link.id">
              <a
                :href="link.url || '#'"
                class="inline-block text-[13.6px] text-white/55 hover:text-white/90 hover:pl-1.5 transition-all duration-200"
                >{{ link.title }}</a
              >
            </li>
          </ul>
        </div>
        <div v-else>
          <h6 class="text-[12.8px] font-bold text-white/85 uppercase tracking-widest mb-4">
            Informasi Publik
          </h6>
          <ul class="space-y-4 text-sm text-white">
            <li><span class="opacity-75">Memuat...</span></li>
          </ul>
        </div>

        <!-- Kolom 4: Hubungi Kami -->
        <div>
          <h6 class="text-[12.8px] font-bold text-white/85 uppercase tracking-widest mb-4">Hubungi Kami</h6>
          <div class="space-y-4 text-[13.6px] text-white/55">
            <p class="leading-relaxed whitespace-pre-line">
              {{
                footer.address ||
                'Gedung Sekretariat Daerah (SETDA) Lebak,\nJl. Abdi Negara No. 3, Rangkasbitung,\nKabupaten Lebak, Banten 42312'
              }}
            </p>
            <div class="flex items-center gap-3">
              <Mail class="w-4 h-4" />
              <span>{{ footer.email || 'kontak@lebakkab.go.id' }}</span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="w-4 h-4" />
              <span>{{ footer.phone || '+62 252 201 001' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bagian Bawah -->
    <div class="relative border-t border-[#e8a020] z-20 bg-gradient-to-r from-[#071840] to-[#0a2463]">
      <div
        class="container mx-auto px-6 max-w-screen-xl py-5 flex justify-center text-center items-center gap-4 text-sm text-[#e8a020]"
      >
        <p>
          &copy; {{ new Date().getFullYear() }} Pemerintah Kabupaten Lebak. Dikembangkan oleh
          Diskominfo Lebak.
        </p>
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
