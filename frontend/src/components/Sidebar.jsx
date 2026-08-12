import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaExclamationTriangle,
  FaPlusCircle,
  FaBook,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Incidents",
      path: "/incidents",
      icon: <FaExclamationTriangle />,
    },
    {
      name: "Create Incident",
      path: "/create-incident",
      icon: <FaPlusCircle />,
    },
    {
      name: "Lessons",
      path: "/lessons",
      icon: <FaBook />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-cyan-400">
          Incident AI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          AI Security Platform
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
              }`
            }
          >
            {item.icon}

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      <div className="p-4 border-t border-slate-800">

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition">
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;