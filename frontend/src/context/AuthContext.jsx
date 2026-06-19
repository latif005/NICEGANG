import { createContext, useContext, useState, useEffect } from "react";

// 1. Buat Context
const AuthContext = createContext(null);

// 2. Custom hook biar gampang dipanggil di komponen lain
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return context;
};

// 3. Provider — Bungkus seluruh app dengan ini
export function AuthProvider({ children }) {
  // State global untuk user dan token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Saat pertama kali app dibuka, cek localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false); // Selesai loading
  }, []);

  // Fungsi Login — simpan ke state + localStorage
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  // Fungsi Logout — hapus dari state + localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Fungsi Update User — untuk update profile tanpa login ulang
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Nilai yang bisa diakses semua komponen
  const value = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  // Jangan render app sampai selesai cek localStorage
  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
