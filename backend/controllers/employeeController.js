const Employee = require("../models/Employee");

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add (post) employee
const addEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update(put) employee
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);

        res.json({ message: "Employee Deleted Successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
};