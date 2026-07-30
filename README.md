# 🧠 Neura — Platform Edukasi & Playground Machine Learning Interaktif

[![Website](https://img.shields.io/badge/Website-neura.rakasyau.my.id-00F2FE?style=for-the-badge)](https://neura.rakasyau.my.id)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Mongoose-47A248?style=for-the-badge&logo=mongodb)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Assistant-8E75B5?style=for-the-badge&logo=google)

**Neura** adalah platform pembelajaran Machine Learning (ML) berbasis web yang dirancang untuk memberikan pengalaman belajar intuitif, visual, dan interaktif. Neura menggabungkan modul kurikulum terstruktur, simulator visual algoritma interaktif, lingkungan eksekusi kode Python simulated, dashboard IoT studi kasus, serta **Neura AI Assistant** untuk membantu memahami konsep-konsep AI secara mendalam.

🌐 **Website Resmi / Live Demo**: [https://neura.rakasyau.my.id](https://neura.rakasyau.my.id)

---

## ✨ Fitur Utama

### 1. 📚 Learning Hub (Kurikulum Pembelajaran)
- **6 Modul Utama (34 Bab Terstruktur)**:
  - **Modul 01**: Fundamental Machine Learning
  - **Modul 02**: Tiga Jenis Utama ML (Supervised, Unsupervised, Reinforcement)
  - **Modul 03**: Deep Dive Supervised Learning & Evaluasi Data
  - **Modul 04**: Ensiklopedia 8 Algoritma Populer
  - **Modul 05**: Evaluasi Model & Metrik Performa
  - **Modul 06**: Studi Kasus IoT & Industri Real-World
- **Quiz Cepat & Evaluasi Pemahaman**: Latihan kuis interaktif di setiap bab untuk klaim XP.

### 2. 🎛️ Interactive ML Playground (Simulasi Visual & Code Runner)
Mode ganda untuk mengeksplorasi algoritma:
- **Simulator Visual Interaktif**:
  - **Linear Regression**: Eksperimen slope, bias, MSE, dan $R^2$ Score.
  - **Decision Tree**: Visualisasi percabangan Gini Impurity & threshold suhu/cuaca.
  - **Random Forest**: Simulasi Ensemble Multi-Tree Voting, feature bootstrapping, dan agregasi konsensus.
  - **Neural Network**: Eksperimen arsitektur layer, jumlah neuron, dan fungsi aktivasi (ReLU, Sigmoid, Tanh).
  - **K-Means Clustering**: Visualisasi pergerakan centroid dan hitungan iterasi pengelompokan.
- **Python Code Runner**: Editor kode interaktif dengan output terminal serta grafik visualisasi real-time (`Recharts`).

### 3. 🌿 Dashboard IoT Real-Time (Studi Kasus Kopi Arabika)
- Simulasi sistem pemantauan perkebunan berbasis **Random Forest Predictor**.
- Sensor interaktif: Kelembaban Tanah, Suhu Lahan, pH Tanah, dan Kadar NPK.
- Rekomendasi otomatis tindakan agronomi secara real-time.

### 4. 🤖 Neura AI Assistant
- Asisten kecerdasan buatan berbasis **Google Gemini API** yang siap menjawab pertanyaan seputar teori ML dan contoh kode Python.
- **Custom Markdown & Code Box**: Kode program ditampilkan dalam kontainer khusus bertema gelap lengkap dengan tombol *Salin Kode*.

### 5. 🏆 Dashboard Pengguna & Sertifikat Kelulusan
- Pelacakan akumulasi XP, lencana keahlian (*badges*), dan progress kurikulum.
- **Sertifikat Kelulusan Terkunci**: Sertifikat kelulusan resmi hanya dapat diunduh (cetak/PDF) setelah pengguna menyelesaikan **100% bab (34/34 bab)**.

---

## 🚀 Teknologi yang Digunakan

- **Core Framework**: [Next.js 14](https://nextjs.org/) (App Router & Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: Vanilla CSS + [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (Glassmorphism design), [Lucide React](https://lucide.dev/)
- **Database & Auth**: [MongoDB Atlas](https://www.mongodb.com/atlas), [Mongoose](https://mongoosejs.com/), JWT (HTTP-Only Cookies), [Google OAuth 2.0](https://developers.google.com/identity)
- **Charts & Graphs**: [Recharts](https://recharts.org/)
- **AI Integration**: [Google Generative AI (Gemini API)](https://ai.google.dev/)
- **Live Website**: [neura.rakasyau.my.id](https://neura.rakasyau.my.id)

---

## 📁 Struktur Direktori Utama

```
Neura/
├── src/
│   ├── app/                    # Routing Next.js App Router (Pages & API Routes)
│   │   ├── algoritma/          # Halaman Ensiklopedia Algoritma
│   │   ├── api/                # API Endpoints (Auth, AI Chat, User Sync)
│   │   ├── belajar/            # Learning Hub Modul & Bab
│   │   ├── dashboard/          # Dashboard Pengguna & Sertifikat
│   │   ├── kuis/               # Halaman Quiz Evaluasi
│   │   ├── playground/         # Interactive ML Playground
│   │   └── studi-kasus/        # Dashboard IoT & Studi Kasus
│   ├── components/
│   │   ├── auth/               # Components AuthGuard & Form
│   │   ├── features/           # Components Simulators, Code Runner, & AI Chat
│   │   │   └── simulators/     # Simulator Visual (Regression, Trees, Forest, Neural Net, KMeans)
│   │   ├── layout/             # Navbar, Footer, CommandPalette
│   │   └── ui/                 # GlassCard, Button, Toast
│   ├── lib/                    # Utilities, MongoDB Connector, Auth, & Curriculum Data
│   ├── models/                 # Mongoose User Model Schema
│   └── types/                  # TypeScript Types & Interfaces
├── public/                     # Asset Statis (Gambar, Icon)
├── .env.example                # Template Environment Variables
├── .gitignore                  # Proteksi File Rahasia dari Git
├── package.json
├── vercel.json                 # Konfigurasi Vercel Serverless Deployment
└── README.md
```

---

## 🛡️ Keamanan

- **Proteksi Kredensial**: File `.env.local` dilindungi oleh `.gitignore` sehingga tidak pernah ter-upload ke repository publik.
- **Enkripsi Password**: Pengguna dilindungi dengan enkripsi `bcryptjs` (salt round 10).
- **HTTP-Only Cookies**: JWT disimpan dalam cookie `httpOnly` dengan flag `sameSite: strict`.

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi dan pembelajaran Machine Learning. Bebas digunakan dan dikembangkan kembali.
