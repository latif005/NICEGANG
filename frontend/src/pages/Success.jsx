import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/Api";
import { CheckCircle, Home, Clock, Copy } from "lucide-react";
import "../App.css"; // Impor CSS

function Success() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        API.get(`/orders/${id}`)
            .then(res => setOrder(res.data))
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

    // Fungsi untuk copy Order ID (opsional tapi berguna)
    const handleCopy = () => {
        navigator.clipboard.writeText(order.id);
        alert("Order ID disalin!");
    };

    if (!order) {
        return (
            <div className="success-wrapper">
                <div className="loading-state">
                    <div className="spinner-green"></div>
                    <p>Memuat status pesanan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="success-wrapper">
            <div className="success-container">
                <div className="success-card">
                    
                    {/* Header: Ikon Sukses Animasi */}
                    <div className="success-header">
                        <div className="icon-pulse-container">
                            <CheckCircle size={64} className="success-icon" />
                        </div>
                        <h2>Pembayaran Berhasil!</h2>
                        <p className="success-subtitle">Pesanan Anda sedang diproses dan item akan segera masuk ke akun game Anda.</p>
                    </div>

                    {/* Struk Pesanan */}
                    <div className="receipt-box">
                        <div className="receipt-row">
                            <span className="receipt-label">Order ID</span>
                            <div className="receipt-value copyable" onClick={handleCopy}>
                                {order.id} <Copy size={14} className="copy-icon" />
                            </div>
                        </div>
                        <div className="receipt-row">
                            <span className="receipt-label">Akun Game</span>
                            <span className="receipt-value">{order.account_game_id}</span>
                        </div>
                        <div className="receipt-row">
                            <span className="receipt-label">Paket</span>
                            <span className="receipt-value highlight-item">{order.amount}</span>
                        </div>
                        <div className="receipt-row">
                            <span className="receipt-label">Status</span>
                            <span className="receipt-value status-success">{order.status}</span>
                        </div>
                        
                        <div className="receipt-divider"></div>
                        
                        <div className="receipt-row total-row">
                            <span className="receipt-label">Total Dibayar</span>
                            <span className="receipt-value total-price">{formatRupiah(order.total_price)}</span>
                        </div>
                    </div>

                    <div className="thank-you-note">
                        <p>Terima kasih telah mempercayakan top up di GGWP 🙏</p>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="action-buttons">
                        <button className="btn-secondary" onClick={() => navigate("/history")}>
                            <Clock size={18} /> Riwayat
                        </button>
                        <button className="btn-primary" onClick={() => navigate("/")}>
                            <Home size={18} /> Beranda
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Success;