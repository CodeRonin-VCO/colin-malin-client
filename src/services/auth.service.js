const baseURL = "http://localhost:8008/api/auth";

export const register = async (username, email, password) => {
    const response = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
    };

    return response.json();
};

export const login = async (email, password) => {
    const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Connection failed.");
    };

    return response.json();
};

export const logOut = async () => {
    return Promise.resolve();
};

export const updatePassword = async (email, oldPassword, newPassword) => {
    const response = await fetch(`${baseURL}/update-pwd`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, oldPassword, newPassword })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Updating password failed.");
    };

    return response.json();
}