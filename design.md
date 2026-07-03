# Frontend Design Document

## 1. Overview
Dokumen ini menjelaskan arsitektur, teknologi, dan struktur direktori untuk frontend aplikasi Portal. Proyek ini dibangun menggunakan **Vue 3** dengan **Vite** sebagai *build tool*, menyediakan antarmuka pengguna yang cepat, responsif, dan modern untuk menampilkan berbagai informasi seperti berita, pengumuman, layanan, dan profil instansi pemerintah (OPD/Kecamatan).

## 2. Tech Stack
- **Framework Utama**: [Vue 3](https://vuejs.org/) (menggunakan Composition API & `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/) untuk kompilasi yang cepat dan HMR (Hot Module Replacement).
- **State Management**: [Pinia](https://pinia.vuejs.org/) untuk mengelola state aplikasi secara global.
- **Routing**: [Vue Router 4](https://router.vuejs.org/) untuk navigasi antar halaman (SPA).
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) terintegrasi dengan PostCSS & Autoprefixer. Tersedia juga `@tailwindcss/typography` untuk format teks konten yang rapi.
- **HTTP Client**: [Axios](https://axios-http.com/) untuk komunikasi data (API) ke backend.
- **Ikon**:
  - `@heroicons/vue`
  - `lucide-vue-next`
  - `oh-vue-icons`
- **Rich Text / Editor**: [Tiptap](https://tiptap.dev/) untuk rendering atau editing konten kaya.
- **PDF Viewer**: `vue3-pdf-app` dan `pdfjs-dist` untuk pratinjau dokumen PDF secara langsung di peramban.
- **Utilitas Tambahan**: [Day.js](https://day.js.org/) untuk pemrosesan dan format tanggal/waktu.
- **Linter & Formatter**: ESLint dan Prettier.

## 3. Struktur Direktori
Struktur proyek terpusat di dalam direktori `src/`:

```text
frontend/
├── public/                 # Aset statis yang tidak diproses oleh Webpack/Vite (favicon, dsb.)
├── src/                    # Direktori utama source code aplikasi
│   ├── assets/             # Aset statis seperti gambar atau CSS global (contoh: style Tailwind)
│   ├── components/         # Komponen UI Vue yang dapat digunakan ulang (buttons, cards, modals, dsb.)
│   ├── router/             # Konfigurasi Vue Router (index.js) yang memetakan rute ke View
│   ├── stores/             # Modul Pinia untuk manajemen state (API calls, data cache)
│   ├── utils/              # Fungsi utilitas pembantu (helpers.js) dan konfigurasi Axios (api.js)
│   ├── views/              # Komponen tingkat halaman yang terhubung dengan router
│   ├── App.vue             # Root component Vue
│   └── main.js             # Entry point aplikasi (Inisialisasi Vue, Pinia, dan Router)
├── package.json            # Daftar dependensi dan scripts npm
├── tailwind.config.js      # Konfigurasi Tailwind CSS
└── vite.config.js          # Konfigurasi build Vite
```

## 4. Fitur Utama & Routing (`src/router/index.js`)
Sistem routing menangani URL ramah SEO untuk fitur-fitur berikut:
- **Beranda (`/`)**: Halaman utama portal.
- **Halaman Statis (`/page/:slug`)**: Menampilkan halaman dinamis berdasarkan slug (mis. profil, visi-misi).
- **Berita (`/berita` & `/berita/:slug`)**: Daftar berita dan detail berita. Mendukung filter kategori (`/berita/kategori/:slug`).
- **Pengumuman (`/pengumuman` & `/pengumuman/:slug`)**: Informasi dan pengumuman terbaru.
- **Dokumen Publik (`/dokumen` & `/dokumen/kategori/:slug`)**: Repositori dokumen yang bisa diunduh atau dipratinjau.
- **Galeri Multimedia**: Halaman foto (`/foto`) dan video (`/vidio`).
- **Direktori Pemerintahan**:
  - **OPD** (`/opd` & `/opd/:slug`)
  - **Kecamatan** (`/kecamatan` & `/kecamatan/:slug`)
- **Layanan Publik (`/layanan` & `/layanan/:slug`)**: Informasi terkait layanan masyarakat.
- **Aplikasi (`/aplikasi`)**: Daftar pintasan aplikasi sistem informasi terkait.
- **Agenda (`/agenda` & `/agenda/:id`)**: Jadwal dan kalender kegiatan.
- **Banner Publikasi**: Banner Ucapan (`/banner/ucapan`) dan Infografis (`/banner/infografis`).
- **Layanan Interaktif**: Kritik dan Saran (`/kritik-saran`).
- **Pencarian Global (`/pencarian?q=...`)**: Mencari konten di seluruh modul portal.

## 5. Manajemen State (`src/stores/`)
Sistem dipecah menjadi modul Pinia yang mandiri untuk masing-masing fitur demi menjaga kebersihan kode dan kemudahan *debugging*:
- `useBeritaStore.js`
- `pengumuman.js`, `dokument.js`
- `opd.js`, `kecamatan.js`
- `layanan.js`, `aplikasi.js`, `agenda.js`
- `foto.js`, `vidio.js`, `bannerStore.js`
- `kritikSaran.js`, `settings.js`

Masing-masing *store* umumnya mencakup:
- **State**: Menyimpan respons *array* data (list) atau *object* data (detail), *loading states*, dan error.
- **Actions**: Menampung *async function* menggunakan `axios` untuk melakukan *fetch* data dari Backend.

## 6. Integrasi Backend (API)
- **Base URL API** dikonfigurasi menggunakan *environment variables* Vite (`import.meta.env`) atau di set pada file `src/utils/api.js`.
- Semua *request* HTTP akan dikoordinasikan melalui instance Axios standar yang mungkin menerapkan *interceptors* untuk menyematkan token keamanan (bila diperlukan) dan penanganan *error* global.
- Parameter, *query strings* untuk paginasi, dan *search term* dikendalikan via action dari Pinia dan Router queries.

## 7. Panduan Styling (Tailwind CSS)
- Karena tidak menggunakan kerangka kerja UI konvensional (seperti Bootstrap atau Vuetify), semua antarmuka dibangun secara kustom menggunakan kelas utilitas Tailwind.
- Disarankan menggunakan plugin `@tailwindcss/typography` (`prose`) saat me-*render* teks HTML mentah (seperti deskripsi berita atau pengumuman dari Tiptap/Backend) ke dalam aplikasi.
- Gunakan *Heroicons* atau *Lucide* sebagai standar iconography untuk interaksi pengguna dan estetika desain.
