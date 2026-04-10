import { useEffect, useState } from "react";
import API from "../services/Api";
import GameCard from "../components/GameCard";

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    API.get("/games")
      .then((res) => setGames(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Top Up Game</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default Home;