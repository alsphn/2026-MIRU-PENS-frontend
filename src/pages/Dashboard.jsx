import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // <--- PENTING: Import ini untuk navigasi

export default function Dashboard() {
  const [peminjamans, setPeminjamans] = useState([]);

  // Pastikan PORT ini sama dengan Backend kamu
  const API_URL = "http://localhost:5106/api/Peminjaman";

  // 1. AMBIL DATA (READ)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setPeminjamans(response.data);
      } catch (error) {
        console.error("Error mengambil data:", error);
      }
    };
    fetchData();
  }, []);

  // 2. HAPUS DATA (DELETE)
  const handleDelete = async (id) => {
    if (confirm("Yakin mau menghapus data ini?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        // Update state agar data langsung hilang dari tabel
        setPeminjamans(peminjamans.filter((item) => item.id !== id));
        alert("✅ Data berhasil dihapus!");
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("❌ Gagal menghapus data. Cek Backend.");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Kecil di dalam Tabel */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">
            Daftar Peminjaman Terbaru
          </h3>
          <p className="text-sm text-gray-500">
            Overview data yang masuk hari ini
          </p>
        </div>

        {/* TOMBOL BUAT BARU (Mengarah ke Form Create) */}
        <Link
          to="/peminjaman/baru"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition shadow-sm font-medium"
        >
          + Buat Baru
        </Link>
      </div>

      {/* Tabel Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="py-4 px-6">Peminjam</th>
              <th className="py-4 px-6">Ruangan</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
            {peminjamans.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">
                  {item.namaPeminjam}
                </td>
                <td className="py-4 px-6">{item.namaRuangan}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "Disetujui"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center flex justify-center items-center space-x-2">
                  {/* TOMBOL EDIT (Mengarah ke Form Edit dengan ID) */}
                  <Link
                    to={`/peminjaman/edit/${item.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </Link>

                  {/* TOMBOL HAPUS */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium ml-2"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* State Kosong */}
        {peminjamans.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            Belum ada data peminjaman yang ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}
