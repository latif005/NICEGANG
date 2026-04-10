import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const res = await API.post("/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login berhasil");

      navigate("/");

    } catch (err) {

      alert("Login gagal");

    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <div style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>
        <p>
          Belum punya akun? <a href="/register">Register</a>
        </p>

      </div>
    </div>
  );
}

export default Login;