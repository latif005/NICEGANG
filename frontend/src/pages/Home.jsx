import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    API.get("/games")
      .then((res) => {
        setGames(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Top Up Game</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {games.map((game) => (
          <div
            key={game.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
              width: "200px",
            }}
          >
            <h3>{game.name}</h3>
            <p>Currency: {game.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;