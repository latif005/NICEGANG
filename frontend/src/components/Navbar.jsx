import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Search, Home as HomeIcon, Clock, User, LogOut, ChevronDown,LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Pakai Context
import "../App.css"; // Impor file CSS

function Navbar() {
  const { user, logout } = useAuth(); // Ambil dari Context, bukan localStorage
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Menutup dropdown jika user klik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // Pakai fungsi logout dari Context
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="header-container">

        {/* Left: Logo & Nav Links */}
        <div className="header-left">
          <Link to="/" className="site-logo">TIP TOP UP</Link>

          <nav className="main-nav">
            <Link to="/" className="nav-item">
              <HomeIcon size={18} /> Home
            </Link>
            {user && (
              <Link to="/history" className="nav-item">
                <Clock size={18} /> History
              </Link>
            )}
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input type="text" placeholder="Search for games.." />
          </div>
        </div>

        {/* Right: Auth / Profile */}
        <div className="auth-section">
          {!user ? (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Register</Link>
            </div>
          ) : (
            <div className="user-menu-container" ref={dropdownRef}>

              {/* Avatar Trigger */}
              <div className="user-avatar" onClick={() => setOpen(!open)}>
                <div className="avatar-circle">
                  <User size={18} color="#fff" />
                </div>
              </div>

              {/* Dropdown Menu */}
              {open && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-title">Logged in as</p>
                    <p className="dropdown-name">{user.username}</p>
                  </div>
                  <div className="dropdown-divider"></div>

                  {/* FITUR KHUSUS ADMIN: Cek role user */}
                  {user.role === 'admin' && (
                    <button
                      className="dropdown-item admin-link"
                      onClick={() => { setOpen(false); navigate("/admin"); }}
                    >
                      <LayoutDashboard size={16} style={{ color: '#ec4899' }} /> Dashboard Admin
                    </button>
                  )}

                  <button
                    className="dropdown-item"
                    onClick={() => { setOpen(false); navigate("/profile"); }}
                  >
                    <User size={16} /> Profile
                  </button>

                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;