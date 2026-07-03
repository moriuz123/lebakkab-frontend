# LebakKab Portal - Frontend Web Application

LebakKab Frontend adalah antarmuka web (Situs Portal) resmi untuk Pemerintah Kabupaten Lebak, yang menyajikan berbagai informasi dari Organisasi Perangkat Daerah (OPD) atau Dinas terkait kepada masyarakat luas. Aplikasi ini dibangun sebagai sebuah *Single Page Application* (SPA) yang sangat cepat dan interaktif.

## Fitur Utama
- **Integrasi Agregator:** Menarik berita, dokumen, *banner*, dan pengaturan konfigurasi secara dinamis dari sistem LebakKab Backend (API).
- **Berbasis Multi-tenant/Dinas:** Sistem didesain agar dapat diadaptasi untuk menyajikan informasi per-OPD secara spesifik.
- **Performa SPA (Single Page Application):** Navigasi antar halaman (seperti dari Berita ke Beranda) terjadi secara instan tanpa perlu memuat ulang (*refresh*) halaman penuh.
- **Optimasi SEO Dinamis:** Terintegrasi dengan `@vueuse/head` untuk mengatur judul, deskripsi, dan Open Graph (OG) tag secara dinamis per halaman, sehingga tetap ramah mesin pencari meskipun berbasis SPA.
- **Responsive & Modern Design:** Antarmuka disesuaikan untuk kenyamanan akses melalui perangkat seluler (HP) maupun Desktop.
- **Docker Ready:** Dilengkapi dengan konfigurasi *container* (Docker) agar siap dijalankan secara terisolasi tanpa memusingkan versi Node.js.

## Teknologi yang Digunakan (Tech Stack)
- **Framework:** Vue.js 3 (Composition API)
- **Build Tool:** Vite (Cepat untuk *hot-reloading* dan optimisasi *build*)
- **State Management:** Pinia / Vuex (sesuai implementasi)
- **Router:** Vue Router 4
- **Styling:** TailwindCSS
- **SEO Tool:** `@vueuse/head`
- **Infrastruktur:** Node.js 22.x & Docker

## Panduan Instalasi (Local Development)

### Persyaratan Sistem
Pastikan komputer Anda sudah terinstal:
- Node.js (Versi **22.x** sangat disarankan untuk mendukung Vite v7)
- NPM atau Yarn
- Docker & Docker Compose (Opsional jika ingin menjalankan via container)

### Langkah Instalasi (Tanpa Docker)
1. Clone repositori:
   ```bash
   git clone https://github.com/moriuz123/lebakkab-frontend.git
   cd lebakkab-frontend
   ```
2. Instal pustaka/dependensi:
   ```bash
   npm install
   ```
3. (Opsional) Atur *Environment Variables* di file `.env` jika ada konfigurasi tambahan seperti `VITE_API_BASE_URL`. Pada lingkungan *development*, koneksi ke backend ditangani melalui sistem *Proxy* dari Vite (`vite.config.js`).

4. Jalankan *server development*:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:5173` di browser Anda.

### Menjalankan Menggunakan Docker
Jika Anda lebih suka menggunakan Docker (agar seragam dengan Backend):
```bash
docker-compose up -d
```
Aplikasi akan berjalan di dalam *container* dan tetap bisa diakses pada port 5173.

## Menyiapkan untuk Production
Untuk mengkompilasi dan meminimalkan kode (*minify*) sebelum diluncurkan ke server asli:
```bash
npm run build
```
Hasil kompilasi akan berada di folder `dist/` dan siap disajikan menggunakan Nginx, Apache, atau layanan *hosting* statis lainnya.

## Aturan Kontribusi (Workflow & Contributing)
Silakan merujuk pada file [CONTRIBUTING.md](CONTRIBUTING.md) untuk aturan detail pengembangan. Ringkasannya:
- Dilarang melakukan *push* langsung ke branch `main`.
- Pembuatan fitur atau perbaikan bug harus dilakukan di *branch* turunan dari `develop` (misal: `feature/...` atau `bugfix/...`).
- Ajukan *Pull Request* (PR) yang ditargetkan ke branch `develop`.

---
*Dikembangkan untuk Pemerintah Kabupaten Lebak.*
