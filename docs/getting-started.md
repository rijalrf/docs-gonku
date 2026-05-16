---
title: Panduan Utama Inisialisasi dan Operasional Home Server Gonku
description: Dokumentasi komprehensif mengenai infrastruktur digital, standar keamanan, dan alur kerja otomatisasi Home Server Gonku menggunakan format sub-point teknis.
---

# Getting Started: Panduan Utama Operasional Gonku

Dokumentasi ini merupakan kompas teknis utama bagi pengelolaan infrastruktur digital pada ekosistem Home Server Gonku. Setiap bagian dirancang untuk memberikan pemahaman teknis yang mendalam mengenai mekanisme operasional, arsitektur keamanan, dan otomatisasi sistem.

::: info KOMPAS OPERASIONAL
Infrastruktur beroperasi sebagai unit fisik mandiri (self-hosted) untuk menjamin kedaulatan data penuh tanpa ketergantungan pada pihak ketiga.
:::

---

## 1. Infrastruktur Fisik dan Manajemen Kendali Daya

Keandalan layanan mandiri bertumpu pada stabilitas pengelolaan perangkat keras dan mitigasi risiko kegagalan daya.

*   **Lokasi dan Penempatan Strategis**
    *   Pusat Data Lokal: Unit ditempatkan pada lokasi aman yang terkelola secara mandiri sebagai titik pusat data domain gonku.my.id.
    *   Manajemen Lingkungan: Penempatan memastikan aliran udara optimal untuk menjaga suhu operasional komponen hardware.
*   **Mekanisme Pengendalian Daya Jarak Jauh**
    *   Integrasi Teknologi: Penggunaan ekosistem Bardi Smart Home yang dikombinasikan dengan modul relay fisik.
    *   Fungsi Administrator: Akses penuh via aplikasi seluler untuk prosedur Power On, Power Off, dan Hard Reboot.

::: warning MITIGASI KRITIS
Jalur kendali daya fisik berfungsi sebagai solusi akhir jika akses remote SSH mengalami system freeze yang tidak dapat diatasi melalui jalur perangkat lunak.
:::

---

## 2. Spesifikasi Teknis Perangkat Keras

Sistem menggunakan arsitektur Intel Sandy Bridge yang dikonfigurasi untuk beban kerja server berkelanjutan 24/7.

::: tip OPTIMALISASI KOMPONEN
Pemisahan antara SSD (sistem) dan HDD (data) dilakukan untuk menjamin responsivitas OS tetap optimal meskipun sedang melakukan transfer data besar pada drive penyimpanan sekunder.
:::

*   **Unit Pemrosesan dan Motherboard**
    *   CPU: Intel Core i5 2400 (4 Core, 4 Thread, Clock 3.10 GHz hingga Turbo 3.40 GHz).
    *   Mainboard: Chipset Intel H61 dengan soket LGA1155 untuk stabilitas distribusi data antar komponen.
*   **Memori dan Output Visual**
    *   RAM: Kapasitas 8GB atau 16GB DDR3 untuk penanganan multi-container Docker simultan.
    *   VGA: Intel HD Graphics 2000 terintegrasi untuk efisiensi konsumsi daya sistem.
*   **Arsitektur Penyimpanan (Dual-Drive)**
    *   Sistem Utama: SSD 512GB dialokasikan untuk OS, database, dan runtime aplikasi guna menjamin latensi rendah.
    *   Penyimpanan Data: HDD 500GB dialokasikan untuk mass storage, aset digital, dan pencadangan data jangka panjang.
*   **Catu Daya dan Sasis**
    *   PSU: Unit 500 Watt untuk memastikan ketersediaan daya stabil selama operasional beban tinggi.
    *   Casing: Model Gaming M-ATX/ATX dengan manajemen kabel dan aliran udara yang terencana.

---

## 3. Fondasi Ekosistem Perangkat Lunak (Software Stack)

Implementasi teknologi open-source standar industri untuk menjamin stabilitas dan kemudahan pemeliharaan.

*   **Sistem Operasi (Host OS)**
    *   Platform: Ubuntu Server 24.04 LTS (Noble Numbat) sebagai basis utama yang menjamin ketersediaan dukungan keamanan jangka panjang.

::: info TEKNOLOGI KONTAINERISASI
Seluruh layanan dijalankan di dalam lingkungan terisolasi menggunakan Docker untuk menghindari konflik dependensi dan memudahkan manajemen siklus hidup aplikasi.
:::

*   **Virtualisasi dan Containerization**
    *   Engine: Docker untuk isolasi layanan dan manajemen dependensi aplikasi secara modular.
    *   Manajemen: Memudahkan siklus deployment tanpa meninggalkan residu pada sistem operasi host.
*   **Network Entry Point**
    *   Reverse Proxy: Nginx sebagai gerbang utama pengatur trafik domain gonku.my.id.
    *   Security: Manajemen enkripsi SSL/TLS dan pengarah trafik ke container aplikasi yang tepat.

---

## 4. Keamanan Jaringan: Paradigma Zero Trust

Pengadopsian standar keamanan korporat untuk melindungi infrastruktur jaringan lokal.

::: danger PROTEKSI JARINGAN
Sistem sama sekali tidak membuka port forwarding pada router lokal untuk menutup total celah serangan port scanning dan akses tidak sah dari internet publik.
:::

*   **Cloudflare Tunneling**
    *   Mekanisme: Menciptakan terowongan terenkripsi langsung dari server lokal ke jaringan global Cloudflare.
    *   Privasi IP: Menyembunyikan alamat IP publik asli lokasi fisik secara total dari internet luar.
*   **Eliminasi Celah Serangan**
    *   Port Security: Tidak ada pembukaan port (port forwarding) pada router lokal, termasuk port 22 (SSH).
    *   Mitigasi Scanning: Menutup total potensi serangan port scanning dan brute-force eksternal.

---

## 5. Protokol Autentikasi Kriptografi

Keamanan akses administratif menggunakan standar enkripsi kunci publik modern.

::: warning KEBIJAKAN AKSES
Dilarang keras menggunakan satu akun secara bersama-sama untuk menjaga audit log dan akuntabilitas setiap perubahan sistem yang dilakukan oleh anggota tim.
:::

*   **Kebijakan Login Sistem**
    *   Autentikasi Password: Dinonaktifkan sepenuhnya untuk mencegah serangan tebak kata sandi.
    *   Standar Akses: Wajib menggunakan SSH Key dengan algoritma ed25519 yang efisien dan aman.
*   **Manajemen Hak Akses (Least Privilege)**
    *   Isolasi User: Pemisahan akun sistem berdasarkan peran operasional (contoh: user deployer vs user admin).
    *   Audit Akses: Pendaftaran Public Key dilakukan secara manual dan terverifikasi oleh administrator utama.


---

## 6. Otomatisasi Deployment (CI/CD)

Alur kerja otomatisasi untuk menjamin akurasi dan kecepatan pengiriman fitur aplikasi.

*   **Pipeline GitHub Actions**
    *   Build Process: Otomatisasi pembangunan image Docker dan pengiriman ke registry (Docker Hub).
    *   Verifikasi Kode: Memastikan setiap perubahan telah melewati tahap build sebelum diterapkan ke server.
*   **Deployment Berbasis Service Token**
    *   Autentikasi: Penggunaan Cloudflare Service Token untuk bypass proteksi keamanan secara otomatis dan aman.
    *   Update Mekanisme: Pembaruan container di server utama dilakukan secara otomatis tanpa intervensi manual administrator.

---

### Navigasi Lanjutan
*   [Detail Arsitektur Zero Trust Network](./zero-trust-network.md)
*   [Panduan Setup Remote SSH](./remote-ssh.md)
*   [Manajemen Troubleshooting](./troubleshooting.md)
