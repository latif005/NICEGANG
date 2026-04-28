import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";
import { 
    Ticket, Tag, Banknote, Plus, 
    Pencil, Trash2, Save, X, Gift 
} from "lucide-react";
import "../../App.css"; // Impor file CSS

function ManagePromos() {
    const [promos, setPromos] = useState([]);
    const [promo_name, setName] = useState("");
    const [promo_code, setCode] = useState("");
    const [discount_amount, setDiscount] = useState("");

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editCode, setEditCode] = useState("");
    const [editDiscount, setEditDiscount] = useState("");

    const fetchPromos = () => {
        API.get("/promos")
            .then(res => setPromos(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchPromos();
    }, []);

    const handleAdd = async () => {
        if (!promo_name || !promo_code || !discount_amount) {
            alert("Harap isi semua kolom promo!");
            return;
        }

        try {
            await API.post("/promos", {
                promo_name,
                promo_code: promo_code.toUpperCase(), // Otomatis jadikan huruf kapital
                discount_amount
            });

            setName("");
            setCode("");
            setDiscount("");
            fetchPromos();
        } catch (error) {
            console.error("Gagal menambah promo", error);
            alert("Gagal menambah promo");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus promo ini?")) {
            try {
                await API.delete(`/promos/${id}`);
                fetchPromos();
            } catch (error) {
                console.error("Gagal menghapus promo", error);
            }
        }
    };

    const handleEdit = (p) => {
        setEditId(p.id);
        setEditName(p.promo_name);
        setEditCode(p.promo_code);
        setEditDiscount(p.discount_amount);
    };

    const handleUpdate = async () => {
        try {
            await API.put(`/promos/${editId}`, {
                promo_name: editName,
                promo_code: editCode.toUpperCase(),
                discount_amount: editDiscount
            });

            setEditId(null);
            fetchPromos();
        } catch (error) {
            console.error("Gagal mengupdate promo", error);
            alert("Gagal mengupdate promo");
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
                        <h1 className="page-title">Manage Promos</h1>
                        <p className="page-subtitle">Kelola kode voucher dan potongan harga untuk pengguna.</p>
                    </div>
                </div>

                {/* Form Tambah Promo */}
                <div className="admin-card add-form-card">
                    <h2 className="card-title"><Gift size={18} /> Tambah Promo Baru</h2>
                    <div className="form-row">
                        <div className="input-with-icon">
                            <Ticket size={18} className="input-icon" />
                            <input 
                                placeholder="      Nama Event" 
                                value={promo_name}
                                onChange={e => setName(e.target.value)} 
                                className="admin-input"
                            />
                        </div>
                        <div className="input-with-icon">
                            <Tag size={18} className="input-icon" />
                            <input 
                                placeholder="      Kode Unik" 
                                value={promo_code}
                                onChange={e => setCode(e.target.value)} 
                                className="admin-input uppercase-input"
                            />
                        </div>
                        <div className="input-with-icon">
                            <Banknote size={18} className="input-icon" />
                            <input 
                                type="number"
                                placeholder="      Nominal Diskon (Rp)" 
                                value={discount_amount}
                                onChange={e => setDiscount(e.target.value)} 
                                className="admin-input"
                            />
                        </div>
                        <button onClick={handleAdd} className="btn-add">
                            <Plus size={18} /> Tambah
                        </button>
                    </div>
                </div>

                {/* Tabel Daftar Promo */}
                <div className="admin-card table-card">
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Nama Promo</th>
                                    <th>Kode Kupon</th>
                                    <th>Nominal Diskon</th>
                                    <th className="text-center">Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {promos.length > 0 ? promos.map(p => (
                                    <tr key={p.id}>
                                        <td className="name-cell">
                                            {editId === p.id ? (
                                                <input 
                                                    value={editName} 
                                                    onChange={e => setEditName(e.target.value)} 
                                                    className="admin-input edit-input"
                                                />
                                            ) : p.promo_name}
                                        </td>

                                        <td>
                                            {editId === p.id ? (
                                                <input 
                                                    value={editCode} 
                                                    onChange={e => setEditCode(e.target.value)} 
                                                    className="admin-input edit-input uppercase-input"
                                                />
                                            ) : (
                                                <span className="coupon-badge">{p.promo_code}</span>
                                            )}
                                        </td>

                                        <td className="discount-cell">
                                            {editId === p.id ? (
                                                <input 
                                                    type="number"
                                                    value={editDiscount} 
                                                    onChange={e => setEditDiscount(e.target.value)} 
                                                    className="admin-input edit-input"
                                                />
                                            ) : formatRupiah(p.discount_amount)}
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
                                        <td colSpan="4" className="empty-table">Belum ada promo yang aktif.</td>
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

export default ManagePromos;