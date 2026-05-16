---
title: CI/CD Deployment GitHub Actions, Docker Hub, dan SSH
description: Panduan otomatisasi alur kerja Continuous Integration dan Continuous Deployment untuk infrastruktur Gonku.
---

# CI/CD Deployment: GitHub Actions, Docker Hub, dan SSH

Otomatisasi infrastruktur Gonku memungkinkan tim pengembang untuk melakukan pembaruan aplikasi secara berkelanjutan tanpa intervensi manual pada terminal server. Dokumentasi ini merinci alur kerja, manajemen kredensial, serta template konfigurasi yang digunakan.

## 1. Alur Kerja Otomatisasi (Workflow)

Sistem dirancang untuk mencapai siklus *deployment* tanpa sentuhan (*zero-touch*) dengan urutan sebagai berikut:

*   **Integrasi Kode (Push)**
    *   Anggota tim melakukan pengiriman kode (git push) ke branch utama di repositori GitHub.
*   **Pembangunan Image (Build & Push)**
    *   GitHub Actions menjalankan instruksi Dockerfile untuk membangun image aplikasi.
    *   Image yang telah matang dikirimkan secara otomatis ke registry pusat di Docker Hub.
*   **Penerapan di Server (Deploy & Update)**
    *   GitHub Actions menjalin koneksi aman ke server melalui Cloudflare Tunnel.
    *   Server menarik image terbaru, melakukan rotasi container (stop & rm container lama), dan menjalankan versi terbaru.

## 2. Manajemen Kredensial (GitHub Secrets)

Seluruh informasi sensitif wajib disimpan dalam enkripsi GitHub Secrets untuk mencegah kebocoran data pada file konfigurasi publik.

| Nama Secret | Deskripsi / Nilai |
| :--- | :--- |
| **DOCKER_USER** | Identitas username akun Docker Hub. |
| **DOCKER_PASS** | Access Token atau password akun Docker Hub. |
| **SSH_HOST** | Hostname akses SSH melalui Cloudflare (contoh: `ssh.gonku.my.id`). |
| **SSH_USER** | Akun pengguna khusus pada Ubuntu Server (contoh: `deployer`). |
| **SSH_KEY** | Konten Private Key SSH (id_ed25519) yang telah terdaftar. |
| **CF_CLIENT_ID** | Client ID dari Service Token Cloudflare Zero Trust. |
| **CF_CLIENT_SECRET** | Client Secret dari Service Token Cloudflare Zero Trust. |

::: danger KEAMANAN TOKEN
Jangan pernah mencetak atau menampilkan nilai Service Token dalam log workflow untuk menghindari eksposur kredensial administratif.
:::

## 3. Implementasi Workflow (deploy.yml)

Gunakan file konfigurasi berikut pada direktori `.github/workflows/deploy.yml`. Template ini menggunakan metode SSH Bridge untuk menembus proteksi Cloudflare.

```yaml
name: Auto Deploy to Gonku Server

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USER }}
          password: ${{ secrets.DOCKER_PASS }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: ${{ secrets.DOCKER_USER }}/gonku-app:latest

  deploy-to-server:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Setup Cloudflare Tunnel Bridge
        uses: NX1X/cloudflare-tunnel-ssh-action@v1
        with:
          cf-access-client-id: ${{ secrets.CF_CLIENT_ID }}
          cf-access-client-secret: ${{ secrets.CF_CLIENT_SECRET }}
          ssh-private-key: ${{ secrets.SSH_KEY }}
          ssh-host: ${{ secrets.SSH_HOST }}
          ssh-user: ${{ secrets.SSH_USER }}

      - name: Execute Remote Deploy
        run: |
          ssh ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} << 'EOF'
            docker pull ${{ secrets.DOCKER_USER }}/gonku-app:latest
            docker stop gonku-container || true
            docker rm gonku-container || true
            docker run -d \
              --name gonku-container \
              -p 3000:3000 \
              --restart always \
              ${{ secrets.DOCKER_USER }}/gonku-app:latest
          EOF
```

### Penjelasan Sintaks dan Fungsi
*   **on: push**: Menentukan pemicu (trigger) otomatis saat terjadi pembaruan kode pada branch yang ditentukan.
*   **jobs**: Kumpulan unit kerja yang berjalan secara paralel atau sekuensial. `needs: build-and-push` memastikan tahap deployment hanya berjalan jika tahap build berhasil.
*   **uses**: Menggunakan template aksi dari komunitas (Marketplace) untuk tugas standar seperti login Docker atau koneksi SSH.
*   **NX1X/cloudflare-tunnel-ssh-action**: Aksi khusus yang menginstal `cloudflared` di lingkungan GitHub Actions untuk membypass verifikasi Zero Trust.
*   **EOF (End Of File)**: Digunakan untuk membungkus rangkaian perintah shell yang akan dieksekusi di server remote dalam satu sesi koneksi tunggal.

## 4. Konfigurasi Prasyarat Sisi Server

Agar alur kerja otomatisasi dapat berjalan, server Ubuntu wajib dikonfigurasi sebagai berikut:

*   **Otoritas SSH**
    *   Public Key (pasangan dari `SSH_KEY`) harus didaftarkan pada `/home/deployer/.ssh/authorized_keys`.
    *   Hak akses folder `.ssh` harus disetel pada `700` dan file `authorized_keys` pada `600`.
*   **Izin Grup Docker**
    *   User `deployer` wajib dimasukkan ke dalam grup `docker` (`sudo usermod -aG docker deployer`) agar dapat menjalankan perintah tanpa intervensi `sudo`.
*   **Kebijakan Cloudflare Zero Trust**
    *   Access Policy: Action untuk Service Token wajib disetel ke **Service Auth** (bukan sekadar Allow) agar tidak terhadang oleh verifikasi browser/OTP.

## 5. Matriks Troubleshooting

| Gejala Masalah | Identifikasi Penyebab | Tindakan Korektif |
| :--- | :--- | :--- |
| **i/o timeout** | Koneksi mencoba IP publik langsung tanpa melalui tunnel. | Pastikan menggunakan SSH Bridge Action yang mendukung `cloudflared`. |
| **bad handshake** | Service Token ditolak atau kebijakan akses salah. | Ubah Action pada Access Policy di dashboard menjadi "Service Auth". |
| **Permission denied** | Public Key tidak terdaftar atau perizinan folder salah. | Periksa entri di `authorized_keys` dan hak akses direktori `.ssh`. |

::: tip VALIDASI WORKFLOW
Selalu periksa tab "Actions" di repositori GitHub setelah melakukan push untuk memantau status eksekusi dan detail error jika terjadi kegagalan.
:::
