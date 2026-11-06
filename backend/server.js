const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes 👇
app.use("/api/employees", employeeRoutes);

//Auth Routes 👇
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Employee Management API is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});