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
    {/* HAMBURGER BUTTON */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="fixed top-4 left-4 z-50 md:hidden bg-blue-700 text-white p-2 rounded-lg shadow-lg hover:scale-105 transition"
>
  {isOpen ? <FiX size={22}/> : <FiMenu size={22}/>}
</button>

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
          <div className="bg-white text-blue-700 p-2 rounded-lg font-bold">
          {/* <FiMenu size={20}/> */}
          </div>
          <h2 className="text-2xl font-bold tracking-wide">
            FinSight
          </h2>
        </div>

        {/* NAVIGATION */}
        <nav className="mt-6 px-3 space-y-2">

          <a
  onClick={() => setPage("dashboard")}
  className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer
  ${page==="dashboard" ? "bg-white/20" : "hover:bg-white/10"}`}
>
  <FiHome size={20}/>
  Dashboard
</a>

          <a className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
            <FiTrendingUp size={20}/>
            Analytics
          </a>

          <a className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
            <FiPieChart size={20}/>
            Reports
          </a>

          <a className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
            <FiSettings size={20}/>
            Settings
          </a>

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