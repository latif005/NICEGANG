// components/GameCard.jsx
import { Link } from "react-router-dom";
import { Zap } from "lucide-react"; // Kita pake ikon petir buat kesan cepet

function GameCard({ game }) {
  // Fungsi fallback kalau gambar error (sama kayak sebelumnya)
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/300x400/1a0433/ec4899?text=GGWP";
  };

  return (
    <Link to={`/game/${game.id}`} className="game-card-link">
      <div className="game-card">
        {/* Bagian Gambar dengan Overlay */}
        <div className="card-image-wrapper">
          <img 
            src={game.image} 
            alt={game.name} 
            onError={handleImgError} 
            className="card-img"
          />
          {/* Gradient Overlay biar teks di bawah kelihatan jelas */}
          <div className="card-overlay"></div>
          
          {/* Badge 'Instan' buat pemanis di pojok kanan atas */}
          <div className="instant-badge">
            <Zap size={12} className="zap-icon" />
            <span>INSTAN</span>
          </div>
        </div>

        {/* Bagian Informasi Game di Bawah */}
        <div className="card-details">
          <h3 className="game-title">{game.name}</h3>
          <p className="game-subtitle">Top Up {game.currency}</p>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;