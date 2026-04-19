import { fetchJson } from "./apiClient.js";


export const updateUser = (token, updates) => {
    console.log("updates envoyés:", updates);

    return fetchJson(`/user`, {
        method: "PUT",
        token,
        body: updates
    })
};

export const getUser = (token) => fetchJson(`/user`, {
    method: "GET",
    token,
});