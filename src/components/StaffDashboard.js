import React, { useState } from "react";
import { mockInstructors, mockStudents } from "./mockData";

const StaffDashboard = ({ onSignOut, user }) => {
    const [department, setDepartment] = useState({
        name: "Computer Science",
        building: "Science Building",
        office: "Room 301",
    });
    const [courses, setCourses] = useState([
        {
            id: 1,
            name: "Introduction to Computer Science",
            instructor: "Dr. Emily Johnson",
            credits: 3,
        },
        {
            id: 2,
            name: "Data Structures",
            instructor: "Prof. Michael Chen",
            credits: 4,
        },
        {
            id: 3,
            name: "Artificial Intelligence",
            instructor: "Dr. Emily Johnson",
            credits: 3,
        },
        {
            id: 4,
            name: "Database Systems",
            instructor: "Prof. Michael Chen",
            credits: 4,
        },
        {
            id: 5,
            name: "Software Engineering",
            instructor: "Dr. Sarah Williams",
            credits: 3,
        },
    ]);
    const [instructors, setInstructors] = useState(mockInstructors);
    const [students, setStudents] = useState(mockStudents);

    const [editingCourse, setEditingCourse] = useState(null);
    const [editingInstructor, setEditingInstructor] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);

    const handleCourseChange = (e, id) => {
        setCourses(
            courses.map((course) =>
                course.id === id
                    ? { ...course, [e.target.name]: e.target.value }
                    : course
            )
        );
    };

    const handleInstructorChange = (e, id) => {
        setInstructors(
            instructors.map((instructor) =>
                instructor.id === id
                    ? { ...instructor, [e.target.name]: e.target.value }
                    : instructor
            )
        );
    };

    const handleStudentChange = (e, id) => {
        setStudents(
            students.map((student) =>
                student.id === id
                    ? { ...student, [e.target.name]: e.target.value }
                    : student
            )
        );
    };

    const addCourse = () => {
        const newCourse = {
            id: courses.length + 1,
            name: "",
            instructor: "",
            credits: 0,
        };
        setCourses([...courses, newCourse]);
        setEditingCourse(newCourse.id);
    };

    const addInstructor = () => {
        const newInstructor = {
            id: instructors.length + 1,
            name: "",
            specialization: "",
            email: "",
            officeHours: "",
            courses: [],
        };
        setInstructors([...instructors, newInstructor]);
        setEditingInstructor(newInstructor.id);
    };

    const addStudent = () => {
        const newStudent = {
            id: students.length + 1,
            name: "",
            major: department.name,
            gpa: 0,
            email: "",
            enrollmentYear: new Date().getFullYear(),
            courses: [],
        };
        setStudents([...students, newStudent]);
        setEditingStudent(newStudent.id);
    };

    const removeCourse = (id) => {
        setCourses(courses.filter((course) => course.id !== id));
    };

    const removeInstructor = (id) => {
        setInstructors(
            instructors.filter((instructor) => instructor.id !== id)
        );
    };

    const removeStudent = (id) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Staff Dashboard</h1>
                <button
                    onClick={onSignOut}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign Out
                </button>
            </div>
            <p>Welcome, {user.name}!</p>
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
                Staff Dashboard
            </h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Department Information
                </h2>
                <p className="text-lg">
                    <span className="font-medium">Name:</span> {department.name}
                </p>
                <p className="text-lg">
                    <span className="font-medium">Building:</span>{" "}
                    {department.building}
                </p>
                <p className="text-lg">
                    <span className="font-medium">Office:</span>{" "}
                    {department.office}
                </p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Manage Courses
                </h2>
                {courses.map((course) => (
                    <div key={course.id} className="mb-4 p-4 border rounded-lg">
                        {editingCourse === course.id ? (
                            <div className="flex flex-wrap -mx-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={course.name}
                                    onChange={(e) =>
                                        handleCourseChange(e, course.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Course Name"
                                />
                                <input
                                    type="text"
                                    name="instructor"
                                    value={course.instructor}
                                    onChange={(e) =>
                                        handleCourseChange(e, course.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Instructor"
                                />
                                <input
                                    type="number"
                                    name="credits"
                                    value={course.credits}
                                    onChange={(e) =>
                                        handleCourseChange(e, course.id)
                                    }
                                    className="m-2 p-2 border rounded-md w-20"
                                    placeholder="Credits"
                                />
                                <button
                                    onClick={() => setEditingCourse(null)}
                                    className="m-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-medium">
                                        {course.name}
                                    </span>{" "}
                                    - Instructor: {course.instructor} - Credits:{" "}
                                    {course.credits}
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            setEditingCourse(course.id)
                                        }
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => removeCourse(course.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <button
                    onClick={addCourse}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Course
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Manage Instructors
                </h2>
                {instructors.map((instructor) => (
                    <div
                        key={instructor.id}
                        className="mb-4 p-4 border rounded-lg"
                    >
                        {editingInstructor === instructor.id ? (
                            <div className="flex flex-wrap -mx-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={instructor.name}
                                    onChange={(e) =>
                                        handleInstructorChange(e, instructor.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Instructor Name"
                                />
                                <input
                                    type="text"
                                    name="specialization"
                                    value={instructor.specialization}
                                    onChange={(e) =>
                                        handleInstructorChange(e, instructor.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Specialization"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={instructor.email}
                                    onChange={(e) =>
                                        handleInstructorChange(e, instructor.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="officeHours"
                                    value={instructor.officeHours}
                                    onChange={(e) =>
                                        handleInstructorChange(e, instructor.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Office Hours"
                                />
                                <button
                                    onClick={() => setEditingInstructor(null)}
                                    className="m-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold">
                                        {instructor.name}
                                    </h3>
                                    <div>
                                        <button
                                            onClick={() =>
                                                setEditingInstructor(
                                                    instructor.id
                                                )
                                            }
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                removeInstructor(instructor.id)
                                            }
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <p>
                                    <span className="font-medium">
                                        Specialization:
                                    </span>{" "}
                                    {instructor.specialization}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    {instructor.email}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Office Hours:
                                    </span>{" "}
                                    {instructor.officeHours}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Courses:
                                    </span>{" "}
                                    {instructor.courses.join(", ")}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
                <button
                    onClick={addInstructor}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Instructor
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Manage Students
                </h2>
                {students.map((student) => (
                    <div
                        key={student.id}
                        className="mb-4 p-4 border rounded-lg"
                    >
                        {editingStudent === student.id ? (
                            <div className="flex flex-wrap -mx-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={student.name}
                                    onChange={(e) =>
                                        handleStudentChange(e, student.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Student Name"
                                />
                                <input
                                    type="text"
                                    name="major"
                                    value={student.major}
                                    onChange={(e) =>
                                        handleStudentChange(e, student.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Major"
                                />
                                <input
                                    type="number"
                                    name="gpa"
                                    value={student.gpa}
                                    onChange={(e) =>
                                        handleStudentChange(e, student.id)
                                    }
                                    className="m-2 p-2 border rounded-md w-20"
                                    placeholder="GPA"
                                    step="0.1"
                                    min="0"
                                    max="4"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={student.email}
                                    onChange={(e) =>
                                        handleStudentChange(e, student.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Email"
                                />
                                <input
                                    type="number"
                                    name="enrollmentYear"
                                    value={student.enrollmentYear}
                                    onChange={(e) =>
                                        handleStudentChange(e, student.id)
                                    }
                                    className="m-2 p-2 border rounded-md w-32"
                                    placeholder="Enrollment Year"
                                />
                                <button
                                    onClick={() => setEditingStudent(null)}
                                    className="m-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold">
                                        {student.name}
                                    </h3>
                                    <div>
                                        <button
                                            onClick={() =>
                                                setEditingStudent(student.id)
                                            }
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                removeStudent(student.id)
                                            }
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <p>
                                    <span className="font-medium">Major:</span>{" "}
                                    {student.major}
                                </p>
                                <p>
                                    <span className="font-medium">GPA:</span>{" "}
                                    {student.gpa}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    {student.email}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Enrollment Year:
                                    </span>{" "}
                                    {student.enrollmentYear}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Courses:
                                    </span>{" "}
                                    {student.courses.join(", ")}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
                <button
                    onClick={addStudent}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Student
                </button>
            </div>
        </div>
    );
};

export default StaffDashboard;
