import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Settings, ChevronDown, LogOut } from "lucide-react";

export default function Header({ role = "admin", username = "Admin User", initials = "AD" }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b  bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-1 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 font-bold text-blue-600">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-bold">HelpDesk Pro</h1>
            <p className="text-xs text-gray-500 capitalize">{role} Dashboard</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 relative">
          <button className="p-2 rounded hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 p-2 border rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-8 h-7.5 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                {initials}
              </div>
              <span className="hidden sm:inline">{username}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                <div className="px-4 py-2 text-gray-500 font-semibold">My Account</div>
                <hr className="border-gray-200" />
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
                <hr className="border-gray-200" />
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => navigate("/")}
                >
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
