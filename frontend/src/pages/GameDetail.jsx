import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api"; // Fix: lowercase
import { useAuth } from "../context/AuthContext"; // Pakai Context
import { User, Package, Ticket, ShoppingCart, CheckCircle2 } from "lucide-react";
import "../App.css"; // Impor file CSS

function GameDetail() {
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); // Ambil dari Context

  useEffect(() => {
    API.get(`/packages/${id}`)
      .then((res) => setPackages(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleTopUp = async () => {

    if (!user) {
      alert("Silakan login dulu");
      navigate("/login");
      return;
    }

    if (!selectedPackage || !accountId) {
      alert("Lengkapi data (ID Akun dan Paket) terlebih dahulu");
      return;
    }

    try {
      const res = await API.post("/orders", {
        user_id: user.id,
        package_id: selectedPackage.id,
        account_game_id: accountId,
        promo_code: promoCode
      });

      alert("Order berhasil dibuat");
      navigate(`/checkout/${res.data.orderId}`);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat order");
    }
  };

  // Fungsi pembantu untuk memformat harga ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="detail-wrapper">
      <div className="detail-container">
        
        {/* Opsional: Header / Banner Game */}
        <div className="detail-header">
          <h1>Top Up Instan</h1>
          <p>Masukkan User ID, pilih nominal, selesaikan pembayaran, dan item akan langsung bertambah ke akun Anda.</p>
        </div>

        <div className="steps-container">
          
          {/* STEP 1: Masukkan ID Akun */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">1</div>
              <h2>Masukkan ID Akun Game</h2>
            </div>
            <div className="step-content">
              <div className="input-group">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Ketik ID akun Anda di sini..."
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                />
              </div>
              <p className="input-help">Untuk mengetahui User ID Anda, silakan klik menu profile dibagian kiri atas pada menu utama game.</p>
            </div>
          </div>

          {/* STEP 2: Pilih Paket */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">2</div>
              <h2>Pilih Paket Top Up</h2>
            </div>
            <div className="step-content">
              <div className="package-grid">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`package-item ${selectedPackage?.id === pkg.id ? "selected" : ""}`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    {selectedPackage?.id === pkg.id && (
                      <CheckCircle2 className="check-icon" size={20} />
                    )}
                    <Package className="pkg-icon" size={24} />
                    <div className="pkg-amount">{pkg.amount}</div>
                    <div className="pkg-price">{formatRupiah(pkg.price)}</div>
                  </div>
                ))}
                
                {/* Fallback Jika API Kosong (Bisa Dihapus Nanti) */}
                {packages.length === 0 && (
                  <div className="empty-packages">Memuat paket...</div>
                )}
              </div>
            </div>
          </div>

          {/* STEP 3: Promo & Checkout */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">3</div>
              <h2>Konfirmasi & Bayar</h2>
            </div>
            <div className="step-content">
              <div className="promo-section">
                <label>Kode Promo (Opsional)</label>
                <div className="input-group">
                  <Ticket className="input-icon" size={20} />
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Punya Kode Promo? Masukkan disini!"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="checkout-summary">
                <div className="summary-text">
                  <span className="summary-label">Total Pembayaran:</span>
                  <span className="summary-total">
                    {selectedPackage ? formatRupiah(selectedPackage.price) : "Rp 0"}
                  </span>
                </div>
                
                <button 
                  className={`btn-topup ${(!selectedPackage || !accountId) ? "disabled" : ""}`}
                  onClick={handleTopUp}
                  disabled={!selectedPackage || !accountId}
                >
                  <ShoppingCart size={20} />
                  Top Up Sekarang
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default GameDetail;