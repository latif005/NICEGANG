import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";

function AdminDashboard() {

    const [stats, setStats] = useState({});
    const [orders, setOrders] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        API.get("/admin/stats")
            .then(res => setStats(res.data));

        API.get("/admin/orders")
            .then(res => setOrders(res.data));

    }, []);

    if (user?.role !== "admin") {
        return <h1>Unauthorized</h1>;
    }

    return (
        <div style={{ display: "flex" }}>
            
            <AdminSidebar />

            <div style={{ padding: "30px", flex: 1 }}>
                
                <h1>Admin Dashboard</h1>

                <div style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "30px"
                }}>
                    <div>👤 Users: {stats.total_users}</div>
                    <div>🧾 Orders: {stats.total_orders}</div>
                    <div>💰 Revenue: Rp {stats.total_revenue}</div>
                </div>

                <h2>Semua Transaksi</h2>

                <table border="1" cellPadding="10" style={{ width: "100%" }}>
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
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.username}</td>
                                <td>{order.game_name}</td>
                                <td>{order.amount}</td>
                                <td>Rp {order.total_price}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default AdminDashboard;