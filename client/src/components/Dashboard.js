import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";

function Dashboard({ token }) {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/login-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setHistory(data.history);
      })
      .catch(() => {
        setError("Failed to load login history");
      });
  }, [token]);

  const riskData = [
  {
    name: "LOW",
    value: history.filter((h) => h.riskLevel === "LOW").length,
  },
  {
    name: "MEDIUM",
    value: history.filter((h) => h.riskLevel === "MEDIUM").length,
  },
  {
    name: "HIGH",
    value: history.filter((h) => h.riskLevel === "HIGH").length,
  },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div style={{ padding: "30px" }}>
      <h2>🔐 Login Activity Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3 style={{ marginTop: "30px" }}>⚠️ Login Risk Distribution</h3>

<PieChart width={400} height={300}>
  <Pie
    data={riskData}
    cx="50%"
    cy="50%"
    outerRadius={100}
    dataKey="value"
    label
  >
    {riskData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>


      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>IP Address</th>
            <th>Device</th>
            <th>Risk Score</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.loginTime).toLocaleString()}</td>
              <td>{item.ipAddress}</td>
              <td>{item.userAgent?.slice(0, 30)}...</td>
              <td>{item.riskScore}</td>
              <td
                style={{
                  color:
                    item.riskLevel === "HIGH"
                      ? "red"
                      : item.riskLevel === "MEDIUM"
                      ? "orange"
                      : "green",
                }}
              >
                {item.riskLevel}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Dashboard;
