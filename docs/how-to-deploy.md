---
title: Panduan Deployment Aplikasi
description: Prosedur teknis untuk melakukan deployment aplikasi ke dalam ekosistem server Gonku menggunakan Docker.
---

# Panduan Deployment Aplikasi

Halaman ini merinci prosedur standar untuk melakukan deployment aplikasi baru atau pembaruan layanan ke dalam infrastruktur server Gonku secara aman dan terstruktur.

## 1. Persiapan Environment Docker

Setiap aplikasi wajib dikemas dalam bentuk container untuk menjaga isolasi sistem dan memudahkan manajemen resource.

*   **Dockerfile Standard**
    *   Base Image: Gunakan image resmi yang ringan (contoh: alpine atau slim) untuk meminimalkan ukuran dan celah keamanan.
    *   Multi-stage Build: Implementasikan multi-stage build untuk memisahkan proses kompilasi dan runtime guna menghasilkan image produksi yang optimal.
*   **Konfigurasi Orchestration**
    *   Docker Compose: Gunakan file docker-compose.yml untuk mendefinisikan services, networks, dan volumes.
    *   Restart Policy: Setel kebijakan restart pada `unless-stopped` untuk menjamin ketersediaan layanan setelah kegagalan sistem atau reboot server.

## 2. Alur Kerja Deployment

Proses deployment dilakukan melalui jalur otomatisasi untuk menghindari kesalahan manusia dan memastikan konsistensi versi.

*   **Deployment Otomatis (CI/CD)**
    *   Trigger: Push ke branch utama (main/master) akan memicu workflow GitHub Actions.
    *   Pipeline: Workflow melakukan proses build image, push ke Docker Hub, dan pengiriman sinyal update ke server.
*   **Deployment Manual (Kondisi Khusus)**
    *   Akses Server: Masuk ke server melalui jalur SSH yang telah terverifikasi.
    *   Command: Gunakan perintah `docker compose up -d --build` untuk menerapkan perubahan secara langsung.

## 3. Manajemen Port dan Reverse Proxy

Aplikasi yang dideploy tidak boleh membuka port langsung ke publik, melainkan harus melalui Nginx sebagai gerbang utama.

*   **Internal Networking**
    *   Docker Network: Hubungkan container ke network internal (contoh: `gonku-network`) agar dapat berkomunikasi antar layanan tanpa ekspos port ke host.
*   **Konfigurasi Nginx**
    *   Upstream: Daftarkan port container ke dalam konfigurasi block server Nginx.
    *   SSL/TLS: Pastikan enkripsi SSL aktif untuk setiap subdomain baru yang dibuat.
