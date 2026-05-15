---
title: Panduan Utama Inisialisasi dan Operasional Home Server Gonku
description: Dokumentasi komprehensif mengenai infrastruktur digital, standar keamanan, dan alur kerja otomatisasi Home Server Gonku dengan penjelasan mendalam.
---

# Getting Started: Panduan Utama Operasional Gonku

Selamat datang di pusat dokumentasi teknis yang menjadi kompas utama bagi seluruh pengelolaan infrastruktur digital pada ekosistem Home Server Gonku. Dokumen ini dirancang secara sistematis untuk memberikan pemahaman fundamental bagi setiap pengelola mengenai mekanisme operasional server, standar keamanan kriptografi yang diterapkan, hingga implementasi alur kerja otomatisasi yang menjamin keberlangsungan layanan secara profesional dan berkelanjutan.

::: info KOMPAS OPERASIONAL
Infrastruktur ini beroperasi sepenuhnya sebagai unit fisik yang dikelola secara mandiri (self-hosted). Pendekatan ini dipilih untuk memastikan kendali mutlak atas kedaulatan data dan privasi pengguna tanpa bergantung pada penyedia layanan awan pihak ketiga, namun dengan tetap mengedepankan standar pengelolaan infrastruktur yang setara dengan industri profesional.
:::

---

## 1. Infrastruktur Fisik dan Manajemen Kendali Daya

Keandalan sebuah layanan mandiri sangat bergantung pada stabilitas pengelolaan perangkat keras di lokasi fisik. Seluruh unit perangkat keras utama server ini ditempatkan pada lokasi yang aman dan terkelola secara mandiri, yang berfungsi sebagai titik pusat data lokal untuk melayani seluruh trafik masuk melalui domain utama gonku.my.id. Untuk memitigasi risiko kegagalan sistem yang bersifat kritis, kami mengimplementasikan sistem manajemen daya jarak jauh menggunakan integrasi teknologi Bardi Smart Home yang dikombinasikan dengan penggunaan modul relay fisik pada jalur kelistrikan utama.

Sistem ini memungkinkan administrator untuk memiliki kemampuan pengendalian daya penuh yang dapat diakses melalui aplikasi seluler kapan saja dan dari mana saja. Kemampuan ini mencakup fungsi Power On, Power Off, hingga prosedur Hard Reboot secara instan. Fitur ini sangat krusial terutama saat server mengalami kondisi system freeze atau kegagalan perangkat lunak yang menyebabkan jalur akses remote standar seperti SSH menjadi tidak responsif.

---

## 2. Arsitektur Perangkat Keras dan Spesifikasi Teknis Utama

Pemilihan komponen perangkat keras pada server Gonku didasarkan pada kebutuhan untuk mencapai keseimbangan optimal antara performa komputasi yang stabil dan efisiensi konsumsi daya. Server ini ditenagai oleh prosesor Intel Core i5 2400 yang memiliki kecepatan dasar 3,10 GHz dengan kemampuan Turbo Boost hingga 3,40 GHz. Arsitektur prosesor ini mencakup 4 Core dan 4 Thread, yang memberikan kapasitas pemrosesan paralel yang memadai untuk menangani berbagai container Docker secara simultan. Unit pemrosesan ini terpasang pada motherboard dengan chipset Intel H61 (Soket LGA1155), sebuah fondasi yang stabil untuk prosesor Intel generasi Sandy Bridge.

Sistem ini didukung oleh kapasitas memori sebesar 8GB atau 16GB DDR3, yang memungkinkan manajemen memori yang fleksibel untuk beban kerja multi-tasking. Untuk aspek penyimpanan, kami menggunakan konfigurasi dual-storage yang terdiri dari SSD berkapasitas 512GB untuk kecepatan booting sistem operasi dan responsivitas aplikasi yang maksimal, serta HDD berkapasitas 500GB yang difungsikan sebagai media penyimpanan data bervolume besar atau arsip digital.

| Komponen Arsitektur | Spesifikasi Teknis Detil | Deskripsi Fungsi Operasional |
| :--- | :--- | :--- |
| **Prosesor (CPU)** | Intel Core i5 2400 | Quad-Core dengan kecepatan hingga 3,40 GHz untuk menangani logika pemrosesan container. |
| **Motherboard** | Intel H61 (LGA1155) | Fondasi sistem standar yang menjamin kompatibilitas dan stabilitas distribusi data antar komponen. |
| **Memori (RAM)** | 8GB / 16GB DDR3 | Kapasitas yang memadai untuk manajemen runtime berbagai layanan microservices tanpa bottleneck. |
| **Grafis (VGA)** | Intel HD Graphics 2000 | Unit grafis terintegrasi yang efisien untuk menangani kebutuhan output visual dasar tanpa konsumsi daya berlebih. |
| **Penyimpanan Utama** | SSD 512GB | Media penyimpanan utama untuk sistem operasi dan database guna menjamin latensi akses data yang rendah. |
| **Penyimpanan Data** | HDD 500GB | Kapasitas tambahan yang dialokasikan untuk penyimpanan aset digital dan pencadangan data jangka panjang. |
| **Catu Daya (PSU)** | 500 Watt | Menjamin ketersediaan daya yang stabil dan aman bagi seluruh komponen selama operasional 24/7. |
| **Sasis (Casing)** | M-ATX / ATX Gaming | Struktur pelindung dengan manajemen aliran udara yang baik untuk menjaga suhu operasional komponen tetap optimal. |

::: tip OPTIMALISASI KOMPONEN
Penggunaan konfigurasi SSD sebagai drive sistem dan HDD sebagai drive data merupakan standar efisiensi yang kami terapkan untuk memaksimalkan rasio performa terhadap biaya operasional.
:::

---

## 3. Fondasi Ekosistem Perangkat Lunak (Software Stack)

Keandalan seluruh layanan yang berjalan di atas ekosistem Gonku dibangun menggunakan tumpukan teknologi open-source yang telah menjadi standar industri global, memastikan sistem yang stabil, terdokumentasi dengan baik, dan mudah untuk dipelihara secara kolaboratif.

### Sistem Operasi Ubuntu Server
Kami menggunakan Ubuntu Server sebagai fondasi utama karena reputasinya yang luar biasa dalam hal stabilitas, keamanan berkala, serta efisiensi penggunaan sumber daya perangkat keras untuk mengelola berbagai beban kerja server yang kompleks.

### Virtualisasi Container dengan Docker
Untuk menghindari terjadinya konflik antar ketergantungan aplikasi, seluruh layanan dijalankan di dalam lingkungan terisolasi menggunakan teknologi Docker. Pendekatan containerization ini memungkinkan tim untuk melakukan manajemen siklus hidup aplikasi (instalasi, pembaruan versi, hingga penghapusan) secara rapi dan modular tanpa meninggalkan residu sampah digital pada sistem operasi utama.

### Nginx Reverse Proxy dan Load Balancing
Nginx dikonfigurasi sebagai pelayan depan atau gerbang utama yang bertugas menerima seluruh permintaan masuk menuju domain gonku.my.id. Selain mengarahkan trafik ke container aplikasi yang tepat, Nginx juga bertanggung jawab penuh atas manajemen enkripsi SSL/TLS untuk memastikan seluruh pertukaran data antara pengguna dan server tetap aman dan terenkripsi.

---

## 4. Keamanan Jaringan Global melalui Paradigma Zero Trust

Kami mengadopsi paradigma keamanan Zero Trust untuk memastikan bahwa meskipun server berada di jaringan rumahan, tingkat keamanannya tetap setara dengan infrastruktur korporat global. Salah satu komponen paling krusial dalam arsitektur ini adalah penggunaan Cloudflare Tunnel. Teknologi ini menciptakan terowongan terenkripsi yang menghubungkan server lokal secara langsung ke jaringan global Cloudflare, sehingga alamat IP publik asli dari lokasi server tetap tersembunyi sepenuhnya dan tidak dapat dilacak dari internet luar.

Berbeda dengan metode tradisional yang memerlukan port forwarding, arsitektur kami sama sekali tidak membuka port apapun pada router lokal, termasuk port standar 22 untuk SSH. Hal ini secara efektif menutup total seluruh celah serangan port scanning dan serangan brute-force dari pihak luar yang mencoba mencari pintu masuk ke dalam sistem internal kami.

---

## 5. Protokol Autentikasi dan Kebijakan Akses Kriptografi

Keamanan akses ke tingkat inti server tidak lagi bergantung pada penggunaan kata sandi yang rentan untuk ditebak, melainkan telah ditingkatkan menggunakan metode enkripsi kunci publik yang memiliki tingkat keamanan sangat tinggi.

Seluruh akses login menggunakan password standar pada sistem operasi telah dinonaktifkan secara total. Setiap upaya login manual menggunakan kata sandi akan ditolak secara otomatis oleh sistem keamanan server. Sebagai gantinya, setiap anggota tim yang memerlukan akses remote wajib menggunakan pasangan kunci SSH dengan algoritma modern ed25519. Kami juga menerapkan kebijakan Least Privilege, di mana setiap akun pengguna sistem operasi dibatasi hak aksesnya sesuai dengan peran masing-masing untuk meminimalisir dampak jika terjadi kegagalan keamanan pada salah satu akun.

---

## 6. Otomatisasi Siklus Pengembangan dan Deployment (CI/CD)

Untuk menjamin kecepatan, konsistensi, dan akurasi dalam setiap pengiriman fitur atau perbaikan kode baru, kami mengimplementasikan alur kerja otomatisasi penuh menggunakan layanan GitHub Actions. Setiap kali anggota tim melakukan push kode ke repositori, rangkaian workflow otomatis akan mulai bekerja untuk membangun image aplikasi terbaru dan mengirimnya ke Docker Hub secara aman.

Proses pembaruan aplikasi di server utama dilakukan secara otomatis oleh agen deployment yang masuk ke server menggunakan Cloudflare Service Token. Token digital ini berfungsi sebagai pengenal sah yang memungkinkan akses otomatis melewati proteksi keamanan Cloudflare tanpa memerlukan intervensi manual dari administrator, memastikan bahwa versi terbaru aplikasi dapat segera dinikmati oleh pengguna dengan downtime minimal.

---

### Navigasi Lanjutan
Silakan melanjutkan ke bagian dokumentasi teknis berikut untuk detail implementasi yang lebih spesifik:
*   [Detail Arsitektur Zero Trust Network](./zero-trust-network.md) - Penjelasan mendalam mengenai konfigurasi tunnel dan keamanan jaringan.
*   [Panduan Setup Remote SSH](./remote-ssh.md) - Langkah-langkah teknis pendaftaran SSH Key untuk akses administrator.
*   [Manajemen Troubleshooting](./troubleshooting.md) - Prosedur penanganan jika terjadi kegagalan layanan atau kendala konektivitas.
