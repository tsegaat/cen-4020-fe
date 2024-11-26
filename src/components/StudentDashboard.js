import React, { useEffect, useState } from "react";
import { backendAccessor } from "../accessor/backendAccessor";
import Cookies from "js-cookie";

const StudentDashboard = () => {
    const userId = Cookies.get("cen-userId");
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        Student: {
            enrollments: [],
            major: "",
            gpa: 0,
        },
    });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await backendAccessor.getUser(userId);
            console.log(res);
            setStudentInfo(res);
        };
        fetchUser();
    }, [userId]);

    const [whatIfParams, setWhatIfParams] = useState({
        currentGPA: 3.5,
        targetGPA: "",
        numCourses: "",
        creditPerCourse: 3,
    });

    const [whatIfResult, setWhatIfResult] = useState(null);

    const onSignOut = () => {
        Cookies.remove("cen-userId");
        Cookies.remove("cen-userRole");
        window.location.href = "/";
    };

    const performWhatIfAnalysis = () => {
        const { currentGPA, targetGPA, numCourses, creditPerCourse } =
            whatIfParams;
        const currentEnrollments = studentInfo.Student.enrollments;
        const totalCurrentCredits = currentEnrollments.length * creditPerCourse;

        if (targetGPA) {
            // Scenario 2: Calculate required GPA for target
            const newTotalCredits =
                totalCurrentCredits + numCourses * creditPerCourse;
            const requiredGPA =
                (targetGPA * newTotalCredits -
                    currentGPA * totalCurrentCredits) /
                (numCourses * creditPerCourse);

            // Check if the required GPA is achievable (between 0 and 4.0)
            if (requiredGPA < 0 || requiredGPA > 4.0) {
                setWhatIfResult(
                    `Target GPA of ${targetGPA} is not achievable with ${numCourses} courses.`
                );
            } else {
                setWhatIfResult(
                    `To achieve a GPA of ${targetGPA}, you need to earn an average GPA of ${requiredGPA.toFixed(
                        2
                    )} in your next ${numCourses} courses.`
                );
            }
        } else {
            // Scenario 1: Project GPA if all future courses are the same as current GPA
            const projectedGPA =
                (currentGPA * totalCurrentCredits +
                    currentGPA * numCourses * creditPerCourse) /
                (totalCurrentCredits + numCourses * creditPerCourse);

            setWhatIfResult(
                `If you maintain your current performance level for ${numCourses} more courses, your GPA would remain at ${projectedGPA.toFixed(
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
            <p>Welcome, {studentInfo.name}!</p>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Information</h2>
                <p>
                    <strong>Name:</strong> {studentInfo.name}
                </p>
                <p>
                    <strong>Major:</strong> {studentInfo.Student.major}
                </p>
                <p>
                    <strong>Current GPA:</strong> {studentInfo.Student.gpa}
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
                <ul>
                    {studentInfo.Student.enrollments.map(
                        (enrollment, index) => (
                            <li key={index}>
                                {enrollment.course.name} - Grade:{" "}
                                {enrollment.grade}
                            </li>
                        )
                    )}
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
