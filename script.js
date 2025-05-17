// Data guru (perbaikan koma dan kurung)
const guru = [
  { nama: "Danu Priyono S.Pd", mapel: "Geografi" },
  { nama: "Maringan Simanjuntak S.Pd, M.M", mapel: "Matematika" },
  { nama: "Hotmaritcon M.Pd", mapel: "Bahasa Inggris Tingkat Lanjut" },
  { nama: "Laura Wini Febrin S.Pd", mapel: "Ekonomi" },
  { nama: "Dewi Ambasari S.Sos", mapel: "Sosiologi" },
  { nama: "Drs. Khasan Bisri", mapel: "Agama Islam" },
  { nama: "Sari Hidayati S.Kom", mapel: "Informatika" },   // koma ini kurang
  { nama: "Drs. Sjaiful Bachri", mapel: "Bahasa Inggris Wajib" }, // koma
  { nama: "Nita Yulianti S.Pd", mapel: "Seni Budaya" }, // koma
  { nama: "Maryetni S.Pd", mapel: "Sejarah" },  // kurung tutup kurang
  { nama: "Rita Hariyanti S.Pd", mapel: "Pjok" },
  { nama: "Joko Ilmiyanto M.Pd", mapel: "Bahasa Indonesia" },
  { nama: "Titi Lidianingrum S.Pd", mapel: "Ppkn" }
];

// Fungsi untuk isi alumni jika ada di halaman
const alumniList = document.getElementById("daftar-alumni");
if (alumniList) {
  alumni.forEach((nama) => {
    const li = document.createElement("li");
    li.textContent = nama;
    alumniList.appendChild(li);
  });
}

// Fungsi untuk isi guru jika ada di halaman
const guruList = document.getElementById("daftar-guru");
if (guruList) {
  guru.forEach((guru) => {
    const li = document.createElement("li");
    li.textContent = `${guru.nama} - ${guru.mapel}`;
    guruList.appendChild(li);
  });
}