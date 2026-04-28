import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";
import { Users, ShoppingBag, Wallet, ShieldAlert, Activity } from "lucide-react";
import "../../App.css"; // Impor file CSS

function AdminDashboard() {
    const [stats, setStats] = useState({});
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        // Ambil data stats dan orders secara bersamaan
        Promise.all([
            API.get("/admin/stats"),
            API.get("/admin/orders")
        ])
        .then(([resStats, resOrders]) => {
            setStats(resStats.data);
            setOrders(resOrders.data);
        })
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false));
    }, []);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(number || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }).format(new Date(dateString));
    };

    // Tampilan jika user bukan admin
    if (user?.role !== "admin") {
        return (
            <div className="unauthorized-page">
                <ShieldAlert size={64} className="error-icon" />
                <h1>Access Denied</h1>
                <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            {/* Sidebar Komponen Kamu */}
            <AdminSidebar />

            {/* Konten Utama */}
            <div className="admin-content">
                <div className="admin-header">
                    <div>
                        <h1 className="page-title">Dashboard Overview</h1>
                        <p className="page-subtitle">Selamat datang kembali, Admin {user?.username}!</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="admin-loading">Memuat data dashboard...</div>
                ) : (
                    <>
                        {/* Kartu Statistik */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon-wrapper users-icon">
                                    <Users size={24} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Users</span>
                                    <h3 className="stat-value">{stats.total_users || 0}</h3>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon-wrapper orders-icon">
                                    <ShoppingBag size={24} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Orders</span>
                                    <h3 className="stat-value">{stats.total_orders || 0}</h3>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon-wrapper revenue-icon">
                                    <Wallet size={24} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Revenue</span>
                                    <h3 className="stat-value">{formatRupiah(stats.total_revenue)}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Tabel Transaksi */}
                        <div className="admin-panel">
                            <div className="panel-header">
                                <h2><Activity size={20} /> Transaksi Terbaru</h2>
                            </div>
                            
                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Game</th>
                                            <th>Package</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length > 0 ? (
                                            orders.map(order => (
                                                <tr key={order.id}>
                                                    <td className="user-cell">{order.username}</td>
                                                    <td>{order.game_name}</td>
                                                    <td>{order.amount}</td>
                                                    <td className="price-cell">{formatRupiah(order.total_price)}</td>
                                                    <td>
                                                        <span className={`admin-status-badge ${(order.status || "").toLowerCase()}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="date-cell">{formatDate(order.created_at)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="empty-table">Belum ada transaksi</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;