import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // 1. Simpan Role ke Local Storage (Memori Browser)
    localStorage.setItem("userRole", role);

    // 2. Beri pesan selamat datang
    alert(`Login berhasil! Selamat datang, ${role}.`);

    // 3. Pindah ke Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Masuk ke MIRU
        </h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleLogin("Mahasiswa")}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Masuk sbg Mahasiswa
          </button>
          <button
            onClick={() => handleLogin("Admin")}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
          >
            Masuk sbg Admin
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Belum punya akun? Hubungi Admin.
        </p>
      </div>
    </div>
  );
}
