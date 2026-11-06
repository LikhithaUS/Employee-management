import { useEffect, useState } from "react";
import API from "../api/employeeApi";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        employeeId: "",
        name: "",
        department: "",
        position: "",
        salary: "",
        email: "",
    });

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const response = await API.get("/");
            const emp = response.data.find((e) => e._id === id);

            if (emp) {
                setEmployee(emp);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/${id}`, employee);

            alert("Employee updated successfully!");

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to update employee.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 cursor-pointer">
                Edit Employee
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="employeeId"
                    value={employee.employeeId}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                    Update Employee
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                >
                    Cancel
                </button>

            </form>
        </div>
    );
}

export default EditEmployee;