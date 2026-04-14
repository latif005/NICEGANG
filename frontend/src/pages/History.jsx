import { useEffect, useState } from "react";
import API from "../services/Api";

function History() {

    const [orders, setOrders] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        API.get(`/orders/user/${user.id}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));

    }, []);

    return (
        <div style={{ padding: "40px" }}>
            <h1>Riwayat Transaksi</h1>

            <table border="1" cellPadding="10" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Account</th>
                        <th>Package</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.game_name}</td>
                            <td>{order.account_game_id}</td>
                            <td>{order.amount}</td>
                            <td>Rp {order.total_price}</td>
                            <td>
                                {order.status === "success" && "🟢 Success"}
                                {order.status === "pending" && "🟡 Pending"}
                                {order.status === "failed" && "🔴 Failed"}
                            </td>
                            <td>{new Date(order.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default History;