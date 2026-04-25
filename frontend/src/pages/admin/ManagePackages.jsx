import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";

function ManagePackages() {

    const [games, setGames] = useState([]);
    const [packages, setPackages] = useState([]);
    const [gameId, setGameId] = useState("");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");

    const [editId, setEditId] = useState(null);
    const [editAmount, setEditAmount] = useState("");
    const [editPrice, setEditPrice] = useState("");

    useEffect(() => {
        API.get("/games").then(res => setGames(res.data));
    }, []);

    const fetchPackages = (id) => {
        API.get(`/packages/${id}`).then(res => setPackages(res.data));
    };

    const handleAdd = async () => {
        await API.post("/packages", {
            game_id: gameId,
            amount,
            price
        });

        fetchPackages(gameId);
    };

    const handleDelete = async (id) => {
        await API.delete(`/packages/${id}`);
        fetchPackages(gameId);
    };

    const handleEdit = (pkg) => {
        setEditId(pkg.id);
        setEditAmount(pkg.amount);
        setEditPrice(pkg.price);
    };

    const handleUpdate = async () => {
        await API.put(`/packages/${editId}`, {
            amount: editAmount,
            price: editPrice
        });

        setEditId(null);
        fetchPackages(gameId);
    };

    return (
        <div style={{ display: "flex" }}>
            <AdminSidebar />

            <div style={{ padding: "30px", flex: 1 }}>
                <h1>Manage Packages</h1>

                {/* SELECT GAME */}
                <select onChange={(e) => {
                    setGameId(e.target.value);
                    fetchPackages(e.target.value);
                }}>
                    <option>Pilih Game</option>
                    {games.map(g => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                {/* FORM */}
                <input placeholder="Amount" onChange={e => setAmount(e.target.value)} />
                <input placeholder="Price" onChange={e => setPrice(e.target.value)} />

                <button onClick={handleAdd}>Tambah</button>

                {/* TABLE */}
                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
    {packages.map(p => (
        <tr key={p.id}>
            <td>
                {editId === p.id ? (
                    <input
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                    />
                ) : (
                    p.amount
                )}
            </td>

            <td>
                {editId === p.id ? (
                    <input
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                    />
                ) : (
                    p.price
                )}
            </td>

            <td>
                {editId === p.id ? (
                    <>
                        <button onClick={handleUpdate}>
                            Save
                        </button>

                        <button onClick={() => setEditId(null)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleEdit(p)}>
                            Edit
                        </button>

                        <button onClick={() => handleDelete(p.id)}>
                            Delete
                        </button>
                    </>
                )}
            </td>
        </tr>
    ))}
</tbody>
                </table>

            </div>
        </div>
    );
}

export default ManagePackages;