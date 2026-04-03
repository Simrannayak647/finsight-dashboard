import { useEffect } from "react";
import {
  FiHome,
  FiTrendingUp,
  FiPieChart,
  FiSettings,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiActivity,
} from "react-icons/fi";

const navItems = [
  { label: "Dashboard", icon: FiHome },
  { label: "Analytics", icon: FiTrendingUp },
  { label: "Reports", icon: FiPieChart },
  { label: "Settings", icon: FiSettings },
];

export default function Sidebar({ page, setPage, role, setRole, isOpen, setIsOpen }) {
  // Set default page if not set
  useEffect(() => {
    if (!page && setPage) {
      setPage("Dashboard");
    }
  }, [page, setPage]);

  // Handle role toggle for demo purposes
  const handleRoleToggle = () => {
    if (setRole) {
      setRole(role === "Admin" ? "Viewer" : "Admin");
    }
  };

  // Handle navigation click
  const handleNavClick = (label) => {
    if (setPage) {
      setPage(label);
    }
    if (setIsOpen) {
      setIsOpen(false); // Close sidebar on mobile after navigation
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-72
          bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
          text-white
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-all duration-300 ease-out
          flex flex-col justify-between
          shadow-2xl z-40
          md:rounded-r-2xl
          border-r border-white/10
        `}
      >
        {/* Logo Section */}
        <div>
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                <FiActivity className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  FinSight
                </h2>
                <p className="text-xs text-white/50 font-medium">Financial Intelligence</p>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = page === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label)}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl
                    transition-all duration-200 ease-out
                    group relative overflow-hidden
                    ${isActive
                      ? "bg-white/15 text-white shadow-lg shadow-blue-500/10"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
                  )}
                  
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110 text-blue-400" : "group-hover:scale-105"}`} />
                  <span className={`font-medium ${isActive ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                  
                  {/* Subtle hover shine */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Section */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 cursor-pointer group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Role</p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-white/60">{role || "Admin"}</span>
                {setRole && (
                  <button
                    onClick={handleRoleToggle}
                    className="text-white/40 hover:text-white/80 transition-colors"
                    aria-label="Toggle role"
                  >
                    <FiChevronDown className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white/80"
              aria-label="Sign out"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
          
        
          
        </div>
      </aside>
    </>
  );
}