import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { backendAccessor } from "../accessor/backendAccessor";
import { mockInstructors, mockStudents } from "./mockData";

const StaffDashboard = () => {
    const [user, setUser] = useState({
        name: "",
        role: "",
    });

    const [courses, setCourses] = useState([
        {
            id: 1,
            name: "Introduction to Computer Science",
            instructor: {
                id: 1,
                user: {
                    name: "Dr. Emily Johnson",
                },
            },
            credits: 3,
        },
    ]);
    const [instructors, setInstructors] = useState([
        {
            user: {
                name: "",
                email: "",
            },
            courses: [],
        },
    ]);
    const [students, setStudents] = useState([
        {
            user: {
                name: "",
                email: "",
            },
            enrollments: [],
        },
    ]);

    useEffect(() => {
        const userId = Cookies.get("cen-userId");
        if (userId) {
            backendAccessor.getUser(userId).then((user) => {
                setUser(user);
            });
        }
        backendAccessor.getCourses().then((courses) => {
            setCourses(courses);
        });
        backendAccessor.getInstructors().then((instructors) => {
            setInstructors(instructors);
        });
        backendAccessor.getStudents().then((students) => {
            setStudents(students);
        });
    }, []);

    const [editingCourse, setEditingCourse] = useState(null);
    const [editingInstructor, setEditingInstructor] = useState(null);
    const [editingStudent, setEditingStudent] = useState(null);

    const handleCourseChange = (e, id) => {
        const course = courses.find((c) => c.id === id);
        if (!course) return;

        setCourses(
            courses.map((c) =>
                c.id === id ? { ...c, [e.target.name]: e.target.value } : c
            )
        );
    };

    const handleInstructorChange = (e, id) => {
        const instructor = instructors.find((i) => i.id === id);
        if (!instructor) return;

        setInstructors(
            instructors.map((i) =>
                i.id === id
                    ? {
                          ...i,
                          user: {
                              ...i.user,
                              [e.target.name]: e.target.value,
                          },
                      }
                    : i
            )
        );
    };

    const handleStudentChange = (e, id) => {
        const student = students.find((s) => s.id === id);
        if (!student) return;

        setStudents(
            students.map((s) =>
                s.id === id
                    ? {
                          ...s,
                          user: {
                              ...s.user,
                              [e.target.name]: e.target.value,
                          },
                      }
                    : s
            )
        );
    };

    const addCourse = () => {
        const newCourse = {
            id: Math.max(...courses.map((c) => c.id)) + 1,
            name: "",
            credits: 0,
            department: user.Staff.department,
            instructor: {
                id: null,
                user: {
                    name: "",
                },
            },
        };
        setCourses([...courses, newCourse]);
        setEditingCourse(newCourse.id);
    };

    const addInstructor = () => {
        const newInstructor = {
            id: Math.max(...instructors.map((i) => i.id)) + 1,
            user: {
                name: "",
                email: "",
            },
            specialization: "",
            officeHours: "",
            courses: [],
        };
        setInstructors([...instructors, newInstructor]);
        setEditingInstructor(newInstructor.id);
    };

    const addStudent = () => {
        const newStudent = {
            id: Math.max(...students.map((s) => s.id)) + 1,
            user: {
                name: "",
                email: "",
            },
            major: user.Staff.department,
            gpa: 0,
            enrollmentYear: new Date().getFullYear(),
            enrollments: [],
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

    const onSignOut = () => {
        Cookies.remove("cen-userId");
        Cookies.remove("cen-userRole");
        window.location.href = "/";
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
                    <span className="font-medium">Name:</span>{" "}
                    {user?.Staff?.department || "N/A"}
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
                                    value={course.instructor.user.name}
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
                                    - Instructor: {course.instructor.user.name}{" "}
                                    - Credits: {course.credits}
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
                                    value={instructor.user.name}
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
                                    value={instructor.user.email}
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
                                        {instructor.user.name}
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
                                    {instructor.user.email}
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
                                    {instructor.courses
                                        .map((course) => course.name)
                                        .join(", ")}
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
                                    value={student.user.name}
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
                                    step="0.01"
                                    min="0"
                                    max="4"
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
                                <input
                                    type="email"
                                    name="email"
                                    value={student.user.email}
                                    onChange={(e) =>
                                        handleStudentChange(e, student.id)
                                    }
                                    className="m-2 p-2 border rounded-md flex-grow"
                                    placeholder="Email"
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
                                        {student.user.name}
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
                                    <span className="font-medium">
                                        Enrollment Year:
                                    </span>{" "}
                                    {student.enrollmentYear}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    {student.user.email}
                                </p>
                                <p>
                                    <span className="font-medium">
                                        Enrolled Courses:
                                    </span>{" "}
                                    {student.enrollments
                                        .map(
                                            (enrollment) =>
                                                enrollment.course.name
                                        )
                                        .join(", ")}
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
