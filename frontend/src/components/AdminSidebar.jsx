import { Link, useLocation } from "react-router-dom";
import { 
    LayoutDashboard, 
    Gamepad2, 
    PackageSearch, 
    TicketPercent, 
    Users, 
    Home 
} from "lucide-react";
import "../App.css"; // Impor file CSS

function AdminSidebar() {
    const location = useLocation();

    // Fungsi untuk mengecek apakah link sedang aktif
    const isActive = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <aside className="admin-sidebar">
            {/* Bagian Logo/Header Sidebar */}
            <div className="sidebar-header">
                <h2 className="sidebar-logo">TIP TOP UP <span>ADMIN</span></h2>
            </div>

            {/* Navigasi Menu */}
            <nav className="sidebar-menu">
                <Link to="/admin" className={`sidebar-link ${isActive("/admin")}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                
                <Link to="/admin/games" className={`sidebar-link ${isActive("/admin/games")}`}>
                    <Gamepad2 size={20} />
                    <span>Games</span>
                </Link>
                
                <Link to="/admin/packages" className={`sidebar-link ${isActive("/admin/packages")}`}>
                    <PackageSearch size={20} />
                    <span>Packages</span>
                </Link>
                
                <Link to="/admin/promos" className={`sidebar-link ${isActive("/admin/promos")}`}>
                    <TicketPercent size={20} />
                    <span>Promos</span>
                </Link>
                
                <Link to="/admin/users" className={`sidebar-link ${isActive("/admin/users")}`}>
                    <Users size={20} />
                    <span>Users</span>
                </Link>
            </nav>

            {/* Bagian Bawah (Kembali ke Website User) */}
            <div className="sidebar-footer">
                <Link to="/" className="back-to-home">
                    <Home size={20} />
                    <span>Ke Halaman Utama</span>
                </Link>
            </div>
        </aside>
    );
}

export default AdminSidebar;