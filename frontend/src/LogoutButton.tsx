import React, { useState } from "react";

const LogoutButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("githubToken");
        window.location.href = "/";
    };

    return (
        <>
            {/* Button that triggers the modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-2 py-1 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                Logout
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-64">
                        <h2 className="text-xl font-semibold text-center">Confirm Logout</h2>
                        <p className="text-center mt-4">Are you sure you want to log out?</p>
                        <div className="mt-6 flex justify-around">
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Yes, Log Out
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutButton;
