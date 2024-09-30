import React, { useState } from "react";

const StudentDashboard = ({ onSignOut, user }) => {
    const [studentInfo, setStudentInfo] = useState({
        name: "John Doe",
        major: "Computer Science",
        courses: [
            { name: "Introduction to Programming", grade: "A" },
            { name: "Data Structures", grade: "B+" },
        ],
        gpa: 3.5,
    });

    const [whatIfParams, setWhatIfParams] = useState({
        currentGPA: 3.5,
        targetGPA: "",
        numCourses: "",
        creditPerCourse: 3,
    });

    const [whatIfResult, setWhatIfResult] = useState(null);

    const performWhatIfAnalysis = () => {
        const { currentGPA, targetGPA, numCourses, creditPerCourse } =
            whatIfParams;

        if (targetGPA) {
            // Scenario 2: Calculate required GPA for target
            const totalCredits = studentInfo.courses.length * creditPerCourse;
            const newTotalCredits = totalCredits + numCourses * creditPerCourse;
            const requiredGPA =
                (targetGPA * newTotalCredits - currentGPA * totalCredits) /
                (numCourses * creditPerCourse);

            setWhatIfResult(
                `To achieve a GPA of ${targetGPA}, you need to earn an average GPA of ${requiredGPA.toFixed(
                    2
                )} in your next ${numCourses} courses.`
            );
        } else {
            // Scenario 1: Calculate new GPA after N courses
            const randomGrades = Array(parseInt(numCourses))
                .fill()
                .map(() => Math.random() * 4); // Random GPAs between 0 and 4
            const newGPA =
                (currentGPA * studentInfo.courses.length +
                    randomGrades.reduce((a, b) => a + b, 0)) /
                (studentInfo.courses.length + randomGrades.length);

            setWhatIfResult(
                `If you take ${numCourses} more courses, your new GPA could be approximately ${newGPA.toFixed(
                    2
                )}.`
            );
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <button
                    onClick={onSignOut}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign Out
                </button>
            </div>
            <p>Welcome, {user.name}!</p>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Information</h2>
                <p>
                    <strong>Name:</strong> {studentInfo.name}
                </p>
                <p>
                    <strong>Major:</strong> {studentInfo.major}
                </p>
                <p>
                    <strong>Current GPA:</strong> {studentInfo.gpa}
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
                <ul>
                    {studentInfo.courses.map((course, index) => (
                        <li key={index}>
                            {course.name} - Grade: {course.grade}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">What-If Analysis</h2>
                <div className="mb-2">
                    <input
                        type="number"
                        placeholder="Current GPA"
                        value={whatIfParams.currentGPA}
                        onChange={(e) =>
                            setWhatIfParams({
                                ...whatIfParams,
                                currentGPA: e.target.value,
                            })
                        }
                        className="border p-2 mr-2"
                    />
                    <input
                        type="number"
                        placeholder="Target GPA (optional)"
                        value={whatIfParams.targetGPA}
                        onChange={(e) =>
                            setWhatIfParams({
                                ...whatIfParams,
                                targetGPA: e.target.value,
                            })
                        }
                        className="border p-2 mr-2"
                    />
                    <input
                        type="number"
                        placeholder="Number of Courses"
                        value={whatIfParams.numCourses}
                        onChange={(e) =>
                            setWhatIfParams({
                                ...whatIfParams,
                                numCourses: e.target.value,
                            })
                        }
                        className="border p-2 mr-2"
                    />
                    <button
                        onClick={performWhatIfAnalysis}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Analyze
                    </button>
                </div>
                {whatIfResult && (
                    <div className="bg-gray-100 p-4 rounded">
                        <h3 className="font-semibold">Analysis Result:</h3>
                        <p>{whatIfResult}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
