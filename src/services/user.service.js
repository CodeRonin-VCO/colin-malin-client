const baseURL = "http://localhost:8008/api/user";

export const updateUser = async (token, updates) => {
    const response = await fetch(`${baseURL}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates),
        
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Updating user failed.");
    };

    return response.json();
}

export const getUser = async (token) => {
    const response = await fetch(`${baseURL}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Getting user failed.");
    };

    return response.json();
}