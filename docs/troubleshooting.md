---
title: Panduan Troubleshooting dan Pemecahan Masalah
description: Rekapitulasi lengkap proses pemecahan masalah teknis selama pembangunan infrastruktur Home Server Gonku.
---

# Panduan Troubleshooting dan Pemecahan Masalah

Halaman ini mendokumentasikan rekapitulasi lengkap dari seluruh proses pemecahan masalah teknis yang dilakukan selama pembangunan dan operasional infrastruktur Home Server Gonku. Dokumentasi ini bertujuan sebagai referensi cepat bagi tim jika menemukan kendala serupa di masa mendatang.

## 1. Konektivitas SSH dan Cloudflare Tunnel (i/o timeout)

*   **Identifikasi Masalah**
    *   Gejala: Muncul pesan kesalahan `dial tcp [IP Cloudflare]:22: i/o timeout` saat melakukan koneksi SSH melalui terminal atau GitHub Actions.
*   **Analisis Penyebab**
    *   Mekanisme Cloudflare: Secara default, jaringan Cloudflare memblokir akses langsung ke port 22 untuk mencegah serangan pada level infrastruktur edge.
    *   Kesalahan Rute: Perangkat klien mencoba menghubungi IP publik Cloudflare tanpa menggunakan protokol tunnel yang tepat.
*   **Solusi Teknis**
    *   Implementasi Bridge: Menginstal aplikasi `cloudflared` pada perangkat klien untuk bertindak sebagai jembatan (bridge).
    *   Konfigurasi Proxy: Menggunakan perintah `ProxyCommand` pada file konfigurasi SSH (`~/.ssh/config`) untuk memaksa trafik melalui terowongan aman Cloudflare.

## 2. Autentikasi dan Kebijakan Akses (bad handshake)

*   **Identifikasi Masalah**
    *   Gejala: Muncul pesan kesalahan `websocket: bad handshake` saat mencoba memulai sesi remote atau web.
*   **Analisis Penyebab**
    *   Kebijakan Zero Trust: Koneksi ditolak oleh lapisan keamanan Cloudflare Access karena adanya ketidaksesuaian antara metode autentikasi yang dikirimkan dengan kebijakan (Policy) yang ditetapkan.
*   **Solusi Teknis**
    *   Otomatisasi: Mengubah aksi (Action) pada Access Policies dari "Allow" menjadi "Service Auth" khusus untuk entitas yang menggunakan Service Token (seperti GitHub Actions).
    *   Akses Personal: Menambahkan selector email spesifik untuk memicu pengiriman kode verifikasi OTP melalui browser.
    *   Akses Tim: Memastikan selector diarahkan pada grup yang tepat dengan persyaratan wajib penggunaan SSH Key di sisi server.

## 3. Perizinan Sistem dan Kunci SSH (Permission denied)

*   **Identifikasi Masalah**
    *   Gejala: Muncul pesan kesalahan `Permission denied (publickey,password)` setelah berhasil melewati tunnel.
*   **Analisis Penyebab**
    *   Pendaftaran Kunci: Public Key klien belum terdaftar di dalam sistem tujuan.
    *   Hak Akses Folder: Perizinan pada direktori `.ssh` terlalu terbuka sehingga ditolak oleh standar keamanan daemon SSH.
*   **Solusi Teknis**
    *   Registrasi Kunci: Memasukkan konten Public Key pengguna ke dalam file `/home/username/.ssh/authorized_keys`.
    *   Penguncian Folder: Menjalankan perintah `chmod 700 ~/.ssh` dan `chmod 600 ~/.ssh/authorized_keys`.
    *   Izin Eksekusi: Menambahkan user operasional (contoh: `deployer`) ke dalam grup `docker` untuk memungkinkan eksekusi perintah tanpa `sudo`.

## 4. Reverse Proxy dan Aplikasi (502 Bad Gateway)

*   **Identifikasi Masalah**
    *   Gejala: Browser menampilkan status `502 Bad Gateway` saat mengakses domain aplikasi.
*   **Analisis Penyebab**
    *   Pemetaan Port: Terjadi ketidakcocokan antara port yang didefinisikan pada konfigurasi Nginx (host level) dengan port yang dipublikasikan oleh container Docker.
*   **Solusi Teknis**
    *   Sinkronisasi Konfigurasi: Memastikan parameter `proxy_pass` pada Nginx (contoh: `http://127.0.0.1:3000`) sesuai dengan pemetaan port pada container (parameter `-p 3000:3000`).

## 5. Kesalahan Konfigurasi Lokal dan Tipografi (Typos)

*   **Masalah Jalur Eksekusi (Windows)**
    *   Gejala: Error `CreateProcessW failed error:2` atau `posix_spawnp: No such file or directory`.
    *   Penyebab: File binari `cloudflared.exe` tidak ditemukan dalam System PATH.
    *   Solusi: Mendaftarkan folder instalasi ke dalam Environment Variables atau menggunakan full path pada SSH config.
*   **Kesalahan Penulisan Parameter**
    *   Gejala: Pesan `Bad configuration option: indentifyfile`.
    *   Penyebab: Kesalahan ejaan (typo) pada atribut konfigurasi SSH.
    *   Solusi: Memperbaiki penulisan menjadi `IdentityFile` sesuai standar baku OpenSSH.

::: tip KEAMANAN BERLAPIS
Seluruh riwayat troubleshooting ini menunjukkan bahwa infrastruktur Gonku saat ini dilindungi oleh lapisan keamanan ganda, mulai dari enkripsi tunnel pada level jaringan hingga penguncian kriptografi SSH Key pada level sistem operasi.
:::
