import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";

function Checkout() {

    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    const handlePayment = async () => {

        try {

            const res = await API.post(`/pay/${id}`);

            window.snap.pay(res.data.token, {
                onSuccess: function (result) {
                    alert("Pembayaran berhasil");
                    navigate(`/success/${id}`);
                },
                onPending: function (result) {
                    alert("Menunggu pembayaran");
                },
                onError: function (result) {
                    alert("Pembayaran gagal");
                }
            });

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        API.get(`/orders/${id}`)
            .then(res => {
                setOrder(res.data);
            })
            .catch(err => console.error(err));

    }, [id]);

    if (!order) return <p>Loading...</p>;

    return (
        <div style={{ padding: "40px" }}>
            <h1>Checkout</h1>

            <p>Game Account ID: {order.account_game_id}</p>
            <p>Package: {order.amount}</p>
            <p>Total Price: Rp {order.total_price}</p>

            <button onClick={handlePayment}>
                Bayar Sekarang
            </button>
        </div>
    );

}

export default Checkout;