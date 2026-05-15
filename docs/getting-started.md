---
title: Panduan Utama Inisialisasi dan Operasional Home Server Gonku
description: Dokumentasi komprehensif mengenai infrastruktur digital, standar keamanan, dan alur kerja otomatisasi Home Server Gonku.
---

# Panduan Utama: Inisialisasi dan Operasional Home Server Gonku

Selamat datang di pusat dokumentasi teknis yang menjadi kompas utama bagi pengelolaan seluruh infrastruktur digital pada ekosistem **Home Server Gonku**. Dokumen ini tidak hanya sekadar memberikan daftar spesifikasi, melainkan dirancang secara komprehensif untuk memberikan pemahaman fundamental bagi setiap anggota tim mengenai bagaimana server ini beroperasi, standar keamanan yang kita terapkan, hingga alur kerja otomatisasi yang menjamin keberlangsungan layanan secara profesional.

---

## 1. Penempatan Fisik dan Mekanisme Pengendalian Daya Canggih

Berbeda dengan infrastruktur berbasis cloud publik, server ini beroperasi sebagai unit fisik yang dikelola secara mandiri (*self-hosted*). Hal ini memberikan kita kendali penuh atas privasi data namun juga menuntut mekanisme pengelolaan fisik yang handal:

* **Lokasi Operasional Strategis**: Seluruh unit perangkat keras utama server ini ditempatkan dan beroperasi secara terpusat di wilayah **Serpong, Tangerang**, yang berfungsi sebagai titik pusat data lokal untuk melayani seluruh trafik domain `gonku.my.id`.
* **Sistem Manajemen Daya Jarak Jauh (Remote Power)**: Untuk memitigasi risiko kegagalan sistem yang tidak responsif secara perangkat lunak, kami mengimplementasikan teknologi **Bardi Smart Home** yang dikombinasikan dengan penggunaan **Modul Relay** fisik.
* **Kendali Administrator Mutlak**: Integrasi ini memungkinkan administrator untuk memiliki kemampuan pengendalian daya penuh melalui aplikasi seluler. Ini mencakup fungsi *Power On*, *Power Off*, hingga proses *Hard Reboot* instan jika server mengalami kondisi membeku (*system freeze*) yang tidak bisa diatasi melalui jalur akses SSH standar.

---

## 2. Arsitektur Perangkat Keras dan Efisiensi Operasional

Pemilihan komponen perangkat keras pada server ini telah melalui proses pertimbangan yang matang untuk menyeimbangkan antara performa responsif bagi pengguna dan efisiensi konsumsi daya untuk penggunaan jangka panjang:

* **Manajemen Memori Utama (RAM)**: Unit ini dilengkapi dengan kapasitas memori sebesar **8GB**, yang secara spesifik dialokasikan untuk menangani beban kerja multi-container Docker secara simultan tanpa menurunkan performa sistem secara signifikan.
* **Solusi Penyimpanan Berkecepatan Tinggi**: Untuk menjamin latensi yang rendah pada proses pembacaan dan penulisan data, kita menggunakan media penyimpanan **SSD berkapasitas 256GB**. Penggunaan SSD ini sangat krusial terutama saat menangani operasi database dan proses *build* aplikasi pada alur CI/CD.
* **Keandalan Operasional 24/7**: Arsitektur PC rumahan ini telah dioptimalkan secara khusus untuk mampu beroperasi secara stabil dalam durasi tanpa henti (24 jam sehari, 7 hari seminggu), menjamin bahwa seluruh layanan tim tetap dapat diakses kapan pun dibutuhkan.

---

## 3. Fondasi Ekosistem Perangkat Lunak (Software Stack)

Keandalan layanan Gonku dibangun di atas tumpukan teknologi *open-source* yang telah menjadi standar industri global, memastikan sistem yang stabil, mudah didokumentasikan, dan memiliki dukungan komunitas yang luas:

* **Sistem Operasi Tingkat Server**: Kita menggunakan **Ubuntu Server** sebagai fondasi utama karena reputasinya dalam hal stabilitas, keamanan, dan efisiensi sumber daya yang luar biasa untuk mengelola beban kerja server.
* **Virtualisasi Tingkat OS dengan Docker**: Untuk menghindari konflik antar aplikasi, seluruh layanan dijalankan di dalam lingkungan terisolasi menggunakan **Docker**. Teknologi container ini memungkinkan kita melakukan manajemen aplikasi (instalasi, pembaruan, hingga penghapusan) secara rapi tanpa meninggalkan residu sampah digital pada sistem operasi utama.
* **Nginx sebagai Gerbang Utama (Reverse Proxy)**: **Nginx** dikonfigurasi sebagai pelayan depan yang bertugas menerima seluruh permintaan masuk menuju domain `gonku.my.id`. Ia bertanggung jawab mengarahkan trafik tersebut ke container yang tepat, menangani enkripsi SSL, dan menjaga keamanan titik masuk aplikasi kita.

---

## 4. Keamanan Jaringan Global: Implementasi Zero Trust

Kita mengadopsi paradigma keamanan **Zero Trust** untuk memastikan bahwa meskipun server berada di jaringan rumahan, tingkat keamanannya setara dengan infrastruktur korporat:

* **Terowongan Aman Cloudflare (Tunneling)**: Salah satu fitur paling krusial adalah penggunaan **Cloudflare Tunnel**. Teknologi ini menciptakan "terowongan" terenkripsi langsung dari server kita ke jaringan global Cloudflare, sehingga **IP publik asli rumah kita tetap tersembunyi sepenuhnya** dan tidak dapat dilacak dari internet luar.
* **Eliminasi Port Forwarding**: Bertolak belakang dengan cara tradisional, kita tidak membuka port apapun pada router rumah kita, termasuk Port 22 untuk SSH. Hal ini menutup total celah serangan *port scanning* yang sering menjadi pintu masuk bagi peretas.
* **Kolaborasi Tim yang Terukur**: Dengan memanfaatkan paket Cloudflare Zero Trust Free, infrastruktur ini mampu menampung hingga **50 anggota tim** secara gratis, memberikan kita ruang yang sangat luas untuk pertumbuhan kolaborasi tanpa biaya tambahan.

---

## 5. Protokol Autentikasi dan Kebijakan Akses Kriptografi

Keamanan akses ke jantung server tidak lagi bergantung pada kata sandi yang mudah ditebak, melainkan telah ditingkatkan menggunakan metode enkripsi kunci publik yang sangat kuat:

* **Penonaktifkan Autentikasi Password**: Untuk mencegah serangan tebak kata sandi (*brute-force*), seluruh akses login menggunakan password standar Ubuntu telah **dinonaktifkan secara total**. Upaya login manual menggunakan password akan ditolak secara otomatis oleh sistem.
* **Standar Wajib SSH Key (ed25519)**: Setiap anggota tim yang memerlukan akses remote wajib menggunakan pasangan kunci SSH dengan algoritma **ed25519**. Metode ini jauh lebih aman dan efisien dibandingkan metode lama, di mana administrator secara manual mendaftarkan *Public Key* setiap pengguna ke dalam daftar resmi server.
* **Isolasi dan Hak Akses Terbatas (Least Privilege)**: Kita menerapkan pembatasan hak akses yang ketat dengan memisahkan user sistem operasi sesuai perannya. Misalnya, user `admin_gonku` digunakan untuk pemeliharaan sistem utama, sementara user `deployer` dikhususkan hanya untuk mengelola operasional container Docker.

---

## 6. Otomatisasi Siklus Pengembangan (CI/CD)

Untuk menjamin kecepatan dan akurasi dalam pengiriman fitur baru, kita mengimplementasikan alur kerja otomatisasi penuh menggunakan **GitHub Actions**:

* **Alur Deployment Tanpa Intervensi**: Setiap kali anggota tim melakukan *push* kode ke repositori GitHub, rangkaian robot otomatis akan bekerja untuk membangun (*build*) image aplikasi, mengirimnya ke Docker Hub, dan masuk ke server secara aman untuk memperbarui aplikasi tanpa perlu campur tangan manual.
* **Autentikasi Terintegrated via Service Token**: Agar proses otomatisasi ini dapat melewati proteksi Cloudflare tanpa hambatan, GitHub Actions menggunakan **Cloudflare Service Token** (terdiri dari Client ID dan Secret). Token ini berfungsi sebagai tanda pengenal digital yang sah, memungkinkan akses otomatis yang tetap aman dan terverifikasi.
* **Stabilitas Deployment**: Alur ini memastikan bahwa setiap versi aplikasi yang berjalan di server telah teruji secara konsisten melalui skrip workflow yang kita bangun, meminimalkan risiko kesalahan manusia saat proses pembaruan layanan.

---

> **Langkah Selanjutnya dalam Dokumentasi:**
> * Untuk rincian mengenai konfigurasi terowongan keamanan, silakan tinjau panduan [Zero Trust Network](./zero-trust-network.md).
> * Bagi anggota tim baru yang ingin mendaftarkan akses, silakan ikuti instruksi pada [Setup Remote SSH](./remote-ssh.md).
