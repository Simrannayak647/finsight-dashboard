import { FiMenu } from "react-icons/fi";

export default function Navbar({ role, setRole, isOpen, setIsOpen }) {
  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-blue-600 text-white p-2 rounded-lg shadow hover:scale-105 transition"
        >
          <FiMenu size={22} />
        </button>

        <h1 className="text-xl font-bold text-blue-600">
          FinSight Dashboard
        </h1>

      </div>

      {/* RIGHT SECTION */}
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

    </header>
  );
}