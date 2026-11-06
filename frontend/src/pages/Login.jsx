import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AUTH_API from "../api/authApi";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter username and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await AUTH_API.post("/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setSuccess("Login successful! Redirecting...");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Invalid username or password"
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

                    <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                        Manage your
                        <br />
                        employees smarter.
                    </h2>

                    <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                        A simple and efficient platform to manage
                        employees, departments, profiles and
                        organization data in one place.
                    </p>

                    {/* Features */}
                    <div className="mt-10 space-y-4">

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                ✓
                            </div>

                            <span className="text-blue-50">
                                Easy employee management
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                ✓
                            </div>

                            <span className="text-blue-50">
                                Secure authentication
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                ✓
                            </div>

                            <span className="text-blue-50">
                                Centralized employee data
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

                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 sm:p-9">

                        {/* Header */}
                        <div className="mb-8">

                            <h2 className="text-3xl font-bold text-gray-900">
                                Welcome back
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Sign in to continue to your dashboard.
                            </p>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-4 text-sm text-red-500">
                                {error}
                            </div>
                        )}
                        {/* Success */}
                        {success && (
                            <div className="mb-4 text-sm text-green-500">
                                {success}
                            </div>
                        )}

                        <form
                            onSubmit={handleLogin}
                            autoComplete="off"
                            className="space-y-5"
                        >

                            {/* Username */}
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
                                        name="username"
                                        autoComplete="off"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
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
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
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
                                                    d="M3 3l18 18M10.58 10.58a2 2 0 102.83 2.83M9.88 5.09A9.77 9.77 0 0112 5c5 0 9 3 10 7a10.3 10.3 0 01-4.1 5.36M6.1 6.1C4.45 7.17 3.27 8.72 2 12c1 4 5 7 10 7 1.61 0 3.11-.36 4.43-1"
                                                />
                                            </svg>
                                        ) : (
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
                                                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="3"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                        </form>

                        {/* Register */}
                        <div className="text-center mt-7 pt-6 border-t border-gray-100">

                            <p className="text-sm text-gray-500">
                                Don't have an account?
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                className="mt-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                            >
                                Create an account
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

export default Login;