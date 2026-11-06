const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Employee", employeeSchema);