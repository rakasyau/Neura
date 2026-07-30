export interface LessonContent {
  id: string
  title: string
  moduleTitle: string
  summary: string
  contentBlocks: {
    type: "paragraph" | "highlight" | "formula" | "code" | "quick_quiz"
    text?: string
    code?: string
    question?: {
      q: string
      opts: string[]
      correct: number
      exp: string
    }
  }[]
}

export const chapterLessons: Record<string, LessonContent> = {
  // ===== MODUL 1: FUNDAMENTAL ML =====
  "m1-apa-itu-ml": {
    id: "m1-apa-itu-ml",
    title: "Apa Itu Machine Learning?",
    moduleTitle: "Fundamental ML",
    summary: "Memahami konsep dasar bagaimana komputer belajar dari pengalaman (data) untuk membuat keputusan mandiri.",
    contentBlocks: [
      { type: "paragraph", text: "Machine Learning (ML) adalah cabang dari kecerdasan buatan (AI) yang memungkinkan komputer belajar dari data tanpa diprogram secara eksplisit. Alih-alih menulis aturan satu per satu, kita memberikan data dan contoh jawaban yang benar, lalu algoritma ML akan menemukan pola dalam data tersebut secara otomatis." },
      { type: "highlight", text: "💡 Definisi Arthur Samuel (1959): Machine Learning adalah bidang studi yang memberikan komputer kemampuan untuk belajar tanpa diprogram secara eksplisit." },
      { type: "paragraph", text: "Contoh nyata ML ada di sekitar kita: filter spam email (Gmail mempelajari pola email berbahaya), rekomendasi video YouTube (mempelajari preferensi tontonan kita), penerjemah bahasa Google Translate (mempelajari jutaan pasangan kalimat terjemahan), dan asisten suara seperti Siri atau Google Assistant." },
      { type: "code", code: `# Perbedaan Pemrograman Tradisional vs ML

# Tradisional — manusia tulis aturan manual:
def deteksi_spam(email):
    if "hadiah gratis" in email:
        return "SPAM"
    if "klik di sini" in email:
        return "SPAM"
    return "BUKAN SPAM"

# Machine Learning — komputer belajar sendiri:
from sklearn.naive_bayes import MultinomialNB
model = MultinomialNB()
model.fit(X_email, y_label)  # Belajar dari 50.000 email
prediksi = model.predict(email_baru)  # Klasifikasi otomatis` },
      { type: "quick_quiz", question: { q: "Apa perbedaan utama pemrograman tradisional dengan Machine Learning?", opts: ["ML membutuhkan lebih sedikit data dibanding tradisional", "ML menemukan aturan otomatis dari data, sedangkan tradisional aturan ditulis manual", "ML hanya bisa digunakan untuk pengenalan gambar", "Pemrograman tradisional tidak menggunakan komputer"], correct: 1, exp: "Benar! Pada pemrograman tradisional manusia menulis aturan (if-else), sedangkan ML menemukan pola dan aturan secara otomatis dari data historis." } },
    ],
  },
  "m1-kuis": {
    id: "m1-kuis",
    title: "Kuis Fundamental",
    moduleTitle: "Fundamental ML",
    summary: "Uji pemahaman Anda tentang konsep dasar Machine Learning — definisi, perbandingan dengan tradisional, faktor kebangkitan ML, dan istilah dasar.",
    contentBlocks: [
      { type: "quick_quiz", question: { q: "Apa definisi Machine Learning menurut Arthur Samuel (1959)?", opts: ["Komputer yang diprogram dengan aturan if-else yang kompleks", "Bidang studi yang memberikan komputer kemampuan untuk belajar tanpa diprogram secara eksplisit", "Sistem database yang menyimpan data training dalam jumlah besar", "Cabang ilmu yang mempelajari cara membuat chip komputer lebih cepat"], correct: 1, exp: "Benar! Arthur Samuel mendefinisikan ML sebagai bidang studi yang memberikan komputer kemampuan untuk belajar tanpa diprogram secara eksplisit — definisi yang masih relevan hingga hari ini." } },
      { type: "quick_quiz", question: { q: "Apa kelemahan utama pendekatan rule-based (pemrograman tradisional) dalam deteksi penipuan bank?", opts: ["Terlalu cepat dalam memproses transaksi", "Aturan terlalu sederhana dan mudah dilewati penipu", "Membutuhkan GPU untuk berjalan", "Hanya bisa berjalan di cloud"], correct: 1, exp: "Benar! Aturan manual (seperti batas jumlah transaksi) terlalu kaku dan mudah dieksploitasi. ML bisa mendeteksi pola penipuan kompleks yang tidak bisa ditangkap aturan sederhana." } },
      { type: "quick_quiz", question: { q: "Manakah yang BUKAN merupakan faktor pendorong kebangkitan ML modern?", opts: ["Ledakan Big Data dari media sosial dan IoT", "Kekuatan GPU dan Cloud Computing yang terjangkau", "Terobosan algoritma seperti Transformer", "Menurunnya jumlah programmer di dunia"], correct: 3, exp: "Tepat! Tiga pilar utama revolusi ML adalah Big Data, komputasi kuat (GPU/Cloud), dan algoritma baru. Bukan karena jumlah programmer menurun — justru semakin banyak." } },
      { type: "quick_quiz", question: { q: "Dalam dataset pinjaman bank, manakah yang merupakan LABEL (target)?", opts: ["Umur peminjam (25, 35, 45 tahun)", "Pendapatan bulanan (Rp 3jt, Rp 5jt, Rp 8jt)", "Status disetujui/ditolak (1 atau 0)", "Riwayat kredit (baik/buruk)"], correct: 2, exp: "Benar! Label adalah variabel output yang ingin diprediksi. Umur, pendapatan, dan riwayat kredit adalah fitur (input), sedangkan 'disetujui/ditolak' adalah label (target)." } },
      { type: "quick_quiz", question: { q: "Apa perbedaan Dataset Training dan Testing?", opts: ["Training untuk latihan, Testing untuk evaluasi generalisasi ke data baru", "Training lebih kecil dari Testing", "Testing digunakan untuk melatih model, Training untuk evaluasi", "Tidak ada perbedaan, keduanya sama"], correct: 0, exp: "Benar! Training set digunakan untuk melatih model mempelajari pola, sedangkan Testing set (data baru yang belum pernah dilihat) digunakan untuk mengevaluasi seberapa baik model bisa menggeneralisasi." } },
    ],
  },
  "m1-tradisional-vs-ml": {
    id: "m1-tradisional-vs-ml",
    title: "Pemrograman Tradisional vs ML",
    moduleTitle: "Fundamental ML",
    summary: "Perbandingan mendalam antara pendekatan rule-based dan pendekatan data-driven.",
    contentBlocks: [
      { type: "paragraph", text: "Dalam pemrograman tradisional, alur kerja adalah: Manusia menganalisis masalah → Menulis aturan logika (if-else) → Program mengeksekusi aturan tersebut terhadap data input → Menghasilkan output. Pendekatan ini bekerja baik untuk masalah dengan aturan jelas dan terbatas." },
      { type: "paragraph", text: "Dalam Machine Learning, alurnya terbalik: Kita menyediakan data input beserta output yang diharapkan (label) → Algoritma ML menemukan pola dan hubungan dalam data → Menghasilkan model yang bisa memprediksi output untuk data baru. Pendekatan ini unggul saat aturan terlalu kompleks atau berubah-ubah." },
      { type: "highlight", text: "🔑 Kapan menggunakan ML? Gunakan ML saat: (1) Aturan terlalu kompleks untuk ditulis manual, (2) Pola dalam data berubah seiring waktu, (3) Volume data sangat besar, (4) Manusia sulit menjelaskan cara memecahkan masalah tersebut (misalnya mengenali wajah)." },
      { type: "code", code: `# Contoh: Deteksi Penipuan Transaksi Bank
# Tradisional — puluhan aturan yang sering kecolongan:
def cek_penipuan(transaksi):
    if transaksi.jumlah > 10_000_000:
        return "MENCURIGAKAN"
    if transaksi.lokasi != pengguna.lokasi_biasa:
        return "MENCURIGAKAN"
    # ... ratusan aturan lainnya?
    return "AMAN"

# ML — belajar dari jutaan transaksi historis:
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X_transaksi_historis, y_label_penipuan)
# Model menemukan pola tersembunyi yang manusia sulit deteksi` },
      { type: "quick_quiz", question: { q: "Kapan pendekatan ML lebih tepat dibanding pemrograman tradisional?", opts: ["Saat masalah memiliki aturan yang sangat sederhana", "Saat volume data kecil dan aturan bisa ditulis dalam 5 baris kode", "Saat pola dalam data kompleks, berubah-ubah, dan sulit ditulis secara manual", "Saat tidak ada data sama sekali"], correct: 2, exp: "Tepat! ML unggul saat pola terlalu kompleks untuk aturan manual, data berjumlah besar, dan pola bisa berubah seiring waktu." } },
    ],
  },
  "m1-kenapa-ml": {
    id: "m1-kenapa-ml",
    title: "Mengapa ML Relevan Saat Ini?",
    moduleTitle: "Fundamental ML",
    summary: "Tiga faktor utama yang mendorong kebangkitan ML di era modern.",
    contentBlocks: [
      { type: "paragraph", text: "Machine Learning sebenarnya sudah ada sejak 1950-an, namun baru benar-benar meledak dalam 10 tahun terakhir. Tiga faktor utama yang mendorong revolusi ML modern:" },
      { type: "highlight", text: "📊 Faktor 1 — Ledakan Data (Big Data): Setiap hari, dunia menghasilkan 2.5 quintillion bytes data. Media sosial, sensor IoT, transaksi online, dan perangkat mobile menghasilkan data yang menjadi 'bahan bakar' untuk melatih model ML yang semakin akurat." },
      { type: "highlight", text: "⚡ Faktor 2 — Kekuatan Komputasi (GPU & Cloud): GPU modern seperti NVIDIA A100 bisa memproses triliunan operasi per detik. Cloud computing (AWS, GCP, Azure) membuat siapa saja bisa menyewa superkomputer dengan biaya terjangkau." },
      { type: "highlight", text: "🧠 Faktor 3 — Terobosan Algoritma: Arsitektur baru seperti Transformer (2017) merevolusi NLP, dan teknik seperti transfer learning memungkinkan model dilatih dengan data lebih sedikit namun tetap akurat." },
      { type: "paragraph", text: "Dampak ekonomi ML sangat besar. McKinsey memperkirakan AI/ML akan menambah $13 triliun ke ekonomi global pada tahun 2030. Industri yang paling terdampak: kesehatan (diagnosis penyakit), keuangan (deteksi fraud), transportasi (kendaraan otonom), dan pertanian (pertanian presisi)." },
      { type: "quick_quiz", question: { q: "Apa tiga faktor utama yang mendorong kebangkitan ML modern?", opts: ["Komputer murah, internet cepat, programmer banyak", "Big Data, kekuatan GPU/Cloud, terobosan algoritma baru", "Bahasa pemrograman baru, framework baru, IDE baru", "Regulasi pemerintah, subsidi, dan kebijakan publik"], correct: 1, exp: "Benar! Tiga pilar utama revolusi ML modern adalah: ledakan data (Big Data), kekuatan komputasi (GPU/Cloud), dan terobosan algoritma (Transformer, Deep Learning)." } },
    ],
  },
  "m1-istilah-dasar": {
    id: "m1-istilah-dasar",
    title: "Istilah Dasar dalam ML",
    moduleTitle: "Fundamental ML",
    summary: "Kosakata fundamental yang wajib dikuasai sebelum masuk ke materi lanjutan.",
    contentBlocks: [
      { type: "paragraph", text: "Sebelum melangkah lebih jauh, penting untuk memahami istilah-istilah fundamental dalam ML yang akan terus muncul di modul selanjutnya:" },
      { type: "highlight", text: "📦 Dataset: Kumpulan data yang digunakan untuk melatih dan menguji model. Terdiri dari baris (sampel/observasi) dan kolom (fitur/atribut)." },
      { type: "highlight", text: "🎯 Fitur (Feature): Variabel input yang digunakan model untuk membuat prediksi. Contoh: umur, pendapatan, dan riwayat kredit pada dataset pinjaman bank." },
      { type: "highlight", text: "🏷️ Label (Target): Variabel output yang ingin diprediksi oleh model. Contoh: 'disetujui' atau 'ditolak' pada dataset pinjaman bank." },
      { type: "highlight", text: "🏋️ Training: Proses di mana model mempelajari pola dari data. Model melihat fitur dan label secara bersamaan, lalu menyesuaikan parameter internalnya." },
      { type: "highlight", text: "🧪 Testing: Proses mengevaluasi performa model menggunakan data yang belum pernah dilihat model sebelumnya. Ini mengukur seberapa baik model bisa 'menggeneralisasi' ke data baru." },
      { type: "code", code: `# Contoh struktur dataset sederhana
import pandas as pd

# Dataset pinjaman bank
data = {
    'umur': [25, 45, 35, 50, 23],          # Fitur 1
    'pendapatan': [3000, 8000, 5000, 12000, 2500],  # Fitur 2
    'riwayat_kredit': ['baik', 'baik', 'buruk', 'baik', 'buruk'],  # Fitur 3
    'disetujui': [1, 1, 0, 1, 0]           # Label (Target)
}
df = pd.DataFrame(data)
# Fitur (X) = umur, pendapatan, riwayat_kredit
# Label (y) = disetujui (1=ya, 0=tidak)` },
      { type: "quick_quiz", question: { q: "Apa perbedaan antara 'Fitur' dan 'Label' dalam konteks ML?", opts: ["Fitur adalah output model, label adalah input model", "Fitur adalah variabel input untuk prediksi, label adalah variabel output yang ingin diprediksi", "Fitur dan label adalah hal yang sama", "Fitur hanya bisa berupa angka, label hanya bisa berupa teks"], correct: 1, exp: "Benar! Fitur (feature) adalah variabel input yang digunakan model untuk belajar, sedangkan label (target) adalah variabel output yang ingin diprediksi." } },
    ],
  },

  // ===== MODUL 2: TIGA JENIS ML =====
  "m2-supervised": {
    id: "m2-supervised",
    title: "Supervised Learning",
    moduleTitle: "Tiga Jenis ML",
    summary: "Pembelajaran terawasi: model belajar dari data berlabel (pasangan input-output) untuk memprediksi output data baru.",
    contentBlocks: [
      { type: "paragraph", text: "Supervised Learning (Pembelajaran Terawasi) adalah jenis ML di mana model dilatih menggunakan dataset yang sudah memiliki label jawaban benar. Ibarat seorang murid yang belajar dari buku soal beserta kunci jawaban — model melihat pertanyaan (fitur) dan jawaban benar (label) secara bersamaan, lalu belajar menemukan pola yang menghubungkan keduanya." },
      { type: "highlight", text: "🎯 Dua tugas utama Supervised Learning:\n1. Klasifikasi — memprediksi kategori/kelas (contoh: email spam atau bukan, penyakit positif atau negatif)\n2. Regresi — memprediksi nilai kontinu/angka (contoh: harga rumah, suhu besok, penjualan bulan depan)" },
      { type: "code", code: `# Contoh Klasifikasi: Prediksi spesies bunga Iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2
)
model = DecisionTreeClassifier()
model.fit(X_train, y_train)  # Belajar dari data berlabel
akurasi = model.score(X_test, y_test)
print(f"Akurasi: {akurasi:.2%}")  # Output: Akurasi: ~96%` },
      { type: "quick_quiz", question: { q: "Manakah yang termasuk tugas Klasifikasi?", opts: ["Memprediksi harga saham besok (Rp 15.230)", "Memprediksi apakah email masuk spam atau bukan", "Memprediksi suhu udara dalam derajat Celsius", "Memprediksi jumlah penjualan bulan depan"], correct: 1, exp: "Benar! Klasifikasi memprediksi kategori diskret (spam/bukan spam), sedangkan tiga opsi lain adalah regresi karena memprediksi nilai kontinu (harga, suhu, jumlah)." } },
    ],
  },
  "m2-unsupervised": {
    id: "m2-unsupervised",
    title: "Unsupervised Learning",
    moduleTitle: "Tiga Jenis ML",
    summary: "Pembelajaran tanpa pengawasan: model menemukan pola tersembunyi dalam data tanpa label.",
    contentBlocks: [
      { type: "paragraph", text: "Unsupervised Learning (Pembelajaran Tanpa Pengawasan) adalah jenis ML di mana model bekerja dengan data yang TIDAK memiliki label. Model harus menemukan sendiri struktur dan pola tersembunyi dalam data. Ibarat seorang anak yang diminta mengelompokkan mainan tanpa diberi tahu kategorinya — anak tersebut secara alami akan mengelompokkan berdasarkan warna, bentuk, atau ukuran." },
      { type: "highlight", text: "📊 Tiga teknik utama Unsupervised Learning:\n1. Clustering — mengelompokkan data ke dalam kluster berdasarkan kemiripan (contoh: segmentasi pelanggan)\n2. Dimensionality Reduction — mengurangi jumlah fitur sambil mempertahankan informasi penting (contoh: PCA)\n3. Association — menemukan hubungan antar item (contoh: analisis keranjang belanja)" },
      { type: "code", code: `# Contoh Clustering: Segmentasi pelanggan toko online
from sklearn.cluster import KMeans
import numpy as np

# Data pelanggan: [total_belanja, frekuensi_kunjungan]
pelanggan = np.array([
    [500, 2], [600, 3], [550, 2],     # Kelompok hemat
    [5000, 15], [4800, 12], [5200, 18], # Kelompok loyal
    [2000, 6], [2500, 8], [1800, 5],   # Kelompok menengah
])
model = KMeans(n_clusters=3, n_init=10)
model.fit(pelanggan)
print("Cluster:", model.labels_)
# Output: [0, 0, 0, 2, 2, 2, 1, 1, 1]` },
      { type: "quick_quiz", question: { q: "Apa ciri utama yang membedakan Unsupervised Learning dari Supervised Learning?", opts: ["Unsupervised Learning menggunakan lebih banyak data", "Unsupervised Learning tidak memerlukan komputer", "Unsupervised Learning bekerja dengan data tanpa label (tanpa jawaban benar)", "Unsupervised Learning selalu lebih akurat"], correct: 2, exp: "Benar! Perbedaan fundamental: Supervised Learning menggunakan data berlabel (ada jawaban benar), sedangkan Unsupervised Learning bekerja tanpa label dan menemukan pola sendiri." } },
    ],
  },
  "m2-reinforcement": {
    id: "m2-reinforcement",
    title: "Reinforcement Learning",
    moduleTitle: "Tiga Jenis ML",
    summary: "Pembelajaran penguatan: agen belajar melalui interaksi dengan lingkungan dan umpan balik reward/punishment.",
    contentBlocks: [
      { type: "paragraph", text: "Reinforcement Learning (Pembelajaran Penguatan) adalah jenis ML di mana agen (agent) belajar membuat keputusan melalui interaksi langsung dengan lingkungan (environment). Agen melakukan aksi, menerima reward (hadiah) untuk aksi baik dan punishment (hukuman) untuk aksi buruk, lalu menyesuaikan strateginya untuk memaksimalkan total reward jangka panjang." },
      { type: "highlight", text: "🎮 Analogi mudah: Bayangkan melatih anjing. Saat anjing duduk sesuai perintah, Anda memberi camilan (reward). Saat anjing menggigit sandal, Anda berkata 'Tidak!' (punishment). Seiring waktu, anjing belajar perilaku mana yang menghasilkan camilan." },
      { type: "paragraph", text: "Contoh penerapan RL yang terkenal: AlphaGo (DeepMind) yang mengalahkan juara dunia Go, robot yang belajar berjalan, mobil otonom yang belajar mengemudi, dan chatbot yang belajar memberikan jawaban lebih baik." },
      { type: "quick_quiz", question: { q: "Dalam Reinforcement Learning, bagaimana agen belajar membuat keputusan?", opts: ["Dengan mempelajari data berlabel seperti Supervised Learning", "Dengan menemukan cluster dalam data seperti Unsupervised Learning", "Dengan trial-and-error, menerima reward untuk aksi baik dan punishment untuk aksi buruk", "Dengan menyalin persis strategi manusia"], correct: 2, exp: "Benar! RL belajar melalui trial-and-error: agen mencoba berbagai aksi, menerima feedback berupa reward/punishment, lalu menyesuaikan strategi untuk memaksimalkan reward kumulatif." } },
    ],
  },
  "m2-perbandingan": {
    id: "m2-perbandingan",
    title: "Perbandingan & Contoh Penerapan",
    moduleTitle: "Tiga Jenis ML",
    summary: "Tabel perbandingan tiga jenis ML beserta studi kasus penerapan di industri nyata.",
    contentBlocks: [
      { type: "paragraph", text: "Ketiga jenis ML memiliki karakteristik dan kegunaan yang berbeda. Memilih jenis ML yang tepat bergantung pada: (1) apakah data memiliki label, (2) jenis masalah yang ingin dipecahkan, dan (3) ketersediaan lingkungan untuk interaksi." },
      { type: "highlight", text: "📋 Ringkasan Perbandingan:\n• Supervised: Data berlabel ✓ | Memprediksi output | Contoh: spam filter, prediksi harga\n• Unsupervised: Data tanpa label | Menemukan pola | Contoh: segmentasi pelanggan, deteksi anomali\n• Reinforcement: Belajar dari interaksi | Memaksimalkan reward | Contoh: game AI, robotik" },
      { type: "paragraph", text: "Dalam praktik industri, ketiga jenis ML sering digunakan bersamaan. Misalnya Netflix: Supervised Learning untuk prediksi rating film, Unsupervised Learning untuk clustering genre penonton, dan Reinforcement Learning untuk optimasi urutan rekomendasi yang ditampilkan." },
      { type: "quick_quiz", question: { q: "Sebuah perusahaan ingin mengelompokkan pelanggannya berdasarkan perilaku belanja, tanpa kategori yang sudah ditentukan. Jenis ML apa yang paling tepat?", opts: ["Supervised Learning (Klasifikasi)", "Supervised Learning (Regresi)", "Unsupervised Learning (Clustering)", "Reinforcement Learning"], correct: 2, exp: "Benar! Karena tidak ada label kategori yang sudah ditentukan dan tujuannya menemukan kelompok alami dalam data, Unsupervised Learning dengan teknik Clustering adalah pilihan yang paling tepat." } },
    ],
  },

  "m2-kuis": {
    id: "m2-kuis",
    title: "Kuis Tiga Jenis ML",
    moduleTitle: "Tiga Jenis ML",
    summary: "Uji pemahaman Anda tentang Supervised, Unsupervised, dan Reinforcement Learning — perbedaan, ciri khas, dan kapan menggunakan masing-masing.",
    contentBlocks: [
      { type: "quick_quiz", question: { q: "Apa ciri utama Supervised Learning?", opts: ["Model belajar tanpa data sama sekali", "Model dilatih menggunakan data berlabel (input-output diketahui)", "Model menerima reward dan punishment", "Model mengelompokkan data tanpa label"], correct: 1, exp: "Benar! Supervised Learning menggunakan data berlabel — setiap data training memiliki pasangan input dan output (label) yang benar." } },
      { type: "quick_quiz", question: { q: "Contoh nyata Unsupervised Learning dalam bisnis adalah?", opts: ["Prediksi harga saham besok", "Deteksi email spam atau bukan", "Segmentasi pelanggan berdasarkan perilaku belanja", "Mobil otonom belajar mengemudi"], correct: 2, exp: "Benar! Segmentasi pelanggan adalah contoh klasik Unsupervised Learning (Clustering) — kita mengelompokkan pelanggan tanpa label kategori yang sudah ditentukan." } },
      { type: "quick_quiz", question: { q: "Dalam Reinforcement Learning, apa fungsi dari 'reward'?", opts: ["Memberi tahu agen bahwa data sudah siap diproses", "Memberi umpan balik positif agar agen mengulangi perilaku baik", "Menghapus memori agen", "Mempercepat komputasi model"], correct: 1, exp: "Benar! Reward adalah umpan balik positif yang mendorong agen untuk mengulangi aksi yang menghasilkan reward, sehingga agen belajar strategi optimal." } },
      { type: "quick_quiz", question: { q: "Jika data Anda memiliki label kategori pelanggan (loyal, biasa, baru) dan ingin memprediksi kategori pelanggan baru, jenis ML apa yang tepat?", opts: ["Unsupervised Learning — karena kita tidak tahu kelompoknya", "Supervised Learning (Klasifikasi) — karena data berlabel dan prediksi kategori", "Reinforcement Learning — karena butuh interaksi", "Supervised Learning (Regresi) — karena prediksi angka"], correct: 1, exp: "Benar! Karena data sudah memiliki label (kategori pelanggan) dan kita ingin memprediksi kategori, ini adalah Supervised Learning tugas Klasifikasi." } },
      { type: "quick_quiz", question: { q: "Algoritma apa yang PALING cocok untuk mengelompokkan dokumen berita ke dalam topik-topik tanpa kategori yang sudah ditentukan?", opts: ["Linear Regression", "K-Means Clustering (Unsupervised)", "Logistic Regression", "Reinforcement Learning"], correct: 1, exp: "Benar! Pengelompokan dokumen tanpa label kategori adalah masalah Clustering, sehingga K-Means (Unsupervised Learning) adalah pilihan paling tepat." } },
    ],
  },

    // ===== MODUL 3: KONSEP SUPERVISED LEARNING =====
  "m3-klasifikasi-regresi": {
    id: "m3-klasifikasi-regresi",
    title: "Klasifikasi vs Regresi",
    moduleTitle: "Konsep Dasar Supervised Learning",
    summary: "Dua jenis tugas utama dalam Supervised Learning dan cara membedakannya.",
    contentBlocks: [
      { type: "paragraph", text: "Dalam Supervised Learning, ada dua jenis tugas utama berdasarkan tipe output yang diprediksi:" },
      { type: "highlight", text: "📊 Klasifikasi: Output berupa kategori/kelas diskret.\nContoh: Apakah tumor jinak atau ganas? (2 kelas), Spesies bunga apa? (3 kelas), Digit angka berapa? (10 kelas)" },
      { type: "highlight", text: "📈 Regresi: Output berupa nilai numerik kontinu.\nContoh: Berapa harga rumah ini? (Rp 850 juta), Berapa suhu besok? (28.5°C), Berapa penjualan bulan depan? (1.250 unit)" },
      { type: "code", code: `# Klasifikasi — prediksi kategori
from sklearn.tree import DecisionTreeClassifier
model_clf = DecisionTreeClassifier()
model_clf.fit(X_train, y_kategori)  # y = ["kucing", "anjing", "burung"]
prediksi = model_clf.predict(data_baru)  # Output: "kucing"

# Regresi — prediksi angka
from sklearn.linear_model import LinearRegression
model_reg = LinearRegression()
model_reg.fit(X_train, y_harga)  # y = [500, 750, 1200, ...]
prediksi = model_reg.predict(data_baru)  # Output: 825.50` },
      { type: "quick_quiz", question: { q: "Memprediksi apakah seorang pasien menderita diabetes (ya/tidak) termasuk tugas apa?", opts: ["Regresi, karena diabetes berhubungan dengan kadar gula darah (angka)", "Klasifikasi, karena outputnya berupa kategori ya atau tidak", "Unsupervised Learning, karena kita tidak tahu jawabannya", "Reinforcement Learning, karena dokter belajar dari pengalaman"], correct: 1, exp: "Benar! Meskipun diagnosis berhubungan dengan angka (kadar gula darah), tugas akhirnya memprediksi kategori diskret (ya/tidak menderita diabetes) sehingga termasuk Klasifikasi." } },
    ],
  },
  "m3-anatomi-dataset": {
    id: "m3-anatomi-dataset",
    title: "Anatomi Dataset",
    moduleTitle: "Konsep Dasar Supervised Learning",
    summary: "Memahami komponen-komponen penyusun dataset ML: sampel, fitur, label, dan tipe data.",
    contentBlocks: [
      { type: "paragraph", text: "Dataset adalah fondasi dari setiap proyek ML. Memahami strukturnya sangat penting sebelum membangun model apapun. Sebuah dataset terdiri dari: Baris (rows) = Sampel/Observasi/Instance — masing-masing mewakili satu titik data. Kolom (columns) = Fitur/Atribut — karakteristik yang mendeskripsikan setiap sampel." },
      { type: "highlight", text: "🗂️ Tipe Fitur:\n• Numerik Kontinu: umur (25.5), pendapatan (8000000), suhu (28.3)\n• Numerik Diskret: jumlah anak (2), jumlah kamar (3)\n• Kategorikal Nominal: warna (merah, biru), kota (Jakarta, Bandung)\n• Kategorikal Ordinal: pendidikan (SD < SMP < SMA < S1)" },
      { type: "code", code: `import pandas as pd
from sklearn.datasets import load_iris

# Memuat dataset Iris (150 sampel, 4 fitur, 3 kelas)
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = iris.target_names[iris.target]

print(f"Jumlah sampel: {len(df)}")        # 150
print(f"Jumlah fitur: {len(df.columns)-1}")  # 4
print(f"Kelas target: {iris.target_names}")  # ['setosa', 'versicolor', 'virginica']
print(df.head())
# Output:
#    sepal length  sepal width  petal length  petal width species
# 0          5.1          3.5           1.4          0.2  setosa
# 1          4.9          3.0           1.4          0.2  setosa` },
      { type: "quick_quiz", question: { q: "Dalam dataset prediksi harga rumah, mana yang termasuk fitur (feature)?", opts: ["Harga rumah (Rp 850 juta)", "Luas tanah, jumlah kamar, lokasi", "Nama pembeli rumah", "Tanggal transaksi saja"], correct: 1, exp: "Benar! Fitur (feature) adalah variabel input yang digunakan model untuk memprediksi. Luas tanah, jumlah kamar, dan lokasi adalah karakteristik rumah yang mempengaruhi harga. Harga rumah sendiri adalah label (target)." } },
    ],
  },
  "m3-train-test-split": {
    id: "m3-train-test-split",
    title: "Training/Testing Split",
    moduleTitle: "Konsep Dasar Supervised Learning",
    summary: "Mengapa dan bagaimana membagi dataset menjadi data latih dan data uji.",
    contentBlocks: [
      { type: "paragraph", text: "Salah satu konsep terpenting dalam ML adalah TIDAK menggunakan seluruh data untuk melatih model. Kita harus menyisihkan sebagian data yang belum pernah dilihat model untuk menguji performanya. Ini seperti ujian di sekolah: guru tidak memberikan soal ujian yang persis sama dengan latihan — ujian menguji kemampuan siswa menggeneralisasi pengetahuan ke soal baru." },
      { type: "highlight", text: "📐 Rasio umum pembagian data:\n• 80% Training : 20% Testing (paling umum)\n• 70% Training : 15% Validation : 15% Testing (untuk tuning hyperparameter)\n• Untuk dataset kecil (<1000 sampel): gunakan Cross-Validation" },
      { type: "code", code: `from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
print(f"Total data: {len(X)} sampel")  # 150

# Split 80:20
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"Data latih: {len(X_train)} sampel")  # 120
print(f"Data uji: {len(X_test)} sampel")    # 30

# Parameter stratify=y memastikan proporsi kelas
# tetap seimbang di train dan test set` },
      { type: "quick_quiz", question: { q: "Mengapa kita perlu membagi data menjadi train dan test set?", opts: ["Agar model bisa belajar lebih cepat", "Untuk menghemat memori komputer", "Untuk menguji kemampuan model pada data yang belum pernah dilihat (generalisasi)", "Karena model ML tidak bisa memproses seluruh data sekaligus"], correct: 2, exp: "Benar! Test set digunakan untuk mengukur kemampuan generalisasi model — seberapa baik model memprediksi data baru yang belum pernah dilihat selama training." } },
    ],
  },
  "m3-overfitting": {
    id: "m3-overfitting",
    title: "Overfitting & Underfitting",
    moduleTitle: "Konsep Dasar Supervised Learning",
    summary: "Dua musuh utama ML: model yang terlalu kompleks vs terlalu sederhana.",
    contentBlocks: [
      { type: "paragraph", text: "Overfitting terjadi saat model terlalu 'menghafal' data training, termasuk noise dan outlier, sehingga performanya sangat baik di training set tapi buruk di test set. Analoginya: siswa yang menghafal seluruh kunci jawaban latihan tanpa memahami konsepnya — saat soal ujian sedikit berbeda, ia tidak bisa menjawab." },
      { type: "paragraph", text: "Underfitting terjadi saat model terlalu sederhana untuk menangkap pola dalam data. Performanya buruk baik di training set maupun test set. Analoginya: siswa yang hanya membaca ringkasan 1 halaman untuk ujian 10 bab — ia tidak cukup belajar untuk menjawab soal apapun." },
      { type: "highlight", text: "⚖️ Tanda-tanda:\n• Overfitting: Akurasi training 99%, akurasi testing 65% (gap besar)\n• Underfitting: Akurasi training 55%, akurasi testing 52% (keduanya rendah)\n• Model Ideal: Akurasi training 92%, akurasi testing 89% (gap kecil, keduanya tinggi)" },
      { type: "highlight", text: "🛡️ Cara mencegah Overfitting:\n• Kumpulkan lebih banyak data training\n• Kurangi kompleksitas model (pruning, regularisasi)\n• Gunakan teknik dropout (Neural Network)\n• Terapkan cross-validation\n\n🔧 Cara mengatasi Underfitting:\n• Gunakan model yang lebih kompleks\n• Tambahkan fitur yang lebih informatif\n• Kurangi regularisasi\n• Latih model lebih lama (lebih banyak epoch)" },
      { type: "quick_quiz", question: { q: "Model Anda memiliki akurasi 99% di training set tapi hanya 60% di test set. Apa yang terjadi?", opts: ["Underfitting — model terlalu sederhana", "Overfitting — model menghafal data training, gagal menggeneralisasi", "Model sudah sempurna karena akurasi training 99%", "Bug pada kode program"], correct: 1, exp: "Benar! Gap besar antara performa training (99%) dan testing (60%) adalah tanda klasik overfitting. Model terlalu menghafal data training dan tidak bisa menggeneralisasi ke data baru." } },
    ],
  },
  "m3-feature-importance": {
    id: "m3-feature-importance",
    title: "Feature Importance",
    moduleTitle: "Konsep Dasar Supervised Learning",
    summary: "Bagaimana mengidentifikasi fitur mana yang paling berpengaruh terhadap prediksi model.",
    contentBlocks: [
      { type: "paragraph", text: "Feature Importance (Kepentingan Fitur) adalah teknik untuk mengukur seberapa besar kontribusi masing-masing fitur terhadap keputusan prediksi model. Ini membantu kita memahami 'mengapa' model membuat prediksi tertentu dan fitur mana yang paling berpengaruh." },
      { type: "highlight", text: "💡 Manfaat Feature Importance:\n• Memahami faktor dominan dalam prediksi\n• Mengurangi fitur yang tidak relevan (feature selection)\n• Meningkatkan interpretabilitas model\n• Mendeteksi data leakage (fitur yang 'bocorkan' jawaban)" },
      { type: "code", code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

iris = load_iris()
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(iris.data, iris.target)

# Feature Importance
for name, importance in zip(iris.feature_names, model.feature_importances_):
    print(f"{name}: {importance:.3f}")
# Output:
# sepal length (cm): 0.098
# sepal width (cm):  0.024
# petal length (cm): 0.424  ← Paling penting!
# petal width (cm):  0.454  ← Paling penting!` },
      { type: "quick_quiz", question: { q: "Mengapa Feature Importance berguna dalam proyek ML?", opts: ["Untuk membuat model berjalan lebih cepat saja", "Untuk memahami fitur mana yang paling berpengaruh dan membuang fitur tidak relevan", "Untuk menambah jumlah fitur dalam dataset", "Untuk mengganti semua fitur dengan angka acak"], correct: 1, exp: "Benar! Feature Importance membantu kita memahami kontribusi masing-masing fitur, membuang fitur yang tidak relevan, dan meningkatkan interpretabilitas model." } },
    ],
  },

  "m3-kuis": {
    id: "m3-kuis",
    title: "Kuis Supervised Learning",
    moduleTitle: "Konsep Dasar Supervised Learning",
    summary: "Evaluasi pemahaman Anda tentang konsep Supervised Learning — klasifikasi vs regresi, anatomi dataset, train/test split, overfitting, dan feature importance.",
    contentBlocks: [
      { type: "quick_quiz", question: { q: "Apa perbedaan mendasar antara Klasifikasi dan Regresi?", opts: ["Klasifikasi lebih cepat dari Regresi", "Klasifikasi memprediksi kategori diskret, Regresi memprediksi nilai kontinu", "Regresi hanya untuk data numerik, Klasifikasi hanya untuk teks", "Tidak ada perbedaan, keduanya sama"], correct: 1, exp: "Benar! Klasifikasi menghasilkan output kategori (spam/bukan, tumor jinak/ganas) sedangkan Regresi menghasilkan nilai numerik kontinu (harga Rp 850jt, suhu 28.5°C)." } },
      { type: "quick_quiz", question: { q: "Dalam dataset prediksi harga rumah dengan fitur luas tanah, jumlah kamar, lokasi — manakah yang merupakan fitur?", opts: ["Harga rumah", "Luas tanah, jumlah kamar, dan lokasi", "Nama pembeli", "Tanggal transaksi"], correct: 1, exp: "Benar! Fitur adalah variabel input (luas tanah, jumlah kamar, lokasi) yang digunakan model untuk memprediksi label (harga rumah)." } },
      { type: "quick_quiz", question: { q: "Jika Anda memiliki 1.000 sampel data dan menggunakan test_size=0.2, berapa sampel untuk training?", opts: ["200 sampel", "500 sampel", "800 sampel", "1000 sampel"], correct: 2, exp: "Benar! test_size=0.2 berarti 20% data (200 sampel) untuk testing, sisanya 80% (800 sampel) untuk training." } },
      { type: "quick_quiz", question: { q: "Model dengan akurasi training 99% dan testing 60% menunjukkan masalah apa?", opts: ["Underfitting — model terlalu sederhana", "Overfitting — model menghafal data training", "Model sudah optimal", "Data training terlalu sedikit"], correct: 1, exp: "Benar! Gap besar antara training (99%) dan testing (60%) adalah tanda klasik overfitting. Model terlalu menghafal data training dan gagal menggeneralisasi." } },
      { type: "quick_quiz", question: { q: "Apa manfaat utama dari Feature Importance?", opts: ["Membuat model berjalan lebih lambat", "Mengidentifikasi fitur paling berpengaruh dan membuang fitur tidak relevan", "Menambah jumlah fitur dalam dataset", "Mengganti semua fitur dengan angka acak"], correct: 1, exp: "Benar! Feature Importance membantu kita memahami kontribusi tiap fitur, membuang fitur yang tidak penting, dan meningkatkan interpretabilitas model." } },
    ],
  },

    // ===== MODUL 4: ENSIKLOPEDIA ALGORITMA =====
  "m4-linear-regression": {
    id: "m4-linear-regression",
    title: "Linear & Logistic Regression",
    moduleTitle: "Ensiklopedia Algoritma",
    summary: "Fondasi algoritma ML: garis regresi linear untuk prediksi angka dan sigmoid logistik untuk klasifikasi.",
    contentBlocks: [
      { type: "paragraph", text: "Linear Regression adalah algoritma paling fundamental dalam ML. Ia mencari hubungan linear (garis lurus) antara fitur input (X) dan target output (y). Tujuannya menemukan garis terbaik yang meminimalkan jarak antara titik data aktual dan garis prediksi." },
      { type: "formula", text: "y = m \\cdot x + b \\quad \\text{di mana } m = \\text{slope (kemiringan)}, b = \\text{intercept (perpotongan sumbu y)}" },
      { type: "paragraph", text: "Logistic Regression, meskipun namanya mengandung 'regression', sebenarnya digunakan untuk Klasifikasi. Ia menggunakan fungsi sigmoid untuk mengubah output linear menjadi probabilitas antara 0 dan 1, yang kemudian dibulatkan menjadi kelas 0 atau 1." },
      { type: "code", code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Data: Luas rumah (m²) → Harga (juta Rp)
X = np.array([[30], [50], [70], [90], [120]])
y = np.array([300, 500, 680, 870, 1150])

model = LinearRegression()
model.fit(X, y)

print(f"Slope (m): {model.coef_[0]:.2f}")       # ~9.57
print(f"Intercept (b): {model.intercept_:.2f}")  # ~16.67
print(f"Prediksi 80m²: Rp {model.predict([[80]])[0]:.0f} juta")  # ~782` },
      { type: "quick_quiz", question: { q: "Apa perbedaan utama antara Linear Regression dan Logistic Regression?", opts: ["Tidak ada perbedaan, keduanya identik", "Linear untuk prediksi angka kontinu, Logistic untuk klasifikasi (probabilitas 0-1)", "Logistic lebih akurat dari Linear untuk semua kasus", "Linear menggunakan garis lurus, Logistic menggunakan garis lengkung parabola"], correct: 1, exp: "Benar! Linear Regression memprediksi nilai kontinu (harga, suhu), sedangkan Logistic Regression memprediksi probabilitas kelas (0 atau 1) menggunakan fungsi sigmoid." } },
    ],
  },
  "m4-decision-tree": {
    id: "m4-decision-tree",
    title: "Decision Tree",
    moduleTitle: "Ensiklopedia Algoritma",
    summary: "Algoritma berbasis pohon keputusan yang membuat prediksi melalui serangkaian pertanyaan ya/tidak.",
    contentBlocks: [
      { type: "paragraph", text: "Decision Tree (Pohon Keputusan) membuat prediksi dengan mengajukan serangkaian pertanyaan ya/tidak terhadap fitur data. Setiap pertanyaan membagi data menjadi subset yang lebih 'murni' (homogen). Proses ini berulang hingga mencapai daun (leaf) yang memberikan prediksi akhir." },
      { type: "highlight", text: "🌳 Analogi: Saat dokter mendiagnosis penyakit, ia bertanya bertahap: 'Apakah demam?' → 'Apakah batuk?' → 'Apakah sesak napas?' — setiap jawaban mempersempit diagnosis. Decision Tree bekerja dengan cara yang sama!" },
      { type: "paragraph", text: "Decision Tree menggunakan metrik Information Gain atau Gini Impurity untuk memilih pertanyaan terbaik (fitur mana yang paling efektif memisahkan data) di setiap percabangan." },
      { type: "code", code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

print(f"Akurasi Training: {model.score(X_train, y_train):.2%}")  # 97.50%
print(f"Akurasi Testing: {model.score(X_test, y_test):.2%}")    # 96.67%` },
    ],
  },
  "m4-random-forest": {
    id: "m4-random-forest",
    title: "Random Forest",
    moduleTitle: "Ensiklopedia Algoritma",
    summary: "Ensemble dari banyak Decision Tree yang memberikan prediksi lebih akurat dan stabil melalui voting mayoritas.",
    contentBlocks: [
      { type: "paragraph", text: "Random Forest adalah algoritma ensemble yang membangun banyak Decision Tree secara acak, lalu menggabungkan prediksi mereka melalui voting mayoritas (klasifikasi) atau rata-rata (regresi). Prinsipnya: 'kebijaksanaan kerumunan' — satu pohon mungkin salah, tapi mayoritas dari 100 pohon kemungkinan besar benar." },
      { type: "highlight", text: "🌲🌲🌲 Dua teknik randomisasi:\n1. Bagging: Setiap pohon dilatih pada subset data yang diambil secara acak (bootstrap sampling)\n2. Random Feature Selection: Di setiap percabangan, hanya subset fitur acak yang dipertimbangkan" },
      { type: "code", code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
model.fit(X_train, y_train)

print(f"Akurasi Testing: {model.score(X_test, y_test):.2%}")  # 96.67-100%
print(f"Jumlah pohon: {model.n_estimators}")  # 100` },
    ],
  },
  "m4-svm": {
    id: "m4-svm",
    title: "Support Vector Machine (SVM)",
    moduleTitle: "Ensiklopedia Algoritma",
    summary: "Algoritma yang mencari hyperplane optimal untuk memisahkan kelas dengan margin terlebar.",
    contentBlocks: [
      { type: "paragraph", text: "SVM bekerja dengan mencari hyperplane (garis/bidang pembatas) yang memisahkan dua kelas dengan margin terlebar. Data yang berada paling dekat dengan hyperplane disebut support vectors — mereka yang 'mendukung' posisi garis pembatas. Untuk data yang tidak bisa dipisahkan secara linear, SVM menggunakan kernel trick untuk memetakan data ke dimensi lebih tinggi." },
      { type: "highlight", text: "🎯 Keunggulan SVM:\n• Sangat efektif di ruang berdimensi tinggi\n• Bekerja baik saat jumlah fitur > jumlah sampel\n• Kernel trick memungkinkan pemisahan non-linear\n• Robust terhadap outlier (hanya support vectors yang berpengaruh)" },
      { type: "code", code: `from sklearn.svm import SVC
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# SVM sensitif terhadap skala data → wajib normalisasi
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = SVC(kernel='rbf', C=1.0, gamma='scale')
model.fit(X_train_scaled, y_train)
print(f"Akurasi: {model.score(X_test_scaled, y_test):.2%}")  # ~96.67%` },
      { type: "quick_quiz", question: { q: "Apa fungsi 'kernel trick' dalam SVM?", opts: ["Mempercepat proses training SVM", "Memproyeksikan data ke dimensi lebih tinggi tanpa komputasi eksplisit", "Menghapus data yang tidak diperlukan", "Mengubah SVM menjadi Neural Network"], correct: 1, exp: "Benar! Kernel trick memungkinkan SVM memisahkan data non-linear dengan memproyeksikannya ke dimensi lebih tinggi tanpa benar-benar melakukan transformasi eksplisit — menghemat komputasi secara drastis." } },
    ],
  },
  "m4-knn": {
    id: "m4-knn",
    title: "K-Nearest Neighbors (KNN)",
    moduleTitle: "Ensiklopedia Algoritma",
    summary: "Algoritma berbasis kedekatan: klasifikasi berdasarkan voting K tetangga terdekat.",
    contentBlocks: [
      { type: "paragraph", text: "KNN adalah algoritma yang sangat intuitif: untuk mengklasifikasikan data baru, ia mencari K data terdekat (tetangga) dalam dataset training, lalu melakukan voting mayoritas dari label tetangga tersebut. Ibarat pindah ke lingkungan baru — karakter Anda dinilai berdasarkan tetangga-tetangga terdekat Anda." },
      { type: "highlight", text: "🔢 Memilih nilai K:\n• K terlalu kecil (1-3): sensitif terhadap noise/outlier → overfitting\n• K terlalu besar (>20): batas keputusan terlalu halus → underfitting\n• Aturan praktis: mulai dengan K = √N (akar kuadrat jumlah sampel)\n• Selalu gunakan K ganjil untuk menghindari tie dalam voting" },
      { type: "code", code: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = KNeighborsClassifier(n_neighbors=5)  # K = 5
model.fit(X_train, y_train)
print(f"Akurasi: {model.score(X_test, y_test):.2%}")  # ~96.67-100%` },
      { type: "quick_quiz", question: { q: "Apa dampak memilih nilai K yang terlalu kecil pada KNN (misal K=1)?", opts: ["Model menjadi terlalu lambat", "Model sensitif terhadap noise/outlier dan cenderung overfitting", "Model otomatis lebih akurat", "Tidak ada dampak apapun"], correct: 1, exp: "Benar! K=1 berarti klasifikasi hanya berdasarkan 1 tetangga terdekat. Jika tetangga itu adalah outlier, prediksi akan salah — model terlalu sensitif terhadap noise." } },
    ],
  },
  "m4-gradient-boosting": {
    id: "m4-gradient-boosting",
    title: "Gradient Boosting",
    moduleTitle: "Ensiklopedia Algoritma",
    summary: "Teknik ensemble yang membangun pohon secara bertahap, di mana setiap pohon memperbaiki kesalahan pohon sebelumnya.",
    contentBlocks: [
      { type: "paragraph", text: "Gradient Boosting adalah teknik ensemble yang membangun model secara sekuensial (bertahap). Setiap model baru fokus memperbaiki kesalahan (residual) dari model-model sebelumnya. Hasilnya, prediksi akhir merupakan akumulasi dari seluruh model kecil yang saling melengkapi." },
      { type: "highlight", text: "🏆 Gradient Boosting sering memenangkan kompetisi ML (Kaggle) karena akurasinya yang sangat tinggi pada data tabular. Implementasi populer: XGBoost, LightGBM, dan CatBoost." },
      { type: "code", code: `from sklearn.ensemble import GradientBoostingClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = GradientBoostingClassifier(
    n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42
)
model.fit(X_train, y_train)
print(f"Akurasi: {model.score(X_test, y_test):.2%}")  # ~96.67-100%` },
      { type: "quick_quiz", question: { q: "Apa perbedaan utama antara Gradient Boosting dan Random Forest?", opts: ["Gradient Boosting menggunakan GPU, Random Forest menggunakan CPU", "Gradient Boosting membangun pohon secara sekuensial (setiap pohon memperbaiki kesalahan sebelumnya), Random Forest membangun pohon secara paralel (independen)", "Random Forest lebih baru daripada Gradient Boosting", "Gradient Boosting hanya untuk klasifikasi, Random Forest hanya untuk regresi"], correct: 1, exp: "Benar! Perbedaan fundamental: Random Forest membangun semua pohon secara independen dan paralel (bagging), sedangkan Gradient Boosting membangun pohon secara berurutan — setiap pohon baru belajar dari residual kesalahan pohon sebelumnya." } },
    ],
  },
  "m4-neural-network": {
    id: "m4-neural-network",
    title: "Neural Network",
    moduleTitle: "Ensiklopedia Algoritma",
    summary: "Jaringan saraf tiruan yang terinspirasi dari otak manusia, mampu mempelajari pola yang sangat kompleks.",
    contentBlocks: [
      { type: "paragraph", text: "Neural Network (Jaringan Saraf Tiruan) terinspirasi dari cara kerja neuron di otak manusia. Terdiri dari lapisan-lapisan neuron yang saling terhubung: Input Layer menerima data, Hidden Layer(s) memproses dan mengekstrak fitur, Output Layer menghasilkan prediksi. Setiap koneksi memiliki bobot (weight) yang disesuaikan selama training." },
      { type: "highlight", text: "🧠 Komponen utama Neural Network:\n• Neuron: Unit komputasi yang menerima input, memproses, dan menghasilkan output\n• Weight & Bias: Parameter yang dioptimasi selama training\n• Activation Function: Fungsi non-linear (ReLU, Sigmoid, Tanh) yang memungkinkan model mempelajari pola kompleks\n• Backpropagation: Algoritma untuk menghitung gradient dan memperbarui bobot" },
      { type: "code", code: `from sklearn.neural_network import MLPClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = MLPClassifier(hidden_layer_sizes=(10, 5), max_iter=500, random_state=42)
model.fit(X_train, y_train)
print(f"Akurasi: {model.score(X_test, y_test):.2%}")  # ~96.67-100%` },
      { type: "quick_quiz", question: { q: "Apa fungsi Activation Function (seperti ReLU) dalam Neural Network?", opts: ["Mempercepat koneksi internet", "Menambahkan non-linearitas sehingga jaringan bisa mempelajari pola kompleks", "Mengganti bobot secara acak", "Mengurangi jumlah hidden layer"], correct: 1, exp: "Benar! Activation function (ReLU, Sigmoid, Tanh) menambahkan elemen non-linear ke jaringan. Tanpa non-linearitas, tumpukan layer linear setara dengan satu layer — tidak bisa mempelajari pola kompleks." } },
    ],
  },
  "m4-k-means": {
    id: "m4-k-means",
    title: "K-Means Clustering",
    moduleTitle: "Ensiklopedia Algoritma",
    summary: "Algoritma clustering yang membagi data ke dalam K kelompok berdasarkan kedekatan jarak ke centroid.",
    contentBlocks: [
      { type: "paragraph", text: "K-Means adalah algoritma Unsupervised Learning yang mengelompokkan data ke dalam K cluster berdasarkan kemiripan. Algoritma ini bekerja iteratif: (1) Inisialisasi K centroid secara acak, (2) Assign setiap data ke centroid terdekat, (3) Update posisi centroid ke rata-rata anggota cluster, (4) Ulangi langkah 2-3 hingga centroid tidak bergerak lagi (konvergen)." },
      { type: "highlight", text: "📊 Menentukan K optimal:\n• Elbow Method: Plot inertia vs K, cari 'siku' di mana penurunan mulai melambat\n• Silhouette Score: Ukur seberapa mirip data dengan cluster sendiri vs cluster lain\n• Domain knowledge: Berdasarkan pemahaman bisnis (contoh: 3 tier pelanggan)" },
      { type: "code", code: `from sklearn.cluster import KMeans
from sklearn.datasets import load_iris

X = load_iris().data  # Tidak ada label — unsupervised!

model = KMeans(n_clusters=3, random_state=42, n_init=10)
model.fit(X)

print(f"Cluster labels: {model.labels_[:10]}")  # [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
print(f"Inertia: {model.inertia_:.2f}")          # 78.85
print(f"Centroid 1: {model.cluster_centers_[0].round(2)}")` },
      { type: "quick_quiz", question: { q: "Apa kelemahan utama K-Means Clustering?", opts: ["Tidak bisa digunakan untuk data numerik", "Perlu menentukan jumlah K (cluster) di awal, sensitif terhadap inisialisasi centroid", "Terlalu lambat untuk dataset kecil", "Hanya bisa memproses teks"], correct: 1, exp: "Benar! Dua kelemahan utama K-Means: (1) kita harus menentukan jumlah K di awal tanpa tahu struktur data, (2) hasil clustering bergantung pada inisialisasi centroid awal, sehingga perlu dijalankan beberapa kali (n_init)." } },
    ],
  },

  // ===== MODUL 5: EVALUASI MODEL =====
  "m5-metrik-klasifikasi": {
    id: "m5-metrik-klasifikasi",
    title: "Metrik Klasifikasi",
    moduleTitle: "Evaluasi Model",
    summary: "Akurasi, Precision, Recall, dan F1-Score — kapan menggunakan masing-masing metrik.",
    contentBlocks: [
      { type: "paragraph", text: "Akurasi saja tidak cukup! Bayangkan dataset deteksi penyakit langka: 99% data adalah 'sehat', hanya 1% yang 'sakit'. Model yang selalu menjawab 'sehat' mendapat akurasi 99% padahal tidak berguna sama sekali. Kita butuh metrik yang lebih informatif:" },
      { type: "highlight", text: "📏 Empat metrik utama klasifikasi:\n• Accuracy: Proporsi prediksi benar dari total prediksi = (TP+TN)/(TP+TN+FP+FN)\n• Precision: Dari semua yang diprediksi positif, berapa yang benar positif? = TP/(TP+FP)\n• Recall: Dari semua yang sebenarnya positif, berapa yang terdeteksi? = TP/(TP+FN)\n• F1-Score: Rata-rata harmonik Precision dan Recall = 2×(P×R)/(P+R)" },
      { type: "code", code: `from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

y_actual  = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1]
y_predict = [1, 0, 1, 0, 0, 1, 1, 0, 1, 1]

print(f"Accuracy:  {accuracy_score(y_actual, y_predict):.2%}")   # 80%
print(f"Precision: {precision_score(y_actual, y_predict):.2%}")  # 83%
print(f"Recall:    {recall_score(y_actual, y_predict):.2%}")     # 83%
print(f"F1-Score:  {f1_score(y_actual, y_predict):.2%}")         # 83%` },
      { type: "quick_quiz", question: { q: "Untuk sistem deteksi kanker, metrik mana yang paling penting untuk dimaksimalkan?", opts: ["Akurasi — agar model sering benar secara keseluruhan", "Precision — agar tidak ada diagnosis palsu (false alarm)", "Recall — agar tidak ada pasien kanker yang terlewat (tidak terdeteksi)", "F1-Score — agar keduanya seimbang"], correct: 2, exp: "Benar! Dalam deteksi penyakit berbahaya, Recall paling kritis karena kita TIDAK BOLEH melewatkan pasien yang benar-benar sakit (False Negative sangat berbahaya). Lebih baik false alarm (precision rendah) daripada tidak terdeteksi." } },
    ],
  },
  "m5-metrik-regresi": {
    id: "m5-metrik-regresi",
    title: "Metrik Regresi",
    moduleTitle: "Evaluasi Model",
    summary: "MAE, MSE, RMSE, dan R² — mengukur seberapa dekat prediksi angka dengan nilai sebenarnya.",
    contentBlocks: [
      { type: "paragraph", text: "Untuk tugas regresi (prediksi angka), kita mengukur seberapa dekat prediksi model dengan nilai sebenarnya menggunakan metrik error:" },
      { type: "highlight", text: "📐 Metrik evaluasi regresi:\n• MAE (Mean Absolute Error): Rata-rata selisih absolut — mudah diinterpretasi\n• MSE (Mean Squared Error): Rata-rata selisih kuadrat — menghukum error besar lebih berat\n• RMSE (Root MSE): Akar kuadrat MSE — satuan sama dengan target\n• R² (Coefficient of Determination): 0-1, seberapa baik model menjelaskan variasi data (1 = sempurna)" },
      { type: "code", code: `from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

y_actual  = [300, 500, 680, 870, 1150]  # Harga rumah aktual (juta Rp)
y_predict = [320, 480, 700, 850, 1100]  # Prediksi model

mae = mean_absolute_error(y_actual, y_predict)
mse = mean_squared_error(y_actual, y_predict)
rmse = np.sqrt(mse)
r2 = r2_score(y_actual, y_predict)

print(f"MAE:  Rp {mae:.0f} juta")     # Rata-rata meleset ~30 juta
print(f"RMSE: Rp {rmse:.0f} juta")    # ~31 juta
print(f"R²:   {r2:.4f}")               # ~0.9952 (model sangat baik!)` },
      { type: "quick_quiz", question: { q: "Apa kelebihan RMSE dibanding MAE dalam evaluasi regresi?", opts: ["RMSE lebih mudah dihitung", "RMSE memberikan bobot lebih besar pada error besar (lebih sensitif terhadap outlier)", "RMSE tidak memiliki satuan", "RMSE selalu lebih kecil dari MAE"], correct: 1, exp: "Benar! Karena RMSE mengkuadratkan error sebelum dirata-rata, error besar mendapat bobot yang jauh lebih besar. Ini membuat RMSE lebih sensitif terhadap outlier dibanding MAE." } },
    ],
  },
  "m5-confusion-matrix": {
    id: "m5-confusion-matrix",
    title: "Confusion Matrix",
    moduleTitle: "Evaluasi Model",
    summary: "Tabel 2×2 yang merinci True Positive, False Positive, True Negative, dan False Negative.",
    contentBlocks: [
      { type: "paragraph", text: "Confusion Matrix adalah tabel yang merangkum hasil prediksi model klasifikasi. Setiap sel menunjukkan jumlah prediksi yang masuk ke kategori tertentu: True Positive (TP), True Negative (TN), False Positive (FP), dan False Negative (FN). Dari keempat nilai ini, kita bisa menghitung semua metrik klasifikasi." },
      { type: "highlight", text: "📋 Pembacaan Confusion Matrix:\n• TP (True Positive): Model prediksi Positif dan memang benar Positif ✅\n• TN (True Negative): Model prediksi Negatif dan memang benar Negatif ✅\n• FP (False Positive): Model prediksi Positif tapi sebenarnya Negatif ❌ (Type I Error)\n• FN (False Negative): Model prediksi Negatif tapi sebenarnya Positif ❌ (Type II Error)" },
      { type: "code", code: `from sklearn.metrics import confusion_matrix, classification_report
from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=load_iris().target_names))` },
      { type: "quick_quiz", question: { q: "Dalam Confusion Matrix deteksi kanker, apa arti False Negative (FN)?", opts: ["Model memprediksi kanker dan benar ada kanker", "Model memprediksi tidak kanker tapi sebenarnya ada kanker (berbahaya — pasien terlewat)", "Model memprediksi kanker tapi sebenarnya tidak ada", "Model memprediksi tidak kanker dan benar tidak ada"], correct: 1, exp: "Benar! False Negative (FN) adalah kasus paling berbahaya dalam deteksi penyakit — model mengatakan 'tidak sakit' padahal sebenarnya sakit, sehingga pasien tidak mendapat penanganan." } },
    ],
  },
  "m5-cross-validation": {
    id: "m5-cross-validation",
    title: "Cross-Validation",
    moduleTitle: "Evaluasi Model",
    summary: "Teknik evaluasi yang lebih robust dengan membagi data menjadi K fold secara bergantian.",
    contentBlocks: [
      { type: "paragraph", text: "Cross-Validation (CV) mengatasi kelemahan single train/test split yang hasilnya bergantung pada pembagian data tertentu. Dalam K-Fold CV, data dibagi menjadi K bagian (fold). Model dilatih K kali — setiap kali, satu fold menjadi test set dan sisanya menjadi training set. Hasil akhir adalah rata-rata akurasi dari K iterasi." },
      { type: "highlight", text: "🔄 K-Fold Cross-Validation (K=5):\n• Iterasi 1: Fold 1 sebagai test, Fold 2-5 sebagai train\n• Iterasi 2: Fold 2 sebagai test, Fold 1,3-5 sebagai train\n• ... dan seterusnya\n• Hasil akhir: Rata-rata ± standar deviasi dari 5 akurasi" },
      { type: "code", code: `from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
model = RandomForestClassifier(n_estimators=100, random_state=42)

# 5-Fold Cross Validation
scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')

print(f"Skor tiap fold: {scores.round(3)}")
print(f"Rata-rata: {scores.mean():.2%} ± {scores.std():.2%}")
# Output: Rata-rata: 96.00% ± 2.49%` },
      { type: "quick_quiz", question: { q: "Apa keuntungan utama Cross-Validation dibanding single train/test split?", opts: ["Membuat model berjalan lebih cepat", "Memberikan estimasi performa yang lebih stabil dan tidak bergantung pada satu pembagian data tertentu", "Menghilangkan kebutuhan data testing", "Otomatis membuat model lebih akurat"], correct: 1, exp: "Benar! CV memberikan estimasi performa yang lebih robust karena model diuji pada semua bagian data secara bergantian, mengurangi risiko bias dari satu kali pembagian data." } },
    ],
  },

  "m5-kuis": {
    id: "m5-kuis",
    title: "Kuis Evaluasi Model",
    moduleTitle: "Evaluasi Model",
    summary: "Uji pemahaman Anda tentang metrik evaluasi model — akurasi, precision, recall, F1, MAE, RMSE, confusion matrix, dan cross-validation.",
    contentBlocks: [
      { type: "quick_quiz", question: { q: "Dalam sistem deteksi fraud, metrik mana yang harus diprioritaskan?", opts: ["Akurasi — karena kita ingin semua prediksi benar", "Recall — karena kita tidak boleh melewatkan transaksi fraud (False Negative sangat mahal)", "MAE — karena fraud adalah angka kontinu", "R² — karena fraud adalah masalah regresi"], correct: 1, exp: "Benar! Recall paling penting dalam deteksi fraud. Melewatkan satu transaksi fraud (False Negative) bisa menyebabkan kerugian besar, jadi kita rela banyak false alarm asal semua fraud tertangkap." } },
      { type: "quick_quiz", question: { q: "Jika model regresi menghasilkan R² = 0.85, apa artinya?", opts: ["Model salah 85% dari waktu", "Model menjelaskan 85% variasi dalam data target", "Model hanya benar 15%", "R² tidak relevan untuk regresi"], correct: 1, exp: "Benar! R² = 0.85 berarti model mampu menjelaskan 85% variasi (variance) dalam data target. Nilai 1.0 berarti sempurna, 0 berarti model tidak lebih baik dari rata-rata." } },
      { type: "quick_quiz", question: { q: "Apa perbedaan Type I Error (FP) dan Type II Error (FN)?", opts: ["FP = model salah positif, FN = model salah negatif", "FP dan FN adalah hal yang sama", "FP lebih berbahaya dari FN dalam semua kasus", "FN = model benar positif, FP = model benar negatif"], correct: 0, exp: "Benar! Type I Error (False Positive) = model memprediksi positif padahal negatif. Type II Error (False Negative) = model memprediksi negatif padahal positif. Mana yang lebih berbahaya tergantung konteks." } },
      { type: "quick_quiz", question: { q: "Mengapa 5-Fold Cross-Validation lebih baik dari single train/test split 80:20?", opts: ["Karena CV 5 kali lebih cepat", "Karena model diuji pada semua bagian data secara bergantian, memberikan estimasi performa yang lebih stabil", "Karena CV tidak perlu data testing", "Karena CV otomatis meningkatkan akurasi model"], correct: 1, exp: "Benar! CV menguji model pada setiap fold data secara bergantian, sehingga hasilnya tidak bergantung pada satu pembagian data tertentu dan lebih robust." } },
      { type: "quick_quiz", question: { q: "Jika dataset memiliki 90% kelas A dan 10% kelas B, mengapa akurasi bisa menyesatkan?", opts: ["Akurasi selalu akurat untuk dataset apapun", "Model yang selalu memprediksi A akan mendapat akurasi 90% padahal tidak berguna untuk mendeteksi B", "Kelas minoritas tidak mempengaruhi akurasi", "Akurasi hanya untuk regresi"], correct: 1, exp: "Benar! Pada dataset tidak seimbang (imbalanced), akurasi menyesatkan. Model yang selalu prediksi 'A' mendapat 90% padahal gagal total mendeteksi kelas B. Precision, Recall, dan F1 lebih informatif." } },
    ],
  },

  // ===== MODUL 6: STUDI KASUS TERAPAN =====
  "m6-iot-intro": {
    id: "m6-iot-intro",
    title: "Sistem IoT untuk Pertanian",
    moduleTitle: "Studi Kasus Terapan",
    summary: "Pengantar Internet of Things (IoT) dan penerapannya dalam pertanian presisi (precision agriculture).",
    contentBlocks: [
      { type: "paragraph", text: "Pertanian presisi (Precision Agriculture) menggunakan teknologi sensor IoT dan Machine Learning untuk mengoptimalkan keputusan pertanian berdasarkan data real-time. Sensor yang ditanam di lahan mengukur kondisi tanah secara kontinu: kelembaban, suhu, pH, kadar nutrisi (NPK), dan curah hujan." },
      { type: "highlight", text: "🌱 Manfaat Pertanian Presisi dengan IoT + ML:\n• Menghemat air 30-50% dengan irigasi berbasis data\n• Meningkatkan hasil panen 15-25% melalui monitoring nutrisi\n• Mendeteksi dini penyakit tanaman dan hama\n• Mengurangi penggunaan pupuk/pestisida yang tidak perlu\n• Rekomendasi waktu tanam dan panen optimal" },
      { type: "paragraph", text: "Dalam studi kasus ini, kita akan membangun sistem monitoring tanah untuk perkebunan kopi yang menggunakan Random Forest untuk memprediksi kualitas tanah dan memberikan rekomendasi tindakan kepada petani." },
      { type: "quick_quiz", question: { q: "Apa manfaat utama penggunaan IoT + ML dalam pertanian presisi?", opts: ["Menggantikan petani sepenuhnya", "Menghemat air 30-50% dan meningkatkan hasil panen 15-25% melalui keputusan berbasis data", "Hanya untuk tanaman kopi", "Mempercepat panen secara instan"], correct: 1, exp: "Benar! Pertanian presisi dengan IoT + ML mengoptimalkan irigasi (hemat air 30-50%), nutrisi, dan deteksi dini penyakit, sehingga meningkatkan hasil panen 15-25%." } },
    ],
  },
  "m6-sensor-data": {
    id: "m6-sensor-data",
    title: "Data Sensor & Preprocessing",
    moduleTitle: "Studi Kasus Terapan",
    summary: "Cara mengumpulkan, membersihkan, dan mempersiapkan data sensor IoT untuk model ML.",
    contentBlocks: [
      { type: "paragraph", text: "Data dari sensor IoT sering kali 'kotor' — mengandung missing values (sensor rusak), outlier (gangguan listrik), dan noise (fluktuasi lingkungan). Preprocessing yang baik sangat penting sebelum melatih model:" },
      { type: "highlight", text: "🔧 Langkah Preprocessing Data Sensor:\n1. Handling Missing Values: Imputasi dengan mean/median atau interpolasi temporal\n2. Outlier Detection: Hapus pembacaan di luar rentang fisik wajar (contoh: suhu 500°C)\n3. Normalisasi: Seragamkan skala fitur (MinMaxScaler atau StandardScaler)\n4. Feature Engineering: Buat fitur turunan (rata-rata harian, tren mingguan)" },
      { type: "code", code: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# Simulasi data sensor IoT selama 30 hari
np.random.seed(42)
data = pd.DataFrame({
    'kelembaban': np.random.normal(65, 10, 100),    # %
    'suhu': np.random.normal(24, 3, 100),            # °C
    'ph': np.random.normal(6.5, 0.5, 100),           # pH
    'npk': np.random.normal(140, 30, 100),           # ppm
    'kualitas': np.random.choice(['baik', 'sedang', 'buruk'], 100)
})

# Cek dan tangani missing values
print(f"Missing values: {data.isnull().sum().sum()}")
print(f"Shape: {data.shape}")  # (100, 5)
print(data.describe().round(2))` },
      { type: "quick_quiz", question: { q: "Mengapa preprocessing data sensor IoT penting sebelum melatih model ML?", opts: ["Karena data sensor selalu bersih dan siap pakai", "Karena data sensor sering mengandung missing values, outlier, dan noise yang bisa merusak model", "Karena preprocessing hanya formalitas", "Karena model ML tidak bisa membaca data sensor"], correct: 1, exp: "Benar! Data sensor IoT sering 'kotor' — sensor rusak (missing values), gangguan listrik (outlier), fluktuasi alami (noise). Preprocessing yang baik sangat penting agar model belajar pola yang benar." } },
    ],
  },
  "m6-model-random-forest": {
    id: "m6-model-random-forest",
    title: "Membangun Model Random Forest",
    moduleTitle: "Studi Kasus Terapan",
    summary: "Langkah-langkah melatih, mengevaluasi, dan mengoptimasi model Random Forest untuk prediksi kualitas tanah.",
    contentBlocks: [
      { type: "paragraph", text: "Random Forest dipilih untuk studi kasus ini karena: (1) Akurasi tinggi untuk data tabular, (2) Mampu menangani fitur dengan skala berbeda tanpa normalisasi, (3) Memberikan feature importance untuk interpretabilitas, dan (4) Robust terhadap noise data sensor." },
      { type: "code", code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report
import numpy as np

# Data sensor tanah (kelembaban, suhu, pH, NPK)
np.random.seed(42)
X = np.column_stack([
    np.random.normal(65, 10, 200),  # kelembaban
    np.random.normal(24, 3, 200),   # suhu
    np.random.normal(6.5, 0.5, 200),# pH
    np.random.normal(140, 30, 200)  # NPK
])
y = np.where(
    (X[:, 0] > 55) & (X[:, 2] > 6.0) & (X[:, 1] < 28), 0,  # Baik
    np.where((X[:, 0] > 45) & (X[:, 2] > 5.5), 1, 2)        # Sedang / Buruk
)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
model.fit(X_train, y_train)

print(f"Akurasi: {model.score(X_test, y_test):.2%}")
print("\\nFeature Importance:")
for name, imp in zip(['Kelembaban', 'Suhu', 'pH', 'NPK'], model.feature_importances_):
    print(f"  {name}: {imp:.3f}")` },
      { type: "highlight", text: "📊 Hasil analisis Feature Importance menunjukkan bahwa pH tanah dan kelembaban adalah dua faktor paling berpengaruh terhadap kualitas tanah kopi — sejalan dengan pengetahuan agronomi bahwa kopi Arabika tumbuh optimal pada pH 6.0-6.5 dan kelembaban 60-70%." },
      { type: "quick_quiz", question: { q: "Mengapa Random Forest dipilih untuk studi kasus prediksi kualitas tanah?", opts: ["Karena paling cepat di antara semua algoritma", "Karena akurasi tinggi untuk data tabular, robust terhadap noise sensor, dan memberikan feature importance", "Karena hanya Random Forest yang bisa memproses data tanah", "Karena algoritma lain tidak bisa dijalankan di IoT"], correct: 1, exp: "Benar! Random Forest unggul untuk data tabular seperti sensor tanah: akurasinya tinggi, tahan terhadap noise (data sensor sering berfluktuasi), dan memberikan feature importance untuk interpretasi." } },
    ],
  },
  "m6-dashboard": {
    id: "m6-dashboard",
    title: "Dashboard Monitoring",
    moduleTitle: "Studi Kasus Terapan",
    summary: "Membangun dashboard visual untuk menampilkan data sensor dan prediksi model secara real-time.",
    contentBlocks: [
      { type: "paragraph", text: "Tahap terakhir adalah menampilkan hasil prediksi model dalam dashboard yang bisa digunakan petani. Dashboard menampilkan: pembacaan sensor terkini, prediksi kualitas tanah, tren historis, dan rekomendasi tindakan otomatis berdasarkan prediksi model." },
      { type: "highlight", text: "📱 Fitur Dashboard Monitoring:\n• Status sensor real-time dengan indikator warna (hijau/kuning/merah)\n• Grafik tren kelembaban, suhu, pH dalam 7 hari terakhir\n• Prediksi kualitas tanah dengan confidence level\n• Notifikasi otomatis saat kondisi tanah di luar batas optimal\n• Rekomendasi tindakan: kapan menyiram, kapan memupuk" },
      { type: "paragraph", text: "Coba Dashboard IoT interaktif di halaman Studi Kasus! Geser slider sensor untuk melihat bagaimana perubahan kondisi tanah mempengaruhi prediksi model Random Forest secara real-time." },
      { type: "quick_quiz", question: { q: "Apa fitur utama dari Dashboard Monitoring IoT dalam pertanian presisi?", opts: ["Hanya menampilkan cuaca harian", "Menampilkan status sensor real-time, tren historis, dan rekomendasi tindakan otomatis", "Menggantikan petani dengan robot", "Hanya untuk tampilan estetika"], correct: 1, exp: "Benar! Dashboard monitoring menampilkan status sensor real-time (dengan indikator warna), grafik tren historis, prediksi kualitas tanah, dan rekomendasi tindakan — membantu petani mengambil keputusan berbasis data." } },
    ],
  },
  "m6-kuis": {
    id: "m6-kuis",
    title: "Kuis Studi Kasus",
    moduleTitle: "Studi Kasus Terapan",
    summary: "Evaluasi pemahaman Anda tentang studi kasus IoT pertanian presisi untuk budidaya kopi dengan Random Forest.",
    contentBlocks: [
      { type: "quick_quiz", question: { q: "Apa tujuan utama sistem IoT + ML dalam pertanian presisi?", opts: ["Menggantikan petani dengan robot otomatis", "Mengoptimalkan keputusan pertanian berdasarkan data sensor real-time", "Menciptakan varietas tanaman baru", "Mempercepat panen secara otomatis"], correct: 1, exp: "Benar! Pertanian presisi menggunakan data sensor IoT + analisis ML untuk mengoptimalkan irigasi, pemupukan, dan deteksi dini penyakit — bukan menggantikan petani, tapi membantu mereka mengambil keputusan lebih baik." } },
      { type: "quick_quiz", question: { q: "Sensor apa saja yang digunakan dalam sistem monitoring tanah untuk kopi?", opts: ["Hanya kamera", "Kelembaban, suhu lahan, pH tanah, dan kadar NPK", "Sensor gerak dan suara", "Hanya termometer"], correct: 1, exp: "Benar! Sistem memonitor 4 parameter utama tanah: kelembaban (%), suhu lahan (°C), pH tanah, dan kadar nutrisi NPK (ppm) — keempatnya mempengaruhi kualitas pertumbuhan kopi." } },
      { type: "quick_quiz", question: { q: "Apa dua faktor paling berpengaruh terhadap kualitas tanah kopi menurut analisis Feature Importance?", opts: ["Suhu dan NPK", "pH tanah dan kelembaban", "Curah hujan dan angin", "Ketinggian dan latitude"], correct: 1, exp: "Benar! Feature Importance Random Forest menunjukkan pH tanah dan kelembaban sebagai faktor dominan — sesuai pengetahuan agronomi bahwa kopi Arabika optimal pada pH 6.0-6.5 dan kelembaban 60-70%." } },
      { type: "quick_quiz", question: { q: "Apa yang terjadi pada skor kualitas tanah jika kelembaban turun di bawah 50%?", opts: ["Skor tetap sama", "Skor menurun drastis karena kondisi terlalu kering untuk kopi", "Skor justru meningkat", "Sensor otomatis mati"], correct: 1, exp: "Benar! Kelembaban optimal untuk kopi Arabika adalah 60-70%. Jika turun di bawah 50%, tanah terlalu kering dan skor kualitas menurun drastis — sistem akan merekomendasikan irigasi." } },
      { type: "quick_quiz", question: { q: "Apa rekomendasi sistem jika skor kualitas tanah menunjukkan 'Kurang Ideal'?", opts: ["Tidak melakukan apapun", "Irigasi tambahan, penyesuaian pH dengan kapur/belerang, dan pemupukan NPK", "Mencabut semua tanaman kopi", "Menambah sensor baru"], correct: 1, exp: "Benar! Sistem memberikan rekomendasi tindakan spesifik: irigasi jika kelembaban rendah, kapur/belerang jika pH tidak sesuai, pemupukan jika NPK kurang — membantu petani bertindak cepat dan tepat." } },
    ],
  },
}
