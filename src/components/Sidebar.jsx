export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#111827",
      color: "white",
      padding: "20px"
    }}>
      <h2>FinSight</h2>

      <ul style={{marginTop:"30px"}}>
        <li>Dashboard</li>
        <li>Transactions</li>
        <li>Insights</li>
      </ul>
    </div>
  );
}