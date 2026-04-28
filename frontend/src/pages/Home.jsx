import { useEffect, useState } from "react";
import API from "../services/Api";
import GameCard from "../components/GameCard";
import "../App.css"; // Pastikan file CSS ini di-import
// Impor ikon (pastikan Anda menginstal lucide-react atau pustaka ikon lainnya)
import { Search, Home as HomeIcon, ReceiptText, Zap, MessageCircle } from "lucide-react";

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    API.get("/games")
      .then((res) => setGames(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-wrapper">
      {/* 1. Header Navigation */}


      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text-area">
              <div className="brand-logo-large">TIP TOP UP</div>
              <h1 className="hero-title">
                TIP TOP UP – Website Top Up Game Termurah dan Terpercaya
              </h1>
              <p className="hero-subtitle">
                TIP Top Up, solusi top up game termurah, tercepat, dan terpercaya di Indonesia.
                Proses instan &lt;1 menit, metode pembayaran lengkap, dan promo menarik setiap hari
              </p>
            </div>

            <div className="hero-banner-card">
              {/* Bungkus konten biar bisa di-flex */}
              <div className="hero-content-wrapper">

                <div className="hero-text-section">
                  <h1 className="hero-title">GAS RANK TANPA REM</h1>
                  <p className="hero-subtitle">HARGA LEBIH HEMAT, PROSES LEBIH CEPAT</p>
                </div>
                <div className="hero-image-section">
                  {/* Ganti src sesuai nama file gambar lu */}
                  <img src="../../public/uploads/poster.png" alt="Hero Character" className="hero-character-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Game List Section */}
      <main className="game-section">
        <div className="section-container">
          <div className="section-header">
            <h2>🔥 Paling Laris</h2>
          </div>

          <div className="game-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}

            {/* Dummy data untuk visualisasi jika API belum siap */}
            {games.length === 0 && Array(5).fill(0).map((_, i) => (
              <div className="dummy-card" key={i}>
                <div className="dummy-img">
                  {/* Gunakan gambar karakter dari referensi */}
                  <img src={`https://path-to-your-game-character-image-${i + 1}.jpg`} alt="Game Character" />
                </div>
                {/* Komponen GameCard asli Anda akan me-render konten di sini */}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 4. Floating Contact Button (WhatsApp) */}
      <a href="https://wa.me/081285976653" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <MessageCircle size={30} color="white" />
      </a>
    </div>
  );
}

export default Home;