import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FormPeminjaman from "./pages/FormPeminjaman";
import DashboardLayout from "./layouts/DashboardLayout";
import EditPeminjaman from "./pages/EditPeminjaman";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Area Dashboard (Perlu Login) */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="peminjaman/baru" element={<FormPeminjaman />} />
        <Route path="peminjaman/edit/:id" element={<EditPeminjaman />} />
      </Route>
    </Routes>
  );
}

export default App;
