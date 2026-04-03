import { FiMenu, FiBell, FiUser, FiChevronDown } from "react-icons/fi";

export default function Navbar({ role, setRole, isOpen, setIsOpen }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <FiMenu size={20} />
          </button>

          {/* Logo + Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              FinSight
            </h1>
            <span className="hidden sm:inline-block text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              Dashboard
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification bell (optional) */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <FiBell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Role selector with modern styling */}
          <div className="flex items-center gap-2 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/60 px-3 py-1.5 shadow-sm">
            <FiUser size={14} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-600 hidden sm:block">Role</span>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none bg-transparent text-sm font-medium text-gray-800 pr-6 focus:outline-none cursor-pointer"
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
              <FiChevronDown
                size={14}
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>
          </div>

          {/* User avatar (placeholder) */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium shadow-sm">
              S
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}