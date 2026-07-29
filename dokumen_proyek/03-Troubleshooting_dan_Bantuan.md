# 3. Bantuan & Pemecahan Masalah (Troubleshooting) Frontend

Dokumen ini memuat solusi dari berbagai error yang umum terjadi di sisi Frontend selama masa pengembangan (development) maupun ketika sistem sudah diluncurkan (production).

---

## Masalah 1: Frontend "Blank" (Layar Putih) Setelah Di-build untuk Production
**Penyebab Umum:**
Masalah ini timbul akibat routing dari server web (seperti Nginx) yang tidak dikonfigurasi untuk menangani *Single Page Application* (SPA). Ketika pengguna melakukan *refresh* halaman di `/berita`, Nginx secara default akan mencari folder bernama `/berita` di dalam sistem server secara fisik (yang sebenarnya tidak ada). Akibatnya Nginx merespon dengan Error 404 dan layar menjadi putih/kosong.

**Solusi:**
Pastikan Nginx memiliki aturan `try_files` di dalam konfigurasi *server block*-nya:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
Aturan ini memaksa Nginx untuk melempar semua URL yang tidak ditemukan kembali ke `index.html`, sehingga Vue Router bisa mengambil alih kendali dan menampilkan halamannya.

---

## Masalah 2: Error "CORS (Cross-Origin Resource Sharing)" Saat Meload Data
**Penyebab Umum:**
Frontend (Vue) mengakses URL API (Laravel) dari nama domain / IP yang belum diizinkan oleh sistem keamanan API Backend.

**Solusi:**
Masalah ini tidak bisa diselesaikan murni dari Frontend. Anda harus memberi tahu pengelola Backend untuk memperbarui file `config/cors.php` di Laravel mereka, dengan menambahkan URL domain Frontend ini (contoh: `http://namadinas.lebakkab.go.id`) ke dalam daftar `'allowed_origins'`.

---

## Masalah 3: Gambar/Banner/Infografis Rusak atau Gagal Dimuat
**Penyebab Umum:**
1. Variabel `VITE_STORAGE_BASE_URL` salah arah (menunjuk localhost, bukan IP Publik server MinIO).
2. Kebijakan akses (*Access Policy*) *bucket* media di server backend masih berstatus *Private*.

**Solusi:**
1. Cek file `.env` di Frontend. Pastikan URL menggunakan IP publik/domain, BUKAN `localhost`.
2. Jika `.env` sudah benar, hubungi administrator Backend untuk mengubah Access Policy pada *bucket* `lebakkab-media` (di MinIO) menjadi **Public** atau **Download**.
3. *Catatan Khusus:* Selalu jalankan `npm run build` ulang setiap kali Anda merubah nilai pada file `.env`.
