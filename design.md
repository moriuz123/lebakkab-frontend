# Frontend Design Document

## 1. Overview

Dokumen ini menjelaskan arsitektur, teknologi, konvensi desain, dan struktur direktori frontend Portal Kabupaten Lebak. Proyek dibangun menggunakan **Vue 3** dengan **Vite** sebagai build tool, menyediakan antarmuka pengguna yang cepat, responsif, dan modern.

---

## 2. Tech Stack

| Kategori | Teknologi | Keterangan |
|---|---|---|
| **Framework** | Vue 3 (Composition API + `<script setup>`) | Standar penulisan seluruh komponen |
| **Build Tool** | Vite 7 | HMR cepat, output optimal |
| **State Management** | Pinia | Satu store per fitur/domain |
| **Routing** | Vue Router 4 | SPA dengan slug SEO-friendly |
| **Styling** | Tailwind CSS 3 + PostCSS | Utility-first, kustom penuh |
| **HTTP Client** | Axios | Instance terpusat di `src/utils/api.js` dengan `X-API-KEY` header |
| **Ikon** | **Lucide** via `<Icon name="lucide:...">` | **Satu-satunya library ikon.** Jangan gunakan Material Icons atau Font Awesome |
| **SEO** | `@vueuse/head` | Title, description, OG tag per halaman |
| **CAPTCHA** | Cloudflare Turnstile | Digunakan pada form Kritik & Saran |
| **PDF Viewer** | `vue3-pdf-app` + `pdfjs-dist` | Preview dokumen di browser |
| **Rich Text** | Tiptap | Render konten HTML dari backend |
| **Linter** | ESLint + Prettier | Format konsisten |

---

## 3. Struktur Direktori

```text
lebakkab-frontend/
├── public/                     # Aset statis (favicon, robots.txt)
├── src/
│   ├── assets/                 # CSS global, gambar, fullcalendar bundle
│   ├── components/             # Komponen UI reusable
│   │   ├── HeaderNav.vue           # Header + CTA Button dinamis dari backend
│   │   ├── AppFooter.vue           # Footer + widget menu + profil daerah
│   │   ├── PageHeader2.vue         # Header halaman + breadcrumb
│   │   ├── SidebarOpdDetil.vue     # Widget daftar OPD (gradient, scrollable)
│   │   ├── SidebarKecamatan.vue    # Widget daftar Kecamatan (konsisten OPD)
│   │   ├── SidebarNews.vue         # Widget berita terkait
│   │   ├── SidebarLayanan.vue      # Widget layanan
│   │   ├── SidebarPengumuman.vue   # Widget pengumuman
│   │   ├── SidebarStatic.vue       # Widget halaman statis
│   │   ├── MenuItem.vue            # Item menu navigasi (dengan sub-menu)
│   │   ├── PaginationNav.vue       # Komponen pagination reusable
│   │   ├── FloatingWidget.vue      # Widget aksesibilitas + statistik
│   │   └── ...
│   ├── views/                  # Halaman (dipetakan via Router)
│   │   ├── OpdDetail.vue           # ★ Diperbarui: layout konsisten, tanpa profil
│   │   ├── KecamatanDetail.vue     # ★ Diperbarui: style seragam dengan OPD
│   │   ├── KontakPage.vue          # ★ Diperbarui: ikon 100% Lucide
│   │   ├── KritikSaranPage.vue     # ★ Diperbarui: keamanan berlapis
│   │   └── ...
│   ├── stores/                 # Pinia stores
│   │   ├── settings.js             # ★ Diperbarui: parse CTA dari backend
│   │   ├── opd.js
│   │   ├── kecamatan.js
│   │   └── ...
│   ├── utils/
│   │   ├── api.js                  # Instance Axios + X-API-KEY header
│   │   └── helpers.js              # formatDate, getStorageUrl, dll.
│   ├── router/
│   │   └── index.js                # Definisi rute seluruh aplikasi
│   ├── App.vue                 # Root component
│   └── main.js                 # Entry point (Vue + Pinia + Router)
├── index.html                  # HTML entry + Cloudflare Turnstile script
├── .env                        # Environment variables (tidak di-commit)
├── .env.example                # Template env vars
├── vite.config.js              # Konfigurasi Vite + Proxy API & Storage
├── tailwind.config.js          # Konfigurasi Tailwind
└── package.json
```

---

## 4. Routing (`src/router/index.js`)

| URL | View | Keterangan |
|---|---|---|
| `/` | HomeView | Beranda |
| `/page/:slug` | StaticPage | Halaman statis dinamis |
| `/berita` | NewsList | Daftar berita |
| `/berita/:slug` | DetilNews | Detail berita |
| `/berita/kategori/:slug` | KategoriPage | Filter berita per kategori |
| `/pengumuman` | ListPengumuman | Daftar pengumuman |
| `/pengumuman/:slug` | PengumumanDetail | Detail pengumuman |
| `/dokumen` | DokumentPage | Repositori dokumen |
| `/dokumen/kategori/:slug` | DokumenKategoriPage | Dokumen per kategori |
| `/opd` | OpdPage | Daftar OPD (grid card) |
| `/opd/:slug` | OpdDetail | Detail OPD — kontak, peta, pimpinan |
| `/kecamatan` | KecamatanPage | Daftar kecamatan |
| `/kecamatan/:slug` | KecamatanDetail | Detail kecamatan — style konsisten OPD |
| `/layanan` | LayananPage | Katalog layanan publik |
| `/layanan/:slug` | LayananDetail | Detail layanan |
| `/layanan/kategori/:slug` | LayananKategoriPage | Layanan per kategori |
| `/aplikasi` | AplikasiPage | Direktori aplikasi kedinasan |
| `/agenda` | AgendaPage | Kalender agenda |
| `/agenda/:id` | AgendaDetail | Detail agenda |
| `/foto` | FotoPage | Galeri foto |
| `/vidio` | VidioPage | Galeri video |
| `/kontak` | KontakPage | Kontak instansi + peta |
| `/kritik-saran` | KritikSaranPage | Form dengan keamanan berlapis |
| `/pencarian` | SearchPage | Pencarian global (`?q=...`) |
| `/profil-kabupaten` | ProfilKabupaten | Profil daerah |
| `/profil-pejabat` | PejabatPage | Direktori pejabat |
| `/profil-pejabat/:slug` | PejabatDetail | Detail pejabat |
| `/banner/ucapan` | BannerUcapan | Banner ucapan |
| `/banner/infografis` | BannerCategory | Infografis |
| `/:pathMatch(.*)` | NotFound | Halaman 404 |

---

## 5. Manajemen State (`src/stores/`)

Setiap store berfokus pada satu domain/fitur:

| Store | Bertanggung Jawab |
|---|---|
| `settings.js` | Header settings, CTA button, favicon, title |
| `useBeritaStore.js` | Berita (list, detail, kategori, pencarian) |
| `pengumuman.js` | Pengumuman (list, detail) |
| `dokument.js` | Dokumen publik (list, kategori, detail) |
| `opd.js` | OPD (list, detail by slug) |
| `kecamatan.js` | Kecamatan (list, detail by slug) |
| `layanan.js` | Layanan publik (list, detail, kategori) |
| `aplikasi.js` | Aplikasi kedinasan |
| `agenda.js` | Agenda kegiatan |
| `foto.js` | Galeri foto |
| `vidio.js` | Galeri video |
| `bannerStore.js` | Banner ucapan & infografis |
| `pejabat.js` | Profil pejabat daerah |
| `pengumuman.js` | Pengumuman resmi |
| `counter.js` | Statistik pengunjung |

---

## 6. Integrasi Backend (API)

- **Base URL**: dikonfigurasi via Vite proxy di `vite.config.js` (target: `http://172.18.0.1:8000`)
- **Autentikasi**: setiap request menyertakan header `X-API-KEY` (dari `VITE_APP_API_KEY`)
- **Storage Media**: proxy `/storage` → MinIO (`http://172.18.0.1:9000/lebakkab-media`)
- **Endpoint utama settings**:
  - `GET /api/settings/header` — logo, nama site, CTA (`cta_text`, `cta_url`)
  - `GET /api/settings/footer` — info kontak footer
- **CTA Button**: dikelola dari **Admin → Manage Setting → Tab CTA** di backend. Field: `cta_text` (teks) dan `cta_url` (URL)

---

## 7. Konvensi Desain & Styling

### Palet Warna Utama
| Token | Nilai | Penggunaan |
|---|---|---|
| Primary | `#0a2463` | Judul, tombol utama, aksen |
| Secondary | `#1e5ca8` | Hover state, gradient, border aktif |
| Accent | `#e8a020` | CTA, highlight, border atas card |
| Text | `text-gray-700/800/900` | Konten teks |
| Subtle | `text-gray-400/500` | Label kecil, placeholder |

### Standar Komponen Card Detail (OPD & Kecamatan)
Semua halaman detail entitas (OPD, Kecamatan) mengikuti pola:
1. **Banner** — foto kantor atau gradient placeholder (`from-[#0a2463] to-[#1e5ca8]`)
2. **Header Identity** — avatar/logo + nama + badge kode/singkatan
3. **Grid 2 kolom** — Informasi Kontak (kiri) + Peta Lokasi (kanan)
4. **Section bawah** — Deskripsi + Pimpinan/Camat (card avatar)

### Standar Ikon
> **Wajib** menggunakan `<Icon name="lucide:nama-ikon" />` untuk semua ikon.
> Dilarang menggunakan `material-symbols-outlined`, `fab fa-*`, atau library lain.

### Standar Sidebar Widget
Semua sidebar mengikuti pola:
- Header: gradient `from-[#0a2463] to-[#1e5ca8]` + ikon Lucide
- List: `divide-y divide-gray-50`, `max-h-[420px] overflow-y-auto`
- Footer: link "Lihat semua" dengan ikon `lucide:list`

---

## 8. Keamanan

### Form Kritik & Saran (`/kritik-saran`)
Dilindungi 4 lapis:

| Lapisan | Implementasi |
|---|---|
| **Cloudflare Turnstile** | Script di `index.html`, token wajib ada sebelum submit, dikirim sebagai `cf_turnstile_token` |
| **Honeypot** | Field `website_url` tersembunyi (`aria-hidden`, `tabindex="-1"`). Jika terisi → submit diabaikan |
| **Rate Limiting** | Cooldown 60 detik setelah submit berhasil, countdown tampil di UI |
| **Validasi + Sanitasi** | Min/max length per field, regex email & no HP, `trim()` + strip `<>` dari semua input |

### Header API
Semua request ke backend menyertakan `X-API-KEY` via Axios interceptor global.

---

## 9. Panduan Kontribusi

- Gunakan `<Icon name="lucide:...">` — bukan library ikon lain
- Ikuti pola layout card detail yang sudah ada (OPD → Kecamatan)
- Setiap store hanya mengelola satu domain data
- Tidak ada `push` langsung ke `main` — selalu melalui PR ke `develop`
- Commit message mengikuti format: `feat:`, `fix:`, `refactor:`, `chore:`
