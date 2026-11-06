import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">

                <h2 className="text-2xl font-bold mb-6">
                    My Profile
                </h2>

                <div className="space-y-4">

                    <div>
                        <p className="text-gray-500 text-sm">
                            Name
                        </p>

                        <p className="text-lg font-semibold">
                            {user.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm">
                            Email
                        </p>

                        <p className="text-lg font-semibold">
                            {user.email}
                        </p>
                    </div>

                </div>

                <div className="flex gap-3 mt-6">

                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                    >
                        Back to Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/update-profile")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Update Profile
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Profile;