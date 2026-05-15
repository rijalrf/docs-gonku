---
title: Panduan Akses Remote SSH
description: Prosedur teknis pengaturan SSH Key dan kebijakan akses per-user pada server Gonku.
---

# Panduan Akses Remote SSH

Akses ke server Gonku hanya diizinkan melalui jalur terenkripsi SSH menggunakan kunci kriptografi. Kami tidak mengizinkan autentikasi berbasis kata sandi demi menjaga keamanan sistem.

## 1. Kebijakan Akses Individu

Kami menerapkan prinsip *Strict Individual Access* untuk memastikan keamanan dan kemudahan audit.

*   **Satu User Satu Orang**
    *   Setiap anggota tim wajib memiliki akun sistem sendiri yang dibuat oleh administrator.
    *   Penggunaan satu akun secara bersama-sama (sharing account) sangat dilarang.
*   **Keuntungan Akun Individu**
    *   Audit Log: Memudahkan pelacakan jika terjadi kesalahan konfigurasi atau masalah keamanan.
    *   Isolasi Environment: File dan konfigurasi pribadi tersimpan aman di direktori home masing-masing.

## 2. Prosedur Pengaturan SSH Key

Gunakan algoritma ed25519 untuk keamanan dan performa terbaik.

*   **Pembuatan Key di Lokal (Windows/Linux/Mac)**
    *   Command: Jalankan `ssh-keygen -t ed25519 -C "nama_anda"`.
    *   Passphrase: Sangat disarankan untuk menambahkan passphrase pada key Anda.
*   **Registrasi ke Server**
    *   Public Key: Berikan file `id_ed25519.pub` kepada administrator.
    *   Verifikasi: Tunggu konfirmasi bahwa key Anda telah dimasukkan ke dalam file `authorized_keys` di user Anda.

## 3. Cara Melakukan Koneksi

Setelah key terdaftar, Anda dapat mengakses server melalui terminal.

*   **Format Perintah**
    *   Syntax: `ssh nama_user@ip_atau_domain_server`.
*   **Penggunaan SSH Config (Opsional)**
    *   Fungsi: Mempermudah akses tanpa harus mengetik perintah panjang.
    *   Lokasi: Simpan konfigurasi di file `~/.ssh/config`.
