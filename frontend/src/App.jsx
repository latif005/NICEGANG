import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import History from "./pages/History";
//admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageGames from "./pages/admin/ManageGames";
import ManagePackages from "./pages/admin/ManagePackages";
import ManagePromos from "./pages/admin/ManagePromos";

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

      //admin
      //admin
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/games" element={<ManageGames />} />
        <Route path="/admin/packages" element={<ManagePackages />} />
        <Route path="/admin/promos" element={<ManagePromos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;