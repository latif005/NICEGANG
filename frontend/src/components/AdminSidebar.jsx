import { Link } from "react-router-dom";

function AdminSidebar() {
    return (
        <div style={{
            width: "220px",
            background: "#111",
            color: "white",
            minHeight: "100vh",
            padding: "20px"
        }}>
            <h2>Admin Panel</h2>

            <Link to="/admin">Dashboard</Link><br />
            <Link to="/admin/games">Games</Link><br />
            <Link to="/admin/packages">Packages</Link><br />
            <Link to="/admin/promos">Promos</Link><br />
            <Link to="/admin/users">Users</Link>
        </div>
    );
}

export default AdminSidebar;