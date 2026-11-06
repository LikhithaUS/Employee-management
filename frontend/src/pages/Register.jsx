import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AUTH_API from "../api/authApi";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            await AUTH_API.post("/register", formData);

            setSuccess(
                "Registration successful! Redirecting to login..."
            );

            setFormData({
                name: "",
                email: "",
                password: "",
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden">

                {/* Background decoration */}
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500 rounded-full opacity-50"></div>

                <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-blue-700 rounded-full opacity-60"></div>

                <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 text-white">

                    {/* Logo */}
                    <div className="flex items-center gap-4 mb-10">

                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-blue-600 text-xl font-bold">
                                EMS
                            </span>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold">
                                Employee Management
                            </h1>

                            <p className="text-blue-100 text-sm">
                                System
                            </p>
                        </div>

                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                        Build your
                        <br />
                        workspace today.
                    </h2>

                    <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                        Create your account and start managing
                        employees, departments and organization
                        information from one place.
                    </p>

                    {/* Features */}
                    <div className="mt-10 space-y-4">

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                ✓
                            </div>

                            <span className="text-blue-50">
                                Simple employee management
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                ✓
                            </div>

                            <span className="text-blue-50">
                                Organized employee information
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                ✓
                            </div>

                            <span className="text-blue-50">
                                Secure account access
                            </span>
                        </div>

                    </div>

                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-10">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">

                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">

                            <span className="text-white text-xl font-bold">
                                EMS
                            </span>

                        </div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            Employee Management System
                        </h1>

                    </div>

                    {/* Register Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 sm:p-9">

                        {/* Header */}
                        <div className="mb-8">

                            <h2 className="text-3xl font-bold text-gray-900">
                                Create account
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Get started with your employee management
                                account.
                            </p>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">

                                <span className="font-bold">
                                    !
                                </span>

                                <span>
                                    {error}
                                </span>

                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="mb-5 flex items-start gap-3 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm">

                                <span className="font-bold">
                                    ✓
                                </span>

                                <span>
                                    {success}
                                </span>

                            </div>
                        )}

                        <form
                            onSubmit={handleRegister}
                            autoComplete="off"
                            className="space-y-5"
                        >

                            {/*Username */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Username
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">

                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>

                                    </div>

                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Email */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">

                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>

                                    </div>

                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Password */}
                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">

                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>

                                    </div>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-16 py-3.5 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>

                                <p className="text-xs text-gray-400 mt-2">
                                    Password must contain at least 6
                                    characters.
                                </p>

                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Creating account...
                                    </span>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                        </form>

                        {/* Login */}
                        <div className="text-center mt-7 pt-6 border-t border-gray-100">

                            <p className="text-sm text-gray-500">
                                Already have an account?
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="mt-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                            >
                                Sign in to your account
                            </button>

                        </div>

                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-400 mt-6">
                        © 2026 Employee Management System
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;