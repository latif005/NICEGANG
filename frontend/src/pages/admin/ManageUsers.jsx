import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        API.get("/users").then(res => setUsers(res.data));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Yakin mau hapus user?")) return;

        await API.delete(`/users/${id}`);
        fetchUsers();
    };

    const handleRoleChange = async (id, newRole) => {
        await API.put(`/users/${id}`, {
            role: newRole
        });

        fetchUsers();
    };

    return (
        <div style={{ display: "flex" }}>
            <AdminSidebar />

            <div style={{ flex: 1, padding: "30px" }}>
                <h1>Manage Users</h1>

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "left"
                    }}
                >
                    <thead style={{ background: "#111", color: "white" }}>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>

                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(user.id, e.target.value)
                                        }
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>

                                <td>
                                    <button
                                        style={{
                                            background: "red",
                                            color: "white"
                                        }}
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default ManageUsers;