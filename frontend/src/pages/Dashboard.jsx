import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmployeeTable from "../components/EmployeeTable";
import DashboardStats from "../components/DashboardStats";

import API from "../api/employeeApi";

function Dashboard() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");

    const fetchEmployees = async () => {
        try {
            const response = await API.get("/");
            setEmployees(response.data);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Search + Department Filter
    const filteredEmployees = employees.filter((employee) => {
        const matchesSearch = employee.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesDepartment =
            !departmentFilter ||
            employee.department.toLowerCase() ===
            departmentFilter.toLowerCase();

        return matchesSearch && matchesDepartment;
    });

    return (
        <div className="flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 bg-slate-50 min-h-screen">

                {/* Navbar */}
                <Navbar />

                {/* Dashboard Content */}
                <div className="p-8">

                    {/* Dashboard Statistics + Recent Employees */}
                    <DashboardStats employees={employees} />

                    {/* Employee Management Section */}
                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                        {/* Top Section */}
                        <div className="flex justify-between items-center mb-6">

                            {/* Search + Department Filter */}
                            <div className="flex items-center">

                                {/* Search */}
                                <input
                                    type="text"
                                    placeholder="Search employee by name..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="border border-gray-300 rounded-xl px-4 py-3 w-80 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                                />

                                {/* Department Filter */}
                                <select
                                    value={departmentFilter}
                                    onChange={(e) =>
                                        setDepartmentFilter(e.target.value)
                                    }
                                    className="border border-gray-300 rounded-xl px-4 py-3 ml-4 w-56 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                                >
                                    <option value="">
                                        All Departments
                                    </option>

                                    {[
                                        ...new Set(
                                            employees
                                                .map(
                                                    (employee) =>
                                                        employee.department
                                                )
                                                .filter(Boolean)
                                        ),
                                    ].map((department) => (
                                        <option
                                            key={department}
                                            value={department}
                                        >
                                            {department}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            {/* Add Employee */}
                            <button
                                onClick={() =>
                                    navigate("/add-employee")
                                }
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-blue-700 transition"
                            >
                                Add Employee
                            </button>

                        </div>

                        {/* Employee Table */}
                        <EmployeeTable
                            employees={filteredEmployees}
                            fetchEmployees={fetchEmployees}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;