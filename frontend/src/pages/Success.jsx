import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/Api";

function Success() {

    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {

        API.get(`/orders/${id}`)
            .then(res => setOrder(res.data))
            .catch(err => console.error(err));

    }, [id]);

    if (!order) return <p>Loading...</p>;

    return (
        <div style={{
            maxWidth: "400px",
            margin: "50px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            background: "#fff"
        }}>
            <h2>🎉 Pembayaran Berhasil</h2>

            <hr />

            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Game Account:</b> {order.account_game_id}</p>
            <p><b>Package:</b> {order.amount}</p>
            <p><b>Total:</b> Rp {order.total_price}</p>
            <p><b>Status:</b> {order.status}</p>

            <hr />

            <p style={{ fontSize: "12px", color: "gray" }}>
                Terima kasih telah melakukan top up 🙏
            </p>
        </div>
    );
}

export default Success;