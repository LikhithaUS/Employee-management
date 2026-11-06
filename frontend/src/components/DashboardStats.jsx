import { useNavigate } from "react-router-dom";

function DashboardStats({ employees }) {
    const navigate = useNavigate();

    const totalEmployees = employees.length;

    const departments = [
        ...new Set(
            employees
                .map((employee) => employee.department)
                .filter(Boolean)
        ),
    ];

    const departmentsCount = departments.length;

    const activeEmployees = employees.filter(
        (employee) => employee.status !== "Inactive"
    ).length;

    // Show only 3 recently added employees as a dashboard summary
    const recentlyAdded = [...employees]
        .slice(-3)
        .reverse();

    return (
        <div className="space-y-6">

            {/* ================= Welcome Section ================= */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Overview of your employee management system.
                </p>
            </div>


            {/* ================= Statistics Cards ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                {/* Total Employees */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Total Employees
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {totalEmployees}
                            </h2>

                            <p className="text-xs text-gray-400 mt-2">
                                All registered employees
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <span className="text-2xl">👥</span>
                        </div>

                    </div>
                </div>


                {/* Departments */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Departments
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {departmentsCount}
                            </h2>

                            <p className="text-xs text-gray-400 mt-2">
                                Active departments
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <span className="text-2xl">🏢</span>
                        </div>

                    </div>
                </div>


                {/* Active Employees */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Active Employees
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {activeEmployees}
                            </h2>

                            <p className="text-xs text-gray-400 mt-2">
                                Currently active
                            </p>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                            <span className="text-2xl">✓</span>
                        </div>

                    </div>
                </div>

            </div>


            {/* ================= Quick Actions ================= */}
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-800">
                        Quick Actions
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Quickly access common employee management tasks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Add Employee */}
                    <button
                        onClick={() => navigate("/add-employee")}
                        className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-left hover:shadow-md hover:border-blue-200 transition group"
                    >
                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:bg-blue-100 transition">
                                +
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    Add Employee
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Add a new employee to the system.
                                </p>
                            </div>

                        </div>
                    </button>


                    {/* View Employees */}
                    <button
                        onClick={() => navigate("/employees")}
                        className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-left hover:shadow-md hover:border-green-200 transition group"
                    >
                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl group-hover:bg-green-100 transition">
                                👥
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    View Employees
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Manage all employees and records.
                                </p>
                            </div>

                        </div>
                    </button>

                </div>
            </div>


            {/* ================= Recently Added ================= */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            Recently Added
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Latest employees added to the system.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/employees")}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        View All →
                    </button>

                </div>


                <div className="p-6">

                    {recentlyAdded.length === 0 ? (

                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                No employees available.
                            </p>
                        </div>

                    ) : (

                        <div className="space-y-3">

                            {recentlyAdded.map((employee) => (

                                <div
                                    key={employee._id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                            {employee.name
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {employee.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {employee.department || "No department"}
                                            </p>
                                        </div>

                                    </div>

                                    <p className="hidden sm:block text-sm text-gray-500">
                                        {employee.position || "No position"}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default DashboardStats;