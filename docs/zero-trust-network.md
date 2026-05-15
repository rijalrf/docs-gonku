---
title: Cloudflare Zero Trust Arsitektur Jaringan dan Keamanan
description: Panduan teknis konfigurasi Cloudflare Tunnel, ingress rules, dan kebijakan akses untuk keamanan Home Server Gonku.
---

# Cloudflare Zero Trust: Arsitektur Jaringan dan Keamanan

Dokumentasi ini merinci implementasi ekosistem Cloudflare Zero Trust untuk mengamankan infrastruktur Home Server Gonku. Arsitektur ini memungkinkan akses remote yang aman tanpa perlu melakukan port forwarding atau mengekspos alamat IP publik asli lokasi fisik server.

## 1. Filosofi Keamanan Zero Trust

Kami menerapkan prinsip keamanan Zero Trust yang mengasumsikan bahwa tidak ada koneksi yang dapat dipercaya secara default, meskipun berasal dari dalam jaringan internal.

*   **Mekanisme Pertahanan Utama**
    *   Cloudflare Tunnel: Menciptakan terowongan terenkripsi satu arah dari server menuju jaringan global Cloudflare.
    *   Penyembunyian Identitas: Menghilangkan jejak digital IP publik asli rumah untuk memitigasi serangan bertipe targeted DDoS atau scanning.
*   **Detail Paket dan Kapasitas**
    *   Lisensi: Menggunakan Cloudflare Zero Trust Free Plan (Biaya $0 untuk penggunaan personal).
    *   Kapasitas Tim: Mendukung hingga 50 seat pengguna secara gratis.
    *   Akses Log: Histori aktivitas akses disimpan selama 24 jam untuk kebutuhan audit.

## 2. Konfigurasi Server (Locally Managed Tunnel)

Server Gonku menggunakan metode manajemen lokal (Locally Managed), di mana seluruh konfigurasi rute didefinisikan secara manual melalui file konfigurasi di dalam host Ubuntu.

*   **Spesifikasi File Konfigurasi**
    *   Lokasi File: `/etc/cloudflared/config.yml`
    *   Struktur Ingress Rules: Digunakan untuk memetakan hostname publik ke layanan internal di port tertentu.

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /etc/cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: ssh.gonku.my.id
    service: ssh://localhost:22 # Meneruskan trafik SSH ke port 22
  - hostname: gonku.my.id
    service: http://localhost:80 # Meneruskan trafik web ke Nginx
  - service: http_status:404
```

*   **Manajemen Layanan**
    *   Penerapan Perubahan: Setiap modifikasi pada file YAML wajib diikuti dengan perintah `sudo systemctl restart cloudflared`.

## 3. Manajemen Aplikasi dan Kebijakan Akses

Kontrol akses dilakukan melalui Dashboard Cloudflare Zero Trust untuk menentukan entitas yang diizinkan melewati tunnel.

*   **Access Policies**
    *   Akses Tim: Menggunakan Action "Allow" dengan Selector "Emails" untuk memberika izin ke anggota tim spesifik melalui verifikasi browser.
    *   Otomatisasi: Menggunakan Action "Service Auth" dengan Selector "Service Token" khusus untuk kebutuhan GitHub Actions.
    *   Akses Publik: Menggunakan Action "Allow Everyone" untuk pintu depan aplikasi (keamanan tetap dijaga oleh SSH Key di sisi server).

## 4. Troubleshooting (Pemecahan Masalah)

Daftar kendala operasional yang umum ditemukan beserta solusi teknisnya.

*   **Kesalahan Handshake (websocket: bad handshake)**
    *   Penyebab: Koneksi mencapai Cloudflare namun ditolak oleh kebijakan keamanan (Access Policy).
    *   Solusi: Pastikan Service Token sudah terdaftar dan aksi di tab Policies disetel ke "Service Auth".
*   **Masalah Konektivitas (i/o timeout)**
    *   Penyebab: Klien mencoba menghubungi IP Cloudflare secara langsung tanpa melalui agen `cloudflared`.
    *   Solusi: Pastikan `cloudflared` terinstal di sisi klien dan konfigurasi SSH menggunakan `ProxyCommand`.
*   **Kesalahan Jalur Perintah (CreateProcessW failed error:2)**
    *   Penyebab: Aplikasi `cloudflared` tidak ditemukan dalam system PATH perangkat klien (umumnya pada Windows).
    *   Solusi: Masukkan folder binari `cloudflared` ke dalam Environment Variables sistem.
*   **Gagal Autentikasi (Permission denied publickey)**
    *   Penyebab: Tunnel berhasil terbuka namun Public Key SSH milik klien belum terdaftar di server tujuan.
    *   Solusi: Pastikan isi file `.pub` telah dimasukkan ke dalam `~/.ssh/authorized_keys` di user yang bersangkutan.
