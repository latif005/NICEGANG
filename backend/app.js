require('dotenv').config();
const express = require("express");
const cors = require("cors");
const gameRoutes = require("./routes/gameRoutes");
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Top Up Game Running");
});

app.use("/api", gameRoutes);
app.use("/api", authRoutes);
app.use("/api", packageRoutes);
app.use("/api", orderRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


console.log("SERVER KEY:", process.env.MIDTRANS_SERVER_KEY);
console.log("CLIENT KEY:", process.env.MIDTRANS_CLIENT_KEY);