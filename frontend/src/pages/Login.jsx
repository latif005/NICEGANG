import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/Api";
import { Mail, Lock, LogIn, Gamepad2 } from "lucide-react";
import "../App.css"; // Impor file CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah halaman reload saat form di-submit
    setIsLoading(true);

    try {
      const res = await API.post("/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login berhasil");
      
      // Menggunakan reload agar Navbar langsung mendeteksi user yang baru login
      window.location.href = "/"; 

    } catch (err) {
      console.error(err);
      alert("Login gagal, periksa kembali email dan password Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          
          <div className="auth-header">
            <div className="auth-logo">
              <Gamepad2 size={36} color="#ec4899" />
            </div>
            <h2>Welcome Back!</h2>
            <p>Silakan login untuk melanjutkan top up</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                className="custom-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                className="custom-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`btn-auth ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : (
                <>
                  <LogIn size={20} /> Login
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Belum punya akun? <Link to="/register" className="auth-link">Register di sini</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;