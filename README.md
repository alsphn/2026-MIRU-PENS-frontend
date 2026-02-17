# 2026-MIRU-PENS-frontend

**Sistem Peminjaman Ruangan (Room Booking System)**

Frontend aplikasi web untuk manajemen peminjaman ruangan di lingkungan PENS. Proyek ini dibuat menggunakan React.js sebagai bagian dari Tugas Pendahuluan Track PBL 2026.

## 🚀 Fitur Utama

Aplikasi ini memiliki fitur lengkap (CRUD) dengan pemisahan hak akses (Role-Based Access Control) antara Mahasiswa dan Admin:

### 1. Public & Authentication

- **Halaman Overview:** Landing page informatif untuk pengguna umum.
- **Simulasi Login:** Mekanisme login sederhana untuk memilih peran sebagai **Mahasiswa** atau **Admin**.

### 2. Dashboard Mahasiswa

- **Ajukan Peminjaman:** Form input lengkap untuk meminjam ruangan (Nama, Ruangan, Waktu, Keperluan).
- **Monitoring Status:** Melihat status pengajuan real-time (Menunggu, Disetujui, Ditolak).
- **Manajemen Data:** Mengedit detail pengajuan atau membatalkan (hapus) peminjaman sendiri.

### 3. Dashboard Admin

- **Approval Workflow:** Fitur eksklusif untuk menyetujui (✔) atau menolak (✖) pengajuan yang masuk.
- **Smart Search:** Kolom pencarian untuk memfilter data berdasarkan Nama Peminjam, Ruangan, atau Status.
- **Visualisasi Status:** Indikator warna badge status (Kuning: Menunggu, Hijau: Disetujui, Merah: Ditolak).
- **Full Control:** Akses penuh untuk mengedit dan menghapus data apapun.

---

## 🛠️ Teknologi yang Digunakan

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **State Management:** React Hooks (useState, useEffect)
- **Version Control:** Git & GitHub (Branching Strategy)

---

## 📦 Cara Instalasi & Menjalankan (Installation)

Pastikan **Node.js** sudah terinstall di komputer Anda.

1.  **Clone Repository**

    ```bash
    git clone [https://github.com/username-kamu/2026-MIRU-PENS-frontend.git](https://github.com/username-kamu/2026-MIRU-PENS-frontend.git)
    cd 2026-MIRU-PENS-frontend
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Jalankan Backend (Penting)**
    Pastikan aplikasi Backend (.NET API) sudah berjalan di port default:
    `http://localhost:5106`

4.  **Jalankan Frontend**

    ```bash
    npm run dev
    ```

5.  **Akses Aplikasi**
    Buka browser dan kunjungi: `http://localhost:5173`

---

## 🧪 Panduan Pengujian (Testing Scenario)

Karena aplikasi ini menggunakan simulasi autentikasi (`localStorage`), berikut cara menguji fitur berdasarkan peran:

### Skenario A: Sebagai Mahasiswa

1.  Di halaman Login, klik tombol **"Masuk sbg Mahasiswa"**.
2.  Pergi ke Dashboard -> Klik **"+ Buat Baru"**.
3.  Isi form pengajuan -> Simpan.
4.  Data akan muncul di tabel dengan status **"Menunggu"**.
5.  _Perhatikan: Anda TIDAK akan melihat tombol Centang (✔) atau Silang (✖)._

### Skenario B: Sebagai Admin

1.  Logout, lalu login kembali pilih **"Masuk sbg Admin"**.
2.  Pergi ke Dashboard.
3.  Pada data yang berstatus "Menunggu", tombol Aksi Admin (✔ / ✖) akan muncul.
4.  Klik **Setujui (✔)** -> Status berubah hijau.
5.  Gunakan kolom **Search** di atas tabel untuk mencari nama peminjam.

---

**Dibuat oleh:**
[Isi Nama Lengkap Kamu Disini]
Teknik Informatika - PENS

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
