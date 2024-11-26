import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { backendAccessor } from "../accessor/backendAccessor";

const InstructorDashboard = () => {
    const userId = Cookies.get("cen-userId");
    const [instructorInfo, setInstructorInfo] = useState({
        name: "",
        Instructor: {
            courses: [{ name: "", department: "" }],
            major: "",
            gpa: 0,
        },
    });
    const [studentsInCourses, setStudentsInCourses] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await backendAccessor.getUser(userId);
            setInstructorInfo(res);
        };
        fetchUser();

        const fetchStudentsInCourses = async () => {
            const res = await backendAccessor.getStudentsInInstructorCourse(
                userId
            );
            const uniqueStudents = [
                ...new Set(res.map((student) => student.user.name)),
            ];
            setStudentsInCourses(uniqueStudents);
        };
        fetchStudentsInCourses();
    }, [userId]);

    const onSignOut = () => {
        Cookies.remove("cen-userId");
        Cookies.remove("cen-userRole");
        window.location.href = "/";
    };

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
            <p>Welcome, {instructorInfo.name}!</p>
            <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Information</h2>
                <p>
                    <strong>Name:</strong> {instructorInfo.name}
                </p>
                <p>
                    <strong>Department:</strong>{" "}
                    {instructorInfo.Instructor.courses[0].department}
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
                <ul>
                    {instructorInfo.Instructor.courses.map((course, index) => (
                        <li key={index}>
                            {/* {course.name} - Students: {course.students} */}
                            {course.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Students</h2>
                <ul>
                    {studentsInCourses.map((student, index) => (
                        <li key={index}>{student}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InstructorDashboard;
