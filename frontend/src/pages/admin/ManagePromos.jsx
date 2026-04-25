import { useEffect, useState } from "react";
import API from "../../services/Api";
import AdminSidebar from "../../components/AdminSidebar";

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
        API.get("/promos").then(res => setPromos(res.data));
    };

    useEffect(() => {
        fetchPromos();
    }, []);

    const handleAdd = async () => {
        await API.post("/promos", {
            promo_name,
            promo_code,
            discount_amount
        });

        setName("");
        setCode("");
        setDiscount("");

        fetchPromos();
    };

    const handleDelete = async (id) => {
        await API.delete(`/promos/${id}`);
        fetchPromos();
    };

    const handleEdit = (p) => {
        setEditId(p.id);
        setEditName(p.promo_name);
        setEditCode(p.promo_code);
        setEditDiscount(p.discount_amount);
    };

    const handleUpdate = async () => {
        await API.put(`/promos/${editId}`, {
            promo_name: editName,
            promo_code: editCode,
            discount_amount: editDiscount
        });

        setEditId(null);
        fetchPromos();
    };

    return (
        <div style={{ display: "flex" }}>
            <AdminSidebar />

            <div style={{ padding: "30px", flex: 1 }}>
                <h1>Manage Promos</h1>

                {/* FORM */}
                <input placeholder="Name" onChange={e => setName(e.target.value)} />
                <input placeholder="Code" onChange={e => setCode(e.target.value)} />
                <input placeholder="Discount" onChange={e => setDiscount(e.target.value)} />

                <button onClick={handleAdd}>Tambah</button>

                <hr />

                {/* TABLE */}
                <table border="1" cellPadding="10" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        {promos.map(p => (
                            <tr key={p.id}>
                                <td>
                                    {editId === p.id ? (
                                        <input value={editName} onChange={e => setEditName(e.target.value)} />
                                    ) : p.promo_name}
                                </td>

                                <td>
                                    {editId === p.id ? (
                                        <input value={editCode} onChange={e => setEditCode(e.target.value)} />
                                    ) : p.promo_code}
                                </td>

                                <td>
                                    {editId === p.id ? (
                                        <input value={editDiscount} onChange={e => setEditDiscount(e.target.value)} />
                                    ) : `${p.discount_amount}`}
                                </td>

                                <td>
                                    {editId === p.id ? (
                                        <>
                                            <button onClick={handleUpdate}>Save</button>
                                            <button onClick={() => setEditId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(p)}>Edit</button>
                                            <button onClick={() => handleDelete(p.id)}>Delete</button>
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

export default ManagePromos;