---
title: Panduan Belajar dan Pengembangan Diri
description: Peta jalan pembelajaran untuk tim Gonku dalam menguasai teknologi server, coding, dan CI/CD.
---

# Panduan Belajar dan Pengembangan Diri

Halaman ini disediakan sebagai kurikulum mandiri bagi anggota tim untuk memahami fundamental hingga tingkat lanjut teknologi yang digunakan di server Gonku.

## 1. Fundamental Linux dan Server

Memahami sistem operasi adalah langkah awal yang krusial.

*   **Linux Command Line**
    *   Navigasi: Memahami perintah `ls`, `cd`, `mkdir`, dan `rm`.
    *   Permissions: Mempelajari konsep `chmod` dan `chown`.
    *   Monitoring: Menggunakan `htop` atau `docker stats` untuk memantau resource.
*   **Networking Dasar**
    *   Konsep IP & Port: Memahami bagaimana trafik diarahkan ke layanan tertentu.
    *   DNS & Domain: Pengenalan dasar mengenai pengaturan record Cloudflare.

## 2. Kontainerisasi (Docker)

Docker adalah jantung dari seluruh layanan di Gonku.

*   **Docker Basics**
    *   Images vs Containers: Memahami perbedaan antara cetak biru dan instance yang berjalan.
    *   Volumes & Networks: Mempelajari cara menyimpan data secara permanen dan menghubungkan container.
*   **Best Practices**
    *   Optimization: Cara membangun image yang kecil dan efisien.

## 3. Otomatisasi CI/CD

Mempelajari cara robot bekerja untuk menggantikan tugas manual manusia.

*   **GitHub Actions**
    *   Workflows: Memahami struktur file `.yaml` untuk otomatisasi.
    *   Secrets Management: Cara menyimpan token dan API key secara aman di repositori.
*   **Deployment Cycle**
    *   Continuous Integration: Proses pengujian kode otomatis.
    *   Continuous Deployment: Proses pengiriman kode langsung ke server produksi.
