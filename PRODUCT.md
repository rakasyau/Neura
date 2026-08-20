# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Mahasiswa dan masyarakat umum di Indonesia yang baru belajar Machine Learning dari nol. Situasi: ingin memahami konsep ML secara intuitif (visual, interaktif) tanpa harus menginstal alat atau membaca materi yang terlalu teknis/berbahasa Inggris.

## Product Purpose

Neura adalah platform pembelajaran ML berbasis web berbahasa Indonesia: kurikulum terstruktur (6 modul, 34 bab), ensiklopedia 8 algoritma, playground simulasi visual interaktif, Python code runner, kuis dengan sistem XP, dashboard IoT studi kasus, dan AI Assistant. Sukses berarti pengguna pemula memahami konsep ML dan bisa langsung mencoba/mempraktikkannya di browser.

## Positioning

Satu-satunya platform belajar ML berbahasa Indonesia yang menggabungkan kurikulum akademik terstruktur dengan simulasi visual dan eksekusi kode interaktif tanpa instalasi — dari nol hingga siap riset.

## Operating Context

Dipakai di browser (web). Pengguna mengakses modul belajar, playground simulasi, code runner Python, kuis, dan dashboard IoT dari perangkat apa pun tanpa instalasi. Akun (email + password, bcrypt/JWT) untuk menyimpan progres dan XP. AI Assistant membantu menjelaskan konsep saat belajar.

## Capabilities and Constraints

- 6 modul utama, 34 bab terstruktur; kuis cepat per bab dengan klaim XP
- 8 algoritma: Linear Regression, Decision Tree, Random Forest, SVM, KNN, Gradient Boosting, Neural Network, K-Means
- Playground: simulator visual (Linear Regression, Decision Tree, Random Forest, Neural Network, K-Means) + Python code runner dengan grafik real-time (Recharts)
- Dashboard IoT studi kasus kopi arabika (prediksi Random Forest) — simulasi
- Glossary, command palette (Ctrl+K)
- Stack: Next.js 14.2, React 18.3, TypeScript 5.4, Tailwind CSS 3.4, MongoDB Atlas (Mongoose), Google Gemini (AI assistant), framer-motion, lucide-react, recharts, katex
- Auth via `/api/auth` (JWT + bcrypt), rate limiting
- Deployment: Vercel (neura.rakasyau.my.id), vercel.json ada

## Brand Commitments

- Nama: "Neura"; bahasa antarmuka: Bahasa Indonesia (seluruh UI)
- Domain: neura.rakasyau.my.id
- Tema gelap yang ada saat ini dipertahankan sebagai aset identitas (keputusan arah visual baru diurus di new-work, bukan di sini)

## Evidence on Hand

- README.md: daftar fitur, badge stack, tautan live site
- src/app, src/components: implementasi semua halaman (landing, belajar, algoritma, kuis, playground, dashboard, masuk/daftar, glossary, studi-kasus)
- Tidak ada testimoni, angka pengguna, atau klaim komersial lain yang boleh dibuat-buat

## Product Principles

- Interaktivitas visual adalah mekanisme uniknya: setiap konsep ML punya simulasi atau visualisasi, bukan sekadar bacaan
- Aksesibilitas bahasa: seluruh materi dalam Bahasa Indonesia untuk pemula lokal
- Tanpa instalasi: semua praktik berjalan langsung di browser
- Kurikulum akademik: urutan belajar dari fundamental ke siap riset, dengan evaluasi (kuis + XP) di tiap bab

## Accessibility & Inclusion

Belum ada standar aksesibilitas spesifik yang dikonfirmasi pengguna; kontras dan aksesibilitas umum dibawa ke standar WCAG AA pada implementasi.