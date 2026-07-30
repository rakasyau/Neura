# PRODUCT REQUIREMENTS DOCUMENT

# NEURA
### Platform Belajar Machine Learning Interaktif
*Dari Fundamental, Ragam Algoritma, Kode, hingga Simulasi Interaktif — Tanpa Instalasi*

**Versi:** 1.0
**Tanggal:** 29 Juli 2026
**Status:** Draft untuk Review
**Referensi materi:** Modul Pembelajaran Machine Learning (internal)
**Referensi desain:** Konsep UI premium bergaya glassmorphism (lampiran)

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Latar Belakang & Tujuan Produk](#2-latar-belakang--tujuan-produk)
3. [Target Pengguna & Persona](#3-target-pengguna--persona)
4. [Ruang Lingkup Konten Pembelajaran](#4-ruang-lingkup-konten-pembelajaran)
5. [Fitur Produk (Functional Requirements)](#5-fitur-produk-functional-requirements)
6. [Arsitektur Informasi (Sitemap)](#6-arsitektur-informasi-sitemap)
7. [Desain UI/UX](#7-desain-uiux)
8. [Alur Pengguna Utama (User Flow)](#8-alur-pengguna-utama-user-flow)
9. [Arsitektur Teknis](#9-arsitektur-teknis)
10. [Kebutuhan Non-Fungsional](#10-kebutuhan-non-fungsional)
11. [Metrik Keberhasilan (KPI)](#11-metrik-keberhasilan-kpi)
12. [Roadmap & Milestone](#12-roadmap--milestone)
13. [Risiko & Mitigasi](#13-risiko--mitigasi)
14. [Lampiran](#14-lampiran)

---

## 1. Ringkasan Eksekutif

Belajar Machine Learning (ML) di Indonesia saat ini masih didominasi oleh modul berbasis teks/PDF dan video ceramah satu arah. Konsep-konsep seperti overfitting, hyperplane, atau voting pada Random Forest sulit dibayangkan tanpa visualisasi, dan kebanyakan platform "coba kode" menuntut instalasi Python, library, serta environment yang membingungkan pemula.

**NEURA** adalah platform web pembelajaran ML yang menggabungkan tiga hal dalam satu tempat:

1. Penjelasan konsep terstruktur berbahasa Indonesia yang mengikuti alur modul akademik (dari definisi ML hingga studi kasus IoT pertanian presisi)
2. Ensiklopedia algoritma lengkap dengan contoh kode Python siap pakai
3. Simulasi & playground interaktif yang berjalan langsung di browser (tanpa instalasi apa pun) sehingga pengguna bisa mengubah parameter algoritma dan langsung melihat dampaknya secara visual

Dari sisi desain, NEURA mengadopsi bahasa visual premium bergaya glassmorphism — floating pill navigation, kartu kaca translusen dengan efek blur, tipografi editorial yang tegas, dan komposisi konten yang "bernapas" — terinspirasi dari referensi desain e-commerce premium yang dilampirkan, namun diterjemahkan ulang ke nuansa dunia data & komputasi (bukan fesyen).

> **Target:** MVP dapat dirilis dalam 12 minggu, mencakup 8 modul pembelajaran, 8 halaman algoritma interaktif, playground kode berbasis Pyodide, sistem kuis, dan dashboard progres pengguna.

---

## 2. Latar Belakang & Tujuan Produk

### 2.1 Latar Belakang

Dokumen ini disusun berdasarkan struktur modul ajar Machine Learning yang telah ada (8 bab, dari "Apa Itu Machine Learning" hingga "Studi Kasus Sistem Monitoring Tanah IoT"). Materi tersebut sudah kuat secara konten, namun formatnya statis (dokumen Word) sehingga sulit diakses secara interaktif, tidak ada mekanisme latihan langsung, dan tidak ada cara bagi pengguna untuk "merasakan" bagaimana sebuah algoritma bekerja pada data nyata.

### 2.2 Tujuan Produk

- **Aksesibilitas** — Menyediakan materi ML terstruktur berbahasa Indonesia yang bisa diakses siapa pun tanpa prasyarat instalasi software.
- **Pemahaman melalui visual** — Mengubah konsep abstrak (decision boundary, voting, gradient descent, clustering) menjadi simulasi visual yang bisa dimanipulasi langsung.
- **Praktik nyata** — Memberi contoh kode Python (scikit-learn) yang bisa langsung dijalankan dan dimodifikasi di dalam browser.
- **Konteks aplikatif** — Menonjolkan studi kasus nyata (IoT pertanian presisi) sebagai jembatan antara teori dan penerapan industri/riset.
- **Pengalaman premium** — Memberikan pengalaman visual dan interaksi setara produk digital kelas atas, agar belajar ML terasa modern dan tidak membosankan.

### 2.3 Tujuan Pembelajaran (Learning Outcomes)

- Memahami perbedaan supervised, unsupervised, dan reinforcement learning beserta contoh penerapannya.
- Mampu menjelaskan cara kerja, kelebihan, dan kekurangan 8 algoritma ML utama.
- Mampu membaca dan memodifikasi kode Python sederhana untuk melatih model ML.
- Mampu mengevaluasi model menggunakan metrik yang tepat (akurasi, precision/recall, RMSE, cross-validation).
- Mampu menghubungkan konsep ML dengan studi kasus nyata seperti sistem IoT pertanian presisi.

---

## 3. Target Pengguna & Persona

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Mahasiswa/Pelajar** | Mahasiswa teknik/informatika/agroteknologi yang mengambil mata kuliah terkait ML, IoT, atau data science. | Materi terstruktur sesuai silabus, contoh kode untuk tugas, ringkasan sebelum ujian. |
| **Self-taught Developer** | Pengembang software yang ingin pindah fokus ke data science/ML secara mandiri. | Jalur belajar jelas dari nol, playground langsung praktik, portofolio mini project. |
| **Dosen / Asisten Praktikum** | Pengajar yang ingin memakai platform sebagai bahan ajar tambahan/tugas praktikum. | Konten yang bisa dirujuk per bab, kuis siap pakai, ekspor progres mahasiswa. |
| **Praktisi IoT / Embedded** | Engineer yang membangun sistem IoT (pertanian, industri) dan ingin menambahkan lapisan ML. | Studi kasus relevan, contoh integrasi data sensor ke model ML, panduan pemilihan algoritma. |

---

## 4. Ruang Lingkup Konten Pembelajaran

Struktur konten mengikuti dan memperluas modul sumber, dipetakan menjadi 6 modul utama di platform:

| Modul Platform | Isi (berbasis modul sumber) |
|---|---|
| **M1 — Fundamental ML** | Definisi ML, pemrograman tradisional vs ML, alasan ML relevan saat ini, istilah dasar. |
| **M2 — Tiga Jenis ML** | Supervised, Unsupervised, Reinforcement Learning beserta contoh penerapan pada tiap jenis. |
| **M3 — Konsep Dasar Supervised Learning** | Klasifikasi vs regresi, anatomi dataset, training/testing split, overfitting & underfitting, feature importance. |
| **M4 — Ensiklopedia Algoritma** | 8 algoritma: Linear/Logistic Regression, Decision Tree, Random Forest, SVM, KNN, Gradient Boosting (XGBoost/LightGBM/CatBoost), Neural Network, K-Means Clustering. |
| **M5 — Evaluasi Model** | Metrik klasifikasi (akurasi, precision, recall, F1), metrik regresi (RMSE, MAE), cross-validation. |
| **M6 — Studi Kasus Terapan** | Studi kasus utama: sistem monitoring tanah IoT untuk budidaya kopi presisi (alur sistem, alasan pemilihan Random Forest, tahapan praktis membangun model); studi kasus tambahan pada roadmap fase 2. |

> Panduan pemilihan algoritma dari modul sumber (Bab 5) diadaptasi menjadi fitur "Algorithm Advisor" interaktif — lihat 5.B.

---

## 5. Fitur Produk (Functional Requirements)

Fitur dikelompokkan menjadi 9 kelompok utama.

### 5.A Learning Path & Modul Pembelajaran

- Struktur konten berjenjang: Modul → Bab → Sub-bab, dengan progress bar per level.
- Mode baca fokus (distraction-free) yang menyembunyikan navigasi saat membaca panjang.
- Highlight teks dan catatan pribadi (sticky notes) yang tersimpan per akun.
- Estimasi waktu baca per sub-bab dan indikator "lanjutkan dari terakhir dibaca".
- Glossary istilah dengan tooltip inline — hover pada istilah teknis (mis. "hyperplane", "feature importance") langsung menampilkan definisi singkat tanpa berpindah halaman.
- Rendering formula matematis (KaTeX/MathJax) untuk persamaan seperti Linear Regression dan fungsi sigmoid.

### 5.B Ensiklopedia Algoritma Interaktif

Fitur inti platform. Setiap dari 8 algoritma memiliki halaman detail dengan struktur konsisten:

1. **Ringkasan & Cara Kerja** — penjelasan naratif + analogi (mengikuti gaya modul sumber, mis. analogi "bertanya ke 100 pakar" untuk Random Forest).
2. **Formula/Diagram** — persamaan matematis atau diagram pohon keputusan yang dirender otomatis.
3. **Tab Kode** — contoh implementasi Python (scikit-learn) dengan syntax highlighting dan tombol "salin kode".
4. **Tab Coba Sendiri (Playground)** — sandbox kode berjalan di browser (lihat 5.C), pengguna bisa mengubah parameter atau dataset.
5. **Kelebihan & Kekurangan** — ringkasan dalam bentuk dua kolom berdampingan.
6. **Contoh Penerapan** — termasuk keterkaitannya dengan studi kasus IoT pertanian bila relevan.
7. **Kompleksitas & Kebutuhan Data** — estimasi Big-O dan rekomendasi ukuran dataset minimum.

- **Algorithm Advisor** — alat tanya-jawab singkat ("jenis data Anda?", "butuh interpretasi mudah?", "seberapa besar datanya?") yang merekomendasikan algoritma paling sesuai, mengikuti panduan pemilihan algoritma pada modul sumber.
- **Perbandingan algoritma side-by-side** — memilih 2–3 algoritma untuk dibandingkan cara kerja, kelebihan/kekurangan, dan visual decision boundary-nya pada dataset yang sama.

### 5.C Simulasi & Playground Interaktif (berjalan di browser)

- Playground kode Python in-browser menggunakan WebAssembly (Pyodide) — tanpa perlu instalasi, hasil (grafik, akurasi, tabel) langsung tampil di panel sebelah kode.
- Dataset bawaan untuk eksperimen: dataset sintetis sensor IoT pertanian (kelembaban, suhu, pH, curah hujan) sesuai studi kasus modul, ditambah dataset umum (Iris, Titanic, harga rumah) untuk latihan tambahan.
- Upload dataset CSV milik sendiri (diproses sepenuhnya di sisi klien demi privasi data).

**Simulasi khusus per algoritma:**

- **Linear/Logistic Regression** — slider koefisien, visual garis/kurva sigmoid menyesuaikan real-time terhadap sebaran data.
- **Decision Tree** — visualisasi pohon yang tumbuh bertahap (step-by-step split) beserta highlight aturan yang dipilih pada tiap simpul.
- **Random Forest** — visual "voting" dari banyak pohon kecil yang menyatu menjadi satu keputusan akhir, slider jumlah pohon.
- **SVM** — visual hyperplane 2D dengan margin, slider parameter kernel untuk menunjukkan "kernel trick".
- **KNN** — visual titik data baru dengan lingkaran K-tetangga terdekat yang membesar/mengecil sesuai slider nilai K.
- **Gradient Boosting** — animasi pohon dibangun berurutan, menunjukkan residual/error yang mengecil di tiap iterasi.
- **Neural Network** — visual jaringan neuron dengan bobot yang menyala mengikuti forward pass sederhana.
- **K-Means** — animasi iteratif pergerakan titik pusat cluster hingga konvergen, slider jumlah cluster (K).
- **Playground Evaluasi Model** — confusion matrix interaktif, kurva ROC, serta demo visual overfitting vs underfitting (kurva training/validation loss yang bisa diubah kompleksitas modelnya).

### 5.D Studi Kasus Terapan

- Studi kasus utama **"Monitoring Tanah IoT untuk Budidaya Kopi Presisi"**: alur sistem end-to-end (sensor → cloud → model → rekomendasi → aplikasi mobile), alasan pemilihan Random Forest, dan tahapan praktis membangun model — direplikasi langsung dari modul sumber dalam format interaktif dengan dashboard mini bergaya IoT.
- Studi kasus tambahan (roadmap fase 2): deteksi email spam, prediksi harga rumah, klasifikasi penyakit tanaman dari citra daun.
- Setiap studi kasus dilengkapi notebook interaktif yang bisa dijalankan langsung serta ringkasan video singkat (opsional, fase 2).

### 5.E Evaluasi & Sertifikasi

- Kuis pilihan ganda di akhir setiap sub-bab, dengan pembahasan jawaban.
- Mini-project berbasis dataset nyata: pengguna melatih model pada playground, sistem melakukan auto-check terhadap skor evaluasi minimum.
- Sertifikat digital (PDF, dapat dibagikan ke LinkedIn) setelah menyelesaikan seluruh modul + mini-project.
- Badge pencapaian ringan (mis. "Master Random Forest", "Penjelajah Unsupervised Learning") — gamifikasi opsional, fase 2.

### 5.F Personalisasi & Akun Pengguna

- Autentikasi via email dan Google Sign-In.
- Dashboard pengguna: progres tiap modul, riwayat kuis, catatan tersimpan, playground yang pernah disimpan/dipublikasikan.
- Onboarding singkat untuk menentukan latar belakang pengguna (pemula/mahasiswa/praktisi) guna menyesuaikan rekomendasi jalur belajar.
- Mode gelap/terang, mengikuti preferensi sistem secara default.

### 5.G Pencarian & Navigasi

- Global search lintas materi, algoritma, glossary, dan potongan kode.
- Command palette (Ctrl/Cmd+K) untuk navigasi cepat ke halaman atau algoritma tertentu.

### 5.H Komunitas & AI Tutor (Fase Lanjutan)

- Forum diskusi per bab/algoritma untuk tanya-jawab antar pengguna.
- AI Tutor kontekstual — asisten tanya-jawab yang memahami halaman/algoritma yang sedang dibuka pengguna, membantu menjelaskan ulang konsep dengan analogi berbeda bila pengguna masih bingung.

### 5.I Admin & CMS

- Panel admin untuk menambah/mengedit modul, halaman algoritma, dataset bawaan, dan bank soal kuis tanpa perlu deploy ulang kode.
- Analitik konten: halaman terpopuler, tingkat penyelesaian kuis, funnel drop-off per modul, algoritma yang paling banyak disimulasikan.

### Ringkasan Prioritas Fitur per Fase

| Fase | Cakupan Fitur |
|---|---|
| **MVP (Fase 1)** | M1–M6 konten lengkap, 8 halaman algoritma + tab kode, playground Pyodide dasar, simulasi visual untuk seluruh 8 algoritma, kuis per sub-bab, dashboard progres, auth, dark/light mode, global search. |
| **Fase 2** | Algorithm Advisor, perbandingan algoritma, upload CSV sendiri, mini-project + auto-check, sertifikat digital, studi kasus tambahan, badge pencapaian. |
| **Fase 3** | Forum diskusi, AI Tutor kontekstual, command palette, panel admin/CMS penuh, analitik konten lanjutan, leaderboard. |

---

## 6. Arsitektur Informasi (Sitemap)

```
Beranda (Landing Page)
  └ Hero: pengantar platform + CTA "Mulai Belajar"
  └ Jalur belajar unggulan & algoritma populer
  └ Studi kasus sorotan (IoT pertanian)

/belajar (Learning Hub)
  └ /belajar/m1-fundamental ... /belajar/m6-studi-kasus
     (6 modul, tiap modul berisi beberapa sub-bab)

/algoritma (Ensiklopedia)
  └ /algoritma/linear-regression
  └ /algoritma/decision-tree
  └ /algoritma/random-forest
  └ /algoritma/svm
  └ /algoritma/knn
  └ /algoritma/gradient-boosting
  └ /algoritma/neural-network
  └ /algoritma/k-means
  └ /algoritma/bandingkan (perbandingan side-by-side)

/playground (daftar sandbox tersimpan pengguna)
/studi-kasus/monitoring-tanah-iot
/kuis (indeks kuis per modul)
/glossary (daftar istilah A–Z)
/dashboard (khusus pengguna login: progres, sertifikat, catatan)
/masuk, /daftar (autentikasi)
/admin (khusus admin: CMS modul, dataset, bank soal, analitik)
```

---

## 7. Desain UI/UX

### 7.1 Filosofi Desain

Referensi visual yang diberikan (konsep UI e-commerce fesyen bergaya "O2") memiliki karakter kuat: floating pill navigation yang mengambang di atas latar suasana (bukan bar solid biasa), kartu-kartu kaca (glassmorphism) dengan efek blur di atas foto atmosferik, tipografi editorial yang tegas dengan angka besar sebagai penanda urutan, serta komposisi kartu besar-kecil yang membentuk hierarki visual jelas tanpa terasa penuh.

NEURA menerjemahkan ulang bahasa visual ini — bukan meniru temanya (fesyen/gurun), melainkan mengganti "suasana" menjadi dunia data & komputasi: latar gradien atmosferik terinspirasi cahaya fajar di atas jaringan simpul (node graph) yang merepresentasikan neural network, dengan kartu kaca yang sama menampilkan konten pembelajaran, kode, dan simulasi alih-alih produk fesyen.

### 7.2 Design Tokens

**Palet Warna**

| Token | Hex | Penggunaan |
|---|---|---|
| Background Deep | `#0B0F1F` | Dasar latar gradien (paling gelap, di tepi atas). |
| Background Aurora | `#2D2470 → #4C3575` | Gradien tengah, nuansa senja/violet — pengganti langit gurun pada referensi. |
| Accent Cyan (Data) | `#5EEAD4` | Aksen interaktif utama: tombol, slider aktif, grafik, link. |
| Accent Amber (Insight) | `#F5A265` | Aksen sekunder untuk highlight/label "Baru", echo warna senja referensi. |
| Glass Surface | `rgba(255,255,255,0.08)` | Latar kartu kaca dengan backdrop-blur 20px. |
| Glass Border | `rgba(255,255,255,0.16)` | Garis tepi tipis kartu kaca. |
| Teks Utama | `#F5F3EE` | Teks di atas latar gelap. |
| Teks Muted | `#9CA3C4` | Label, caption, teks sekunder. |

**Tipografi**

- **Display/Heading:** Space Grotesk — geometris, tegas, dipakai untuk judul besar dan angka penanda urutan (mis. "01", "02" pada nomor bab).
- **Body:** Inter — netral dan sangat terbaca untuk paragraf panjang penjelasan konsep.
- **Monospace:** JetBrains Mono — khusus blok kode dan output playground, agar kode Python mudah dibedakan dari teks penjelasan.

**Bentuk & Elevasi**

- Radius kartu besar: 32px (kartu hero, kartu modul utama).
- Radius kartu kecil/tombol: 16–20px.
- Efek kaca: backdrop-filter blur 16–24px + border tipis translusen, tanpa bayangan tajam — mengikuti kesan "mengambang" pada referensi.

### 7.3 Komponen Kunci

- **Floating Pill Navigation** — Navigasi utama mengambang di bagian atas layar (bukan menempel penuh), berisi logo "N", menu (Belajar, Algoritma, Studi Kasus, Playground), ikon pencarian, dan avatar/tombol masuk — persis pola pill nav pada referensi.
- **Hero Glass Panel** — Kartu kaca besar di halaman algoritma menampilkan angka urutan besar (mis. "04" untuk bab algoritma), nama algoritma, ringkasan singkat, dan detail teknis singkat (jenis tugas, kompleksitas) — mengadaptasi posisi info produk pada referensi (bahan, ukuran) menjadi info teknis algoritma.
- **Kartu Visual Ganda** — Pola kartu kecil + kartu besar berdampingan seperti referensi: kartu kecil menampilkan ikon/ilustrasi algoritma, kartu besar menampilkan simulasi interaktif langsung (grafik, slider, hasil real-time).
- **Floating Banner Bawah** — Pita informasi mengambang di bagian bawah untuk highlight konten baru, mis. "Baru · Playground Random Forest", meniru posisi & gaya banner "NEW · Cosmic Set" pada referensi.
- **Blok Kode & Panel Output** — Dua panel berdampingan: kiri kode Python dengan syntax highlighting, kanan hasil (grafik/tabel/metrik) yang update saat kode dijalankan atau slider digeser.
- **Progress Ring** — Cincin progres melingkar bergaya minimal pada dashboard, menunjukkan persentase penyelesaian tiap modul.

### 7.4 Deskripsi Layar Utama

**Beranda** — Latar gradien aurora penuh dengan pola node-graph tipis sebagai tekstur ambient. Pill nav mengambang di atas. Hero glass panel menampilkan judul "Belajar Machine Learning, secara Visual" dengan CTA utama. Di bawahnya, grid kartu kaca menampilkan 6 modul pembelajaran dan algoritma populer, ditutup floating banner studi kasus IoT pertanian.

**Halaman Detail Algoritma** — Struktur mengikuti pola referensi paling ketat: hero glass panel dengan angka urutan algoritma di kiri dan detail teknis di kanan; di bawahnya kartu kecil (ilustrasi/diagram algoritma) berdampingan dengan kartu besar berisi simulasi interaktif (slider parameter, grafik real-time); tab untuk beralih antara Penjelasan / Kode / Coba Sendiri; floating banner bawah mengarahkan ke studi kasus terkait.

**Playground / Coba Sendiri** — Tampilan split-panel: editor kode (kaca gelap dengan syntax highlighting) di kiri, panel hasil (grafik/metrik) di kanan yang diperbarui secara live. Slider parameter mengambang di atas panel hasil dengan gaya pill yang sama seperti navigasi.

**Dashboard Pengguna** — Kartu kaca menampilkan progress ring per modul, riwayat kuis, dan catatan tersimpan, disusun dalam grid responsif dengan hierarki ukuran kartu yang sama seperti pada referensi (satu kartu besar menonjol, beberapa kartu kecil pendukung).

### 7.5 Interaksi & Motion

- Scroll reveal halus pada kartu-kartu saat pengguna scroll ke bawah beranda.
- Efek "shimmer" tipis pada kartu kaca saat hover, menegaskan sifat interaktif tanpa berlebihan.
- Transisi antar tab (Penjelasan/Kode/Coba Sendiri) menggunakan cross-fade singkat, bukan reload halaman.
- Prefers-reduced-motion dihormati — seluruh animasi non-esensial dinonaktifkan otomatis bila pengguna mengaktifkan pengaturan tersebut di sistem.


---

## 8. Alur Pengguna Utama (User Flow)

**Flow 1 — Onboarding & Memulai Belajar**
Beranda → Daftar/Masuk → Onboarding singkat (pilih latar belakang: mahasiswa/self-taught/praktisi) → Rekomendasi jalur belajar → Modul 1 (Fundamental ML).

**Flow 2 — Mempelajari & Mencoba Algoritma**
Ensiklopedia Algoritma → pilih algoritma (mis. Random Forest) → baca Cara Kerja → buka tab Kode → salin/pahami contoh → buka tab Coba Sendiri → ubah slider jumlah pohon → lihat perubahan akurasi & visual voting secara real-time → tandai sebagai selesai.

**Flow 3 — Kuis & Sertifikasi**
Selesai membaca sub-bab → kuis muncul otomatis → jawab & lihat pembahasan → setelah seluruh modul + mini-project selesai → sertifikat digital dapat diunduh/dibagikan dari Dashboard.

---

## 9. Arsitektur Teknis

| Layer | Teknologi | Alasan Pemilihan |
|---|---|---|
| Frontend Framework | Next.js (App Router) + TypeScript + Tailwind CSS | Rendering cepat, SEO-friendly untuk konten pembelajaran, ekosistem matang. |
| Animasi & Scroll | Framer Motion / GSAP + Lenis (smooth scroll) | Mendukung scroll reveal dan transisi halus sesuai desain glassmorphism. |
| Eksekusi Kode di Browser | Pyodide (Python via WebAssembly) | Menjalankan scikit-learn/numpy langsung di browser tanpa server, aman & tanpa instalasi bagi pengguna. |
| Visualisasi Data | D3.js, Plotly, Recharts | Grafik interaktif untuk simulasi algoritma (decision boundary, kurva loss, dsb.). |
| Rendering Formula | KaTeX | Menampilkan persamaan matematis (Linear/Logistic Regression, dsb.) secara cepat & ringan. |
| Backend & Auth | Supabase (Postgres, Auth, Storage) | Mempercepat pengembangan MVP: auth siap pakai, database progres pengguna, penyimpanan dataset kecil. |
| Pengelolaan Konten | MDX-based content pipeline / headless CMS | Materi & soal kuis dapat dikelola tanpa deploy ulang aplikasi. |
| Pencarian | Meilisearch / Algolia | Pencarian cepat lintas materi, algoritma, dan glossary. |
| Hosting | Vercel | Deployment otomatis, cocok dengan Next.js, edge caching untuk performa global. |
| AI Tutor (fase lanjutan) | API model bahasa (mis. Claude) dengan konteks halaman aktif | Menjawab pertanyaan kontekstual pengguna terkait algoritma yang sedang dipelajari. |

---

## 10. Kebutuhan Non-Fungsional

- **Performa** — Skor Lighthouse > 90; Pyodide dan library berat dimuat secara asinkron/lazy agar waktu muat halaman awal tetap di bawah 3 detik.
- **Aksesibilitas** — Kontras warna memenuhi WCAG AA meski menggunakan tema gelap; navigasi penuh via keyboard; teks alternatif pada seluruh elemen visual/diagram; menghormati prefers-reduced-motion.
- **Skalabilitas Konten** — Struktur modul/algoritma/studi kasus bersifat modular sehingga penambahan algoritma atau studi kasus baru tidak memerlukan perubahan arsitektur.
- **Keamanan & Privasi** — Eksekusi kode pengguna berjalan sepenuhnya di sisi klien (sandbox browser) sehingga tidak ada risiko eksekusi kode di server; dataset yang diunggah pengguna tidak dikirim ke server kecuali disimpan secara eksplisit.
- **Responsivitas** — Desain mobile-first; seluruh komponen glass card dan simulasi dapat menyesuaikan ke layar kecil tanpa kehilangan fungsi inti.
- **Bahasa** — Bahasa Indonesia sebagai bahasa utama konten, dengan struktur konten yang siap diterjemahkan (i18n-ready) untuk versi Bahasa Inggris di masa depan.

---

## 11. Metrik Keberhasilan (KPI)

| Metrik | Target Indikatif (3 bulan pasca-rilis) |
|---|---|
| Tingkat penyelesaian modul (completion rate) | ≥ 40% pengguna terdaftar menyelesaikan minimal 1 modul penuh. |
| Rata-rata waktu di Playground per sesi | ≥ 6 menit per sesi aktif. |
| Jumlah kuis diselesaikan per pengguna aktif | ≥ 3 kuis per bulan. |
| Retensi mingguan (week-over-week retention) | ≥ 25%. |
| Net Promoter Score (NPS) | ≥ 40. |
| Tingkat penyelesaian sertifikasi | ≥ 10% dari pengguna yang menyelesaikan seluruh modul. |

---

## 12. Roadmap & Milestone

| Fase | Durasi | Milestone Utama |
|---|---|---|
| **Fase 1 — MVP** | Minggu 1–12 | Desain sistem & konten M1–M6 final; 8 halaman algoritma + kode; playground Pyodide dasar; 8 simulasi visual; kuis; dashboard; auth; rilis publik terbatas (beta). |
| **Fase 2 — Pendalaman** | Minggu 13–20 | Algorithm Advisor; perbandingan algoritma; upload dataset sendiri; mini-project + auto-check; sertifikat digital; studi kasus tambahan. |
| **Fase 3 — Komunitas & AI** | Minggu 21–30 | Forum diskusi; AI Tutor kontekstual; command palette; panel admin/CMS penuh; analitik lanjutan; badge & leaderboard. |

---

## 13. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Waktu muat Pyodide/WASM terasa lambat di koneksi lambat. | Lazy-load hanya saat tab "Coba Sendiri" dibuka; tampilkan skeleton/progress loading yang informatif; cache library di sisi klien. |
| Konten simulasi kompleks (Neural Network, Gradient Boosting) sulit divisualisasikan tanpa terasa berlebihan. | Sederhanakan visual pada tahap awal (mis. jaringan kecil 2–3 layer), tambah kompleksitas bertahap di fase lanjutan. |
| Beban kognitif desain glassmorphism pada perangkat low-end (blur berat). | Deteksi kemampuan perangkat/browser dan turunkan intensitas blur otomatis (graceful degradation). |
| Konten akademik perlu terus diperbarui mengikuti perkembangan algoritma/tools. | Bangun melalui CMS agar tim konten dapat memperbarui tanpa keterlibatan tim engineering. |

---

## 14. Lampiran

- **Sumber konten:** Modul Pembelajaran Machine Learning — 8 bab, dari Fundamental hingga Studi Kasus Sistem Monitoring Tanah IoT (dokumen internal).
- **Referensi visual:** konsep UI premium bergaya glassmorphism/e-commerce ("O2 concept") sebagai dasar bahasa desain NEURA.