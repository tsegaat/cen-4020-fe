import React, { useState } from "react";

const InstructorDashboard = ({ onSignOut, user }) => {
    const [instructorInfo, setInstructorInfo] = useState({
        name: "Dr. Smith",
        department: "Computer Science",
        courses: [
            { name: "Introduction to Programming", students: 30 },
            { name: "Data Structures", students: 25 },
        ],
    });

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
                <button
                    onClick={onSignOut}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign Out
                </button>
            </div>
            <p>Welcome, {user.name}!</p>
            <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Information</h2>
                <p>
                    <strong>Name:</strong> {instructorInfo.name}
                </p>
                <p>
                    <strong>Department:</strong> {instructorInfo.department}
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
                <ul>
                    {instructorInfo.courses.map((course, index) => (
                        <li key={index}>
                            {course.name} - Students: {course.students}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InstructorDashboard;
