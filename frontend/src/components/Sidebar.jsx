import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: "📊",
        },
        {
            name: "Add Employee",
            path: "/add-employee",
            icon: "➕",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "👤",
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="w-72 h-screen bg-slate-900 text-white flex flex-col shadow-2xl sticky top-0">

            {/* Logo */}
            <div className="px-8 py-8 border-b border-slate-700">

                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold">
                            EMS
                        </span>
                    </div>

                    <div>
                        <h1 className="text-xl font-bold">
                            Employee
                        </h1>

                        <p className="text-slate-400 text-sm">
                            Management System
                        </p>
                    </div>

                </div>

            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6 space-y-3">

                <p className="text-slate-500 text-xs uppercase px-4 mb-4">
                    Main Menu
                </p>

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 ${isActive
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-slate-300 hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="text-lg">
                            {item.icon}
                        </span>

                        <span className="font-medium">
                            {item.name}
                        </span>
                    </NavLink>
                ))}

            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-slate-700">

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-red-300 hover:bg-red-500 hover:text-white transition"
                >
                    <span className="text-lg">
                        🚪
                    </span>

                    <span className="font-medium">
                        Logout
                    </span>
                </button>

            </div>

        </div>
    );
}

export default Sidebar;