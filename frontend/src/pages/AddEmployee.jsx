import { useState } from "react";
import API from "../api/employeeApi";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        employeeId: "",
        name: "",
        department: "",
        position: "",
        salary: "",
        email: "",
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        if (
            !employee.employeeId ||
            !employee.name ||
            !employee.department ||
            !employee.position ||
            !employee.salary ||
            !employee.email
        ) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await API.post("/", employee);

            alert("Employee added successfully!");

            // Optional: Reset the form
            setEmployee({
                employeeId: "",
                name: "",
                department: "",
                position: "",
                salary: "",
                email: "",
            });

            // Go back to the dashboard
            navigate("/");
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Failed to add employee.");
            }
        }
        try {
            await API.put("/", employee);

            alert("Employee updated successfully!");

            // Optional: Reset the form
            setEmployee({
                employeeId: "",
                name: "",
                department: "",
                position: "",
                salary: "",
                email: "",
            });

            // Go back to the dashboard
            navigate("/");
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Failed to update employee.");
            }
        }
    };
    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow cursor-pointer">
            <h2 className="text-2xl font-bold mb-6">Add Employee</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="employeeId"
                    placeholder="Employee ID"
                    value={employee.employeeId}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={employee.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={employee.department}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={employee.position}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={employee.salary}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={employee.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                    Add Employee
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="ml-50 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                    Back
                </button>
            </form>
        </div>
    );
}

export default AddEmployee;