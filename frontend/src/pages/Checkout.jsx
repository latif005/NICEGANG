import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Receipt, Gamepad2, Package, Wallet, ShieldCheck, CreditCard } from "lucide-react";
import "../App.css"; // Impor CSS

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
            alert("Gagal memproses pembayaran");
        }
    };

    useEffect(() => {
        API.get(`/orders/${id}`)
            .then(res => {
                setOrder(res.data);
            })
            .catch(err => console.error(err));
    }, [id]);

    // Fungsi format rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(number);
    };

    if (!order) {
        return (
            <div className="checkout-loading">
                <div className="spinner"></div>
                <p>Menyiapkan detail pesanan...</p>
            </div>
        );
    }

    return (
        <div className="checkout-wrapper">
            <div className="checkout-container">
                <div className="checkout-card">
                    
                    {/* Bagian Header Struk */}
                    <div className="checkout-header">
                        <Receipt size={32} className="header-icon" />
                        <h2>Detail Pembayaran</h2>
                        <p className="order-id">Order ID: #{id}</p>
                    </div>

                    {/* Detail Pesanan */}
                    <div className="receipt-details">
                        <div className="detail-row">
                            <span className="detail-label"><Gamepad2 size={16} /> User ID</span>
                            <span className="detail-value highlight">{order.account_game_id}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label"><Package size={16} /> Item</span>
                            <span className="detail-value">{order.amount}</span>
                        </div>
                    </div>

                    {/* Garis Putus-putus Struk */}
                    <div className="receipt-divider"></div>

                    {/* Total Harga */}
                    <div className="receipt-total">
                        <span className="total-label">Total Tagihan</span>
                        <span className="total-amount">{formatRupiah(order.total_price)}</span>
                    </div>

                    {/* Visualisasi Metode Pembayaran (Hanya UI) */}
                    <div className="payment-methods-preview">
                        <p className="methods-title"><Wallet size={14} /> Metode Pembayaran Tersedia di Midtrans</p>
                        <div className="methods-logos">
                            <span className="method-badge qris">QRIS</span>
                            <span className="method-badge gopay">GoPay</span>
                            <span className="method-badge dana">DANA</span>
                            <span className="method-badge shopeepay">ShopeePay</span>
                            <span className="method-badge bank">Virtual Account</span>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <button className="btn-pay" onClick={handlePayment}>
                        <CreditCard size={20} />
                        Lanjutkan Pembayaran
                    </button>

                    {/* Trust Badge / Indikator Keamanan */}
                    <div className="secure-badge">
                        <ShieldCheck size={14} />
                        <span>Pembayaran Aman & Terenkripsi oleh Midtrans</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Checkout;