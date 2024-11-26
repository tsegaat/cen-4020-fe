import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { backendAccessor } from "../accessor/backendAccessor";

const AdvisorDashboard = () => {
    const [user, setUser] = useState({
        name: "",
        Advisor: {
            department: "",
            students: [{ major: "", user: {}, enrollments: [] }],
        },
    });

    const [students, setStudents] = useState([
        {
            id: null,
            name: "",
            major: "",
            courses: [],
            gpa: null,
        },
    ]);

    const [courses, setCourses] = useState([
        {
            id: 1,
            name: "",
            department: "",
        },
    ]);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [whatIfParams, setWhatIfParams] = useState({
        targetGPA: "",
        numCourses: "",
        creditPerCourse: 3,
    });
    const [whatIfResult, setWhatIfResult] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState("");

    useEffect(() => {
        const user = Cookies.get("cen-userId");
        const fetchUser = async () => {
            const res = await backendAccessor.getUser(user);
            setStudents(
                res.Advisor.students.map((s) => {
                    return {
                        id: s.id,
                        name: s.user.name,
                        major: s.major,
                        gpa: s.gpa,
                        courses: s.enrollments.map((e) => e.course.name),
                    };
                })
            );
            setUser(res);
        };
        fetchUser();
        const fetchCourses = async () => {
            const res = await backendAccessor.getCourses();
            setCourses(res);
        };
        fetchCourses();
    }, []);

    const onSignOut = () => {
        Cookies.remove("cen-userId");
        Cookies.remove("cen-userRole");
        window.location.href = "/";
    };

    const addStudentToCourse = async (studentId, courseId) => {
        try {
            await backendAccessor.addStudentToCourse(studentId, courseId);
            alert("Course added successfully");
            window.location.reload();
        } catch (error) {
            alert("Failed to add course");
        }
    };

    const removeStudentFromCourse = async (studentId, courseId) => {
        try {
            await backendAccessor.removeStudentFromCourse(studentId, courseId);
            alert("Course removed successfully");
            window.location.reload();
        } catch (error) {
            alert("Failed to remove course");
        }
    };

    const performWhatIfAnalysis = () => {
        if (!selectedStudent) return;

        const { gpa: currentGPA } = selectedStudent;
        const { targetGPA, numCourses } = whatIfParams;

        // Get total credits from actual enrollments
        const totalCredits =
            selectedStudent.enrollments?.reduce(
                (sum, enrollment) => sum + enrollment.course.credits,
                0
            ) || 0;

        // Assume 3 credits per new course (standard course load)
        const newCourseCredits = 3;
        const newTotalCredits =
            totalCredits + parseInt(numCourses) * newCourseCredits;

        if (targetGPA && !isNaN(targetGPA)) {
            const requiredGPA =
                (parseFloat(targetGPA) * newTotalCredits -
                    currentGPA * totalCredits) /
                (parseInt(numCourses) * newCourseCredits);

            if (requiredGPA > 4.0 || requiredGPA < 0) {
                setWhatIfResult(
                    `The target GPA of ${targetGPA} is not achievable with ${numCourses} courses.`
                );
            } else {
                setWhatIfResult(
                    `To achieve a GPA of ${targetGPA}, ${
                        selectedStudent.name
                    } needs to earn an average GPA of ${requiredGPA.toFixed(
                        2
                    )} in their next ${numCourses} courses.`
                );
            }
        } else {
            // Random simulation case
            const randomGrades = Array(parseInt(numCourses))
                .fill()
                .map(() => Math.random() * 2.5 + 1.5); // More realistic grades between 1.5 and 4.0

            const newGPA =
                (currentGPA * totalCredits +
                    randomGrades.reduce((a, b) => a + b, 0) *
                        newCourseCredits) /
                newTotalCredits;

            setWhatIfResult(
                `If ${
                    selectedStudent.name
                } takes ${numCourses} more courses, their new GPA could be approximately ${newGPA.toFixed(
                    2
                )}.`
            );
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Advisor Dashboard</h1>
                <button
                    onClick={onSignOut}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign Out
                </button>
            </div>
            <p>Welcome, {user.name}!</p>
            <h1 className="text-2xl font-bold mb-4">Advisor Dashboard</h1>
            <p className="mb-4">Department: {user.Advisor.department}</p>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    Manage Student Courses
                </h2>
                {user.Advisor.students.map((student) => (
                    <div key={student.id} className="mb-4 p-4 border rounded">
                        <h3 className="font-semibold">
                            {student.user.name} - {student.major}
                        </h3>
                        <p>GPA: {student.gpa}</p>
                        <ul className="list-disc list-inside">
                            {student.enrollments.map((enrollment) => (
                                <li key={enrollment.id}>
                                    {enrollment.course.name}
                                    <button
                                        onClick={() =>
                                            removeStudentFromCourse(
                                                student.id,
                                                enrollment.course.id
                                            )
                                        }
                                        className="ml-2 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-2">
                            <select
                                className="border p-2 mr-2"
                                value={selectedCourse}
                                onChange={(e) =>
                                    setSelectedCourse(e.target.value)
                                }
                            >
                                <option value="">Select a course</option>
                                {courses
                                    .filter(
                                        (course) =>
                                            !student.enrollments
                                                .map(
                                                    (enrollment) =>
                                                        enrollment.course.id
                                                )
                                                .includes(course.id)
                                    )
                                    .map((course) => (
                                        <option
                                            key={course.id}
                                            value={course.id}
                                        >
                                            {course.name}
                                        </option>
                                    ))}
                            </select>
                            <button
                                onClick={() => {
                                    if (selectedCourse) {
                                        addStudentToCourse(
                                            student.id,
                                            parseInt(selectedCourse)
                                        );
                                        setSelectedCourse("");
                                    }
                                }}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Add Course
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">What-If Analysis</h2>
                <select
                    className="border p-2 mr-2"
                    onChange={(e) =>
                        setSelectedStudent(
                            students.find(
                                (s) => s.id === parseInt(e.target.value)
                            )
                        )
                    }
                >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
                {selectedStudent && (
                    <div className="mt-2">
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
                )}
                {whatIfResult && (
                    <div className="bg-gray-100 p-4 rounded mt-2">
                        <h3 className="font-semibold">Analysis Result:</h3>
                        <p>{whatIfResult}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvisorDashboard;
