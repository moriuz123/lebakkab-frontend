# 2. Panduan Instalasi dan Deployment Frontend

Dokumen ini berisi panduan teknis yang harus dipatuhi ketika Anda hendak memindahkan kode (aplikasi) frontend dari lingkungan *development* ke *Production Server*.

---

## A. Aturan Penting Saat Instalasi

Folder `node_modules/` **TIDAK BOLEH** Anda salin langsung antar komputer atau server. Ini adalah folder pustaka (*library*) yang strukturnya menyesuaikan OS. Anda wajib men-generate ulang dengan `npm install`.

---

## B. Panduan Instalasi Lokal / Server Baru

### Langkah 1: Kloning Repositori
```bash
git clone https://github.com/moriuz123/lebakkab-frontend.git
cd lebakkab-frontend
```

### Langkah 2: Instalasi Node Modules
Pastikan Node.js 22.x sudah terpasang.
```bash
npm install
```

### Langkah 3: Penyesuaian API (Environment)
Buat file konfigurasi `.env`:
```bash
cp .env.example .env
```
Isi konfigurasi pada file `.env`:
```env
# URL API Backend untuk Production
VITE_API_BASE_URL=http://<IP_SERVER_BACKEND_ANDA>:8000/api
VITE_STORAGE_BASE_URL=http://<IP_SERVER_BACKEND_ANDA>:9000/lebakkab-media

# API Key untuk Backend
VITE_APP_API_KEY=LebakKabSuperSecret2026

# Cloudflare Turnstile Key (Dapatkan dari Dashboard Cloudflare)
VITE_TURNSTILE_SITE_KEY=your_site_key_here
```
*(Catatan: Konfigurasi Vite Proxy di `vite.config.js` tidak akan digunakan saat Anda melakukan build untuk production. Aplikasi akan murni menggunakan `VITE_API_BASE_URL`)*.

### Langkah 4: Membangun (*Build*) untuk Production
```bash
npm run build
```
Proses ini akan mengompilasi Vue menjadi HTML, CSS, dan JS murni yang terkompresi di dalam folder bernama `/dist`.

### Langkah 5: Menyajikan Frontend (Deployment Nginx)
Salin seluruh isi folder `/dist` ke folder publik web server Anda (misal: `/var/www/lebakkab-frontend/dist`).
Gunakan konfigurasi Nginx berikut agar navigasi Vue Router tidak memunculkan Error 404:

```nginx
server {
    listen 80;
    server_name namadinas.lebakkab.go.id;
    root /var/www/lebakkab-frontend/dist;
    index index.html;

    location / {
        # Sangat penting untuk SPA (Vue Router)
        try_files $uri $uri/ /index.html;
    }
}
```
