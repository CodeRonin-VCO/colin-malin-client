import { fetchJson } from "./apiClient.js";


export const getAll = (token, offset, limit) => fetchJson(`/questions?offset=${offset}&limit=${limit}`, {
    method: "GET",
    token,
});

export const getBySearch = (token, query, offset, limit) => fetchJson(`/questions/search?query=${query}&offset=${offset}&limit=${limit}`, {
    method: "GET",
    token,
});

export const create = (token, questionData) => fetchJson(`/questions`, {
    method: "POST",
    token,
    body: questionData
});

export const filtered = (token, config) => fetchJson(`/questions/filtered`, {
    method: "POST",
    token,
    body: config
});

export const getById = (token, question_id) => fetchJson(`/questions/${question_id}`, {
    method: "GET",
    token
});

export const modify = (token, question_id, updatedData) => fetchJson(`/questions/${question_id}`, {
    method: "PUT",
    token,
    body: updatedData
});

export const deleteQuestion = (token, question_id) => fetchJson(`/questions/${question_id}`, {
    method: "DELETE",
    token
});