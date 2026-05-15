---
title: Panduan Utama Inisialisasi dan Operasional Home Server Gonku
description: Dokumentasi komprehensif mengenai infrastruktur digital, standar keamanan, dan alur kerja otomatisasi Home Server Gonku.
---

# 🚀 Getting Started: Panduan Utama Gonku

Selamat datang di pusat dokumentasi teknis **Home Server Gonku**. Dokumen ini dirancang secara komprehensif untuk memberikan pemahaman fundamental mengenai operasional, standar keamanan, hingga alur kerja otomatisasi sistem.

::: info KOMPAS UTAMA
Server ini beroperasi sebagai unit fisik yang dikelola secara mandiri (*self-hosted*), memberikan kendali penuh atas privasi data Anda.
:::

---

## 1. 🏢 Infrastruktur Fisik & Kendali Daya

Mekanisme pengelolaan fisik yang handal adalah kunci keberlangsungan layanan self-hosted.

*   **📍 Lokasi Operasional**: Unit ditempatkan pada lokasi yang aman dan terkelola secara mandiri, berfungsi sebagai titik pusat data lokal untuk domain `gonku.my.id`.
*   **⚡ Sistem Manajemen Daya**: Menggunakan teknologi **Bardi Smart Home** + **Modul Relay** fisik untuk mitigasi risiko sistem tidak responsif.
*   **🎮 Administrator Control**: Kendali penuh melalui aplikasi seluler untuk fungsi *Power On*, *Off*, hingga *Hard Reboot* jika terjadi *system freeze*.

---

## 2. 💻 Arsitektur Perangkat Keras

Spesifikasi perangkat keras dipilih untuk keseimbangan performa responsif dan efisiensi daya.

| Komponen | Spesifikasi | Kegunaan Utama |
| :--- | :--- | :--- |
| **RAM** | 8GB | Multi-container Docker simultan |
| **Storage** | SSD 256GB | Database & Alur CI/CD (Low Latency) |
| **Uptime** | 24/7 | Stabilitas layanan tanpa henti |

::: tip EFISIENSI OPERASIONAL
Arsitektur PC rumahan ini telah dioptimalkan khusus untuk penggunaan durasi panjang dengan konsumsi daya yang terukur.
:::

---

## 3. 🛠️ Fondasi Software (Stack)

Tumpukan teknologi *open-source* standar industri global:

### 🐧 Ubuntu Server
Sistem operasi utama yang menjamin stabilitas, keamanan, dan efisiensi sumber daya.

### 🐳 Docker (Virtualisasi)
Seluruh layanan dijalankan dalam lingkungan terisolasi. Memudahkan instalasi, pembaruan, hingga penghapusan tanpa meninggalkan residu sistem.

### 🛡️ Nginx (Reverse Proxy)
Gerbang utama trafik `gonku.my.id`. Bertugas menangani enkripsi SSL dan mengarahkan trafik ke container yang tepat.

---

## 4. 🌐 Jaringan Global: Zero Trust

Implementasi keamanan tingkat korporat pada jaringan rumahan.

::: details Kenapa Menggunakan Zero Trust?
1. **Cloudflare Tunnel**: Menciptakan terowongan terenkripsi langsung ke jaringan global Cloudflare.
2. **Hidden IP**: IP publik asli rumah tersembunyi sepenuhnya dari internet luar.
3. **No Port Forwarding**: Port 22 (SSH) dan port lainnya tertutup total, menutup celah serangan *port scanning*.
:::

---

## 5. 🔑 Autentikasi Kriptografi

Keamanan akses menggunakan metode enkripsi kunci publik yang sangat kuat.

*   **❌ No Passwords**: Autentikasi password dinonaktifkan secara total untuk mencegah serangan *brute-force*.
*   **🔐 SSH Key (ed25519)**: Standar wajib untuk akses remote. Lebih aman dan efisien dibandingkan metode tradisional.
*   **👥 Least Privilege**: Isolasi user berdasarkan peran (contoh: user `deployer` hanya untuk operasional Docker).

---

## 6. 🔄 Otomatisasi CI/CD

Pengiriman fitur yang cepat dan akurat menggunakan **GitHub Actions**.

1.  **Push Kode**: Developer melakukan push ke repositori GitHub.
2.  **Auto Build**: GitHub Actions membangun image aplikasi dan mengirimnya ke Docker Hub.
3.  **Secure Deploy**: Robot masuk ke server via **Cloudflare Service Token** untuk memperbarui container tanpa intervensi manual.

---

### 🗺️ Langkah Selanjutnya
::: warning PANDUAN PENTING
Pastikan Anda membaca bagian berikut sebelum melakukan konfigurasi teknis:
*   [Arsitektur Zero Trust Network](./zero-trust-network.md)
*   [Setup Akses Remote SSH](./remote-ssh.md)
:::
