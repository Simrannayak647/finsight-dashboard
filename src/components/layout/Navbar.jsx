import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiBell, FiUser, FiChevronDown, FiEye, FiShield, FiUserCheck } from "react-icons/fi";

export default function Navbar({ role, setRole, isOpen, setIsOpen }) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role options with labels and icons
  const roleOptions = [
    { value: 'viewer', label: 'Viewer', icon: FiEye, description: 'Read-only access' },
    { value: 'admin', label: 'Admin', icon: FiShield, description: 'Full control' },
  ];

  const currentRoleOption = roleOptions.find(opt => opt.value === role) || roleOptions[0];
  const CurrentIcon = currentRoleOption.icon;

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <FiMenu size={20} />
          </button>

          {/* Logo + Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200/50">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent tracking-tight">
              FinSight
            </h1>
            <span className="hidden sm:inline-block text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
              Dashboard
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification bell */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* MODERN ROLE SELECTOR - Custom Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 bg-white rounded-xl border border-gray-200/80 px-3 py-1.5 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 group"
            >
              <div className="flex items-center gap-1.5 text-gray-500">
                <FiUser size={13} className="group-hover:text-blue-600 transition-colors" />
                <span className="text-xs font-medium text-gray-500 hidden sm:block">Role</span>
              </div>
              <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <CurrentIcon size={14} className="text-blue-600" />
                <span className="text-sm font-semibold text-gray-800">{currentRoleOption.label}</span>
                <FiChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform duration-200 ${roleDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-50">
                  <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Select role</p>
                </div>
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = role === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleRoleChange(option.value)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-150 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50/80 to-indigo-50/80 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`p-1 rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                          {option.label}
                        </p>
                        <p className="text-[11px] text-gray-400">{option.description}</p>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium shadow-sm ring-2 ring-white">
              U
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-gray-700">User</p>
              <p className="text-[10px] text-gray-400">user@finsight.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}