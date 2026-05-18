# Gonku Docs

Dokumentasi Resmi Infrastruktur Home Server Gonku (gonku.my.id). Repositori ini berisi panduan teknis mendalam mengenai pengelolaan server mandiri, arsitektur jaringan Zero Trust, dan otomatisasi deployment.

## 🚀 Fitur Utama

- **VitePress Powered**: Website dokumentasi modern yang cepat dan SEO-friendly.
- **Zero Trust Network**: Panduan implementasi Cloudflare Tunnel tanpa port forwarding.
- **CI/CD Automated**: Alur deployment otomatis menggunakan GitHub Actions & Docker Hub.
- **Dockerized**: Seluruh layanan dikelola dalam container terisolasi.
- **High Density Content**: Penulisan teknis yang ringkas, detail, dan profesional.

## 🛠️ Tech Stack

- **Dokumentasi**: [VitePress](https://vitepress.dev/)
- **Runtime**: Node.js (Dockerized)
- **Deployment**: GitHub Actions, Docker Hub
- **Keamanan**: Cloudflare Zero Trust, SSH Key (ed25519)
- **OS**: Ubuntu Server 24.04 LTS

## 💻 Pengembangan Lokal

Pastikan Anda memiliki Node.js dan npm terinstal.

### Instalasi Dependensi
```bash
npm install
```

### Jalankan Mode Pengembangan
```bash
npm run docs:dev
```
Akses di `http://localhost:5173`.

### Build Produksi
```bash
npm run docs:build
```

## 🐳 Docker (WSL/Linux)

Gunakan Docker untuk replikasi lingkungan produksi secara lokal.

### Jalankan dengan Docker Compose
```bash
docker compose up -d
```
Akses di `http://localhost:8080`.

## 🔄 Alur Kontribusi

Setiap perubahan wajib mengikuti standar profesional yang telah ditetapkan:

1. Buat branch baru: `feature/[nama-fitur]`.
2. Lakukan perubahan pada file `.md` di dalam folder `docs/`.
3. Gunakan format Conventional Commits (contoh: `docs: update network guide`).
4. Lakukan Push dan buat Pull Request di GitHub.

## 📝 Catatan Penting

- **No Icons/Emojis**: Dilarang menggunakan icon atau emoji di dalam konten dokumentasi utama.
- **Keamanan**: Port 22 ditutup sepenuhnya. Akses wajib menggunakan SSH Key yang terdaftar.

---
Dibuat dengan oleh **Gonku Team**.
