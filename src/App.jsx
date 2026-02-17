import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FormPeminjaman from "./pages/FormPeminjaman"; // <--- 1. Import ini dulu
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Area Dashboard (Perlu Login) */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />

        {/* <--- 2. Tambahkan Route baru ini */}
        <Route path="peminjaman/baru" element={<FormPeminjaman />} />
      </Route>
    </Routes>
  );
}

export default App;
