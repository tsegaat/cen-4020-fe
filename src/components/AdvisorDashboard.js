import React, { useState } from "react";

const AdvisorDashboard = ({ onSignOut, user }) => {
    const [advisorDepartment, setAdvisorDepartment] =
        useState("Computer Science");
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "John Doe",
            major: "Computer Science",
            courses: ["Introduction to Programming"],
            gpa: 3.5,
        },
        {
            id: 2,
            name: "Jane Smith",
            major: "Computer Science",
            courses: ["Data Structures"],
            gpa: 3.7,
        },
    ]);
    const [courses, setCourses] = useState([
        {
            id: 1,
            name: "Introduction to Programming",
            department: "Computer Science",
        },
        { id: 2, name: "Data Structures", department: "Computer Science" },
        { id: 3, name: "Algorithms", department: "Computer Science" },
    ]);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [whatIfParams, setWhatIfParams] = useState({
        targetGPA: "",
        numCourses: "",
        creditPerCourse: 3,
    });
    const [whatIfResult, setWhatIfResult] = useState(null);

    const addStudentToCourse = (studentId, courseName) => {
        setStudents(
            students.map((student) =>
                student.id === studentId
                    ? { ...student, courses: [...student.courses, courseName] }
                    : student
            )
        );
    };

    const removeStudentFromCourse = (studentId, courseName) => {
        setStudents(
            students.map((student) =>
                student.id === studentId
                    ? {
                          ...student,
                          courses: student.courses.filter(
                              (c) => c !== courseName
                          ),
                      }
                    : student
            )
        );
    };

    const performWhatIfAnalysis = () => {
        if (!selectedStudent) return;

        const { gpa: currentGPA } = selectedStudent;
        const { targetGPA, numCourses, creditPerCourse } = whatIfParams;

        if (targetGPA) {
            const totalCredits =
                selectedStudent.courses.length * creditPerCourse;
            const newTotalCredits =
                totalCredits + parseInt(numCourses) * creditPerCourse;
            const requiredGPA =
                (targetGPA * newTotalCredits - currentGPA * totalCredits) /
                (parseInt(numCourses) * creditPerCourse);

            setWhatIfResult(
                `To achieve a GPA of ${targetGPA}, ${
                    selectedStudent.name
                } needs to earn an average GPA of ${requiredGPA.toFixed(
                    2
                )} in their next ${numCourses} courses.`
            );
        } else {
            const randomGrades = Array(parseInt(numCourses))
                .fill()
                .map(() => Math.random() * 4);
            const newGPA =
                (currentGPA * selectedStudent.courses.length +
                    randomGrades.reduce((a, b) => a + b, 0)) /
                (selectedStudent.courses.length + randomGrades.length);

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
            <p className="mb-4">Department: {advisorDepartment}</p>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    Manage Student Courses
                </h2>
                {students.map((student) => (
                    <div key={student.id} className="mb-4 p-4 border rounded">
                        <h3 className="font-semibold">
                            {student.name} - {student.major}
                        </h3>
                        <p>GPA: {student.gpa}</p>
                        <ul className="list-disc list-inside">
                            {student.courses.map((course) => (
                                <li key={course}>
                                    {course}
                                    <button
                                        onClick={() =>
                                            removeStudentFromCourse(
                                                student.id,
                                                course
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
                            <select className="border p-2 mr-2">
                                {courses
                                    .filter(
                                        (course) =>
                                            !student.courses.includes(
                                                course.name
                                            )
                                    )
                                    .map((course) => (
                                        <option
                                            key={course.id}
                                            value={course.name}
                                        >
                                            {course.name}
                                        </option>
                                    ))}
                            </select>
                            <button
                                onClick={() =>
                                    addStudentToCourse(
                                        student.id,
                                        document.querySelector("select").value
                                    )
                                }
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
