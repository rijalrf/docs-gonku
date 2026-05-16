---
title: Standar Coding dan Pengembangan
description: Panduan standar penulisan kode dan konvensi pengembangan untuk tim Gonku.
---

# Standar Coding dan Pengembangan

Dokumentasi ini bertujuan untuk menyamakan persepsi dan standar kualitas kode dalam setiap proyek pengembangan yang berjalan di ekosistem Gonku.

## 1. Prinsip Pengembangan Utama

Kami mengedepankan kode yang mudah dibaca, dipelihara, dan diuji secara kolaboratif.

*   **Clean Code**
    *   Naming Convention: Gunakan nama variabel dan fungsi yang deskriptif dan konsisten (contoh: `getUserData` daripada `getU`).
    *   Function Scope: Pastikan setiap fungsi hanya melakukan satu tugas spesifik (Single Responsibility Principle).
*   **Version Control (Git)**
    *   Commit Messages: Gunakan format Conventional Commits (contoh: `feat: add user login`, `fix: resolve api timeout`).
    *   Branching Strategy: Selalu gunakan branch fitur (`feature/name`) dan lakukan Merge Request untuk review sebelum masuk ke branch utama.

## 2. Standar Dokumentasi Kode

Setiap logika yang kompleks wajib didokumentasikan agar mudah dipahami oleh anggota tim lainnya.

*   **Inline Comments**
    *   Kapan Digunakan: Hanya untuk menjelaskan "mengapa" sebuah logika dibuat, bukan "apa" yang dilakukan kode (jika kode sudah cukup jelas).
*   **README dan Dokumen Pendukung**
    *   Setup Guide: Setiap repositori wajib memiliki file README yang menjelaskan cara instalasi dan menjalankan proyek di lokal.

## 3. Pembelajaran Berkelanjutan

Tim didorong untuk terus mempelajari teknologi terbaru yang relevan dengan infrastruktur Gonku.

*   **Eksplorasi Teknologi**
    *   Fokus Area: Dockerization, Kubernetes, CI/CD Pipelines, dan Serverless Architecture.
    *   Knowledge Sharing: Berbagi temuan teknis atau solusi atas masalah kompleks melalui pembaruan pada dokumentasi pusat ini.
