function Navbar() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">

            {/* Left Side */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Employee Management Dashboard
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Manage your employees efficiently
                </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

                {/* User Avatar */}
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                        {user?.name
                            ? user.name.charAt(0).toUpperCase()
                            : "U"}
                    </span>
                </div>

                {/* User Information */}
                <div className="hidden sm:block">

                    <p className="text-sm font-semibold text-gray-800">
                        {user?.name || "User"}
                    </p>

                    <p className="text-xs text-gray-500">
                        Administrator
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Navbar;