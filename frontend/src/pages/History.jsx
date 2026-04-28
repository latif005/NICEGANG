import { useEffect, useState } from "react";
import API from "../services/Api"; // Sesuaikan path jika berbeda
import "../App.css"; // Jangan lupa import CSS-nya

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Ambil data user dari localStorage buat dapetin ID-nya
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Kalau nggak ada user login, nggak usah fetch data
    if (!user) {
        setLoading(false);
        return;
    }

    // 2. Memanggil API riwayat transaksi sesuai user ID
    // Pastikan string endpoint ini sama dengan di orderRoutes.js lu
    API.get(`/orders/user/${user.id}`) 
      .then((res) => {
        // 3. Kita map (cocokkan) data dari database ke format tabel lu
        const formattedData = res.data.map((item) => ({
          id: item.id,
          game: item.game_name,             // Dapet dari JOIN games
          account: item.account_game_id,    // Dapet dari tabel orders
          package: item.amount,             // Dapet dari JOIN packages
          total: item.total_price,          // Dapet dari tabel orders
          status: item.status,              // Dapet dari tabel orders
          
          // Format tanggal otomatis dari created_at
          date: new Date(item.created_at).toLocaleString("id-ID", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })
        }));
        
        setHistoryData(formattedData);
      })
      .catch((err) => {
          console.error("Gagal ngambil history:", err);
      })
      .finally(() => {
          setLoading(false); // Matiin loading entah sukses atau gagal
      });
      
  }, []); // Hapus dummy datanya, cuma pake []

  // Fungsi pembantu untuk format angka ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number).replace("Rp", "Rp ");
  };

  return (
    <div className="history-wrapper">
      <div className="history-container">
        <h1 className="history-title">Riwayat Transaksi</h1>

        <div className="table-container">
          <table className="history-table">
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
              {loading ? (
                 <tr>
                    <td colSpan="6" className="text-center empty-state">
                      Loading data ngab...
                    </td>
                 </tr>
              ) : historyData.length > 0 ? (
                historyData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.game}</td>
                    <td>{item.account}</td>
                    <td>{item.package}</td>
                    <td>
                      {/* Pastikan total terformat ke Rupiah */}
                      {formatRupiah(item.total)}
                    </td>
                    <td>
                      <div className="status-badge">
                        <span className={`status-dot ${item.status.toLowerCase()}`}></span>
                        {/* Bikin huruf pertama status jadi kapital */}
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </div>
                    </td>
                    <td>{item.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center empty-state">
                    Belum ada riwayat transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;