# LebakKab Portal — Frontend Web Application

Portal web resmi Pemerintah Kabupaten Lebak, dibangun sebagai **Single Page Application (SPA)** berbasis Vue 3 yang menyajikan informasi publik, layanan, dan direktori organisasi pemerintah kepada masyarakat luas.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| **Agregator Dinamis** | Menarik berita, dokumen, banner, OPD, kecamatan, dan konfigurasi dari Backend API secara real-time |
| **CTA Button Dinamis** | Tombol Call-to-Action di header bersumber dari `POST /api/settings/header` (field `cta_text` + `cta_url`) |
| **Keamanan Form** | Form Kritik & Saran dilindungi Cloudflare Turnstile, Honeypot, Rate Limiting, dan validasi/sanitasi input |
| **Ikon Konsisten** | Seluruh project menggunakan satu library ikon: **Lucide** via `<Icon name="lucide:...">` |
| **Halaman Detail Konsisten** | OPD Detail & Kecamatan Detail diseragamkan tampilannya (header identity, kontak, peta, pimpinan) |
| **Sidebar Widget** | Sidebar OPD & Kecamatan dengan gradient header, scrollable list, dan footer link |
| **Performa SPA** | Navigasi instan tanpa full-page reload menggunakan Vue Router 4 |
| **SEO Dinamis** | `@vueuse/head` untuk title, description, dan Open Graph per halaman |
| **Responsive** | Adaptif untuk Mobile, Tablet, dan Desktop |
| **Docker Ready** | Konfigurasi container siap pakai |

---

## 🛠 Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | [Vue 3](https://vuejs.org/) — Composition API + `<script setup>` |
| **Build Tool** | [Vite 7](https://vitejs.dev/) |
| **State Management** | [Pinia](https://pinia.vuejs.org/) |
| **Router** | [Vue Router 4](https://router.vuejs.org/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + `@tailwindcss/typography` |
| **HTTP Client** | [Axios](https://axios-http.com/) via `src/utils/api.js` |
| **Ikon** | **Lucide** (via `@iconify` / `<Icon name="lucide:...">`) — *satu-satunya library ikon yang digunakan* |
| **SEO** | `@vueuse/head` |
| **CAPTCHA** | [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) |
| **PDF Viewer** | `vue3-pdf-app` + `pdfjs-dist` |
| **Rich Text** | [Tiptap](https://tiptap.dev/) |
| **Infrastruktur** | Node.js 22.x & Docker |

---

## ⚙️ Environment Variables

Salin `.env.example` ke `.env` dan sesuaikan nilainya:

```bash
cp .env.example .env
```

| Variabel | Keterangan | Contoh |
|---|---|---|
| `VITE_APP_API_KEY` | API Key untuk autentikasi ke backend | `LebakKabSuperSecret2026` |
| `VITE_STORAGE_BASE_URL` | Base URL storage/MinIO untuk aset media | `http://localhost:9000/lebakkab-media` |
| `VITE_TURNSTILE_SITE_KEY` | Site Key Cloudflare Turnstile (form keamanan) | `1x000...` |
| `VITE_CTA_LABEL` | Label fallback CTA jika backend tidak return field CTA | `Layanan Online` |
| `VITE_CTA_URL` | URL fallback CTA | `/layanan` |
| `VITE_CTA_TARGET` | Target link CTA (`_self` / `_blank`) | `_self` |

> **Catatan:** CTA button di header **dikelola dari backend** melalui menu **Admin → Manage Setting → Tab CTA**. Field yang dibaca dari API: `cta_text` (teks tombol) dan `cta_url` (URL tujuan).

---

## 🚀 Panduan Instalasi

### Persyaratan Sistem
- Node.js **22.x**
- NPM atau Yarn
- Docker & Docker Compose *(opsional)*

### Instalasi Lokal (Tanpa Docker)

```bash
# 1. Clone repositori
git clone https://github.com/moriuz123/lebakkab-frontend.git
cd lebakkab-frontend

# 2. Install dependensi
npm install

# 3. Siapkan environment
cp .env.example .env
# Edit .env sesuai konfigurasi lokal Anda

# 4. Jalankan dev server
npm run dev
```

Buka `http://localhost:5173` di browser.

> Proxy ke backend dikonfigurasi di `vite.config.js` — tidak perlu atur `VITE_API_BASE_URL` di lingkungan development.

### Menjalankan via Docker

```bash
docker-compose up -d
```

---

## 📦 Build Production

```bash
npm run build
```

Output berada di folder `dist/` — siap disajikan via Nginx, Apache, atau static hosting.

---

## 🔐 Keamanan

Form **Kritik & Saran** (`/kritik-saran`) dilindungi oleh 4 lapis keamanan:

1. **Cloudflare Turnstile** — CAPTCHA modern, token wajib valid sebelum submit
2. **Honeypot Field** — Field tersembunyi (`aria-hidden`) untuk mendeteksi bot
3. **Rate Limiting** — Cooldown 60 detik setelah berhasil kirim
4. **Validasi & Sanitasi Input** — Setiap field divalidasi (min/max length, regex) dan di-strip dari karakter HTML berbahaya

---

## 📐 Arsitektur Ringkas

```
src/
├── components/         # Komponen UI reusable
│   ├── HeaderNav.vue       # Header + CTA Button dinamis dari backend
│   ├── SidebarOpdDetil.vue # Sidebar daftar OPD (gradient header, scrollable)
│   ├── SidebarKecamatan.vue# Sidebar daftar Kecamatan (konsisten dengan OPD)
│   ├── PageHeader2.vue     # Header halaman dengan breadcrumb
│   └── ...
├── views/              # Halaman-halaman aplikasi (terhubung ke Router)
│   ├── OpdDetail.vue       # Detail OPD — header identity, kontak, peta, pimpinan
│   ├── KecamatanDetail.vue # Detail Kecamatan — style konsisten dengan OPD
│   ├── KontakPage.vue      # Halaman kontak (ikon: 100% Lucide)
│   ├── KritikSaranPage.vue # Form dengan keamanan berlapis
│   └── ...
├── stores/             # Pinia stores (state + API calls)
│   ├── settings.js         # Header settings + parse CTA dari backend
│   └── ...
└── utils/
    ├── api.js              # Instance Axios terpusat + X-API-KEY header
    └── helpers.js          # Utilitas: formatDate, getStorageUrl, dll.
```

---

## 🌿 Aturan Kontribusi

Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk detail lengkap. Ringkasannya:

- ❌ Dilarang `push` langsung ke branch `main`
- ✅ Buat branch dari `develop` → `feature/...` atau `bugfix/...`
- ✅ Ajukan **Pull Request** ke branch `develop`
- ✅ Gunakan **Lucide** (`<Icon name="lucide:...">`) untuk semua ikon — jangan gunakan Material Icons atau Font Awesome

---

*Dikembangkan untuk Pemerintah Kabupaten Lebak · Branch aktif: `develop`*
