import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [peminjamans, setPeminjamans] = useState([]);

  // Pastikan PORT ini sama dengan Backend kamu
  const API_URL = "http://localhost:5106/api/Peminjaman";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setPeminjamans(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Dashboard */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Peminjaman
            </h1>
            <p className="text-gray-500">
              Kelola data peminjaman ruangan di sini.
            </p>
          </div>
          <Link to="/" className="text-red-500 font-medium hover:underline">
            Logout
          </Link>
        </div>

        {/* Tabel Data */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-6">Peminjam</th>
                <th className="py-3 px-6">Ruangan</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {peminjamans.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 font-medium">{item.namaPeminjam}</td>
                  <td className="py-3 px-6">{item.namaRuangan}</td>
                  <td className="py-3 px-6">
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
                  <td className="py-3 px-6 text-center">
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold mr-3">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700 text-sm font-semibold">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {peminjamans.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              Belum ada data peminjaman.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
