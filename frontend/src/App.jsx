import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/success/:id" element={<Success />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;