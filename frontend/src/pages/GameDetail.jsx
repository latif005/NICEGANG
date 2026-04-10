import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";


function GameDetail() {
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const handleTopUp = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Silakan login dulu");
      navigate("/login");
      return;
    }

    if (!selectedPackage || !accountId) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }

    try {

      const res = await API.post("/orders", {
        user_id: user.id,
        package_id: selectedPackage.id,
        account_game_id: accountId,
        promo_code: promoCode
      });

      navigate(`/checkout/${res.data.orderId}`);

      alert("Order berhasil dibuat");

      console.log(res.data);

    } catch (err) {

      console.error(err);
      alert("Gagal membuat order");

    }

  };

  useEffect(() => {
    API.get(`/packages/${id}`)
      .then((res) => setPackages(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    
    <div style={{ padding: "40px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h3>Masukkan ID Akun Game</h3>

        <input
          type="text"
          placeholder="Masukkan ID akun..."
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>
            <h1>Pilih Paket Top Up</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg)}
            style={{
              border: selectedPackage?.id === pkg.id ? "2px solid blue" : "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
              width: "200px",
              cursor: "pointer",
            }}
          >
            <h3>{pkg.amount}</h3>
            <p>Price: Rp {pkg.price}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Punya Kode Promo? Masukkan disini!"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <button
        onClick={handleTopUp}
        style={{
          marginTop: "30px",
          padding: "12px 20px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Top Up Sekarang
      </button>
    </div>
  );
}

export default GameDetail;