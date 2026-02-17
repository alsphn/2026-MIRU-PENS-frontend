import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">MIRU System</h1>
      <p className="text-xl text-gray-600 mb-8">
        Sistem Peminjaman Ruangan PENS
      </p>

      <div className="flex gap-4">
        {/* Tombol Navigasi */}
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login Pengguna
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Lihat Dashboard (Demo)
        </Link>
      </div>
    </div>
  );
}
