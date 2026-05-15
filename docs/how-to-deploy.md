---
title: Panduan Deployment Aplikasi
description: Prosedur teknis untuk melakukan deployment aplikasi ke dalam ekosistem server Gonku menggunakan Docker dan Docker Hub.
---

# Panduan Deployment Aplikasi

Halaman ini merinci standar arsitektur dan prosedur deployment aplikasi di server Gonku untuk memastikan isolasi layanan dan efisiensi resource.

## 1. Arsitektur Multi-Layer Nginx

Kami menerapkan sistem reverse proxy berlapis untuk memisahkan manajemen trafik global dengan konfigurasi spesifik aplikasi.

*   **Nginx Host (Level 1)**
    *   Fungsi: Bertindak murni sebagai reverse proxy utama untuk mengarahkan trafik dari domain luar ke container yang tepat.
    *   Konfigurasi: Menghubungkan hostname (contoh: `app.gonku.my.id`) ke IP dan Port container aplikasi.
*   **Nginx Container (Level 2)**
    *   Fungsi: Setiap aplikasi disarankan memiliki Nginx sendiri di dalam containernya untuk melayani file statis atau konfigurasi internal aplikasi.
    *   Keuntungan: Konfigurasi antar aplikasi tidak akan saling mengganggu (terisolasi).

## 2. Isolasi Database dalam Container

Seluruh database wajib dijalankan di dalam container terpisah untuk keamanan dan portabilitas data.

*   **Pemisahan Resource**
    *   Isolasi Data: Database tidak diinstal langsung di host OS, melainkan menggunakan image resmi (contoh: `mysql:8.0` atau `postgres:alpine`).
    *   Persistensi: Gunakan Docker Volumes untuk memastikan data database tetap aman meskipun container dihentikan atau diperbarui.

## 3. Alur Deployment via Docker Hub

Kami tidak melakukan proses *build* aplikasi langsung di server produksi untuk menjaga performa server tetap stabil.

*   **Proses Build dan Push (Luar Server)**
    *   Build: Image dibangun di lokal developer atau melalui GitHub Actions.
    *   Push: Image yang sudah jadi dikirim ke **Docker Hub** sebagai registry pusat.
*   **Proses Pull dan Deploy (Di Server)**
    *   Pull: Server hanya bertugas menarik image yang sudah matang dari Docker Hub.
    *   Deployment: Menjalankan container menggunakan image tersebut melalui Docker Compose.

## 4. Contoh Konfigurasi (Docker Compose)

Berikut adalah standar penulisan `docker-compose.yml` yang mengintegrasikan aplikasi, Nginx container, dan database terisolasi.

```yaml
services:
  app-web:
    image: username/app-repo:latest # Image ditarik dari Docker Hub
    container_name: gonku-app-web
    restart: unless-stopped
    ports:
      - "8081:80" # Port ini yang akan ditembak oleh Nginx Host
    depends_on:
      - app-db

  app-db:
    image: mysql:8.0
    container_name: gonku-app-db
    environment:
      MYSQL_ROOT_PASSWORD: secrets_password
    volumes:
      - db_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  db_data:
```

::: warning REVERSE PROXY HOST
Pastikan port `8081` pada contoh di atas sudah didaftarkan pada konfigurasi Nginx di level host agar domain dapat diakses secara publik.
:::
