import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";

function ManageGames() {

    //add
    const [games, setGames] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [currency, setCurrency] = useState("");

    //update
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editCurrency, setEditCurrency] = useState("");

    const fetchGames = () => {
        API.get("/games")
            .then(res => setGames(res.data));
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleAdd = async () => {
        await API.post("/games", {
            name,
            image: image,
            currency
        });

        setName("");
        setImage("");
        setCurrency("");

        fetchGames();
    };

    const handleDelete = async (id) => {
        await API.delete(`/games/${ id}`);
        fetchGames();
    };

    const handleEdit = (game) => {
        setEditId(game.id);
        setEditName(game.name);
        setEditImage(game.image);
        setEditCurrency(game.currency);
    };

    const handleUpdate = async () => {
        await API.put(`/games/${editId}`, {
            name: editName,
            image: editImage,
            currency: editCurrency
        });

        setEditId(null);

        fetchGames();
    };

    return (
        <div style={{ display: "flex" }}>
            <AdminSidebar />

            <div style={{ flex: 1, padding: "30px" }}>
                <h1>Manage Games</h1>

                {/* Form Add */}
                <div style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px"
                }}>
                    <input
                        placeholder="Nama Game"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />

                    <input
                        placeholder="Currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    />


                    <button onClick={handleAdd}>
                        Tambah
                    </button>
                </div>

                {/* Table */}
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
                            <th>Image</th>
                            <th>Nama Game</th>
                            <th>Currency</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {games.map(game => (
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>
                                    {editId === game.id ? (
                                        <input
                                            value={editImage}
                                            onChange={(e) => setEditImage(e.target.value)}
                                        />
                                    ) : (
                                        <img
                                            src={game.image}
                                            width="60"
                                            alt=""
                                        />
                                    )}
                                </td>

                                <td>
                                    {editId === game.id ? (
                                        <input
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                        />
                                    ) : (
                                        game.name
                                    )}
                                </td>

                                <td>
                                    {editId === game.id ? (
                                        <input
                                            value={editCurrency}
                                            onChange={(e) => setEditCurrency(e.target.value)}
                                        />
                                    ) : (
                                        game.currency
                                    )}
                                </td>

                                <td>
                                    {editId === game.id ? (
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
                                            <button onClick={() => handleEdit(game)}>
                                                Edit
                                            </button>

                                            <button onClick={() => handleDelete(game.id)}>
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

export default ManageGames;