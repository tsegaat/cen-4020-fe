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
};
