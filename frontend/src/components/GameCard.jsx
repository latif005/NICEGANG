import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} style={{ textDecoration: "none", color: "black" }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          width: "200px",
          textAlign: "center",
        }}
      >
        <img
          src="https://via.placeholder.com/150"
          alt={game.name}
          style={{ width: "100%", borderRadius: "10px" }}
        />

        <h3>{game.name}</h3>
        <p>{game.currency}</p>
      </div>
    </Link>
  );
}

export default GameCard;