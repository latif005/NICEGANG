# 🎮 TIP TOP UP - Game Online Top Up Platform

Platform layanan top up game online berbasis web yang dirancang untuk memudahkan pengguna dalam melakukan pembelian item atau mata uang virtual game favorit mereka secara cepat, aman, dan efisien.

Proyek ini merupakan hasil pengembangan dari tim **NICEGANG** untuk mata kuliah **Perancangan dan Pengembangan Web (Fullstack)** di **STT Terpadu Nurul Fikri**.

---

## ✨ Fitur Utama

### 👤 Fitur Pengguna (User)
* **Autentikasi Aman**: Registrasi dan Login pengguna dengan sistem keamanan berbasis Token (*Protected Routes* & JWT).
* **Katalog Game & Paket**: Menampilkan berbagai pilihan game beserta paket top-up dengan antarmuka yang dinamis.
* **Sistem Checkout**: Proses pemesanan 3 langkah yang mudah dan cepat (Pilih Paket, Masukkan ID Game, Pembayaran).
* **Riwayat Transaksi**: Melacak status pembayaran dan riwayat top-up langsung dari dashboard pengguna.
* **Manajemen Profil**: Pengguna dapat mengubah nama pengguna dan mengunggah foto profil (didukung oleh middleware Multer).

### 👨‍💻 Fitur Administrator (Admin)
* **Dashboard Intuitif**: Ringkasan data operasional platform.
* **Manajemen Penuh (Full CRUD Operation)**:
  * Kelola Data Pengguna (*Users*)
  * Kelola Katalog Game (*Games*)
  * Kelola Paket Top-up (*Packages*)
  * Kelola & Validasi Transaksi (*Transactions*)

---

## 🛠️ Teknologi yang Digunakan

**Frontend:**
* [React.js](https://reactjs.org/) (diinisiasi dengan Vite)
* [React Router DOM](https://reactrouter.com/) (Implementasi *Single Page Application* / SPA)
* [Axios](https://axios-http.com/) (Konsumsi Rest API)
* Vanilla CSS (Styling antarmuka)

**Backend:**
* [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) (Server & Rest API)
* [MySQL](https://www.mysql.com/) (Database relasional)
* Multer (Penanganan unggahan file & *Static File Handling*)
* JWT & Middleware (Autentikasi, otorisasi rute, dan validasi keamanan)

---

## 🚀 Cara Instalasi dan Menjalankan Secara Lokal

### Persyaratan Sistem
* Node.js & npm telah terinstal di komputer.
* XAMPP / Laragon (atau layanan database MySQL lokal lainnya).

### Langkah-langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone [https://github.com/umaralf246/repo-tiptopup.git](https://github.com/umaralf246/repo-tiptopup.git)
   cd repo-tiptopup
   ```

2. Setup Backend (Server)

   ```bash
   cd backend
   npm install
   ```

   - Buat database MySQL baru (misalnya: tiptopup_db).
   
   - Salin file konfigurasi environment dari .env.example menjadi .env lalu atur kredensial koneksi database (Host, User, Password, Database).
   
   - Import struktur database / jalankan file migrasi .sql yang tersedia.
   
   - Jalankan server backend:

   ```bash
   npm run dev
   //atau node index.js
   ```

3. Setup Frontend (Client)
   Buka terminal/command prompt baru dan jalankan:
   
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Buka Aplikasi
   Buka browser dan akses aplikasi melalui URL lokal yang diberikan oleh Vite (biasanya berjalan di http://localhost:5173).


👥 Tim Pengembang (NICEGANG)

Dosen Pengampu: Akhmad Arip, S.Kom.

Umar Al Faruq (0110224093) 

Adinda Angesti Chandra (0110224052) 

Angeliq Mexgaputri Prameswari (0110224217) 

Autum Zebtotanel (0110224058) 

Latif Wibowo (0110224065) 

© 2026 STT Terpadu Nurul Fikri - Program Studi Teknik Informatika
