import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import History from "./pages/History";

// admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageGames from "./pages/admin/ManageGames";
import ManagePackages from "./pages/admin/ManagePackages";
import ManagePromos from "./pages/admin/ManagePromos";
import ManageUsers from "./pages/admin/ManageUsers";

function Layout() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {/* 🔥 Navbar cuma muncul kalau bukan admin */}
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/success/:id" element={<Success />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/games" element={<ManageGames />} />
        <Route path="/admin/packages" element={<ManagePackages />} />
        <Route path="/admin/promos" element={<ManagePromos />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;