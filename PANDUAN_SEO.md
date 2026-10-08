# 🚀 PANDUAN LENGKAP SEO SKALA ENTERPRISE
## Portal Resmi Pemerintah Daerah Kabupaten Lebak (lebakkab.go.id)

Dokumen ini memuat standar arsitektur teknis, panduan operasional webmaster, dan *best practices* pengisian konten untuk memaksimalkan peringkat pencarian di Google, Bing, Yahoo, serta tampilan preview tautan di media sosial (WhatsApp, Facebook, Twitter, Telegram, LinkedIn).

---

## 📑 DAFTAR ISI
1. [Arsitektur Teknis SEO yang Telah Diterapkan](#1-arsitektur-teknis-seo)
2. [Pendaftaran & Verifikasi Google Search Console](#2-google-search-console)
3. [Pendaftaran Bing Webmaster Tools](#3-bing-webmaster-tools)
4. [Struktur Peta Situs (Sitemap & RSS Feed)](#4-sitemap--rss-feed)
5. [Standar Penulisan Konten Ramah SEO (Filament Admin)](#5-standar-penulisan-konten-seo)
6. [Fitur Social Share Preview (Open Graph)](#6-social-share-preview)
7. [Tools Pengujian & Validasi](#7-tools-pengujian--validasi)

---

## 1. Arsitektur Teknis SEO yang Telah Diterapkan

Portal LebakKab telah dioptimalkan dengan standar SEO Enterprise modern:

### A. Frontend (Vue 3 Single Page Application)
1. **Dynamic Meta & Canonical Tags**: Setiap rute halaman secara otomatis menyinkronkan `<title>`, `<meta name="description">`, dan `<link rel="canonical">` sehingga tidak ada duplikasi URL.
2. **Composable `useSeo()`**: Modul reaktif (`src/composables/useSeo.js`) yang mengelola Open Graph (`og:*`), Twitter Cards (`twitter:*`), dan Schema.org JSON-LD secara terpusat.
3. **Structured Data (Schema.org / JSON-LD)**:
   - `GovernmentOrganization`: Menandai portal sebagai entitas resmi pemerintahan daerah lengkap dengan alamat, logo, dan akun sosial media.
   - `WebSite` + `SearchAction`: Menampilkan kotak telusur langsung di hasil pencarian Google (*Google Sitelinks Search Box*).
   - `NewsArticle`: Memberikan informasi headline, penulis, tanggal rilis, dan gambar untuk berita agar muncul di *Google News* dan *Google Discover*.
   - `DigitalDocument`: Menandai halaman dokumen/perda/perbup untuk mempermudah pencarian berkas resmi.
   - `GovernmentService`: Menandai katalog layanan publik (persyaratan, durasi, dan instansi pelaksana).
   - `BreadcrumbList`: Menampilkan struktur rekam jejak navigasi di hasil telusur.
4. **Robots.txt & Meta Robots**: Mengizinkan Googlebot/Bingbot merayapi seluruh aset visual, skrip, dan konten publik, sambil memblokir akses ke area administratif.
5. **Nginx High-Speed Compression & Caching**: Kompresi Gzip dan *immutable cache* untuk aset statis demi skor *Core Web Vitals* yang optimal.

### B. Backend (Laravel API & Web Engine)
1. **Dynamic Enterprise Sitemap (`/sitemap.xml`)**: Otomatis merangkum seluruh berita, pengumuman, dokumen, layanan publik, kecamatan, dan OPD secara *real-time* dengan memori *cache* Redis/File 1 jam.
2. **RSS 2.0 News Feed (`/rss.xml` & `/feed.xml`)**: Saluran sindikasi berita berkala yang disukai oleh mesin perayap berita (*Google News Aggregator*).
3. **Auto-Ping Search Engines (`/sitemap/ping`)**: Endpoint untuk memberitahu bot Google dan Bing segera setelah sitemap diperbarui.
4. **Bot Pre-Render Share (`/share/{type}/{slug}`)**: Mesin perender tag Open Graph khusus untuk bot WhatsApp, Facebook, dan Telegram yang tidak mengeksekusi JavaScript.

---

## 2. Pendaftaran & Verifikasi Google Search Console

Google Search Console (GSC) adalah alat terpenting untuk memantau indeksasi dan performa portal di Google.

### Langkah Verifikasi Domain:
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Pilih jenis properti **Domain** dan masukkan:
   ```
   lebakkab.go.id
   ```
3. Salin kode verifikasi **TXT Record** yang diberikan Google (contoh: `google-site-verification=xxxxxxx`).
4. Masuk ke dashboard DNS Server / Cloudflare domain `lebakkab.go.id`, lalu tambahkan DNS Record:
   - **Type**: `TXT`
   - **Name**: `@`
   - **Content**: `google-site-verification=xxxxxxx`
5. Kembali ke Google Search Console dan klik tombol **Verify (Verifikasi)**.

---

## 3. Pendaftaran Bing Webmaster Tools

Mesin pencari Bing menggerakkan Yahoo Search, DuckDuckGo, dan asisten AI Copilot.

### Langkah Pendaftaran:
1. Buka [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Pilih opsi **Import from Google Search Console**.
3. Hubungkan akun Google yang telah memverifikasi domain `lebakkab.go.id`.
4. Seluruh sitemap dan data verifikasi akan otomatis terhubung ke Bing.

---

## 4. Struktur Peta Situs (Sitemap & RSS Feed)

### Alamat Endpoint Resmi:
| Jenis Endpoint | URL | Keterangan |
| :--- | :--- | :--- |
| **Peta Situs Utama** | `https://lebakkab.go.id/sitemap.xml` | Peta seluruh link publik + gambar berita |
| **Sindikasi Berita RSS** | `https://lebakkab.go.id/rss.xml` | Khusus pembaca RSS & Google News |
| **Ping Engine** | `https://lebakkab.go.id/sitemap/ping` | Menghapus cache sitemap & memberitahu bot |

### Cara Submit ke Search Console:
1. Di Google Search Console, buka menu **Sitemaps (Peta Situs)** di bilah kiri.
2. Pada kolom *Tambahkan peta situs baru*, ketik:
   ```
   sitemap.xml
   ```
   Lalu klik **Kirim (Submit)**.
3. Tambahkan juga:
   ```
   rss.xml
   ```
   Lalu klik **Kirim (Submit)**.
4. Status akan berubah menjadi **Berhasil (Success)** dalam beberapa menit/jam.

---

## 5. Standar Penulisan Konten Ramah SEO (Filament Admin)

Admin/Redaktur di OPD yang menginput Berita, Layanan, dan Dokumen sebaiknya mematuhi pedoman editorial berikut:

### 1. Judul Berita (Headline)
- **Panjang Ideal**: 50 – 65 karakter (maksimal 70 karakter agar tidak terpotong di Google).
- **Kata Kunci**: Letakkan kata kunci utama di depan.
  - ✅ *Contoh Baik*: *Bupati Lebak Resmikan Jembatan Penghubung Antar-Kecamatan di Cilograng*
  - ❌ *Contoh Kurang Baik*: *Kegiatan Peresmian yang Sangat Meriah Hari Ini*

### 2. URL Slug
- Sistem secara otomatis membuat slug ramah mesin telusur (huruf kecil, dipisah tanda hubung `-`, tanpa karakter aneh).
- Contoh: `bupati-lebak-resmikan-jembatan-penghubung-antar-kecamatan`

### 3. Paragraf Pertama (Lead Paragraph)
- Dua kalimat pertama di badan berita akan dijadikan **Meta Description** otomatis di Google & WhatsApp.
- Pastikan memuat prinsip **5W + 1H** (Siapa, Apa, Kapan, Di mana, Mengapa, dan Bagaimana) dalam 150 karakter pertama.

### 4. Struktur Heading di Dalam Isi Berita
- **H1**: Hanya digunakan oleh Judul Berita (otomatis oleh sistem).
- **H2**: Gunakan untuk judul sub-bagian atau poin utama.
- **H3**: Gunakan untuk rincian di bawah sub-bagian H2.

### 5. Optimasi Gambar / Thumbnail
- **Rasio**: 16:9 (contoh: 1200 x 675 pixel atau 1280 x 720 pixel).
- **Ukuran Berkas**: Kompres gambar sebelum diunggah (di bawah 300 KB) menggunakan format JPG atau WebP agar *load time* cepat.
- **Nama Berkas Asli**: Gunakan nama yang bermakna sebelum diunggah (misal: `peresmian-jembatan-cilograng-lebak.jpg`, bukan `IMG_20261008_0915.jpg`).

---

## 6. Fitur Social Share Preview (Open Graph)

Saat membagikan link ke WhatsApp atau media sosial:
- **WhatsApp & Telegram**: Memeriksa tag `<meta property="og:image">` berukuran minimal 300x200 pixel (disarankan 1200x630 pixel).
- **Facebook & Twitter**: Menggunakan rasio 1.91:1 dengan format *Summary Large Image*.

### URL Preview Darurat untuk Bot:
Jika ada aplikasi perpesanan tertentu yang gagal mengeksekusi JavaScript, backend menyediakan rute server-side fallback:
```
https://lebakkab.go.id/share/berita/{slug}
https://lebakkab.go.id/share/pengumuman/{slug}
https://lebakkab.go.id/share/dokumen/{slug}
https://lebakkab.go.id/share/layanan/{slug}
```
*Catatan: Rute ini akan otomatis me-redirect pengunjung biasa ke tampilan aplikasi frontend yang sesungguhnya.*

---

## 7. Tools Pengujian & Validasi

Sebelum publikasi skala luas, gunakan alat pengujian resmi berikut:

1. **Uji Hasil Kaya Google (Rich Results Test)**:
   - URL: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
   - Fungsi: Memeriksa apakah Schema.org `GovernmentOrganization`, `NewsArticle`, dan `SearchAction` terbaca valid tanpa error.
2. **Schema Markup Validator**:
   - URL: [https://validator.schema.org/](https://validator.schema.org/)
   - Fungsi: Validasi sintaksis JSON-LD.
3. **Facebook Sharing Debugger**:
   - URL: [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
   - Fungsi: Memaksa Facebook & WhatsApp menghapus cache preview gambar tautan lama (*Scrape Again*).
4. **Google PageSpeed Insights**:
   - URL: [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
   - Fungsi: Memantau performa LCP, FID, CLS (*Core Web Vitals*).
