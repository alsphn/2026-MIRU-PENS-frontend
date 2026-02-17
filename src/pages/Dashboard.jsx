import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [peminjamans, setPeminjamans] = useState([]);
  const API_URL = "http://localhost:5106/api/Peminjaman";

  // 1. AMBIL DATA
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

  // 2. HAPUS DATA
  const handleDelete = async (id) => {
    if (confirm("Yakin mau menghapus data ini?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setPeminjamans(peminjamans.filter((item) => item.id !== id));
        alert("✅ Data berhasil dihapus!");
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("❌ Gagal menghapus data.");
      }
    }
  };

  // 3. FUNGSI BARU: UBAH STATUS (APPROVE / REJECT)
  const handleStatus = async (id, newStatus) => {
    try {
      // Cari data item yang mau diubah dulu (karena PUT butuh semua data)
      const itemToUpdate = peminjamans.find((p) => p.id === id);

      // Siapkan data baru dengan status yang berubah
      const updatedItem = {
        ...itemToUpdate,
        status: newStatus,
      };

      // Kirim ke Backend
      await axios.put(`${API_URL}/${id}`, updatedItem);

      // Update tampilan tabel lokal (biar gak perlu refresh page)
      setPeminjamans(
        peminjamans.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );

      alert(`✅ Status berhasil diubah menjadi: ${newStatus}`);
    } catch (error) {
      console.error("Gagal update status:", error);
      alert("❌ Gagal mengubah status. Cek Backend.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">
            Dashboard Peminjaman
          </h3>
          <p className="text-sm text-gray-500">Kelola persetujuan ruangan</p>
        </div>
        <Link
          to="/peminjaman/baru"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Buat Baru
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="py-4 px-6">Peminjam</th>
              <th className="py-4 px-6">Ruangan</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center w-64">Aksi Admin</th>{" "}
              {/* Kolom diperlebar */}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
            {peminjamans.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-900">
                  {item.namaPeminjam}
                </td>
                <td className="py-4 px-6">{item.namaRuangan}</td>

                {/* STATUS BADGE */}
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "Disetujui"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Ditolak"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700" // Warna untuk "Menunggu"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* KOLOM AKSI (Approval + Edit/Delete) */}
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center items-center gap-2">
                    {/* HANYA TAMPIL JIKA STATUS MASIH 'Menunggu' */}
                    {item.status === "Menunggu" && (
                      <>
                        <button
                          onClick={() => handleStatus(item.id, "Disetujui")}
                          title="Setujui"
                          className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-800 flex items-center justify-center transition"
                        >
                          ✔
                        </button>
                        <button
                          onClick={() => handleStatus(item.id, "Ditolak")}
                          title="Tolak"
                          className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 flex items-center justify-center transition"
                        >
                          ✖
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1"></div>{" "}
                        {/* Garis Pemisah */}
                      </>
                    )}

                    {/* Tombol CRUD Biasa */}
                    <Link
                      to={`/peminjaman/edit/${item.id}`}
                      className="text-blue-500 hover:text-blue-700 font-medium text-xs"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-400 hover:text-red-500 font-medium text-xs"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {peminjamans.length === 0 && (
          <div className="p-8 text-center text-gray-400">Data kosong.</div>
        )}
      </div>
    </div>
  );
}
