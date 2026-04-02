import {
  FiHome,
  FiMenu,
  FiX,
  FiTrendingUp,
  FiPieChart,
  FiSettings

} from "react-icons/fi";

export default function Sidebar({page,setPage , role,setRole,isOpen,setIsOpen}) {
  return (
    <>
    {/* HAMBURGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 md:hidden z-50 bg-blue-700 text-white p-3 rounded-lg shadow-lg"
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}


     <aside
        className={`
        fixed md:static top-0 left-0 h-full w-60
        bg-gradient-to-b from-blue-600 to-blue-800 text-white
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        transition-transform duration-300 ease-in-out
        flex flex-col justify-between shadow-xl z-40
        `}
      >
      {/* LOGO */}
      <div>
        <div className="flex items-center gap-3 p-6 border-b border-white/20">
        
          <h2 className="text-2xl font-bold tracking-wide">
            FinSight
          </h2>
        </div>

        {/* NAVIGATION */}
         <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<FiHome />} label="Dashboard" />
          <NavItem icon={<FiTrendingUp />} label="Analytics" />
          <NavItem icon={<FiPieChart />} label="Reports" />
          <NavItem icon={<FiSettings />} label="Settings" />
        </nav>
      </div>

      {/* USER SECTION */}
      <div className="p-6 border-t border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            👤
          </div>
          <div>
            <p className="font-semibold">Simran</p>
            <p className="text-xs text-white/70">Admin</p>
          </div>
        </div>
      </div>

    </aside>
    </>
  );
}
function NavItem({ icon, label }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
      {icon}
      {label}
    </div>
  );
}