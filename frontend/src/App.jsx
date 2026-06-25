import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import History from "./pages/History";
import Profile from "./pages/Profile";

// admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageGames from "./pages/admin/ManageGames";
import ManagePackages from "./pages/admin/ManagePackages";
import ManagePromos from "./pages/admin/ManagePromos";
import ManageUsers from "./pages/admin/ManageUsers";

// Proteksi Route
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function Layout() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {/* 🔥 Navbar cuma muncul kalau bukan admin */}
      {!isAdmin && <Navbar />}

      <Routes>
        {/* PUBLIC — Bisa diakses siapa saja */}
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED — Harus login dulu */}
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/success/:id" element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* ADMIN — Harus login + role admin */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/games" element={<AdminRoute><ManageGames /></AdminRoute>} />
        <Route path="/admin/packages" element={<AdminRoute><ManagePackages /></AdminRoute>} />
        <Route path="/admin/promos" element={<AdminRoute><ManagePromos /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
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