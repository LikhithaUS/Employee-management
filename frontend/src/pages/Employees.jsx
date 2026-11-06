import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/employeeApi";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");

    const fetchEmployees = async () => {
        try {
            const response = await API.get("/");
            setEmployees(response.data);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Get unique departments
    const departments = useMemo(() => {
        return [
            ...new Set(
                employees
                    .map((employee) => employee.department)
                    .filter(Boolean)
            ),
        ];
    }, [employees]);

    // Search + department filter
    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {

            const searchText = search.toLowerCase();

            const matchesSearch =
                employee.name?.toLowerCase().includes(searchText) ||
                employee.email?.toLowerCase().includes(searchText) ||
                employee.employeeId?.toLowerCase().includes(searchText);

            const matchesDepartment =
                department === "" ||
                employee.department === department;

            return matchesSearch && matchesDepartment;
        });
    }, [employees, search, department]);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Employee Management
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage employees, departments, and employee records.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/add-employee")}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    + Add Employee
                </button>

            </div>


            {/* Search + Filter */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Search Employees
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, ID or email..."
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>


                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Department
                        </label>

                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">
                                All Departments
                            </option>

                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

            </div>


            {/* Employee Count */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Employees
                    </h2>

                    <p className="text-sm text-gray-500">
                        {filteredEmployees.length} employee
                        {filteredEmployees.length !== 1 ? "s" : ""} found
                    </p>
                </div>

                {(search || department) && (
                    <button
                        onClick={() => {
                            setSearch("");
                            setDepartment("");
                        }}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Clear Filters
                    </button>
                )}

            </div>


            {/* Employee Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {loading ? (

                    <div className="p-10 text-center">
                        <p className="text-gray-500">
                            Loading employees...
                        </p>
                    </div>

                ) : filteredEmployees.length === 0 ? (

                    <div className="p-10 text-center">

                        <div className="text-4xl mb-3">
                            👥
                        </div>

                        <h3 className="font-semibold text-gray-700">
                            No employees found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Try changing your search or filter.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <EmployeeTable
                            employees={filteredEmployees}
                            fetchEmployees={fetchEmployees}
                        />

                    </div>

                )}

            </div>

        </div>
    );
}

export default Employees;