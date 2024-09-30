import React, { useState } from "react";

const mockUsers = [
    { id: 1, name: "John Doe", role: "student" },
    { id: 2, name: "Jane Smith", role: "instructor" },
    { id: 3, name: "Bob Johnson", role: "advisor" },
];

const Users = ({ user }) => {
    const [users, setUsers] = useState(mockUsers);
    const [newUser, setNewUser] = useState({ name: "", role: "" });

    const handleAddUser = (e) => {
        e.preventDefault();
        const user = {
            id: users.length + 1,
            name: newUser.name,
            role: newUser.role,
        };
        setUsers([...users, user]);
        setNewUser({ name: "", role: "" });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-semibold mb-4">Users</h2>
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user.id} className="text-gray-700">
                                {user.name} - Role: {user.role}
                            </li>
                        ))}
                    </ul>
                    {user.role === "staff" && (
                        <form onSubmit={handleAddUser} className="mt-4">
                            <input
                                type="text"
                                placeholder="User Name"
                                value={newUser.name}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <select
                                value={newUser.role}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        role: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="advisor">Advisor</option>
                                <option value="staff">Staff</option>
                            </select>
                            <button
                                type="submit"
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add User
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
