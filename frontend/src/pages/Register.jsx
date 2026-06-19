import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { User, Mail, Lock, UserPlus, Gamepad2 } from "lucide-react";
import "../App.css"; // Impor file CSS

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Mencegah halaman reload saat form disubmit

    if (!username || !email || !password) {
      alert("Semua field harus diisi");
      return;
    }

    setIsLoading(true);

    try {
      await API.post("/register", {
        username,
        email,
        password
      });

      alert("Register berhasil, silakan login");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Register gagal. Pastikan email belum terdaftar.");
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
            <h2>Join the Squad!</h2>
            <p>Buat akun baru dan nikmati kemudahan top up</p>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                className="custom-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
              {isLoading ? "Mendaftar..." : (
                <>
                  <UserPlus size={20} /> Register
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Sudah punya akun? <Link to="/login" className="auth-link">Login di sini</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;