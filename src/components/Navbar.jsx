export default function Navbar() {
  return (
    <div style={{
      height: "60px",
      background: "#f3f4f6",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px"
    }}>
      <h3>Finance Dashboard</h3>

      <select>
        <option>Viewer</option>
        <option>Admin</option>
      </select>
    </div>
  );
}