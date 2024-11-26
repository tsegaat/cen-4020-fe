export const backendAccessor = {
    login: async (username, password) => {
        const response = await fetch("http://localhost:3033/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
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
};
