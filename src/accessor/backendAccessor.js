export const backendAccessor = {
    login: async (username, password) => {
        const response = await fetch("http://localhost:3033/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.status === 401) {
            throw new Error("Invalid username or password");
        }
        return response.json();
    },
    getUser: async (id) => {
        const response = await fetch(`http://localhost:3033/api/user/${id}`);
        return response.json();
    },
    getStudentsInInstructorCourse: async (id) => {
        const response = await fetch(
            `http://localhost:3033/api/instructors/${id}/students`
        );
        return response.json();
    },
    getCourses: async () => {
        const response = await fetch(`http://localhost:3033/api/courses`);
        return response.json();
    },
    getInstructors: async () => {
        const response = await fetch(`http://localhost:3033/api/instructors`);
        return response.json();
    },
    getStudents: async () => {
        const response = await fetch(`http://localhost:3033/api/students`);
        return response.json();
    },
    addStudentToCourse: async (studentId, courseId) => {
        const response = await fetch(
            `http://localhost:3033/api/students/${studentId}/courses`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId }),
            }
        );
        return response.json();
    },
    removeStudentFromCourse: async (studentId, courseId) => {
        const response = await fetch(
            `http://localhost:3033/api/students/${studentId}/courses/${courseId}`,
            {
                method: "DELETE",
            }
        );
        return response.json();
    },
    editCourse: async (id, course) => {
        const response = await fetch(
            `http://localhost:3033/api/courses/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(course),
            }
        );
        return response.json();
    },
    addCourse: async (course) => {
        const response = await fetch(`http://localhost:3033/api/courses`, {
            method: "POST",
            body: JSON.stringify(course),
        });
        return response.json();
    },
    deleteCourse: async (id) => {
        const response = await fetch(
            `http://localhost:3033/api/courses/${id}`,
            {
                method: "DELETE",
            }
        );
        return response.json();
    },
    editInstructor: async (id, instructor) => {
        const response = await fetch(
            `http://localhost:3033/api/instructors/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(instructor),
            }
        );
        return response.json();
    },
    addInstructor: async (instructor) => {
        const response = await fetch(`http://localhost:3033/api/instructors`, {
            method: "POST",
            body: JSON.stringify(instructor),
        });
        return response.json();
    },
    deleteInstructor: async (id) => {
        const response = await fetch(
            `http://localhost:3033/api/instructors/${id}`,
            {
                method: "DELETE",
            }
        );
        return response.json();
    },
    editStudent: async (id, student) => {
        const response = await fetch(
            `http://localhost:3033/api/students/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(student),
            }
        );
        return response.json();
    },
    addStudent: async (student) => {
        const response = await fetch(`http://localhost:3033/api/students`, {
            method: "POST",
            body: JSON.stringify(student),
        });
        return response.json();
    },
    deleteStudent: async (id) => {
        const response = await fetch(
            `http://localhost:3033/api/students/${id}`,
            {
                method: "DELETE",
            }
        );
        return response.json();
    },
};
