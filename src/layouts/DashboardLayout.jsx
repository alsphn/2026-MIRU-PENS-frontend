import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();
  const sidebarMenu = [
    { path: "/dashboard", label: "📊 Dashboard", active: true },
    { path: "/peminjaman/baru", label: "➕ Ajukan Peminjaman", active: false },
    { path: "/ruangan", label: "🏢 Daftar Ruangan", active: false },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">MIRU Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            🚪 Logout
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">
            Selamat Datang, Admin
          </h2>
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
