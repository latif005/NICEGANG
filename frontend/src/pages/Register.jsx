import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!username || !email || !password) {
      alert("Semua field harus diisi");
      return;
    }

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
      alert("Register gagal");

    }

  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Register</h1>

      <div style={{ display: "flex", flexDirection: "column", width: "300px", gap: "10px" }}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button onClick={handleRegister}>
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;