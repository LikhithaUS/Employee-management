import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AUTH_API from "../api/authApi";

function UpdateProfile() {
    const navigate = useNavigate();

    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [name, setName] = useState(storedUser?.name || "");
    const [email, setEmail] = useState(storedUser?.email || "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AUTH_API.put(
                `/profile/${storedUser.id}`,
                {
                    name,
                    email,
                }
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Profile updated successfully!");

            navigate("/profile");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update profile."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">

                <h2 className="text-2xl font-bold mb-6">
                    Update Profile
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>
                        <label className="block mb-1 font-medium">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Update Profile
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default UpdateProfile;