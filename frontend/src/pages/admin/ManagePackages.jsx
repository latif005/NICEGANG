import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";
import { 
    Gamepad2, Layers, DollarSign, Plus, 
    Pencil, Trash2, Save, X, PackageOpen 
} from "lucide-react";
import "../../App.css"; // Impor file CSS

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
        API.get("/games")
            .then(res => setGames(res.data))
            .catch(err => console.error(err));
    }, []);

    const fetchPackages = (id) => {
        if (!id) return;
        API.get(`/packages/${id}`)
            .then(res => setPackages(res.data))
            .catch(err => console.error(err));
    };

    const handleAdd = async () => {
        if (!gameId || !amount || !price) {
            alert("Harap pilih game dan isi semua kolom paket!");
            return;
        }

        try {
            await API.post("/packages", {
                game_id: gameId,
                amount,
                price
            });
            setAmount("");
            setPrice("");
            fetchPackages(gameId);
        } catch (error) {
            console.error("Gagal menambah paket", error);
            alert("Gagal menambah paket");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus paket ini?")) {
            try {
                await API.delete(`/packages/${id}`);
                fetchPackages(gameId);
            } catch (error) {
                console.error("Gagal menghapus paket", error);
            }
        }
    };

    const handleEdit = (pkg) => {
        setEditId(pkg.id);
        setEditAmount(pkg.amount);
        setEditPrice(pkg.price);
    };

    const handleUpdate = async () => {
        try {
            await API.put(`/packages/${editId}`, {
                amount: editAmount,
                price: editPrice
            });
            setEditId(null);
            fetchPackages(gameId);
        } catch (error) {
            console.error("Gagal mengupdate paket", error);
            alert("Gagal mengupdate paket");
        }
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(number);
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <div className="admin-header">
                    <div>
                        <h1 className="page-title">Manage Packages</h1>
                        <p className="page-subtitle">Kelola nominal item dan harga untuk setiap game.</p>
                    </div>
                </div>

                {/* Card Pilih Game */}
                <div className="admin-card select-game-card">
                    <div className="input-with-icon select-wrapper">
                        <Gamepad2 size={20} className="input-icon" />
                        <select 
                            className="admin-select"
                            value={gameId}
                            onChange={(e) => {
                                setGameId(e.target.value);
                                fetchPackages(e.target.value);
                                setEditId(null); // Reset edit state saat ganti game
                            }}
                        >
                            <option value="">Pilih Game Terlebih Dahulu</option>
                            {games.map(g => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tampilkan Form & Tabel HANYA JIKA Game Sudah Dipilih */}
                {gameId ? (
                    <>
                        {/* Form Tambah Paket */}
                        <div className="admin-card add-form-card">
                            <h2 className="card-title"><Plus size={18} /> Tambah Paket Baru</h2>
                            <div className="form-row">
                                <div className="input-with-icon">
                                    <Layers size={18} className="input-icon" />
                                    <input 
                                        type="number"
                                        placeholder="Nominal Item (Cth: 100)" 
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)} 
                                        className="admin-input"
                                    />
                                </div>
                                <div className="input-with-icon">
                                    <DollarSign size={18} className="input-icon" />
                                    <input 
                                        type="number"
                                        placeholder="Harga (Cth: 15000)" 
                                        value={price}
                                        onChange={e => setPrice(e.target.value)} 
                                        className="admin-input"
                                    />
                                </div>
                                <button onClick={handleAdd} className="btn-add">
                                    <Plus size={18} /> Tambah
                                </button>
                            </div>
                        </div>

                        {/* Tabel Daftar Paket */}
                        <div className="admin-card table-card">
                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID Paket</th>
                                            <th>Nominal / Item Amount</th>
                                            <th>Harga (Rp)</th>
                                            <th className="text-center">Aksi</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {packages.length > 0 ? packages.map(p => (
                                            <tr key={p.id}>
                                                <td className="id-cell">#{p.id}</td>
                                                <td className="amount-cell">
                                                    {editId === p.id ? (
                                                        <input
                                                            type="number"
                                                            value={editAmount}
                                                            onChange={(e) => setEditAmount(e.target.value)}
                                                            className="admin-input edit-input"
                                                        />
                                                    ) : (
                                                        <span className="amount-badge">{p.amount}</span>
                                                    )}
                                                </td>

                                                <td className="price-cell">
                                                    {editId === p.id ? (
                                                        <input
                                                            type="number"
                                                            value={editPrice}
                                                            onChange={(e) => setEditPrice(e.target.value)}
                                                            className="admin-input edit-input"
                                                        />
                                                    ) : (
                                                        formatRupiah(p.price)
                                                    )}
                                                </td>

                                                <td className="action-cell text-center">
                                                    {editId === p.id ? (
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
                                                            <button onClick={() => handleEdit(p)} className="btn-action btn-edit" title="Edit">
                                                                <Pencil size={16} />
                                                            </button>
                                                            <button onClick={() => handleDelete(p.id)} className="btn-action btn-delete" title="Delete">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="empty-table">Belum ada paket untuk game ini.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    // Placeholder Jika Game Belum Dipilih
                    <div className="empty-state-select">
                        <PackageOpen size={64} className="empty-icon" />
                        <h3>Pilih Game Terlebih Dahulu</h3>
                        <p>Daftar paket akan muncul setelah Anda memilih game di atas.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ManagePackages;