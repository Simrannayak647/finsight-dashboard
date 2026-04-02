export default function Navbar({ role, setRole }) {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">

      <h1 className="text-xl font-bold text-blue-600">
        FinSight Dashboard
      </h1>

      <div className="flex gap-3 items-center">
        <span className="text-sm">👤 Role</span>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

    </nav>
  );
}