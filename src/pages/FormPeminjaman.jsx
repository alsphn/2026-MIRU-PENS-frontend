import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FormPeminjaman() {
  const navigate = useNavigate();

  // 1. UPDATE STATE: Tambahkan field "keperluan"
  const [formData, setFormData] = useState({
    namaPeminjam: "",
    namaRuangan: "",
    keperluan: "", // <--- INI PENTING!
    tanggalMulai: "",
    tanggalSelesai: "",
    status: "Menunggu",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:5106/api/Peminjaman";

    // 2. UPDATE PAYLOAD: Masukkan "keperluan" ke paket yang dikirim
    const payload = {
      namaPeminjam: formData.namaPeminjam,
      namaRuangan: formData.namaRuangan,
      keperluan: formData.keperluan, // <--- JANGAN LUPA DIKIRIM
      tanggalMulai: formData.tanggalMulai + ":00",
      tanggalSelesai: formData.tanggalSelesai + ":00",
      status: "Menunggu",
    };

    console.log("Sedang mengirim data:", payload);

    try {
      await axios.post(API_URL, payload);
      alert("✅ Peminjaman berhasil diajukan!");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Detail Error:",
        error.response ? error.response.data : error.message,
      );
      const pesanError =
        error.response && error.response.data && error.response.data.errors
          ? JSON.stringify(error.response.data.errors)
          : "Cek Backend!";
      alert(`❌ Gagal: ${pesanError}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        📝 Form Pengajuan Peminjaman
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Peminjam
          </label>
          <input
            type="text"
            name="namaPeminjam"
            value={formData.namaPeminjam}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Contoh: Budi Santoso (Mahasiswa)"
          />
        </div>

        {/* Input Ruangan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ruangan
          </label>
          <select
            name="namaRuangan"
            value={formData.namaRuangan}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">-- Pilih Ruangan --</option>
            <option value="Lab RPL">Lab RPL</option>
            <option value="Ruang Sidang">Ruang Sidang</option>
            <option value="Auditorium">Auditorium</option>
            <option value="Kelas A-101">Kelas A-101</option>
          </select>
        </div>

        {/* 3. INPUT BARU: KEPERLUAN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keperluan / Kegiatan
          </label>
          <textarea
            name="keperluan"
            value={formData.keperluan}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Contoh: Rapat Himpunan Mahasiswa / Workshop UI/UX"
          />
        </div>

        {/* Input Tanggal */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waktu Mulai
            </label>
            <input
              type="datetime-local"
              name="tanggalMulai"
              value={formData.tanggalMulai}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waktu Selesai
            </label>
            <input
              type="datetime-local"
              name="tanggalSelesai"
              value={formData.tanggalSelesai}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Kirim Pengajuan 🚀
          </button>
        </div>
      </form>
    </div>
  );
}
