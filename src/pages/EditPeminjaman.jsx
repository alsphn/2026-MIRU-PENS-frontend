import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPeminjaman() {
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL
  const API_URL = "http://localhost:5106/api/Peminjaman";

  const [formData, setFormData] = useState({
    namaPeminjam: "",
    namaRuangan: "",
    keperluan: "",
    tanggalMulai: "",
    tanggalSelesai: "",
    status: "",
  });

  // 1. AMBIL DATA LAMA (READ)
  useEffect(() => {
    const fetchOldData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        const data = response.data;

        // FORMAT TANGGAL: Backend kirim format panjang, HTML butuh format pendek
        // Kita potong string-nya (ambil 16 karakter pertama: YYYY-MM-DDTHH:MM)
        setFormData({
          ...data,
          tanggalMulai: data.tanggalMulai.substring(0, 16),
          tanggalSelesai: data.tanggalSelesai.substring(0, 16),
        });
      } catch (error) {
        console.error("Gagal ambil data:", error);
        alert("Gagal memuat data edit.");
      }
    };
    fetchOldData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. KIRIM PERUBAHAN (UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tambahkan detik (:00) lagi saat kirim balik ke Backend
    const payload = {
      id: id,
      namaPeminjam: formData.namaPeminjam,
      namaRuangan: formData.namaRuangan,
      keperluan: formData.keperluan,
      tanggalMulai: formData.tanggalMulai + ":00",
      tanggalSelesai: formData.tanggalSelesai + ":00",
      status: formData.status,
    };

    try {
      await axios.put(`${API_URL}/${id}`, payload);
      alert("✅ Data berhasil diperbarui!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Gagal update:", error);
      alert("❌ Gagal update data. Cek console.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        ✏️ Edit Data Peminjaman
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keperluan
          </label>
          <textarea
            name="keperluan"
            value={formData.keperluan}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

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
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 shadow-md"
          >
            Simpan Perubahan 💾
          </button>
        </div>
      </form>
    </div>
  );
}
