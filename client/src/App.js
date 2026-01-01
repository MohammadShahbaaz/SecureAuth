import { useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    setToken(data.token);
  };

  if (token) {
    return <Dashboard token={token} />;
  }

  return (
    <div
  style={{
    maxWidth: "420px",
    margin: "120px auto",
    padding: "30px",
    background: "#020617",
    borderRadius: "14px",
    boxShadow: "0 0 40px rgba(34,197,94,0.2)",
  }}
>

      <h1>SecureAuth Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    background: "#020617",
    border: "1px solid #22c55e",
    borderRadius: "8px",
    color: "#e5e7eb",
  }}
/>

      <br /><br />

      <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    background: "#020617",
    border: "1px solid #22c55e",
    borderRadius: "8px",
    color: "#e5e7eb",
  }}
/>

      <br /><br />

      <button
  onClick={login}
  style={{
    width: "100%",
    padding: "12px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "#020617",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Login
</button>

    </div>
  );
}

export default App;
