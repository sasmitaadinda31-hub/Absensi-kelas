# Hadirin — Website Absensi Kelas

Website absensi kelas statis dengan 3 halaman: Beranda, Tentang, dan Riwayat.

## Fitur
- Tambah absensi dengan status Hadir, Izin, Sakit, atau Alpa.
- Validasi nama dengan JavaScript.
- Pencarian nama, hapus data, dan unduh riwayat CSV.
- Dark/light mode.
- Penyimpanan menggunakan `localStorage` (tanpa database cloud).
- Desain responsif untuk HP dan laptop.

## Menjalankan di komputer
Buka `index.html` melalui browser. Tidak memerlukan instalasi atau server.

## Upload dan publish ke GitHub Pages
1. Buat repository baru di GitHub, misalnya `absensi-kelas`.
2. Upload seluruh file: `index.html`, `about.html`, `riwayat.html`, `style.css`, `script.js`, dan `README.md`.
3. Buka **Settings → Pages** pada repository.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu tekan **Save**.
6. Tunggu beberapa saat. GitHub akan menampilkan alamat website pada bagian Pages.

Catatan: data tersimpan hanya pada browser dan perangkat masing-masing. Data tidak otomatis terkumpul ke satu akun guru atau tersinkron ke perangkat lain.
