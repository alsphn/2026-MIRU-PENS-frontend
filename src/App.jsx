import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // 1. Siapkan tempat penyimpanan data (State)
  const [peminjamans, setPeminjamans] = useState([]);

  // 2. Fungsi untuk mengambil data (nanti disambung ke Backend)
  // Ganti URL ini sesuai port backend kamu (cek di terminal backend, misal 5106)
  const API_URL = "http://localhost:5106/api/Peminjaman";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("Data dari API:", response.data); // Cek di Console Browser
        setPeminjamans(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        alert("Gagal konek ke backend! Cek apakah backend nyala?");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>📅 Dashboard Peminjaman Ruangan</h1>
      <p>Berikut adalah daftar peminjaman yang masuk sistem.</p>

      {/* Tabel Data */}
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}
      >
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>No</th>
            <th>Peminjam</th>
            <th>Ruangan</th>
            <th>Waktu</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {peminjamans.map((item, index) => (
            <tr key={item.id}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td>{item.namaPeminjam}</td>
              <td>{item.namaRuangan}</td>
              <td>
                {new Date(item.tanggalMulai).toLocaleString()} <br />
                s/d <br />
                {new Date(item.tanggalSelesai).toLocaleTimeString()}
              </td>
              <td style={{ textAlign: "center" }}>
                <span
                  style={{
                    background:
                      item.status === "Disetujui" ? "#d4edda" : "#fff3cd",
                    color: item.status === "Disetujui" ? "#155724" : "#856404",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {item.status}
                </span>
              </td>
              <td style={{ textAlign: "center" }}>
                <button style={{ cursor: "pointer", marginRight: "5px" }}>
                  Edit
                </button>
                <button
                  style={{
                    cursor: "pointer",
                    background: "#ffcccc",
                    border: "1px solid red",
                    color: "red",
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
