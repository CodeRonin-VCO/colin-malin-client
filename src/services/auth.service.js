import { fetchJson } from "./apiClient.js";


export const register = (username, email, password) => fetchJson("/auth/register", {
    method: "POST", body: { username, email, password }
});

export const login = (email, password) => fetchJson("/auth/login", {
    method: "POST", body: { email, password }
});

export const updatePassword = (email, oldPassword, newPassword) => fetchJson("/auth/update-pwd", {
    method: "PUT", body: { email, oldPassword, newPassword }
});

export const logOut = async () => {
    return Promise.resolve();
};

