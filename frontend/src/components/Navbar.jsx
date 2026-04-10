import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 30px",
      background: "#111",
      color: "white"
    }}>

      {/* Left */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>

        {user && (
          <Link to="/history" style={{ color: "white" }}>
            History
          </Link>
        )}
      </div>

      {/* Right */}
      <div>

        {!user ? (
            <div style={{ display: "flex", gap: "10px" }}>
                <Link to="/login">
                <button>Login</button>
                </Link>

                <Link to="/register">
                <button>Register</button>
                </Link>
            </div>
        ) : (
          <div style={{ position: "relative" }}>

            {/* Avatar */}
            <div
              onClick={() => setOpen(!open)}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "#555",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              👤
            </div>

            {/* Dropdown */}
            {open && (
              <div style={{
                position: "absolute",
                right: 0,
                top: "45px",
                background: "white",
                color: "black",
                borderRadius: "5px",
                padding: "10px",
                minWidth: "120px"
              }}>
                <p>{user.username}</p>
                <hr />
                <button onClick={() => navigate("/profile")}>
                  Profile
                </button>
                <br />
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default Navbar;