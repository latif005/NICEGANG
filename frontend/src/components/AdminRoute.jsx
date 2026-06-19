import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Komponen untuk proteksi halaman admin
// Kalau user bukan admin, otomatis redirect ke halaman utama
function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
