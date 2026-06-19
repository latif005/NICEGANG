import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Komponen untuk proteksi halaman yang butuh login
// Kalau user belum login, otomatis redirect ke /login
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
