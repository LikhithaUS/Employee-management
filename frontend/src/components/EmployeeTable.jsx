import { useNavigate } from "react-router-dom";
import API from "../api/employeeApi";

function EmployeeTable({ employees, fetchEmployees }) {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/${id}`);

            alert("Employee deleted successfully!");

            fetchEmployees();
        } catch (error) {
            console.error(error);
            alert("Failed to delete employee.");
        }
    };

    return (
        <table className="w-full min-w-[1000px]">

            <thead>
                <tr className="bg-gray-50 border-b border-gray-100">

                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                        Employee ID
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                        Employee
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                        Department
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                        Position
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                        Salary
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                        Status
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                        Actions
                    </th>

                </tr>
            </thead>


            <tbody className="divide-y divide-gray-100">

                {employees.map((employee) => (

                    <tr
                        key={employee._id}
                        className="hover:bg-gray-50 transition"
                    >

                        {/* Employee ID */}
                        <td className="px-5 py-4 text-sm font-medium text-gray-700">
                            {employee.employeeId}
                        </td>


                        {/* Employee */}
                        <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                    {employee.name
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {employee.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {employee.email}
                                    </p>
                                </div>

                            </div>

                        </td>


                        {/* Department */}
                        <td className="px-5 py-4 text-sm text-gray-600">
                            {employee.department || "-"}
                        </td>


                        {/* Position */}
                        <td className="px-5 py-4 text-sm text-gray-600">
                            {employee.position || "-"}
                        </td>


                        {/* Salary */}
                        <td className="px-5 py-4 text-sm text-gray-600">
                            {employee.salary
                                ? `₹${employee.salary}`
                                : "-"}
                        </td>


                        {/* Status */}
                        <td className="px-5 py-4">

                            <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${employee.status === "Inactive"
                                    ? "bg-red-50 text-red-600"
                                    : "bg-green-50 text-green-600"
                                    }`}
                            >
                                {employee.status || "Active"}
                            </span>

                        </td>


                        {/* Actions */}
                        <td className="px-5 py-4">

                            <div className="flex items-center gap-2">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/edit-employee/${employee._id}`
                                        )
                                    }
                                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(employee._id)
                                    }
                                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default EmployeeTable;