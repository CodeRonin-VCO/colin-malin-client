import { fetchJson } from "./apiClient.js";


export const updateUser = (token, updates) => fetchJson(`/user`, {
    method: "PUT",
    token,
    body: updates
});

export const getUser = (token) => fetchJson(`/user`, {
    method: "GET",
    token,
});