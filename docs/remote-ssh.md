---
title: Panduan Akses Remote SSH
description: Prosedur teknis pengaturan SSH Key dan kebijakan akses per-user pada server Gonku.
---

# Panduan Akses Remote SSH

Akses ke server Gonku hanya diizinkan melalui jalur terenkripsi SSH menggunakan kunci kriptografi. Kami tidak mengizinkan autentikasi berbasis kata sandi demi menjaga keamanan sistem.

## 1. Kebijakan Akses Individu

Kami menerapkan prinsip *Strict Individual Access* untuk memastikan keamanan dan kemudahan audit.

::: warning SATU USER SATU ORANG
Setiap anggota tim wajib memiliki akun sistem sendiri. Penggunaan satu akun secara bersama-sama (sharing account) sangat dilarang untuk menjaga integritas audit log server.
:::

*   **Keuntungan Akun Individu**
    *   Audit Log: Memudahkan pelacakan jika terjadi kesalahan konfigurasi atau masalah keamanan.
    *   Isolasi Environment: File dan konfigurasi pribadi tersimpan aman di direktori home masing-masing.

## 2. Prosedur Pengaturan SSH Key

Gunakan algoritma ed25519 untuk keamanan dan performa terbaik.

::: tip KEAMANAN KUNCI
Sangat disarankan untuk menambahkan passphrase saat membuat SSH Key untuk memberikan lapisan perlindungan tambahan jika perangkat lokal Anda hilang atau diakses pihak lain.
:::

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
*   **Penggunaan SSH Config (Wajib)**
    *   Fungsi: Mengotomatisasi penggunaan `cloudflared` sebagai jembatan (bridge) menuju tunnel server.
    *   Konfigurasi: Tambahkan blok berikut ke dalam file `~/.ssh/config` (Linux/Mac) atau `C:\Users\Username\.ssh\config` (Windows).

```ssh
Host ssh.gonku.my.id
  IdentityFile ~/.ssh/id_ed25519_gonkuserver
  ProxyCommand cloudflared access ssh --hostname %h
```

::: warning KETENTUAN CONFIG
Pastikan path pada `IdentityFile` diarahkan ke lokasi tepat di mana Anda menyimpan Private Key SSH. Untuk pengguna Windows, gunakan format path yang sesuai (contoh: `.\.ssh\id_ed25519_gonkuserver`).
:::
