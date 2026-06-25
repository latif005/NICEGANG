import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";
import { Users, Trash2, User as UserIcon, Mail, ShieldAlert } from "lucide-react";
import "../../App.css"; // Impor file CSS

function ManageUsers() {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        API.get("/users")
            // .then(res => setUsers(res.data))
            .then(res => {
                console.log("Data dari API:", res.data);
                // Kalau datanya dibungkus objek 'data', ganti jadi: setUsers(res.data.data)
                setUsers(res.data);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin ingin menghapus user ini secara permanen?")) return;

        try {
            await API.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Gagal menghapus user", error);
            alert("Gagal menghapus user");
        }
    };

    const handleRoleChange = async (id, newRole) => {
        if (!window.confirm(`Yakin ingin mengubah role user ini menjadi ${newRole.toUpperCase()}?`)) return;

        try {
            await API.put(`/users/${id}`, {
                role: newRole
            });
            fetchUsers();
        } catch (error) {
            console.error("Gagal mengubah role", error);
            alert("Gagal mengubah role");
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <div className="admin-header">
                    <div>
                        <h1 className="page-title">Manage Users</h1>
                        <p className="page-subtitle">Kelola data pelanggan dan hak akses administrator.</p>
                    </div>
                </div>

                {/* Tabel Daftar User */}
                <div className="admin-card table-card">
                    <div className="card-header-simple">
                        <h2><Users size={20} /> Daftar Pengguna Terdaftar</h2>
                    </div>

                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role Akses</th>
                                    <th className="text-center">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.length > 0 ? users.map(user => (
                                    <tr key={user.id}>
                                        <td className="id-cell">#{user.id}</td>

                                        <td className="user-info-cell">
                                            <div className="user-profile">
                                                <div className="user-avatar">
                                                    <UserIcon size={16} />
                                                </div>
                                                <span className="username-text">{user.username}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="email-flex">
                                                <Mail size={14} className="icon-muted" />
                                                {user.email}
                                            </div>
                                        </td>

                                        <td>
                                            {/* Dropdown Role yang bergaya seperti Badge */}
                                            <div className="role-select-wrapper">
                                                {user.role === 'admin' && <ShieldAlert size={14} className="role-icon admin-icon" />}
                                                <select
                                                    className={`role-select ${user.role}`}
                                                    value={user.role}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </td>

                                        <td className="action-cell text-center">
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn-action btn-delete"
                                                    title="Hapus User"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="empty-table">Belum ada user yang terdaftar.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ManageUsers;