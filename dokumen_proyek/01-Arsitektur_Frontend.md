# 1. Penjelasan Arsitektur Aplikasi Frontend (LebakKab Portal)

Dokumen ini menjelaskan bagaimana sistem Frontend LebakKab Portal beroperasi. Portal ini dirancang dengan arsitektur **Terdistribusi (Decoupled Architecture)** di mana Frontend (Vue.js) dipisahkan sepenuhnya dari Backend (Laravel).

## A. Peran Frontend (`lebakkab-frontend`)

- **Peran:** Wajah utama dari sistem LebakKab. Bertugas menyajikan data JSON yang diterima dari backend menjadi antarmuka website yang responsif dan interaktif untuk masyarakat.
- **Teknologi Utama:** Vue.js 3, Vite 7, Tailwind CSS 3, Pinia (State Management), dan Vue Router 4.
- **Fungsi Khusus:** 
  - Dibangun sebagai *Single Page Application* (SPA), sehingga navigasi antar halaman (seperti dari Beranda ke Berita) terjadi instan tanpa *full page reload*.
  - Terintegrasi dengan `@vueuse/head` agar SPA tetap memiliki performa SEO (Search Engine Optimization) yang optimal dengan menghasilkan *meta tags* dan *Open Graph* dinamis di setiap halamannya.

## B. Integrasi Multi-tenant (Agregator OPD)

- **Konsep:** Walaupun ini adalah satu aplikasi web utuh, aplikasi ini bertindak sebagai Agregator untuk berbagai Organisasi Perangkat Daerah (OPD) di Kabupaten Lebak.
- **Implementasi Frontend:** Kode *source* frontend ini bisa di-deploy berulang kali untuk dinas yang berbeda. Cukup dengan mengubah file `.env` (`VITE_API_BASE_URL`) atau menggunakan parameter Header kustom pada Axios (`src/utils/api.js`), maka antarmuka akan otomatis beradaptasi (logo, warna, nama dinas) sesuai dengan respons dari API Backend.

## C. Mekanisme Keamanan Form

Frontend ini mengimplementasikan keamanan berlapis untuk form yang berinteraksi publik (misalnya form Kritik & Saran):
1. **Cloudflare Turnstile:** Proteksi dari bot (pengganti reCAPTCHA konvensional).
2. **Honeypot:** Jebakan form (*hidden input*) untuk mencegah auto-submit dari script berbahaya.
3. **Rate Limiting:** Terdapat *cooldown timer* di sisi antarmuka untuk mencegah spam pengiriman (*brute force*).
4. **Validasi & Sanitasi:** Setiap input divalidasi dan dibersihkan dari *tag* HTML terlarang sebelum dikirim ke backend.
