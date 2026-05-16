---
title: Panduan Belajar dan Alur Kerja Tim
description: Peta jalan pembelajaran dan alur kerja standar bagi anggota tim Gonku untuk memahami server, akses, dan deployment.
---

# Panduan Belajar dan Alur Kerja Tim

Halaman ini merupakan panduan sekuensial bagi anggota tim baru untuk memahami ekosistem server Gonku, mulai dari pemahaman infrastruktur hingga proses kontribusi kode.

## 1. Tahap Pemahaman Infrastruktur

Sebelum melakukan akses teknis, anggota tim wajib memahami komponen yang ada di dalam server.

*   **Pemahaman Arsitektur Server**
    *   Sistem Operasi: Mempelajari basis Ubuntu Server 24.04 LTS.
    *   Teknologi Utama: Memahami peran Docker sebagai kontainerisasi dan Nginx sebagai reverse proxy.
*   **Inventarisasi Layanan**
    *   Layanan Berjalan: Mengidentifikasi aplikasi apa saja yang sedang aktif melalui perintah `docker ps`.
    *   Manajemen Port: Memahami pemetaan port internal container ke port host.

## 2. Tahap Akses dan Keamanan (SSH)

Langkah awal untuk berinteraksi dengan server adalah melalui jalur remote yang aman.

*   **Penyusunan Kredensial**
    *   Pembuatan Key: Membuat SSH Key menggunakan algoritma ed25519 di perangkat lokal.
    *   Registrasi: Menyerahkan Public Key kepada administrator untuk didaftarkan ke server.
*   **Kebijakan Akses Individu**
    *   User Spesifik: Setiap anggota tim akan dibuatkan user sendiri (contoh: `/home/nama_user`).
    *   Larangan Shared Account: Dilarang keras menggunakan satu akun (seperti `root` atau `admin`) secara bersama-sama untuk menjaga audit log dan akuntabilitas.

## 3. Tahap Pengembangan dan Deployment

Setelah memiliki akses, tim dapat mulai berkontribusi pada aplikasi.

*   **Standar Pengembangan**
    *   Coding: Mengikuti [Standar Coding](./coding-standards.md) yang telah ditetapkan.
    *   Git: Melakukan push ke repositori GitHub pada branch fitur.
*   **Prosedur Deployment**
    *   Otomatisasi: Memahami bagaimana GitHub Actions melakukan build dan push ke Docker Hub.
    *   Update Server: Memantau proses deployment otomatis ke server melalui Cloudflare Tunnel.
