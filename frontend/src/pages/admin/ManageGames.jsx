import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";
import { Plus, Pencil, Trash2, Save, X, Gamepad2, Image as ImageIcon, Coins } from "lucide-react";
import "../../App.css"; // Impor file CSS

function ManageGames() {
    // State Add
    const [games, setGames] = useState([]);
    const [name, setName] = useState("");
    const [currency, setCurrency] = useState("");

    // --- YANG BERUBAH: State untuk file upload ---
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    // State Update (Edit)
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editCurrency, setEditCurrency] = useState("");

    const [editImageFile, setEditImageFile] = useState(null);
    const [editPreview, setEditPreview] = useState("");

    const fetchGames = () => {
        API.get("/games")
            .then(res => setGames(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const maxSize = 2 * 1024 * 1024; // 2MB dalam bytes

        if (!validTypes.includes(file.type)) {
            alert("Format file harus JPG atau PNG!");
            return false;
        }

        if (file.size > maxSize) {
            alert("File kegedean! Maksimal 2MB aja.");
            return false;
        }

        return true;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            if (validateFile(file)) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            } else {
                e.target.value = "";
                setImageFile(null);
                setImagePreview("");
            }
        }
    };

    const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setEditImageFile(file);
        setEditPreview(URL.createObjectURL(file)); // Biar muncul gambar barunya pas dipilih
    }
};

    // --- YANG BERUBAH: Handle Add pakai FormData ---
    const handleAdd = async () => {
        if (!name || !imageFile || !currency) {
            alert("Harap isi semua kolom dan pilih gambar!");
            return;
        }

        // Bungkus data pakai FormData biar file bisa dikirim
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", imageFile); // Kirim file fisik
        formData.append("currency", currency);

        try {
            await API.post("/games", formData, {
                headers: {
                    "Content-Type": "multipart/form-data" // Wajib untuk kirim file
                }
            });

            // Reset Form
            setName("");
            setImageFile(null);
            setImagePreview("");
            setCurrency("");

            // Kosongkan input file di HTML
            document.getElementById('fileInput').value = '';

            fetchGames();
        } catch (error) {
            console.error("Gagal menambah game", error);
            alert("Gagal menambah game");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus game ini? Semua paket dan transaksi terkait game ini akan ikut terhapus.")) {
            try {
                await API.delete(`/games/${id}`);
                alert("Game berhasil dihapus!");
                fetchGames();
            } catch (error) {
                console.error("Gagal menghapus game", error);
                alert("Gagal menghapus game: " + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleEdit = (game) => {
        setEditId(game.id);
        setEditName(game.name);
        setEditImage(game.image); // Edit sementara tetep pakai URL teks
        setEditCurrency(game.currency);
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", editName);
        formData.append("currency", editCurrency);

        // Kalau ada file baru, kirim filenya. Kalau nggak, kirim URL lama aja.
        if (editImageFile) {
            formData.append("image", editImageFile);
        } else {
            formData.append("image", editImage);
        }

        try {
            await API.put(`/games/${editId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setEditId(null);
            setEditImageFile(null);
            setEditPreview("");
            fetchGames();
            alert("Game berhasil diupdate!");
        } catch (error) {
            console.error("Gagal mengupdate game", error);
            alert("Gagal mengupdate game: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <div className="admin-header">
                    <div>
                        <h1 className="page-title">Manage Games</h1>
                        <p className="page-subtitle">Kelola daftar game, gambar, dan mata uang top up.</p>
                    </div>
                </div>

                {/* Form Tambah Game */}
                <div className="admin-card add-form-card">
                    <h2 className="card-title"><Plus size={18} /> Tambah Game Baru</h2>
                    <div className="form-row">
                        <div className="input-with-icon">
                            <Gamepad2 size={18} className="input-icon" />
                            <input
                                placeholder="      Nama Game"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="admin-input"
                            />
                        </div>

                        {/* --- YANG BERUBAH: Input type="file" --- */}
                        <div className="input-with-icon">
                            <ImageIcon size={18} className="input-icon" />
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="admin-input"
                                style={{ padding: "9px 15px 9px 40px", cursor: "pointer" }}
                            />
                        </div>

                        <div className="input-with-icon">
                            <Coins size={18} className="input-icon" />
                            <input
                                placeholder="      Mata Uang"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="admin-input"
                            />
                        </div>
                        <button onClick={handleAdd} className="btn-add">
                            <Plus size={18} /> Tambah
                        </button>
                    </div>

                    {/* --- YANG BERUBAH: Preview gambar sebelum diupload --- */}
                    {imagePreview && (
                        <div style={{ marginTop: "15px" }}>
                            <p style={{ fontSize: "12px", color: "gray", marginBottom: "8px" }}>Preview Cover:</p>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "2px solid #8b5cf6" }}
                            />
                        </div>
                    )}
                </div>

                {/* Tabel Daftar Game (Tetap sama seperti kode lu) */}
                <div className="admin-card table-card">
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cover</th>
                                    <th>Nama Game</th>
                                    <th>Currency</th>
                                    <th className="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {games.length > 0 ? games.map(game => (
                                    <tr key={game.id}>
                                        <td className="id-cell">#{game.id}</td>

                                        {/* Kolom Image */}
                                        <td>
                                            {editId === game.id ? (
                                                <div className="edit-img-container">
                                                    <input type="file" onChange={handleEditImageChange} className="admin-input" />
                                                    {(editPreview || editImage) && (
                                                        <img src={editPreview || editImage} alt="preview" style={{ width: '40px', marginTop: '5px' }} />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="game-img-preview">
                                                    <img src={game.image} alt={game.name} />
                                                </div>
                                            )}
                                        </td>

                                        {/* Kolom Nama Game */}
                                        <td className="name-cell">
                                            {editId === game.id ? (
                                                <input
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="admin-input edit-input"
                                                />
                                            ) : (
                                                game.name
                                            )}
                                        </td>

                                        {/* Kolom Currency */}
                                        <td>
                                            {editId === game.id ? (
                                                <input
                                                    value={editCurrency}
                                                    onChange={(e) => setEditCurrency(e.target.value)}
                                                    className="admin-input edit-input"
                                                />
                                            ) : (
                                                <span className="currency-badge">{game.currency}</span>
                                            )}
                                        </td>

                                        {/* Kolom Aksi */}
                                        <td className="action-cell text-center">
                                            {editId === game.id ? (
                                                <div className="action-buttons">
                                                    <button onClick={handleUpdate} className="btn-action btn-save" title="Save">
                                                        <Save size={16} />
                                                    </button>
                                                    <button onClick={() => setEditId(null)} className="btn-action btn-cancel" title="Cancel">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="action-buttons">
                                                    <button onClick={() => handleEdit(game)} className="btn-action btn-edit" title="Edit">
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(game.id)} className="btn-action btn-delete" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="empty-table">Belum ada game yang ditambahkan.</td>
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

export default ManageGames;