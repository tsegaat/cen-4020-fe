import React, { useState } from "react";

// Mock data
const mockCourses = [
    { id: 1, name: "Introduction to Computer Science", credits: 3 },
    { id: 2, name: "Data Structures", credits: 4 },
    { id: 3, name: "Algorithms", credits: 4 },
];

const Courses = ({ user }) => {
    const [courses, setCourses] = useState(mockCourses);
    const [newCourse, setNewCourse] = useState({ name: "", credits: "" });

    const handleAddCourse = (e) => {
        e.preventDefault();
        const course = {
            id: courses.length + 1,
            name: newCourse.name,
            credits: parseInt(newCourse.credits),
        };
        setCourses([...courses, course]);
        setNewCourse({ name: "", credits: "" });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-semibold mb-4">Courses</h2>
                    <ul className="space-y-2">
                        {courses.map((course) => (
                            <li key={course.id} className="text-gray-700">
                                {course.name} - Credits: {course.credits}
                            </li>
                        ))}
                    </ul>
                    {user.role === "staff" && (
                        <form onSubmit={handleAddCourse} className="mt-4">
                            <input
                                type="text"
                                placeholder="Course Name"
                                value={newCourse.name}
                                onChange={(e) =>
                                    setNewCourse({
                                        ...newCourse,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <input
                                type="number"
                                placeholder="Credits"
                                value={newCourse.credits}
                                onChange={(e) =>
                                    setNewCourse({
                                        ...newCourse,
                                        credits: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <button
                                type="submit"
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add Course
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;
