import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link, useSearchParams } from "react-router-dom"; // Tambahkan ini untuk membaca URL
import API from "../services/Api";
=======
import API from "../services/api";
>>>>>>> aa42d48cc5fb91e25c4f52adfeb4630e98c64b03
import GameCard from "../components/GameCard";
import "../App.css";
import { MessageCircle, Search } from "lucide-react";


function Home() {
  const [games, setGames] = useState([]);

  // Ambil search parameter dari URL yang diketik di Navbar
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    API.get("/games")
      .then((res) => setGames(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter game berdasarkan apa yang tertulis di URL parameter
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text-area">
              {/* <div className="brand-logo-large">
                
              </div> */}
              <h1 className="hero-title">
                Website Top Up Game Termurah dan Terpercaya
              </h1>
              <p className="hero-subtitle">
                TIP Top Up, solusi top up game termurah, tercepat, dan terpercaya di Indonesia.
                Proses instan, metode pembayaran lengkap, dan promo menarik setiap hari
              </p>
            </div>

            <div className="hero-banner-card">
              <div className="hero-content-wrapper">
                <div className="hero-image-section">
                  <img src="../../public/uploads/poster.png" alt="Hero Character" className="hero-character-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game List Section */}
      <main className="game-section">
        <div className="section-container">
          <div className="section-header">
            {searchTerm ? (
              <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Search size={22} style={{ color: '#ec4899' }} />
                <span>Hasil Pencarian: "{searchTerm}"</span>
              </h2>
            ) : (
              <h2> </h2>
            )}
          </div>

          <div className="game-grid">
            {/* Render dari filteredGames */}
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}

            {/* Jika hasil filter kosong padahal data API ada */}
            {filteredGames.length === 0 && games.length > 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '40px 0' }}>
                Game dengan nama "{searchTerm}" tidak ditemukan.
              </p>
            )}

            {/* Dummy data jika API belum siap / kosong */}
            {games.length === 0 && Array(5).fill(0).map((_, i) => (
              <div className="dummy-card" key={i}>
                <div className="dummy-img">
                  <img src={`https://path-to-your-game-character-image-${i + 1}.jpg`} alt="Game Character" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Contact Button (WhatsApp) */}
      <a href="https://wa.me/6281285976653" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <MessageCircle size={30} color="white" />
      </a>
    </div>
  );
}

export default Home;