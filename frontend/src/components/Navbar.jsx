import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Search, Home as HomeIcon, Clock, User, LogOut, LayoutDashboard } from "lucide-react";
import "../App.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ambil keyword pencarian langsung dari URL agar sinkron
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (window.location.pathname !== "/") {
      navigate(`/?search=${encodeURIComponent(value)}`);
    } else {
      if (value) {
        setSearchParams({ search: value });
      } else {
        setSearchParams({});
      }
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">

        {/* Left: Logo & Nav Links */}
        <div className="header-left">
          <Link to="/" className="site-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            {/* LOGO IKON COMPACT */}
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <defs>
                {/* Gradasi warna utama */}
                <linearGradient id="mix-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" /> {/* Ungu */}
                  <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
                </linearGradient>
              </defs>

              {/* Lingkaran Luar Tipis (Gaya Awal) */}
              <circle cx="50" cy="50" r="45" stroke="url(#mix-grad)" strokeWidth="3" strokeDasharray="4 4" opacity="0.6" />

              {/* Ikon Geometris Simpel di Dalam Buletan */}
              <path
                d="M22 28 H78 V38 H56 V75 H44 V38 H22 V28Z 
         M38 48 L50 35 L62 48 
         M50 35 V62"
                fill="url(#mix-grad)"
              />
            </svg>

            {/* TEKS BRAND 3 WARNA */}
            <span style={{
              color: '#fff',
              fontSize: '22px',
              fontWeight: '900',
              letterSpacing: '-0.5px',
              fontFamily: 'sans-serif',
              textTransform: 'uppercase'
            }}>
              Tip<span style={{ color: '#ec4899' }}>Top</span><span style={{ color: '#f97316' }}>Up</span>
            </span>
          </Link>
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
            <input
              type="text"
              placeholder="Search for games.."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Right: Auth / Profile */}
        <div className="auth-section">
          {!user ? (
            /* Jika belum login di mobile, navigasi dipindah ke samping tombol login */
            <div className="auth-buttons">
              <Link to="/" className="nav-item mobile-nav-item">
                <HomeIcon size={18} />
              </Link>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Register</Link>
            </div>
          ) : (
            <div className="user-menu-container" ref={dropdownRef}>
              <div className="user-avatar" onClick={() => setOpen(!open)}>
                <div className="avatar-circle">
                  <User size={18} color="#fff" />
                </div>
              </div>

              {open && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-title">Logged in as</p>
                    <p className="dropdown-name">{user.username}</p>
                  </div>
                  <div className="dropdown-divider" style={{ height: '1px', backgroundColor: '#33155b', margin: '8px 0' }}></div>

                  {/* MENU TAMBAHAN KHUSUS MOBILE (Home & History) */}
                  <button
                    className="dropdown-item mobile-only-item"
                    onClick={() => { setOpen(false); navigate("/"); }}
                    style={{ width: '100%', background: 'none', border: 'none', color: '#fff', textAlign: 'left', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <HomeIcon size={16} /> Home
                  </button>

                  <button
                    className="dropdown-item mobile-only-item"
                    onClick={() => { setOpen(false); navigate("/history"); }}
                    style={{ width: '100%', background: 'none', border: 'none', color: '#fff', textAlign: 'left', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <Clock size={16} /> History
                  </button>

                  <div className="dropdown-divider mobile-only-item" style={{ height: '1px', backgroundColor: '#33155b', margin: '8px 0' }}></div>
                  {/* END MENU MOBILE */}

                  {user.role === 'admin' && (
                    <button
                      className="dropdown-item admin-link"
                      onClick={() => { setOpen(false); navigate("/admin"); }}
                      style={{ width: '100%', background: 'none', border: 'none', color: '#fff', textAlign: 'left', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    >
                      <LayoutDashboard size={16} style={{ color: '#ec4899' }} /> Dashboard Admin
                    </button>
                  )}

                  <button
                    className="dropdown-item"
                    onClick={() => { setOpen(false); navigate("/profile"); }}
                    style={{ width: '100%', background: 'none', border: 'none', color: '#fff', textAlign: 'left', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    <User size={16} /> Profile
                  </button>

                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                    style={{ width: '100%', background: 'none', border: 'none', color: '#ff4a4a', textAlign: 'left', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                  >
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