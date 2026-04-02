export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#111827",
      color: "white",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      
      <div>
        <h2>FinSight</h2>

        <ul style={{marginTop:"30px", listStyle:"none", padding:0}}>
          <li>📊 Dashboard</li>
          <li>💳 Transactions</li>
          <li>📈 Insights</li>
        </ul>

        <div style={{marginTop:"30px"}}>
          <label>Role</label>
          <select style={{width:"100%", marginTop:"5px"}}>
            <option>Viewer</option>
            <option>Admin</option>
          </select>
        </div>
      </div>

      <div>
        <p>👤 Simran</p>
        <button>🌙 Dark Mode</button>
      </div>

    </div>
  );
}